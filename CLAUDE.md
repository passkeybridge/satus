# CLAUDE.md

Read mem/HANDOFF.md before anything else, every session. It is the previous
session's state. Before this session ends, replace it, do not append. Move
anything durable into mem/features/, mem/followups/ or mem/incidents/ first,
and list what moved under Graduated this session. Keep it under 400 words.

## satus writes to someone else's database

Everything below is load-bearing because a mistake is irreversible in a
database we do not own. Breaking any of it silently corrupts a user's data.

- **Refuses above 10,000 rows, exit `11`.** `countUserRows` runs before
  introspection and before any write; over `ROW_LIMIT` it exits
  `E_DB_NOT_EMPTY` having written nothing. `--force` bypasses. This exists
  to catch `DATABASE_URL` pointed at production.
- **One transaction, all or nothing.** `begin` … `commit`, with `rollback`
  on any failure. A failed run must leave the database untouched.
- **`--max-cost` aborts before overshoot,** not after. The budget is checked
  between batches and mid-table; the transaction rolls back.
- **`--dry-run` exits `2` on validator findings.** It is a CI gate. Keep it
  non-zero.
- **FK values come from actually-inserted parent primary keys.** The model
  is never asked to invent them: FK columns are excluded from the row schema
  and injected from `RETURNING` output. An unresolvable reference raises
  rather than falling through to `NULL`.
- **Soft FK cycles** are broken by leaving a nullable back-edge `NULL` and
  back-patching it via `updateBrokenEdge` **inside the same transaction**.

## v0.x limits — keep them stated

Multi-column `UNIQUE` constraints are not enforced during generation.
Cross-column arithmetic is not reconciled. There is no `--seed`, so output
is not deterministic. These are published limits; do not quietly drop them
from docs.

## Releases

CLI releases publish to npm **only** via `.github/workflows/cli-publish.yml`.
Nothing else publishes.

## Licensing

Source-visible and commercially licensed. Not open source. See `LICENSE`.
