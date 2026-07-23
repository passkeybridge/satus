---
slug: seeding-stripe-shaped-data-without-stripe
title: "Seeding Stripe-shaped data without Stripe"
description: How to fill a billing schema with realistic Customer, Subscription, Invoice, and Charge rows locally, so dashboards render without touching test-mode Stripe.
date: 2026-07-23
author: satus.sh
tags: [billing, stripe, patterns]
draft: false
---

A user asked, last week, how to seed a billing schema that mirrors Stripe's object model without actually calling Stripe. Their app stores a local copy of the Stripe [Customer](https://docs.stripe.com/api/customers/object), [Subscription](https://docs.stripe.com/api/subscriptions/object), [Invoice](https://docs.stripe.com/api/invoices/object), and [Charge](https://docs.stripe.com/api/charges/object) objects, the way most billing-adjacent applications end up doing after a few months in production, and the dashboards they were trying to demo needed those tables populated with something that looked like real revenue. They did not want to spin up ten thousand test-mode customers in the Stripe dashboard to get there. Neither would we.

This post walks through the shape of the problem, the properties a "Stripe-shaped" fixture has to preserve if the app is going to render honestly on top of it, and the specific columns satus fills in for a table that stores a mirror of a Stripe object.

## What "Stripe-shaped" actually means

The Stripe object model is small and stable. A `Customer` (`cus_…`) owns zero or more `Subscription` (`sub_…`) rows, each of which has one or more `Price` (`price_…`) items on it and produces an `Invoice` (`in_…`) at every billing period, which is paid by a `PaymentIntent` (`pi_…`) that resolves to a `Charge` (`ch_…`). The identifiers all use a documented prefix and the same base32-ish suffix shape, which is what code that indexes by `stripe_id` is usually matching on.

