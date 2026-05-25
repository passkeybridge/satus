import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "satus — relationally-coherent seed data for Postgres" },
      {
        name: "description",
        content:
          "A CLI that reads your Postgres schema and produces realistic, relationally-coherent seed data in seconds. Postgres only. CLI only.",
      },
      { name: "author", content: "satus.sh" },
      { name: "theme-color", content: "#fafaf7" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "satus" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@satusdev" },
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
  }),
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
      <Outlet />
    </QueryClientProvider>
  );
}
