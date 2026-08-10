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
const SECURITY_CONTACT = "mailto:support@satus.sh?subject=Security%20report";
const SECTIONS = [{
  id: "report",
  n: "01",
  label: "Report a vulnerability"
}, {
  id: "expect",
  n: "02",
  label: "What to expect"
}, {
  id: "scope",
  n: "03",
  label: "Scope"
}, {
  id: "data",
  n: "04",
  label: "Data & keys"
}, {
  id: "infrastructure",
  n: "05",
  label: "Infrastructure"
}, {
  id: "safe-harbor",
  n: "06",
  label: "Safe harbor"
}];
function SecurityPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/security", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-[var(--hairline)] pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§00" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Security policy · v1 · 2026-05-26" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 max-w-[22ch] font-mono text-[34px] font-medium leading-[1.1] tracking-tight text-[var(--ink)] md:text-[44px]", children: "report it. we'll fix it. we'll credit you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 max-w-[62ch] text-[15.5px] leading-[1.7] text-[var(--ink)]/85", children: [
        "satus takes the security of the CLI, the marketing site, and the license-verification API seriously. This page is the canonical coordinated-disclosure contract; an RFC 9116-style",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "SECURITY.md" }),
        " mirrors it inside the (currently private) source repository for tooling that expects a repo-root file. To report a vulnerability, email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SECURITY_CONTACT, className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "report", n: "01", label: "Report a vulnerability", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "email, not issues." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@satus.sh?subject=SECURITY%3A%20", className: "underline decoration-[var(--signal)] underline-offset-4", children: "support@satus.sh" }),
        " ",
        "with a subject line beginning ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "SECURITY:" }),
        " followed by a short summary. Until a dedicated ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "security@" }),
        " mailbox is published per RFC 9116, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "support@" }),
        " is the canonical address and is monitored by a human on every business day."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please include:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A description of the issue and its impact." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reproduction steps, a proof-of-concept, or a minimal failing schema." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "The affected version (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus --version" }),
          ") and runtime (Node version, operating system)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your preferred name and contact for credit, or a request to remain anonymous." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Please do ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "not" }),
        " open public GitHub issues, post to social media, or share details with third parties before we have had a chance to respond."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "expect", n: "02", label: "What to expect", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "2 days, 7 days, 90 days." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Acknowledgement" }),
        " within ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "2 business days" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Triage decision" }),
        " (accepted, needs more info, not a vulnerability) within ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "7 business days" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Coordinated disclosure timeline" }),
        " agreed with the reporter. Default embargo is ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "90 days" }),
        " from triage, shortened if a fix ships sooner."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Credit" }),
        " in the release notes for the fix, unless anonymity is requested."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "scope", n: "03", label: "Scope", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what counts, what doesn't." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "In scope:" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "The satus CLI—the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus" }),
          " binary distributed on npm and Homebrew."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "The satus.sh marketing site and the license-verification API (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/license/verify" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/payments/webhook" }),
          ")."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "License-delivery emails sent from PasskeyBridge LLC infrastructure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Out of scope:" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Issues that require physical access to a user's machine." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Denial-of-service via deliberate misuse of the user's own LLM API key quota." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Social engineering of PasskeyBridge LLC staff or customers." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Findings on third-party services (Stripe, the user's chosen LLM provider, the user's database). Please report those to the respective vendors." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "data", n: "04", label: "Data & keys", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "your data stays on your machine." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "satus is a CLI you run locally or in your own CI. The schema it introspects, the rows it generates, and the database it writes to never traverse PasskeyBridge LLC infrastructure." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "LLM API key." }),
          " Bring-your-own. The key is read from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "OPENAI_API_KEY" }),
          " or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "ANTHROPIC_API_KEY" }),
          " ",
          "at runtime, sent directly from your machine to the provider you selected, and never proxied through satus.sh."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Database URL." }),
          " Read from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "DATABASE_URL" }),
          " ",
          "at runtime. satus connects directly to your Postgres; we never see the connection string or the data it returns."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Telemetry." }),
          " Off by default. No automatic schema uploads, no command-line argument collection."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "License records." }),
          " Email address, Stripe customer ID, and license key are stored in an encrypted Postgres database managed by PasskeyBridge LLC. See the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacy", className: "underline decoration-[var(--signal)] underline-offset-4", children: "privacy policy" }),
          " ",
          "for retention."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "infrastructure", n: "05", label: "Infrastructure", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "encrypted in transit and at rest." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "TLS everywhere." }),
        " All traffic to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "satus.sh" }),
        " and to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/public/license/verify" }),
        " is served over TLS terminated at Cloudflare."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Encrypted at rest." }),
        " License records live in a Supabase-managed Postgres database with disk-level encryption."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Payments." }),
        " Card data is handled exclusively by Stripe (PCI-DSS Level 1). satus.sh never sees a primary account number; we store only the Stripe customer ID and the resulting license key."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Webhooks." }),
        " The Stripe webhook endpoint verifies the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Stripe-Signature" }),
        " HMAC on every request before touching the database."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Secrets." }),
        " Service-role credentials are held in Cloudflare Workers environment variables and are never exposed to the browser bundle."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "safe-harbor", n: "06", label: "Safe harbor", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "good-faith research is welcome." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We will not pursue legal action against researchers who:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Make a good-faith effort to comply with this policy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Avoid privacy violations, data destruction, and service degradation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Give us reasonable time to remediate before public disclosure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: "Thank you for helping keep satus.sh users safe." })
    ] }) })
  ] });
}
export {
  SecurityPage as component
};
