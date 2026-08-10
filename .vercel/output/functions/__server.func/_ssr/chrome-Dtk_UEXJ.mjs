import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as SATUS_VERSION_TAG, j as SATUS_SPEC, c as SATUS_RELEASED_AT } from "./router-B2kWt1Bm.mjs";
import { X, M as Menu } from "../_libs/lucide-react.mjs";
const SITE_NAV = [
  { to: "/", label: "~/overview" },
  { to: "/demo", label: "~/demo" },
  { to: "/profiles", label: "~/profiles" },
  { to: "/pricing", label: "~/pricing" },
  { to: "/docs", label: "~/docs" },
  { to: "/blog", label: "~/blog" }
];
function TopBar() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  reactExports.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-[var(--hairline)] bg-[var(--paper)]/95 backdrop-blur-[2px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-baseline gap-0 font-mono text-[15px] font-medium tracking-tight text-[var(--ink)]",
          "aria-label": "satus.sh home",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "satus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          "aria-label": "Primary",
          className: "hidden items-center gap-7 font-mono text-[12px] text-[var(--mute)] md:flex",
          children: SITE_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.to,
              activeOptions: { exact: true },
              activeProps: {
                className: "text-[var(--ink)]",
                "aria-current": "page"
              },
              inactiveProps: { className: "hover:text-[var(--ink)]" },
              className: "transition-colors",
              children: item.label
            },
            item.to
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden font-mono text-[11px] text-[var(--mute)] sm:inline", children: SATUS_VERSION_TAG }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/quickstart",
            className: "hidden font-mono text-[12px] text-[var(--ink)] transition-opacity hover:opacity-70 md:inline",
            children: "install →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            "aria-expanded": mobileOpen,
            "aria-controls": "mobile-nav-drawer",
            onClick: () => setMobileOpen((v) => !v),
            className: "-mr-2 inline-flex h-9 w-9 items-center justify-center text-[var(--ink)] md:hidden",
            children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Close menu",
          onClick: () => setMobileOpen(false),
          className: "fixed inset-0 top-14 z-30 bg-[var(--ink)]/20 md:hidden"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          id: "mobile-nav-drawer",
          "aria-label": "Primary mobile",
          className: "absolute inset-x-0 top-full z-40 border-b border-[var(--hairline)] bg-[var(--paper)] md:hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mx-auto max-w-[1280px] px-6 py-3", children: [
            SITE_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-b border-[var(--hairline)] last:border-b-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: item.to,
                activeOptions: { exact: true },
                activeProps: {
                  className: "text-[var(--ink)]",
                  "aria-current": "page"
                },
                inactiveProps: { className: "text-[var(--mute)] hover:text-[var(--ink)]" },
                className: "block py-3 font-mono text-[14px] transition-colors",
                children: item.label
              }
            ) }, item.to)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mt-2 border-t border-[var(--ink)] pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/quickstart",
                className: "block py-2 font-mono text-[13px] text-[var(--ink)]",
                children: "install →"
              }
            ) })
          ] })
        }
      )
    ] })
  ] });
}
function LeftRail({
  sections,
  currentPath
}) {
  const [active, setActive] = reactExports.useState(sections[0]?.id ?? "");
  reactExports.useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 overflow-y-auto border-r border-[var(--hairline)] py-10 pr-6 xl:block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "On this page" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-5 space-y-px", children: sections.map((s) => {
      const isActive = active === s.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `#${s.id}`,
          "aria-current": isActive ? "location" : void 0,
          className: `flex items-baseline gap-3 px-2 py-1.5 font-mono text-[12.5px] transition-colors ${isActive ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--mute)] hover:text-[var(--ink)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "text-[var(--paper)]/70" : "text-[var(--mute)]", children: s.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: s.label })
          ]
        }
      ) }, s.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-[var(--hairline)] pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "Specification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-3 space-y-px", children: SITE_NAV.map((item) => {
        const isHere = item.to === currentPath;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: `block px-2 py-1.5 font-mono text-[12.5px] transition-colors ${isHere ? "text-[var(--ink)]/60" : "text-[var(--mute)] hover:text-[var(--ink)]"}`,
            children: [
              item.label,
              isHere && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[var(--mute)]", children: "·" })
            ]
          }
        ) }, item.to);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-[var(--hairline)] pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: "Document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 space-y-1.5 font-mono text-[11.5px] text-[var(--mute)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { k: "spec", v: SATUS_SPEC }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Meta,
          {
            k: "status",
            v: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "●" }),
              " ",
              SATUS_VERSION_TAG
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { k: "updated", v: SATUS_RELEASED_AT }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { k: "author", v: "satus.sh" })
      ] })
    ] })
  ] });
}
function Meta({ k, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-[var(--ink)]", children: v })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-16 border-t border-[var(--ink)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1280px] gap-10 px-6 py-10 font-mono text-[12px] md:grid-cols-4 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[var(--ink)]", children: "satus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-[34ch] font-sans text-[13px] leading-[1.6] text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-[var(--ink)]", children: "Satus" }),
          "—Latin: a beginning, a planting, a sown thing."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          title: "product",
          links: [
            ["overview", "/"],
            ["how it works", "/docs/how-it-works"],
            ["github action", "/docs/github-action"],
            ["profiles", "/profiles"],
            ["compare", "/compare"],
            ["pricing", "/pricing"]
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          title: "resources",
          links: [
            ["docs", "/docs"],
            ["quickstart", "/quickstart"],
            ["cli reference", "/cli"],
            ["recipes", "/recipes"],
            ["troubleshooting", "/docs/troubleshooting"],
            ["blog", "/blog"],
            ["rss", "/blog/rss.xml"]
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          title: "contact",
          links: [
            ["satus", "https://satus.sh"],
            ["support@satus.sh", "mailto:support@satus.sh"],
            ["security", "/security"],
            ["terms", "/terms"],
            ["privacy", "/privacy"]
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[var(--hairline)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 font-mono text-[11px] text-[var(--mute)] lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " satus.sh. A",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://passkeybridge.io",
            target: "_blank",
            rel: "noopener",
            className: "underline decoration-[var(--signal)] underline-offset-4 hover:text-[var(--ink)]",
            children: "PasskeyBridge LLC"
          }
        ),
        " ",
        "service."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "built in plain text · no cookies on this page" })
    ] }) })
  ] });
}
function FooterCol({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: links.map(([label, href]) => {
      const isInternal = href.startsWith("/");
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: isInternal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: href,
          className: "text-[var(--ink)]/85 transition-colors hover:text-[var(--signal)]",
          children: label
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href,
          className: "text-[var(--ink)]/85 transition-colors hover:text-[var(--signal)]",
          children: label
        }
      ) }, label);
    }) })
  ] });
}
function PageShell({
  children,
  sections,
  currentPath
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1280px] px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeftRail, { sections, currentPath }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0 flex-1 py-10 xl:pl-12", children })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Footer as F,
  PageShell as P,
  TopBar as T
};
