import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as TopBar, F as Footer } from "./chrome-Dtk_UEXJ.mjs";
import { R as Route$y } from "./router-B2kWt1Bm.mjs";
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
function UnsubscribePage() {
  const {
    token
  } = Route$y.useSearch();
  const [state, setState] = reactExports.useState("checking");
  reactExports.useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    void fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`).then(async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok) return setState("invalid");
      if (body.valid === true) return setState("ready");
      if (body.reason === "already_unsubscribed") return setState("already");
      return setState("invalid");
    }).catch(() => setState("invalid"));
  }, [token]);
  async function confirm() {
    if (!token) return;
    setState("submitting");
    const r = await fetch("/email/unsubscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    });
    const body = await r.json().catch(() => ({}));
    if (r.ok && body.success) return setState("done");
    if (body.reason === "already_unsubscribed") return setState("already");
    setState("invalid");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-[640px] px-6 py-16 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§MAIL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unsubscribe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]", children: state === "done" ? "unsubscribed." : state === "already" ? "already unsubscribed." : state === "invalid" ? "invalid link." : "confirm unsubscribe." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80", children: [
        state === "checking" && "Validating link…",
        state === "ready" && "Click below to stop receiving emails from satus.sh. Transactional emails for account changes will still reach you while a subscription is active.",
        state === "submitting" && "Processing…",
        state === "done" && "Your email address has been added to our suppression list. You will not receive further mail from satus.sh.",
        state === "already" && "This address was previously unsubscribed. Nothing to do.",
        state === "invalid" && "This link is not valid or has expired. If you keep receiving unwanted mail, contact support@satus.sh."
      ] }),
      state === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: confirm, className: "inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]", children: "confirm unsubscribe" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 font-mono text-[12px] text-[var(--mute)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-[var(--ink)] underline hover:text-[var(--signal)]", children: "← back to satus.sh" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  UnsubscribePage as component
};
