# HANDOFF

Written 2026-09-11. Replace this file next session; do not append.

## State

`main` is `6e261a9`+, production serving it
(`dpl_AqzjXarR7httLL1iUh2egGZoPg3o`, `target: "production"`, `READY`,
`satus.sh` aliased). `@passkeybridge/satus@0.3.11` is npm `latest`.

Gates: tsc clean, **eslint 0 errors with `prettier/prettier` enforced**, 15
site tests, 70 CLI tests, four validators, `prettier --check .` clean.
Post-deploy e2e passed; ten routes each return one `h1`.

Today's post published on schedule. 09-18 remains embargoed.

## Shipped today

- **`/api/public/hooks/e2e-health` took unauthenticated GET, unlimited.**
  One request writes a row, mints a magic link, makes two outbound calls,
  and mails support on failure — and its `license_verify` check hits our own
  limiter from this function's egress IP, so a flood turns every later
  request into email. Now 10/hour/IP, 60/day global, failing **closed**.
- **No `vercel.json` existed,** so only HSTS was set. Added nosniff,
  SAMEORIGIN, Referrer-Policy, Permissions-Policy.
- **Two posts corrected.** `satus_runs` holds ten rows; today's post and the
  v0.3.11 notes said twelve. "Four minutes apart" was 35 minutes.
- **Codebase formatted and enforced.** 4,084 errors to 0.

## Markdown is not formatted, on purpose

`*.md` is in `.prettierignore`. Prettier re-indented a YAML fragment in
`packages/action/README.md` and re-padded the `satus-version` table
`validate-docs.mjs` parses, which reports "(unparsed)" rather than failing.
eslint does not lint markdown anyway. That validator is quote-agnostic now:
its scans assumed single quotes, and a regex matching nothing reads as "no
findings", not a broken parser.

## Flags

- **Two dead branches cannot be deleted from here.**
  `claude/mem-handoff-and-claude-md` (`0b061f5`), `format-the-codebase`
  (`137d2a1`). The git proxy refuses delete-refspecs like tag pushes; GitHub
  MCP has no delete tool. **Delete them in the GitHub UI.**
- **TanStack bump deferred by the owner to its own pass.**
  GHSA-9m65-766c-r333 flags `start-server-core` 1.167.22, not exploitable
  here: root cause is seroval ≤1.5.2, we pin 1.6.2, and
  `createCheckoutSession` already has `.inputValidator()`.
- **CSP still missing, deliberately.** `/demo` runs PGlite (WASM),
  `/checkout` mounts Stripe Embedded Checkout; an untested policy breaks
  both.
- **e2e-health is rate limited, not authenticated.** The fix is a shared
  secret header, needing a new env var.
- `cli-ci.yml` pins deprecated Node 20. `NPM_PUBLISH_TOKEN` expires
  2026-10-12. 79 poisoned suppression rows left deliberately. Refund
  revocation rides on `Charge.invoice`, removed in basil.

## Do not redo

`strict: true` on the Anthropic tool; the docs-vs-code audit (run the
validator); purging the app-builder platform (`3abfa27`).

## Next

1. TanStack upgrade, its own pass.
2. `(planned)` Team features, support SLA.
3. Content plan resumes at Q3 item 9.
