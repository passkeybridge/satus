/**
 * Shared Stripe client (server-only).
 *
 * Every server-side Stripe call MUST go through `createStripeClient(env)`.
 * `STRIPE_SANDBOX_SECRET_KEY` / `STRIPE_LIVE_SECRET_KEY` are real Stripe
 * secret keys (`sk_test_...` / `sk_live_...`) for the PasskeyBridge LLC
 * account—calls go directly to `api.stripe.com`, no gateway in between.
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

export function getStripeSecretKey(env: StripeEnv): string {
  return env === "sandbox"
    ? getEnv("STRIPE_SANDBOX_SECRET_KEY")
    : getEnv("STRIPE_LIVE_SECRET_KEY");
}

export function createStripeClient(env: StripeEnv): Stripe {
  // Fetch-based http client so the same code runs on Node lambdas and
  // workers-style runtimes alike.
  return new Stripe(getStripeSecretKey(env), {
    apiVersion: "2026-03-25.dahlia",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

/**
 * Verify a Stripe webhook signature (HMAC-SHA256 over `t.body`).
 * SDK-free so it doesn't need the gateway proxy.
 *
 * The return type is an assertion, not a validation: we parse the body and
 * declare it a `Stripe.Event`. What earns the assertion is the HMAC check
 * immediately above the parse—a body that reaches the `return` was signed
 * with our endpoint secret, so its shape is whatever Stripe sent. Callers
 * still get real narrowing, because `Stripe.Event` is a union discriminated
 * on `type`. Note that Stripe renders `data` at the API version pinned to
 * the *endpoint*, which need not be the version this client is pinned to.
 */
export async function verifyWebhook(req: Request, env: StripeEnv): Promise<Stripe.Event> {
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
