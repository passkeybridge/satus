/**
 * Recipes route ("/recipes").
 *
 * Task-oriented guides. Each recipe is a self-contained "I want to do X"
 * card: problem statement, the exact commands, and a note on caveats.
 * Recipes intentionally stay short — anything longer than a page belongs in
 * the blog. v0.1 ships with four recipes covering the most common asks:
 * preview-branch seeding, GitHub Actions, Cypress/E2E reset, Neon branches.
 *
 * GEO: each recipe is emitted as a HowTo node inside an ItemList so
 * generative engines can quote a single recipe without parsing the whole page.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "preview-branch", n: "01", label: "Preview branches" },
  { id: "github-actions", n: "02", label: "GitHub Actions" },
  { id: "e2e-reset", n: "03", label: "E2E reset" },
  { id: "neon-branch", n: "04", label: "Neon branching" },
];

export const Route = createFileRoute("/recipes")({
  component: RecipesPage,
  head: () => ({
    meta: [
      { title: "Recipes — satus" },
      {
        name: "description",
        content:
          "Copy-paste recipes for satus: seed a preview branch, wire into GitHub Actions, reset a Cypress database between tests, seed a fresh Neon branch.",
      },
      { property: "og:title", content: "Recipes — satus" },
      {
        property: "og:description",
        content:
          "Four short, copy-paste recipes covering the most common satus integrations.",
      },
      { property: "og:url", content: SITE_URL + "/recipes" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/recipes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "satus recipes",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: SECTIONS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: SITE_URL + "/recipes#" + s.id,
            name: s.label,
          })),
        }),
      },
    ],
  }),
});

function RecipesPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/recipes">
      <Section
        id="preview-branch"
        n="01"
        label="Preview branches"
        title={<>seed every supabase preview branch.</>}
      >
        <Prose>
          <p>
            Supabase preview branches ship with an empty database. Run satus
            once after the branch is created and every PR review gets a fully
            seeded environment. The 10,000-row safety guard is harmless here:
            preview branches start at zero.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# pull the branch URL from the supabase CLI`}</Cmt>
          <Shell>{`export DATABASE_URL=$(supabase --experimental branches get $BRANCH --json | jq -r .db_url)`}</Shell>
          <Shell>{`export OPENAI_API_KEY=$OPENAI_API_KEY`}</Shell>
          <Blank />
          <Cmt>{`# seed it. one transaction. all-or-nothing.`}</Cmt>
          <Shell>{`satus generate --profile e-commerce --seed 42`}</Shell>
          <Out>{`✓ 4,812 rows · $0.07 · 11.4s`}</Out>
        </Terminal>

        <Note>
          Pin <code>--seed</code> so a re-run on the same branch produces
          identical data. Reviewers can deep-link to a specific row by ID and
          trust it stays put.
        </Note>
      </Section>

      <Section
        id="github-actions"
        n="02"
        label="GitHub Actions"
        title={<>one job. one step. one secret per env.</>}
      >
        <Prose>
          <p>
            The most common shape. Plan in PR jobs (no writes, free), generate
            on merge to <code>main</code> or against ephemeral DBs.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# .github/workflows/seed.yml`}</Cmt>
          <Shell>{`name: seed`}</Shell>
          <Shell>{`on: { pull_request: {}, push: { branches: [main] } }`}</Shell>
          <Shell>{`jobs:`}</Shell>
          <Shell>{`  seed:`}</Shell>
          <Shell>{`    runs-on: ubuntu-latest`}</Shell>
          <Shell>{`    steps:`}</Shell>
          <Shell>{`      - uses: actions/checkout@v4`}</Shell>
          <Shell>{`      - uses: actions/setup-node@v4`}</Shell>
          <Shell>{`        with: { node-version: 20 }`}</Shell>
          <Shell>{`      - run: npm i -g satus`}</Shell>
          <Shell>{`      - run: satus plan --profile saas-subscriptions --json`}</Shell>
          <Shell>{`        if: github.event_name == 'pull_request'`}</Shell>
          <Shell>{`      - run: satus generate --profile saas-subscriptions`}</Shell>
          <Shell>{`        if: github.ref == 'refs/heads/main'`}</Shell>
          <Shell>{`        env:`}</Shell>
          <Shell>{`          DATABASE_URL: \${{ secrets.DATABASE_URL }}`}</Shell>
          <Shell>{`          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}`}</Shell>
        </Terminal>

        <Note>
          <code>satus plan --json</code> is read-only and needs no DB
          credentials when given <code>--schema ./schema.sql</code>. Use it as a
          PR check to catch schema-breaking changes before merge.
        </Note>
      </Section>

      <Section
        id="e2e-reset"
        n="03"
        label="E2E reset"
        title={<>fresh data between every test suite.</>}
      >
        <Prose>
          <p>
            Cypress, Playwright, and Vitest E2E suites need a known-good
            database state. The pattern: truncate user tables, then{" "}
            <code>satus generate --seed</code> with a fixed seed. The fixed
            seed gives every test the same starting rows.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# scripts/reset-test-db.sh`}</Cmt>
          <Shell>{`#!/usr/bin/env bash`}</Shell>
          <Shell>{`set -euo pipefail`}</Shell>
          <Blank />
          <Cmt>{`# 1 · truncate everything user-owned in a single tx`}</Cmt>
          <Shell>{`psql "$DATABASE_URL" -c "TRUNCATE \\`}</Shell>
          <Shell>{`  orders, order_items, products, customers \\`}</Shell>
          <Shell>{`  RESTART IDENTITY CASCADE;"`}</Shell>
          <Blank />
          <Cmt>{`# 2 · re-seed with a fixed seed for deterministic IDs`}</Cmt>
          <Shell>{`satus generate --profile e-commerce --seed 1 --force`}</Shell>
        </Terminal>

        <Note>
          <code>--force</code> is required here because the truncate may leave
          residual rows in tables satus doesn't own. Wire this into Cypress's{" "}
          <code>before(...)</code> hook or Playwright's{" "}
          <code>globalSetup</code>.
        </Note>
      </Section>

      <Section
        id="neon-branch"
        n="04"
        label="Neon branching"
        title={<>seed a fresh neon branch in one shell.</>}
      >
        <Prose>
          <p>
            Neon's copy-on-write branches make per-developer or per-PR databases
            cheap. Combine that with satus and every engineer gets their own
            seeded database for the cost of the branch metadata.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# create a branch and capture its connection string`}</Cmt>
          <Shell>{`BRANCH=$(neon branches create --name pr-$PR --project-id $NEON_PROJECT_ID -o json)`}</Shell>
          <Shell>{`export DATABASE_URL=$(echo "$BRANCH" | jq -r .connection_uris[0].connection_uri)`}</Shell>
          <Blank />
          <Cmt>{`# seed`}</Cmt>
          <Shell>{`satus generate --profile saas-subscriptions`}</Shell>
        </Terminal>

        <Note>
          Tear the branch down on PR close. Neon charges per active branch — a
          stale fleet of seeded branches will surprise the bill.
        </Note>
      </Section>

      <p className="mt-12 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]">
        Have a recipe you want documented? Open an issue on{" "}
        <a
          href="https://github.com/passkeybridge/satus/issues"
          target="_blank"
          rel="noopener"
          className="underline decoration-[var(--signal)] underline-offset-4"
        >
          GitHub
        </a>
        . We add the most-requested integrations first.
      </p>
    </PageShell>
  );
}

/* -------------------- Local primitives -------------------- */

function Terminal({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 max-w-[760px] border-y border-[var(--ink)]">
      <pre className="overflow-x-auto px-1 py-6 font-mono text-[13px] leading-[1.85]">
        {children}
      </pre>
    </div>
  );
}
function Cmt({ children }: { children: ReactNode }) {
  return <div className="px-4 text-[var(--mute)]">{children}</div>;
}
function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 text-[var(--ink)]">
      <span className="text-[var(--mute)]">$ </span>
      {children}
    </div>
  );
}
function Out({ children }: { children: ReactNode }) {
  return <div className="px-4 text-[var(--signal)]">{children}</div>;
}
function Blank() {
  return <div className="h-3" />;
}

/* Aside note. Sits below a terminal block, sets a slightly muted tone. */
function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 max-w-[760px] border-l-2 border-[var(--signal)] bg-[var(--ink)]/[0.02] px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
        note
      </div>
      <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.6] text-[var(--ink)]/85 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[var(--ink)]">
        {children}
      </p>
    </div>
  );
}
