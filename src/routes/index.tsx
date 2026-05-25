/**
 * Home / overview route ("/").
 *
 * Hosts §00 Overview (hero + install + sample output), §01 Problem statement,
 * and §02 How it works. The remaining specification sections — profiles,
 * pricing, quickstart — each live in dedicated routes so they are independently
 * shareable and indexable.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/chrome";
import { Mono, Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.lovable.app";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "overview", n: "00", label: "Overview" },
  { id: "problem", n: "01", label: "Problem statement" },
  { id: "how", n: "02", label: "How it works" },
  { id: "next", n: "03", label: "Continue reading" },
];

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "satus — relationally-coherent seed data for Postgres" },
      {
        name: "description",
        content:
          "A CLI that reads your Postgres schema and writes realistic seed data respecting every foreign key, constraint, and business rule. Built for demos, screenshots, and QA runs.",
      },
      { property: "og:title", content: "satus — seed data that looks like a real business" },
      {
        property: "og:description",
        content:
          "Stop demoing with John Doe and Lorem Ipsum Corp. satus reads your Postgres schema and writes data that respects every foreign key.",
      },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "satus",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "macOS, Linux, Windows",
          description:
            "CLI that generates relationally-coherent seed data for Postgres databases.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          url: SITE_URL,
        }),
      },
    ],
  }),
});

function HomePage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/">
      <Overview />
      <Problem />
      <How />
      <Next />
    </PageShell>
  );
}

/* ------------------ §00 Overview ------------------ */

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
          <Mono>satus</Mono> reads your live Postgres schema and writes rows that respect every
          foreign key, constraint, and business rule you didn&rsquo;t write down. Built for the
          demo, the screenshot, and the QA run — not for load testing.
        </p>
      </Prose>

      <div className="mt-8 max-w-[520px]">
        <InstallLine />
      </div>

      <Link to="/quickstart" className="link-underline mt-6 inline-flex font-mono text-[13px]">
        read the quickstart →
      </Link>

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
        aria-label="Copy install command"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

/* ------------------ §01 Problem ------------------ */

const COMPARE: [string, string][] = [
  ["random strings per column", "rows that reference real parents"],
  ["ignores foreign keys", "topological insert from pg_catalog"],
  ["John Doe, Acme, Lorem Ipsum", "Maren Holloway, Northwind, Burlington VT"],
  ["constraints fail at runtime", "zod validation before any INSERT"],
  ["one shape per table", "tone & distribution from a profile"],
];

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
          Orders that don&rsquo;t sum to their line items. &ldquo;John Doe — Lorem Ipsum Corp.&rdquo;
          in the screenshot the founder is about to post.
        </p>
        <p>
          The fix isn&rsquo;t a better random-name library. The fix is data that knows your schema
          is a <em>system</em> — that a subscription marked <code>canceled</code> needs a{" "}
          <code>canceled_at</code> after its <code>created_at</code>, that a clinic in Vermont
          doesn&rsquo;t employ 4,000 cardiologists, that an order&rsquo;s <code>total</code> equals
          the sum of its rows.
        </p>
      </Prose>

      <div className="mt-10 max-w-[720px] overflow-hidden border border-[var(--hairline)] font-mono text-[12.5px]">
        <div className="grid grid-cols-2 border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--paper)]">
          <div className="border-r border-[var(--paper)]/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]">
            faker / factory_bot
          </div>
          <div className="px-4 py-2.5 text-[10px] uppercase tracking-[0.22em]">satus</div>
        </div>
        {COMPARE.map(([a, b], i) => (
          <div
            key={i}
            className={`grid grid-cols-2 ${i !== COMPARE.length - 1 ? "border-b border-[var(--hairline)]" : ""}`}
          >
            <div className="border-r border-[var(--hairline)] px-4 py-3 text-[var(--mute)]">
              — {a}
            </div>
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

/* ------------------ §02 How it works ------------------ */

const STEPS = [
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
          The CLI runs on your machine and talks to your database. There is no hosted runtime, no
          telemetry of your row data, and no surprise infrastructure.
        </p>
      </Prose>

      <ol className="mt-8 max-w-[760px]">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className={`grid grid-cols-[40px_140px_1fr] items-baseline gap-x-6 py-4 ${
              i !== STEPS.length - 1 ? "border-b border-[var(--hairline)]" : ""
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

/* ------------------ §03 Continue reading ------------------ */

const NEXT_LINKS: { to: "/profiles" | "/pricing" | "/quickstart"; label: string; desc: string }[] = [
  { to: "/profiles", label: "Reference profiles", desc: "Three hand-tuned domains: medical, e-commerce, SaaS." },
  { to: "/pricing", label: "Pricing", desc: "Free, Pro, Team. Bring-your-own LLM key on every tier." },
  { to: "/quickstart", label: "Quickstart", desc: "Zero to a seeded database in under a minute." },
];

function Next() {
  return (
    <Section
      id="next"
      n="03"
      label="Continue reading"
      title={<>the rest of the specification.</>}
    >
      <div className="max-w-[760px] border-t border-[var(--hairline)]">
        {NEXT_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group grid grid-cols-[200px_1fr] gap-x-8 border-b border-[var(--hairline)] py-5 transition-colors hover:bg-[var(--ink)]/[0.02]"
          >
            <span className="font-mono text-[14px] font-medium text-[var(--ink)]">
              {item.label}
              <span className="ml-2 text-[var(--signal)] transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
            <span className="text-[15px] leading-[1.6] text-[var(--ink)]/85">{item.desc}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
