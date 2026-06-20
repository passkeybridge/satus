# Changelog

All notable changes to `@passkeybridge/satus` are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The CLI tarball ships from `packages/cli/` under `@passkeybridge/satus`. The marketing site at <https://satus.sh> bumps the version chip in the same release.

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
