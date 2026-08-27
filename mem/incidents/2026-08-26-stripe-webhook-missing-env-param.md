# Stripe webhook rejected live events for 21 days

**Date:** 2026-08-26 (endpoint created 2026-08-05)
**Impact:** none realised. Full loss of license issuance had anyone bought.

## What happened

The live Stripe endpoint `we_1U13qRGTWx4Bh4zbfpSCi9a5`, described as
"satus.sh license issuance webhook", was registered as
`https://satus.sh/api/public/payments/webhook` with **no `?env=live`**.

The handler requires `env` to be `sandbox` or `live` and returns 400 before
signature verification. Stripe does not retry 400s, so those deliveries
were dropped rather than queued.

It surfaced when the only active live subscription renewed at 16:16:47Z and
its two deliveries 400'd 49 and 66 seconds later.

## Why nothing was lost

Zero live checkout sessions existed in the whole window, and every row in
`public.licenses` is an internal address. But `webhook.ts` is the only code
that creates licenses — `verify.ts` and `portal.ts` only read — so a real
purchase would have taken the money and issued nothing.

## Fix

URL corrected to `...?env=live`, matching the convention the sibling
endpoint already used.

## Still open

Two things found while diagnosing, neither fixed:

- **The alert fires before authentication.** The `env` check runs ahead of
  signature verification, so any unauthenticated POST to the public URL
  emails ops (deduped per day). The signature-failure branch deliberately
  stays silent for exactly this reason. It was a true positive this time;
  it is still a spam vector.
- **`revoked_at` is never cleared on reactivation.** `handleSubscriptionUpdated`
  writes status, plan, period and cancel flag but not `revoked_at`; only
  `handleCheckoutCompleted` nulls it. `verify.ts` checks `revoked_at`
  *first*. So a subscription that is revoked and later goes active again
  reports `valid: false, reason: 'revoked'` while billing continues. Row
  `53644c88` is in that state right now — internal, but on a real customer
  it reads as "paid and locked out".
