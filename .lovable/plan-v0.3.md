# satus v0.3.0 — Pass 1 spec (BYO-key, OpenAI + Anthropic, cost reporting)

Status: draft for founder approval. Built from a read of v0.2.0 source on
2026-06-20; no assumptions about prior conversations.

## 1. What v0.2.0 already ships

This shrinks v0.3.0 considerably. Confirmed by reading the code, not memory:

- **BYO-key is already the model.** `commands/generate.ts:54` reads
  `process.env.OPENAI_API_KEY`; the CLI never proxies through satus.sh.
- **Cost reporting already exists.** `generate/llm.ts` defines `LlmUsage`,
  `CostBudget`, a per-model `PRICING` map (gpt-4o / 4o-mini / 4.1 / 4.1-mini),
  and a `FALLBACK_PRICE`. The runner enforces `--max-cost`, aborts mid-run on
  overrun, and prints `spent: $X.XXXX` on success.
- **Structured output works** via OpenAI `response_format: json_schema` with
  `strict: true`, called over raw `fetch` (no SDK dep).
- **Telemetry already records `model` and `total_cost_usd`.** The Postgres
  table `public.satus_runs` (migration `20260526152105_*.sql`) has columns
  `model text`, `total_cost_usd numeric(10,6)`, `cli_version text`. No
  `provider` column yet.
- **Custom OpenAI-compatible endpoints already work** via `OPENAI_BASE_URL`.
  Users could already point at Together/Groq/Ollama if they wanted.

So v0.3.0 is not "introduce BYO-key" — it is "add Anthropic as a first-class
peer to OpenAI, formalize the provider abstraction, and round out the cost
reporting that's already there."

## 2. v0.3.0 scope (what actually ships)

### 2.1 Provider abstraction (refactor, no behavior change)

New file `packages/cli/src/generate/providers/index.ts` exporting:

```ts
export interface Provider {
  id: 'openai' | 'anthropic'
  defaultModel: string
  generate<T>(req: ProviderRequest): Promise<ProviderResponse<T>>
}
```

Existing `chatJson` becomes the `openai` provider's `generate`. The runner
stops importing `chatJson` directly; it receives a `Provider` from the
command layer. Tests stay green with zero behavior change before Pass 3
adds Anthropic.

### 2.2 Anthropic provider

New file `packages/cli/src/generate/providers/anthropic.ts`.

- Endpoint: `https://api.anthropic.com/v1/messages` (override with
  `ANTHROPIC_BASE_URL`).
- Auth: header `x-api-key: <key>` + `anthropic-version: 2023-06-01`.
- Structured output: Anthropic does **not** support `response_format:
  json_schema`. We use **tool-use forcing**: register a single tool whose
  `input_schema` is our row schema, then set
  `tool_choice: { type: 'tool', name: 'emit_rows' }`. The model's first
  content block of type `tool_use` carries the parsed object — no JSON
  string parsing needed.
- Usage: read `usage.input_tokens` / `usage.output_tokens` from the
  response.
- Default model: `claude-haiku-4-5` (cheapest current Claude; verify the
  exact id at implementation time against Anthropic's pricing page and
  pin it in code with a dated comment).
- Pricing map keys + values: filled in during Pass 4 from Anthropic's
  published `$/MTok` page on the day of implementation. Same `priceFor()`
  prefix-match logic as OpenAI. Same `FALLBACK_PRICE` posture.

### 2.3 Provider selection

CLI flag: `--provider <openai|anthropic>`. Config field: `provider` in
`satus.config.json`. Precedence: flag > config > **auto-detect**.

Auto-detect rule (only one source of truth, no magic):

- If `ANTHROPIC_API_KEY` is set and `OPENAI_API_KEY` is not → `anthropic`.
- If `OPENAI_API_KEY` is set and `ANTHROPIC_API_KEY` is not → `openai`.
- If both are set → error with a clear message: "Both keys are set. Pass
  `--provider openai|anthropic` or set `provider` in `satus.config.json`."
- If neither → existing error message, updated to mention both env vars.

Model resolution: `--model` overrides config; config overrides the
provider's `defaultModel`. Cross-provider model names are not validated
client-side — if the user passes `gpt-4o-mini` with `--provider anthropic`,
the upstream 400 is surfaced verbatim.

### 2.4 Cost reporting polish

The numbers exist; the surface gets two small additions:

1. **Per-call breakdown in `--verbose`.** New flag prints
   `table.batch_n: in=<tok> out=<tok> $<usd>` so users can see which
   tables are expensive. Default output stays the current one-line
   `spent: $X.XXXX` summary — verbose is opt-in.
2. **`--json` output mode.** Prints a single JSON object to stdout on
   completion: `{ run_id, provider, model, tables: [...], total_rows,
   total_cost_usd, input_tokens, output_tokens, duration_ms }`. Existing
   human output goes to stderr in this mode. Enables CI scripting and is
   the foundation for the future "GitHub Action" surface the founder
   flagged in the 90-day learning goals.

