import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as FAQS } from "./router-B2kWt1Bm.mjs";
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
  id: "install",
  n: "01",
  label: "Install & setup"
}, {
  id: "schema",
  n: "02",
  label: "Schema errors"
}, {
  id: "llm",
  n: "03",
  label: "LLM provider"
}, {
  id: "runtime",
  n: "04",
  label: "Runtime & rollback"
}, {
  id: "license",
  n: "05",
  label: "License & billing"
}, {
  id: "still-stuck",
  n: "06",
  label: "Still stuck"
}];
const GROUPS = [{
  id: "install",
  range: [0, 3]
}, {
  id: "schema",
  range: [3, 7]
}, {
  id: "llm",
  range: [7, 11]
}, {
  id: "runtime",
  range: [11, 15]
}, {
  id: "license",
  range: [15, 19]
}];
function TroubleshootingPage() {
  const groupFor = (id) => {
    const g = GROUPS.find((x) => x.id === id);
    return FAQS.slice(g.range[0], g.range[1]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/docs/troubleshooting", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "install", n: "01", label: "Install & setup", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "the binary, the path, the variables." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Three things that go wrong on the first run: a stale PATH after the global install, an unsupported Node version, and confusion about which commands need credentials." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqList, { items: groupFor("install") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "schema", n: "02", label: "Schema errors", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "the planner refused to write." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The planner reads ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_catalog" }),
        " before any insert. When it sees something it can’t resolve safely it exits with a named code and writes nothing. Every error below is recoverable without database surgery."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqList, { items: groupFor("schema") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "llm", n: "03", label: "LLM provider", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "your key. your bill. your retries." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus calls OpenAI directly from your machine. Authentication and rate-limit errors come straight from the provider; we map them to stable exit codes so CI can branch on them." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqList, { items: groupFor("llm") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "runtime", n: "04", label: "Runtime & rollback", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what happens when a run dies mid-flight." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " runs inside a single Postgres transaction. Most “is my database corrupted?” questions have the same answer: no, the transaction rolled back. The mechanics are covered in",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/docs/how-it-works#transaction", className: "underline decoration-[var(--signal)] underline-offset-4", children: "how it works" }),
        "."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqList, { items: groupFor("runtime") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "license", n: "05", label: "License & billing", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "activation, seats, refunds." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Free runs uncapped time-wise but caps each run at 25 rows per table across 5 tables; license-keyed activation lifts those caps and applies to Pro and Team. The CLI verifies once, caches for 24 hours, and works offline within that window." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqList, { items: groupFor("license") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "still-stuck", n: "06", label: "Still stuck", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "open an issue. include the schema." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "If nothing above matches, the fastest path to a fix is a GitHub issue with three things: the full stack trace (or the named exit code), the offending ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CREATE TABLE" }),
        " statement(s), and the satus version (",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus --version" }),
        "). Schema reproduction is the single thing we triage hardest—the more faithful your repro, the faster the fix."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "For private questions (procurement, security disclosures, anything you don’t want on a public tracker), email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        ". Humans answer; we aim to acknowledge within two business days."
      ] })
    ] }) })
  ] });
}
function FaqList({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: "question" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 max-w-[62ch] font-mono text-[14px] font-medium text-[var(--ink)]", children: item.q }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80", children: item.a })
  ] }, item.q)) });
}
export {
  TroubleshootingPage as component
};
