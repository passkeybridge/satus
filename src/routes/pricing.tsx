/**
 * Pricing route ("/pricing").
 *
 * Three tiers — Free, Pro, Team — rendered as a single monospace table with
 * a hairline-red emphasis on the Pro column. No tier cards, no badges, no
 * shadows. Bring-your-own LLM key on every tier.
 */

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.lovable.app";

const SECTIONS: ReadonlyArray<SectionMeta> = [{ id: "pricing", n: "04", label: "Pricing" }];

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "open source · MIT",
    cta: "view on github",
    href: "https://github.com",
    primary: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    cadence: "per month · or $190/yr",
    cta: "start with pro",
    href: "#",
    primary: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    cadence: "per seat · later",
    cta: "join waitlist",
    href: "#",
    primary: false,
  },
];

type Cell = string | { mark: true } | null;
const FEATURES: { label: string; row: [Cell, Cell, Cell] }[] = [
  { label: "CLI core",                       row: [{ mark: true }, { mark: true }, { mark: true }] },
  { label: "Bring-your-own LLM key",         row: [{ mark: true }, { mark: true }, { mark: true }] },
  { label: "Community profiles",             row: [{ mark: true }, { mark: true }, { mark: true }] },
  { label: "Three official profiles",        row: [null,            { mark: true }, { mark: true }] },
  { label: "Hosted profile updates",         row: [null,            { mark: true }, { mark: true }] },
  { label: "License, 14-day offline grace",  row: [null,            { mark: true }, { mark: true }] },
  { label: "Priority issue triage",          row: [null,            { mark: true }, { mark: true }] },
  { label: "Shared team profiles",           row: [null,            null,            { mark: true }] },
  { label: "CI mode",                        row: [null,            null,            { mark: true }] },
  { label: "Audit log",                      row: [null,            null,            { mark: true }] },
  { label: "Invoiced billing",               row: [null,            null,            { mark: true }] },
];

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — satus" },
      {
        name: "description",
        content:
          "satus pricing: Free (MIT open source), Pro at $19/mo, Team at $49/seat. Bring-your-own LLM key on every tier. We don't resell tokens.",
      },
      { property: "og:title", content: "Pricing — satus" },
      {
        property: "og:description",
        content:
          "Free, Pro $19/mo, Team $49/seat. Bring-your-own LLM key on every tier. No token reselling.",
      },
      { property: "og:url", content: SITE_URL + "/pricing" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/pricing" }],
  }),
});

function PricingPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/pricing">
      <Section
        id="pricing"
        n="04"
        label="Pricing"
        title={<>honest, narrow, easy to leave.</>}
      >
        <Prose>
          <p>Bring-your-own LLM key on every tier. We don&rsquo;t resell tokens.</p>
        </Prose>

        <div className="mt-8 max-w-[860px] overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[13px]">
            <thead>
              <tr className="border-y border-[var(--ink)]">
                <th className="w-[44%] py-3 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]">
                  Feature
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={`py-3 text-left text-[11px] uppercase tracking-[0.18em] ${
                      t.primary
                        ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] text-[var(--ink)]"
                        : "text-[var(--mute)]"
                    }`}
                  >
                    <div className="px-4">
                      <div className="text-[var(--ink)]">{t.name}</div>
                      <div className="mt-1 font-sans text-[11px] normal-case tracking-normal text-[var(--mute)]">
                        <span className="text-[var(--ink)]">{t.price}</span> · {t.cadence}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} className="border-b border-[var(--hairline)]">
                  <td className="py-2.5 pr-4 text-[var(--ink)]/85">{f.label}</td>
                  {f.row.map((cell, ci) => {
                    const isPrimary = TIERS[ci].primary;
                    return (
                      <td
                        key={ci}
                        className={`py-2.5 ${
                          isPrimary
                            ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] px-4"
                            : "px-4"
                        }`}
                      >
                        {cell && typeof cell === "object" ? (
                          <span className="text-[var(--signal)]">●</span>
                        ) : (
                          <span className="text-[var(--hairline)]">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td />
                {TIERS.map((t) => (
                  <td
                    key={t.id}
                    className={`pt-5 ${
                      t.primary
                        ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] px-4"
                        : "px-4"
                    }`}
                  >
                    <a
                      href={t.href}
                      className={`inline-flex h-9 items-center px-3 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                        t.primary
                          ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--signal)]"
                          : "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      }`}
                    >
                      {t.cta}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
