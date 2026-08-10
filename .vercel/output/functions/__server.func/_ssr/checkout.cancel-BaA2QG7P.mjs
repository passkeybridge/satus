import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
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
function CheckoutCancelPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§--" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Checkout canceled" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]", children: "no charge was made." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80", children: "You closed checkout before completing payment. The Free tier is the same CLI binary, capped at 25 rows per table across 5 tables, with all three built-in profiles and no time limit. If Pro doesn’t earn its $19 a month, staying on Free is the honest answer." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]", children: "back to pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]", children: "go home" })
    ] })
  ] }) });
}
export {
  CheckoutCancelPage as component
};
