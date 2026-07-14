
# v0.3.3 build + release-notes post

Scope committed in [`/blog/v0-3-3-github-action`](/blog/v0-3-3-github-action): a composite Action wrapping today's `satus generate` binary, plus the telemetry-hook groundwork folded in from the old v0.4. No CLI semantic changes. No hosted-key work. No agent scaffolding.

**Hands-off promise:** once you supply a GitHub personal access token, I drive every GitHub-side change through the connector gateway myself. You do not click through the GitHub UI, do not edit `action.yml` in the browser, do not tag releases, do not open the Marketplace form. Your only remaining manual steps are the ones a token cannot do: `npm publish` (npm 2FA), `add_secret` prompts for the PAT and any repo secrets, and a final "go" before I flip the blog post out of `draft: true`.

## 0. GitHub connector setup (do this first)

- Call `standard_connectors--list_connections` to see if a GitHub connection is already linked to the workspace.
- If none is linked, I'll ask you to create a fine-grained PAT on `github.com/passkeybridge/satus` with these scopes only (least privilege, no more):
  - **Repository access:** `passkeybridge/satus` only.
  - **Repo permissions:** Contents (read/write), Actions (read/write), Workflows (read/write), Pull requests (read/write), Metadata (read), Secrets (read/write — only if you want me to set `OPENAI_API_KEY` for the self-test workflow), Administration (read/write — only if you want me to publish the Marketplace release; drop this if you'd rather do the Marketplace click yourself).
  - **No org, package, or user permissions.**
- You paste the PAT into the secure form opened by `standard_connectors--connect` for the GitHub connector. Nothing lands in the repo; the token lives in workspace secret storage and is injected only into server-side calls.
- All my GitHub-side changes below go through `standard_connectors--call_gateway_connection` to `https://connector-gateway.lovable.dev/github/...`. If a call fails, I surface the exact GitHub status + body and stop — I never fall back to a direct API call and never retry into a rate-limit hole.
- If you'd rather not grant the Administration scope, I still handle everything except the final "publish to Marketplace" click; I'll leave a one-line instruction at the end for that single action.

## 1. Telemetry hooks (opt-in DDL fingerprints)

Purpose: build the anonymised eval fixture set the v0.4.0 agent's prompts will be tuned against. **Off by default.**

### CLI changes (`packages/cli/`)
- `src/generate/fingerprint.ts` (new): `normalizeDDL(schema)` sorts columns/constraints/enums, strips whitespace and inline comments, lowercases identifiers, returns SHA-256. Unit test: two equivalent-but-differently-formatted schemas produce the same hash.
- `src/generate/telemetry.ts`: extend `RunTelemetry` with `schema_fingerprint?: string`, `validator_class?: string`, `invocation_sequence?: string[]` (subcommands + flag names only, no values).
- `src/config.ts`: add `telemetry.share_failure_fingerprints: boolean` (default `false`). `satus init` prompts for it using the same wording as the existing telemetry opt-in.
- `src/commands/generate.ts`: when the flag is on, compute the fingerprint after `introspect()` and include it in the final `reportRun()` payload; on dry-run validation failure, also emit `validator_class` from the first `error`-severity finding.
- Bump `packages/cli/src/version.ts` and `packages/cli/package.json` to `0.3.3`.
- Update `src/lib/version.ts` (`SATUS_VERSION`, `SATUS_RELEASED_AT`) and `CHANGELOG.md` in the same commit.

### Backend changes
- New migration `supabase/migrations/<ts>_satus_runs_v033_fields.sql`:
  ```sql
  ALTER TABLE public.satus_runs
    ADD COLUMN IF NOT EXISTS schema_fingerprint  text,
    ADD COLUMN IF NOT EXISTS validator_class     text,
    ADD COLUMN IF NOT EXISTS invocation_sequence jsonb;
  ```
  All nullable; existing service-role policy and 90-day prune cover them.
- `src/routes/api/public/cli/run.ts`: extend the zod schema with the three new optional fields (fingerprint hex 64 chars, validator_class ≤ 64 chars, invocation_sequence array ≤ 16 short strings).
- Regenerate `src/integrations/supabase/types.ts`.

Old v0.2.x / v0.3.0–0.3.2 telemetry payloads keep ingesting unchanged.

## 2. GitHub Action (`packages/action/`)

Composite action, published as `passkeybridge/satus-action@v1`. Sibling to `packages/cli/`; no root workspaces (matches the CLI packaging rule in memory).

Files:
- `packages/action/action.yml` — inputs: `database-url` (required, secret), `rows`, `profile`, `provider`, `model`, `max-cost` (string), `dry-run`, `working-directory`, `satus-version` (default `"0.3.3"`). Outputs: `run-id`, `tables-seeded`, `rows-inserted`, `tokens-in`, `tokens-out`, `spent-usd`. Three composite steps: `actions/setup-node@v4` (Node 20) → `npx --yes @passkeybridge/satus@${{ inputs.satus-version }} generate --json …` (flags forwarded verbatim, provider key stays in `env:`) → `actions/upload-artifact@v4` uploads `.satus/last-run.json`.
- `packages/action/README.md` — Marketplace listing copy; one OpenAI example + one Anthropic example; explicit list of what the Action does NOT do (no hosted key, no auto-commit, no cache, no other CI hosts).
- `packages/action/LICENSE` — copy of the repo LICENSE so the tarball is standalone.

The Action never reads or logs the provider key or `database-url`; both flow straight to the child `npx` via env.

## 3. Self-test workflow

- `.github/workflows/action-selftest.yml`: `services: postgres:16`; loads the `pagila` fixture used in the corpus audit; runs the Action with `dry-run: true` (asserts exit 0, non-empty `tables-seeded`), then again without `dry-run` against the same DB (asserts `rows-inserted > 0`). Runs on push to `main` and on `workflow_dispatch`.
- `.github/workflows/cli-ci.yml`: `bun install && npm --prefix packages/cli run typecheck && npm --prefix packages/cli test`. Separate from the Action test so a CLI regression is not blocked by an OpenAI outage.
- I create the repo secret `OPENAI_API_KEY` for the self-test workflow via the GitHub connector (uses libsodium sealed-box against the repo's public key — standard REST flow, no plaintext in transit).

## 4. Docs

- `src/routes/docs.github-action.tsx` — new route with full YAML example, inputs/outputs table, security notes (why `database-url` is an input, why the provider key is in `env:`, pin-your-version guidance). Added to `SITE_NAV` and `/sitemap.xml`; unique `head()` metadata.
- `public/llms.txt`: add the docs URL and `passkeybridge/satus-action@v1`.

## 5. Release-notes blog post

`src/content/blog/2026-07-15-v0-3-3-release-notes.md` (date shifts to real publish day):

- Slug: `v0-3-3-release-notes`; description 140–160 chars; tags `[release, ci, github, telemetry]`; `draft: true` until the CLI is on npm AND the Action is on the Marketplace.
- Sections: **What shipped** (Action + telemetry hooks, concrete); **Example workflow** (the YAML block from the roadmap post, verbatim); **The three semantic choices** (input vs env, `max-cost` as string, provider key in `env:`); **Telemetry hooks: what we collect and what we don't** (fingerprint hex, validator class, subcommand+flag names; NOT: row contents, DSNs, DDL text, provider keys); how to enable (`satus init` prompt or config flag); **Not in this release** (verbatim list from the roadmap post); **What's next** — link the renumbered v0.4.0 post.
- Internal links: `/blog/v0-3-3-github-action`, `/blog/agent-mode-postponed`, `/blog/v0-3-0-anthropic-and-machine-readable-output`, `/blog/introducing-the-log`, `/docs/github-action`.
- Outbound links: GitHub Actions composite-action docs, security-hardening guide, `@passkeybridge/satus` on npm, Marketplace listing.
- Update `/blog/v0-3-3-github-action` with a one-line dated header: `Update <YYYY-MM-DD>: superseded by the v0.3.3 release notes.` No body rewrite.
- All numeric claims cite corpus/ or a named public source per `mem://content/no-fabricated-stats`.

## 6. What I drive via the GitHub connector (so you don't have to)

Every one of these is a `standard_connectors--call_gateway_connection` call to `github/...`, logged with the exact endpoint and status:

1. `PUT /repos/passkeybridge/satus/actions/secrets/OPENAI_API_KEY` (sealed-box encrypted) — enables the self-test workflow.
2. `GET /repos/passkeybridge/satus/actions/workflows/action-selftest.yml/runs` — poll until the self-test branch run is green before merging.
3. `POST /repos/passkeybridge/satus/git/refs` — tag `v0.3.3` after `npm publish` succeeds.
4. `POST /repos/passkeybridge/satus/releases` — GitHub release for `v0.3.3` with the changelog body and the built Action tarball attached.
5. `POST /repos/passkeybridge/satus/releases` for `passkeybridge/satus-action@v1` — Marketplace publish (needs Administration scope; skip if you withheld it and I'll flag the single manual click).
6. If you use branches: create a `release/v0.3.3` branch via the API and open a PR for you to review, instead of pushing straight to `main`. Your call.

What I do NOT touch: repo settings, branch protection rules, org membership, other workspaces' repos, anything outside `passkeybridge/satus`.

## 7. Verification gate (before I say "done")

1. `cd packages/cli && npm run typecheck && npm test && npm run build` — clean.
2. `bun run build` at repo root — clean, no new bundle warnings.
3. Playwright pass on `/blog/v0-3-3-release-notes` and `/docs/github-action` at 375 / 768 / 1280 — no horizontal overflow, meta description length in-range, all internal links 200, all outbound links 200.
4. `.github/workflows/action-selftest.yml` green on the release branch (I poll via the connector).
5. `npm publish --dry-run` first, then real `npm publish @passkeybridge/satus@0.3.3` — this step is on you because npm 2FA lives on your device.
6. I tag `v0.3.3`, cut the GitHub release, and (if Administration was granted) publish the Marketplace release.
7. I flip the blog post's `draft: false` only after the npm publish and Marketplace listing are both live and reachable.

## Out of scope

Hosted-key tier, `satus agent`, chat UI, planner/executor split, RAG, auto-apply, GitLab/CircleCI, matrix multi-provider examples, cache of generated rows, auto-commit of seed SQL. Explicitly deferred in the roadmap post; the release post repeats the list so users are not surprised.

## Timeline

Target npm publish: 2026-07-15 to 2026-07-17. The roadmap post said 07-10/07-11; that window has slipped and the release post is honest about the new date, not backdated.

## Technical details

```text
touched                                             kind
─────────────────────────────────────────────       ──────
packages/cli/src/version.ts                         edit
packages/cli/package.json                           edit (version)
packages/cli/src/generate/fingerprint.ts            new
packages/cli/src/generate/fingerprint.test.ts       new
packages/cli/src/generate/telemetry.ts              edit
packages/cli/src/config.ts                          edit
packages/cli/src/commands/generate.ts               edit
packages/cli/src/commands/init.ts                   edit
packages/action/action.yml                          new
packages/action/README.md                           new
packages/action/LICENSE                             new
.github/workflows/action-selftest.yml               new
.github/workflows/cli-ci.yml                        new
supabase/migrations/<ts>_satus_runs_v033.sql        new
src/routes/api/public/cli/run.ts                    edit
src/integrations/supabase/types.ts                  regen
src/routes/docs.github-action.tsx                   new
src/components/site/chrome.tsx (SITE_NAV)           edit
public/llms.txt                                     edit
src/lib/version.ts                                  edit
CHANGELOG.md                                        edit
src/content/blog/2026-07-15-v0-3-3-release-notes.md new
src/content/blog/2026-07-03-v0-3-3-github-action.md edit (1-line supersede header)
```

Nothing here breaks existing surfaces: no rename of any published route, no removal of any CLI flag, no change to the existing telemetry payload shape (all new fields are optional), no change to the license-verify or webhook endpoints. Backward compatibility is a hard constraint of this release.
