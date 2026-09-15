# HANDOFF

Written 2026-09-15. Replace this file next session; do not append.

## State

`main` carries two payment-webhook fixes shipped today, both live and
verified against production. `@passkeybridge/satus@0.3.11` is npm `latest`.
No unmerged branches.

Gates: tsc clean, eslint 0 errors, 34 site tests (19 in the new
`webhook.test.ts`), 70 CLI tests, five validators, prettier clean.

## Shipped today

1. **Refund revocation works on basil-or-later payloads.** `Charge.invoice`
   is gone there; the handler now goes `payment_intent` → `invoice_payments`
   → invoice → subscription. Verified on the live account first.
2. **The webhook no longer issues satus licenses for other products.** The
   Stripe account is shared with booked.co, petsupplies.co and PasskeyBridge,
   and `checkout.session.completed` arrives for all of them. `ownershipOf`
   requires a satus marker (our `source: "satus.sh"` metadata, or a `satus_`
   lookup key); anything else gets a 200 and a log line. A satus-*named*
   product with no marker throws rather than skipping.

Both were mutation-tested: guard removed, tests red, guard restored. The
three stray rows (one booked.co, two PasskeyBridge) were deleted on the
owner's go; `licenses` live now holds only `satus_pro_monthly` rows.

## Needs the owner

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.** Rotate in GitHub Secrets; do
  not handle the value.
- **Node 20 in `cli-ci.yml:24` and `cli-publish.yml:25`**, EOL since
  2026-04-30. Bump to 22 or 24 outside a release week. Do not move
  `"engines": ">=20"` as a side effect. Awaiting a go.

## Graduated this session

`mem/incidents/2026-09-15-shared-account-webhook-issued-licenses-for-other-products.md`
(new). `mem/features/stripe-webhook-payload-shape.md` (moved from followups;
the dahlia pin was misread twice and the note says how).

## Flags, unchanged

CSP still absent — ship `Content-Security-Policy-Report-Only` first.
e2e-health is rate limited, not authenticated. 19 `bun audit` findings, all
dev-tree. 79 poisoned suppression rows, deliberate. `minimumReleaseAge`
blocks packages under 24h; confirm before bypassing.

## Do not redo

`strict: true` on the Anthropic tool; the docs-vs-code audit (run the
validator); purging the app-builder platform (`3abfa27`); the Stripe account
default API version — moot now that both payload shapes are handled.

## Next

1. Node bump on a go.
2. `(planned)` Team features on `/pricing`, and a support SLA.
3. Content plan resumes at Q3 item 9.
