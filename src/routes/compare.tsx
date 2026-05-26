/**
 * Compare route ("/compare").
 *
 * Honest, apples-to-apples positioning against the three tools developers
 * most often weigh against satus: Snaplet, Tonic.ai, and faker.js. We
 * deliberately avoid feature-by-feature checkmark grids — those age badly
 * and invariably misrepresent the other tool. Instead, each comparison
 * states what category the alternative occupies, where it excels, and where
 * satus is a better fit.
 *
 * Maintenance contract: any factual claim about a competitor links to that
 * competitor's own documentation as the source of truth. "Last reviewed"
 * date below puts a clock on staleness.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";
const LAST_REVIEWED = "2026-05-26";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "framing", n: "01", label: "Framing" },
  { id: "vs-snaplet", n: "02", label: "vs Snaplet Seed" },
  { id: "vs-tonic", n: "03", label: "vs Tonic.ai" },
  { id: "vs-faker", n: "04", label: "vs faker / fakerjs" },
  { id: "when-not", n: "05", label: "When not to use satus" },
];

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "satus vs Snaplet, Tonic, faker — comparison" },
      {
        name: "description",
        content:
          "Honest, category-by-category comparison of satus against Snaplet Seed, Tonic.ai, and faker.js. When each is the right tool, and when satus is the better fit.",
      },
      { property: "og:title", content: "satus vs Snaplet, Tonic, faker" },
      {
        property: "og:description",
        content:
          "Where Snaplet, Tonic, and faker each shine, and where satus is the better fit.",
      },
      { property: "og:url", content: SITE_URL + "/compare" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/compare" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "satus vs Snaplet, Tonic.ai, and faker.js",
          description:
            "Category-by-category positioning of satus against the most common alternatives.",
          url: SITE_URL + "/compare",
          inLanguage: "en",
          author: { "@type": "Organization", name: "satus.sh" },
          publisher: {
            "@type": "Organization",
            name: "PasskeyBridge LLC",
            url: "https://passkeybridge.io",
          },
          dateModified: LAST_REVIEWED,
        }),
      },
    ],
  }),
});

function ComparePage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/compare">
      <Section
        id="framing"
        n="01"
        label="Framing"
        title={<>different tools. different jobs.</>}
      >
        <Prose>
          <p>
            satus is a seeding CLI: point it at a Postgres schema, get
            relationally coherent rows. That's a narrow job. The three tools on
            this page show up in the same Google searches but solve adjacent
            problems — production-data anonymization, generic value generation,
            full data platforms. The right pick depends on what you actually
            need, not on which has the longer feature list.
          </p>
          <p>
            We link to each vendor's own documentation as the source of truth.
            If you spot a stale or incorrect characterisation, open an issue on{" "}
            <a
              href="https://github.com/passkeybridge/satus/issues"
              target="_blank"
              rel="noopener"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              GitHub
            </a>{" "}
            and we'll fix it.
          </p>
        </Prose>

        <p className="mt-8 max-w-[62ch] font-mono text-[11px] text-[var(--mute)]">
          last reviewed · {LAST_REVIEWED}
        </p>
      </Section>

      <Section
        id="vs-snaplet"
        n="02"
        label="vs Snaplet Seed"
        title={<>seed → seed, with a different posture.</>}
      >
        <Prose>
          <p>
            <strong>Snaplet</strong> built the original "seed from your schema"
            category. In late 2024 they{" "}
            <a
              href="https://www.snaplet.dev/post/snaplet-is-shutting-down-seed-is-going-open-source"
              target="_blank"
              rel="noopener"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              announced
            </a>{" "}
            that the company would wind down and that Snaplet Seed would
            continue as an open-source project. If you need an MIT-licensed
            library that runs entirely in your process and has no vendor
            lifecycle risk, Seed is a reasonable choice.
          </p>
        </Prose>

        <CompareBlock
          theirs={[
            "Open-source library; embeds in your codebase.",
            "Generates data via heuristics and TypeScript-defined relations.",
            "No vendor; no commercial roadmap as of the 2024 wind-down.",
          ]}
          ours={[
            "CLI, not a library — drops into any stack without code changes.",
            "LLM-driven generation gives plausible content (names, addresses, copy) tuned per profile.",
            "Commercial roadmap backed by PasskeyBridge LLC; support inbox with SLA.",
          ]}
          verdict="Pick Snaplet Seed if you want a zero-dependency open-source library and are comfortable owning maintenance. Pick satus if you want plausible content out of the box and a vendor on the other end of an email."
        />
      </Section>

      <Section
        id="vs-tonic"
        n="03"
        label="vs Tonic.ai"
        title={<>different problem entirely.</>}
      >
        <Prose>
          <p>
            <strong>
              <a
                href="https://www.tonic.ai/"
                target="_blank"
                rel="noopener"
                className="underline decoration-[var(--signal)] underline-offset-4"
              >
                Tonic.ai
              </a>
            </strong>{" "}
            is a data-platform company. Their core product anonymises and
            subsets production data for use in lower environments — a different
            job from generating data from scratch. If you have production data
            you need to share with QA without leaking PII, Tonic is built for
            that.
          </p>
        </Prose>

        <CompareBlock
          theirs={[
            "Anonymises and subsets existing production data.",
            "Enterprise data platform with SOC 2 controls, deployed in-VPC.",
            "Requires you to already have a production dataset.",
          ]}
          ours={[
            "Generates synthetic data without ever touching production.",
            "Single binary; runs anywhere Node 18+ does.",
            "Works on day one with no source dataset to subset.",
          ]}
          verdict="Pick Tonic if you have production data and need to safely move a subset of it downstream. Pick satus if you want plausible data without ever copying real customer rows."
        />
      </Section>

      <Section
        id="vs-faker"
        n="04"
        label="vs faker / fakerjs"
        title={<>fields vs relationships.</>}
      >
        <Prose>
          <p>
            <strong>
              <a
                href="https://fakerjs.dev/"
                target="_blank"
                rel="noopener"
                className="underline decoration-[var(--signal)] underline-offset-4"
              >
                faker.js
              </a>
            </strong>{" "}
            (and its Python and Ruby cousins) is the original field-level
            value generator: <code>faker.person.firstName()</code>,{" "}
            <code>faker.commerce.productName()</code>. It does not know that a{" "}
            <code>customer_id</code> on <code>orders</code> must exist in{" "}
            <code>customers</code>. Wiring relational integrity is left to you.
          </p>
        </Prose>

        <CompareBlock
          theirs={[
            "Massive library of value generators across locales.",
            "Embedded directly in test code; full programmatic control.",
            "Schema awareness, FK consistency, and ordering are entirely your problem.",
          ]}
          ours={[
            "Reads your schema, builds the FK dependency graph automatically.",
            "Inserts in topological order inside one transaction.",
            "You write zero per-table code; profiles cover whole domains.",
          ]}
          verdict="Pick faker for unit-test fixtures and small isolated objects. Pick satus when you need a coherent multi-table dataset that doesn't violate a single foreign key."
        />
      </Section>

      <Section
        id="when-not"
        n="05"
        label="When not to use satus"
        title={<>three honest no-fits.</>}
      >
        <Prose>
          <p>
            We'd rather lose the sale than waste your week. Skip satus if any
            of these apply:
          </p>
        </Prose>

        <ul className="mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <NoFit
            title="You need anonymised production data, not synthetic data."
            body="A real customer's order history with the names changed is not the same artefact as a freshly generated one. If your QA workflows depend on the statistical shape of real traffic, you want a subsetting tool, not a generator."
          />
          <NoFit
            title="Your database isn't Postgres."
            body="satus reads pg_catalog and emits Postgres-flavoured SQL. MySQL, MSSQL, SQLite, and the document stores are out of scope for v1 and not on the near-term roadmap."
          />
          <NoFit
            title="You need millions of rows."
            body="satus is tuned for the 1K–50K row range that powers demos, staging, and PR previews. Above that, the per-row LLM cost stops being trivial; use a deterministic generator for the bulk and satus for the human-facing slice."
          />
        </ul>

        <p className="mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]">
          Read the{" "}
          <a href="/quickstart" className="underline decoration-[var(--signal)] underline-offset-4">
            quickstart
          </a>{" "}
          and the{" "}
          <a href="/profiles" className="underline decoration-[var(--signal)] underline-offset-4">
            profiles catalogue
          </a>{" "}
          to judge fit for your own schema.
        </p>
      </Section>
    </PageShell>
  );
}

/* -------------------- Local primitives -------------------- */

