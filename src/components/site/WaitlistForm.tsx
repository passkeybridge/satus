/**
 * WaitlistForm — institutional intake control for the Pricing page.
 *
 * No modal, no toast library, no animation: a plain form rendered inline,
 * with hairline borders and monospace labels that match the rest of the
 * site. Posts to /api/public/waitlist and returns a terse status line.
 *
 * Accessibility: every input has a visible label, the status region uses
 * aria-live so screen readers announce the outcome, and the submit button
 * stays in DOM (disabled) during flight so focus order doesn't shift.
 */

import { useState, type FormEvent } from "react";

type Tier = "pro" | "team";
type Status = "idle" | "submitting" | "ok" | "dup" | "error" | "rate_limited";

export function WaitlistForm({ defaultTier = "pro" }: { defaultTier?: Tier }) {
  const [tier, setTier] = useState<Tier>(defaultTier);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/public/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          tier,
          note: note.trim() || undefined,
          source: "pricing",
        }),
      });

      if (res.status === 429) return setStatus("rate_limited");
      if (!res.ok) return setStatus("error");

      // The route is idempotent on (email, tier); treat 200 as success.
      setStatus("ok");
      setEmail("");
      setNote("");
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 max-w-[640px] border border-[var(--hairline)] bg-white/40 p-6"
      noValidate
    >
      <fieldset className="space-y-5" disabled={submitting}>
        <div>
          <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
            Tier
          </legend>
          <div className="mt-2 flex gap-0 border border-[var(--ink)]">
            {(["pro", "team"] as const).map((t) => {
              const active = tier === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  aria-pressed={active}
                  className={`flex-1 py-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "bg-transparent text-[var(--ink)] hover:bg-[var(--ink)]/5"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="waitlist-email"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]"
          >
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-2 block w-full border border-[var(--ink)] bg-transparent px-3 py-2 font-mono text-[14px] text-[var(--ink)] placeholder:text-[var(--mute)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="waitlist-note"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]"
          >
            Note <span className="lowercase tracking-normal">(optional, 500 chars)</span>
          </label>
          <textarea
            id="waitlist-note"
            rows={3}
            maxLength={500}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What schema are you generating data for?"
            className="mt-2 block w-full resize-y border border-[var(--ink)] bg-transparent px-3 py-2 font-sans text-[14px] leading-[1.5] text-[var(--ink)] placeholder:text-[var(--mute)] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            className="inline-flex h-10 items-center bg-[var(--ink)] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] disabled:opacity-60"
          >
            {submitting ? "submitting…" : "join waitlist"}
          </button>
          <p className="font-mono text-[11px] text-[var(--mute)]">
            no marketing email · one note when the tier opens
          </p>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="min-h-[1.25rem] font-mono text-[12px]"
        >
          {status === "ok" && (
            <span className="text-[var(--ink)]">
              <span className="text-[var(--signal)]">●</span> recorded. you&rsquo;ll hear from
              us when {tier} opens.
            </span>
          )}
          {status === "rate_limited" && (
            <span className="text-[var(--signal)]">
              ● too many submissions from this network. try again in a few minutes.
            </span>
          )}
          {status === "error" && (
            <span className="text-[var(--signal)]">
              ● could not record signup. please retry or email hello@satus.sh.
            </span>
          )}
        </p>
      </fieldset>
    </form>
  );
}
