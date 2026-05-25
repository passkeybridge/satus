/**
 * Reference profiles route ("/profiles").
 *
 * Documents the three official profiles that ship with satus v1. A profile is
 * the domain context the LLM uses — tone, locale, distributions, business
 * rules — and is stored as plain markdown + JSON in your repo.
 */

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.lovable.app";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "profiles", n: "03", label: "Reference profiles" },
];

const PROFILES = [
  {
    id: "medical-booking",
    name: "Medical booking",
    desc: "Clinics, providers, patients, insurance plans. Appointments on real business hours.",
    tables: ["clinics", "providers", "patients", "appointments", "insurance_plans"],
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    desc: "Stores, products, variants, inventory, orders, line items, reviews with realistic prose.",
    tables: ["stores", "products", "variants", "orders", "order_items", "reviews"],
  },
  {
    id: "saas-subscriptions",
    name: "SaaS subscriptions",
    desc: "Orgs, users, role membership, plans, subscriptions, invoices, usage events that add up.",
    tables: ["orgs", "users", "memberships", "subscriptions", "invoices", "usage_events"],
  },
];

export const Route = createFileRoute("/profiles")({
  component: ProfilesPage,
  head: () => ({
    meta: [
      { title: "Reference profiles — satus" },
      {
        name: "description",
        content:
          "satus ships with three hand-tuned reference profiles: medical booking, e-commerce, and SaaS subscriptions. Fork the closest one and edit it like any file in your repo.",
      },
      { property: "og:title", content: "Reference profiles — satus" },
      {
        property: "og:description",
        content:
          "Three hand-tuned domains: medical booking, e-commerce, SaaS subscriptions. Markdown + JSON, fork and edit locally.",
      },
      { property: "og:url", content: SITE_URL + "/profiles" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/profiles" }],
  }),
});

function ProfilesPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/profiles">
      <Section
        id="profiles"
        n="03"
        label="Reference profiles"
        title={<>three domains, hand-tuned. fork yours locally.</>}
      >
        <Prose>
          <p>
            A profile is the domain context the model uses — tone, locale, distributions, business
            rules. Ship-ready in v1. Stored as plain markdown + JSON; fork the one closest to your
            schema and edit it like any other file in your repo.
          </p>
        </Prose>

        <div className="mt-8 max-w-[860px] border-t border-[var(--hairline)]">
          {PROFILES.map((p) => (
            <article
              key={p.id}
              className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[var(--hairline)] py-6 md:grid-cols-[200px_1fr]"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
                  official
                </div>
                <div className="mt-1.5 font-mono text-[14px] font-medium text-[var(--ink)]">
                  {p.id}
                </div>
                <div className="mt-0.5 text-[13px] text-[var(--mute)]">{p.name}</div>
              </div>
              <div>
                <p className="text-[15px] leading-[1.6] text-[var(--ink)]/85">{p.desc}</p>
                <div className="mt-3 font-mono text-[12px] text-[var(--mute)]">
                  <span className="text-[var(--ink)]">schema · </span>
                  {p.tables.map((t, i) => (
                    <span key={t}>
                      {t}
                      {i < p.tables.length - 1 && (
                        <span className="text-[var(--hairline)]"> · </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
