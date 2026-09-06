# HANDOFF

Written 2026-09-04. Replace this file next session; do not append.

## State

`main` is `43712e1` and deployed. Branch and `main` are level — nothing is
waiting to ship. `@passkeybridge/satus@0.3.11` is `latest` on npm and the
repo agrees.

Gates: `tsc` clean, 0 genuine lint errors, **15 site tests**, 70 CLI tests,
both build gates. Post-deploy e2e health passed all four checks against
production.

Today's post went live at its 09:00 slot. Two remain embargoed: 09-11
(written, on `main`) and 09-18.

## Shipped today

- **Stripe environment now comes from the signature.** `?env=` was a
  required, unauthenticated query parameter gating license issuance; it
  dropped 21 days of live events in August and test-mode events in
  September. Whichever endpoint secret validates the body names the
  environment now. Also removed the forgeable pre-auth alert branch and made
  signature comparison constant-time.
  `mem/incidents/2026-09-04-webhook-env-resolved-from-signature.md`
- **Suppressions are scoped to our own sends.** The Resend webhook is
  account-wide across nine domains; other products' outreach bounces were
  suppressing satus addresses, and suppression is fail-closed for
  transactional mail.
  `mem/incidents/2026-09-04-account-wide-resend-webhook-poisoned-suppressions.md`
- 23 genuine lint errors → 0.

## The site has tests now

`vitest.config.ts` is separate from `vite.config.ts` on purpose — the Nitro
plugin cannot load under Vitest. `npm test`. Only
`src/lib/stripe.server.test.ts` so far. **Not wired into CI**; there is no
site workflow at all, only `cli-ci.yml`. That is the obvious next chore.

## Flags

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.**
- **79 poisoned suppression rows left in place** deliberately; the incident
  note says how to identify them.
- **Test-mode Stripe endpoint still lacks `?env=sandbox`.** Now cosmetic —
  it resolves by signature — but worth tidying.
- **Refund revocation rides on `Charge.invoice`,** which basil removed.
  `mem/followups/refund-revocation-rides-on-a-removed-field.md`
- **~4,050 `prettier/prettier` errors** repo-wide, pre-existing. A
  `format-the-codebase` branch exists from 2026-09-01.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs`.
- **Purging the app-builder platform.** Done 2026-08-27 in `3abfa27`.

## Next

1. A site CI workflow running `npm test` and `npm run validate`.
2. Business decision, not engineering: the three `(planned)` Team features
   on `/pricing`, and whether to define a real support SLA.
3. Content plan resumes at Q3 item 9.
