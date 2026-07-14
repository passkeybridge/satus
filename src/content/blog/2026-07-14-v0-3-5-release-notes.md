---
slug: v0-3-5-release-notes
title: "v0.3.5: automated npm publishing, two bug fixes"
description: satus 0.3.5 moves npm releases onto a tag-triggered GitHub Actions workflow with npm provenance, and ships two small fixes to introspection and CI. No CLI behavior changes.
date: 2026-07-14
author: satus.sh
tags: [release, ci, github, npm]
draft: false
---

`@passkeybridge/satus@0.3.5` is on npm. This is a maintenance release: one CI improvement, two bug fixes, no changes to CLI flags, config, or telemetry. If v0.3.4 works for you today, v0.3.5 works the same way.

The release itself is the first one published by the new tag-triggered workflow described below.

## Automated publishing

Tagging `v*.*.*` on `main` now triggers a GitHub Actions workflow that builds and publishes the CLI to npm. The workflow lives at [`.github/workflows/cli-publish.yml`](https://github.com/passkeybridge/satus/blob/main/.github/workflows/cli-publish.yml) and does four things worth naming explicitly:

1. **Verifies the tag matches `packages/cli/package.json`.** If you push `v0.3.6` while `package.json` still says `0.3.5`, the workflow fails at the guard step before touching npm. This prevents the class of mistake where a tag and a package version drift out of sync.
2. **Runs `npm ci` and `npm run build`** in `packages/cli/`. The `prepublishOnly` script also runs `tsc --noEmit`, so a type error blocks publish regardless of what the tag says.
3. **Publishes with `--provenance`.** The workflow requests `id-token: write` and passes `--provenance` to `npm publish`, which attaches a signed [npm provenance statement](https://docs.npmjs.com/generating-provenance-statements) linking the tarball back to the exact GitHub Actions run and source commit. Consumers can verify the chain with `npm audit signatures`.
4. **Uses a scoped `NPM_PUBLISH_TOKEN` repository secret.** The token is a granular npm access token with publish rights limited to `@passkeybridge/satus` and no other permissions. `workflow_dispatch` with `dry_run: true` is available for testing the pipeline without cutting a release.

Nothing about installing or running the CLI changes. `npm i -g @passkeybridge/satus` continues to work the same way; the difference is that the tarball on npm is now produced by a reproducible pipeline on tag push instead of a laptop.

## Bug fixes

**Introspection SQL alias.** The single-CTE catalog introspection query (introduced in [v0.2.0](/blog/v0-2-0-deferred-constraints-faster-planning-smaller-binary)) had a column alias that could fail on schemas containing quoted identifiers with mixed case (e.g. `"UserID"`). The alias is corrected in v0.3.5. No config change required.

**Action selftest build.** [`.github/workflows/action-selftest.yml`](https://github.com/passkeybridge/satus/blob/main/.github/workflows/action-selftest.yml), which loads the [pagila](https://github.com/devrimgunduz/pagila) schema and runs `satus generate` end-to-end against it on every push to `packages/action/`, previously failed on cold clones because the composite action's build step didn't install its own dependencies before invoking the CLI. The workflow now installs `packages/cli/` dependencies as an explicit step. This only affected the selftest workflow itself, not user-run installs of the Action.

## Backward compatibility

No CLI flags added, removed, or renamed. No telemetry schema changes. No changes to `satus.config.json` semantics. Every `satus.config.json` file that worked with v0.3.x continues to work unchanged.

## References

- [`@passkeybridge/satus` on npm](https://www.npmjs.com/package/@passkeybridge/satus)
- [`cli-publish.yml` workflow source](https://github.com/passkeybridge/satus/blob/main/.github/workflows/cli-publish.yml)
- [npm provenance statements](https://docs.npmjs.com/generating-provenance-statements) — verification with `npm audit signatures`
- [v0.3.3 release notes](/blog/v0-3-3-release-notes) — the previous release, adds the GitHub Action and telemetry fingerprints
- [v0.2.0 release notes](/blog/v0-2-0-deferred-constraints-faster-planning-smaller-binary) — original single-CTE introspection design
- [satus on GitHub](https://github.com/passkeybridge/satus)