An application that mirrors these into Postgres typically has a `customers` table with a `stripe_customer_id` column, a `subscriptions` table with `stripe_subscription_id`, `status`, `current_period_end`, and `cancel_at_period_end`, and an `invoices` table with `stripe_invoice_id`, `amount_paid`, `currency`, and `status`. That is the surface we have to populate. The Stripe API reference is the source of truth for every field; the [Subscription object](https://docs.stripe.com/api/subscriptions/object) and the [Invoice line item](https://docs.stripe.com/api/invoice-line-item/object) references list what each column can hold.

## The four properties a fixture has to preserve

A random-looking pile of rows will pass a `SELECT COUNT(*)` and fail every dashboard that reads the data. The four properties worth preserving, in decreasing order of how often we see them broken, are:

Referential closure. Every `subscriptions.customer_id` has to point to a real `customers.id`, every `invoices.subscription_id` to a real `subscriptions.id`, and every `charges.invoice_id` to a real `invoices.id`. This is table-stakes for any FK-aware seeder and is the reason satus insists on topologically sorting the graph before generating a single row; the earlier post on [cyclic foreign keys](/blog/cyclic-fks-in-the-wild) covers the mechanics.

Status legality. The Stripe [subscription lifecycle](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses) defines exactly eight states: `trialing`, `active`, `past_due`, `canceled`, `unpaid`, `incomplete`, `incomplete_expired`, and `paused`. A distribution over those states that puts, say, half the rows in `incomplete` is legal but wrong; production subscription tables are dominated by `active`, with a long tail of `canceled` and a thin band of `past_due`. Any dashboard that filters by status will look broken until the mix is right.

Monetary consistency. `invoice.amount_paid` is denominated in the smallest currency unit; for USD that is cents, for JPY it is yen, and the full list of [zero-decimal currencies](https://docs.stripe.com/currencies#zero-decimal) is worth reading before you generate anything. If your seeder writes `19.99` into `amount_paid` because it thinks in dollars, every MRR chart is off by two orders of magnitude. If it writes `1999` for JPY, it is off by the same amount in the other direction.

Temporal shape. `current_period_end` on an `active` subscription has to be in the future; on a `canceled` subscription it can be in the past. `invoice.created` for the current period has to precede `subscription.current_period_end`, not follow it. A row where `cancel_at_period_end = true` but `current_period_end` has already passed is a subscription the app should treat as `canceled`, and any dashboard that groups by "canceling this month" will double-count it.

## The distributions worth encoding

The Stripe reference does not tell you how many `canceled` rows to write, because that is a business question rather than an API question. From talking to a handful of subscription-app builders, the useful rough shape for a mature-ish B2B SaaS book of business is roughly:

```text
active               ~ 70–85 %
trialing             ~  3–10 %
past_due             ~  1–3  %
canceled             ~ 10–20 %
paused               ~  0–2  %
incomplete + expired ~  1–3  % (mostly noise)
unpaid               ~  0–1  %
```

The numbers are directional, and a satus seed should never present them as measured. What matters is the ordering: `active` dominates, `canceled` is the second-largest bucket because it is cumulative, `trialing` is small because trials are short, and everything else is thin. A seeder that produces this shape will make a "subscriptions by status" bar chart look like a real product's chart at a glance; a seeder that samples the eight states uniformly will not.

Invoice amounts follow the price rows, not a distribution. If the schema has a `prices` table, the honest thing is to draw amounts from it and multiply by whatever quantity the seeded subscription has; if there is no `prices` table, pick a small handful of plausible plan prices (say, `$9`, `$29`, `$99`, `$299` per month) and stick with them for the whole seed, because a real book of business has a small number of prices with a lot of customers on each, not a smooth curve of unique amounts.

Failed payments follow [Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries): a `past_due` subscription has typically had one or two failed charges, not fifteen, because the retry schedule gives up. A seeder that generates twenty failed charges against a single subscription is describing a Stripe account that would already be closed.

## What satus fills in for a mirrored Stripe table

When satus sees a table whose columns match one of Stripe's canonical shapes (customer, subscription, invoice, charge), the CLI takes the following stance:

Identifier columns named `stripe_*_id` or ending in `_id` with a `text` type and a check constraint like `starts_with(value, 'cus_')` are treated as Stripe IDs. satus emits values with the correct prefix and a random alphanumeric suffix, mirroring the shape of Stripe's documented IDs (Stripe does not fix a suffix length, so the seeder picks one that matches the width already present in the target column). It does not attempt to make them resolvable against the Stripe API, because that is not the point of a local seed.

Monetary columns (`integer` or `bigint` named `amount*`, `total*`, `subtotal*`, or `unit_amount*`) are treated as minor-unit amounts if a sibling `currency` column exists, and satus picks values that respect the [zero-decimal currency list](https://docs.stripe.com/currencies#zero-decimal). For USD-denominated `amount_paid` on `invoice`, values come from the plan-price set described above, not from a uniform range.

Enum-like status columns are drawn from the documented Stripe state set, in the rough proportions above. For subscriptions, the [status enum](https://docs.stripe.com/api/subscriptions/object#subscription_object-status) is authoritative; for invoices, satus draws from `draft`, `open`, `paid`, `uncollectible`, `void` in a mix that reflects the parent subscription's state (a `canceled` subscription's last invoice is typically `void` or `paid`, not `open`).

Timestamp columns are anchored to the row's parent. A subscription's `current_period_end` is drawn from `created + billing_interval + jitter`; an invoice's `created` is drawn from `subscription.current_period_start`; a charge's `created` follows its invoice by a small positive offset. This is the same principle behind the earlier post on [timezone bugs](/blog/timezone-bugs-found-by-seed-data): plausible timestamps surface bugs that uniform ones hide.

Boolean flags like `cancel_at_period_end` are correlated with `status`. A row with `status = 'canceled'` and `cancel_at_period_end = false` and `canceled_at IS NULL` is a schema error; satus refuses to emit it.

## Why not just use Stripe's test mode

Stripe's [test mode](https://docs.stripe.com/testing) is excellent for verifying an integration end-to-end. It is a poor fit for filling a dashboard because every object you create has to round-trip through Stripe's API, which is rate-limited, and because ten thousand test customers are ten thousand rows in the shared test-mode dashboard that everyone on the team will scroll past forever. Seed data is a database concern; test mode is an integration concern. Both are useful, and they answer different questions.

The exact rule we recommend to satus users: use test mode when you are verifying that your [webhook handlers](https://docs.stripe.com/api/webhook_endpoints) parse a real Stripe event, and use satus when you are populating tables that a dashboard reads.

## Summary

A "Stripe-shaped" fixture is not a copy of Stripe's storage. It is a set of rows in your own tables that respect the four properties above: referential closure, status legality, monetary units, and temporal ordering. Get those right and every chart, every filter, and every "recent invoices" list on top of the mirror will render honestly. satus encodes the properties, leaves the plan prices and the tenant mix to you, and does not talk to Stripe.

## References

- Stripe API reference: [Customers](https://docs.stripe.com/api/customers/object), [Subscriptions](https://docs.stripe.com/api/subscriptions/object), [Invoices](https://docs.stripe.com/api/invoices/object), [Invoice line items](https://docs.stripe.com/api/invoice-line-item/object), [Charges](https://docs.stripe.com/api/charges/object), [Prices](https://docs.stripe.com/api/prices/object), [Products](https://docs.stripe.com/api/products/object), [Webhook endpoints](https://docs.stripe.com/api/webhook_endpoints).
- Stripe Billing: [Subscription lifecycle and statuses](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses), [Prorations](https://docs.stripe.com/billing/subscriptions/prorations), [Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries).
- Stripe: [Currencies and zero-decimal currencies](https://docs.stripe.com/currencies#zero-decimal), [Testing](https://docs.stripe.com/testing).
