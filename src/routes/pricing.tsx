/**
 * Pricing route ("/pricing").
 *
 * Pass B expansion: tier matrix (#tiers) + frequently asked questions (#faq).
 * The FAQ section also emits FAQPage JSON-LD so generative search engines can
 * quote answers directly — same source of truth, no duplication risk.
 */

import { createFileRoute } from "@tanstack/react-router";
import { GITHUB_URL, PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.lovable.app";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "tiers", n: "04", label: "Tiers" },
  { id: "faq", n: "05", label: "FAQ" },
];

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "open source · MIT",
    cta: "view on github",
    href: GITHUB_URL,
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

/* FAQ entries kept as data so the rendered <dl> and the JSON-LD payload
 * stay in lockstep — no risk of the schema drifting from the page. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Why bring-your-own LLM key?",
    a: "Token costs are the dominant variable in this tool. Reselling them means we mark up your usage; BYO means you pay your provider directly, see the bill on their dashboard, and we charge a flat fee for the software. It also keeps your schema out of any vendor we don't control.",
  },
  {
    q: "Which LLM providers are supported?",
    a: "OpenAI, Anthropic, and Google Gemini at launch. The CLI uses structured outputs (tool calling) so any provider that supports a JSON schema response can be added — open an issue if your stack needs one.",
  },
  {
    q: "Is there a free trial on Pro?",
    a: "No. The Free tier is the trial — it's the full CLI under MIT, with community profiles and no time limit. Pro adds the three official profiles, hosted profile updates, and priority triage. If those don't earn $19 a month, you should stay on Free.",
  },
  {
    q: "What's the refund policy?",
    a: "Cancel any time from the dashboard; we refund the unused portion of the current period, no email required. Annual plans are pro-rated to the day.",
  },
  {
    q: "Does it work offline?",
    a: "Pro and Team licenses include a 14-day offline grace period — the CLI keeps generating against your local LLM provider even if it can't reach our license server. Free is fully offline forever.",
  },
  {
    q: "When does the Team tier launch?",
    a: "When we have ten teams on the waitlist asking for the same three features. Joining the waitlist is the vote.",
  },
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
    scripts: [
      {
        // GEO: FAQPage schema mirrors the visible Q&A list verbatim so AI
        // search can answer common questions about pricing without scraping
        // the marketing prose around them.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
});

function PricingPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/pricing">
      <Section
        id="tiers"
        n="04"
        label="Tiers"
        title={<>honest, narrow, easy to leave.</>}
      >
        <Prose>
          <p>Bring-your-own LLM key on every tier. We don&rsquo;t resell tokens.</p>
        </Prose>

        {/* Horizontal scroll on mobile is intentional — the table is denser
         *  than any 4-column layout we could honestly stack. */}
        <p className="mt-6 font-mono text-[11px] text-[var(--mute)] md:hidden">
          scroll table →
        </p>
        <div className="mt-3 max-w-[860px] overflow-x-auto md:mt-8">
          <table className="w-full min-w-[640px] border-collapse font-mono text-[13px]">
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
                    className={`pb-2 pt-5 ${
                      t.primary
                        ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] px-4"
                        : "px-4"
                    }`}
                  >
                    <a
                      href={t.href}
                      className={`inline-flex h-9 items-center whitespace-nowrap px-3 text-[11px] uppercase tracking-[0.16em] transition-colors ${
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

      <Section
        id="faq"
        n="05"
        label="FAQ"
        title={<>questions we get before the receipt.</>}
      >
        {/* Definition list maps cleanly onto the JSON-LD FAQPage above. */}
        <dl className="mt-2 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="py-6">
              <dt className="font-mono text-[14px] font-medium text-[var(--ink)]">
                <span className="mr-3 text-[var(--signal)]">Q.</span>
                {q}
              </dt>
              <dd className="mt-3 max-w-[64ch] pl-7 text-[15px] leading-[1.65] text-[var(--ink)]/80">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </PageShell>
  );
}
