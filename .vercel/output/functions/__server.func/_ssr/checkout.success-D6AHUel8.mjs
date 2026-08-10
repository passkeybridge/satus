import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as Route$e } from "./router-B2kWt1Bm.mjs";
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
function CheckoutSuccessPage() {
  const {
    session_id: sessionId
  } = Route$e.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§OK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment received" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]", children: "thank you. the subscription is active." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80", children: [
      "Stripe has confirmed the charge. Your license key is on its way to the email you entered at checkout, sent from",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "noreply@notify.satus.sh" }),
      ". If it hasn't arrived in a few minutes, check spam, then email",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "text-[var(--signal)] underline hover:opacity-80", children: "support@satus.sh" }),
      " ",
      "and we'll re-send it. To change payment method or cancel, the same address routes to the Stripe billing portal."
    ] }),
    sessionId && /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-8 max-w-[60ch] border-y border-[var(--hairline)] py-4 font-mono text-[12px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3 text-[var(--mute)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "reference" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate text-[var(--ink)]", children: sessionId })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quickstart", className: "inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]", children: "read the quickstart" }) })
  ] }) });
}
export {
  CheckoutSuccessPage as component
};
