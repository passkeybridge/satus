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

## Follow-ups, both closed 2026-08-27

- **The alert fired before authentication.** The `env` check runs ahead of
  signature verification on a public URL, so any stranger POSTing there
  emailed ops. Now gated on the request carrying a `stripe-signature`
  header: Stripe sets it on every delivery including a misconfigured one, a
  scanner has no reason to, and the header is not verified here (without a
  valid `env` there is no signing secret to check against) — its presence
  only decides whether a human is worth waking. Verified locally: two
  requests, both 400, both logged, but only the signed one reached the
  alert path.

- **`revoked_at` is now cleared on reactivation.** `handleSubscriptionUpdated`
  nulls it when Stripe reports `active` or `trialing`. Deliberately not
  `past_due` — a payment is failing then, which is not the moment to reverse
  a revocation. The one row stuck in "paid and locked out"
  (`53644c88`, internal) was repaired to match Stripe, and all three checks
  `verify.ts` performs now pass for it.

Also worth recording: after the `?env=live` fix, that subscription's
renewal webhook landed correctly. `current_period_end` advanced from
2026-08-26 to 2026-09-26 on its own, which is the cleanest proof the
endpoint repair worked.
