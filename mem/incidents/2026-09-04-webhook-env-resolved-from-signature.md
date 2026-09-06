# The same webhook bug, second environment

**Date:** 2026-09-04 (test-mode deliveries failing since at least 2026-09-03)
**Impact:** none realised. Test-mode events only.

## What happened

Stripe emailed about failed deliveries **in test mode** to
`https://satus.sh/api/public/payments/webhook`. Same shape as the August
incident: a webhook endpoint registered without `?env=`, a handler that
required it, a 400 that Stripe does not retry.

This was the unexplained `env-query-invalid` alert from 2026-09-03 — three
POSTs with no query string at 14:54:11, 14:54:26 and 18:14:30 UTC. The
previous session could not identify the source because the Stripe tooling in
that session was livemode-only and could not enumerate test-mode endpoints.
Stripe's own email named it.

## Why the August fix did not hold

August corrected one URL. It left the design intact: an unauthenticated,
dashboard-managed query parameter deciding whether a payments event was
processed at all. There are two environments and any number of endpoints, so
the same mistake was available again the moment someone registered another
one.

## Fix

`verifyWebhook` now resolves the environment instead of being told it.
Sandbox and live have different endpoint signing secrets, so at most one can
validate a given body; whichever does *is* the environment. `?env=` survives
only as a hint for which secret to try first, and a wrong or absent hint
costs nothing but an extra HMAC.

Consequences worth stating:

- **A misconfigured endpoint URL can no longer drop an event.** Both August
  and September become impossible, in either environment.
- **The pre-authentication alert branch is gone.** It fired on the presence
  of a `stripe-signature` header, which anyone can forge, and its own
  comment admitted as much. Every alert this handler sends is now for an
  event that already passed HMAC verification.
- **Signature comparison is constant-time.** It was `Array.includes` on a
  hex string; the sibling Resend webhook already had a constant-time helper
  and now so does this one.
- **`livemode` is cross-checked against the resolved environment** and
  logged on mismatch. The secret stays authoritative — a mismatch should be
  impossible, so it is a signal, not a branch.

## Tests

The site had no test runner. It has one now: `vitest.config.ts` (separate
from `vite.config.ts`, whose Nitro plugin cannot load under Vitest) and
`npm test`. `src/lib/stripe.server.test.ts` covers 15 cases — resolution in
both directions, a hint that contradicts the secret, a missing secret,
forged signatures, tampered bodies, both edges of the 300s replay window,
and multi-`v1` rotation headers.

Mutation-checked rather than assumed: reverting `candidateEnvs` to trust the
hint fails 2 tests, and widening the replay window to 3000s fails 1.

## Still worth doing

Fix the test-mode endpoint URL in the Stripe Dashboard anyway. It costs
nothing now, but a correct URL is one less thing to explain later. It is
cosmetic, not urgent — which is the entire point of the change.
