/**
 * Embedded Stripe checkout. Renders inline (no redirect) and posts back to
 * the configured returnUrl with `?session_id=…` once payment completes.
 */

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useMemo } from "react";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createCheckoutSession } from "@/lib/payments.functions";

interface Props {
  priceId: string;
  quantity?: number;
  returnUrl: string;
}

export function StripeEmbeddedCheckout({ priceId, quantity, returnUrl }: Props) {
  // Memoize so EmbeddedCheckoutProvider doesn't remount on every render
  // (which would throw "cannot change client secret after creation").
  const options = useMemo(
    () => ({
      fetchClientSecret: async (): Promise<string> => {
        const secret = await createCheckoutSession({
          data: {
            priceId,
            quantity,
            returnUrl,
            environment: getStripeEnvironment(),
          },
        });
        if (!secret) throw new Error("No client secret returned");
        return secret;
      },
    }),
    [priceId, quantity, returnUrl],
  );

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
