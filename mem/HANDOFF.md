# HANDOFF

Written 2026-09-04. Replace this file next session; do not append.

## State

`main` is `f1ec17b`; production deployed from it 2026-08-30 and is green.
`@passkeybridge/satus@0.3.11` is `latest` on npm and the repo agrees. 70 CLI
tests pass, `tsc` clean, both build gates pass.

Today's post went live at its 09:00 slot on all four surfaces. Two remain
embargoed: 2026-09-11 and 09-18.

## In flight

`claude/satus-migration-independence-sqhdxp` has **two commits not on
`main`**, so neither is in production:

1. `109616c` — the 23 genuine lint errors are now 0. Typing the Stripe
   webhook against the SDK's `Event` union surfaced a real gap; see
   `mem/followups/refund-revocation-rides-on-a-removed-field.md`.
2. `841c3c6` — **live behaviour change, needs a deploy to take effect.**
   The Resend suppression webhook is account-wide and was letting other
   products' bounces block satus license keys. See
   `mem/incidents/2026-09-04-account-wide-resend-webhook-poisoned-suppressions.md`.

## Flags

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.**
- **79 poisoned suppression rows left in place** deliberately. Deleting them
  is the owner's call; the incident note says how to identify them.
- **`env-query-invalid` fired again 2026-09-03** (two hits 14:54, one 18:14).
  All six live Stripe endpoints carry `?env=`, and nothing of ours posts
  there unsigned. Unresolved because test-mode endpoints are not readable
  from this session — check Stripe Dashboard → test mode → Webhooks for a
  satus.sh URL missing `?env=sandbox`.
- **~4,000 `prettier/prettier` errors** repo-wide, pre-existing. A
  `format-the-codebase` branch exists from 2026-09-01.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs`.
- **Purging the app-builder platform.** Done 2026-08-27 in `3abfa27`.
- **Re-running the red `v0.3.8` tag workflow.** Permanent and harmless.

## Graduated this session

- `mem/followups/refund-revocation-rides-on-a-removed-field.md`
- `mem/incidents/2026-09-04-account-wide-resend-webhook-poisoned-suppressions.md`

## Next

1. Merge and deploy the two branch commits.
2. Still a business decision: the three `(planned)` Team features on
   `/pricing`, and whether to define a real support SLA.
3. Content plan resumes at Q3 item 9.
