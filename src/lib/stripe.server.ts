/**
 * Shared Stripe client (server-only).
 *
 * Every server-side Stripe call MUST go through `createStripeClient(env)`.
 * The `STRIPE_SANDBOX_API_KEY` / `STRIPE_LIVE_API_KEY` env vars are NOT real
 * Stripe secret keys — they are connector-gateway identifiers. The custom
 * `httpClient` below rewrites `https://api.stripe.com` to the Lovable
 * connector gateway, which attaches the real Stripe secret server-side.
 *
 * API version pinned to `2026-03-25.dahlia` so request/response shapes don't
 * silently shift if the SDK bumps its default.
 */

import Stripe from "stripe";

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};

export type StripeEnv = "sandbox" | "live";

const GATEWAY_STRIPE_BASE = "https://connector-gateway.lovable.dev/stripe";

export function getConnectionApiKey(env: StripeEnv): string {
  return env === "sandbox"
    ? getEnv("STRIPE_SANDBOX_API_KEY")
    : getEnv("STRIPE_LIVE_API_KEY");
}

export function createStripeClient(env: StripeEnv): Stripe {
  const connectionApiKey = getConnectionApiKey(env);
  const lovableApiKey = getEnv("LOVABLE_API_KEY");

  return new Stripe(connectionApiKey, {
    apiVersion: "2026-03-25.dahlia",
    httpClient: Stripe.createFetchHttpClient((url: string | URL, init?: RequestInit) => {
      const gatewayUrl = url
        .toString()
        .replace("https://api.stripe.com", GATEWAY_STRIPE_BASE);
      return fetch(gatewayUrl, {
        ...init,
        headers: {
          ...Object.fromEntries(new Headers(init?.headers).entries()),
          "X-Connection-Api-Key": connectionApiKey,
          "Lovable-API-Key": lovableApiKey,
        },
      });
    }),
  });
}
