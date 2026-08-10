import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SECTIONS } from "./router-B2kWt1Bm.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/vercel__analytics.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:crypto";
import "./stripe.server-BpuPeHCa.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__hr.mjs";
import "../_libs/react-email__link.mjs";
import "../_libs/zod.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
function RecipesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/recipes", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "preview-branch", n: "01", label: "Preview branches", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "seed every supabase preview branch." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Supabase preview branches ship with an empty database. Run satus once after the branch is created and every PR review gets a fully seeded environment. The 10,000-row safety guard is harmless here: preview branches start at zero." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# pull the postgres url from the supabase CLI` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `export DATABASE_URL=$(supabase --experimental branches get $BRANCH --output json | jq -r .POSTGRES_URL)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `export OPENAI_API_KEY=$OPENAI_API_KEY` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# seed it. one transaction. all-or-nothing.` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile ecommerce --rows 50` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `✓ inserted 250 rows across 5 tables` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Note, { children: [
        "Each run generates fresh data—the model varies values by design. If a review depends on stable fixtures, keep the branch alive instead of re-seeding it, or snapshot the seeded state with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_dump" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "github-actions", n: "02", label: "GitHub Actions", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one job. one step. one secret per env." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The most common shape. Plan in PR jobs (no writes, free), generate on merge to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "main" }),
        " or against ephemeral DBs."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# .github/workflows/seed.yml` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `name: seed` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `on: { pull_request: {}, push: { branches: [main] } }` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `jobs:` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `  seed:` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `    runs-on: ubuntu-latest` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `    env:` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      DATABASE_URL: \${{ secrets.DATABASE_URL }}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `    steps:` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      - uses: actions/checkout@v4` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      - uses: actions/setup-node@v4` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `        with: { node-version: 20 }` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      - run: npm i -g @passkeybridge/satus` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      - run: satus generate --profile saas --dry-run --json` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `        if: github.event_name == 'pull_request'` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `      - run: satus generate --profile saas` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `        if: github.ref == 'refs/heads/main'` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Note, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate --dry-run --json" }),
        " introspects but never writes and never calls the model—no LLM key needed, no spend. It exits non-zero when the relational validator finds errors, so it works as a PR gate for schema-breaking changes."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "e2e-reset", n: "03", label: "E2E reset", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "fresh data between every test suite." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Cypress, Playwright, and Vitest E2E suites need a known-good database state. The pattern: seed once with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--truncate" }),
        ", snapshot the result with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_dump" }),
        ", and restore that fixture between suites— restores are fast and byte-identical, which generation is not."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# scripts/reset-test-db.sh` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `#!/usr/bin/env bash` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `set -euo pipefail` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# truncate the target tables and re-seed in one run` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile ecommerce --truncate` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Note, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--truncate" }),
        " issues",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "TRUNCATE ... RESTART IDENTITY" }),
        " on the run’s tables inside the same transaction as the inserts, so sequences reset and a failed run leaves the old data in place. Note the absent",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CASCADE" }),
        ": if a table outside the run set has a foreign key into one inside it, satus stops with an error rather than emptying a table you never asked it to seed. Bring that table into the run set or truncate it yourself. Wire this into Cypress’s",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "before(...)" }),
        " hook or Playwright’s",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "globalSetup" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "neon-branch", n: "04", label: "Neon branching", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "seed a fresh neon branch in one shell." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Neon's copy-on-write branches make per-developer or per-PR databases cheap. Combine that with satus and every engineer gets their own seeded database for the cost of the branch metadata." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# create a branch and capture its connection string` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `BRANCH=$(neon branches create --name pr-$PR --project-id $NEON_PROJECT_ID --output json)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `export DATABASE_URL=$(echo "$BRANCH" | jq -r .connection_uris[0].connection_uri)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# seed` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile saas` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Note, { children: "Tear the branch down on PR close. Neon charges per active branch—a stale fleet of seeded branches will surprise the bill." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: [
      "Have a recipe you want documented? Email",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh?subject=Recipe%20request", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
      ". We add the most-requested integrations first."
    ] })
  ] });
}
function Terminal({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-[760px] border-y border-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto px-1 py-6 font-mono text-[13px] leading-[1.85]", children }) });
}
function Cmt({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 text-[var(--mute)]", children });
}
function Shell({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 text-[var(--ink)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--mute)]", children: "$ " }),
    children
  ] });
}
function Out({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 text-[var(--signal)]", children });
}
function Blank() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" });
}
function Note({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 max-w-[760px] border-l-2 border-[var(--signal)] bg-[var(--ink)]/[0.02] px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: "note" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[62ch] text-[14px] leading-[1.6] text-[var(--ink)]/85 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[var(--ink)]", children })
  ] });
}
export {
  RecipesPage as component
};
