# HANDOFF

Written 2026-09-04. Replace this file next session; do not append.

## State

`main` is `95772ab` and deployed; the branch is level with it. Nothing is
waiting to ship. `@passkeybridge/satus@0.3.11` is `latest` on npm.

Gates: `tsc` clean, 0 genuine lint errors, 15 site tests, 70 CLI tests, and
three build validators (blog, docs, headings). Post-deploy e2e health passed
all four checks against production.

Today's post went live at 09:00. Two remain embargoed: 09-11 (written, on
`main`) and 09-18.

## Shipped today

- **Stripe environment now comes from the signature.** `?env=` was a
  required, unauthenticated query parameter gating license issuance; it
  dropped 21 days of live events in August and test-mode events in
  September. Also removed the forgeable pre-auth alert branch and made
  signature comparison constant-time.
  `mem/incidents/2026-09-04-webhook-env-resolved-from-signature.md`
- **Suppressions scoped to our own sends.** The Resend webhook is
  account-wide across nine domains; other products' bounces were suppressing
  satus addresses, and suppression is fail-closed for transactional mail.
  `mem/incidents/2026-09-04-account-wide-resend-webhook-poisoned-suppressions.md`
- **Every page has an `h1` again**, gated by `validate-headings.mjs`.
- 23 genuine lint errors → 0.

## Check for unmerged branches first

`give-every-page-an-h1` sat finished and unmerged for three days while the
bug it fixed stayed live. Run `git branch -r --no-merged origin/main` before
starting: a green branch nobody merged looks exactly like a bug nobody
fixed. Clean as of this writing.

## The site has tests now

`vitest.config.ts` is separate from `vite.config.ts` on purpose — the Nitro
plugin cannot load under Vitest. `npm test`. Only
`src/lib/stripe.server.test.ts` so far, and **no CI runs it**; there is no
site workflow at all, only `cli-ci.yml`.

## Flags

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.**
- **79 poisoned suppression rows left in place** deliberately; the incident
  note says how to identify them.
- **Test-mode Stripe endpoint still lacks `?env=sandbox`.** Cosmetic now.
- **Refund revocation rides on `Charge.invoice`,** which basil removed.
  `mem/followups/refund-revocation-rides-on-a-removed-field.md`
- **~4,050 `prettier/prettier` errors** repo-wide, pre-existing.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs`.
- **Purging the app-builder platform.** Done 2026-08-27 in `3abfa27`.

## Next

1. A site CI workflow running `npm test` and `npm run validate`.
2. Business decision: the three `(planned)` Team features on `/pricing`, and
   whether to define a real support SLA.
3. Content plan resumes at Q3 item 9.