### 2.5 Telemetry

One backward-compatible migration: add nullable columns to
`public.satus_runs`:

```sql
ALTER TABLE public.satus_runs
  ADD COLUMN provider text,
  ADD COLUMN input_tokens integer,
  ADD COLUMN output_tokens integer;
```

Update the ingest route `src/routes/api/public/cli/run.ts` to accept and
persist the three new fields (all optional in the zod schema). Old CLI
versions keep working — they just send NULL for the new columns.

### 2.6 Docs (Pass 5)

- `packages/cli/README.md`: add an "AI provider" section explaining BYO-key,
  the two supported providers, auto-detect, and a pointer to Anthropic /
  OpenAI key pages.
- `src/routes/quickstart.tsx`: add Anthropic to the env-var block.
- `src/routes/docs.how-it-works.tsx`: one paragraph on the provider
  abstraction.
- `public/llms.txt`: update the env-var list and exit-code table if
  exit codes change (they don't — error surface is unchanged).
- `CHANGELOG.md` (root): one entry.

## 3. Explicitly out of scope for v0.3.0

These are good ideas but not this release:

- Google Gemini support. (Different API shape again; one new provider per
  release keeps the blast radius small.)
- Hosted-key tier (+$10/mo). The 90-day plan calls this out as a
  hypothesis to test, not a build.
- Prompt eval suite / regression fixtures. Worth doing but unrelated to
  the v0.3.0 user-facing story.
- GitHub Action surface. `--json` mode is the prerequisite; the Action
  itself is its own release.
- Migrating off raw `fetch` to the AI SDK. Adds 200 kB to the bundle for
  no user-visible benefit; revisit if we add streaming or agent loops.

## 4. Risks and how we mitigate

| Risk | Mitigation |
|---|---|
| Anthropic tool-use returns malformed input for huge schemas (state-machine limits, like Gemini). | Same row-batch limit (`--batch-size`, default 25) as OpenAI. If Anthropic rejects, the error surfaces verbatim and the transaction rolls back — no half-written data. |
| Pricing drift between release and reality. | `FALLBACK_PRICE` already exists; the per-model map carries a `// last verified: YYYY-MM-DD` comment. The README states the figures are estimates, not invoices. |
| Both keys set, user surprised by which one ran. | Auto-detect errors out instead of silently picking one. |
| New telemetry columns break the published v0.2.x clients. | Columns are nullable; ingest validator marks them `.optional()`. Verified by sending a v0.2.0-shaped payload before deploying. |
| Anthropic `tool_use` block shape changes. | Pin `anthropic-version: 2023-06-01` header; that version of the API is stable and documented. |

## 5. Pass-by-pass execution (binding once you approve)

| Pass | Deliverable | Verification before moving on |
|---|---|---|
| **1 (this doc)** | Spec at `.lovable/plan-v0.3.md`. | Founder approval. |
| **2** | `Provider` interface; `openai.ts` is the existing code, moved. Runner takes a `Provider` parameter. No new features. | `npm test` green; manual `satus generate --dry-run` on a fixture DB produces byte-identical output to v0.2.0. |
| **3** | `anthropic.ts`; `--provider` flag; auto-detect; config field. | Real `satus generate` against `corpus/pagila` with `ANTHROPIC_API_KEY` set, then again with `OPENAI_API_KEY` set. Both must complete and insert the expected row counts. Both error paths (no key / both keys) verified manually. |
| **4** | `--verbose` per-call breakdown; `--json` mode; telemetry migration; ingest route update. | Migration applied; `satus generate --json` parsed with `jq`; verify a v0.2.0 client payload still ingests (backward compat). |
| **5** | README, quickstart, how-it-works, llms.txt, CHANGELOG. Version bump to 0.3.0. `npm publish`. Smoke test the published tarball in a clean dir against both providers. | Tarball install + run succeeds end-to-end on both providers. GitHub release tagged. |
| **6** | Blog post (Week 4 Slot 3) written against the shipped 0.3.0 binary. Real command output, real cost numbers from a real run, real error text. | Founder review against `mem://content/post-rules` and `mem://content/no-fabricated-stats`. |

## 6. Decisions locked (2026-06-20)

1. **Anthropic default model:** `claude-haiku-4-5`. Verify exact id at
   implementation time and pin with a dated comment.
2. **`--json` field names:** snake_case. Matches the existing telemetry
   payload, matches the Postgres column names users will join against,
   and matches CLI-JSON convention (`gh`, `aws`, `kubectl`).
3. **Verbose flag:** wire both `--verbose` and `-v`. Standard Commander
   shape, no collision with `--version`.

Awaiting founder go-ahead before starting Pass 2.

