# HANDOFF

Written 2026-09-11. Replace this file next session; do not append.

## State

`main` is `6e261a9`, production confirmed serving it
(`dpl_AqzjXarR7httLL1iUh2egGZoPg3o`, `target: "production"`, `READY`,
`satus.sh` in its alias list). The working branch is level.
`@passkeybridge/satus@0.3.11` is `latest` on npm.

Gates: tsc clean, **eslint 0 errors with `prettier/prettier` now enforced**,
15 site tests, 70 CLI tests, four validators, `prettier --check .` clean.
site-ci run #5 green. Post-deploy e2e passed all four checks and all ten
spot-checked routes return one `h1`.

Today's post published on schedule. One embargoed post remains: 09-18.

## Shipped today

- **Security audit** (a third party claimed an issue by email; the mail was
  never visible here, so this was an independent audit).
  - `/api/public/hooks/e2e-health` took unauthenticated GET with no limit.
    One request writes a row, mints a magic link, makes two outbound calls,
    and mails support on failure — and the `license_verify` check runs
    against our own limiter from this function's egress IP, so a flood
    turns every later request into an email. Now 10/hour/IP and 60/day
    global, failing **closed**. Nobody had exploited it.
  - No `vercel.json` existed, so only HSTS was set. Added nosniff,
    SAMEORIGIN, Referrer-Policy, Permissions-Policy.
- **Two published posts corrected.** `satus_runs` holds ten rows; today's
  post and the v0.3.11 release notes both said twelve. "Four minutes apart"
  was 35 minutes. Numbers otherwise verified against the DB and source.
- **The codebase is formatted and formatting is enforced.** 4,084
  `prettier/prettier` errors to 0; the CI override is gone.

## Markdown is not formatted, on purpose

`*.md` is in `.prettierignore`. The first full prettier run re-indented a
YAML fragment in `packages/action/README.md` and re-padded the
`satus-version` table that `validate-docs.mjs` parses — which reports
"(unparsed)" rather than failing. eslint does not lint markdown, so
formatting it bought nothing. `validate-docs.mjs` is quote-agnostic in four
places now; its scans assumed single quotes, and a regex matching nothing
reads as "no findings", not as a broken parser.

## Flags

- **Two dead branches cannot be deleted from here.**
  `claude/mem-handoff-and-claude-md` (`0b061f5`, fully superseded) and
  `format-the-codebase` (`137d2a1`, superseded by `6e261a9`). The sandbox
  git proxy refuses delete-refspecs the way it refuses tag pushes, and the
  GitHub MCP server has no delete-branch tool. **Delete them in the GitHub
  UI** or the pre-flight check stays noisy.
- **TanStack bump deferred by the owner to the next pass.**
  GHSA-9m65-766c-r333 flags `start-server-core` 1.167.22, but it is not
  exploitable here: root cause is seroval ≤1.5.2 and we resolve 1.6.2 (only
  copy, pinned in `bun.lock`), and `createCheckoutSession` already has
  `.inputValidator()`. Clearing it means `@tanstack/react-start`
  1.167.50 → 1.168.52, which moves six sibling packages.
- **CSP is still missing**, deliberately. `/demo` runs PGlite (WASM) and
  `/checkout` mounts Stripe Embedded Checkout; a policy written without
  testing both would break the two pages that matter most.
- **e2e-health is still unauthenticated**, only rate limited. The real fix
  is a shared secret in a header, which needs a new deployment env var —
  cron job 4 calls a bare `net.http_get`.
- **`cli-ci.yml` pins deprecated `node-version: '20'`.**
- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.**
- **79 poisoned suppression rows** left in place deliberately.
- **Refund revocation rides on `Charge.invoice`,** removed in basil.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs`.
- **Purging the app-builder platform.** Done 2026-08-27 in `3abfa27`.

## Next

1. The TanStack upgrade, which the owner asked for as its own pass.
2. Business decision: three `(planned)` Team features on `/pricing`, and
   whether to define a support SLA.
3. Content plan resumes at Q3 item 9.
