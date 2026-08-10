import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
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
import "./router-B2kWt1Bm.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const SECTIONS = [{
  id: "overview",
  n: "01",
  label: "Overview"
}, {
  id: "fk-planner",
  n: "02",
  label: "FK-cycle planner"
}, {
  id: "safety-guard",
  n: "03",
  label: "Safety guard"
}, {
  id: "transaction",
  n: "04",
  label: "One transaction"
}, {
  id: "boundaries",
  n: "05",
  label: "What it isn't"
}];
function HowItWorksPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/docs/how-it-works", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "overview", n: "01", label: "Overview", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "three guarantees. one binary." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Every ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " run makes three promises to your database. They aren’t marketing copy—they map directly to three pieces of code in the CLI, and each one has a named exit code you can branch on in CI."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "ml-5 list-decimal space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "The FK-cycle planner" }),
          " reorders inserts so every foreign key points at a row that already exists, even when your schema has cycles."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "The safety guard" }),
          " refuses to touch a database that already holds real user data, unless you explicitly opt out."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "The one-transaction guarantee" }),
          " means a failed run leaves your database byte-for-byte identical to how it started."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The rest of this page explains each one—what it does, why it exists, and where it stops." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "fk-planner", n: "02", label: "FK-cycle planner", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "cycles are normal. inserts still need an order." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Postgres lets you declare foreign keys in any topology, including cycles—",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "users.primary_org_id → organizations.id" }),
        " and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "organizations.owner_id → users.id" }),
        " is the textbook example, but the pattern shows up anywhere a graph has bidirectional ownership (folders ↔ root_file, accounts ↔ default_card, threads ↔ latest_message). It compiles, it ships to production, and it quietly defeats every seed script that assumes a topological sort will work."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The planner runs in three phases:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "ml-5 list-decimal space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Introspect." }),
          " Read ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_catalog" }),
          " to extract every table, column, FK, NOT NULL constraint, and DEFERRABLE status. No assumptions, no parsing of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CREATE TABLE" }),
          " text—the source of truth is the live schema."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Build the DAG, find the cycles." }),
          " Treat tables as nodes and FKs as edges. A straightforward topological sort handles 100% of acyclic schemas. For the remainder, Tarjan’s algorithm enumerates every strongly-connected component."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Break each cycle on the weakest edge." }),
          " Inside a cycle, pick the FK whose column is nullable (or has a DEFAULT, or is declared DEFERRABLE INITIALLY DEFERRED). Insert that side first with the FK column left empty, insert the other side normally, then run a second pass that ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "UPDATE" }),
          "s the empty column with the correct id. Referential integrity holds at every commit point."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "When no edge in a cycle is breakable—every column on the cycle is NOT NULL with no DEFAULT and not DEFERRABLE—satus refuses to guess. It exits with code ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "10" }),
        " (",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "E_FK_CYCLE" }),
        ") and tells you which constraint to relax. We’d rather fail loudly than ship a workaround that violates an invariant you spent time declaring."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/blog/cyclic-fks-in-the-wild", className: "underline decoration-[var(--signal)] underline-offset-4", children: "Cyclic FKs in the wild" }),
        " ",
        "walks through a real-world example with the SQL the planner emits."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "safety-guard", n: "03", label: "Safety guard", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "ten thousand rows. then we stop and ask." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Before any write, satus counts user-table rows—every table outside",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_catalog" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "information_schema" }),
        ", and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_toast" }),
        "—and refuses to run if the total exceeds",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "10,000" }),
        ". The intent is narrow: catch the case where",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: " DATABASE_URL" }),
        " was set to production by accident."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "10,000 is deliberately conservative. A fresh development database sits at zero. A Docker container with the day’s migration applied sits in the low hundreds. A test database that someone already seeded is in the low thousands. Anything above five digits is almost always a database you didn’t mean to point at." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The guard is bypassable. Pass ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--force" }),
        " when you know what you’re doing—appending to a staging database that already has real fixtures, for example. The exit code on a guard trip is ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "11" }),
        " (",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "E_DB_NOT_EMPTY" }),
        ") so CI can distinguish “refused to run” from “tried and failed.”"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Two things the guard is not: it isn’t a permission check (Postgres roles do that better), and it isn’t a rollback mechanism (the transaction guarantee below does that). It is one confirmation prompt, expressed as an exit code, between you and a mistake that costs a Slack apology." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "transaction", n: "04", label: "One transaction", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "all the rows. or none of them." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " opens a single Postgres transaction, issues every ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "INSERT" }),
        " and the FK back-patch",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "UPDATE" }),
        "s inside it, and commits exactly once at the end. If anything fails—an LLM timeout, an unforeseen check constraint, a network blip, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Ctrl-C" }),
        "—the transaction rolls back and your database is left in the state it was in before the run started."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "This is plain Postgres ACID; we don’t implement a custom rollback. The value we add is that the run ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "fits" }),
        " in one transaction. The planner pre-computes the entire insert order, the LLM calls happen ahead of writes so token failures abort before anything hits the database, and the back-patch pass is small enough to stay inside the transaction without inflating WAL."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Two practical consequences:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You don’t need cleanup scripts. A failed run is a no-op." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "You can run ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
          " in a tight CI loop against the same database without worrying about half-seeded state from a previous run."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The trade-off: very large seed runs hold a long-lived transaction. For datasets above ~50,000 rows we recommend planning with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--dry" }),
        " first and reviewing the SQL—not because the transaction will fail, but so you know what you’re about to commit."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "boundaries", n: "05", label: "What it isn't", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "three things satus does not do." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Knowing the edges of a tool is part of trusting it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "satus does not migrate your schema." }),
          " It reads the schema you already have. Use ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "prisma migrate" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "sqitch" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "flyway" }),
          ", or whatever your team standardised on—then point satus at the result."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "satus does not anonymise production data." }),
          " It generates new rows from scratch, profile-shaped and referentially correct. If you need to mask real PII, that’s a different category of tool (Snaplet’s subset feature, or a homegrown ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_dump" }),
          " + sed pipeline)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "satus does not resell LLM tokens." }),
          " You bring your own provider key — ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "OPENAI_API_KEY" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "ANTHROPIC_API_KEY" }),
          ". The request goes directly from your machine to the provider you selected (auto-detected from env, or pinned with ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--provider" }),
          "). Cost shows up on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "your" }),
          " dashboard, never ours. Internally, every provider is a thin adapter behind a single ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Provider" }),
          " interface (",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "generate<T>(req): Promise<{ data, usage }>" }),
          "), so the runner stays provider-agnostic and adding a third provider is a single new file."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: [
        "Concept guide for satus 0.3.x. If anything here drifts from the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/cli", className: "underline decoration-[var(--signal)] underline-offset-4", children: "CLI reference" }),
        ", the CLI reference wins—file an issue."
      ] })
    ] }) })
  ] });
}
export {
  HowItWorksPage as component
};
