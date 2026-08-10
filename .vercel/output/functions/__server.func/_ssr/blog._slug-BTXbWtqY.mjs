import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SECTIONS } from "./blog._slug-C-qnezvT.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { i as Route$b } from "./router-B2kWt1Bm.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
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
import "../_libs/lucide-react.mjs";
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
function BlogPostPage() {
  const {
    post
  } = Route$b.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { sections: SECTIONS, currentPath: "/blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { id: "post", className: "scroll-mt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "§POST" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-[var(--ink)]", children: "~/blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: post.date, children: post.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        post.readingMinutes,
        " min read"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight text-[var(--ink)] md:text-[36px]", children: post.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-[var(--ink)]/75", children: post.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-satus mt-10", dangerouslySetInnerHTML: {
      __html: post.html
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-[var(--mute)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "published ",
        post.date,
        " · ",
        post.author,
        post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " · ",
          post.tags.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i > 0 && " ",
            "·",
            t
          ] }, t))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "text-[var(--ink)] underline decoration-[var(--signal)] underline-offset-4 hover:text-[var(--signal)]", children: "← all posts" })
    ] })
  ] }) });
}
export {
  BlogPostPage as component
};
