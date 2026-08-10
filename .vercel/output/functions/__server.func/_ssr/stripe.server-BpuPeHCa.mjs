import { S as Stripe } from "../_libs/stripe.mjs";
const getEnv = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};
function getStripeSecretKey(env) {
  return env === "sandbox" ? getEnv("STRIPE_SANDBOX_SECRET_KEY") : getEnv("STRIPE_LIVE_SECRET_KEY");
}
function createStripeClient(env) {
  return new Stripe(getStripeSecretKey(env), {
    apiVersion: "2026-03-25.dahlia",
    httpClient: Stripe.createFetchHttpClient()
  });
}
async function verifyWebhook(req, env) {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const secret = env === "sandbox" ? getEnv("PAYMENTS_SANDBOX_WEBHOOK_SECRET") : getEnv("PAYMENTS_LIVE_WEBHOOK_SECRET");
  if (!signature || !body) throw new Error("Missing signature or body");
  let timestamp;
  const v1Signatures = [];
  for (const part of signature.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k === "t") timestamp = v;
    if (k === "v1") v1Signatures.push(v);
  }
  if (!timestamp || v1Signatures.length === 0) {
    throw new Error("Invalid signature format");
  }
  const age = Math.abs(Date.now() / 1e3 - Number(timestamp));
  if (age > 300) throw new Error("Webhook timestamp too old");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${body}`)
  );
  const expected = Array.from(new Uint8Array(signed)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (!v1Signatures.includes(expected)) {
    throw new Error("Invalid webhook signature");
  }
  return JSON.parse(body);
}
export {
  createStripeClient as c,
  verifyWebhook as v
};