/* Two-column comparison block with a verdict row underneath. The grid
 * collapses to a single column under md so phones never trigger horizontal
 * page scroll. */
function CompareBlock({
  theirs,
  ours,
  verdict,
}: {
  theirs: string[];
  ours: string[];
  verdict: string;
}) {
  return (
    <div className="mt-8 max-w-[760px] border-y border-[var(--hairline)]">
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[var(--hairline)]">
        <Column kicker="them" items={theirs} />
        <Column kicker="us" items={ours} accent />
      </div>
      <div className="border-t border-[var(--hairline)] px-5 py-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
          verdict
        </div>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/85">
          {verdict}
        </p>
      </div>
    </div>
  );
}

function Column({
  kicker,
  items,
  accent = false,
}: {
  kicker: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="px-5 py-5">
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
          accent ? "text-[var(--signal)]" : "text-[var(--mute)]"
        }`}
      >
        {kicker}
      </div>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[14px] leading-[1.55] text-[var(--ink)]/85"
          >
            <span
              aria-hidden
              className={`mt-[0.55em] inline-block h-px w-3 shrink-0 ${
                accent ? "bg-[var(--signal)]" : "bg-[var(--mute)]"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoFit({ title, body }: { title: string; body: string }) {
  return (
    <li className="py-6">
      <div className="font-mono text-[14px] font-medium text-[var(--ink)]">{title}</div>
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80">
        {body}
      </p>
    </li>
  );
}
