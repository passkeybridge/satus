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
const PROFILES = [{
  id: "saas",
  n: "01",
  label: "SaaS",
  name: "saas",
  tagline: "Bias generated values toward a B2B SaaS product: workplace emails, startup-style company names, plan-tier enums, and dates clustered in the last 18 months.",
  hints: ['startup and company names mixing single-word brands with "X-ly" and "Get-X" patterns', "workplace email addresses (alice@acme.com), not gmail / hotmail / personal domains", "plausible SaaS job titles (Engineer, PM, Designer, Head of Ops)", "billing-plan and feature-flag enums when the column name suggests them (free, pro, team)", "dates clustered in the last 18 months; subscriptions distributed across plans"],
  sample: [{
    col: "orgs.name",
    value: "Northbeam Analytics"
  }, {
    col: "users.email",
    value: "alice@northbeam.io"
  }, {
    col: "users.title",
    value: "Staff Engineer"
  }, {
    col: "subscriptions.plan",
    value: "pro"
  }, {
    col: "users.created_at",
    value: "2025-11-04T09:22:11Z"
  }]
}, {
  id: "ecommerce",
  n: "02",
  label: "E-commerce",
  name: "ecommerce",
  tagline: "Bias generated values toward a consumer e-commerce store: realistic product names across apparel/home/accessories, prices with familiar retail cents, and orders skewed toward fulfilled.",
  hints: ["product names across apparel, home goods, and accessories", "prices between 9.99 and 299.99 with cents ending in .99 / .49 / .00", "customer names and shipping addresses drawn from US / UK / DE / FR / JP", "order statuses biased toward fulfilled, with a long tail of pending and refunded"],
  sample: [{
    col: "products.title",
    value: 'Cedar Plank Cutting Board, 18"'
  }, {
    col: "products.price",
    value: "$34.99"
  }, {
    col: "customers.country",
    value: "DE"
  }, {
    col: "orders.status",
    value: "fulfilled"
  }, {
    col: "orders.total",
    value: "$84.50"
  }]
}, {
  id: "b2b",
  n: "03",
  label: "B2B",
  name: "b2b",
  tagline: "Bias generated values toward a B2B service or marketplace: mid-market accounts, contract values, multi-seat licensing, and procurement-style metadata. Consumer language is avoided.",
  hints: ["mid-market company names with a named-account feel", "contract values in the $5,000 to $250,000 range", "multi-seat licensing (seat counts, per-seat unit prices)", "procurement metadata: PO numbers, NET-30 terms, MSA dates", "no consumer language (no shopping, no household products)"],
  sample: [{
    col: "accounts.name",
    value: "Meridian Freight Systems, Inc."
  }, {
    col: "contracts.value_usd",
    value: "$78,000"
  }, {
    col: "contracts.seats",
    value: "45"
  }, {
    col: "contracts.payment_terms",
    value: "NET-30"
  }, {
    col: "contracts.po_number",
    value: "PO-2026-01849"
  }]
}];
const SECTIONS = [...PROFILES.map((p) => ({
  id: p.id,
  n: p.n,
  label: p.label
})), {
  id: "byo",
  n: "04",
  label: "Bring your own"
}];
function ProfilesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/profiles", children: [
    PROFILES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: p.id, n: p.n, label: p.label, title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "--profile ",
      p.name
    ] }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p.tagline }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid max-w-[860px] grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[220px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "prompt hints" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2 text-[13.5px] leading-[1.55] text-[var(--ink)]/85", children: p.hints.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "mt-[7px] inline-block h-px w-3 shrink-0 bg-[var(--signal)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
          ] }, h)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "sample values" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 overflow-x-auto border-y border-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[420px] border-collapse font-mono text-[12.5px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[46%] py-2.5 pr-4 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]", children: "column" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]", children: "example" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: p.sample.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--hairline)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 text-[var(--mute)]", children: s.col }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-[var(--ink)]", children: s.value })
            ] }, s.col)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-[860px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-[1.6] text-[var(--mute)]", children: "Profiles bias value choice; they don’t define your schema. The table set, column types, and FK graph come from introspecting your own database. Rows are validated against your Postgres constraints before they land." }) })
    ] }, p.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "byo", n: "04", label: "Bring your own", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "no profile? no problem." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Omit ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--profile" }),
        " and the CLI runs with a neutral system prompt. Values still respect column types, nullability, unique constraints, check constraints, and foreign keys—you just don’t get the domain-flavored biases. Useful for internal schemas that don’t map cleanly onto SaaS, e-commerce, or B2B."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "More profiles (legal, real estate, logistics, healthcare) are on the roadmap and will be pinned by user demand. Open an issue with your",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CREATE TABLE" }),
        " statements and a short description of the domain and we’ll triage."
      ] })
    ] }) })
  ] });
}
export {
  ProfilesPage as component
};
