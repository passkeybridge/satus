import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-D9ZoR0hI.mjs";
import { c as createStripeClient } from "./stripe.server-BpuPeHCa.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/stripe.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
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
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ALLOWED_PRICE_IDS = /* @__PURE__ */ new Set(["satus_pro_monthly", "satus_pro_yearly", "satus_team_seat_monthly"]);
const createCheckoutSession_createServerFn_handler = createServerRpc({
  id: "66545541b4f603513f22269c2e805052b8ffd80d88e6e5213e9879ef24190623",
  name: "createCheckoutSession",
  filename: "src/lib/payments.functions.ts"
}, (opts) => createCheckoutSession.__executeServer(opts));
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
}).handler(createCheckoutSession_createServerFn_handler, async ({
  data
}) => {
  const stripe = createStripeClient(data.environment);
  const prices = await stripe.prices.list({
    lookup_keys: [data.priceId]
  });
  if (!prices.data.length) throw new Error("Price not found");
  const stripePrice = prices.data[0];
  const isRecurring = stripePrice.type === "recurring";
  const params = {
    line_items: [{
      price: stripePrice.id,
      quantity: data.quantity
    }],
    mode: isRecurring ? "subscription" : "payment",
    ui_mode: "embedded_page",
    return_url: data.returnUrl,
    // Full compliance handling: Stripe calculates/collects/files/remits
    // tax for buyers in ~80 supported countries; falls back to calc-only
    // elsewhere. +3.5%/txn, accepted per the build-time decision.
    managed_payments: {
      enabled: true
    },
    metadata: {
      source: "satus.sh",
      price_id: data.priceId
    },
    ...isRecurring && {
      subscription_data: {
        metadata: {
          source: "satus.sh",
          price_id: data.priceId
        }
      }
    }
  };
  const session = await stripe.checkout.sessions.create(params);
  return session.client_secret;
});
export {
  createCheckoutSession_createServerFn_handler
};
