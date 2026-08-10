import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import { a as SATUS_VERSION } from "./router-B2kWt1Bm.mjs";
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
import "../_libs/lucide-react.mjs";
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
const SECTIONS = [{
  id: "install",
  n: "01",
  label: "Install"
}, {
  id: "configure",
  n: "02",
  label: "Configure"
}, {
  id: "preview",
  n: "03",
  label: "Preview"
}, {
  id: "ship",
  n: "04",
  label: "Ship"
}, {
  id: "troubleshooting",
  n: "05",
  label: "Troubleshooting"
}];
function QuickstartPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/quickstart", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "install", n: "01", label: "Install", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one global binary. node 20+." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus ships as a single Node binary. We test on Node 20 and 22 across macOS and Linux. Windows is supported via WSL2." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# install globally` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `npm i -g @passkeybridge/satus` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# verify` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus --version` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: SATUS_VERSION })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "configure", n: "02", label: "Configure", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "point at any postgres. pick a profile." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Supabase, Neon, Railway, RDS, or a local instance—satus reads ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "DATABASE_URL" }),
          " ",
          "and your LLM provider key from the environment. The free tier caps runs at 25 rows per table across 5 tables; a Pro or Team key (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus activate" }),
          ") removes the caps."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Pick one provider: export ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "OPENAI_API_KEY" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "ANTHROPIC_API_KEY" }),
          ". If both are set, pass",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--provider openai|anthropic" }),
          " on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
          "—auto-detect deliberately refuses to guess so a misplaced key never spends on the wrong invoice."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# 1 · database & llm provider (openai shown; swap for ANTHROPIC_API_KEY for Claude)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `export DATABASE_URL="postgres://user:pass@localhost:5432/app"` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `export OPENAI_API_KEY="sk-..."` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# 2 · scaffold satus.config.json (interactive: schema, profile, provider, model)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus init` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `✓ wrote satus.config.json` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "preview", n: "03", label: "Preview", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "see the sql before it hits your database." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--dry-run" }),
        " runs the full pipeline offline—introspect, FK-sort, simulate, validate—without calling the model or writing a row. It prints a per-table cost estimate, then runs the relational validator against simulated output and exits non-zero on findings, so it works as a CI gate. Add ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--json" }),
        " for a machine-readable report."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# plan + validate offline; no spend, no writes` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile ecommerce --dry-run` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `  estimated cost: $0.0094` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `  ✓ no validation findings across 5 tables` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "ship", n: "04", label: "Ship", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one transaction. all-or-nothing." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " runs inside a single Postgres transaction. If any insert fails, the entire run rolls back—your database is never left in a half-seeded state."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile ecommerce --rows 25` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `✓ inserted 125 rows across 5 tables` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "troubleshooting", n: "05", label: "Troubleshooting", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "the three failures you’ll hit on day one." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Most issues fall into three buckets. If you hit something we haven’t listed, open an issue with the stack trace and the offending ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CREATE TABLE" }),
        " ",
        "statement—schema reproduction is the #1 thing we triage."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Issue, { code: "E_FK_CYCLE", title: "Foreign-key cycle could not be broken automatically", body: "satus detects cycles in your FK graph at planning time and breaks them automatically by deferring a nullable column and back-patching in pass 2 (see the cyclic FKs post). This error fires when every column on the cycle is NOT NULL with no DEFAULT, so there's nowhere to put a placeholder. Mark one side nullable, add a DEFAULT, or declare the constraint DEFERRABLE." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Issue, { code: "E_NO_PARENT_ROWS", title: "No parent rows available for a NOT NULL foreign key", body: "A child table's NOT NULL FK points at a table that isn't in the run set—usually because it lives in another schema or is listed under `exclude` in satus.config.json. Bring the parent into the run, make the column nullable, or seed the parent yourself first." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Issue, { code: "E_LLM_RATE_LIMIT", title: "LLM provider rate-limited the run", body: "The run aborts and the transaction rolls back, so your database is untouched—re-run once the limit clears. Lower --batch-size (default 25) to shrink each request, or upgrade your provider tier. We never resell tokens—the bill is on your provider's dashboard." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: "satus.sh—built for engineers who hate seeing John Doe in their demo data." })
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
function Issue({
  code,
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[180px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: "error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 font-mono text-[12.5px] text-[var(--ink)]", children: code })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[14px] font-medium text-[var(--ink)]", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80", children: body })
    ] })
  ] });
}
export {
  QuickstartPage as component
};
