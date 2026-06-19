import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

import appCss from "../styles.css?url";
import { PaymentTestModeBanner } from "@/components/site/PaymentTestModeBanner";

/* ------------------------------------------------------------------ *
 * Boundary components.
 *
 * Both 404 and error states are dressed in the Swiss-Red technical-spec
 * system: mono labels, hairline rules, single signal-red glyph. No rounded
 * corners, no gradients, no shadcn defaults. They share the structure of a
 * Section block from the rest of the site so a user dropped here doesn't
 * feel like they've left the document.
 * ------------------------------------------------------------------ */

function BoundaryShell({
  code,
  label,
  title,
  detail,
  children,
}: {
  code: string;
  label: string;
  title: string;
  detail?: string;
  children: React.ReactNode;
}) {
  return (
    <main
      role="main"
      className="satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]"
    >
      <div className="mx-auto w-full max-w-[640px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§{code}</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>{label}</span>
        </div>
        <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
          {title}
        </h1>
        <hr className="mt-6" />
        {detail && (
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80">
            {detail}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
      </div>
    </main>
  );
}

/* Reusable action buttons keep the boundary CTAs visually identical to the
 * pricing table's primary/secondary pair. */
function PrimaryAction(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
    />
  );
}

function SecondaryLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
    >
      {children}
    </Link>
  );
}

function NotFoundComponent() {
  return (
    <BoundaryShell
      code="404"
      label="Not found"
      title="this address isn't in the specification."
      detail="The page you requested doesn't exist or has moved. Nothing was logged about you for arriving here."
    >
      <SecondaryLink to="/">go home</SecondaryLink>
      <SecondaryLink to="/quickstart">read the quickstart</SecondaryLink>
    </BoundaryShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  // Surface the error in the dev console so we can triage in production logs,
  // but never render error.message to users (it can leak stack-trace internals).
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.error("[satus] route error:", error);
  }
  const router = useRouter();

  return (
    <BoundaryShell
      code="ERR"
      label="Route failed"
      title="something broke while rendering this page."
      detail="A transient error stopped the page from loading. Retrying will re-run the loader; going home will reset the route."
    >
      <PrimaryAction
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        retry
      </PrimaryAction>
      <SecondaryLink to="/">go home</SecondaryLink>
    </BoundaryShell>
  );
}

/**
 * Root loader: capture the request host server-side so head() can mark
 * preview/staging origins as noindex. `createIsomorphicFn` swaps a no-op
 * on the client for a server-only implementation that reads the request
 * host through `@tanstack/react-start/server`. Routing the server-only
 * dependency through `src/lib/request-host.server.ts` keeps it out of
 * the client bundle graph (filename-based import protection).
 *
 * Rationale: rel=canonical to https://satus.sh already consolidates
 * ranking signals away from lovable.app subdomains; this is the
 * belt-and-suspenders crawler hint for any host other than the canonical.
 */
const getHost = createIsomorphicFn()
  .client(() => "")
  .server(() => {
    // Lazy require keeps the server-only module out of the client graph
    // even though createIsomorphicFn already swaps the impl per env.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readRequestHost } = require("@/lib/request-host.server") as {
      readRequestHost: () => string;
    };
    return readRequestHost();
  });

function rootLoader() {
  return { host: getHost() };
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: rootLoader,
  head: ({ loaderData }) => {
    const host = loaderData?.host ?? "";
    // Match any lovable-managed preview/published host (id-preview--*.lovable.app
    // and satus.lovable.app). Custom domains satus.sh / www.satus.sh remain
    // fully indexable.
    const isPreviewHost = host.endsWith(".lovable.app");
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Hostname-conditional noindex: belt-and-suspenders on top of the
      // per-route rel=canonical pointing at https://satus.sh.
      ...(isPreviewHost
        ? [{ name: "robots", content: "noindex, nofollow" }]
        : []),
      { title: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      {
        name: "description",
        content:
          "CLI that reads your Postgres schema and writes realistic, FK-safe seed data in seconds. Postgres only. CLI only.",
      },
      { name: "author", content: "satus.sh" },
      { name: "theme-color", content: "#fafaf7" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "satus" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@satusdev" },
      { property: "og:title", content: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      { name: "twitter:title", content: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      { property: "og:description", content: "Realistic, FK-safe Postgres seed data. satus reads your schema, resolves dependencies, and writes inserts that load on the first try." },
      { name: "twitter:description", content: "Realistic, FK-safe Postgres seed data. satus reads your schema, resolves dependencies, and writes inserts that load on the first try." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // SVG favicon stays sharp at any DPR; modern browsers prefer it over .ico.
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      // 180×180 PNG fallback for Safari iOS home-screen / pinned-tab. Without
      // this Safari grabs a page screenshot, which renders the Swiss-Red shell
      // as an illegible thumbnail.
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      // Ahrefs Web Analytics. Privacy-respecting, cookieless pageview
      // tracking. Loaded async so it never blocks the document; the data-key
      // binds the script to the satus.sh property in the Ahrefs dashboard.
      {
        src: "https://analytics.ahrefs.com/analytics.js",
        "data-key": "rwXxEkXYUzPB4EEg0oXcPw",
        async: true,
      },
      // Sitewide Organization schema. Identifies the publisher (PasskeyBridge
      // LLC) and product (satus) for Google Knowledge Graph and generative
      // engines. Logo points at the favicon; sameAs lists canonical
      // off-site identities so disambiguation across the web is unambiguous.
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://satus.sh/#org",
              name: "satus",
              legalName: "PasskeyBridge LLC",
              url: "https://satus.sh",
              logo: "https://satus.sh/favicon.svg",
              email: "support@satus.sh",
              sameAs: [
                "https://github.com/passkeybridge/satus",
                "https://www.npmjs.com/package/@passkeybridge/satus",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://satus.sh/#site",
              url: "https://satus.sh",
              name: "satus.sh",
              publisher: { "@id": "https://satus.sh/#org" },
              inLanguage: "en",
            },
          ],
        }),
      },
    ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Renders nothing in production (live token); a hairline test-mode
       *  strip in preview. Mounted globally so checkout, success, and
       *  cancel routes all carry the same disclosure. */}
      <PaymentTestModeBanner />
      <Outlet />
    </QueryClientProvider>
  );
}
