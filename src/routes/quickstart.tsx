/**
 * Quickstart route ("/quickstart").
 *
 * README-style numbered walkthrough rendered as a single monospace code block:
 * # inline comments in mute, $ shell prompts in ink, success output in signal red.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.lovable.app";

const SECTIONS: ReadonlyArray<SectionMeta> = [{ id: "quickstart", n: "05", label: "Quickstart" }];

export const Route = createFileRoute("/quickstart")({
  component: QuickstartPage,
  head: () => ({
    meta: [
      { title: "Quickstart — satus" },
      {
        name: "description",
        content:
          "From zero to a seeded Postgres database in under a minute. Install satus, point it at Supabase / Neon / Railway / RDS / local, pick a profile, and ship.",
      },
      { property: "og:title", content: "Quickstart — satus" },
      {
        property: "og:description",
        content:
          "Install, point at any Postgres, pick a profile, ship. Zero to seeded database in under a minute.",
      },
      { property: "og:url", content: SITE_URL + "/quickstart" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/quickstart" }],
    scripts: [
      {
        // GEO: HowTo schema so generative search engines can quote the steps verbatim.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Seed a Postgres database with satus",
          totalTime: "PT1M",
          step: [
            { "@type": "HowToStep", name: "Install", text: "npm i -g satus" },
            { "@type": "HowToStep", name: "Configure", text: "Set DATABASE_URL and run satus init --profile e-commerce." },
            { "@type": "HowToStep", name: "Preview", text: "satus generate --dry > satus-output.sql" },
            { "@type": "HowToStep", name: "Ship", text: "satus generate" },
          ],
        }),
      },
    ],
  }),
});

function QuickstartPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/quickstart">
      <Section
        id="quickstart"
        n="05"
        label="Quickstart"
        title={<>from zero to a seeded database in under a minute.</>}
      >
        <Prose>
          <p>
            Point it at any Postgres — Supabase, Neon, Railway, RDS, local. It refuses to run
            against a database with more than 10,000 user rows unless you explicitly say so.
          </p>
        </Prose>

        <div className="mt-8 max-w-[760px] border-y border-[var(--ink)]">
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
    </PageShell>
  );
}

/* Tiny terminal-line primitives. Kept local to the route since they're only
 * used here and they encode three line "kinds" — comment, shell input, success
 * output — that all share the same horizontal padding. */

function Cmt({ children }: { children: ReactNode }) {
  return <div className="px-4 text-[var(--mute)]">{children}</div>;
}
function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 text-[var(--ink)]">
      <span className="text-[var(--mute)]">$ </span>
      {children}
    </div>
  );
}
function Out({ children }: { children: ReactNode }) {
  return <div className="px-4 text-[var(--signal)]">{children}</div>;
}
function Blank() {
  return <div className="h-3" />;
}
