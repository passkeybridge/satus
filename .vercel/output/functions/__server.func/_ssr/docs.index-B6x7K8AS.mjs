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
  id: "start-here",
  n: "01",
  label: "Start here"
}, {
  id: "reference",
  n: "02",
  label: "Reference"
}, {
  id: "concepts",
  n: "03",
  label: "Concepts"
}, {
  id: "support",
  n: "04",
  label: "Support"
}];
function DocsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/docs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "start-here", n: "01", label: "Start here", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "read these two pages in order." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus is a CLI. It introspects your Postgres schema, reasons about foreign keys, and writes seed data that respects every relationship. If you've never run it, walk through these two pages—about ten minutes end-to-end—before anything else." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardGrid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/quickstart", kicker: "tutorial", title: "Quickstart", body: "Install, point at any Postgres, pick a profile, preview, ship. The fastest path from zero to a seeded database." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/profiles", kicker: "catalogue", title: "Profiles", body: "The three bundled domains—saas, ecommerce, b2b—with the tone and distribution hints each one gives the model." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "reference", n: "02", label: "Reference", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "every flag, every exit code." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "One page per surface. The reference is exhaustive and stable across the 0.1.x line—bookmark it." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardGrid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/cli", kicker: "reference", title: "CLI reference", body: "Synopsis, environment variables, every subcommand (init, plan, generate), every flag, every exit code." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/recipes", kicker: "how-to", title: "Recipes", body: "Copy-paste guides for the most common integrations: preview branches, GitHub Actions, E2E resets, Neon branching." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/compare", kicker: "positioning", title: "vs Snaplet, Tonic, faker", body: "Honest, category-by-category comparison against the alternatives developers most often weigh." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/pricing", kicker: "commercial", title: "Pricing & tiers", body: "Free runs the same CLI binary, capped at 25 rows × 5 tables. Pro lifts the caps and adds private profiles and priority support. Team is a waitlist. No token resale." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "concepts", n: "03", label: "Concepts", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "why it works the way it does." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Long-form posts that explain the design decisions—the FK-cycle planner, the safety guard, the one-transaction guarantee. Read these when you want to understand the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "why" }),
        ", not just the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "how" }),
        "."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardGrid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/docs/how-it-works", kicker: "concept", title: "How it works", body: "The three guarantees satus makes—FK-cycle planning, the 10,000-row safety guard, and the single-transaction write—explained end to end." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { to: "/blog/cyclic-fks-in-the-wild", kicker: "essay", title: "Cyclic FKs in the wild", body: "Why a third of production Postgres schemas have foreign-key cycles, and how satus breaks them without giving up referential integrity." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "support", n: "04", label: "Support", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one inbox. one repo." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Hit an error code? Start with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/docs/troubleshooting", className: "underline decoration-[var(--signal)] underline-offset-4", children: "troubleshooting" }),
        "—every exit code, every common failure mode, with the fix."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "File bugs and feature requests against the public repo. For private questions—invoices, procurement, security—write to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        ". Humans answer. We aim to acknowledge within two business days."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Reporting a vulnerability? See our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/security", className: "underline decoration-[var(--signal)] underline-offset-4", children: "security policy" }),
        " ",
        "for scope, the embargo timeline, and safe harbor."
      ] })
    ] }) })
  ] });
}
function CardGrid({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid max-w-[760px] grid-cols-1 gap-px bg-[var(--hairline)] sm:grid-cols-2", children });
}
function Card({
  to,
  kicker,
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: to, className: "group block bg-[var(--paper)] p-6 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: kicker }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-mono text-[16px] font-medium text-[var(--ink)] group-hover:text-[var(--paper)]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[14px] leading-[1.55] text-[var(--ink)]/75 group-hover:text-[var(--paper)]/80", children: body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 font-mono text-[11px] text-[var(--mute)] group-hover:text-[var(--paper)]/60", children: [
      to,
      " ↗"
    ] })
  ] });
}
export {
  DocsPage as component
};
