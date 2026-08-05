# satus Roadmap — 2026-08 → 2027-08

The honest starting point, from our own telemetry (2026-08-05): the CLI
works and the claims are now true, but **every recorded run is a founder
dev-environment run, every real license is a self-purchase since canceled,
the waitlist has zero signups, and MRR is $0.** The binding constraint is
not features — it is that nobody outside the company has tried the tool.
This roadmap is therefore distribution-first, with build phases gated on
evidence of demand. Building Phase N+1 before its gate is how solo
products die politely.

## Phase 0 — Ship the truth (done / this week)

- [x] Lovable independence migration (hosting, DB, Stripe, Resend, npm)
- [x] E2E audit: license plan-contract bug fixed and live-verified;
      site docs corrected to the real CLI interface
- [x] Real-LLM end-to-end run verified (Anthropic + OpenAI paths)
- [ ] v0.3.6 via the tag-push pipeline (ANTHROPIC_BASE_URL fix)

## Phase 1 — Become discoverable and frictionless (Aug–Sep 2026)

Goal: a stranger can understand, try, and trust satus in under five
minutes without paying anyone anything.

1. **Root README.md.** The GitHub repo is public and has no README — the
   single highest-leverage missing artifact. Demo GIF, honest feature
   list, quickstart, link to the audit story.
2. **Instant browser demo on satus.sh.** Paste a schema (or pick a
   bundled one) → see 25 generated rows in seconds, on our API key,
   rate-limited by the existing Postgres rate limiter. Every piece of
   infra for this already exists. This converts curiosity without
   demanding an npm install + LLM key + DSN first.
3. **`npx` flow** documented as the primary path (`npx @passkeybridge/satus
   generate --dry-run` works today — market it).
4. **Newsletter wired.** waitlist_signups + the Resend queue exist;
   add a "get the log by email" form and a monthly digest.
5. **Launch, deliberately.** Show HN, r/PostgreSQL, Product Hunt,
   lobste.rs — sequenced, each with a matching technical post (see
   content plan). We could not honestly launch before the audit;
   now we can.
6. **Funnel instrumentation.** Vercel Analytics (added) + npm download
   tracking + telemetry dashboards, so the gate below is measurable.

**Gate to Phase 2:** ≥25 non-founder CLI runs or ≥100 GitHub stars or
one inbound "can it do X" conversation. Any signal of real usage.

## Phase 2 — Earn the license fee (Oct–Dec 2026)

Goal: close the gap between "technically correct rows" and "rows a
staging environment is proud of," prioritized by what Phase 1 users
actually hit.

1. **Cross-column consistency.** order totals that sum from line items,
   dates that sequence correctly. Today we enforce relational integrity,
   not arithmetic; this is the most visible realism gap and would be a
   headline feature ("totals that add up").
2. **Multi-column unique constraints** (currently introspected but
   skipped — a documented v0.x limitation).
3. **`satus snapshot`** — a thin pg_dump wrapper producing a restorable
   fixture after a seed run. Makes the honest reproducibility answer
   ("snapshot, don't re-generate") a one-command workflow.
4. **Anthropic pricing table** (currently empty → pessimistic fallback)
   and a model-refresh policy so defaults never rot.
5. **Free-tier calibration.** 25 rows × 5 tables may be too tight to
   evaluate on a real schema. Decide with data (Phase 1 telemetry),
   not vibes. Candidate: uncapped tables, capped rows.
6. **Pricing sanity check.** $19/mo for BYO-key must feel obviously
   cheaper than an afternoon of writing seed scripts. If Phase 1 says
   otherwise, adjust before scaling marketing.

**Gate to Phase 3:** first external paying customer (a real one).

## Phase 3 — The bets (Q1–Q2 2027)

Only with evidence. Both were already promised publicly, so sequencing
honesty matters: ship or publicly re-scope.

1. **Agent mode (v0.4.0, postponed once already).** Generate → validate
   → repair loop using the dry-run validator as the feedback signal.
   Needs the schema-fingerprint eval corpus (telemetry opt-in exists;
   almost no data collected yet — Phase 1 traffic feeds this).
2. **CI-native depth.** PR comments with validation findings; recipes →
   first-class integrations for Neon / Supabase branch-per-PR seeding.
3. **Team tier reality.** Seat management and shared config exist as a
   price point, not a product. Build only when a team asks.

## Continuous (non-negotiable, all year)

- Monthly self-audit: marketed vs delivered, one hour, fix drift on the
  spot. The August audit found a revenue-path bug; assume drift recurs.
- Keep the daily e2e cron green; treat a red day as a same-day fix.
- Dependency hygiene (the seroval pin was a warning shot) and npm
  provenance on every release.
- Blog cadence per docs/CONTENT_PLAN_2026-2027.md — content is the
  distribution engine for a bootstrapped dev tool; it is not optional.
