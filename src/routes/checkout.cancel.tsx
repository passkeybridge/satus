/**
 * /checkout/cancel—neutral exit when a buyer abandons the form.
 *
 * Embedded Checkout doesn't redirect on cancel the way the redirect-based
 * flow does (the buyer just stays on the page and closes it). This route
 * exists so we can link to it explicitly from any "back out" affordance
 * and so external surfaces (support replies, email links) have a stable
 * URL to point to.
 */

import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://satus.sh";

export const Route = createFileRoute("/checkout/cancel")({
  component: CheckoutCancelPage,
  head: () => ({
    meta: [
      { title: "Checkout canceled—satus.sh" },
      { name: "description", content: "No charge was made. You can restart checkout anytime." },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/checkout/cancel" }],
  }),
});

function CheckoutCancelPage() {
  return (
    <main className="satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]">
      <div className="mx-auto w-full max-w-[640px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§--</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Checkout canceled</span>
        </div>
        <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
          no charge was made.
        </h1>
        <hr className="mt-6" />
        <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80">
          You closed checkout before completing payment. The Free tier is the
          full CLI under MIT, with community profiles and no time limit. If
          Pro doesn&rsquo;t earn its $19 a month, staying on Free is the
          honest answer.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/pricing"
            className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]"
          >
            back to pricing
          </Link>
          <Link
            to="/"
            className="inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            go home
          </Link>
        </div>
      </div>
    </main>
  );
}
