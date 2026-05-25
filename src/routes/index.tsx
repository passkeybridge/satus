import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "satus — relationally-coherent seed data for Postgres" },
      {
        name: "description",
        content:
          "A CLI that reads your Postgres schema and produces realistic, relationally-coherent seed data in seconds. For the demo, the screenshot, and the QA run.",
      },
      { property: "og:title", content: "satus — seed data that looks like a real business" },
      {
        property: "og:description",
        content:
          "Stop demoing with John Doe and Lorem Ipsum Corp. satus reads your Postgres schema and writes data that respects every foreign key, constraint, and business rule.",
      },
    ],
  }),
});

/* ============================================================
 * Specification sections (single source of truth for TOC + scroll-spy)
 * ============================================================ */

const SECTIONS = [
  { id: "overview",   n: "00", label: "Overview" },
  { id: "problem",    n: "01", label: "Problem statement" },
  { id: "how",        n: "02", label: "How it works" },
  { id: "profiles",   n: "03", label: "Reference profiles" },
  { id: "pricing",    n: "04", label: "Pricing" },
  { id: "quickstart", n: "05", label: "Quickstart" },
] as const;

/* ============================================================
 * Primitives
 * ============================================================ */

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono ${className}`}>{children}</span>;
}

function Section({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-[var(--hairline)] py-16 first:border-t-0 first:pt-0">
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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[62ch] text-[15.5px] leading-[1.7] text-[var(--ink)]/85 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-[var(--ink)] [&_em]:not-italic [&_em]:text-[var(--ink)] [&_strong]:font-medium [&_strong]:text-[var(--ink)] [&_p]:mb-4 last:[&_p]:mb-0">
      {children}
    </div>
  );
}

/* ============================================================
 * Top bar
 * ============================================================ */

function TopBar() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[var(--hairline)] bg-[var(--paper)]/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-baseline gap-0 font-mono text-[15px] font-medium tracking-tight text-[var(--ink)]">
          <span>satus</span>
          <span className="text-[var(--signal)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-[12px] text-[var(--mute)] md:flex">
          {SECTIONS.slice(0, 5).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="transition-colors hover:text-[var(--ink)]"
            >
              ~/{s.id}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden font-mono text-[11px] text-[var(--mute)] sm:inline">
            v0.1.0-alpha
          </span>
          <a
            href="https://github.com"
            className="font-mono text-[12px] text-[var(--ink)] transition-opacity hover:opacity-70"
          >
            github ↗
          </a>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * Left rail — TOC + scroll-spy + metadata
 * ============================================================ */

function LeftRail() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 border-r border-[var(--hairline)] py-10 pr-6 lg:block">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
        Table of contents
      </div>
      <ol className="mt-5 space-y-px">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-baseline gap-3 px-2 py-1.5 font-mono text-[12.5px] transition-colors ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                <span className={isActive ? "text-[var(--paper)]/70" : "text-[var(--mute)]"}>{s.n}</span>
                <span className="truncate">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 border-t border-[var(--hairline)] pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          Document
        </div>
        <dl className="mt-3 space-y-1.5 font-mono text-[11.5px] text-[var(--mute)]">
          <Meta k="spec"    v="satus/0.1" />
          <Meta k="status"  v={<span><span className="text-[var(--signal)]">●</span> draft</span>} />
          <Meta k="updated" v="2025-05-25" />
          <Meta k="author"  v="satus.ai" />
        </dl>
      </div>
    </aside>
  );
}

function Meta({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt>{k}</dt>
      <dd className="text-[var(--ink)]">{v}</dd>
    </div>
  );
}

/* ============================================================
 * §00 — Overview / hero
 * ============================================================ */

function Overview() {
  return (
    <Section
      id="overview"
      n="00"
      label="RFC · SATUS-001"
      title={<>seed data that looks like a real business, not a faker dump.</>}
    >
      <Prose>
        <p>
          <Mono>satus</Mono> reads your live Postgres schema and writes rows that respect every foreign key,
          constraint, and business rule you didn&rsquo;t write down. Built for the demo, the screenshot, and
          the QA run — not for load testing.
        </p>
      </Prose>

      <div className="mt-8 max-w-[520px]">
        <InstallLine />
      </div>

      <a href="#quickstart" className="link-underline mt-6 inline-flex font-mono text-[13px]">
        read the quickstart →
      </a>

      <div className="mt-10 max-w-[640px] border-t border-[var(--hairline)] pt-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          example output · satus generate --profile medical-booking
        </div>
        <pre className="mt-3 overflow-x-auto font-mono text-[12.5px] leading-[1.75] text-[var(--ink)]">
{`$ satus generate --profile medical-booking
  introspecting schema           14 tables · 38 FKs
  planning insert order          topological
  generating · clinics              12 rows
  generating · providers            48 rows
  generating · patients            420 rows
  generating · appointments      1,840 rows
  validating invariants          ok
  inserting (transaction)        ok
