# Schema corpus

This directory holds reproducible audits of public open-source Postgres
schemas. The output JSON files are the **only** source of numeric stats
allowed in `/blog` posts — see `mem://content/post-rules` and
`mem://content/no-fabricated-stats`.

## How it works

1. `sources.json` declares the set of public repos to audit, the git ref
   to pin, the SQL files to apply in order, and any extensions the schema
   needs.
2. `scripts/audit/run.ts` clones each repo (shallow, depth=1) into
   `/tmp/corpus-cache/`, spins up a throwaway database per source on the
   local Postgres cluster, applies the SQL files, runs a fixed set of
   introspection queries against the loaded schema, and writes results
   to `corpus/audit-<date>.json`.
3. Every published post that cites a stat (`N of M schemas…`,
   `most projects…`, etc.) must point to a measurement in this file.
   If a number isn't here, the post can't claim it.

## Running

Requires a local Postgres reachable at `PGHOST=/tmp PGPORT=5599 PGUSER=pg`
(or override via env). The Lovable sandbox ships PG 17; the script asserts
the major version it ran against.

```bash
bun run scripts/audit/run.ts
```

The script is intentionally idempotent: re-running rewrites the dated JSON
in place. Add a new source by appending to `sources.json` and re-running.

## What we measure (and what we don't)

Each source contributes a record with:

- `tables_total`, `partitioned_parents`, `partitioned_parents_with_rls`,
  `partitioned_parents_with_unprotected_child`
- `fk_total`, `fk_cycle_count`, `largest_cycle_size`
- `citext_columns`, `text_email_columns` (text-typed columns whose name
  matches `email`)
- `columns_total`, `columns_nullable`, `columns_notnull`,
  `columns_generated`
- `check_constraints`, `unique_constraints_single_col`,
  `unique_constraints_multi_col`
- `apply_status`: `ok` | `partial` | `failed`, with the error message
  when the schema didn't load cleanly.

We deliberately do not measure data-volume statistics — only structural
ones — because we are auditing migrations, not running production
workloads.

## Caveats baked into the methodology

- Schemas that don't ship as raw `.sql` (Rails `schema.rb`, Prisma,
  Sequelize, TypeORM) are excluded. Adding them would require running a
  framework-specific tool, which the audit deliberately avoids.
- We pin to a specific git ref so re-runs are reproducible. Bumping the
  ref counts as a new measurement; we keep prior `audit-<date>.json`
  files so historical claims in posts stay valid.
- An `apply_status: failed` source contributes zero metrics. We log it
  but never silently substitute. Posts must use a corpus where the
  relevant fields are non-null.
