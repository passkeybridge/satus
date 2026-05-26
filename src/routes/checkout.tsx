/**
 * /checkout — Embedded Stripe checkout, opened from the pricing table.
 *
 * Reads `?price=<lookup_key>&qty=<n>` from the URL. The server function
 * whitelist is the source of truth on which prices are valid; this route
 * just hands the value through and the server rejects anything unknown.
 *
 * Returns the buyer to /checkout/success?session_id=… on completion.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { StripeEmbeddedCheckout } from "@/components/site/StripeEmbeddedCheckout";
import { PageShell as _PageShell } from "@/components/site/chrome";

const SITE_URL = "https://satus.sh";

// Display catalog mirrors the server whitelist. Kept here purely for the
// page header — the server is what actually authorises a price.
const TIER_LABELS: Record<string, { name: string; price: string }> = {
  satus_pro_monthly: { name: "satus.sh — Pro", price: "$19 / month" },
  satus_pro_yearly: { name: "satus.sh — Pro (annual)", price: "$190 / year" },
  satus_team_seat_monthly: { name: "satus.sh — Team", price: "$49 / seat / month" },
};

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { price?: string; qty?: number } => ({
    price: typeof search.price === "string" ? search.price : undefined,
    qty: typeof search.qty === "number" && Number.isFinite(search.qty) ? search.qty : undefined,
  }),
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — satus.sh" },
      { name: "description", content: "Complete your satus.sh purchase." },
      // Checkout is a transactional surface, not an SEO target.
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/checkout" }],
  }),
});

function CheckoutPage() {
  const { price, qty } = Route.useSearch();
  const tier = price ? TIER_LABELS[price] : undefined;

  // No price, or a price not in our display catalog — render a graceful
  // bounce-back rather than mount an empty checkout form. The server
  // whitelist would reject it anyway; this saves a round trip.
  if (!price || !tier) {
    return (
      <main className="satus-fade min-h-dvh bg-[var(--paper)] px-6 py-16 text-[var(--ink)]">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
            <span className="text-[var(--signal)]">§07</span>
            <span className="mx-3 text-[var(--hairline)]">|</span>
            <span>Checkout</span>
          </div>
          <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
            choose a tier first.
          </h1>
          <hr className="mt-6" />
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80">
            Checkout opens from the pricing table. Pick the tier and cadence
            you want there and we&rsquo;ll bring you back here with the right
            line item.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]"
            >
              view pricing
            </Link>
            <a
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              github ↗
            </a>
          </div>
        </div>
      </main>
    );
  }

  const returnUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
      : `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;

  return (
    <main className="satus-fade min-h-dvh bg-[var(--paper)] px-6 py-12 text-[var(--ink)] md:py-16">
      <div className="mx-auto w-full max-w-[820px]">
        {/* Mono header matches the site's section anatomy so checkout
         *  doesn't feel like a different application. */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] pb-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
            <span className="text-[var(--signal)]">§07</span>
            <span className="mx-3 text-[var(--hairline)]">|</span>
            <span>Checkout</span>
          </div>
          <Link
            to="/pricing"
            className="font-mono text-[12px] text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
          >
            ← back to pricing
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-mono text-[22px] font-medium tracking-tight md:text-[26px]">
            {tier.name}
          </h1>
          <span className="font-mono text-[13px] text-[var(--mute)]">
            {tier.price}
            {qty && qty > 1 ? ` × ${qty}` : ""}
          </span>
        </div>

        <div className="mt-8">
          <StripeEmbeddedCheckout
            priceId={price}
            quantity={qty}
            returnUrl={returnUrl}
          />
        </div>

        <p className="mt-8 max-w-[60ch] font-mono text-[11px] text-[var(--mute)]">
          billed by PasskeyBridge LLC. cancel any time, refunds pro-rated.
          card data never touches our servers.
        </p>
      </div>
    </main>
  );
}
