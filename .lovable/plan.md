# satus.ai — MVP Specification

## 1. Product thesis (locked)

**One sentence:** A CLI that reads your Postgres schema and produces realistic, relationally-coherent seed data in seconds — designed for the demo, the screenshot, and the QA run, not for load testing.

**Who it's for (in order):**
1. Solo founders / indie hackers shipping SaaS MVPs on Postgres (Supabase, Neon, Railway, RDS).
2. Small product teams (2–10 devs) who need believable demo data for sales calls, design reviews, and Loom recordings.
3. Later — not MVP: agencies, CI pipelines, enterprise.

**Why they pay:** Faker output embarrasses them in front of customers and investors. Hand-crafting fixtures costs hours per feature. They will pay $19–$49/mo to never see "John Doe — Lorem Ipsum Corp" in a demo again.

## 2. Scope discipline — what we will NOT build

These are non-goals for v1. Saying no to them is the product.

- ❌ Multi-database support. **Postgres only, forever in v1.** No MySQL, SQLite, Mongo, DynamoDB. (Postgres is ~70% of the target ICP and removes 80% of edge cases.)
- ❌ ORM plugins. No Prisma generator, no Drizzle plugin, no SQLAlchemy hook. We read the live database schema via `information_schema` + `pg_catalog`. One code path.
- ❌ A web app, dashboard, or GUI. CLI only.
- ❌ Synthetic data for ML / load testing / privacy anonymization. Different buyer, different product.
- ❌ Writing migrations, managing fixtures-as-code, version control of seeds.
- ❌ A hosted runtime. The CLI runs on the user's machine and talks to their DB directly.
- ❌ Multi-tenant team features (shared profiles, RBAC). Single-user license in v1.

## 3. The MVP (what we ship in week 4)

### 3.1 Surface

A single binary: `satus`.

```
satus init           # writes satus.config.ts, detects schema
satus generate       # generates + inserts data
satus generate --dry # writes SQL to ./satus-output.sql, no insert
satus reset          # truncates tables satus touches (with confirmation)
satus profile use medical-booking   # swap context profile
```

### 3.2 The core loop

1. Connect to Postgres via `DATABASE_URL`.
2. Introspect schema: tables, columns, types, FKs, uniques, checks, enums.
3. Build a dependency DAG from FKs; topologically sort insert order.
4. For each table, in order:
   - Send schema + sample of already-generated parent rows + active **profile** to the LLM.
   - LLM returns N rows as structured JSON (tool-calling, not free-text).
   - Validate against schema (types, lengths, enums, uniques, NOT NULLs).
   - Insert in a transaction. On failure: one auto-repair retry with the validator error fed back; then hard-fail loud.
5. Emit a one-page summary: rows per table, runtime, token spend.

### 3.3 Profiles (the actual moat)

Profiles are the *domain context* the LLM uses. Ship three hand-crafted profiles in v1, each tuned to perfection:

- `medical-booking` — clinics, providers, patients, appointments, insurance.
- `e-commerce` — stores, products, variants, inventory, orders, customers, reviews.
- `saas-subscriptions` — orgs, users, plans, subscriptions, invoices, usage events.

A profile is a small markdown + JSON file: tone, locale, name distributions, business rules ("appointments are 15/30/60 min and during business hours"), reference vocabularies. Users can fork them locally. v1 does **not** ship a profile marketplace.

### 3.4 What "relationally coherent" means concretely

- A patient's `date_of_birth` is consistent with their `appointments.created_at` (no infants booking colonoscopies).
- An order's `total` equals sum of its `order_items.price * quantity`.
- A `subscription.status = 'canceled'` row has a `canceled_at` that's after `created_at` and before `now()`.
- Names match locale; emails match names; addresses are real cities in real states.
- These rules come from the profile + a small library of post-generation **invariants** the validator enforces.

## 4. Architecture

```text
+----------------+        +-------------------+        +----------------+
| satus CLI      | -----> | Schema introspect | -----> | DAG planner    |
| (Node/TS)      |        | (pg + pg-catalog) |        |                |
+----------------+        +-------------------+        +----------------+
        |                                                       |
        v                                                       v
+----------------+        +-------------------+        +----------------+
| Profile loader | -----> | LLM orchestrator  | <----- | Row budget /   |
| (md + json)    |        | (tool calling,    |        | parent samples |
+----------------+        |  JSON schema out) |        +----------------+
                          +-------------------+
                                   |
                                   v
                          +-------------------+        +----------------+
                          | Validator +       | -----> | Postgres COPY  |
                          | invariant checks  |        | / batched INSERT|
                          +-------------------+        +----------------+
```

### Technical decisions (opinionated, locked unless we learn otherwise)

| Decision | Choice | Why |
|---|---|---|
| Language / runtime | **TypeScript on Node 20+**, distributed as a single binary via `bun build --compile` or `pkg` | One language across CLI + future web; fast iteration; great Postgres client ecosystem. |
| DB driver | `postgres` (porsager) | Faster, smaller, better typed than `pg`. |
| LLM provider | **OpenAI GPT-5-mini as default**, swappable via `SATUS_LLM_PROVIDER`. Anthropic + Gemini adapters in week 3. | gpt-5-mini hits the price/quality sweet spot for structured row generation. |
| Structured output | **Tool-calling with a JSON schema derived from the table schema**, never free-text JSON. | Eliminates 90% of parse errors. |
| Validation | `zod` schema generated per table at runtime | Same schema used for LLM tool definition and post-LLM validation — one source of truth. |
| Insert path | Transaction per table; `COPY FROM STDIN` for tables > 500 rows, parameterized INSERT otherwise | Fastest correct path. |
| Config | `satus.config.ts` (typed) | Devs prefer typed config over YAML. |
| Telemetry | Anonymous, opt-out, PostHog. Track: schema fingerprint hash, row counts, runtime, error class — **never row data, never connection strings**. | We need to learn what schemas people throw at it. |
| Auth (for paid tier) | License key checked against a tiny API; offline grace period 14 days. | No phone-home requirement, no SSO, no accounts in CLI. |
| Distribution | `npm i -g satus` + Homebrew tap + standalone binaries on GitHub Releases | Meets devs where they are. |
| Repo strategy | **Open-core**: CLI core MIT on GitHub; profiles + cloud sync are commercial. | Drives adoption; matches the GitHub-first GTM the prior conversation locked in. |

