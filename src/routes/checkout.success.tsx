/**
 * /checkout/success — return URL after a completed Embedded Checkout.
 *
 * Stripe substitutes `{CHECKOUT_SESSION_ID}` server-side, so this page
 * only needs to validate the search params and confirm success in copy.
 * License delivery (Resend) lands in a later pass; today we tell the
 * buyer that explicitly rather than imply a magic-link is on the way.
 */

import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://satus.sh";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: CheckoutSuccessPage,
  head: () => ({
    meta: [
      { title: "Payment received — satus.sh" },
      { name: "description", content: "Your satus.sh subscription is active." },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/checkout/success" }],
  }),
});

function CheckoutSuccessPage() {
  const { session_id: sessionId } = Route.useSearch();

  return (
    <main className="satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]">
      <div className="mx-auto w-full max-w-[640px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§OK</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Payment received</span>
        </div>
        <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
          thank you. the subscription is active.
        </h1>
        <hr className="mt-6" />
        <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80">
          Stripe has confirmed the charge. A receipt is on its way to the
          email you entered at checkout. License keys and install instructions
          will follow from <span className="font-mono">hello@satus.sh</span>{" "}
          within one business day while we finish wiring transactional email.
        </p>

        {sessionId && (
          <dl className="mt-8 max-w-[60ch] border-y border-[var(--hairline)] py-4 font-mono text-[12px]">
            <div className="flex items-baseline justify-between gap-3 text-[var(--mute)]">
              <dt>reference</dt>
              <dd className="truncate text-[var(--ink)]">{sessionId}</dd>
            </div>
          </dl>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/quickstart"
            className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]"
          >
            read the quickstart
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
