/**
 * Stripe.js client-side loader.
 *
 * Reads VITE_PAYMENTS_CLIENT_TOKEN from Vite-injected env. Token prefix
 * (`pk_test_` vs `pk_live_`) determines which environment we're in; the
 * value is passed to server functions so they pick the right gateway key.
 */

import { loadStripe, type Stripe } from "@stripe/stripe-js";

// Duplicated locally so this client-safe module has no cross-tree imports
// into stripe.server.ts. Values are structurally identical.
export type StripeEnv = "sandbox" | "live";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
const environment: StripeEnv = clientToken?.startsWith("pk_test_") ? "sandbox" : "live";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    if (!clientToken) {
      throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
    }
    stripePromise = loadStripe(clientToken);
  }
  return stripePromise;
}

export function getStripeEnvironment(): StripeEnv {
  return environment;
}
