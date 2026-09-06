# Refund revocation rides on a field Stripe removed

**Status:** open as of 2026-09-01
**Effort:** small to investigate, unknown to fix
**Where:** `src/routes/api/public/payments/webhook.ts`, `subscriptionIdFromCharge`

Found while typing the webhook's `any`s against the real Stripe SDK types.
Typing it is what surfaced it: `any` had been hiding a read of a field that
no longer exists in the API version we pin.

## The chain

`charge.refunded` revokes a license by walking charge → invoice →
subscription. The only entry point the handler has is `charge.invoice`.

API version `2025-03-31.basil` (stripe-node 18.0.0) **removed `invoice` from
`Charge`**, alongside two related moves the same release made:

| Field | Pre-basil | Basil and later |
| --- | --- | --- |
| `Charge.invoice` | present | removed outright |
| `Invoice.subscription` | top level | `parent.subscription_details.subscription` |
| `Subscription.current_period_end` | top level | `items.data[].current_period_end` |

Verified against `node_modules/stripe/CHANGELOG.md` at the 18.0.0 entry, not
from memory.

So on a basil-or-later payload there is no charge → invoice edge at all.
`subscriptionIdFromCharge` returns `null`, `handleChargeRefunded` logs
`charge.refunded with no subscription` and returns, and the license keeps
verifying. A refunded customer keeps working access until the subscription
is separately cancelled.

## What is and is not known

- **Known:** the satus live endpoint (`we_1U13qRGTWx4Bh4zbfpSCi9a5`,
  `https://satus.sh/api/public/payments/webhook?env=live`) is registered
  with `api_version: null`, so Stripe renders its events at the *account's*
  default version rather than a pinned one. Checked 2026-09-01. Two other
  endpoints on the same account pin `2026-03-25.dahlia` explicitly.
- **Known:** the path has never fired for satus. The account has four live
  refunds, all from 2026-05-26/27, all predating this endpoint's creation
  (2026-08-05) and belonging to other products on the shared account. No
  row in `licenses` has ever reached `status = 'refunded'`.
- **Not known:** the account's default API version. The Stripe tooling in
  the session exposes no read for it, and no satus event has been delivered
  that could be inspected. Read it from Dashboard → Developers → API
  version; that single fact decides whether this is live or latent.

## Why nothing was changed

The two moved fields are handled — both readings are typed and tried in
order, so either payload shape resolves. The removed one cannot be patched
the same way: there is no cheap basil-era replacement for charge → invoice,
and inventing one unverified in a path that revokes paid access is worse
than the gap. The limitation is now written into the function's own doc
comment rather than left implicit.

## If it turns out to be live

`charge.refunded` may be the wrong event to hang this on. Consider whether
`refund.created` or an invoice-side event carries the subscription directly,
and check what Stripe recommends for basil-era refund→subscription linkage
before writing code. Whatever replaces it needs the same idempotency the
current handler has: the `revoked_at` guard makes repeat deliveries quiet.
