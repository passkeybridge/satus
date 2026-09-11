# HANDOFF

Written 2026-09-11. Replace this file next session; do not append.

## State

`main` is `28329ef`, production serving it. `@passkeybridge/satus@0.3.11` is
npm `latest`. No unmerged branches.

Gates: tsc clean, eslint 0 errors with `prettier/prettier` enforced, 15 site
tests, 70 CLI tests, **five** validators (blog, docs, headings, env,
language), `prettier --check .` clean.

Today's post published on schedule. 09-18 remains embargoed.

## Shipped today

- **Security audit.** `/api/public/hooks/e2e-health` took unauthenticated
  GET with no limit; one request writes a row, mints a magic link, makes two
  outbound calls, and mails support on failure — and its `license_verify`
  check hits our own limiter from this function's egress IP, so a flood
  turns every later request into email. Now 10/hour/IP, 60/day global,
  failing **closed**. Added the four missing headers.
- **Two posts corrected.** `satus_runs` holds ten rows; today's post and the
  v0.3.11 notes said twelve. "Four minutes apart" was 35 minutes.
- **Formatted and enforced**, 4,084 lint errors to 0. **TanStack upgraded**,
  clearing GHSA-9m65-766c-r333. **House voice gated.**

## The voice is now a build gate

`mem/features/house-voice.md` records the rules, measured from 66,969
published words rather than invented, including what is deliberately **not**
linted (em dashes, contractions, rhetorical questions are house style).
`scripts/validate-language.mjs` enforces 24 phrases. The corpus needed no
edits.

## Graduated this session

`mem/features/house-voice.md` (new). `mem/features/docs-vs-code-drift-gate.md`
gained **"A regex that matches nothing reads as no findings"** — three
instances now, two of them today. Read it before editing any validator.

## Flags

- **`minimumReleaseAge = 86400` in `bunfig.toml`** blocked the newest
  TanStack (19h old). Took 1.168.51, same patched `start-server-core`
  1.169.33, no exemption. That file says to confirm before adding a bypass.
- **CSP still missing, deliberately.** `/demo` runs PGlite (WASM),
  `/checkout` mounts Stripe Embedded Checkout; an untested policy breaks
  both.
- **e2e-health is rate limited, not authenticated.** The fix is a shared
  secret header, needing a new env var.
- **19 `bun audit` findings remain**, all dev-tree tooling absent from the
  server bundle. The published CLI has four deps.
- `cli-ci.yml` pins deprecated Node 20. `NPM_PUBLISH_TOKEN` expires
  2026-10-12. 79 poisoned suppression rows left deliberately. Refund
  revocation rides on `Charge.invoice`, removed in basil.

## Do not redo

`strict: true` on the Anthropic tool; the docs-vs-code audit (run the
validator); purging the app-builder platform (`3abfa27`).

## Next

1. `(planned)` Team features on `/pricing`, and a support SLA.
2. Content plan resumes at Q3 item 9.
