/**
 * Server functions for Stripe Embedded Checkout.
 *
 * satus.sh is a marketing site with no auth (today). Customers identify
 * themselves with the email they enter in Stripe's hosted checkout form;
 * Stripe creates the Customer implicitly and we receive the email on the
 * resulting Session. License delivery via Resend will be wired in a later
 * pass—that's an honest sequence, not a placeholder.
 *
 * Tax handling: full compliance handling enabled (`managed_payments`).
 * PasskeyBridge LLC is US-based, and Pro/Team are pure SaaS, both eligible.
 */

import { createServerFn } from "@tanstack/react-start";
import { createStripeClient, type StripeEnv } from "@/lib/stripe.server";

// Whitelist of price IDs we ship to customers. The server refuses anything
// else so a crafted ?price=... query string can't open checkout for an
// arbitrary Stripe price in the account.
const ALLOWED_PRICE_IDS = new Set<string>([
  "satus_pro_monthly",
  "satus_pro_yearly",
  "satus_team_seat_monthly",
  // Temporary $0.50 SKU used to validate the live pipeline end-to-end.
  // Remove after the smoke test + refund are confirmed.
  "satus_live_smoke_test",
]);

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      priceId: string;
      quantity?: number;
      returnUrl: string;
      environment: StripeEnv;
    }) => {
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
      return { ...data, quantity: qty };
    },
  )
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    // Resolve the human-readable priceId (`lookup_key`) to Stripe's
    // internal price id. Stable across sandbox and live.
    const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];
    const isRecurring = stripePrice.type === "recurring";

    // `managed_params` is the full-compliance handling toggle. The Stripe
    // SDK types in 22.0.2 don't yet include it (the API supports it), so
    // we widen the params object once at the call site.
    const params = {
      line_items: [{ price: stripePrice.id, quantity: data.quantity }],
      mode: isRecurring ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      // Full compliance handling: Stripe calculates/collects/files/remits
      // tax for buyers in ~80 supported countries; falls back to calc-only
      // elsewhere. +3.5%/txn, accepted per the build-time decision.
      managed_payments: { enabled: true },
      metadata: {
        source: "satus.sh",
        price_id: data.priceId,
      },
      ...(isRecurring && {
        subscription_data: {
          metadata: { source: "satus.sh", price_id: data.priceId },
        },
      }),
    } as unknown as Parameters<typeof stripe.checkout.sessions.create>[0];

    const session = await stripe.checkout.sessions.create(params);
    return session.client_secret;
  });
