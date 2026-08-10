import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as Route$j, P as PATH } from "./router-B2kWt1Bm.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
const SECTIONS = [{
  id: "log",
  n: "00",
  label: "The log"
}, {
  id: "subscribe",
  n: "01",
  label: "Subscribe"
}];
function BlogIndexPage() {
  const {
    posts
  } = Route$j.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: PATH, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "log", n: "00", label: "The log", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "field notes from the satus team." }), children: posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[13px] text-[var(--mute)]", children: "No posts yet. Check back shortly." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]", children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
      slug: p.slug
    }, className: "group grid grid-cols-[110px_1fr] gap-x-6 gap-y-1 px-1 py-5 transition-colors hover:bg-[var(--ink)]/[0.02] md:grid-cols-[130px_1fr_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: p.date, className: "font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--mute)]", children: p.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[16px] font-medium leading-[1.3] text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 max-w-[62ch] text-[14px] leading-[1.55] text-[var(--ink)]/75", children: p.description }),
        p.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 flex flex-wrap gap-x-3 font-mono text-[11px] text-[var(--mute)]", children: p.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "·",
          t
        ] }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "col-start-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--mute)] md:col-start-3 md:self-start md:pt-1", children: [
        p.readingMinutes,
        " min"
      ] })
    ] }) }, p.slug)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "subscribe", n: "01", label: "Subscribe", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "RSS, no email required." }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-[62ch] text-[15px] leading-[1.65] text-[var(--ink)]/85", children: [
      "We do not run a newsletter. The full feed lives at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/blog/rss.xml", className: "font-mono text-[var(--ink)] underline decoration-[var(--signal)] underline-offset-4 hover:text-[var(--signal)]", children: "/blog/rss.xml" }),
      ". Add it to any reader. There are no tracking pixels in the feed and no cookies on this site."
    ] }) })
  ] });
}
export {
  BlogIndexPage as component
};
