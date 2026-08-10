import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as Route$k, e as SITE_URL$8 } from "./router-B2kWt1Bm.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { E as EmbeddedCheckoutProvider, a as EmbeddedCheckout } from "../_libs/stripe__react-stripe-js.mjs";
import "../_libs/stripe__stripe-js.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-D9ZoR0hI.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/prop-types.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const environment = "live";
function getStripe() {
  {
    {
      throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
    }
  }
}
function getStripeEnvironment() {
  return environment;
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ALLOWED_PRICE_IDS = /* @__PURE__ */ new Set(["satus_pro_monthly", "satus_pro_yearly", "satus_team_seat_monthly"]);
const createCheckoutSession = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) {
    throw new Error("Invalid priceId");
  }
  if (!ALLOWED_PRICE_IDS.has(data.priceId)) {
    throw new Error("Unknown priceId");
  }
  if (data.environment !== "sandbox" && data.environment !== "live") {
    throw new Error("Invalid environment");
  }
  if (typeof data.returnUrl !== "string" || data.returnUrl.length > 2048) {
    throw new Error("Invalid returnUrl");
  }
  const qty = data.quantity ?? 1;
  if (!Number.isInteger(qty) || qty < 1 || qty > 100) {
    throw new Error("Invalid quantity");
  }
  return {
    ...data,
    quantity: qty
  };
}).handler(createSsrRpc("66545541b4f603513f22269c2e805052b8ffd80d88e6e5213e9879ef24190623"));
function StripeEmbeddedCheckout({ priceId, quantity, returnUrl }) {
  const options = reactExports.useMemo(
    () => ({
      fetchClientSecret: async () => {
        const secret = await createCheckoutSession({
          data: {
            priceId,
            quantity,
            returnUrl,
            environment: getStripeEnvironment()
          }
        });
        if (!secret) throw new Error("No client secret returned");
        return secret;
      }
    }),
    [priceId, quantity, returnUrl]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckoutProvider, { stripe: getStripe(), options, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckout, {}) }) });
}
const TIER_LABELS = {
  satus_pro_monthly: {
    name: "satus.sh—Pro",
    price: "$19 / month"
  },
  satus_pro_yearly: {
    name: "satus.sh—Pro (annual)",
    price: "$190 / year"
  },
  satus_team_seat_monthly: {
    name: "satus.sh—Team",
    price: "$49 / seat / month"
  }
};
function CheckoutPage() {
  const {
    price,
    qty
  } = Route$k.useSearch();
  const tier = price ? TIER_LABELS[price] : void 0;
  if (!price || !tier) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "satus-fade min-h-dvh bg-[var(--paper)] px-6 py-16 text-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[640px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§07" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Checkout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]", children: "choose a tier first." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80", children: "Checkout opens from the pricing table. Pick the tier and cadence you want there and we’ll bring you back here with the right line item." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]", children: "view pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quickstart", className: "inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]", children: "quickstart" })
      ] })
    ] }) });
  }
  const returnUrl = typeof window !== "undefined" ? `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}` : `${SITE_URL$8}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "satus-fade min-h-dvh bg-[var(--paper)] px-6 py-12 text-[var(--ink)] md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[820px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-b border-[var(--hairline)] pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§07" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Checkout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "font-mono text-[12px] text-[var(--mute)] transition-colors hover:text-[var(--ink)]", children: "← back to pricing" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-[22px] font-medium tracking-tight md:text-[26px]", children: tier.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[13px] text-[var(--mute)]", children: [
        tier.price,
        qty && qty > 1 ? ` × ${qty}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StripeEmbeddedCheckout, { priceId: price, quantity: qty, returnUrl }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-[60ch] font-mono text-[11px] text-[var(--mute)]", children: "billed by PasskeyBridge LLC. cancel any time, refunds pro-rated. card data never touches our servers." })
  ] }) });
}
export {
  CheckoutPage as component
};
