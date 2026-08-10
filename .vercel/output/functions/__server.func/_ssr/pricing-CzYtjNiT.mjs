import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { F as FAQ } from "./router-B2kWt1Bm.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function WaitlistForm({ defaultTier = "pro" }) {
  const [tier, setTier] = reactExports.useState(defaultTier);
  const [email, setEmail] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/public/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          tier,
          note: note.trim() || void 0,
          source: "pricing"
        })
      });
      if (res.status === 429) return setStatus("rate_limited");
      if (!res.ok) return setStatus("error");
      setStatus("ok");
      setEmail("");
      setNote("");
    } catch {
      setStatus("error");
    }
  }
  const submitting = status === "submitting";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "form",
    {
      onSubmit,
      className: "mt-6 max-w-[640px] border border-[var(--hairline)] bg-white/40 p-6",
      noValidate: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-5", disabled: submitting, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "Tier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-0 border border-[var(--ink)]", children: ["pro", "team"].map((t) => {
            const active = tier === t;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTier(t),
                "aria-pressed": active,
                className: `flex-1 py-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${active ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-transparent text-[var(--ink)] hover:bg-[var(--ink)]/5"}`,
                children: t
              },
              t
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "waitlist-email",
              className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "waitlist-email",
              type: "email",
              required: true,
              autoComplete: "email",
              inputMode: "email",
              maxLength: 254,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@company.com",
              className: "mt-2 block w-full border border-[var(--ink)] bg-transparent px-3 py-2 font-mono text-[14px] text-[var(--ink)] placeholder:text-[var(--mute)] focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "waitlist-note",
              className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]",
              children: [
                "Note ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lowercase tracking-normal", children: "(optional, 500 chars)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "waitlist-note",
              rows: 3,
              maxLength: 500,
              value: note,
              onChange: (e) => setNote(e.target.value),
              placeholder: "What schema are you generating data for?",
              className: "mt-2 block w-full resize-y border border-[var(--ink)] bg-transparent px-3 py-2 font-sans text-[14px] leading-[1.5] text-[var(--ink)] placeholder:text-[var(--mute)] focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "inline-flex h-10 items-center bg-[var(--ink)] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] disabled:opacity-60",
              children: submitting ? "submitting…" : "join waitlist"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-[var(--mute)]", children: "no marketing email · one note when the tier opens" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            role: "status",
            "aria-live": "polite",
            className: "min-h-[1.25rem] font-mono text-[12px]",
            children: [
              status === "ok" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--ink)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "●" }),
                " recorded. you’ll hear from us when ",
                tier,
                " opens."
              ] }),
              status === "rate_limited" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "● too many submissions from this network. try again in a few minutes." }),
              status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "● could not record signup. please retry or email support@satus.sh." })
            ]
          }
        )
      ] })
    }
  );
}
const SECTIONS = [{
  id: "tiers",
  n: "04",
  label: "Tiers"
}, {
  id: "waitlist",
  n: "05",
  label: "Waitlist"
}, {
  id: "faq",
  n: "06",
  label: "FAQ"
}];
const TIERS = [{
  id: "free",
  name: "Free",
  price: "$0",
  cadence: "free tier · 25 rows × 5 tables",
  cta: "install from npm",
  href: "/quickstart",
  primary: false,
  secondary: null
}, {
  id: "pro",
  name: "Pro",
  price: "$19",
  cadence: "per month · or $190/yr",
  cta: "subscribe monthly",
  href: "/checkout?price=satus_pro_monthly",
  primary: true,
  secondary: {
    label: "or pay annually ($190)",
    href: "/checkout?price=satus_pro_yearly"
  }
}, {
  id: "team",
  name: "Team",
  price: "$49",
  cadence: "per seat · monthly (waitlist)",
  cta: "join the waitlist",
  href: "#waitlist",
  primary: false,
  secondary: null
}];
const FEATURES = [{
  label: "CLI core",
  row: [{
    mark: true
  }, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "Bring-your-own LLM key",
  row: [{
    mark: true
  }, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "Built-in profiles (saas/ecommerce/b2b)",
  row: [{
    mark: true
  }, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "Row & table caps lifted",
  row: [null, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "License, 14-day offline grace",
  row: [null, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "Priority issue triage",
  row: [null, {
    mark: true
  }, {
    mark: true
  }]
}, {
  label: "Shared team profiles",
  row: [null, null, {
    mark: true
  }]
}, {
  label: "CI mode",
  row: [null, null, {
    mark: true
  }]
}, {
  label: "Audit log",
  row: [null, null, {
    mark: true
  }]
}, {
  label: "Invoiced billing",
  row: [null, null, {
    mark: true
  }]
}];
function PricingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/pricing", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "tiers", n: "04", label: "Tiers", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "honest, narrow, easy to leave." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bring-your-own LLM key on every tier. We don’t resell tokens." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-mono text-[11px] text-[var(--mute)] md:hidden", children: "scroll table →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 max-w-[860px] overflow-x-auto md:mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px] border-collapse font-mono text-[13px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-y border-[var(--ink)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[44%] py-3 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]", children: "Feature" }),
          TIERS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `py-3 text-left text-[11px] uppercase tracking-[0.18em] ${t.primary ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] text-[var(--ink)]" : "text-[var(--mute)]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--ink)]", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-sans text-[11px] normal-case tracking-normal text-[var(--mute)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--ink)]", children: t.price }),
              " · ",
              t.cadence
            ] })
          ] }) }, t.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[var(--hairline)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-[var(--ink)]/85", children: f.label }),
            f.row.map((cell, ci) => {
              const isPrimary = TIERS[ci].primary;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `py-2.5 ${isPrimary ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] px-4" : "px-4"}`, children: cell && typeof cell === "object" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "●" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--hairline)]", children: "—" }) }, ci);
            })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {}),
            TIERS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: `pb-2 pt-5 ${t.primary ? "border-l border-r border-l-[var(--signal)] border-r-[var(--hairline)] px-4" : "px-4"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: t.href, className: `inline-flex h-9 items-center whitespace-nowrap px-3 text-[11px] uppercase tracking-[0.16em] transition-colors ${t.primary ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--signal)]" : "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"}`, children: t.cta }),
              t.secondary && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: t.secondary.href, className: "mt-2 block font-mono text-[11px] text-[var(--mute)] underline-offset-2 hover:text-[var(--signal)] hover:underline", children: t.secondary.label })
            ] }, t.id))
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "waitlist", n: "05", label: "Waitlist", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "two fields, no marketing list." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Pro is live, billable on the card above. Team opens when ten organizations have asked for it. Drop your email, pick the tier, and that’s the entire ceremony. One email when your tier ships; nothing else." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WaitlistForm, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "faq", n: "06", label: "FAQ", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "questions we get before the receipt." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-2 max-w-[760px] divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: FAQ.map(({
      q,
      a
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "font-mono text-[14px] font-medium text-[var(--ink)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-3 text-[var(--signal)]", children: "Q." }),
        q
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-3 max-w-[64ch] pl-7 text-[15px] leading-[1.65] text-[var(--ink)]/80", children: a })
    ] }, q)) }) })
  ] });
}
export {
  PricingPage as component
};
