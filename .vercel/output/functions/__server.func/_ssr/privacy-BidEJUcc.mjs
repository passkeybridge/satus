import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "./router-B2kWt1Bm.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/vercel__analytics.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:crypto";
import "./stripe.server-BpuPeHCa.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__hr.mjs";
import "../_libs/react-email__link.mjs";
import "../_libs/zod.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
const EFFECTIVE_DATE = "May 26, 2026";
const SECTIONS = [{
  id: "summary",
  n: "01",
  label: "Summary"
}, {
  id: "who",
  n: "02",
  label: "Who we are"
}, {
  id: "what",
  n: "03",
  label: "Data we collect"
}, {
  id: "why",
  n: "04",
  label: "Why we collect it"
}, {
  id: "processors",
  n: "05",
  label: "Sub-processors"
}, {
  id: "cookies",
  n: "06",
  label: "Cookies & analytics"
}, {
  id: "retention",
  n: "07",
  label: "Retention"
}, {
  id: "transfers",
  n: "08",
  label: "Transfers"
}, {
  id: "rights",
  n: "09",
  label: "Your rights"
}, {
  id: "children",
  n: "10",
  label: "Children"
}, {
  id: "security",
  n: "11",
  label: "Security"
}, {
  id: "changes",
  n: "12",
  label: "Changes"
}, {
  id: "contact",
  n: "13",
  label: "Contact"
}];
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/privacy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§00" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Legal · Privacy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[32px] font-medium leading-[1.15] tracking-tight text-[var(--ink)] md:text-[40px]", children: "privacy policy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 font-mono text-[12px] text-[var(--mute)]", children: [
        "Effective: ",
        EFFECTIVE_DATE
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "summary", n: "01", label: "Summary", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "the cli runs on your machine. we never see your data." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "satus is a command-line tool. It reads your Postgres schema, talks to the LLM provider whose API key ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "you" }),
        " supply, and writes rows back to your database—all on your machine. PasskeyBridge LLC, the operator of satus.sh, never sees your schemas, the rows generated, the prompts sent to your LLM, or the contents of your database."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The only personal data we collect is what passes through the satus.sh website: the email address you give us to receive a license key, the billing data Stripe needs to charge your card, and a small amount of aggregate web analytics. That’s it." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "who", n: "02", label: "Who we are", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "passkeybridge llc, a wyoming company." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "satus.sh is operated by ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PasskeyBridge LLC" }),
      ", a Wyoming limited liability company located at 5830 E 2nd St., Ste 7000 #33652, Casper, WY 82609. For the purposes of GDPR, we are the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "data controller" }),
      " for the data described in this policy."
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "what", n: "03", label: "Data we collect", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "four buckets. nothing about your database." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Account & billing." }),
        " When you purchase a license we collect your email address and the billing data Stripe requires (name, country, last four digits of card, billing address). Full card numbers are processed by Stripe and never reach our servers."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "License telemetry." }),
        " The CLI sends your license key to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/license/verify" }),
        " to confirm it is valid. The verification request includes only the license key and a generic User-Agent string. To rate-limit abuse, the request IP is hashed in memory (SHA-256, truncated) for the lifetime of the Worker isolate and discarded; we do not persist your IP, your machine ID, or any project metadata against your key."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Run telemetry." }),
        " When ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus generate" }),
        " finishes it posts one record to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/cli/run" }),
        ". As of CLI v0.3.7 that record contains a random run UUID, the CLI version, the provider and model name, the profile name, the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "number" }),
        " of tables touched, the total row count, the token totals, the estimated spend, the duration, and—on failure—a fixed-vocabulary error class such as",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "pg_23505" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "provider_http_429" }),
        ". It contains no table names, no column names, no schema name, no row data, and no raw error text. The request fails silently if it cannot reach us; it never blocks or breaks a run."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[var(--mute)]", children: "CLI versions 0.2.0 through 0.3.6 additionally sent the list of table names, the target schema name, and the raw error message—which, for a Postgres unique violation, embeds the offending row value. That contradicted the promise on this page and in the CLI README. v0.3.7 stops sending those three fields, and the ingest endpoint now discards them from any payload an older CLI still sends, so the promise holds regardless of which version is installed. The only records ever collected under the old behaviour were our own release-test runs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Web analytics." }),
        " The marketing site uses Ahrefs Web Analytics, a cookieless analytics product that records aggregate pageviews and referrer domains. It does not set tracking cookies, does not build a profile of you, and does not identify you across sites."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "What we do ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "not" }),
          " collect."
        ] }),
        " We never receive your database schema, connection string, generated rows, LLM prompts, LLM responses, or LLM API key. None of those ever leave your machine."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "why", n: "04", label: "Why we collect it", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "contract performance and legitimate interest." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We process the data above under the following GDPR lawful bases:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Contract performance" }),
          " (Art. 6(1)(b)): account email and billing data, to deliver your license and process payment."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Legitimate interests" }),
          " (Art. 6(1)(f)): license verification and aggregate analytics, to operate the Service and prevent license abuse."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Consent" }),
          " (Art. 6(1)(a)): any future marketing emails (opt-in only)."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "processors", n: "05", label: "Sub-processors", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "a short, named list." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We use the following sub-processors to operate the Service:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stripe, Inc." }),
          "—payment processing.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://stripe.com/privacy", target: "_blank", rel: "noopener noreferrer", className: "underline decoration-[var(--signal)] underline-offset-4", children: "Privacy policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cloudflare, Inc." }),
          "—hosting, edge runtime, and DDoS protection for satus.sh."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Supabase, Inc." }),
          "—database hosting for license records and transactional email infrastructure."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ahrefs Pte. Ltd." }),
          "—cookieless web analytics."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We will notify customers by email at least 30 days before engaging a new sub-processor that has access to personal data." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "cookies", n: "06", label: "Cookies & analytics", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "no tracking cookies on this site." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus.sh does not set any first-party tracking cookies. The Ahrefs analytics script is cookieless. Stripe’s checkout flow may set its own cookies during a purchase session to prevent fraud and complete payment; those cookies are governed by Stripe’s privacy policy." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "retention", n: "07", label: "Retention", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "only as long as needed." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "License records (email, license key, purchase date) are retained for the duration of your active subscription plus seven (7) years thereafter to satisfy U.S. tax-record obligations. Aggregate analytics data is retained for 14 months. Transactional emails are retained for 90 days for delivery-troubleshooting purposes, then purged." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "transfers", n: "08", label: "Transfers", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "international, governed by sccs." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We are based in the United States and our sub-processors operate globally. Transfers of personal data from the EEA, UK, or Switzerland to the United States rely on the European Commission’s Standard Contractual Clauses (SCCs) and, where applicable, on Stripe’s and Cloudflare’s certification under the EU–U.S. Data Privacy Framework." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "rights", n: "09", label: "Your rights", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "access, erase, port, object." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Depending on your jurisdiction you have the right to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access" }),
          " the personal data we hold about you (GDPR Art. 15, CCPA §1798.100, PIPEDA Principle 9)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rectify" }),
          " inaccurate data (GDPR Art. 16)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Erase" }),
          " your data, subject to legal retention obligations (GDPR Art. 17, CCPA §1798.105)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Port" }),
          " your data to another service (GDPR Art. 20)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Object" }),
          " to processing based on legitimate interests (GDPR Art. 21)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Withdraw consent" }),
          " at any time (GDPR Art. 7(3))."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Non-discrimination" }),
          " for exercising your rights (CCPA §1798.125)."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "To exercise any of these rights, email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        ". We respond within 30 days (45 days for CCPA requests). California residents may designate an authorized agent in writing. EU residents may also file a complaint with their local supervisory authority; Canadian residents may file a complaint with the Office of the Privacy Commissioner of Canada."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "children", n: "10", label: "Children", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "not directed at anyone under 16." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus is a developer tool intended for use by adults in a professional context. We do not knowingly collect personal data from anyone under 16. If you believe a minor has provided us with personal data, contact us and we will delete it." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "security", n: "11", label: "Security", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "encrypted in transit and at rest." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "All traffic to satus.sh and to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/license/verify" }),
      " is served over TLS. License records are stored in an encrypted Postgres database; payment data is held by Stripe (PCI-DSS Level 1). For coordinated vulnerability disclosure, scope, and the embargo timeline, see our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/security", className: "underline decoration-[var(--signal)] underline-offset-4", children: "security policy" }),
      "."
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "changes", n: "12", label: "Changes", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "we’ll notify you of material changes." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may update this policy from time to time. Material changes will be announced by email to the address associated with your license at least 30 days before they take effect. The current version is always available at this URL with an updated effective date." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "contact", n: "13", label: "Contact", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one address. a human reads it." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PasskeyBridge LLC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "5830 E 2nd St., Ste 7000 #33652",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Casper, WY 82609",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "United States"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Email:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Web:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "satus.sh" })
      ] })
    ] }) })
  ] });
}
export {
  PrivacyPage as component
};