`}
          <span className="text-[var(--signal)]">✓</span>{" "}
          <span>2,320 rows · $0.04 · 7.2s</span>
        </pre>
      </div>
    </Section>
  );
}

function InstallLine() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm i -g satus";
  return (
    <div className="flex items-stretch border border-[var(--ink)] bg-[var(--paper)]">
      <div className="grid w-9 place-items-center border-r border-[var(--ink)] font-mono text-[12px] text-[var(--mute)]">
        $
      </div>
      <code className="flex-1 px-3 py-2.5 font-mono text-[13.5px] text-[var(--ink)]">{cmd}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="border-l border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mute)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

/* ============================================================
 * §01 — Problem statement
 * ============================================================ */

function Problem() {
  return (
    <Section
      id="problem"
      n="01"
      label="Problem statement"
      title={<>faker writes strings. your customers read businesses.</>}
    >
      <Prose>
        <p>
          Seed data is the silent embarrassment of every product demo. Patients with negative ages.
          Orders that don&rsquo;t sum to their line items. &ldquo;John Doe — Lorem Ipsum Corp.&rdquo; in the
          screenshot the founder is about to post.
        </p>
        <p>
          The fix isn&rsquo;t a better random-name library. The fix is data that knows your schema is a
          <em> system</em> — that a subscription marked <code>canceled</code> needs a{" "}
          <code>canceled_at</code> after its <code>created_at</code>, that a clinic in Vermont doesn&rsquo;t
          employ 4,000 cardiologists, that an order&rsquo;s <code>total</code> equals the sum of its rows.
        </p>
      </Prose>

      <div className="mt-10 max-w-[720px] overflow-hidden border border-[var(--hairline)] font-mono text-[12.5px]">
        <div className="grid grid-cols-2 border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--paper)]">
          <div className="border-r border-[var(--paper)]/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]">
            faker / factory_bot
          </div>
          <div className="px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]">
            satus
          </div>
        </div>
        {COMPARE.map(([a, b], i) => (
          <div
            key={i}
            className={`grid grid-cols-2 ${i !== COMPARE.length - 1 ? "border-b border-[var(--hairline)]" : ""}`}
          >
            <div className="border-r border-[var(--hairline)] px-4 py-3 text-[var(--mute)]">— {a}</div>
            <div className="px-4 py-3 text-[var(--ink)]">
              <span className="mr-1 text-[var(--signal)]">+</span>
              {b}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const COMPARE: [string, string][] = [
  ["random strings per column",    "rows that reference real parents"],
  ["ignores foreign keys",         "topological insert from pg_catalog"],
  ["John Doe, Acme, Lorem Ipsum",  "Maren Holloway, Northwind, Burlington VT"],
  ["constraints fail at runtime",  "zod validation before any INSERT"],
  ["one shape per table",          "tone & distribution from a profile"],
];

/* ============================================================
 * §02 — How it works
 * ============================================================ */

const steps = [
  { n: "01", t: "introspect", d: "Read tables, columns, types, foreign keys, unique constraints, checks, and enums directly from pg_catalog. No annotations. No ORM plugins." },
  { n: "02", t: "plan",       d: "Build a dependency DAG from your foreign keys and topologically sort the insert order. Parents before children, always." },
  { n: "03", t: "generate",   d: "Per table, send schema, parent-row samples, and the active profile to the LLM. Receive rows as structured JSON via tool-calling — never free-text." },
  { n: "04", t: "validate",   d: "A zod schema generated from the table catches type, length, enum, unique, and invariant violations before they ever reach the database." },
  { n: "05", t: "insert",     d: "Wrap each table in a transaction. COPY FROM STDIN for large tables, parameterized inserts otherwise. One auto-repair retry, then fail loudly." },
];

function How() {
  return (
    <Section
      id="how"
      n="02"
      label="How it works"
      title={<>five quiet steps. no magic. no daemons.</>}
    >
      <Prose>
        <p>
          The CLI runs on your machine and talks to your database. There is no hosted runtime, no telemetry
          of your row data, and no surprise infrastructure.
        </p>
      </Prose>

      <ol className="mt-8 max-w-[760px]">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className={`grid grid-cols-[40px_140px_1fr] items-baseline gap-x-6 py-4 ${
              i !== steps.length - 1 ? "border-b border-[var(--hairline)]" : ""
            }`}
          >
            <span className="font-mono text-[12px] text-[var(--mute)]">{s.n}</span>
            <span className="font-mono text-[14px] font-medium tracking-tight text-[var(--ink)]">
              {s.t}
            </span>
            <span className="text-[15px] leading-[1.6] text-[var(--ink)]/85">{s.d}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ============================================================
 * §03 — Reference profiles
 * ============================================================ */

const profiles = [
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

function Profiles() {
  return (
    <Section
      id="profiles"
      n="03"
      label="Reference profiles"
      title={<>three domains, hand-tuned. fork yours locally.</>}
    >
      <Prose>
        <p>
          A profile is the domain context the model uses — tone, locale, distributions, business rules.
          Ship-ready in v1. Stored as plain markdown + JSON; fork the one closest to your schema and
          edit it like any other file in your repo.
        </p>
      </Prose>

      <div className="mt-8 max-w-[860px] border-t border-[var(--hairline)]">
        {profiles.map((p) => (
          <article
            key={p.id}
            className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[var(--hairline)] py-6 md:grid-cols-[200px_1fr]"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
                official
              </div>
              <div className="mt-1.5 font-mono text-[14px] font-medium text-[var(--ink)]">{p.id}</div>
              <div className="mt-0.5 text-[13px] text-[var(--mute)]">{p.name}</div>
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[var(--ink)]/85">{p.desc}</p>
              <div className="mt-3 font-mono text-[12px] text-[var(--mute)]">
                <span className="text-[var(--ink)]">schema · </span>
                {p.tables.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < p.tables.length - 1 && <span className="text-[var(--hairline)]"> · </span>}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 * §04 — Pricing
 * ============================================================ */

const tiers = [
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

function Pricing() {
  return (
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
              <th className="w-[44%] py-3 text-left font-medium text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
                Feature
              </th>
              {tiers.map((t) => (
                <th
                  key={t.id}
                  className={`py-3 text-left text-[11px] uppercase tracking-[0.18em] ${
                    t.primary ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] text-[var(--ink)]" : "text-[var(--mute)]"
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
                  const isPrimary = tiers[ci].primary;
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
              {tiers.map((t) => (
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
  );
}

/* ============================================================
 * §05 — Quickstart
 * ============================================================ */

function Quickstart() {
  return (
    <Section
      id="quickstart"
      n="05"
      label="Quickstart"
      title={<>from zero to a seeded database in under a minute.</>}
    >
      <Prose>
        <p>
          Point it at any Postgres — Supabase, Neon, Railway, RDS, local. It refuses to run against
          a database with more than 10,000 user rows unless you explicitly say so.
        </p>
      </Prose>

      <div className="mt-8 max-w-[760px] border-t border-b border-[var(--ink)]">
        <pre className="overflow-x-auto px-1 py-6 font-mono text-[13px] leading-[1.85]">
          <Cmt>{`# 1 · install`}</Cmt>
          <Shell>{`npm i -g satus`}</Shell>
          <Blank />
          <Cmt>{`# 2 · point at your database & pick a profile`}</Cmt>
          <Shell>{`export DATABASE_URL="postgres://user:pass@localhost:5432/app"`}</Shell>
          <Shell>{`satus init --profile e-commerce`}</Shell>
          <Blank />
          <Cmt>{`# 3 · preview before you commit`}</Cmt>
          <Shell>{`satus generate --dry > satus-output.sql`}</Shell>
          <Blank />
          <Cmt>{`# 4 · ship it`}</Cmt>
          <Shell>{`satus generate`}</Shell>
          <Out>{`✓ 4,812 rows · $0.07 · 11.4s`}</Out>
        </pre>
      </div>

      <p className="mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]">
        satus.ai — built for engineers who hate seeing John Doe in their demo data.
      </p>
    </Section>
  );
}

function Cmt({ children }: { children: React.ReactNode }) {
  return <div className="px-4 text-[var(--mute)]">{children}</div>;
}
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 text-[var(--ink)]">
      <span className="text-[var(--mute)]">$ </span>
      {children}
    </div>
  );
}
function Out({ children }: { children: React.ReactNode }) {
  return <div className="px-4 text-[var(--signal)]">{children}</div>;
}
function Blank() {
  return <div className="h-3" />;
}

