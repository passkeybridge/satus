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
  id: "overview",
  n: "01",
  label: "Overview"
}, {
  id: "usage",
  n: "02",
  label: "Usage"
}, {
  id: "inputs",
  n: "03",
  label: "Inputs"
}, {
  id: "outputs",
  n: "04",
  label: "Outputs"
}, {
  id: "security",
  n: "05",
  label: "Security"
}, {
  id: "boundaries",
  n: "06",
  label: "What it isn't"
}];
const WORKFLOW_YAML = `name: Seed preview database
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  seed:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: passkeybridge/satus/packages/action@main
        with:
          database-url: \${{ secrets.PREVIEW_DATABASE_URL }}
          rows: 250
          profile: saas
          max-cost: '0.50'
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
`;
function CodeBlock({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "my-4 overflow-x-auto border border-[var(--ink)] bg-[var(--paper)] p-4 font-mono text-[12.5px] leading-[1.55] text-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children }) });
}
function TableRow({
  cells,
  header
}) {
  const Cell = header ? "th" : "td";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-[var(--ink)]/20", children: cells.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { className: `px-3 py-2 text-left align-top font-mono text-[12.5px] ${header ? "font-semibold text-[var(--ink)]" : "text-[var(--ink)]"}`, children: c }, i)) });
}
function GitHubActionPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/docs/github-action", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "overview", n: "01", label: "Overview", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "satus in one composite action." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "passkeybridge/satus/packages/action@main" }),
        " runs",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " inside a GitHub Actions workflow and uploads the run manifest as a workflow artifact. It is a",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://docs.github.com/en/actions/creating-actions/creating-a-composite-action", className: "underline decoration-[var(--signal)] underline-offset-4", children: "composite action" }),
        ", not a Docker container — three shell steps that install Node, call ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
          "npx @passkeybridge/satus@",
          SATUS_VERSION
        ] }),
        ", and upload the result. No container startup cost, no root filesystem writes."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The action is a wrapper. If a run works on your laptop it works here, with the same flags, the same exit codes, the same",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/docs/how-it-works", className: "underline decoration-[var(--signal)] underline-offset-4", children: "three guarantees" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "usage", n: "02", label: "Usage", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "drop it into your PR workflow." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The intended shape for a preview-database workflow:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { children: WORKFLOW_YAML }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Swap ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "OPENAI_API_KEY" }),
        " for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "ANTHROPIC_API_KEY" }),
        " ",
        "and add ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "provider: anthropic" }),
        " under ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "with:" }),
        " to drive Anthropic instead. The CLI auto-detects from whichever env key is present."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "inputs", n: "03", label: "Inputs", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "every knob, defaulted." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse border border-[var(--ink)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { header: true, cells: ["name", "required", "default", "description"] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["database-url", "yes", "—", "Postgres connection string. Pass as a secret."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["rows", "no", "50", "Rows per table. Free tier caps at 25."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["profile", "no", "saas", "Reference profile: saas | ecommerce | b2b."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["provider", "no", "auto", "openai | anthropic. Auto-detected from env."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["model", "no", "provider default", "Model id override."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["max-cost", "no", "'1.00'", "USD ceiling. Quote it so YAML keeps a string."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["dry-run", "no", "false", "Validate without inserting or spending."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["working-directory", "no", ".", "Where satus.config.json lives."] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["satus-version", "no", SATUS_VERSION, "npm version to install. Pin for reproducibility."] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "outputs", n: "04", label: "Outputs", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "parsed from the JSON manifest." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "All outputs are parsed from the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--json" }),
        " payload the CLI writes to stdout. They are also uploaded verbatim as the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus-run-manifest" }),
        " workflow artifact so a downstream job can read the full record."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse border border-[var(--ink)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { header: true, cells: ["name", "description"] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["run-id", "Server-side run UUID."] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["tables-seeded", "Number of tables the run touched."] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["rows-inserted", "Total rows inserted (0 on dry-run)."] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["tokens-in", "Total input tokens across the run."] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["tokens-out", "Total output tokens across the run."] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { cells: ["spent-usd", "Actual LLM spend in USD."] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "security", n: "05", label: "Security", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "three deliberate choices." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "ml-5 list-decimal space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "database-url" }),
            " is an input, not an env var."
          ] }),
          " ",
          "GitHub redacts inputs in logs the same way it redacts env vars, but making it an input surfaces it in the Marketplace UI as a required field so a caller cannot leave it empty by accident."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "max-cost" }),
            " is a string."
          ] }),
          " YAML parses",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "0.5" }),
          " as a float and the CLI expects a string so it can normalise the format itself. Quote it in your workflow."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            "The provider key stays in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "env:" }),
            ", not ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "with:" }),
            "."
          ] }),
          " ",
          "The action never touches your provider key. That keeps it off the action's public input schema and out of anything a compromised action version could exfiltrate through inputs."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Pin the action to a full commit SHA if you want defence in depth against a compromised release tag, and pin ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus-version" }),
        " ",
        "to a specific npm version for reproducibility. Both are documented in the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions", className: "underline decoration-[var(--signal)] underline-offset-4", children: "GitHub security-hardening guide" }),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "boundaries", n: "06", label: "What it isn't", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "four things the action does not do." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No hosted-key tier." }),
          " Bring your own OpenAI or Anthropic key. A managed-key mode is on the roadmap for a later release, not this one."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No auto-commit of generated data." }),
          " The action does not open a follow-up PR with a SQL dump. Seed data belongs in the ephemeral preview database, not in git history."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No cache of previously-generated rows." }),
          " Every invocation regenerates. The correctness problem for a cache key (schema hash + profile hash + provider version) is not worth solving for a first release."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No GitLab CI, no CircleCI, no Buildkite variant." }),
          " ",
          "The CLI runs anywhere Node runs. This action is a convenience layer for GitHub, not a portability layer."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]", children: [
        "Reference for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "passkeybridge/satus/packages/action@main" }),
        ". If anything here drifts from",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/passkeybridge/satus/blob/main/packages/action/action.yml", className: "underline decoration-[var(--signal)] underline-offset-4", children: "action.yml" }),
        ", action.yml wins — file an issue."
      ] })
    ] }) })
  ] });
}
export {
  GitHubActionPage as component
};
