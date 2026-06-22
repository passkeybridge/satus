---
slug: enum-types-that-grew-up
title: "Enum types that grew up"
description: How Postgres enum types evolve in real schemas, why ALTER TYPE ADD VALUE is harder than it reads, and how satus picks realistic distributions over them.
date: 2026-06-22
author: satus.sh
tags: [postgres, enums, schema, seeding]
draft: false
---

Every enum starts with three values. `'draft'`, `'published'`, `'archived'`, written in the first migration, and for a while the schema looks tidy. Then product asks for a `'scheduled'` state, then legal asks for `'withdrawn'`, then somebody adds `'pending_review'` next to `'in_review'` instead of reusing it, and three years later the enum has fourteen values, two of which nobody is allowed to write anymore and one of which is a typo that shipped. For a tool like [satus](/) that has to generate rows the schema will accept on the first try, an enum is the easiest constraint in the catalog to honour and the hardest one to honour *realistically*. This post is about both halves: what Postgres actually lets you do to an enum after it ships, and what a seeder should sample once it knows.

## What an enum is, in the catalog

`CREATE TYPE status AS ENUM ('draft','published','archived')` registers a new type in `pg_type` and one row per label in `pg_enum`. Each label gets an `oid` and an `enumsortorder` (a `float4`) that defines comparison order ([pg_enum reference](https://www.postgresql.org/docs/current/catalog-pg-enum.html)). The values are stored on the heap as 4-byte oids, not as text; comparison and ordering go through the catalog's sort key, not through string comparison. This is why `'b' < 'a'` is perfectly legal for an enum if `'b'` was declared first, and why an enum column does not behave like a `TEXT CHECK (col IN (...))` for anything other than equality on the labels you spelled at `CREATE TYPE` time.

For seeding, the practical consequence is that the value space is fully discoverable from `pg_enum` joined to `pg_type`, deterministic, and tiny. `satus introspect` reads the labels in `enumsortorder` and treats the column's domain as that ordered set. The interesting question is not "what are the legal values"; it is "what fraction of rows should land on each".

## ALTER TYPE ADD VALUE, in five footnotes

The migration most teams want, eventually, is "add a new value to an existing enum without rewriting the table". Postgres supports it, with five constraints that are individually documented and collectively load-bearing for anybody planning a deploy.

1. **One value per statement.** `ALTER TYPE status ADD VALUE 'scheduled'` adds exactly one label. There is no `ADD VALUES` plural form. Migrations that need three new values are three statements ([ALTER TYPE](https://www.postgresql.org/docs/current/sql-altertype.html)).
2. **Order is not alphabetical.** Without `BEFORE` or `AFTER`, the new label is appended to the end of the sort order. With `BEFORE 'archived'`, Postgres assigns an `enumsortorder` between the neighbours. The placement matters for any query that does `ORDER BY status`, for partitioning bounds, and for the readability of an `enum_range()` call against the type.
3. **Transactions are allowed since PostgreSQL 12, with one rule.** Before PG12, `ALTER TYPE ... ADD VALUE` could not run inside a transaction block at all. From PG12 onward it can, but the new value cannot be referenced in the same transaction that added it ([PG12 release notes, item 4](https://www.postgresql.org/docs/release/12.0/)). A migration that adds a value and then inserts a row using it must split across two transactions, or accept the error.
4. **`IF NOT EXISTS` makes the statement idempotent, not free.** `ALTER TYPE ... ADD VALUE IF NOT EXISTS 'scheduled'` is safe to run twice. It does not, however, deduplicate against case variants; `'Scheduled'` and `'scheduled'` are distinct labels and Postgres will happily add both.
5. **There is no `ALTER TYPE ... DROP VALUE`.** Postgres has never supported removing a label from an enum. The supported path is `CREATE TYPE status_new AS ENUM (...)`, `ALTER TABLE ... ALTER COLUMN status TYPE status_new USING status::text::status_new`, `DROP TYPE status`, `ALTER TYPE status_new RENAME TO status`. The rewrite takes an ACCESS EXCLUSIVE lock on every table that uses the type. This is the single reason most production enums accumulate deprecated values: removing one is more expensive than living with it.

Renaming a value (`ALTER TYPE ... RENAME VALUE 'old' TO 'new'`) has been supported since PostgreSQL 10 and is cheap, because the underlying oid does not change ([PG10 release notes](https://www.postgresql.org/docs/release/10.0/)). Most teams discover this two years after they wanted it.

## What an enum looks like after three years

A short tour from public schemas. listmonk's [`schema.sql` at v3.0.0](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql) declares nine enum types in the first migration: `list_type`, `list_optin`, `subscriber_status`, `subscription_status`, `campaign_status`, `campaign_type`, `content_type`, `bounce_type`, and `template_type`. The largest, `campaign_status`, has six labels: `'draft'`, `'running'`, `'scheduled'`, `'paused'`, `'cancelled'`, `'finished'`. The order is meaningful, since it follows the lifecycle of a campaign and not the alphabet, and the values are short, lowercase, and unsuffixed. That is the shape of an enum that was designed once, by one person, with the whole state machine in mind. Most enums in production do not look like that.

The other end of the spectrum is the enum that grew. Pagila ships a small, deliberate one: [`mpaa_rating AS ENUM ('G','PG','PG-13','R','NC-17')`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql), in MPAA order, used on `film.rating`. It has not changed in years because the underlying domain has not changed in years. An MPAA rating is a fact about the world; a `campaign_status` is a fact about your product, and your product changes.

The pattern we see most often in customer schemas (not in our public corpus, which is too small to make a statistic out of) is the third shape: an enum that started at five values, has eleven now, and three of them are commented `-- deprecated, do not use in new rows` next to the `ADD VALUE` migration. The deprecated values are still in the type because dropping them requires the rewrite above, and the team has never had the maintenance window. The application code maintains a `Set<Status>` of "writable statuses" in parallel with the database; new code reads from that set, old rows in the database do not.

For a seeder this matters because "sample uniformly from `enum_range(NULL::status)`" produces a fixture full of values that no living code path emits. The fixture compiles, the foreign keys resolve, the rows insert, and the application's first query against the fixture returns rows in states it does not know how to render.

## How satus picks a distribution

`satus` reads the enum labels from `pg_enum` and, when a profile applies, attaches a weight to each. The default rule, for an unrecognised enum, is to bias toward the first few labels in `enumsortorder` on the assumption that the original author put the common cases first. The rule is wrong often enough that we treat it as a fallback, not a model.

When a profile applies, for instance a subscription-billing profile for a column called `subscription.status` with labels that look like Stripe's, we use a hand-tuned distribution: most rows in `'active'`, a long tail in `'past_due'` and `'canceled'`, a small sliver in `'incomplete_expired'`, near zero in `'paused'` unless the user opts in. The distributions live in the profile, not in the engine, because they are facts about a product domain, not about Postgres. The built-in set is listed on [/profiles](/profiles).

For columns satus cannot recognise, the CLI prints the enum labels in the plan output and asks for a weight vector, with the fallback distribution as the default. The interactive prompt looks like this:

```text
table public.campaigns column status (enum public.campaign_status)
  labels: draft, running, scheduled, paused, cancelled, finished
  default weights: 0.50, 0.20, 0.10, 0.05, 0.05, 0.10
  accept defaults? [Y/n/edit]
```

If the user accepts, satus writes the weights to the run's lockfile so the same fixture re-generates deterministically. If the user edits, the new weights are saved against the schema fingerprint for next time. The lockfile and weight storage are covered in the [v0.3.0 release notes](/blog/v0-3-0-anthropic-and-machine-readable-output).

## What the dry-run catches, and what it doesn't

Enum validation in the [satus dry-run](/blog/dry-run-validation) is the easy half of this post. For every column typed as an enum, the simulator confirms that the sampled value is one of the labels returned by `pg_enum`; an unknown label is a finding of class `EnumOutOfDomain`, refused before any LLM call. The check is mechanical because the domain is finite.

What the dry-run does *not* catch is the realism gap. A fixture full of `'finished'` campaigns is valid Postgres rows; it is also a useless fixture for testing the running-campaign dashboard. We treat the distribution as a product choice, not a correctness one, and surface it as a warning when the chosen weights skew more than 90% to a single label, on the theory that a fixture that almost never exercises the rare states is a fixture that hides the bugs in the rare states. The warning is dismissable; the validation is not.

## A short worked example

Suppose your schema has:

```sql
CREATE TYPE order_status AS ENUM (
  'cart', 'placed', 'paid', 'fulfilled', 'refunded', 'cancelled'
);

CREATE TABLE orders (
  id           bigserial PRIMARY KEY,
  customer_id  bigint NOT NULL REFERENCES customers(id),
  status       order_status NOT NULL,
  total_cents  integer NOT NULL CHECK (total_cents >= 0)
);
```

`satus plan --schema public --rows orders=1000` prints:

```text
table public.orders
  column status (enum public.order_status)
    labels: cart, placed, paid, fulfilled, refunded, cancelled
    profile: ecommerce → weights 0.05, 0.10, 0.15, 0.65, 0.03, 0.02
    expected counts (1000 rows): 50 / 100 / 150 / 650 / 30 / 20
```

The numbers are not a guess; they come from the [ecommerce profile](/blog/ecommerce-profile), where the dominant steady-state of an `orders` table is `'fulfilled'` and the rare states are kept rare. If your business is not e-commerce, the defaults will be wrong and the prompt above lets you edit them once. If it is, the fixture has the right rows to exercise the fulfilment-heavy parts of the code and just enough refund and cancellation rows to make those code paths real.

## The shorter version

A Postgres enum is small, ordered, oid-backed, and easy to introspect. It is also a one-way ratchet: values are easy to add, expensive to remove, easy to rename, impossible to ignore once they are in the type. The interesting question for a seeder is not "is this value legal"; it is "is this distribution one the application has ever actually seen". satus answers the first with the catalog and the second with a profile, and prints both in the plan so you can argue with the second before the LLM bills you for it.

If your own enums have grown past the shape you remember, `satus plan` is a fast way to see what is actually in `pg_enum` versus what the application still writes. The [/quickstart](/quickstart) covers pointing it at your database; the [/profiles](/profiles) page lists which built-in profiles already know about the common enum-heavy domains.

## References

- PostgreSQL documentation, [Enumerated Types](https://www.postgresql.org/docs/current/datatype-enum.html).
- PostgreSQL documentation, [`pg_enum`](https://www.postgresql.org/docs/current/catalog-pg-enum.html).
- PostgreSQL documentation, [`ALTER TYPE`](https://www.postgresql.org/docs/current/sql-altertype.html).
- PostgreSQL 10 release notes, [`ALTER TYPE ... RENAME VALUE`](https://www.postgresql.org/docs/release/10.0/).
- PostgreSQL 12 release notes, [`ALTER TYPE ... ADD VALUE` inside a transaction](https://www.postgresql.org/docs/release/12.0/).
- listmonk schema, [`schema.sql` at v3.0.0](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql).
- Pagila sample database, [`pagila-schema.sql`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql).
