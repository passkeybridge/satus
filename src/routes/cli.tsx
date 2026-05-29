/**
 * CLI reference route ("/cli").
 *
 * Single-page reference for every subcommand and flag in the satus CLI as of
 * v0.1.1. Pulls its canonical command set from the site's other pages
 * (quickstart, profiles, cyclic-FKs post) so there's exactly one truth across
 * the marketing surface.
 *
 * GEO/SEO: TechArticle JSON-LD + a per-command "Command" abstract embedded as
 * SoftwareApplication.featureList in plain English so generative engines can
 * quote individual flags without parsing tables.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "synopsis", n: "01", label: "Synopsis" },
  { id: "env", n: "02", label: "Environment" },
  { id: "init", n: "03", label: "satus init" },
  { id: "plan", n: "04", label: "satus plan" },
  { id: "generate", n: "05", label: "satus generate" },
  { id: "exit-codes", n: "06", label: "Exit codes" },
];

export const Route = createFileRoute("/cli")({
  component: CliPage,
  head: () => ({
    meta: [
      { title: "CLI reference—satus" },
      {
        name: "description",
        content:
          "Complete reference for the satus CLI: init, plan, generate. Every flag, every environment variable, every exit code. v0.1.1.",
      },
      { property: "og:title", content: "CLI reference—satus" },
      {
        property: "og:description",
        content:
          "Every subcommand, every flag, every exit code in the satus CLI. One page.",
      },
      { property: "og:url", content: SITE_URL + "/cli" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/cli" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "satus CLI reference",
          description:
            "Complete command-line reference for the satus seeding CLI.",
          url: SITE_URL + "/cli",
          inLanguage: "en",
          author: { "@type": "Organization", name: "satus.sh" },
          publisher: {
            "@type": "Organization",
            name: "PasskeyBridge LLC",
            url: "https://passkeybridge.io",
          },
          dateModified: "2026-05-26",
          proficiencyLevel: "Beginner",
          dependencies: "Node.js 18+; Postgres 14+",
        }),
      },
    ],
  }),
});

function CliPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/cli">
      <Section
        id="synopsis"
        n="01"
        label="Synopsis"
        title={<>three verbs. one binary.</>}
      >
        <Prose>
          <p>
            The CLI exposes three subcommands—<code>init</code>, <code>plan</code>,{" "}
            <code>generate</code>—and a handful of global flags. Every command reads
            connection and provider credentials from the environment, never from
            flags, so secrets never land in shell history.
          </p>
          <p>
            New here? Walk through the{" "}
            <a href="/quickstart" className="underline decoration-[var(--signal)] underline-offset-4">
              quickstart
            </a>{" "}
            first—this page is the reference, not the tutorial.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# global form`}</Cmt>
          <Shell>{`satus <command> [flags]`}</Shell>
          <Blank />
          <Cmt>{`# global flags`}</Cmt>
          <Shell>{`satus --version`}</Shell>
          <Shell>{`satus --help`}</Shell>
        </Terminal>
      </Section>

      <Section
        id="env"
        n="02"
        label="Environment"
        title={<>two variables. nothing else required.</>}
      >
        <Prose>
          <p>
            satus reads exactly two variables at runtime. Both are required for{" "}
            <code>plan</code> and <code>generate</code>; <code>init</code> needs
            neither.
          </p>
        </Prose>

        <ul className="mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <EnvVar
            name="DATABASE_URL"
            req="required"
            body="Standard libpq connection string. SSL is auto-negotiated. The 10,000-row safety guard introspects this database before any write; pass --force to override."
          />
          <EnvVar
            name="OPENAI_API_KEY"
            req="required"
            body="Bring-your-own key. satus never proxies LLM calls; the request goes directly from your machine to your provider. OpenAI is the only supported provider at launch. Anthropic and Gemini land in 0.2 (ANTHROPIC_API_KEY, GOOGLE_API_KEY)."
          />
        </ul>
      </Section>

      <Section
        id="init"
        n="03"
        label="satus init"
        title={<>fork a profile into your repo.</>}
      >
        <Prose>
          <p>
            Writes a profile and a config file to <code>./satus/</code>. Safe to
            re-run—it will refuse to overwrite existing files unless{" "}
            <code>--force</code> is set.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus init --profile <name>`}</Shell>
        </Terminal>

        <FlagTable
          rows={[
            ["--profile <name>", "required", "One of: medical-booking, e-commerce, saas-subscriptions. See /profiles."],
            ["--out <dir>", "./satus", "Directory to write profile + config into."],
            ["--force", "false", "Overwrite existing satus/ files."],
          ]}
        />
      </Section>

      <Section
        id="plan"
        n="04"
        label="satus plan"
        title={<>introspect &amp; resolve. no writes.</>}
      >
        <Prose>
          <p>
            Reads either <code>DATABASE_URL</code> or a <code>--schema</code>{" "}
            file, builds the dependency graph, breaks any FK cycles, and prints
            the planned insert order plus a cost estimate. No rows are written.
            Useful in CI to diff plans across schema migrations.
          </p>
        </Prose>

        <Terminal>
          <Cmt>{`# plan against the live database`}</Cmt>
          <Shell>{`satus plan --profile saas-subscriptions`}</Shell>
          <Blank />
          <Cmt>{`# plan against a checked-in schema file (no DATABASE_URL needed)`}</Cmt>
          <Shell>{`satus plan --schema ./schema.sql --profile saas-subscriptions`}</Shell>
        </Terminal>

        <FlagTable
          rows={[
            ["--profile <name>", "required", "Profile to plan against."],
            ["--schema <path>", "—", "Read schema from a .sql file instead of DATABASE_URL."],
            ["--out <path>", "stdout", "Write the plan to a file instead of stdout."],
            ["--json", "false", "Emit machine-readable JSON (for CI diffs)."],
          ]}
        />
      </Section>

      <Section
        id="generate"
        n="05"
        label="satus generate"
        title={<>one transaction. all-or-nothing.</>}
      >
        <Prose>
          <p>
            Runs <code>plan</code>, then writes every row inside a single
            Postgres transaction. If any insert fails—FK violation, check
            constraint, LLM timeout—the entire run rolls back and your
            database is left untouched.
          </p>
          <p>
            <code>--dry</code> runs the full pipeline but pipes the SQL to
            stdout instead of executing it. Diff it, review it, commit it as a
            fixture.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus generate --profile e-commerce`}</Shell>
          <Out>{`✓ 4,812 rows · $0.07 · 11.4s`}</Out>
          <Blank />
          <Cmt>{`# preview without writing`}</Cmt>
          <Shell>{`satus generate --profile e-commerce --dry > seed.sql`}</Shell>
        </Terminal>

        <FlagTable
          rows={[
            ["--profile <name>", "required", "Profile to generate with."],
            ["--dry", "false", "Print SQL to stdout. Do not execute."],
            ["--force", "false", "Bypass the 10,000-row safety guard."],
            ["--batch-size <n>", "50", "Rows per LLM call. Lower if you hit provider rate limits."],
            ["--max-cost <usd>", "1.00", "Refuse to proceed if the planned token cost exceeds this ceiling. Pass --yes to skip the confirmation prompt."],
            ["--seed <n>", "random", "Deterministic seed for reproducible runs."],
          ]}
        />
      </Section>

      <Section
        id="exit-codes"
        n="06"
        label="Exit codes"
        title={<>predictable. scriptable.</>}
      >
        <Prose>
          <p>
            Every error is mapped to a stable exit code so CI pipelines can
            branch on the failure mode. Codes are stable across the 0.x line.
          </p>
        </Prose>

        <ul className="mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <Exit code="0" name="OK" body="Success." />
          <Exit code="1" name="E_GENERIC" body="Unhandled error. File an issue with the stack trace and CREATE TABLE statements." />
          <Exit code="10" name="E_FK_CYCLE" body="Foreign-key cycle could not be broken automatically—every column on the cycle is NOT NULL with no DEFAULT. Mark one side nullable, add a DEFAULT, or declare the constraint DEFERRABLE." />
          <Exit code="11" name="E_DB_NOT_EMPTY" body="Database has more than 10,000 user rows. Re-run with --force or point at a fresh branch." />
          <Exit code="20" name="E_LLM_RATE_LIMIT" body="Provider rate-limited the run after 5 retries with exponential backoff. Lower --batch-size or upgrade your provider tier." />
          <Exit code="21" name="E_LLM_AUTH" body="OPENAI_API_KEY missing, malformed, or rejected by the provider." />
          <Exit code="30" name="E_PROFILE_NOT_FOUND" body="--profile name doesn't match a bundled profile or a file in ./satus/profiles/." />
        </ul>

        <p className="mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]">
          Reference for satus 0.1.1. Flags marked above are stable across the 0.1.x line.
        </p>
      </Section>
    </PageShell>
  );
}

/* -------------------- Local primitives -------------------- */

