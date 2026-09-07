# HANDOFF

Written 2026-09-07. Replace this file next session; do not append.

## State

`main` is `a0e3984`, and production is confirmed serving it —
`dpl_5PeaBDyC4J4Ra5TuwP9gUgQuBWDb`, `target: "production"`, `READY`, alias
list contains `satus.sh`. The branch is level. Nothing is waiting to ship;
`git branch -r --no-merged origin/main` is empty.
`@passkeybridge/satus@0.3.11` is `latest` on npm.

Gates: `tsc` clean, 0 genuine lint errors, 15 site tests, 70 CLI tests, four
build validators (blog, docs, headings, env-files). Post-deploy e2e health
passed all four checks against production.

Two posts remain embargoed: 09-11 (written, on `main`) and 09-18.

## Shipped this session

- **The site has CI.** `.github/workflows/site-ci.yml` — typecheck, tests,
  gates, lint, build. Run #1 green. Previously only `cli-ci.yml` existed and
  nothing ran the site's tests.
- **`scripts/validate-env-files.mjs`** fails the build if a tracked `.env*`
  holds a secret, by key name or value shape. This repo is public and
  `.env*` is tracked on purpose; the hazard is the next edit.

## Graduated this session

Nothing new — this session's durable lesson went into an existing file:
`mem/features/release-and-deploy-traps.md` gained **"Pushing `main` is not
deploying `main`"**. Read it before any deploy.

## Verify the deployment, not the push

`b1a31b0` went to `main` and never reached production. Pushing the same SHA
to `main` and a working branch seconds apart made Vercel emit one
deployment, attributed to the branch, `target: null`. `main` moved,
production did not, nothing failed. Push `main` alone, then confirm a
deployment for that SHA with `target: "production"`, state `READY`, and
`satus.sh` in its `alias` list. **The alias list is the proof** — timings
and states are not.

## Flags

- **The prettier decision is the owner's.** ~4,050 pre-existing
  `prettier/prettier` errors, so CI disables that one rule and only that
  one. `bunx prettier --write .` fixes it and touches nearly every file.
  Until then, formatting is unenforced.
- **`cli-ci.yml` pins `node-version: '20'`,** which GitHub is deprecating.
- **`NPM_PUBLISH_TOKEN` expires 2026-10-12.**
- **79 poisoned suppression rows left in place** deliberately; the incident
  note says how to identify them.
- **Refund revocation rides on `Charge.invoice`,** which basil removed.

## Do not redo

- **`strict: true` on the Anthropic tool.** Closed with a reason.
- **The docs-vs-code audit.** Run `node scripts/validate-docs.mjs`.
- **Purging the app-builder platform.** Done 2026-08-27 in `3abfa27`.

## Next

1. Business decision: the three `(planned)` Team features on `/pricing`, and
   whether to define a real support SLA.
2. Content plan resumes at Q3 item 9.
