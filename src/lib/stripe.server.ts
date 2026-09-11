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

const WEBHOOK_SECRET_VAR: Record<StripeEnv, string> = {
  sandbox: "PAYMENTS_SANDBOX_WEBHOOK_SECRET",
  live: "PAYMENTS_LIVE_WEBHOOK_SECRET",
};

export function getStripeSecretKey(env: StripeEnv): string {
  return env === "sandbox" ? getEnv("STRIPE_SANDBOX_SECRET_KEY") : getEnv("STRIPE_LIVE_SECRET_KEY");
}

export function createStripeClient(env: StripeEnv): Stripe {
  // Fetch-based http client so the same code runs on Node lambdas and
  // workers-style runtimes alike.
  return new Stripe(getStripeSecretKey(env), {
    apiVersion: "2026-03-25.dahlia",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Hex HMAC-SHA256 of `signedPayload` under `secret`. */
async function hmacHex(secret: string, signedPayload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  return Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Every environment, the hinted one tried first. */
function candidateEnvs(hint?: StripeEnv | null): StripeEnv[] {
  const all: StripeEnv[] = ["live", "sandbox"];
  return hint ? [hint, ...all.filter((e) => e !== hint)] : all;
}

export type VerifiedWebhook = { event: Stripe.Event; env: StripeEnv };

/**
 * Verify a Stripe webhook signature (HMAC-SHA256 over `t.body`) and, in the
 * same step, work out which Stripe environment sent it.
 * SDK-free so it doesn't need the gateway proxy.
 *
 * **The signature is what identifies the environment.** Sandbox and live
 * have different endpoint signing secrets, so exactly one of them can
 * validate a given body; whichever does is the environment the event came
 * from, and nothing configured in a dashboard can contradict it. `hint` (the
 * caller's `?env=` query parameter) only decides which secret to try first.
 *
 * This used to take a required `env` and trust it. That made a query
 * parameter load-bearing for a payments path, and it failed twice: the live
 * endpoint was registered without it and dropped 21 days of events in August
 * 2026, then the test-mode endpoint did the same in September. Both are
 * unreachable now — a correctly signed event is processed whatever the URL
 * says.
 *
 * The return type is an assertion, not a validation: we parse the body and
 * declare it a `Stripe.Event`. What earns the assertion is the HMAC check
 * above the parse—a body that reaches the `return` was signed with one of
 * our endpoint secrets, so its shape is whatever Stripe sent. Callers still
 * get real narrowing, because `Stripe.Event` is a union discriminated on
 * `type`. Note that Stripe renders `data` at the API version pinned to the
 * *endpoint*, which need not be the version this client is pinned to.
 */
export async function verifyWebhook(
  req: Request,
  hint?: StripeEnv | null,
): Promise<VerifiedWebhook> {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

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

  const signedPayload = `${timestamp}.${body}`;
  let secretsTried = 0;

  for (const env of candidateEnvs(hint)) {
    const secret = process.env[WEBHOOK_SECRET_VAR[env]];
    // An environment with no configured secret is skipped rather than
    // fatal—one may legitimately be unconfigured in a given deployment.
    if (!secret) continue;
    secretsTried += 1;
    const expected = await hmacHex(secret, signedPayload);
    if (v1Signatures.some((sig) => constantTimeEqual(sig, expected))) {
      return { event: JSON.parse(body), env };
    }
  }

  if (secretsTried === 0) {
    throw new Error("No Stripe webhook signing secret is configured");
  }
  throw new Error("Invalid webhook signature");
}
