import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import { a as SATUS_VERSION, b as SATUS_VERSION_TAG, c as SATUS_RELEASED_AT } from "./router-B2kWt1Bm.mjs";
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
  id: "synopsis",
  n: "01",
  label: "Synopsis"
}, {
  id: "env",
  n: "02",
  label: "Environment"
}, {
  id: "init",
  n: "03",
  label: "satus init"
}, {
  id: "generate",
  n: "04",
  label: "satus generate"
}, {
  id: "activate",
  n: "05",
  label: "satus activate"
}, {
  id: "whoami",
  n: "06",
  label: "satus whoami"
}, {
  id: "notes",
  n: "07",
  label: "Operational notes"
}];
function CliPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/cli", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "synopsis", n: "01", label: "Synopsis", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "four verbs. one binary." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "The CLI exposes four subcommands—",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "init" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "generate" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "activate" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "whoami" }),
          "—and two global flags. Connection strings and provider keys are read from the environment by default so secrets never land in shell history; equivalent overrides are documented per command below."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "New here? Walk through the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/quickstart", className: "underline decoration-[var(--signal)] underline-offset-4", children: "quickstart" }),
          " ",
          "first—this page is the reference, not the tutorial."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# global form` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus <command> [flags]` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# global flags` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus --version` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Out, { children: `satus ${SATUS_VERSION}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus --help` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "env", n: "02", label: "Environment", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one db url. one provider key." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "satus reads its connection string and an LLM provider key from the environment. Both are required for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "generate" }),
          ";",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "init" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "activate" }),
          ", and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "whoami" }),
          " ",
          "need neither."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Pick one provider per run. If both ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "OPENAI_API_KEY" }),
          " and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "ANTHROPIC_API_KEY" }),
          " are exported and no",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--provider" }),
          " flag or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "provider" }),
          " config field is set, the run aborts with a clear message — auto-detect deliberately refuses to guess so a misplaced key never spends on the wrong invoice."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvVar, { name: "DATABASE_URL", req: "required", body: "Standard libpq connection string. SATUS_DATABASE_URL is also accepted and takes precedence. Either can be overridden per run with --dsn on generate." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvVar, { name: "OPENAI_API_KEY", req: "one of two", body: "Bring-your-own OpenAI key. satus never proxies LLM calls; the request goes directly from your machine to OpenAI. OPENAI_BASE_URL is honored if you need to point at an OpenAI-compatible endpoint (Groq, Together, a local proxy)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EnvVar, { name: "ANTHROPIC_API_KEY", req: "one of two", body: "Bring-your-own Anthropic key. The CLI calls api.anthropic.com directly using the pinned Messages API (anthropic-version: 2023-06-01) with tool-use forcing for structured output. ANTHROPIC_BASE_URL is honored if you need a compatible proxy." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "init", n: "03", label: "satus init", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "scaffold a config in the current directory." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Writes ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus.config.json" }),
        " to the current working directory. Interactive prompts ask for the connection string (blank falls back to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "$DATABASE_URL" }),
        "), the schema, the profile, and the row count. Safe to re-run; existing config is preserved unless ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--force" }),
        " is set."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus init` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlagTable, { rows: [["--force", "false", "Overwrite an existing satus.config.json."]] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "generate", n: "04", label: "satus generate", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one transaction. all-or-nothing." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Introspects the target schema, builds the foreign-key DAG, breaks any cycles whose back-edge is nullable, calls the LLM for realistic rows, then writes the entire dataset inside a single Postgres transaction. If any insert fails the whole run rolls back and your database is left untouched." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--dry-run" }),
          " performs introspection, planning, and cost estimation but skips both the LLM call and the write phase. It is the right way to preview what a run would do before spending tokens."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Terminal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile saas --rows 25` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Blank, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cmt, { children: `# preview the plan without spending tokens or writing rows` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus generate --profile saas --dry-run` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlagTable, { rows: [["--profile <name>", "from config", "Reference profile. One of: saas, ecommerce, b2b."], ["--rows <n>", "50", "Rows to generate per table. Free tier caps at 25 rows/table and 5 tables."], ["--batch-size <n>", "25", "Rows per LLM call. Lower if you hit provider rate limits."], ["--max-cost <usd>", "1.00", "Abort before any LLM spend if the estimated cost exceeds this ceiling."], ["--dsn <url>", "from env", "Postgres connection string. Overrides DATABASE_URL and the config file."], ["--schema <name>", "from config", "Postgres schema to seed. Defaults to public when neither config nor flag is set."], ["--provider <id>", "auto-detect", "LLM provider: openai or anthropic. Falls back to env-var auto-detect (errors if both keys are set with no explicit choice)."], ["--model <id>", "provider default", "Model id. Defaults to gpt-4o-mini for openai and claude-haiku-4-5 for anthropic. Cross-provider model names are not validated client-side."], ["--truncate", "false", "TRUNCATE target tables (RESTART IDENTITY CASCADE) before inserting."], ["--dry-run", "false", "Plan only. Print the insert order and the cost estimate; do not call the LLM and do not write to the database."], ["-v, --verbose", "false", "Print one line per LLM batch: table, batch index, rows, input/output tokens, and USD spent."], ["--json", "false", "Emit a single newline-terminated JSON object on stdout at completion (snake_case keys). All human output is redirected to stderr so stdout is safe for jq and CI."]] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "activate", n: "05", label: "satus activate", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "swap free for pro or team." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Validates a license key against",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "https://satus.sh/api/public/license/verify" }),
        " and writes the result to the local cache (",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "~/.satus/license-cache.json" }),
        ", 24-hour TTL). Until activated, generation runs under the Free tier limits noted above."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus activate satus_live_••••••••` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "whoami", n: "06", label: "satus whoami", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "read the cached license." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Prints the currently activated tier and the email the license was issued to. Reads the local cache only; no network call is made." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: `satus whoami` }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "notes", n: "07", label: "Operational notes", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "exit codes, privacy, and the wire shape." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Every command returns ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "0" }),
          " on success and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "1" }),
          " ",
          "on any error, with a one-line diagnostic written to stderr. Stable per-failure-mode exit codes are planned for a future minor release; today, scripts that need to branch on failure should match the stderr message."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus never sends your schema, your data, or your column names to satus.sh. The only network call to satus.sh is the license verify, which sends your license key and nothing else. LLM calls go directly from your machine to your provider with your key. Telemetry, when you opt in, sends an anonymized run summary (table count, row count, duration, exit code)—never table or column names, never row data." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: [
        "Reference matches the published binary at ",
        SATUS_VERSION_TAG,
        " ",
        "(released ",
        SATUS_RELEASED_AT,
        "). Flag defaults are stable across the 0.x line; new flags may be added in minor releases."
      ] })
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
function EnvVar({
  name,
  req,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[220px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]", children: req }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 break-all font-mono text-[12.5px] text-[var(--ink)]", children: name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80", children: body })
  ] });
}
function FlagTable({
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 max-w-[760px] overflow-hidden border-y border-[var(--hairline)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[260px_120px_1fr] gap-x-6 border-b border-[var(--hairline)] px-1 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)] md:grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "flag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "default" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "description" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-[var(--hairline)]", children: rows.map(([flag, def, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-1 gap-x-6 gap-y-1 px-1 py-4 md:grid-cols-[260px_120px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all font-mono text-[12.5px] text-[var(--ink)]", children: flag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12.5px] text-[var(--mute)]", children: def }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] leading-[1.55] text-[var(--ink)]/80", children: desc })
    ] }, flag)) })
  ] });
}
export {
  CliPage as component
};
