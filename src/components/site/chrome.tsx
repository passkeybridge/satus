/**
 * Site chrome: TopBar, LeftRail, Footer, PageShell.
 *
 * TopBar    — Sticky header with wordmark + route-level nav + build tag.
 *             Nav uses TanStack <Link> for type-safe routing and active state.
 * LeftRail  — Per-page sticky 240px column. Shows the page's own TOC with
 *             scroll-spy via IntersectionObserver, plus a "Document" metadata
 *             block and links to the other site routes.
 * Footer    — Hairline-bordered three-column footer + copyright strip.
 * PageShell — Two-column layout wrapper used by every route.
 *
 * The chrome is intentionally identical across routes — each route only
 * supplies its own sections array and content.
 */

import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import type { SectionMeta } from "./primitives";

/* ------------------------------------------------------------------ *
 * Route-level navigation. Defined once, used by TopBar and LeftRail. *
 * ------------------------------------------------------------------ */

export const SITE_NAV = [
  { to: "/", label: "~/overview" },
  { to: "/profiles", label: "~/profiles" },
  { to: "/pricing", label: "~/pricing" },
  { to: "/quickstart", label: "~/quickstart" },
] as const;

/* ------------------ TopBar ------------------ */

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-[var(--paper)]/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          className="flex items-baseline gap-0 font-mono text-[15px] font-medium tracking-tight text-[var(--ink)]"
          aria-label="satus.ai home"
        >
          <span>satus</span>
          <span className="text-[var(--signal)]">.</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 font-mono text-[12px] text-[var(--mute)] md:flex"
        >
          {SITE_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[var(--ink)]" }}
              inactiveProps={{ className: "hover:text-[var(--ink)]" }}
              className="transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden font-mono text-[11px] text-[var(--mute)] sm:inline">
            v0.1.0-alpha
          </span>
          <a
            href="https://github.com"
            rel="noopener noreferrer"
            target="_blank"
            className="font-mono text-[12px] text-[var(--ink)] transition-opacity hover:opacity-70"
          >
            github ↗
          </a>
        </div>
      </div>

      {/* Mobile-only secondary nav row. The primary <nav> above is md:flex
       *  (hidden < 768px) because four monospace nav items don't fit alongside
       *  the wordmark and the github link on phones. This strip keeps the
       *  routes one tap away without a hamburger menu — on-brand for a
       *  documentation-style site. */}
      <nav
        aria-label="Primary mobile"
        className="flex items-center gap-5 overflow-x-auto border-t border-[var(--hairline)] bg-[var(--paper)] px-6 py-2 font-mono text-[12px] text-[var(--mute)] md:hidden"
      >
        {SITE_NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[var(--ink)]" }}
            inactiveProps={{ className: "hover:text-[var(--ink)]" }}
            className="shrink-0 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/* ------------------ LeftRail ------------------ */

/**
 * Per-page sidebar. Pass the route's own sections; scroll-spy will track them.
 * `currentPath` is used to dim the "you are here" entry in the page index.
 */
export function LeftRail({
  sections,
  currentPath,
}: {
  sections: ReadonlyArray<SectionMeta>;
  currentPath: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 overflow-y-auto border-r border-[var(--hairline)] py-10 pr-6 lg:block">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
        On this page
      </div>
      <ol className="mt-5 space-y-px">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-baseline gap-3 px-2 py-1.5 font-mono text-[12.5px] transition-colors ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                <span className={isActive ? "text-[var(--paper)]/70" : "text-[var(--mute)]"}>
                  {s.n}
                </span>
                <span className="truncate">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 border-t border-[var(--hairline)] pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          Specification
        </div>
        <ol className="mt-3 space-y-px">
          {SITE_NAV.map((item) => {
            const isHere = item.to === currentPath;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block px-2 py-1.5 font-mono text-[12.5px] transition-colors ${
                    isHere
                      ? "text-[var(--ink)]/60"
                      : "text-[var(--mute)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                  {isHere && <span className="ml-2 text-[var(--mute)]">·</span>}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-10 border-t border-[var(--hairline)] pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          Document
        </div>
        <dl className="mt-3 space-y-1.5 font-mono text-[11.5px] text-[var(--mute)]">
          <Meta k="spec" v="satus/0.1" />
          <Meta
            k="status"
            v={
              <span>
                <span className="text-[var(--signal)]">●</span> draft
              </span>
            }
          />
          <Meta k="updated" v="2026-05-25" />
          <Meta k="author" v="satus.ai" />
        </dl>
      </div>
    </aside>
  );
}

function Meta({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt>{k}</dt>
      <dd className="text-[var(--ink)]">{v}</dd>
    </div>
  );
}

/* ------------------ Footer ------------------ */

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--ink)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-10 font-mono text-[12px] md:grid-cols-4 lg:px-10">
        <div>
          <div className="flex items-baseline">
            <span className="text-[14px] font-medium text-[var(--ink)]">satus</span>
            <span className="text-[var(--signal)]">.</span>
          </div>
          <p className="mt-3 max-w-[34ch] font-sans text-[13px] leading-[1.6] text-[var(--mute)]">
            <em className="not-italic text-[var(--ink)]">Satus</em> — Latin: a beginning, a planting,
            a sown thing.
          </p>
        </div>
        <FooterCol
          title="product"
          links={[
            ["overview", "/"],
            ["profiles", "/profiles"],
            ["pricing", "/pricing"],
          ]}
        />
        <FooterCol
          title="resources"
          links={[
            ["quickstart", "/quickstart"],
            ["github", "https://github.com"],
          ]}
        />
        <FooterCol
          title="legal"
          links={[["contact", "mailto:hello@satus.ai"]]}
        />
      </div>
      <div className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 font-mono text-[11px] text-[var(--mute)] lg:px-10">
          <span>© {new Date().getFullYear()} satus.ai. A PasskeyBridge LLC service.</span>
          <span>built in plain text · no cookies on this page</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">{title}</div>
      <ul className="mt-3 space-y-1.5">
        {links.map(([label, href]) => {
          const isInternal = href.startsWith("/");
          return (
            <li key={label}>
              {isInternal ? (
                <Link
                  to={href}
                  className="text-[var(--ink)]/85 transition-colors hover:text-[var(--signal)]"
                >
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  className="text-[var(--ink)]/85 transition-colors hover:text-[var(--signal)]"
                >
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------ PageShell ------------------ */

/**
 * Standard two-column page wrapper. Each route renders:
 *   <PageShell sections={...} currentPath="/profiles">
 *     <SectionA /><SectionB />
 *   </PageShell>
 */
export function PageShell({
  children,
  sections,
  currentPath,
}: {
  children: ReactNode;
  sections: ReadonlyArray<SectionMeta>;
  currentPath: string;
}) {
  return (
    <div className="satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TopBar />
      <div className="mx-auto flex max-w-[1280px] px-6 lg:px-10">
        <LeftRail sections={sections} currentPath={currentPath} />
        <main className="min-w-0 flex-1 py-10 lg:pl-12">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
