# HANDOFF

Written 2026-09-15. Replace this file next session; do not append.

## State

`main` carries two payment-webhook fixes shipped today, both live and
verified against production. `@passkeybridge/satus@0.3.11` is npm `latest`.
No unmerged branches.

Gates: tsc clean, eslint 0 errors, 34 site tests (19 in the new
`webhook.test.ts`), 70 CLI tests, six validators, prettier clean.

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

3. **CLI CI off Node 20.** `cli-publish.yml` builds on 24; `cli-ci.yml`
   is a 20/24 matrix because `engines` still says `>=20`. `checkout` and
   `setup-node` moved to v5. Publish dry run passes on npm 11 (it packs
   when the version is already on the registry). CLI `bin` is
   `dist/cli.js`, the form npm 11 wants — its "removed" warning was
   misleading; the bin was never dropped.
4. **`action-selftest` green for the first time since 2026-08-14.** It
   fetches pagila's schema from upstream `master`, which now needs
   PostgreSQL 18 and pgvector; the container is `pgvector/pgvector:pg18`.
5. **SEO 4.1 and 4.2 (2026-09-17).** Thirteen sitemap routes had titles of
   10–26 characters; all are 54–60 now and name the product function.
   `scripts/validate-titles.mjs` is the **sixth** validator: it parses
   STATIC_ROUTES out of the sitemap route and fails the build on any title
   outside 30–60 (posts: floor only). It caught one the byte-counting audit
   missed — "The CITEXT trap" was 29 *characters*; the post is retitled.
   `/blog` was 630 KB because the loader returned full posts and TanStack
   serialises loader data into the page; `getPostSummaries()` returns the
   six fields the index renders. 78 KB on the dev server.

## Needs the owner

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.** Rotate in GitHub Secrets; do
  not handle the value.
- **The self-test's pagila fetch is unpinned.** Upstream broke it twice
  this year. Pinning to a commit means reading another repository, which
  this session is not scoped to.

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

1. `(planned)` Team features on `/pricing`, and a support SLA.
2. Content plan resumes at Q3 item 9.
