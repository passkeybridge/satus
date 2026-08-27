# HANDOFF

Written 2026-08-27. Replace this file next session; do not append.

## State

`main` is `3abfa27`, working tree clean, `@passkeybridge/satus@0.3.11` is
`latest` on npm (published 2026-08-27 by workflow dispatch, SLSA
provenance). Repo version constants all read `0.3.11`.

70 tests pass across 6 files (`packages/cli`). Both build gates pass:
`scripts/validate-blog.mjs` (43 posts) and `scripts/validate-docs.mjs`.
Both run ahead of `vite build`, so a failure blocks the Vercel deploy.

Production verified green today: site deployed from `main`, zero runtime
errors, the published tarball reproduces both v0.3.11 fixes when installed
from the registry.

Remote tags: `v0.3.3 v0.3.5 v0.3.7 v0.3.8 v0.3.9`.

## In flight

none

## Flags

- **`v0.3.10` and `v0.3.11` are published to npm with no git tag.** Tag
  pushes 403 through this environment's proxy; branch pushes are fine, and
  the GitHub MCP has no tag-creation tool. Must be done from a machine with
  direct GitHub access. See `mem/followups/untagged-published-releases.md`.
- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.** Releases fail at the publish
  step once it lapses. A one-shot reminder was scheduled for 2026-10-01;
  whether that trigger still exists cannot be verified from the repo.
- **Four blog posts are embargoed, not published.** `publishAt` in their
  frontmatter puts them live at 09:00 America/New_York on 2026-08-28,
  09-04, 09-11 and 09-18. They are on `main` and invisible until then.
  Two of them describe the v0.3.11 telemetry change as done, which it is.
- **Do not "fix" the missing `strict: true` on the Anthropic tool.**
  Closed 2026-08-27 with a reason, not left open. Anthropic's strict mode
  accepts only a JSON Schema subset and 400s on the rest; our row schema
  uses four excluded things (`maxLength`, `maxItems`, `minItems > 1`, and
  `{"type":["string","null"]}` for nullable columns). Enabling it would
  fail every request rather than tighten anything. The reasoning is in the
  provider's header comment.

## Do not redo

- The docs-vs-code audit. Run `node scripts/validate-docs.mjs` instead of
  re-checking flags, exit codes, caps, profiles, models, or versions.
- Purging the old app-builder platform this project started on. Finished
  2026-08-27 across the build config (vite.config.ts is now hand-written),
  the email route paths (`/api/internal/email/*`), the two Postgres
  dispatch functions, the Resend webhook, and all prose. The vendor's name
  appears nowhere in the tracked tree and its package does not reinstall
  from the lockfile. If you find a trace, it is a leftover, not a
  dependency.
- Re-running the failed `v0.3.8` tag workflow. Red because a tag runs the
  workflow at its own commit, which predates the fix. Permanent, harmless.
- Hunting for the cycle-breaking heuristic's missing rules. Three of the
  four published rules were never implemented; the code is right and the
  May 2026 post now carries a correction.

## Graduated this session

- `mem/features/blog-scheduling-and-embargo.md`
- `mem/features/telemetry-is-opt-in.md`
- `mem/incidents/2026-08-26-stripe-webhook-missing-env-param.md`

## Next

1. Push `v0.3.10` and `v0.3.11` tags from a machine with GitHub access.
2. Decide the three `(planned)` Team features and the support SLA — see
   `mem/followups/prose-claims-have-no-automated-check.md`.
3. Content plan resumes at Q3 item 9 onward; items 1 and 2 were cut and
   items 3–8 are written or deliberately skipped.
