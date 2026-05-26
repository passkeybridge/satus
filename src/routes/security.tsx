/**
 * /security — coordinated-disclosure policy and security posture.
 *
 * Public-facing companion to the in-repo SECURITY.md. Anyone landing here
 * from a vulnerability submission, a procurement questionnaire, or a quick
 * "how do you handle X" check should find a single, definitive answer
 * without having to dig into GitHub. The numbers and timelines on this page
 * are the canonical contract; SECURITY.md mirrors them.
 */

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/chrome";
import { Prose, Section, type SectionMeta } from "@/components/site/primitives";

const SITE_URL = "https://satus.sh";
const SECURITY_CONTACT = "mailto:support@satus.sh?subject=Security%20report";

const SECTIONS: ReadonlyArray<SectionMeta> = [
  { id: "report", n: "01", label: "Report a vulnerability" },
  { id: "expect", n: "02", label: "What to expect" },
  { id: "scope", n: "03", label: "Scope" },
  { id: "data", n: "04", label: "Data & keys" },
  { id: "infrastructure", n: "05", label: "Infrastructure" },
  { id: "safe-harbor", n: "06", label: "Safe harbor" },
];

export const Route = createFileRoute("/security")({
  component: SecurityPage,
  head: () => ({
    meta: [
      { title: "Security — satus" },
      {
        name: "description",
        content:
          "Coordinated vulnerability disclosure policy for satus.sh and the satus CLI: how to report, response timeline, scope, and safe harbor.",
      },
      { property: "og:title", content: "Security — satus" },
      {
        property: "og:description",
        content:
          "Report a vulnerability to support@satus.sh. 2-day acknowledgement, 7-day triage, 90-day default embargo.",
      },
      { property: "og:url", content: SITE_URL + "/security" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/security" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "satus security policy",
          url: SITE_URL + "/security",
          inLanguage: "en",
          dateModified: "2026-05-26",
          publisher: {
            "@type": "Organization",
            name: "PasskeyBridge LLC",
            url: "https://passkeybridge.io",
          },
          mainEntity: {
            "@type": "CreativeWork",
            name: "Coordinated vulnerability disclosure policy",
            url: SITE_URL + "/security",
          },
        }),
      },
    ],
  }),
});