/* ============================================================
 * Footer
 * ============================================================ */

function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--ink)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-10 font-mono text-[12px] md:grid-cols-4 lg:px-10">
        <div>
          <div className="flex items-baseline">
            <span className="text-[14px] font-medium text-[var(--ink)]">satus</span>
            <span className="text-[var(--signal)]">.</span>
          </div>
          <p className="mt-3 max-w-[34ch] font-sans text-[13px] leading-[1.6] text-[var(--mute)]">
            <em className="not-italic text-[var(--ink)]">Satus</em> — Latin: a beginning, a planting, a sown thing.
          </p>
        </div>
        <FooterCol title="product"   links={[["how it works", "#how"], ["profiles", "#profiles"], ["pricing", "#pricing"], ["changelog", "#"]]} />
        <FooterCol title="resources" links={[["quickstart", "#quickstart"], ["github", "https://github.com"], ["cli reference", "#"], ["status", "#"]]} />
        <FooterCol title="legal"     links={[["privacy", "#"], ["terms", "#"], ["contact", "mailto:hello@satus.ai"]]} />
      </div>
      <div className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 font-mono text-[11px] text-[var(--mute)] lg:px-10">
          <span>© {new Date().getFullYear()} satus.ai</span>
          <span>built in plain text · no cookies on this page</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">{title}</div>
      <ul className="mt-3 space-y-1.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-[var(--ink)]/85 transition-colors hover:text-[var(--signal)]">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
 * Page
 * ============================================================ */

function Landing() {
  return (
    <div className="satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TopBar />
      <div className="mx-auto flex max-w-[1280px] px-6 lg:px-10">
        <LeftRail />
        <main className="min-w-0 flex-1 py-10 lg:pl-12">
          <Overview />
          <Problem />
          <How />
          <Profiles />
          <Pricing />
          <Quickstart />
        </main>
      </div>
      <Footer />
    </div>
  );
}
