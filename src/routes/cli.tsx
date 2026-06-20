/**
 * CLI reference route ("/cli").
 *
 * Single-page reference for every subcommand and flag in the satus CLI,
 * matched verbatim against the binary's runtime --help output for the
 * currently published version. Source of truth for the version string lives
 * in src/lib/version.ts; the binary's own surface lives in
 * packages/cli/src/commands/. When the CLI changes, this page changes too.
 *
 * GEO/SEO: TechArticle JSON-LD + a SoftwareApplication.featureList plus a
 * per-command FlagTable so generative engines can quote individual flags
 * without parsing the whole document.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";
import { SATUS_VERSION, SATUS_VERSION_TAG, SATUS_RELEASED_AT } from "@/lib/version";

const SITE_URL = "https://satus.sh";

// Section order mirrors the order the user encounters commands in a real
// session: install (covered in /quickstart), init, generate, then the
// licensing commands and the operational notes.
const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "synopsis", n: "01", label: "Synopsis" },
  { id: "env", n: "02", label: "Environment" },
  { id: "init", n: "03", label: "satus init" },
  { id: "generate", n: "04", label: "satus generate" },
  { id: "activate", n: "05", label: "satus activate" },
  { id: "whoami", n: "06", label: "satus whoami" },
  { id: "notes", n: "07", label: "Operational notes" },
];

export const Route = createFileRoute("/cli")({
  component: CliPage,
  head: () => ({
    meta: [
      { title: "CLI reference—satus" },
      {
        name: "description",
        content: `Complete reference for the satus CLI ${SATUS_VERSION_TAG}: init, generate, activate, whoami. Every flag, every environment variable, taken directly from the published binary.`,
      },
      { property: "og:title", content: "CLI reference—satus" },
      {
        property: "og:description",
        content:
          "Every subcommand and every flag in the satus CLI, matched against the published binary. One page.",
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
          dateModified: SATUS_RELEASED_AT,
          proficiencyLevel: "Beginner",
          dependencies: "Node.js 20+; PostgreSQL 14+",
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
        title={<>four verbs. one binary.</>}
      >
        <Prose>
          <p>
            The CLI exposes four subcommands—<code>init</code>,{" "}
            <code>generate</code>, <code>activate</code>, <code>whoami</code>—and
            two global flags. Connection strings and provider keys are read from
            the environment by default so secrets never land in shell history;
            equivalent overrides are documented per command below.
          </p>
          <p>
            New here? Walk through the{" "}
            <a
              href="/quickstart"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
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
          <Out>{`satus ${SATUS_VERSION}`}</Out>
          <Shell>{`satus --help`}</Shell>
        </Terminal>
      </Section>

      <Section
        id="env"
        n="02"
        label="Environment"
        title={<>one db url. one provider key.</>}
      >
        <Prose>
          <p>
            satus reads its connection string and an LLM provider key from
            the environment. Both are required for <code>generate</code>;{" "}
            <code>init</code>, <code>activate</code>, and <code>whoami</code>{" "}
            need neither.
          </p>
          <p>
            Pick one provider per run. If both <code>OPENAI_API_KEY</code> and{" "}
            <code>ANTHROPIC_API_KEY</code> are exported and no{" "}
            <code>--provider</code> flag or <code>provider</code> config field
            is set, the run aborts with a clear message — auto-detect
            deliberately refuses to guess so a misplaced key never spends on
            the wrong invoice.
          </p>
        </Prose>

        <ul className="mt-8 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          <EnvVar
            name="DATABASE_URL"
            req="required"
            body="Standard libpq connection string. SATUS_DATABASE_URL is also accepted and takes precedence. Either can be overridden per run with --dsn on generate."
          />
          <EnvVar
            name="OPENAI_API_KEY"
            req="one of two"
            body="Bring-your-own OpenAI key. satus never proxies LLM calls; the request goes directly from your machine to OpenAI. OPENAI_BASE_URL is honored if you need to point at an OpenAI-compatible endpoint (Groq, Together, a local proxy)."
          />
          <EnvVar
            name="ANTHROPIC_API_KEY"
            req="one of two"
            body="Bring-your-own Anthropic key. The CLI calls api.anthropic.com directly using the pinned Messages API (anthropic-version: 2023-06-01) with tool-use forcing for structured output. ANTHROPIC_BASE_URL is honored if you need a compatible proxy."
          />
        </ul>
      </Section>

      <Section
        id="init"
        n="03"
        label="satus init"
        title={<>scaffold a config in the current directory.</>}
      >
        <Prose>
          <p>
            Writes <code>satus.config.json</code> to the current working
            directory. Interactive prompts ask for the connection string (blank
            falls back to <code>$DATABASE_URL</code>), the schema, the profile,
            and the row count. Safe to re-run; existing config is preserved
            unless <code>--force</code> is set.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus init`}</Shell>
        </Terminal>

        <FlagTable
          rows={[
            ["--force", "false", "Overwrite an existing satus.config.json."],
          ]}
        />
      </Section>

      <Section
        id="generate"
        n="04"
        label="satus generate"
        title={<>one transaction. all-or-nothing.</>}
      >
        <Prose>
          <p>
            Introspects the target schema, builds the foreign-key DAG, breaks
            any cycles whose back-edge is nullable, calls the LLM for realistic
            rows, then writes the entire dataset inside a single Postgres
            transaction. If any insert fails the whole run rolls back and your
            database is left untouched.
          </p>
          <p>
            <code>--dry-run</code> performs introspection, planning, and cost
            estimation but skips both the LLM call and the write phase. It is
            the right way to preview what a run would do before spending tokens.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus generate --profile saas --rows 25`}</Shell>
          <Blank />
          <Cmt>{`# preview the plan without spending tokens or writing rows`}</Cmt>
          <Shell>{`satus generate --profile saas --dry-run`}</Shell>
        </Terminal>

        <FlagTable
          rows={[
            [
              "--profile <name>",
              "from config",
              "Reference profile. One of: saas, ecommerce, b2b.",
            ],
            [
              "--rows <n>",
              "50",
              "Rows to generate per table. Free tier caps at 25 rows/table and 5 tables.",
            ],
            [
              "--batch-size <n>",
              "25",
              "Rows per LLM call. Lower if you hit provider rate limits.",
            ],
            [
              "--max-cost <usd>",
              "1.00",
              "Abort before any LLM spend if the estimated cost exceeds this ceiling.",
            ],
            [
              "--dsn <url>",
              "from env",
              "Postgres connection string. Overrides DATABASE_URL and the config file.",
            ],
            [
              "--schema <name>",
              "from config",
              "Postgres schema to seed. Defaults to public when neither config nor flag is set.",
            ],
            [
              "--model <id>",
              "from config",
              "OpenAI model id. Overrides the model recorded in satus.config.json.",
            ],
            [
              "--truncate",
              "false",
              "TRUNCATE target tables (RESTART IDENTITY CASCADE) before inserting.",
            ],
            [
              "--dry-run",
              "false",
              "Plan only. Print the insert order and the cost estimate; do not call the LLM and do not write to the database.",
            ],
          ]}
        />
      </Section>

      <Section
        id="activate"
        n="05"
        label="satus activate"
        title={<>swap free for pro or team.</>}
      >
        <Prose>
          <p>
            Validates a license key against{" "}
            <code>https://satus.sh/api/public/license/verify</code> and writes
            the result to the local cache (<code>~/.satus/license-cache.json</code>,
            24-hour TTL). Until activated, generation runs under the Free tier
            limits noted above.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus activate satus_live_••••••••`}</Shell>
        </Terminal>
      </Section>

      <Section
        id="whoami"
        n="06"
        label="satus whoami"
        title={<>read the cached license.</>}
      >
        <Prose>
          <p>
            Prints the currently activated tier and the email the license was
            issued to. Reads the local cache only; no network call is made.
          </p>
        </Prose>

        <Terminal>
          <Shell>{`satus whoami`}</Shell>
        </Terminal>
      </Section>

      <Section
        id="notes"
        n="07"
        label="Operational notes"
        title={<>exit codes, privacy, and the wire shape.</>}
      >
        <Prose>
          <p>
            Every command returns <code>0</code> on success and <code>1</code>{" "}
            on any error, with a one-line diagnostic written to stderr. Stable
            per-failure-mode exit codes are planned for a future minor release;
            today, scripts that need to branch on failure should match the
            stderr message.
          </p>
          <p>
            satus never sends your schema, your data, or your column names to
            satus.sh. The only network call to satus.sh is the license verify,
            which sends your license key and nothing else. LLM calls go directly
            from your machine to your provider with your key. Telemetry, when
            you opt in, sends an anonymized run summary (table count, row
            count, duration, exit code)—never table or column names, never
            row data.
          </p>
        </Prose>

        <p className="mt-10 max-w-[62ch] font-mono text-[12.5px] text-[var(--mute)]">
          Reference matches the published binary at {SATUS_VERSION_TAG}{" "}
          (released {SATUS_RELEASED_AT}). Flag defaults are stable across the
          0.x line; new flags may be added in minor releases.
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
