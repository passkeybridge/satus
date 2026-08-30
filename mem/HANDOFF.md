# HANDOFF

Written 2026-08-30. Replace this file next session; do not append.

## State

`main` is `84b1723`, tree clean. `@passkeybridge/satus@0.3.11` is `latest`
on npm with SLSA provenance, and the repo's version constants agree. Every
published version now has a git tag.

70 CLI tests pass. Both build gates pass and both run ahead of `vite build`,
so a failure blocks the deploy: `validate-blog.mjs` (43 posts) and
`validate-docs.mjs`. Production is green.

## In flight

none

## Flags

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.** Releases fail at the publish
  step once it lapses. A reminder was scheduled for 2026-10-01; whether that
  trigger still exists cannot be verified from the repo.
- **Three posts are embargoed** to 09:00 America/New_York on 2026-09-04,
  09-11 and 09-18. They are on `main` and invisible until then. See
  `mem/features/blog-scheduling-and-embargo.md`, which records the
  mechanism's first live firing, verified against production.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason, not left
  open. Our row schema uses four keywords Anthropic's strict mode rejects,
  so enabling it would 400 every request rather than tighten anything. The
  reasoning is in the provider's header comment.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs` instead.
- **Purging the app-builder platform this project started on.** Done
  2026-08-27 in `3abfa27`: build config, email routes, two Postgres
  functions, the Resend webhook, all prose. The vendor's name appears
  nowhere in the tracked tree and its package does not reinstall from the
  lockfile. A trace is a leftover, not a dependency.
- **Re-running the red `v0.3.8` tag workflow.** Permanent and harmless; see
  `mem/features/release-and-deploy-traps.md`.
- **Hunting the cycle-breaking heuristic's missing rules.** Three of the
  four published rules were never implemented; the code is right and the May
  post now carries a correction.

## Graduated this session

- `mem/features/blog-scheduling-and-embargo.md`
- `mem/features/telemetry-is-opt-in.md`
- `mem/incidents/2026-08-26-stripe-webhook-missing-env-param.md`

## Next

1. **A business decision, not an engineering one.** Three Team features on
   `/pricing` — shared team profiles, CI mode, audit log — are marked
   `(planned)` and do not exist in the CLI. Build them, drop them, or leave
   them labelled; same call on whether to define a real support SLA. See
   `mem/followups/prose-claims-have-no-automated-check.md`.
2. Content plan resumes at Q3 item 9. Items 1-2 were cut, 3-8 are written or
   deliberately skipped.
3. A habit, not a task: read the load-bearing doc pages next to the code
   they describe. `validate-docs` cannot check sentences, and every prose
   defect found this month was found by reading one.
