/**
 * Reference profiles route ("/profiles").
 *
 * Pass B expansion: each official profile becomes its own anchorable section
 * (#medical-booking, #e-commerce, #saas-subscriptions) so the LeftRail TOC is
 * useful and individual profiles can be linked from issues, posts, and docs.
 * A trailing #community section documents the BYO-profile escape hatch.
 */

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";

/* Per-profile spec. Kept as data so the TOC + body stay in lockstep. */
type Profile = {
  id: string;
  n: string;
  label: string;
  name: string;
  tagline: string;
  tables: string[];
  rules: string[];
  sample: { col: string; value: string }[];
};

const PROFILES: Profile[] = [
  {
    id: "medical-booking",
    n: "01",
    label: "Medical booking",
    name: "medical-booking",
    tagline:
      "Clinics, providers, patients, insurance plans. Appointments respect business hours, provider specialty, and patient timezone.",
    tables: ["clinics", "providers", "patients", "appointments", "insurance_plans"],
    rules: [
      "appointments only land in provider working hours (clinic.tz aware)",
      "no two appointments overlap for the same provider",
      "insurance_plan_id is consistent with patient.state",
      "patient names reflect realistic demographic mix by clinic locale",
    ],
    sample: [
      { col: "patients.full_name", value: "Marisol Aguirre-Velez" },
      { col: "patients.dob", value: "1984-07-19" },
      { col: "appointments.starts_at", value: "2026-06-04 14:30 America/Denver" },
      { col: "providers.specialty", value: "Family Medicine" },
    ],
  },
  {
    id: "e-commerce",
    n: "02",
    label: "E-commerce",
    name: "e-commerce",
    tagline:
      "Stores, products, variants, inventory, orders, line items, reviews with realistic prose and pricing that adds up at the order level.",
    tables: ["stores", "products", "variants", "orders", "order_items", "reviews"],
    rules: [
      "order_items.unit_price × quantity sums to orders.subtotal",
      "variants.sku is globally unique and matches product.category prefix",
      "reviews.body avoids the words \"awesome\" and \"great product\"",
      "inventory.on_hand never goes negative across fulfilled orders",
    ],
    sample: [
      { col: "products.title", value: "Cedar Plank Cutting Board, 18\"" },
      { col: "variants.sku", value: "KIT-CB-CDR-18" },
      { col: "orders.subtotal", value: "$84.50" },
      { col: "reviews.body", value: "Heavier than I expected — in a good way..." },
    ],
  },
  {
    id: "saas-subscriptions",
    n: "03",
    label: "SaaS subscriptions",
    name: "saas-subscriptions",
    tagline:
      "Orgs, users, role membership, plans, subscriptions, invoices, usage events that actually reconcile against the billed amount.",
    tables: ["orgs", "users", "memberships", "subscriptions", "invoices", "usage_events"],
    rules: [
      "every org has exactly one user with role = 'owner'",
      "subscriptions.status follows a legal lifecycle (trialing → active → past_due → canceled)",
      "invoices.amount = plan.base + sum(usage_events in period × unit_price)",
      "usage_events distributed on a Poisson curve, not uniformly",
    ],
    sample: [
      { col: "orgs.name", value: "Northbeam Analytics" },
      { col: "subscriptions.status", value: "active" },
      { col: "invoices.amount", value: "$248.00" },
      { col: "usage_events.event_type", value: "api.request" },
    ],
  },
];

/* Sections array: one per profile + a closing community/BYO section. */
const SECTIONS: ReadonlyArray<SectionMeta> = [
  ...PROFILES.map((p) => ({ id: p.id, n: p.n, label: p.label })),
  { id: "community", n: "04", label: "Bring your own" },
];

export const Route = createFileRoute("/profiles")({
  component: ProfilesPage,
  head: () => ({
    meta: [
      { title: "Reference profiles — satus" },
      {
        name: "description",
        content:
          "satus ships three hand-tuned reference profiles — medical booking, e-commerce, SaaS subscriptions — with documented constraints and sample output. Fork the closest one locally.",
      },
      { property: "og:title", content: "Reference profiles — satus" },
      {
        property: "og:description",
        content:
          "Three hand-tuned domains: medical booking, e-commerce, SaaS subscriptions. Documented rules + sample rows.",
      },
      { property: "og:url", content: SITE_URL + "/profiles" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/profiles" }],
  }),
});

function ProfilesPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/profiles">
      {PROFILES.map((p) => (
        <Section
          key={p.id}
          id={p.id}
          n={p.n}
          label={p.label}
          title={<>{p.name}</>}
        >
          <Prose>
            <p>{p.tagline}</p>
          </Prose>

          {/* Two-column spec strip: schema (left) + invariants (right). Stacks on mobile. */}
          <div className="mt-8 grid max-w-[860px] grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[220px_1fr]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
                schema
              </div>
              <ul className="mt-3 space-y-1 font-mono text-[12.5px] text-[var(--ink)]/85">
                {p.tables.map((t) => (
                  <li key={t}>
                    <span className="text-[var(--mute)]">· </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
                invariants
              </div>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.55] text-[var(--ink)]/85">
                {p.rules.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] inline-block h-px w-3 shrink-0 bg-[var(--signal)]" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample-output table. Two columns, monospace, hairline rules only. */}
          <div className="mt-10 max-w-[860px] overflow-x-auto border-y border-[var(--ink)]">
            <table className="w-full min-w-[480px] border-collapse font-mono text-[12.5px]">
              <thead>
                <tr>
                  <th className="w-[42%] py-2.5 pr-4 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]">
                    column
                  </th>
                  <th className="py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]">
                    sample
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.sample.map((s) => (
                  <tr key={s.col} className="border-t border-[var(--hairline)]">
                    <td className="py-2 pr-4 text-[var(--mute)]">{s.col}</td>
                    <td className="py-2 text-[var(--ink)]">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}

      <Section
        id="community"
        n="04"
        label="Bring your own"
        title={<>fork a profile, or write one in an afternoon.</>}
      >
        <Prose>
          <p>
            A profile is a markdown brief plus a JSON manifest. No DSL, no plugin API. Copy the
            closest official profile into <code>./satus/profiles/</code>, change the tone notes,
            add or remove tables, and commit it like any other file.
          </p>
          <p>
            Community profiles for legal, real estate, and logistics are on the roadmap — pinned by
            user demand, not by us guessing. Open an issue with your <code>CREATE TABLE</code>{" "}
            statements and we&rsquo;ll triage.
          </p>
        </Prose>
      </Section>
    </PageShell>
  );
}
