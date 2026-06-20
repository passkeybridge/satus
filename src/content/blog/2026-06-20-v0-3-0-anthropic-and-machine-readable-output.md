---
slug: v0-3-0-anthropic-and-machine-readable-output
title: "v0.3.0: Anthropic as a first-class provider, and machine-readable output"
description: Anthropic joins OpenAI as a peer provider via tool-use forcing. A new --json flag emits a single snake_case object on stdout so CI can parse it. Token counts are now persisted alongside cost.
date: 2026-06-20
author: satus.sh
tags: [postgres, satus, release, anthropic, openai, cli]
draft: false
---

`@passkeybridge/satus@0.3.0` is on npm. Three changes worth writing up: Anthropic's Messages API is now a peer to OpenAI behind a single `Provider` interface, a new `--json` flag makes the run output safe to pipe into `jq`, and the success summary (and the telemetry row) now carries input/output token counts in addition to the dollar estimate. None of this changes how rows are generated. It changes who can generate them and what a CI script can do with the result.

## Two providers, one interface

v0.2.x assumed OpenAI. The HTTP call lived in `generate/llm.ts` and the runner imported `chatJson` directly. v0.3.0 deletes that file and introduces `src/generate/providers/`, with three small modules:

```text
providers/types.ts      Provider interface + request/response shapes
providers/openai.ts     existing chatJson, unchanged on the wire
providers/anthropic.ts  Messages API, tool-use forcing
providers/index.ts      resolve('openai' | 'anthropic', { apiKey, model })
```

The runner no longer knows which vendor is on the other end of the socket. It calls `provider.generate(req)` and reads back `{ data, usage: { inputTokens, outputTokens } }`. The OpenAI path is byte-identical to v0.2.x; the test suite that covered it before still covers it now.

## Structured output without `response_format`

Anthropic's Messages API does not support OpenAI-style `response_format: json_schema`. The model will happily return JSON if you ask politely, but "ask politely" is exactly the failure mode satus is designed to avoid. We use tool-use forcing instead:

1. Register a single tool named `emit_rows` whose `input_schema` is the row schema satus already built for OpenAI's strict mode.
2. Set `tool_choice: { type: 'tool', name: 'emit_rows' }`, which tells the model it is not allowed to reply with prose. Its first content block must be a `tool_use` invoking that tool.
3. Read the `tool_use` block's `input` directly. It is already a parsed object. No `JSON.parse`, no regex extraction, no "the model wrapped it in a code fence" branch.

The pinned API version is `2023-06-01`, the long-stable Messages surface that carried Claude 3 through 4.5 without breaking changes. Pinning rather than floating means an unannounced default flip on Anthropic's side cannot break a satus run mid-flight.

Default model is `claude-haiku-4-5`. Override with `--model` if you want Sonnet or a future Opus. We do not validate model names client-side; if you pass `gpt-4o-mini` with `--provider anthropic`, the upstream 400 is surfaced verbatim with the request id, because guessing for the user would be worse than the upstream error message.

## Provider selection: flag, config, or auto-detect

Precedence is `--provider` > `provider` field in `satus.config.json` > env-var auto-detect. The auto-detect rule is one paragraph of logic, written down here so it is not a surprise:

```text
ANTHROPIC_API_KEY set, OPENAI_API_KEY unset   -> anthropic
OPENAI_API_KEY set, ANTHROPIC_API_KEY unset   -> openai
both set, no flag, no config                  -> error, exit 1
neither set                                   -> error, exit 1, names the
                                                 provider you actually picked
```

The "both set" case used to silently pick OpenAI in early development drafts. We pulled that. Silent provider selection is the kind of behavior that makes a $40 run land on the wrong invoice.

## `--json` and `-v`

Two new flags. Default output is unchanged, so existing scripts keep working.

`-v` / `--verbose` prints a one-line per-batch breakdown so you can see which tables are expensive before the bill arrives:

