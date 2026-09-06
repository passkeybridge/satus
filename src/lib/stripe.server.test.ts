/**
 * Tests for `verifyWebhook`.
 *
 * This is the authentication boundary for license issuance: everything the
 * payments webhook does downstream — issuing a key, revoking one, emailing a
 * customer — happens only because this function said the body was signed by
 * Stripe. It also now decides *which* Stripe environment sent the event,
 * which used to be read from a query parameter that a dashboard URL could
 * get wrong, and twice did.
 *
 * The secrets here are fixtures. Nothing talks to Stripe.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { verifyWebhook } from "./stripe.server";

const LIVE = "whsec_live_fixture_aaaaaaaaaaaaaaaaaaaa";
const SANDBOX = "whsec_sandbox_fixture_bbbbbbbbbbbbbbbb";

const URL_BASE = "https://satus.sh/api/public/payments/webhook";

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

async function sign(secret: string, body: string, ts: number): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${ts}.${body}`),
  );
  return Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function eventBody(livemode: boolean, id = "evt_fixture"): string {
  return JSON.stringify({
    id,
    object: "event",
    type: "checkout.session.completed",
    livemode,
    data: { object: { id: "cs_fixture", mode: "subscription" } },
  });
}

function post(body: string, signature: string | null, query = ""): Request {
  const headers = new Headers();
  if (signature !== null) headers.set("stripe-signature", signature);
  return new Request(`${URL_BASE}${query}`, { method: "POST", body, headers });
}

/** A correctly signed delivery from `secret`. */
async function delivery(secret: string, livemode: boolean, query = "") {
  const ts = nowSeconds();
  const body = eventBody(livemode);
  return post(body, `t=${ts},v1=${await sign(secret, body, ts)}`, query);
}

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env.PAYMENTS_LIVE_WEBHOOK_SECRET = LIVE;
  process.env.PAYMENTS_SANDBOX_WEBHOOK_SECRET = SANDBOX;
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("verifyWebhook — the signature decides the environment", () => {
  it("resolves live from the live secret with no ?env= at all", async () => {
    const { env, event } = await verifyWebhook(await delivery(LIVE, true));
    expect(env).toBe("live");
    expect(event.id).toBe("evt_fixture");
  });

  it("resolves sandbox from the sandbox secret with no ?env= at all", async () => {
    const { env } = await verifyWebhook(await delivery(SANDBOX, false));
    expect(env).toBe("sandbox");
  });

  // The August and September 2026 incidents in one test: the endpoint URL
  // said one thing (or nothing) and the signing secret said another. The
  // secret wins, so no delivery is lost.
  it("ignores a hint that contradicts the secret", async () => {
    const asSandbox = await verifyWebhook(await delivery(SANDBOX, false), "live");
    expect(asSandbox.env).toBe("sandbox");

    const asLive = await verifyWebhook(await delivery(LIVE, true), "sandbox");
    expect(asLive.env).toBe("live");
  });

  it("accepts a correct hint and still returns the verified environment", async () => {
    expect((await verifyWebhook(await delivery(LIVE, true), "live")).env).toBe("live");
    expect((await verifyWebhook(await delivery(SANDBOX, false), "sandbox")).env).toBe(
      "sandbox",
    );
  });

  it("tries the remaining environment when one has no configured secret", async () => {
    delete process.env.PAYMENTS_SANDBOX_WEBHOOK_SECRET;
    const { env } = await verifyWebhook(await delivery(LIVE, true), "sandbox");
    expect(env).toBe("live");
  });
});

describe("verifyWebhook — rejection", () => {
  it("rejects a signature from a secret we do not hold", async () => {
    const ts = nowSeconds();
    const body = eventBody(true);
    const forged = await sign("whsec_not_ours", body, ts);
    await expect(
      verifyWebhook(post(body, `t=${ts},v1=${forged}`)),
    ).rejects.toThrow(/Invalid webhook signature/);
  });

  it("rejects a body tampered with after signing", async () => {
    const ts = nowSeconds();
    const body = eventBody(true);
    const signature = await sign(LIVE, body, ts);
    const tampered = eventBody(true, "evt_swapped");
    await expect(
      verifyWebhook(post(tampered, `t=${ts},v1=${signature}`)),
    ).rejects.toThrow(/Invalid webhook signature/);
  });

  it("rejects a missing signature header", async () => {
    await expect(verifyWebhook(post(eventBody(true), null))).rejects.toThrow(
      /Missing signature or body/,
    );
  });

  it("rejects an empty body", async () => {
    await expect(verifyWebhook(post("", "t=1,v1=abc"))).rejects.toThrow(
      /Missing signature or body/,
    );
  });

  it("rejects a malformed signature header", async () => {
    await expect(verifyWebhook(post(eventBody(true), "garbage"))).rejects.toThrow(
      /Invalid signature format/,
    );
  });

  // Replay window. 300s is the tolerance; both sides of it are pinned so a
  // future edit to the constant fails loudly.
  it("rejects a timestamp older than the tolerance", async () => {
    const ts = nowSeconds() - 301;
    const body = eventBody(true);
    await expect(
      verifyWebhook(post(body, `t=${ts},v1=${await sign(LIVE, body, ts)}`)),
    ).rejects.toThrow(/timestamp too old/);
  });

  it("accepts a timestamp inside the tolerance", async () => {
    const ts = nowSeconds() - 299;
    const body = eventBody(true);
    const { env } = await verifyWebhook(
      post(body, `t=${ts},v1=${await sign(LIVE, body, ts)}`),
    );
    expect(env).toBe("live");
  });

  it("distinguishes 'no secret configured' from 'bad signature'", async () => {
    delete process.env.PAYMENTS_LIVE_WEBHOOK_SECRET;
    delete process.env.PAYMENTS_SANDBOX_WEBHOOK_SECRET;
    await expect(verifyWebhook(await delivery(LIVE, true))).rejects.toThrow(
      /No Stripe webhook signing secret is configured/,
    );
  });
});

describe("verifyWebhook — signature header shapes", () => {
  // Stripe sends several `v1` entries while an endpoint secret is being
  // rotated. Any one of them matching is enough.
  it("accepts a header carrying several v1 entries", async () => {
    const ts = nowSeconds();
    const body = eventBody(false);
    const real = await sign(SANDBOX, body, ts);
    const { env } = await verifyWebhook(
      post(body, `t=${ts},v1=0000deadbeef,v1=${real}`),
    );
    expect(env).toBe("sandbox");
  });

  it("ignores unknown scheme entries alongside v1", async () => {
    const ts = nowSeconds();
    const body = eventBody(true);
    const real = await sign(LIVE, body, ts);
    const { env } = await verifyWebhook(
      post(body, `t=${ts},v0=ignored,v1=${real}`),
    );
    expect(env).toBe("live");
  });
});
