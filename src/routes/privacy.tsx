/**
 * /privacy — Privacy Policy for satus.sh.
 *
 * Scope is narrow on purpose: satus is a CLI that runs on the user's machine,
 * so the only personal data we ever see is what passes through the marketing
 * site (form submissions, Stripe billing data, license-delivery email).
 * We do not see schemas, generated rows, or LLM prompts. This policy says so
 * clearly and avoids importing the parent company's ITRaaS-specific language.
 *
 * Single mailbox (support@satus.sh) for v1. GDPR / PIPEDA / CCPA / CPRA
 * obligations apply because we sell internationally; rights are honored
 * through the same address.
 */

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";
const EFFECTIVE_DATE = "May 26, 2026";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "summary", n: "01", label: "Summary" },
  { id: "who", n: "02", label: "Who we are" },
  { id: "what", n: "03", label: "Data we collect" },
  { id: "why", n: "04", label: "Why we collect it" },
  { id: "processors", n: "05", label: "Sub-processors" },
  { id: "cookies", n: "06", label: "Cookies & analytics" },
  { id: "retention", n: "07", label: "Retention" },
  { id: "transfers", n: "08", label: "Transfers" },
  { id: "rights", n: "09", label: "Your rights" },
  { id: "children", n: "10", label: "Children" },
  { id: "security", n: "11", label: "Security" },
  { id: "changes", n: "12", label: "Changes" },
  { id: "contact", n: "13", label: "Contact" },
];

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — satus" },
      {
        name: "description",
        content:
          "Privacy policy for satus.sh. The CLI runs on your machine; we never see your schemas, your data, or your LLM prompts. Effective May 26, 2026.",
      },
      { property: "og:title", content: "Privacy Policy — satus" },
      {
        property: "og:description",
        content:
          "satus is a CLI: it runs on your machine, against your databases, with your LLM key. We never see your schemas, rows, or prompts.",
      },
      { property: "og:url", content: SITE_URL + "/privacy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/privacy">
      <header className="mb-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§00</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Legal · Privacy</span>
        </div>
        <h1 className="mt-5 font-mono text-[32px] font-medium leading-[1.15] tracking-tight text-[var(--ink)] md:text-[40px]">
          privacy policy.
        </h1>
        <p className="mt-4 font-mono text-[12px] text-[var(--mute)]">
          Effective: {EFFECTIVE_DATE}
        </p>
      </header>

      <Section
        id="summary"
        n="01"
        label="Summary"
        title={<>the cli runs on your machine. we never see your data.</>}
      >
        <Prose>
          <p>
            satus is a command-line tool. It reads your Postgres schema, talks to the LLM provider
            whose API key <em>you</em> supply, and writes rows back to your database — all on your
            machine. PasskeyBridge LLC, the operator of satus.sh, never sees your schemas, the rows
            generated, the prompts sent to your LLM, or the contents of your database.
          </p>
          <p>
            The only personal data we collect is what passes through the satus.sh website: the
            email address you give us to receive a license key, the billing data Stripe needs to
            charge your card, and a small amount of aggregate web analytics. That&rsquo;s it.
          </p>
        </Prose>
      </Section>

      <Section id="who" n="02" label="Who we are" title={<>passkeybridge llc, a wyoming company.</>}>
        <Prose>
          <p>
            satus.sh is operated by <strong>PasskeyBridge LLC</strong>, a Wyoming limited liability
            company located at 5830 E 2nd St., Ste 7000 #33652, Casper, WY 82609. For the purposes
            of GDPR, we are the <em>data controller</em> for the data described in this policy.
          </p>
        </Prose>
      </Section>

      <Section
        id="what"
        n="03"
        label="Data we collect"
        title={<>three buckets. nothing about your database.</>}
      >
        <Prose>
          <p>
            <strong>Account &amp; billing.</strong> When you purchase a license we collect your
            email address and the billing data Stripe requires (name, country, last four digits of
            card, billing address). Full card numbers are processed by Stripe and never reach our
            servers.
          </p>
          <p>
            <strong>License telemetry.</strong> The CLI sends your license key to{" "}
            <code>/api/public/license/verify</code> to confirm it is valid. The verification request
            includes only the license key and a generic User-Agent string. We do not log your IP
            address against the key, your machine ID, or any project metadata.
          </p>
          <p>
            <strong>Web analytics.</strong> The marketing site uses Ahrefs Web Analytics, a
            cookieless analytics product that records aggregate pageviews and referrer domains. It
            does not set tracking cookies, does not build a profile of you, and does not identify
            you across sites.
          </p>
          <p>
            <strong>What we do <em>not</em> collect.</strong> We never receive your database schema,
            connection string, generated rows, LLM prompts, LLM responses, or LLM API key. None of
            those ever leave your machine.
          </p>
        </Prose>
      </Section>

      <Section
        id="why"
        n="04"
        label="Why we collect it"
        title={<>contract performance and legitimate interest.</>}
      >
        <Prose>
          <p>We process the data above under the following GDPR lawful bases:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Contract performance</strong> (Art. 6(1)(b)): account email and billing data,
              to deliver your license and process payment.
            </li>
            <li>
              <strong>Legitimate interests</strong> (Art. 6(1)(f)): license verification and
              aggregate analytics, to operate the Service and prevent license abuse.
            </li>
            <li>
              <strong>Consent</strong> (Art. 6(1)(a)): any future marketing emails (opt-in only).
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        id="processors"
        n="05"
        label="Sub-processors"
        title={<>a short, named list.</>}
      >
        <Prose>
          <p>We use the following sub-processors to operate the Service:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Stripe, Inc.</strong> — payment processing.{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--signal)] underline-offset-4"
              >
                Privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Cloudflare, Inc.</strong> — hosting, edge runtime, and DDoS protection for
              satus.sh.
            </li>
            <li>
              <strong>Supabase, Inc.</strong> — database hosting for license records and
              transactional email infrastructure.
            </li>
            <li>
              <strong>Ahrefs Pte. Ltd.</strong> — cookieless web analytics.
            </li>
          </ul>
          <p>
            We will notify customers by email at least 30 days before engaging a new sub-processor
            that has access to personal data.
          </p>
        </Prose>
      </Section>

      <Section
        id="cookies"
        n="06"
        label="Cookies & analytics"
        title={<>no tracking cookies on this site.</>}
      >
        <Prose>
          <p>
            satus.sh does not set any first-party tracking cookies. The Ahrefs analytics script is
            cookieless. Stripe&rsquo;s checkout flow may set its own cookies during a purchase
            session to prevent fraud and complete payment; those cookies are governed by Stripe&rsquo;s
            privacy policy.
          </p>
        </Prose>
      </Section>

      <Section
        id="retention"
        n="07"
        label="Retention"
        title={<>only as long as needed.</>}
      >
        <Prose>
          <p>
            License records (email, license key, purchase date) are retained for the duration of
            your active subscription plus seven (7) years thereafter to satisfy U.S. tax-record
            obligations. Aggregate analytics data is retained for 14 months. Transactional emails
            are retained for 90 days for delivery-troubleshooting purposes, then purged.
          </p>
        </Prose>
      </Section>

      <Section
        id="transfers"
        n="08"
        label="Transfers"
        title={<>international, governed by sccs.</>}
      >
        <Prose>
          <p>
            We are based in the United States and our sub-processors operate globally. Transfers of
            personal data from the EEA, UK, or Switzerland to the United States rely on the
            European Commission&rsquo;s Standard Contractual Clauses (SCCs) and, where applicable,
            on Stripe&rsquo;s and Cloudflare&rsquo;s certification under the EU&ndash;U.S. Data
            Privacy Framework.
          </p>
        </Prose>
      </Section>

      <Section
        id="rights"
        n="09"
        label="Your rights"
        title={<>access, erase, port, object.</>}
      >
        <Prose>
          <p>Depending on your jurisdiction you have the right to:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Access</strong> the personal data we hold about you (GDPR Art. 15, CCPA
              §1798.100, PIPEDA Principle 9).
            </li>
            <li>
              <strong>Rectify</strong> inaccurate data (GDPR Art. 16).
            </li>
            <li>
              <strong>Erase</strong> your data, subject to legal retention obligations (GDPR Art.
              17, CCPA §1798.105).
            </li>
            <li>
              <strong>Port</strong> your data to another service (GDPR Art. 20).
            </li>
            <li>
              <strong>Object</strong> to processing based on legitimate interests (GDPR Art. 21).
            </li>
            <li>
              <strong>Withdraw consent</strong> at any time (GDPR Art. 7(3)).
            </li>
            <li>
              <strong>Non-discrimination</strong> for exercising your rights (CCPA §1798.125).
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a
              href="mailto:support@satus.sh"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              support@satus.sh
            </a>
            . We respond within 30 days (45 days for CCPA requests). California residents may
            designate an authorized agent in writing. EU residents may also file a complaint with
            their local supervisory authority; Canadian residents may file a complaint with the
            Office of the Privacy Commissioner of Canada.
          </p>
        </Prose>
      </Section>

      <Section
        id="children"
        n="10"
        label="Children"
        title={<>not directed at anyone under 16.</>}
      >
        <Prose>
          <p>
            satus is a developer tool intended for use by adults in a professional context. We do
            not knowingly collect personal data from anyone under 16. If you believe a minor has
            provided us with personal data, contact us and we will delete it.
          </p>
        </Prose>
      </Section>

      <Section
        id="security"
        n="11"
        label="Security"
        title={<>encrypted in transit and at rest.</>}
      >
        <Prose>
          <p>
            All traffic to satus.sh and to <code>/api/public/license/verify</code> is served over
            TLS. License records are stored in an encrypted Postgres database; payment data is held
            by Stripe (PCI-DSS Level 1). For details on coordinated vulnerability disclosure, see
            our{" "}
            <a
              href="https://github.com/passkeybridge/satus/blob/main/SECURITY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              SECURITY.md
            </a>{" "}
            (private repo; mirrored on request to{" "}
            <a
              href="mailto:support@satus.sh"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              support@satus.sh
            </a>
            ).
          </p>
        </Prose>
      </Section>

      <Section
        id="changes"
        n="12"
        label="Changes"
        title={<>we&rsquo;ll notify you of material changes.</>}
      >
        <Prose>
          <p>
            We may update this policy from time to time. Material changes will be announced by email
            to the address associated with your license at least 30 days before they take effect.
            The current version is always available at this URL with an updated effective date.
          </p>
        </Prose>
      </Section>

      <Section id="contact" n="13" label="Contact" title={<>one address. a human reads it.</>}>
        <Prose>
          <p>
            <strong>PasskeyBridge LLC</strong>
            <br />
            5830 E 2nd St., Ste 7000 #33652
            <br />
            Casper, WY 82609
            <br />
            United States
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:support@satus.sh"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              support@satus.sh
            </a>
            <br />
            Web:{" "}
            <a
              href="https://satus.sh"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              satus.sh
            </a>
          </p>
        </Prose>
      </Section>
    </PageShell>
  );
}

// Preserve the import even if a future refactor removes the inline JSX.
type _PreserveImports = ReactNode;
