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
  id: "acceptance",
  n: "01",
  label: "Acceptance"
}, {
  id: "service",
  n: "02",
  label: "Service"
}, {
  id: "license",
  n: "03",
  label: "License"
}, {
  id: "byo-key",
  n: "04",
  label: "BYO key"
}, {
  id: "billing",
  n: "05",
  label: "Billing"
}, {
  id: "acceptable-use",
  n: "06",
  label: "Acceptable use"
}, {
  id: "warranty",
  n: "07",
  label: "Warranty"
}, {
  id: "liability",
  n: "08",
  label: "Liability"
}, {
  id: "indemnification",
  n: "09",
  label: "Indemnification"
}, {
  id: "termination",
  n: "10",
  label: "Termination"
}, {
  id: "law",
  n: "11",
  label: "Governing law"
}, {
  id: "changes",
  n: "12",
  label: "Changes"
}, {
  id: "contact",
  n: "13",
  label: "Contact"
}];
function TermsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/terms", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§00" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Legal · ToS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[32px] font-medium leading-[1.15] tracking-tight text-[var(--ink)] md:text-[40px]", children: "terms of service." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 font-mono text-[12px] text-[var(--mute)]", children: [
        "Effective: ",
        EFFECTIVE_DATE
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "acceptance", n: "01", label: "Acceptance", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "by using satus, you accept these terms." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "By installing the satus CLI, purchasing a license, or accessing the satus.sh website (collectively, the “Service”), you agree to be bound by these Terms of Service. The Service is provided by",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PasskeyBridge LLC" }),
      ", a Wyoming limited liability company (“PasskeyBridge,” “we,” or “us”). If you do not agree to these terms, do not install or use the Service."
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "service", n: "02", label: "Service", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what satus is, and what it is not." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus is a command-line tool that reads the schema of a Postgres database and produces realistic, relationally-coherent seed data. It runs entirely on your own infrastructure, against databases you control. The Service consists of:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The satus CLI binary, distributed via npm and Homebrew." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The satus.sh marketing site, blog, and documentation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "A license-verification API at ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/license/verify" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A transactional email that delivers your license key after purchase." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "satus is ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "not" }),
        " a hosted database, a managed AI service, an analytics platform, or a data-processing pipeline. We do not see, store, or transmit the rows the CLI generates on your machine."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "license", n: "03", label: "License", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "one seat, one human, non-transferable." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Subject to payment of the applicable fees, PasskeyBridge grants you a limited, non-exclusive, non-transferable, revocable license to install and use the satus CLI on machines under your control. Each license key is bound to a single named seat. You may not share your license key, resell it, embed it in a public repository, or use it to provide the satus functionality as a hosted service to third parties." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "All title and intellectual property rights in the Service remain with PasskeyBridge LLC. Nothing in these terms transfers ownership of the source code, the trademarks",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "satus" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "satus.sh" }),
        ", or the satus wordmark."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "byo-key", n: "04", label: "BYO key", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "you supply your own llm api key." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus requires an API key from a supported LLM provider (OpenAI or Anthropic) to generate column-level values. You are responsible for:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Procuring and paying for your own provider account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The token usage, costs, and rate limits incurred by your runs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Complying with the provider’s terms of service." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Treating the API key as a secret. satus reads the key from the environment and never transmits it to PasskeyBridge." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We are not a sub-processor for your LLM provider. Prompts and completions flow directly from your machine to the provider; we never see them." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "billing", n: "05", label: "Billing", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "annual licenses. stripe processed. refundable for 14 days." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Licenses are sold as monthly or annual subscriptions through Stripe. Prices are listed at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", className: "underline decoration-[var(--signal)] underline-offset-4", children: "satus.sh/pricing" }),
        " ",
        "and are charged in U.S. dollars. Subscriptions renew automatically at the end of each billing period unless cancelled at least 24 hours in advance."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Refunds." }),
        " We offer a full refund within 14 days of initial purchase, no questions asked. After 14 days the current billing period is non-refundable, except where required by applicable consumer-protection law; you may cancel future renewals at any time and continue using the CLI until the period ends. To request a refund or cancel a renewal, email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        " ",
        "with your order ID."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Taxes." }),
        " Prices are exclusive of applicable sales tax, VAT, or GST. Stripe collects taxes at checkout where required."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "acceptable-use", n: "06", label: "Acceptable use", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "don’t do illegal things with seeded data." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You agree not to use the Service to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Generate data that impersonates a real, identifiable person without consent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Produce content that is unlawful, defamatory, infringing, or harmful." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reverse-engineer, decompile, or remove the license-verification logic from the CLI." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Run satus against a production database with more than 10,000 user rows without the",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: " --force" }),
          " flag and an explicit understanding of what that flag does."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Probe, scan, or attempt to compromise the satus.sh infrastructure, license API, or any account other than your own." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may suspend or terminate licenses used in violation of this section without refund." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "warranty", n: "07", label: "Warranty", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "provided “as is.”" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. PASSKEYBRIDGE DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. YOU ASSUME ALL RISK FOR USE OF THE SERVICE AGAINST YOUR OWN DATABASES." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Backups are your responsibility." }),
        " Always run satus against a development or preview database first. Use ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--dry" }),
        " to inspect generated SQL before execution."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "liability", n: "08", label: "Liability", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "capped at fees paid in the prior twelve months." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, PASSKEYBRIDGE LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF DATA, LOST PROFITS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL CUMULATIVE LIABILITY FOR ALL CLAIMS SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "indemnification", n: "09", label: "Indemnification", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "you indemnify us for misuse." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You agree to indemnify, defend, and hold harmless PasskeyBridge LLC, its officers, and its contractors from any claims, damages, or expenses (including reasonable attorneys’ fees) arising from your use of the Service, your violation of these terms, or your violation of any law or third-party right." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "termination", n: "10", label: "Termination", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "either side may walk away." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "You may terminate your license at any time by emailing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        " ",
        "with your order ID. (A self-service Stripe customer portal is on the roadmap.) PasskeyBridge may terminate or suspend your license immediately for material breach of these terms, fraudulent payment, or use that poses a security risk to other users."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "On termination, your license key stops verifying and the CLI will refuse to run. Sections governing license ownership, warranty disclaimers, liability caps, and indemnification survive termination." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "law", n: "11", label: "Governing law", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "wyoming. arbitration. unless consumer law says otherwise." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "These Terms are governed by the laws of the State of Wyoming, United States, without regard to its conflict-of-law principles. Disputes arising out of or relating to these Terms shall be resolved through binding arbitration administered by the American Arbitration Association, except where prohibited by applicable consumer-protection law (including, but not limited to, the GDPR or PIPEDA)." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "changes", n: "12", label: "Changes", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "we’ll tell you before material changes take effect." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may revise these Terms from time to time. Material changes will be announced via the email address associated with your license at least 30 days before they take effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "contact", n: "13", label: "Contact", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "where to reach a human." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
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
  TermsPage as component
};
