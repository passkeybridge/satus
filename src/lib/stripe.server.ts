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
    httpClient: Stripe.createFetchHttpClient((url: URL | RequestInfo, init?: RequestInit) => {
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

/**
 * Verify a Stripe webhook signature (HMAC-SHA256 over `t.body`).
 * SDK-free so it doesn't need the gateway proxy.
 */
export async function verifyWebhook(
  req: Request,
  env: StripeEnv,
): Promise<{ type: string; data: { object: any } }> {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const secret =
    env === "sandbox"
      ? getEnv("PAYMENTS_SANDBOX_WEBHOOK_SECRET")
      : getEnv("PAYMENTS_LIVE_WEBHOOK_SECRET");

  if (!signature || !body) throw new Error("Missing signature or body");

  let timestamp: string | undefined;
  const v1Signatures: string[] = [];
  for (const part of signature.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k === "t") timestamp = v;
    if (k === "v1") v1Signatures.push(v);
  }
  if (!timestamp || v1Signatures.length === 0) {
    throw new Error("Invalid signature format");
  }

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) throw new Error("Webhook timestamp too old");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${body}`),
  );
  const expected = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (!v1Signatures.includes(expected)) {
    throw new Error("Invalid webhook signature");
  }
  return JSON.parse(body);
}
