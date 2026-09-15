# The webhook payload shape is not ours to choose

**Status:** resolved 2026-09-15. Kept because the reasoning is reusable and
the wrong version of it was believed twice.

**Where:** `src/routes/api/public/payments/webhook.ts`,
`subscriptionIdFromCharge`, covered by `webhook.test.ts`.

## The setting that decides it

A Stripe webhook endpoint has its own `api_version`. When it is `null`,
Stripe renders that endpoint's events at the **account's default** version —
a Dashboard setting, changeable by anyone with access, invisible from this
repo.

The satus live endpoint `we_1U13qRGTWx4Bh4zbfpSCi9a5` is `null`. Confirmed
again 2026-09-15. Two other endpoints on the shared account pin
`2026-03-25.dahlia` explicitly; two booked.co endpoints are also `null`.

## The mistake, twice

`stripe.server.ts:36` pins `apiVersion: "2026-03-25.dahlia"`. That pin was
twice read as settling what arrives here. It does not, for two separate
reasons, and getting only the first one is how the second survived:

1. **It governs the wrong direction.** The pin applies to calls we *make*.
   `subscriptionIdFromCharge` reads its charge out of the request body.
2. **Its value says the opposite of what it was read to say.** dahlia
   (2026-03-25) is a year *after* basil (2025-03-31), which removed
   `Charge.invoice`. "We pin dahlia, so the field is there" was backwards:
   `grep -c invoice node_modules/stripe/esm/resources/Charges.d.ts` is `0`,
   and `webhook.ts` adds the field back onto `Stripe.Charge` by hand — which
   is itself the evidence the SDK does not have it.

## The chain, and its replacement

`charge.refunded` revokes by `licenses.stripe_subscription_id`, so it has to
get from a charge to a subscription.

| Era | Path |
| --- | --- |
| Pre-basil | `charge.invoice` → invoice → subscription |
| basil and later | `charge.payment_intent` → `invoice_payments` filtered by that payment intent → invoice → `parent.subscription_details.subscription` |

`Charge` and `PaymentIntent` both lost `invoice` in basil, and nothing
replaced it on the charge side. The edge runs the other way now:
`InvoicePayment` carries the payment intent, and its list endpoint filters on
it. `stripe.invoicePayments.list({ payment: { type: "payment_intent",
payment_intent } })`.

Verified against the live account before it was written, not inferred:
`pi_3UEzARGTWx4Bh4zb22KeO3zV` → `inpay_1UEzAUGTWx4Bh4zbN5qX2q0j` →
`in_1UEzAQGTWx4Bh4zbN9C7qD6R` → `sub_1UEzATGTWx4Bh4zbkLPjq2bV`. That invoice
carries no top-level `subscription` field at all, which is what a post-basil
rendering looks like.

## Why both paths stay

Handling both shapes is what makes the account-default setting stop
mattering. Pinning the endpoint would also fix today's behaviour, but it
fixes it by freezing one shape rather than by being able to read either, and
it would still need this same code the first time someone moves the pin.

The eight tests in `webhook.test.ts` cover both eras, an expanded payment
intent, a deleted invoice, and a charge with neither link. All three
basil-path tests were confirmed to go red with the fallback removed before
the pass was trusted — see `docs-vs-code-drift-gate.md` on why a green run is
not evidence on its own.

## Still true, and still worth knowing

The revocation path has never fired for satus. No row in `licenses` has ever
reached `status = 'refunded'`; the account's four live refunds all predate
this endpoint and belong to other products. So the fix is unexercised in
production by design, and the tests are the only thing standing behind it.