```text
· users        batch=1 rows=200 in=412  out=2891  $0.0186
· orders       batch=1 rows=200 in=688  out=4502  $0.0294
· line_items   batch=1 rows=200 in=512  out=3711  $0.0235
```

`--json` emits a single newline-terminated object on stdout at completion and routes all human output to stderr. Keys are snake_case so they match the Postgres column names in `public.satus_runs` and the telemetry payload the CLI already sends. Three response shapes, distinguished by the `status` field:

```text
{ "status": "success",  "run_id": "...", "provider": "anthropic",
  "model": "claude-haiku-4-5", "tables": [...], "total_rows": 1000,
  "total_cost_usd": 0.0715, "input_tokens": 1612, "output_tokens": 11104,
  "duration_ms": 8412 }

{ "status": "failed",   "run_id": "...", "error": "rate_limited",
  "message": "...", "table": "orders", "batch": 3 }

{ "status": "dry_run",  "plan": [...], "estimated_rows": 1000 }
```

This is the foundation for the GitHub Action surface mentioned in the v0.1.0 roadmap. A workflow step can now run `satus generate --json | jq -e '.status == "success"'` and fail the build on a non-zero exit without scraping log output.

## Token counts in telemetry

The success summary used to print `spent: $0.0715`. It now prints both:

```text
tokens: 1612 in / 11104 out   spent: $0.0715
```

The same two numbers land in `public.satus_runs` as new nullable columns (`input_tokens`, `output_tokens`, plus `provider`). The migration is additive, so v0.2.x clients posting telemetry without those fields still ingest without an error. The Zod validator on the ingest route marks all three `.optional()`.

This matters because the dollar estimate is exactly that, an estimate against a built-in price table. Token counts are the thing the vendor actually bills. When the two diverge enough to matter, we want to see the divergence in our own data instead of finding out from a support ticket.

## Backward compatibility

- v0.2.x telemetry payloads continue to ingest unchanged.
- Existing `satus.config.json` files work as-is. `provider` and `model` are both optional.
- Exit codes are unchanged.
- The OpenAI request body, response handling, and pricing map are byte-identical to v0.2.0. Diffing a v0.2.x and v0.3.0 OpenAI run against a recorded fixture produces identical inserts.

## Release size

The published tarball metadata, from `npm view @passkeybridge/satus`:

```text
version   files   unpackedSize
0.2.0     4       29.4 kB
0.3.0     4       36.2 kB
```

The +6.8 kB is the Anthropic provider, the provider abstraction, and the `--json` / `--verbose` plumbing. No new runtime dependencies; both providers still call the upstream API with plain `fetch`.

## Upgrade

```bash
npm i -g @passkeybridge/satus@0.3.0
satus --version          # 0.3.0
export ANTHROPIC_API_KEY=sk-ant-...
satus generate --provider anthropic --rows 100
```

If you want to keep using OpenAI, no change is required; auto-detect will pick it as long as `OPENAI_API_KEY` is the only key in your environment. Full release notes are in [CHANGELOG.md](https://github.com/passkeybridge/satus/blob/main/CHANGELOG.md). The provider abstraction is in [`packages/cli/src/generate/providers/`](https://github.com/passkeybridge/satus/tree/main/packages/cli/src/generate/providers).

## What's next

Two questions we want the v0.3.0 telemetry to answer over the next 90 days:

1. **Provider split.** What fraction of runs land on Anthropic vs OpenAI? If it's lopsided either way, the cheaper provider's pricing map gets first-class treatment.
2. **Token-to-dollar drift.** How often does our estimate diverge from the invoice the user actually pays? If the answer is "often," the per-model entries in both pricing maps get last-verified comments and a quarterly refresh job.

Tell us at <support@satus.sh> if either lands badly on a real schema. Schema reproductions are the #1 maintenance task, and the test corpus in `corpus/` already covers five public OSS schemas — adding a sixth is cheap if we can see the `CREATE TABLE`.