function SecurityPage() {
  return (
    <PageShell sections={SECTIONS} currentPath="/security">
      <header className="border-b border-[var(--hairline)] pb-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§00</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Security policy · v1 · 2026-05-26</span>
        </div>
        <h1 className="mt-5 max-w-[22ch] font-mono text-[34px] font-medium leading-[1.1] tracking-tight text-[var(--ink)] md:text-[44px]">
          report it. we'll fix it. we'll credit you.
        </h1>
        <p className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.7] text-[var(--ink)]/85">
          satus takes the security of the CLI, the marketing site, and the
          license-verification API seriously. This page is the canonical
          coordinated-disclosure contract; the in-repo{" "}
          <a
            href={SECURITY_MD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--signal)] underline-offset-4"
          >
            SECURITY.md
          </a>{" "}
          mirrors it for tooling that expects an RFC 9116-style file in the
          repository root.
        </p>
      </header>

      <Section
        id="report"
        n="01"
        label="Report a vulnerability"
        title={<>email, not issues.</>}
      >
        <Prose>
          <p>
            Email{" "}
            <a
              href="mailto:support@satus.sh?subject=SECURITY%3A%20"
              className="underline decoration-[var(--signal)] underline-offset-4"
            >
              support@satus.sh
            </a>{" "}
            with a subject line beginning <code>SECURITY:</code> followed by a
            short summary. Until a dedicated <code>security@</code> mailbox is
            published per RFC 9116, <code>support@</code> is the canonical
            address and is monitored by a human on every business day.
          </p>
          <p>Please include:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>A description of the issue and its impact.</li>
            <li>
              Reproduction steps, a proof-of-concept, or a minimal failing
              schema.
            </li>
            <li>
              The affected version (<code>satus --version</code>) and runtime
              (Node version, operating system).
            </li>
            <li>
              Your preferred name and contact for credit, or a request to
              remain anonymous.
            </li>
          </ul>
          <p>
            Please do <strong>not</strong> open public GitHub issues, post to
            social media, or share details with third parties before we have
            had a chance to respond.
          </p>
        </Prose>
      </Section>

      <Section
        id="expect"
        n="02"
        label="What to expect"
        title={<>2 days, 7 days, 90 days.</>}
      >
        <Prose>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Acknowledgement</strong> within <code>2 business days</code>.
            </li>
            <li>
              <strong>Triage decision</strong> (accepted, needs more info, not a
              vulnerability) within <code>7 business days</code>.
            </li>
            <li>
              <strong>Coordinated disclosure timeline</strong> agreed with the
              reporter. Default embargo is <code>90 days</code> from triage,
              shortened if a fix ships sooner.
            </li>
            <li>
              <strong>Credit</strong> in the release notes for the fix, unless
              anonymity is requested.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        id="scope"
        n="03"
        label="Scope"
        title={<>what counts, what doesn't.</>}
      >
        <Prose>
          <p>
            <strong>In scope:</strong>
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              The satus CLI — the <code>satus</code> binary distributed on npm
              and Homebrew.
            </li>
            <li>
              The satus.sh marketing site and the license-verification API
              (<code>/api/public/license/verify</code>,{" "}
              <code>/api/public/payments/webhook</code>).
            </li>
            <li>
              License-delivery emails sent from PasskeyBridge LLC
              infrastructure.
            </li>
          </ul>
          <p className="mt-4">
            <strong>Out of scope:</strong>
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Issues that require physical access to a user's machine.</li>
            <li>
              Denial-of-service via deliberate misuse of the user's own LLM API
              key quota.
            </li>
            <li>
              Social engineering of PasskeyBridge LLC staff or customers.
            </li>
            <li>
              Findings on third-party services (Stripe, the user's chosen LLM
              provider, the user's database). Please report those to the
              respective vendors.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        id="data"
        n="04"
        label="Data & keys"
        title={<>your data stays on your machine.</>}
      >
        <Prose>
          <p>
            satus is a CLI you run locally or in your own CI. The schema it
            introspects, the rows it generates, and the database it writes to
            never traverse PasskeyBridge LLC infrastructure.
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>LLM API key.</strong> Bring-your-own. The key is read
              from <code>OPENAI_API_KEY</code> at runtime, sent directly from
              your machine to your chosen provider, and never proxied through
              satus.sh.
            </li>
            <li>
              <strong>Database URL.</strong> Read from <code>DATABASE_URL</code>{" "}
              at runtime. satus connects directly to your Postgres; we never see
              the connection string or the data it returns.
            </li>
            <li>
              <strong>Telemetry.</strong> Off by default. No automatic schema
              uploads, no command-line argument collection.
            </li>
            <li>
              <strong>License records.</strong> Email address, Stripe customer
              ID, and license key are stored in an encrypted Postgres database
              managed by PasskeyBridge LLC. See the{" "}
              <a
                href="/privacy"
                className="underline decoration-[var(--signal)] underline-offset-4"
              >
                privacy policy
              </a>{" "}
              for retention.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        id="infrastructure"
        n="05"
        label="Infrastructure"
        title={<>encrypted in transit and at rest.</>}
      >
        <Prose>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>TLS everywhere.</strong> All traffic to{" "}
              <code>satus.sh</code> and to{" "}
              <code>/api/public/license/verify</code> is served over TLS
              terminated at Cloudflare.
            </li>
            <li>
              <strong>Encrypted at rest.</strong> License records live in a
              Supabase-managed Postgres database with disk-level encryption.
            </li>
            <li>
              <strong>Payments.</strong> Card data is handled exclusively by
              Stripe (PCI-DSS Level 1). satus.sh never sees a primary account
              number; we store only the Stripe customer ID and the resulting
              license key.
            </li>
            <li>
              <strong>Webhooks.</strong> The Stripe webhook endpoint verifies
              the <code>Stripe-Signature</code> HMAC on every request before
              touching the database.
            </li>
            <li>
              <strong>Secrets.</strong> Service-role credentials are held in
              Cloudflare Workers environment variables and are never exposed to
              the browser bundle.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        id="safe-harbor"
        n="06"
        label="Safe harbor"
        title={<>good-faith research is welcome.</>}
      >
        <Prose>
          <p>
            We will not pursue legal action against researchers who:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Make a good-faith effort to comply with this policy.</li>
            <li>
              Avoid privacy violations, data destruction, and service
              degradation.
            </li>
            <li>
              Give us reasonable time to remediate before public disclosure.
            </li>
          </ul>
          <p className="mt-4">
            Thank you for helping keep satus.sh users safe.
          </p>
        </Prose>
      </Section>
    </PageShell>
  );
}
