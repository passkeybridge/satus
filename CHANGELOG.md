# Changelog

All notable changes to `@passkeybridge/satus` are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The CLI tarball ships from `packages/cli/` under `@passkeybridge/satus`. The marketing site at <https://satus.sh> bumps the version chip in the same release.

## [0.3.5] — 2026-07-14

### Added

- **Automated npm publishing.** New GitHub Actions workflow publishes `@passkeybridge/satus` to npm on every `v*` tag push, using the `NPM_PUBLISH_TOKEN` repo secret. Removes the manual `npm publish` step from the release checklist.

### Fixed

- **Introspection SQL alias.** Corrected a column alias in the single-CTE catalog introspection query that caused `satus generate` to fail on schemas containing quoted identifiers with mixed case. No config changes required.
- **Selftest build failure.** `.github/workflows/action-selftest.yml` no longer fails on cold clones — the composite action's build step now installs `packages/cli` dependencies before invoking `satus generate`.

### Changed

- **CLI terminal chrome.** The command-box caret is now rendered inline (matches the `satus>` prompt cadence). The red perimeter animation on the marketing hero was removed; the border now uses a static uniform red at the same weight.

### Backward compatibility

- No CLI flags added, removed, or renamed. No telemetry schema changes. `satus.config.json` from 0.3.x continues to work unchanged.

## [0.3.3] — 2026-07-15


### Added

- **GitHub Action.** `passkeybridge/satus-action@v1` — composite action that wraps `satus generate` for PR-preview databases. Ships in `packages/action/`; documented at <https://satus.sh/docs/github-action>. No CLI semantic changes; the action is a thin `npx --yes @passkeybridge/satus@<version> generate --json` wrapper plus a workflow-artifact upload of the JSON manifest.
- **Opt-in failure fingerprints.** New `telemetry.share_failure_fingerprints` field in `satus.config.json` (default `false`). When enabled, `satus generate` reports a SHA-256 of the normalised schema shape (`schema_fingerprint`), the first-error validator rule (`validator_class`), and the subcommand + flag names of the invocation (`invocation_sequence`, never flag values). Feeds the eval fixture set for v0.4.0 (`satus agent`). See `packages/cli/src/generate/fingerprint.ts`.
- **`satus init`** prompts for the new telemetry knob with plain-English wording; the default answer is `no`.

### Changed

- `satus_runs` telemetry table gains three optional columns (`schema_fingerprint`, `validator_class`, `invocation_sequence`). All nullable, covered by the existing service-role policy and the 90-day pruning cron.
- The `/api/public/cli/run` ingest zod schema accepts the new fields with bounded shapes (64-char hex, ≤ 64-char rule name, ≤ 16-entry array of ≤ 32-char strings).

### Backward compatibility

- v0.2.x / v0.3.0–0.3.2 CLIs continue to ingest — every new field is optional at every layer.
- No CLI flag was removed or renamed. No existing telemetry field changed shape.
- Existing `satus.config.json` files keep working unchanged; the new `telemetry` object defaults to `{ share_failure_fingerprints: false }`.


## [0.3.0] — 2026-06-20

### Added

- **Anthropic provider.** `satus generate` can now call Anthropic's Messages API as a first-class peer to OpenAI. Structured output uses tool-use forcing (`tool_choice: { type: 'tool', name: 'emit_rows' }`) so the model is required to emit the row object directly — no JSON-string parsing on our side. Default model is `claude-haiku-4-5`; pin a different one with `--model`.
- **`--provider openai|anthropic` flag** on `satus generate`, plus a matching `provider` field in `satus.config.json`. Precedence: flag > config > env-var auto-detect.
- **Auto-detect.** When no flag and no config field are set, the CLI picks the provider whose API key is exported. If both `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` are set, the run aborts with a clear error rather than silently picking one.
- **`-v` / `--verbose` flag.** Prints a one-line per-batch breakdown: `· <table> batch=N rows=R in=I out=O $0.XXXX`. The default one-line summary is unchanged.
- **`--json` flag.** Emits a single newline-terminated JSON object on stdout at completion (snake_case keys matching the telemetry payload and Postgres column names). All human-readable output is redirected to stderr in this mode so stdout is safe for `jq` and CI scripts. Three shapes: `success`, `failed`, and `dry_run`.
- **Token-count reporting.** The success summary now reads `tokens: <input> in / <output> out   spent: $X.XXXX`. Token totals are also persisted to `public.satus_runs` (new nullable columns `provider`, `input_tokens`, `output_tokens`).
- **`OPENAI_BASE_URL` and `ANTHROPIC_BASE_URL`** are honored for both providers if you need to point at a compatible proxy.

### Changed

- The CLI no longer assumes OpenAI when neither key is set; the missing-key error now names whichever provider was selected (`OPENAI_API_KEY is not set.` or `ANTHROPIC_API_KEY is not set.`).
- `satus init` now prompts for the provider and chooses the matching default model.
- Internal refactor: row generation went through a new `Provider` interface (`src/generate/providers/types.ts`). Existing OpenAI behavior is preserved byte-identically.

### Backward compatibility

- v0.2.x telemetry payloads continue to ingest. The three new `satus_runs` columns are nullable and the ingest validator marks them `.optional()`.
- Existing `satus.config.json` files keep working unchanged — the new `provider` and `model` fields are both optional. Old configs that pinned `model: "gpt-4o-mini"` still run against OpenAI.
- Exit codes are unchanged.

## [0.2.0] — 2026-06-04

- Deferred-constraint handling for soft FK cycles in a single transaction.
- Single-CTE catalog introspection (five round-trips collapsed to one).
- Tarball shrunk from 104 kB to 23 kB by dropping shipped sourcemaps and turning on minification.
- CITEXT detection and case-folding before insert.
- Partitioned-parent RLS detection with inline remediation.

## [0.1.1] — 2026-05-26

- Initial public release under `@passkeybridge/satus`.