### Backend (minimal, only what's required for the paid tier)

- A tiny TanStack Start app on Cloudflare Workers for: license issuance, Stripe webhooks, marketing site (`satus.ai`).
- Postgres (Supabase) for: customers, licenses, profile downloads.
- No user-facing dashboard in v1 beyond "view your license / download invoices."

## 5. Pricing (v1)

| Tier | Price | Includes |
|---|---|---|
| **Free / OSS** | $0 | CLI core, bring-your-own LLM key, community profiles. |
| **Pro** | $19/mo or $190/yr | 3 official profiles, hosted profile updates, license key, priority issues. |
| **Team** (later, not MVP) | $49/seat/mo | Shared profiles, CI mode, audit log. |

Bring-your-own LLM key on every tier — we never resell tokens in v1.

## 6. Build plan (4 calendar weeks, solo founder pace)

**Week 1 — Spine**
- Postgres introspection → typed schema graph.
- DAG + topological insert planner.
- `satus init` and `satus generate --dry` working end-to-end with `e-commerce` profile against a fixed reference schema.

**Week 2 — Generation quality**
- Tool-calling LLM orchestrator with per-table zod schemas.
- Validator + one-shot auto-repair loop.
- Two more profiles: `medical-booking`, `saas-subscriptions`.
- `satus generate` (actual inserts), `satus reset`.

**Week 3 — Ship-readiness**
- Binary packaging, Homebrew tap, npm publish.
- Marketing site (TanStack Start on Workers): landing, 90-second demo video, docs, pricing.
- Telemetry, license API, Stripe checkout.

**Week 4 — Launch**
- Beta with 10 hand-picked indie hackers (DM, not public).
- Fix the top 5 papercuts they hit.
- Launch: Show HN, Product Hunt, dev Twitter, r/SaaS, r/Supabase.

## 7. Risks and how each is contained

| Risk | Containment |
|---|---|
| LLM produces bad rows that break FK/unique constraints | Tool calling + zod validation + one-shot repair + transactional insert. Failure is loud, never silent. |
| User points it at production by accident | Refuse to run if DB has > 10k rows in any user table without `--i-know-what-im-doing`. Refuse if `DATABASE_URL` host doesn't match a `satus.config.ts` allowlist. |
| Token costs surprise the user | Show estimated cost before running; require `--yes` above $1.00. BYO key means costs hit their own account. |
| "ChatGPT can do this for free" | The product is the *workflow* — introspection, ordering, validation, insertion — not the prompt. Demo video makes that obvious in 30 seconds. |
| Faker/Snaplet do a "good enough" version | We win on (a) zero schema annotation required, (b) cross-table coherence, (c) brand. Stay narrow; don't chase their feature lists. |

## 8. Engineer skills required

### To build the MVP (one senior generalist can do this)

- **TypeScript / Node**, strong. Comfortable shipping CLIs and single binaries.
- **Postgres internals**, working knowledge: `information_schema`, `pg_catalog`, FKs, constraint introspection, `COPY`, transactions, advisory locks.
- **LLM API integration**: OpenAI / Anthropic / Gemini, specifically *structured outputs via tool calling*, token accounting, retry/backoff.
- **Schema modeling with zod** (or equivalent) and dynamic schema generation at runtime.
- **DAG / topological sort** — undergrad-level algorithms, no ML/research depth needed.
- **Packaging & distribution**: npm publish, Homebrew formulae, GitHub Actions release pipelines, code signing for macOS.
- **TanStack Start + Cloudflare Workers + Stripe** for the marketing site and license API (small surface).
- **Product taste**: writing the three reference profiles well is more craft than code. The founder should own these personally in v1.

### To maintain it (steady-state, ~10 hrs/week)

- Same TypeScript + Postgres skill set as above.
- Comfort triaging GitHub issues against unfamiliar user schemas — schema reproduction is the #1 maintenance task.
- LLM prompt iteration discipline: versioned prompts, regression eval suite, ability to A/B prompt changes against a fixture of real customer schemas (with telemetry consent).
- Basic SRE: Cloudflare Workers logs, Stripe webhook debugging, Supabase row-level monitoring. No Kubernetes, no infra team needed.
- Customer-support muscle: most support tickets will be "it failed on my schema" — needs someone who can read a stack trace and a CREATE TABLE in the same breath.

**Headcount reality:** one founder-engineer to launch. Add a second engineer only after $5k MRR, and hire for *Postgres depth* first, *LLM/prompt craft* second.

## 9. What we'll know in 90 days

- Whether the three reference profiles are enough, or whether users immediately ask for verticals we didn't predict (legal, real estate, logistics).
- Whether BYO-key is friction enough to justify a hosted-key tier at +$10/mo.
- Whether the CLI is the right surface, or whether 60% of users actually want a GitHub Action that runs on every PR-preview deploy.

These three answers determine v2. We do not guess at them now.
