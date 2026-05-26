/**
 * Renders a hairline banner when the payments client token is in test mode.
 * Returns null in production (live token) so it's safe to mount globally.
 */

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;

  return (
    <div
      role="status"
      className="w-full border-b border-[var(--signal)]/40 bg-[var(--signal)]/5 px-6 py-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]"
    >
      <span className="text-[var(--signal)]">●</span>
      <span className="ml-2">test mode</span>
      <span className="mx-3 text-[var(--hairline)]">|</span>
      <span className="normal-case tracking-normal text-[var(--mute)]">
        no real charges. card 4242 4242 4242 4242, any future expiry, any CVC.
      </span>
    </div>
  );
}
