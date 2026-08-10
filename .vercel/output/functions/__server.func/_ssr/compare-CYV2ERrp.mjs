import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as LAST_REVIEWED } from "./router-B2kWt1Bm.mjs";
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
const SECTIONS = [{
  id: "framing",
  n: "01",
  label: "Framing"
}, {
  id: "vs-snaplet",
  n: "02",
  label: "vs Snaplet Seed"
}, {
  id: "vs-tonic",
  n: "03",
  label: "vs Tonic.ai"
}, {
  id: "vs-faker",
  n: "04",
  label: "vs faker / fakerjs"
}, {
  id: "when-not",
  n: "05",
  label: "When not to use satus"
}];
function ComparePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/compare", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "framing", n: "01", label: "Framing", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "different tools. different jobs." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus is a seeding CLI: point it at a Postgres schema, get relationally coherent rows. That's a narrow job. The three tools on this page show up in the same Google searches but solve adjacent problems—production-data anonymization, generic value generation, full data platforms. The right pick depends on what you actually need, not on which has the longer feature list." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "We link to each vendor's own documentation as the source of truth. If you spot a stale or incorrect characterization, email",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh?subject=Compare%20page%20correction", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
          " ",
          "and we'll fix it."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 max-w-[62ch] font-mono text-[11px] text-[var(--mute)]", children: [
        "last reviewed · ",
        LAST_REVIEWED
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "vs-snaplet", n: "02", label: "vs Snaplet Seed", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "seed → seed, with a different posture." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Snaplet" }),
        ' built the original "seed from your schema" category. In August 2024 the company shut down its hosted service and open-sourced its tooling; the Seed library now lives at',
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/supabase-community/seed", target: "_blank", rel: "noopener", className: "underline decoration-[var(--signal)] underline-offset-4", children: "github.com/supabase-community/seed" }),
        " ",
        "(",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://supabase.com/blog/snaplet-is-now-open-source", target: "_blank", rel: "noopener", className: "underline decoration-[var(--signal)] underline-offset-4", children: "announcement" }),
        "). If you want an MIT-licensed library that embeds directly in your codebase and you're comfortable with a community-maintained cadence, Seed is a reasonable choice."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompareBlock, { theirs: ["Open-source library; embeds in your codebase.", "Generates data via heuristics and TypeScript-defined relations.", "Community-maintained since the 2024 sunset; no published roadmap."], ours: ["CLI, not a library; drops into any stack without code changes.", "LLM-driven generation gives plausible content (names, addresses, copy) tuned per profile.", "Commercial roadmap backed by PasskeyBridge LLC; support inbox with SLA."], verdict: "Pick Snaplet Seed if you want a zero-dependency open-source library and can accept a slower release cadence. Pick satus if you want plausible content out of the box and a vendor on the other end of an email." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "vs-tonic", n: "03", label: "vs Tonic.ai", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "different problem entirely." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.tonic.ai/", target: "_blank", rel: "noopener", className: "underline decoration-[var(--signal)] underline-offset-4", children: "Tonic.ai" }) }),
        " ",
        "is a data-platform company. Their core product anonymizes and subsets production data for use in lower environments—a different job from generating data from scratch. If you have production data you need to share with QA without leaking PII, Tonic is built for that."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompareBlock, { theirs: ["Anonymises and subsets existing production data.", "Enterprise data platform with SOC 2 controls, deployed in-VPC.", "Requires you to already have a production dataset."], ours: ["Generates synthetic data without ever touching production.", "Single binary; runs anywhere Node 20+ does.", "Works on day one with no source dataset to subset."], verdict: "Pick Tonic if you have production data and need to safely move a subset of it downstream. Pick satus if you want plausible data without ever copying real customer rows." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "vs-faker", n: "04", label: "vs faker / fakerjs", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "fields vs relationships." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://fakerjs.dev/", target: "_blank", rel: "noopener", className: "underline decoration-[var(--signal)] underline-offset-4", children: "faker.js" }) }),
        " ",
        "(and its Python and Ruby cousins) is the original field-level value generator: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "faker.person.firstName()" }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "faker.commerce.productName()" }),
        ". It does not know that a",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "customer_id" }),
        " on ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "orders" }),
        " must exist in",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "customers" }),
        ". Wiring relational integrity is left to you."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompareBlock, { theirs: ["Massive library of value generators across locales.", "Embedded directly in test code; full programmatic control.", "Schema awareness, FK consistency, and ordering are entirely your problem."], ours: ["Reads your schema, builds the FK dependency graph automatically.", "Inserts in topological order inside one transaction.", "You write zero per-table code; profiles cover whole domains."], verdict: "Pick faker for unit-test fixtures and small isolated objects. Pick satus when you need a coherent multi-table dataset that doesn't violate a single foreign key." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "when-not", n: "05", label: "When not to use satus", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "three honest no-fits." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We'd rather lose the sale than waste your week. Skip satus if any of these apply:" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NoFit, { title: "You need anonymized production data, not synthetic data.", body: "A real customer's order history with the names changed is not the same artefact as a freshly generated one. If your QA workflows depend on the statistical shape of real traffic, you want a subsetting tool, not a generator." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NoFit, { title: "Your database isn't Postgres.", body: "satus reads pg_catalog and emits Postgres-flavoured SQL. MySQL, MSSQL, SQLite, and the document stores are out of scope for v1 and not on the near-term roadmap." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NoFit, { title: "You need millions of rows.", body: "satus is tuned for the 1K–50K row range that powers demos, staging, and PR previews. Above that, the per-row LLM cost stops being trivial; use a deterministic generator for the bulk and satus for the human-facing slice." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: [
        "Read the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/quickstart", className: "underline decoration-[var(--signal)] underline-offset-4", children: "quickstart" }),
        " ",
        "and the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/profiles", className: "underline decoration-[var(--signal)] underline-offset-4", children: "profiles catalogue" }),
        " ",
        "to judge fit for your own schema."
      ] })
    ] })
  ] });
}
function CompareBlock({
  theirs,
  ours,
  verdict
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 max-w-[760px] border-y border-[var(--hairline)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[var(--hairline)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Column, { kicker: "them", items: theirs }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Column, { kicker: "us", items: ours, accent: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[var(--hairline)] px-5 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: "verdict" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/85", children: verdict })
    ] })
  ] });
}
function Column({
  kicker,
  items,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-mono text-[10px] uppercase tracking-[0.22em] ${accent ? "text-[var(--signal)]" : "text-[var(--mute)]"}`, children: kicker }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-[14px] leading-[1.55] text-[var(--ink)]/85", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: `mt-[0.55em] inline-block h-px w-3 shrink-0 ${accent ? "bg-[var(--signal)]" : "bg-[var(--mute)]"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
    ] }, item)) })
  ] });
}
function NoFit({
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[14px] font-medium text-[var(--ink)]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80", children: body })
  ] });
}
export {
  ComparePage as component
};
