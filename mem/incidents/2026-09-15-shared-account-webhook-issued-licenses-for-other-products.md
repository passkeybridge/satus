# The payments webhook issued satus licenses for other products' sales

**Found:** 2026-09-15, while pulling a live subscription to verify the
refund-revocation fix. **Fixed the same day** in
`src/routes/api/public/payments/webhook.ts` (`ownershipOf`), covered by
`webhook.test.ts`.

## What happened

satus shares one Stripe account with booked.co, petsupplies.co and
PasskeyBridge. A webhook endpoint receives every event of its enabled types
on the whole account, not just its own product's — and the satus endpoint
`we_1U13qRGTWx4Bh4zbfpSCi9a5` is subscribed to `checkout.session.completed`.

`handleCheckoutCompleted` checked one thing: `session.mode === "subscription"`.
Any subscription checkout on the account then got a satus license row, a
freshly generated key, and the `license-delivery` email.

## The evidence

Of six live rows in `licenses`:

| plan | created | who | source |
| --- | --- | --- | --- |
| `booked_pro_monthly`, active | 2026-09-12 | owner's own booked.co subscription | **this handler**, after the endpoint went in on 2026-08-05 |
| `price_1TFILl…` ($99/mo PasskeyBridge Pro), canceled | 2026-05-27 | a `gmail.com` customer | Lovable-era predecessor, predates this endpoint |
| `price_1TFIMG…` (PasskeyBridge Enterprise), canceled | 2026-05-27 | a `gmail.com` customer | same |
| three `satus_pro_monthly` | — | owner's own | correct |

So the current handler demonstrably did it once, to the owner's own
address. Two strangers got satus keys from the predecessor system in May;
both are revoked. Nobody outside the company holds working satus access
they did not pay for.

## The fix

Positive identification, any one marker sufficient:

1. `session.metadata.source === "satus.sh"` — `payments.functions.ts` stamps it.
2. `subscription.metadata.source === "satus.sh"` — same file, `subscription_data`.
3. A price whose `lookup_key` starts `satus_`. Every satus price has one
   (checked against the live catalog: `satus_pro_monthly`,
   `satus_pro_yearly`, `satus_team_seat_monthly`, `satus_live_smoke_test`).
   booked.co's start `booked_`; PasskeyBridge's are `null`.

Anything else returns 200 with a log line and no writes. Not a 500: that
would page ops and put a booked.co sale on Stripe's three-day retry
schedule for a condition retrying cannot change.

The tripwire covers the failure that matters more. If the product's *name*
contains "satus" and no marker does, the handler throws — a satus sale we
would otherwise skip is a buyer with a receipt and no license. That needs
`items.data.price.product` expanded on the retrieve, which it now is.

The other three handlers (`subscription.updated`, `subscription.deleted`,
`charge.refunded`) only `update` rows that already exist, keyed on
`stripe_subscription_id`, so a foreign event finds nothing and does nothing.
They needed no guard.

## The rows

Deleted the same day on the owner's explicit go, with `returning` so the
three ids came back and nothing else did. Live `licenses` holds only
`satus_pro_monthly` rows now.

## The lesson

A shared Stripe account makes "our webhook" a misnomer. Every handler that
*creates* something needs to ask whose event it is; handlers that only update
rows we already own are scoped by the lookup. The resend incident on
2026-09-04 was the same shape with suppressions instead of licenses.
