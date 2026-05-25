/**
 * Shared primitives for satus.ai marketing site.
 *
 * Section: numbered §xx block with label + lowercase headline, hairline rule,
 *          and content slot. Renders the page's content units consistently.
 * Prose:   body-copy container with ~62ch max measure and tuned inline-element styling.
 * Mono:    inline JetBrains Mono span used inside Prose for code-style terms.
 *
 * Kept presentational only — no routing, no state. Each route composes these.
 */

import type { ReactNode } from "react";

export type SectionMeta = { id: string; n: string; label: string };

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono ${className}`}>{children}</span>;
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[62ch] text-[15.5px] leading-[1.7] text-[var(--ink)]/85 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-[var(--ink)] [&_em]:not-italic [&_em]:text-[var(--ink)] [&_strong]:font-medium [&_strong]:text-[var(--ink)] [&_p]:mb-4 last:[&_p]:mb-0">
      {children}
    </div>
  );
}

export function Section({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-[var(--hairline)] py-16 first:border-t-0 first:pt-0"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
        <span className="text-[var(--signal)]">§{n}</span>
        <span className="mx-3 text-[var(--hairline)]">|</span>
        <span>{label}</span>
      </div>
      <h2 className="mt-5 font-mono text-[26px] font-medium leading-[1.2] tracking-tight text-[var(--ink)] md:text-[32px]">
        {title}
      </h2>
      <hr className="mt-6" />
      <div className="mt-8">{children}</div>
    </section>
  );
}
