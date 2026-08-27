# satus Content Plan — Sep 2026 → Aug 2027

## Operating rules

- **Cadence: one substantial post per week**, plus release notes when we
  ship. The old two-slots-a-week pace optimized for volume; every post
  from here on must survive the front page of a skeptical forum.
- **Accuracy gate:** every command, flag, and output line in a post is
  run against the shipped CLI before publish. The July editor's-note
  cleanup must never be needed again.
- **Each post gets a distribution row:** where it goes (HN, r/PostgreSQL,
  lobste.rs, dev.to cross-post, newsletter) and what the title is there.
- **Newsletter:** monthly digest of the log via the existing Resend
  queue; signup form ships in Phase 1.

## Four pillars (rough mix)

1. **Postgres internals & credibility** (~40%) — the pg_catalog /
   constraints / partitions material that ranks and earns trust. Our
   introspection SQL alone contains three posts.
2. **Build-in-public honesty** (~20%) — audits, postmortems, pricing
   decisions, roadmap re-scopes. Our differentiator is that we publish
   what most vendors hide.
3. **Seeding & testing practice** (~30%) — problem-first guides that
   meet people at the search bar: fixtures vs generation, CI databases,
   branch-per-PR workflows.
4. **Product & releases** (~10%) — release notes, feature deep-dives.

## Q3 2026 (Sep–Nov): Launch season

The launch sequence, each post paired with a channel moment:

1. "We migrated satus.sh off the app builder that built it" — the
   Lovable→independent stack story. (HN)
2. "We audited our own marketing against our own CLI" — the August
   audit: the plan-mapping bug, the invented flags, what we fixed.
   Radical honesty as positioning. (HN, newsletter #1)
3. "Introspecting a Postgres schema in one round-trip" — the CTE
   catalog query, why information_schema lies about FKs under RLS-ish
   privilege setups, partition re-attribution. (r/PostgreSQL)
4. "Breaking FK cycles without lying to your database" — Kahn's
   algorithm + nullable back-edges + back-patching. (lobste.rs)
   **Shipped 2026-08-28 as "The cycle-breaking heuristic we documented
   and never shipped."** Retitled: the mechanism was already covered in
   the 2026-05-26 post, so writing the planned piece would have restated
   it. Running the heuristic against the shipped binary showed three of
   its four published rules do not exist, and that became the post.
5. "Structured output from Claude without a JSON parser" — tool-forcing
   for typed rows; OpenAI json_schema vs Anthropic tool_choice. (dev.to)
   **Shipped 2026-09-04 under the planned title.**
6. "What a $0.03 seed run looks like" — token accounting, the --max-cost
   guardrail design, why cost estimates are guardrails not accounting.
   **Shipped 2026-09-11 as "Cost estimates are guardrails, not
   accounting."** Retitled: our own telemetry puts a 125-row run at
   $0.00067, not $0.03, so the planned headline asserted a figure the
   data contradicts. The estimate/actual gap became the subject.
7. Show HN launch post + README polish week (no blog post; the README
   is the post).
8. "Free tier, priced honestly" — why 25 rows/5 tables, what changes.
9. v0.3.6 / v0.3.7 release notes as shipped.
10–12. Seeding-practice pieces: "Fixtures vs generation: when each
   wins", "pg_dump snapshots as test fixtures", "Seeding Supabase
   branches in CI".

## Q4 2026 (Dec–Feb): The realism series

Theme matches Phase 2 of the roadmap — closing the realism gap, in
public:

- "Relational integrity is table stakes; arithmetic integrity is not" —
  announcing cross-column consistency work (totals that add up).
- "Multi-column uniques: why we skipped them in v0.x and how we stopped"
- "The empty pricing table: how we estimate Claude costs pessimistically"
- "satus snapshot: reproducibility without pretending LLMs are seeded"
- "A year of pg_catalog corrections" — everything the catalogs taught us.
- Practice pieces: CI database strategies compared (containers vs
  branches vs shared staging), enum evolution in long-lived schemas
  (extends the existing enum post), generated columns in test data.
- Release notes; December: "What we shipped in 2026, what we killed" —
  the year's honest retrospective. (newsletter centerpiece)

## Q1 2027 (Mar–May): Agent mode, built in public

Only if the Phase 3 gate opened; otherwise this quarter becomes the
public re-scope, which is itself a strong post ("Agent mode, postponed
again — here's the data").

- "The validator is the reward function" — architecture of the
  generate→validate→repair loop.
- "Building an eval set from schema fingerprints" — what the opt-in
  telemetry actually collects, with real (anonymized) numbers.
- "Agent mode alpha notes" — a running series, one per milestone, with
  token cost curves. Show failures.
- Practice: "Seeding partitioned tables" (the pagila war story from our
  own telemetry), "Deferrable constraints: the feature nobody uses".

## Q2 2027 (Jun–Aug): Proof

- Case studies if (and only if) real users exist — real schemas, real
  numbers, named or anonymized. No invented testimonials, ever.
- "100-table schemas: where satus slows down and what we did"
- "Two years of one-transaction seeds" — durability of the core design.
- v1.0 criteria post: what we think 1.0 must mean for a data tool.
- Second annual self-audit, published.

## Standing backlog (slot in any week)

- The corpus/audit/bench artifacts in the repo — each can anchor a post.
- Comparisons page refreshes as the landscape shifts (verify every
  claim about competitors on publish day).
- "Errors we return on purpose" — error-message design in a CLI.
- Timezone/DST seed bugs follow-up with reader-submitted cases.

## What we will not do

- No AI-slop listicles, no "10 tools" posts, no keyword-stuffed pages.
- No claims about unshipped features phrased in present tense — that is
  exactly the drift the August audit burned down.
- No fabricated output in code blocks: every terminal transcript in a
  post is a real transcript.
