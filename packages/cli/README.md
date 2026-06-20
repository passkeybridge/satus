# satus

> Generate realistic seed data for Postgres. Respects foreign keys, unique constraints, and your schema.

`satus` is a command-line tool that introspects your Postgres schema, topologically sorts your tables by foreign-key dependency, and writes seed rows that actually look like the product you're building. No more `user_1@example.com`, `Lorem ipsum`, or invoices that reference orders that reference customers that don't exist.

- Website: <https://satus.sh>
- Marketing repo: [passkeybridge/satus](https://github.com/passkeybridge/satus) (private)
- Contact: <support@satus.sh>

## Status

`v0.3.0` — released 2026-06-20. Adds first-class Anthropic support alongside OpenAI, formalizes the provider abstraction, prints per-batch token and cost breakdowns via `--verbose`, and emits machine-readable run summaries via `--json` so CI can parse them. Telemetry now records the provider and token counts. Previous release notes: [satus.sh/blog](https://satus.sh/blog) and [satus.sh/cli](https://satus.sh/cli).

## Install

```bash
npm install -g @passkeybridge/satus
```

The package is published under the PasskeyBridge namespace on npm. The binary it installs is `satus`, so all commands below are typed as `satus ...`.

Requires Node.js 20+.

## Quickstart

```bash
satus init                                # write satus.config.json
satus generate --profile saas --rows 25   # seed against the configured DB
satus generate --profile saas --dry-run   # plan only, no LLM call, no writes
```

## Commands

| Command | Description |
|---|---|
| `satus init` | Scaffold `satus.config.json` in the current directory. Flags: `--force`. |
| `satus generate` | Introspect schema and write seed rows. Flags: `--profile`, `--rows`, `--max-cost`, `--batch-size`, `--dsn`, `--schema`, `--provider`, `--model`, `--truncate`, `--dry-run`, `-v / --verbose`, `--json`. |
| `satus activate <key>` | Activate a Pro or Team license key. |
| `satus whoami` | Print the currently activated license (from local cache). |
| `satus --help` | Full command reference. |

## Reference profiles

| Profile | Shape |
|---|---|
| `saas` | Users, orgs, memberships, subscriptions, usage events. |
| `ecommerce` | Customers, products, variants, orders, line items, inventory. |
| `b2b` | Accounts, contacts, opportunities, activities, line items. |

## License tiers

| Tier | Price | Rows/table | Max tables | Profiles | LLM key |
|---|---|---|---|---|---|
| Free | $0 | 25 | 5 | all three | BYO |
| Pro | $19/mo | unlimited | unlimited | all three | BYO |
| Team | $79/mo | unlimited | unlimited | all three + custom | BYO, shared license |

License keys are verified against `https://satus.sh/api/public/license/verify` and cached locally for 24 hours under `~/.satus/`.

## Bring your own LLM key

`satus` calls an LLM provider for structured content generation. You bring the key; the request goes from your machine directly to the provider. satus.sh is never in the data path.

### Supported providers

| Provider | Env var | Default model | Get a key |
|---|---|---|---|
| OpenAI | `OPENAI_API_KEY` | `gpt-4o-mini` | <https://platform.openai.com/api-keys> |
| Anthropic | `ANTHROPIC_API_KEY` | `claude-haiku-4-5` | <https://console.anthropic.com/settings/keys> |

### Selecting a provider

Precedence (highest first):

1. `--provider openai|anthropic` flag on `satus generate`.
2. `provider` field in `satus.config.json`.
3. **Auto-detect** from which env var is set.

If both `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` are exported and you pass no flag and no config, the run aborts with a clear message — auto-detect deliberately refuses to guess so a misplaced key never spends on the wrong invoice.

Model resolution is the same shape: `--model` flag wins, otherwise the config field, otherwise the provider's default model. Cross-provider model names are not validated client-side; the upstream 4xx surfaces verbatim if you pass `gpt-4o-mini` with `--provider anthropic`.

### Cost reporting

Every run prints `tokens: N in / M out   spent: $X.XXXX` on success. The estimate uses a small built-in price table per provider; `--max-cost` (default `$1.00`) is enforced live and aborts the run before commit if you'd overshoot.

For per-call detail, pass `-v` / `--verbose` — every batch logs a line:

```
· users                        batch=1 rows=25 in=842 out=1310 $0.0011
```

For CI, pass `--json` to get a single newline-terminated JSON object on stdout (snake_case keys, matching the telemetry payload) while all human output is redirected to stderr:

```json
{"run_id":"...","status":"success","provider":"openai","model":"gpt-4o-mini","profile":"saas","target_schema":"public","tables":[{"name":"users","rows_generated":25}],"total_rows":25,"total_cost_usd":0.001100,"input_tokens":842,"output_tokens":1310,"duration_ms":3142}
```

Anthropic pricing rates in the built-in table are intentionally conservative until verified against Anthropic's public pricing page on the day of a release; `--max-cost` therefore errs on the safe side for Anthropic runs. OpenAI rates are pinned and dated in `packages/cli/src/generate/providers/openai.ts`.

### Custom endpoints

`OPENAI_BASE_URL` and `ANTHROPIC_BASE_URL` are honored if you need to point at an OpenAI- or Anthropic-compatible proxy (Groq, Together, a local gateway, a corporate egress).

## Privacy

`satus` never sends your schema, your data, or your column names to satus.sh. The only network call to satus.sh is the license verify, which sends your license key and nothing else. LLM calls go directly from your machine to your provider with your key. Anonymous run telemetry (provider, model, profile, table count, row count, duration, token totals — no table or column names, no row data) is posted to satus.sh on completion; failures swallow silently and never break a run.

## Development

```bash
git clone git@github.com:passkeybridge/satus.git
cd satus/packages/cli
npm install
npm run dev       # tsup --watch
npm test
```

## License

Proprietary. Copyright (c) 2026 PasskeyBridge LLC. All rights reserved. See [`LICENSE`](./LICENSE).

## Security

Report vulnerabilities to <support@satus.sh>. Do not open public issues for security reports.
