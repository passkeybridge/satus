# satus

> Generate realistic seed data for Postgres. Respects foreign keys, unique constraints, and your schema.

`satus` is a command-line tool that introspects your Postgres schema, topologically sorts your tables by foreign-key dependency, and writes seed rows that actually look like the product you're building. No more `user_1@example.com`, `Lorem ipsum`, or invoices that reference orders that reference customers that don't exist.

- Website: <https://satus.sh>
- Marketing repo: [passkeybridge/satus](https://github.com/passkeybridge/satus) (private)
- Contact: <support@satus.sh>

## Status

`v0.2.0` — released 2026-06-04. Stable: schema introspection (single round-trip CTE), foreign-key DAG with cycle breaking on nullable back-edges, profile-driven generation, single-transaction writes, and BYO-key OpenAI integration. Roadmap and release notes live at [satus.sh/blog](https://satus.sh/blog) and [satus.sh/cli](https://satus.sh/cli).

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
| `satus generate` | Introspect schema and write seed rows. Flags: `--profile`, `--rows`, `--max-cost`, `--batch-size`, `--dsn`, `--schema`, `--model`, `--truncate`, `--dry-run`. |
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

| Tier | Price | Rows per run | Profiles | LLM key |
|---|---|---|---|---|
| Free | $0 | up to 1,000 | `saas` only | BYO |
| Pro | $19/mo | unlimited | all three | BYO |
| Team | $79/mo | unlimited | all three + custom | BYO, shared license |

License keys are verified against `https://satus.sh/api/public/license/verify` and cached locally for 24 hours under `~/.satus/`.

## Bring your own LLM key

`satus` calls OpenAI for structured content generation. You provide the key:

```bash
export OPENAI_API_KEY=sk-...
satus generate --profile saas
```

Cost is estimated up-front and capped by `--max-cost` (default `$1.00` per run).

## Privacy

`satus` never sends your schema, your data, or your column names to satus.sh. The only network call to satus.sh is the license verify, which sends your license key and nothing else. LLM calls go directly from your machine to your provider with your key.

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
