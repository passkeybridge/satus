import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

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

/* ----------------------------------------------------------------
 * Primitives
 * ---------------------------------------------------------------- */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 ${className}`}>{children}</div>;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span>{index}</span>
      <span className="h-px w-8 bg-border" />
      <span>{children}</span>
    </div>
  );
}

function Rule() {
  return <div className="h-px w-full bg-border" />;
}

/* ----------------------------------------------------------------
 * Nav
 * ---------------------------------------------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center border border-foreground">
            <span className="h-1.5 w-1.5 bg-foreground" />
          </span>
          <span className="font-serif text-xl leading-none tracking-tight">satus</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            v0.1 · beta
          </span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground md:flex">
          <a href="#problem" className="transition-colors hover:text-foreground">Why</a>
          <a href="#how" className="transition-colors hover:text-foreground">How</a>
          <a href="#profiles" className="transition-colors hover:text-foreground">Profiles</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          <a href="#docs" className="transition-colors hover:text-foreground">Docs</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            className="hidden font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            GitHub
          </a>
          <a
            href="#install"
            className="inline-flex h-8 items-center border border-foreground bg-foreground px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90"
          >
            Install
          </a>
        </div>
      </Container>
    </header>
  );
}

/* ----------------------------------------------------------------
 * Hero — the institutional headline, then the install line
 * ---------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative border-b border-border bg-grain">
      <Container className="grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <SectionLabel index="00">Postgres only · CLI only · single binary</SectionLabel>

          <h1 className="mt-7 font-serif text-[clamp(2.75rem,6.2vw,5.25rem)] leading-[1.02] tracking-[-0.015em]">
            Seed data that looks like a{" "}
            <em className="text-[color:var(--marker)] not-italic">real business</em>,
            <br />
            not a faker dump.
          </h1>

          <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
            <span className="font-mono text-foreground">satus</span> reads your live Postgres schema and
            writes rows that respect every foreign key, constraint, and business rule you didn&rsquo;t write down.
            Built for the demo, the screenshot, and the QA run &mdash; not for load testing.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#install"
              className="inline-flex h-11 items-center border border-foreground bg-foreground px-5 font-mono text-[12px] uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
            >
              Install the CLI
            </a>
            <a
              href="#how"
              className="inline-flex h-11 items-center border border-border px-5 font-mono text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary"
            >
              See how it works
            </a>
          </div>

          <div id="install" className="mt-12">
            <InstallBlock />
          </div>
        </div>

        <aside className="md:col-span-5">
          <TerminalCard />
        </aside>
      </Container>
    </section>
  );
}

function InstallBlock() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm i -g satus";
  return (
    <div className="flex items-stretch border border-border bg-card">
      <div className="grid place-items-center border-r border-border px-3 font-mono text-[11px] text-muted-foreground">
        $
      </div>
      <code className="flex-1 px-4 py-3 font-mono text-[14px] text-foreground">{cmd}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="border-l border-border px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function TerminalCard() {
  return (
    <div className="border border-border bg-card shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-border" />
          <span className="h-2 w-2 rounded-full border border-border" />
          <span className="h-2 w-2 rounded-full border border-border" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          satus generate · medical-booking
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">0.8s</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.65]">
        <Line c="muted">$ satus generate --profile medical-booking</Line>
        <Line>
          <span className="text-muted-foreground">→ </span>
          introspecting schema
          <span className="text-muted-foreground"> (14 tables, 38 FKs)</span>
        </Line>
        <Line>
          <span className="text-muted-foreground">→ </span>
          planning insert order
          <span className="text-muted-foreground"> (topological)</span>
        </Line>
        <Line c="marker">→ generating · clinics       12 rows</Line>
        <Line c="marker">→ generating · providers     48 rows</Line>
        <Line c="marker">→ generating · patients     420 rows</Line>
        <Line c="marker">→ generating · appointments 1,840 rows</Line>
        <Line c="muted">  ↳ validating invariants … ok</Line>
        <Line c="muted">  ↳ inserting (transaction) … ok</Line>
        <Line>
          <span className="text-[color:var(--marker)]">✓</span> 2,320 rows · $0.04 ·{" "}
          <span className="text-muted-foreground">7.2s</span>
        </Line>
      </pre>
    </div>
  );
}

function Line({ children, c }: { children: React.ReactNode; c?: "muted" | "marker" }) {
  const cls = c === "muted" ? "text-muted-foreground" : c === "marker" ? "text-foreground" : "text-foreground";
  return <div className={cls}>{children}</div>;
}

/* ----------------------------------------------------------------
 * Problem — the read on the market, kept dry on purpose
 * ---------------------------------------------------------------- */

function Problem() {
  return (
    <section id="problem" className="border-b border-border">
      <Container className="grid gap-12 py-24 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <SectionLabel index="01">The problem</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.01em] md:text-[44px]">
            Faker writes strings. <br />
            Your customers read businesses.
          </h2>
        </div>
        <div className="space-y-8 md:col-span-7 md:col-start-6">
          <Para>
            Seed data is the silent embarrassment of every product demo. Patients with negative ages.
            Orders that don&rsquo;t sum to their line items. &ldquo;John Doe &mdash; Lorem Ipsum Corp.&rdquo; in the
            screenshot the founder is about to post.
          </Para>
          <Para>
            The fix isn&rsquo;t a better random-name library. The fix is data that knows your schema is a
            <em> system</em> &mdash; that a subscription marked <code>canceled</code> needs a{" "}
            <code>canceled_at</code> after its <code>created_at</code>, that a clinic in Vermont doesn&rsquo;t
            employ 4,000 cardiologists, that an order&rsquo;s <code>total</code> equals the sum of its rows.
          </Para>
          <Para>
            <span className="font-mono text-foreground">satus</span> is built around that one belief.
            Everything else &mdash; the LLM, the validator, the insert path &mdash; is in service of it.
          </Para>
        </div>
      </Container>
    </section>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px] leading-[1.65] text-muted-foreground [&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-foreground [&_em]:text-foreground">
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------
 * How it works
 * ---------------------------------------------------------------- */

const steps = [
  {
    n: "01",
    t: "Introspect",
    d: "Read tables, columns, types, foreign keys, unique constraints, checks, and enums directly from pg_catalog. No annotations. No ORM plugins.",
  },
  {
    n: "02",
    t: "Plan",
    d: "Build a dependency DAG from your foreign keys and topologically sort the insert order. Parents before children, always.",
  },
  {
    n: "03",
    t: "Generate",
    d: "Per table, send schema, parent-row samples, and the active profile to the LLM. Receive rows as structured JSON via tool-calling — never free-text.",
  },
  {
    n: "04",
    t: "Validate",
    d: "A zod schema generated from the table catches type, length, enum, unique, and invariant violations before they ever reach the database.",
  },
  {
    n: "05",
    t: "Insert",
    d: "Wrap each table in a transaction. COPY FROM STDIN for large tables, parameterized inserts otherwise. One auto-repair retry, then fail loudly.",
  },
];

function How() {
  return (
    <section id="how" className="border-b border-border">
      <Container className="py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel index="02">How it works</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.01em] md:text-[44px]">
              Five quiet steps. <br />
              No magic. No daemons.
            </h2>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-muted-foreground">
              The CLI runs on your machine and talks to your database. There is no hosted runtime, no
              telemetry of your row data, and no surprise infrastructure.
            </p>
          </div>

          <ol className="md:col-span-8">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 py-7 ${
                  i !== steps.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-tight tracking-tight">{s.t}</h3>
                  <p className="mt-2 max-w-[58ch] text-[15.5px] leading-[1.6] text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------
 * Profiles — the moat, presented as a small catalog
 * ---------------------------------------------------------------- */

const profiles = [
  {
    id: "medical-booking",
    name: "Medical Booking",
    bullets: ["Clinics, providers, patients", "Appointments on business hours", "Insurance plans & coverage"],
    sample: [
      ["patient", "Maren Holloway, 41, Burlington VT"],
      ["provider", "Dr. R. Okafor — Family Medicine"],
      ["appointment", "2025-04-12 09:30 · 30m · annual"],
    ],
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    bullets: ["Stores, products, variants", "Inventory & order line items", "Reviews with realistic prose"],
    sample: [
      ["product", "Linen Field Shirt — Slate · M"],
      ["order", "#10428 · $184.00 · 3 items"],
      ["review", "★★★★☆ Fits true. Wash cold."],
    ],
  },
  {
    id: "saas-subscriptions",
    name: "SaaS Subscriptions",
    bullets: ["Orgs, users, role membership", "Plans, subscriptions, invoices", "Usage events that add up"],
    sample: [
      ["org", "Northwind Logistics · 42 seats"],
      ["subscription", "team_annual · active · 2025-09-01"],
      ["invoice", "INV-00891 · $1,896.00 · paid"],
    ],
  },
];

function Profiles() {
  return (
    <section id="profiles" className="border-b border-border bg-secondary/40">
      <Container className="py-24">
        <div className="flex items-end justify-between gap-8">
          <div>
            <SectionLabel index="03">Profiles</SectionLabel>
            <h2 className="mt-6 max-w-[18ch] font-serif text-4xl leading-[1.05] tracking-[-0.01em] md:text-[44px]">
              Three domains, hand-tuned.
            </h2>
          </div>
          <p className="hidden max-w-[34ch] text-[14px] leading-relaxed text-muted-foreground md:block">
            A profile is the domain context the model uses &mdash; tone, locale, distributions, business rules. Ship-ready in v1; fork yours locally.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {profiles.map((p) => (
            <article key={p.id} className="bg-background p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {p.id}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--marker)]">
                  Official
                </span>
              </div>
              <h3 className="mt-4 font-serif text-[28px] leading-tight tracking-tight">{p.name}</h3>

              <ul className="mt-5 space-y-1.5 text-[14px] text-muted-foreground">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="mt-2 h-px w-3 bg-border" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Sample row
                </div>
                <dl className="mt-3 space-y-2 font-mono text-[12px]">
                  {p.sample.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[88px_1fr] gap-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------
 * Pricing
 * ---------------------------------------------------------------- */

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "open source · MIT",
    features: ["CLI core", "Bring-your-own LLM key", "Community profiles", "Single workstation"],
    cta: "View on GitHub",
    href: "https://github.com",
    primary: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month · or $190/yr",
    features: [
      "Three official profiles",
      "Hosted profile updates",
      "License key, 14-day offline grace",
      "Priority issue triage",
    ],
    cta: "Start with Pro",
    href: "#",
    primary: true,
  },
  {
    name: "Team",
    price: "$49",
    cadence: "per seat · later",
    features: ["Shared profiles", "CI mode", "Audit log", "Invoiced billing"],
    cta: "Join waitlist",
    href: "#",
    primary: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-b border-border">
      <Container className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="04">
            <span className="mx-auto">Pricing</span>
          </SectionLabel>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.01em] md:text-[44px]">
            Honest, narrow, easy to leave.
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
            Bring-your-own LLM key on every tier. We don&rsquo;t resell tokens.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col bg-background p-8 ${
                t.primary ? "relative bg-foreground text-background" : ""
              }`}
            >
              {t.primary && (
                <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.18em] text-background/70">
                  Recommended
                </span>
              )}
              <div className={`font-mono text-[11px] uppercase tracking-[0.18em] ${t.primary ? "text-background/70" : "text-muted-foreground"}`}>
                {t.name}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-[56px] leading-none tracking-tight">{t.price}</span>
              </div>
              <div className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] ${t.primary ? "text-background/60" : "text-muted-foreground"}`}>
                {t.cadence}
              </div>

              <ul className={`mt-8 space-y-2.5 text-[14.5px] ${t.primary ? "text-background/85" : "text-muted-foreground"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className={`mt-[10px] h-px w-3 ${t.primary ? "bg-background/40" : "bg-border"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                className={`mt-10 inline-flex h-11 items-center justify-center border font-mono text-[12px] uppercase tracking-[0.16em] transition-colors ${
                  t.primary
                    ? "border-background bg-background text-foreground hover:opacity-90"
                    : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------
 * Docs / quickstart preview
 * ---------------------------------------------------------------- */

function Docs() {
  return (
    <section id="docs" className="border-b border-border bg-secondary/40">
      <Container className="grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel index="05">Quickstart</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.01em] md:text-[44px]">
            From zero to a seeded database in under a minute.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
            Point it at any Postgres &mdash; Supabase, Neon, Railway, RDS, local. It refuses to run against
            a database with more than 10,000 user rows unless you explicitly say so.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                quickstart.sh
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                bash
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.7]">
              <Comment># 1 · install</Comment>
              <Code>npm i -g satus</Code>
              <br />
              <Comment># 2 · point at your database & pick a profile</Comment>
              <Code>export DATABASE_URL="postgres://user:pass@localhost:5432/app"</Code>
              <Code>satus init --profile e-commerce</Code>
              <br />
              <Comment># 3 · preview before you commit</Comment>
              <Code>satus generate --dry &gt; satus-output.sql</Code>
              <br />
              <Comment># 4 · ship it</Comment>
              <Code>satus generate</Code>
              <Output>✓ 4,812 rows · $0.07 · 11.4s</Output>
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Comment({ children }: { children: React.ReactNode }) {
  return <div className="text-muted-foreground">{children}</div>;
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <span className="text-muted-foreground">$ </span>
      <span className="text-foreground">{children}</span>
    </div>
  );
}
function Output({ children }: { children: React.ReactNode }) {
  return <div className="text-[color:var(--marker)]">{children}</div>;
}

/* ----------------------------------------------------------------
 * Closing — small, dry, confident
 * ---------------------------------------------------------------- */

function Closing() {
  return (
    <section className="border-b border-border">
      <Container className="py-28 text-center">
        <p className="font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.015em]">
          Demo data, finally, <br />
          worth showing the customer.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#install"
            className="inline-flex h-11 items-center border border-foreground bg-foreground px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
          >
            Install satus
          </a>
          <a
            href="https://github.com"
            className="inline-flex h-11 items-center border border-border px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary"
          >
            Read the source
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------
 * Footer
 * ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer>
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-5 w-5 place-items-center border border-foreground">
              <span className="h-1.5 w-1.5 bg-foreground" />
            </span>
            <span className="font-serif text-xl leading-none tracking-tight">satus</span>
          </div>
          <p className="mt-4 max-w-[40ch] text-[13.5px] leading-relaxed text-muted-foreground">
            <em>Satus</em> &mdash; Latin: a beginning, a planting, a sown thing. A CLI for seeding Postgres
            with data that respects your schema.
          </p>
        </div>

        <FooterCol title="Product" links={[["How it works", "#how"], ["Profiles", "#profiles"], ["Pricing", "#pricing"], ["Changelog", "#"]]} />
        <FooterCol title="Developers" links={[["Docs", "#docs"], ["GitHub", "https://github.com"], ["CLI reference", "#"], ["Status", "#"]]} />
        <FooterCol title="Company" links={[["About", "#"], ["Privacy", "#"], ["Terms", "#"], ["Contact", "mailto:hello@satus.ai"]]} />
      </Container>
      <Rule />
      <Container className="flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>© {new Date().getFullYear()} satus.ai · all rights reserved</span>
        <span>Built in plain text · No cookies on this page</span>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-[14px]">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-foreground/85 transition-colors hover:text-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <How />
      <Profiles />
      <Pricing />
      <Docs />
      <Closing />
      <Footer />
    </main>
  );
}
