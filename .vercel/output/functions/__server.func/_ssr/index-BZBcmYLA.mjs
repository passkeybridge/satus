import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose, M as Mono } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
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
  n: "00",
  label: "Overview"
}, {
  id: "problem",
  n: "01",
  label: "Problem statement"
}, {
  id: "how",
  n: "02",
  label: "How it works"
}, {
  id: "guarantees",
  n: "03",
  label: "Guarantees"
}, {
  id: "anti-features",
  n: "04",
  label: "Anti-features"
}, {
  id: "sample-output",
  n: "05",
  label: "Sample output"
}, {
  id: "next",
  n: "06",
  label: "Continue reading"
}];
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Overview, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Problem, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(How, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Guarantees, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AntiFeatures, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SampleOutput, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Next, {})
  ] });
}
function Overview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "overview", n: "00", label: "RFC · SATUS-001", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "seed data that looks like a real business, not a faker dump." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mono, { children: "satus" }),
      " reads your live Postgres schema and writes rows that respect every foreign key, constraint, and business rule you didn’t write down. Built for the demo, the screenshot, and the QA run, not for load testing."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-[520px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InstallLine, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/demo", className: "link-underline font-mono text-[13px] text-[var(--signal)]", children: "try it in your browser →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quickstart", className: "link-underline font-mono text-[13px]", children: "read the quickstart →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs", className: "link-underline font-mono text-[13px] text-[var(--mute)] hover:text-[var(--ink)]", children: "read the docs →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 max-w-[640px] border-t border-[var(--hairline)] pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "example output · satus generate --profile saas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "mt-3 overflow-x-auto font-mono text-[12.5px] leading-[1.75] text-[var(--ink)]", children: [
        `$ satus generate --profile saas
  introspecting schema           14 tables · 38 FKs
  planning insert order          topological
  generating · orgs                 12 rows
  generating · users               120 rows
  generating · subscriptions        48 rows
  generating · invoices            420 rows
  inserting (transaction)        ok
`,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "✓" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "600 rows · $0.02 · 6.1s" })
      ] })
    ] })
  ] });
}
function InstallLine() {
  const [copied, setCopied] = reactExports.useState(false);
  const cmd = "npm i -g @passkeybridge/satus";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-stretch overflow-hidden border border-[var(--ink)] bg-[var(--paper)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-9 place-items-center border-r border-[var(--ink)] font-mono text-[12px] text-[var(--mute)]", children: "$" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "flex flex-1 items-center px-3 py-2.5 font-mono text-[13.5px] text-[var(--ink)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cmd }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "satus-caret ml-1.5 inline-block h-[14px] w-[7px] bg-[var(--signal)] align-middle" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }, className: "border-l border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mute)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]", "aria-label": "Copy install command", children: copied ? "copied" : "copy" })
  ] });
}
const COMPARE = [["random strings per column", "rows that reference real parents"], ["ignores foreign keys", "topological insert from pg_catalog"], ["John Doe, Acme, Lorem Ipsum", "Maren Holloway, Northwind, Burlington VT"], ["constraints fail at runtime", "zod validation before any INSERT"], ["one shape per table", "tone & distribution from a profile"]];
function Problem() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "problem", n: "01", label: "Problem statement", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "faker writes strings. your customers read businesses." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Seed data is the silent embarrassment of every product demo. Patients with negative ages. Orders that don’t sum to their line items. “John Doe, Lorem Ipsum Corp.” in the screenshot the founder is about to post." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The fix isn’t a better random-name library. The fix is data that knows your schema is a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "system" }),
        ": a subscription marked ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "canceled" }),
        " needs a",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "canceled_at" }),
        " after its ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "created_at" }),
        ", a clinic in Vermont doesn’t employ 4,000 cardiologists, an order’s ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "total" }),
        " equals the sum of its rows."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 max-w-[720px] overflow-hidden border border-[var(--hairline)] font-mono text-[12.5px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--paper)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-r border-[var(--paper)]/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]", children: "faker / factory_bot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]", children: "satus" })
      ] }),
      COMPARE.map(([a, b], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 ${i !== COMPARE.length - 1 ? "border-b border-[var(--hairline)]" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-r border-[var(--hairline)] px-4 py-3 text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: "−" }),
          a
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 text-[var(--ink)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 text-[var(--signal)]", children: "+" }),
          b
        ] })
      ] }, i))
    ] })
  ] });
}
const STEPS = [{
  n: "01",
  t: "introspect",
  d: "Read tables, columns, types, foreign keys, unique constraints, checks, and enums directly from pg_catalog. No annotations. No ORM plugins."
}, {
  n: "02",
  t: "plan",
  d: "Build a dependency DAG from your foreign keys and topologically sort the insert order. Parents before children, always."
}, {
  n: "03",
  t: "generate",
  d: "Per table, send schema, parent-row samples, and the active profile to the LLM. Receive rows as structured JSON via tool-calling, never free-text."
}, {
  n: "04",
  t: "validate",
  d: "A zod schema generated from the table catches type, length, enum, unique, and invariant violations before they ever reach the database."
}, {
  n: "05",
  t: "insert",
  d: "Wrap the entire run in a single Postgres transaction. Parameterized inserts in topological order. Any failure rolls back the whole run; your database is never left half-seeded."
}];
function How() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "how", n: "02", label: "How it works", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "five quiet steps. no magic. no daemons." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The CLI runs on your machine and talks to your database. There is no hosted runtime, no telemetry of your row data, and no surprise infrastructure." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-8 max-w-[760px]", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `grid grid-cols-[40px_140px_1fr] items-baseline gap-x-6 py-4 ${i !== STEPS.length - 1 ? "border-b border-[var(--hairline)]" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-[var(--mute)]", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[14px] font-medium tracking-tight text-[var(--ink)]", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] leading-[1.6] text-[var(--ink)]/85", children: s.d })
    ] }, s.n)) })
  ] });
}
const GUARANTEES = [{
  k: "G-01",
  h: "Foreign-key integrity",
  d: "Every generated row references parent keys that exist in the same run. Cycles are detected up front and either broken with nullable back-patching or fail loudly with E_FK_CYCLE."
}, {
  k: "G-02",
  h: "Atomic insertion",
  d: "All inserts for a single generate run execute inside one Postgres transaction. A failure on row 4,811 of 4,812 rolls back the entire run; your database is never left half-seeded."
}, {
  k: "G-03",
  h: "Cost ceiling",
  d: "The CLI prints an estimated token cost during the planning phase and refuses to proceed past --max-cost (default $1.00) without explicit confirmation. No silent overruns on your provider bill."
}, {
  k: "G-04",
  h: "Row-data locality",
  d: "Your row values are sent only to the LLM provider you configure with your own API key. We have no hosted runtime, no proxy, and no telemetry that includes generated content."
}];
function Guarantees() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "guarantees", n: "03", label: "Guarantees", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "four contracts the cli enforces at run time." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Marketing copy is cheap. These are the four invariants the binary itself refuses to violate. If any is broken in a release, it is a P0 bug." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 max-w-[860px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: GUARANTEES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[180px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: "guarantee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 font-mono text-[12.5px] text-[var(--ink)]", children: g.k })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[14px] font-medium text-[var(--ink)]", children: g.h }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80", children: g.d })
      ] })
    ] }, g.k)) })
  ] });
}
const ANTI = [{
  not: "Production data anonymization",
  instead: "Use pgAnonymizer or Tonic.ai. We generate fresh data; we don't redact yours."
}, {
  not: "Load-testing volume (10M+ rows)",
  instead: "Use pgbench or a faker pipeline. LLM calls cost too much at that scale."
}, {
  not: "A graphical schema editor",
  instead: "Your migrations are the source of truth. We read pg_catalog, we don't replace it."
}, {
  not: "ML model training datasets",
  instead: "Use real, licensed data. Synthetic rows are a demo aid, not a training corpus."
}, {
  not: "Cross-database support (MySQL, Mongo)",
  instead: "Postgres-only on purpose. We use pg_catalog features that don't translate."
}];
function AntiFeatures() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "anti-features", n: "04", label: "Anti-features", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what satus deliberately will not do." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every line item below is a feature request we’ve already decided to decline. Stating them up front saves you an issue and us a wontfix." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-[860px] overflow-x-auto border-y border-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] border-collapse font-mono text-[13px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[var(--hairline)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[44%] py-3 pr-6 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]", children: "not for" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]", children: "use instead" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ANTI.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[var(--hairline)] last:border-b-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pr-6 align-top text-[var(--ink)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 text-[var(--signal)]", children: "✕" }),
          a.not
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 align-top font-sans text-[14px] leading-[1.55] text-[var(--ink)]/80", children: a.instead })
      ] }, a.not)) })
    ] }) })
  ] });
}
const SAMPLE_ROWS = [{
  table: "orgs",
  cols: [{
    k: "id",
    v: "8e2c0a13-…"
  }, {
    k: "name",
    v: "Northbeam Analytics"
  }, {
    k: "plan",
    v: "pro"
  }, {
    k: "created_at",
    v: "2025-11-04 09:22 UTC"
  }, {
    k: "seat_count",
    v: "12"
  }]
}, {
  table: "users",
  cols: [{
    k: "id",
    v: "1f9d2b77-…"
  }, {
    k: "org_id",
    v: "→ orgs.id (Northbeam Analytics)"
  }, {
    k: "email",
    v: "alice@northbeam.io"
  }, {
    k: "title",
    v: "Staff Engineer"
  }, {
    k: "role",
    v: "admin"
  }]
}, {
  table: "subscriptions",
  cols: [{
    k: "id",
    v: "a4c11e8f-…"
  }, {
    k: "org_id",
    v: "→ orgs.id (Northbeam Analytics)"
  }, {
    k: "plan",
    v: "pro"
  }, {
    k: "status",
    v: "active"
  }, {
    k: "current_period_end",
    v: "2026-08-04 09:22 UTC"
  }]
}];
function SampleOutput() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "sample-output", n: "05", label: "Sample output", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "three rows, three tables, one consistent story." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Below: one org, its subscription, and a user with a workplace email inside the same org. FK values line up. Enum-shaped columns (plan, role, status) pick from plausible vocabularies. Timestamps cluster in the last 18 months, not uniformly across all time." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid max-w-[960px] grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3", children: SAMPLE_ROWS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border-t-2 border-[var(--ink)] pt-3 font-mono text-[12px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "table" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[13px] font-medium text-[var(--ink)]", children: row.table }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-4 space-y-2", children: row.cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[var(--mute)]", children: c.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 break-words text-[var(--ink)]", children: c.v })
      ] }, c.k)) })
    ] }, row.table)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profiles", className: "link-underline mt-10 inline-flex font-mono text-[13px]", children: "see all three reference profiles →" })
  ] });
}
const NEXT_LINKS = [{
  to: "/profiles",
  label: "Reference profiles",
  desc: "Three prompt hints: saas, ecommerce, b2b."
}, {
  to: "/pricing",
  label: "Pricing",
  desc: "Free, Pro, Team. Bring-your-own LLM key on every tier."
}, {
  to: "/quickstart",
  label: "Quickstart",
  desc: "Zero to a seeded database in under a minute."
}];
function Next() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "next", n: "06", label: "Continue reading", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "the rest of the specification." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[760px] border-t border-[var(--hairline)]", children: NEXT_LINKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: "group grid grid-cols-[200px_1fr] gap-x-8 border-b border-[var(--hairline)] py-5 transition-colors hover:bg-[var(--ink)]/[0.02]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[14px] font-medium text-[var(--ink)]", children: [
        item.label,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[var(--signal)] transition-transform group-hover:translate-x-0.5", children: "→" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] leading-[1.6] text-[var(--ink)]/85", children: item.desc })
    ] }, item.to)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClosingBand, {})
  ] });
}
function ClosingBand() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { "aria-label": "Get started", className: "mt-20 border-y-2 border-[var(--ink)] py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 items-baseline gap-x-10 gap-y-5 md:grid-cols-[1fr_auto]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[52ch] font-sans text-[16px] leading-[1.55] text-[var(--ink)]", children: "The free tier seeds up to 500 rows per run against any Postgres database. No account, no credit card, no hosted runtime." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px] md:justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quickstart", className: "link-underline text-[var(--ink)]", children: [
        "start with the free tier",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "→" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "link-underline text-[var(--mute)] hover:text-[var(--ink)]", children: "see pricing →" })
    ] })
  ] }) });
}
export {
  HomePage as component
};