function Terminal({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 max-w-[760px] border-y border-[var(--ink)]">
      <pre className="overflow-x-auto px-1 py-6 font-mono text-[13px] leading-[1.85]">
        {children}
      </pre>
    </div>
  );
}
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

/* Environment variable list item—code/required/body grid. */
function EnvVar({ name, req, body }: { name: string; req: string; body: string }) {
  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[220px_1fr]">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
          {req}
        </div>
        <div className="mt-1.5 break-all font-mono text-[12.5px] text-[var(--ink)]">{name}</div>
      </div>
      <p className="max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80">{body}</p>
    </li>
  );
}

/* Flag table—three columns on desktop, stacked on mobile. Forced to wrap
 * so long descriptions never trigger horizontal page scroll. */
function FlagTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mt-8 max-w-[760px] overflow-hidden border-y border-[var(--hairline)]">
      <div className="hidden grid-cols-[260px_120px_1fr] gap-x-6 border-b border-[var(--hairline)] px-1 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)] md:grid">
        <span>flag</span>
        <span>default</span>
        <span>description</span>
      </div>
      <ul className="divide-y divide-[var(--hairline)]">
        {rows.map(([flag, def, desc]) => (
          <li
            key={flag}
            className="grid grid-cols-1 gap-x-6 gap-y-1 px-1 py-4 md:grid-cols-[260px_120px_1fr]"
          >
            <span className="break-all font-mono text-[12.5px] text-[var(--ink)]">{flag}</span>
            <span className="font-mono text-[12.5px] text-[var(--mute)]">{def}</span>
            <span className="text-[14px] leading-[1.55] text-[var(--ink)]/80">{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Exit-code list item. */
function Exit({ code, name, body }: { code: string; name: string; body: string }) {
  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[180px_1fr]">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal)]">
          exit {code}
        </div>
        <div className="mt-1.5 font-mono text-[12.5px] text-[var(--ink)]">{name}</div>
      </div>
      <p className="max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--ink)]/80">{body}</p>
    </li>
  );
}
