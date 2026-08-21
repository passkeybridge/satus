# HANDOFF

Written 2026-08-21. Replace this file next session; do not append.

## State

`main` is `9e47b64`, working tree clean, `@passkeybridge/satus@0.3.10` is
`latest` on npm (published 2026-08-14 from `9e47b64`, SLSA provenance).
Repo version constants all read `0.3.10`.

58 tests pass across 6 files (`packages/cli`). Both build gates pass:
`scripts/validate-blog.mjs` (37 posts) and `scripts/validate-docs.mjs`.
Both run ahead of `vite build` in the root `build` script, so a failure
blocks the Vercel deploy.

Remote tags: `v0.3.3 v0.3.5 v0.3.7 v0.3.8 v0.3.9`.

## In flight

none

## Flags

- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.** Releases fail at the publish
  step once it lapses. A one-shot reminder was scheduled for 2026-10-01;
  whether that trigger still exists cannot be verified from the repo.
- **Unsure: everything after `7e40acb`.** Seven commits (`8a12c2f`
  through `9e47b64`) landed in sessions this one did not observe —
  buyer-facing claim fixes, Team checkout gating, checkout ACK handling,
  unsubscribe scoping, license-grace enforcement, funnel instrumentation.
  Read those commits before assuming anything about that work.
- **Unsure: production health.** Not checked this session. Last verified
  green 2026-08-11.

## Do not redo

- The docs-vs-code audit (2026-08-10/11). Eleven claims were corrected and
  the mechanically checkable ones are now gated. Do not re-audit flags,
  exit codes, caps, profiles, models, or versions by hand — run
  `node scripts/validate-docs.mjs`.
- Re-running the failed `v0.3.8` tag workflow. It is red because a tag
  runs the workflow at its own commit, which predates the fix. Permanent
  and harmless.
- Investigating `.vercel/` in git. Resolved in `c3e2767`; it is ignored.

## Graduated this session

- `mem/incidents/2026-08-10-blog-frontmatter-took-down-every-route.md`
- `mem/features/docs-vs-code-drift-gate.md`
- `mem/features/release-and-deploy-traps.md`
- `mem/followups/untagged-published-releases.md`
- `mem/followups/prose-claims-have-no-automated-check.md`

## Next

1. Tag `v0.3.10` — see `mem/followups/untagged-published-releases.md`.
2. Read `8a12c2f..9e47b64` to pick up the unobserved work.
3. Decide the three `(planned)` Team features and the support SLA — see
   `mem/followups/prose-claims-have-no-automated-check.md`.
