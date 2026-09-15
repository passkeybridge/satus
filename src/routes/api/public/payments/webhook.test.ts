/**
 * Tests for `subscriptionIdFromCharge`, the charge → subscription lookup that
 * `charge.refunded` uses to decide which license to revoke.
 *
 * Worth testing because its failure mode is silence. When the lookup returns
 * null the handler logs "no subscription" and returns 200; Stripe sees a
 * success, nothing retries, and a refunded customer keeps working access. A
 * broken lookup and a one-time charge are indistinguishable from the outside.
 *
 * The two shapes are the point. `Charge.invoice` existed before API version
 * 2025-03-31.basil and was removed by it, with nothing replacing it on the
 * charge side. This endpoint is registered with `api_version: null`, so which
 * shape arrives is decided by an account-level Dashboard setting rather than
 * by anything in this repo — which is exactly why both paths need to stay
 * covered.
 *
 * Nothing talks to Stripe. The client is a stub that records its calls.
 */

import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/stripe.server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/stripe.server")>();
  return { ...actual, createStripeClient: () => stripeStub };
});

vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));
vi.mock("@/lib/webhook-alerts.server", () => ({ notifyWebhookFailure: () => {} }));

type StubCall = { op: string; arg: unknown };

const calls: StubCall[] = [];
let invoicePaymentsResult: Array<{ invoice: unknown }> = [];
let invoiceRetrieveResult: unknown = null;

const stripeStub = {
  invoices: {
    retrieve: (id: string) => {
      calls.push({ op: "invoices.retrieve", arg: id });
      return Promise.resolve(invoiceRetrieveResult);
    },
  },
  invoicePayments: {
    list: (params: unknown) => {
      calls.push({ op: "invoicePayments.list", arg: params });
      return Promise.resolve({ data: invoicePaymentsResult });
    },
  },
};

const { subscriptionIdFromCharge } = await import("./webhook");

function reset() {
  calls.length = 0;
  invoicePaymentsResult = [];
  invoiceRetrieveResult = null;
}

/** A basil-era invoice: no top-level `subscription`, details under `parent`. */
function modernInvoice(subscriptionId: string) {
  return { parent: { subscription_details: { subscription: subscriptionId } } };
}

describe("subscriptionIdFromCharge", () => {
  it("reads the pre-basil Charge.invoice string", async () => {
    reset();
    invoiceRetrieveResult = modernInvoice("sub_pre");

    const id = await subscriptionIdFromCharge({ invoice: "in_pre" } as never, "live");

    expect(id).toBe("sub_pre");
    expect(calls).toEqual([{ op: "invoices.retrieve", arg: "in_pre" }]);
  });

  it("reads a pre-basil expanded Charge.invoice object without a round trip", async () => {
    reset();

    const id = await subscriptionIdFromCharge(
      { invoice: { subscription: "sub_expanded" } } as never,
      "live",
    );

    expect(id).toBe("sub_expanded");
    expect(calls).toEqual([]);
  });

  // The regression this file exists for. Before the invoice_payments fallback
  // this returned null and the refund revoked nothing.
  it("resolves a basil payload through invoice_payments", async () => {
    reset();
    invoicePaymentsResult = [{ invoice: "in_basil" }];
    invoiceRetrieveResult = modernInvoice("sub_basil");

    const id = await subscriptionIdFromCharge({ payment_intent: "pi_basil" } as never, "live");

    expect(id).toBe("sub_basil");
    expect(calls[0]).toEqual({
      op: "invoicePayments.list",
      arg: { payment: { type: "payment_intent", payment_intent: "pi_basil" }, limit: 1 },
    });
  });

  it("unwraps an expanded payment intent before filtering", async () => {
    reset();
    invoicePaymentsResult = [{ invoice: "in_x" }];
    invoiceRetrieveResult = modernInvoice("sub_x");

    await subscriptionIdFromCharge({ payment_intent: { id: "pi_object" } } as never, "live");

    expect(calls[0].arg).toMatchObject({ payment: { payment_intent: "pi_object" } });
  });

  it("returns null for a one-time charge with neither link", async () => {
    reset();

    expect(await subscriptionIdFromCharge({ id: "ch_1" } as never, "live")).toBeNull();
    expect(calls).toEqual([]);
  });

  it("returns null when the payment intent belongs to no invoice", async () => {
    reset();
    invoicePaymentsResult = [];

    expect(
      await subscriptionIdFromCharge({ payment_intent: "pi_none" } as never, "live"),
    ).toBeNull();
  });

  it("treats a deleted invoice as untraceable rather than reading absent fields", async () => {
    reset();
    invoicePaymentsResult = [{ invoice: { deleted: true, id: "in_gone" } }];

    expect(
      await subscriptionIdFromCharge({ payment_intent: "pi_del" } as never, "live"),
    ).toBeNull();
    expect(calls).toEqual([
      {
        op: "invoicePayments.list",
        arg: { payment: { type: "payment_intent", payment_intent: "pi_del" }, limit: 1 },
      },
    ]);
  });

  it("prefers Charge.invoice when a payload somehow carries both", async () => {
    reset();
    invoiceRetrieveResult = modernInvoice("sub_from_invoice");

    const id = await subscriptionIdFromCharge(
      { invoice: "in_both", payment_intent: "pi_both" } as never,
      "live",
    );

    expect(id).toBe("sub_from_invoice");
    expect(calls.some((c) => c.op === "invoicePayments.list")).toBe(false);
  });
});
