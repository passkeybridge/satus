# CLAUDE.md

Read mem/HANDOFF.md before anything else, every session. It is the previous
session's state. Before this session ends, replace it, do not append. Move
anything durable into mem/features/, mem/followups/ or mem/incidents/ first,
and list what moved under Graduated this session. Keep it under 400 words.

## Finish the job: merge and deploy

Standing instruction from the owner, 2026-09-04. **Work is not done when it
is on a branch. It is done when it is live.**

Default: merge to `main` and let it deploy. Do not park finished work on a
branch, and do not open a PR, waiting to be asked. `give-every-page-an-h1`
sat green and unmerged for three days while the bug it fixed stayed in
production — a finished branch nobody merged is indistinguishable from a bug
nobody fixed.

The one exception is to **ask**, and get a yes, before shipping. That is a
question in chat, not a branch left sitting: say what the risk is and what
you want to do. Silence is not an answer to wait on — if you did not ask,
ship it.

Before starting any session, run `git branch -r --no-merged origin/main`.
Anything it lists is either shippable now or needs a question asked about it
today.

Ship on evidence, not hope. Whatever the change touches, verify it the way
that change can actually fail — gates and tests green before the merge, and
the real behaviour confirmed against production after the deploy. Verify
against rendered output or a live response, never against the source you
just edited.

**Pushing is not deploying. Confirm the production deployment exists.**
Vercel appears to deduplicate by commit SHA: pushing the same commit to
`main` and to a working branch within a few seconds can yield exactly one
deployment, attributed to the branch, with `target: null` — a preview.
`main` moves, production does not, and nothing reports a failure. It
happened to `b1a31b0` on 2026-09-04.

So: push `main` **alone**, confirm a deployment for that SHA exists with
`target: "production"` and state `READY`, and only then bring the working
branch up. A green push and a green CI run say nothing about what is
serving traffic.

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

## Telemetry is off unless the user turns it on

`reportRun` sends nothing unless `configureTelemetry` latched it on, and the
latch initialises to `false` so a path that forgets to configure sends
nothing rather than everything. `DO_NOT_TRACK` wins over every other
signal. satus.sh/security and /privacy both state this as a promise; through
v0.3.10 the code did not keep it. Do not make the run record unconditional
again, and do not "fix" the default to true.

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
