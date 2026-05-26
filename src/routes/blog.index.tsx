/**
 * /blog — post index.
 *
 * Renders the published posts as a monospace specification table inside the
 * standard two-column PageShell. No card grid, no cover images, no excerpt
 * truncation tricks — date, title, dek, read time, in one disciplined row
 * per post. Mirrors the §-numbered Section pattern from /profiles.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/chrome";
import { Section, type SectionMeta } from "@/components/site/primitives";
import { getAllPosts, type Post } from "@/lib/blog";

const SITE_URL = "https://satus.sh";
const PATH = "/blog";

const SECTIONS: SectionMeta[] = [
  { id: "log", n: "00", label: "The log" },
  { id: "subscribe", n: "01", label: "Subscribe" },
];

export const Route = createFileRoute("/blog/")({
  /* Loader is synchronous because all posts are bundled. ensureQueryData is
   * unnecessary; the parsed POSTS array is in module scope. */
  loader: () => ({ posts: getAllPosts() }),
  head: () => ({
    meta: [
      { title: "Blog — satus.sh" },
      {
        name: "description",
        content:
          "Field notes on Postgres schemas, satus CLI changelogs, and post-mortems on seed-data edge cases. Written for engineers who ship.",
      },
      { property: "og:title", content: "Blog — satus.sh" },
      {
        property: "og:description",
        content:
          "Field notes on Postgres schemas, satus CLI changelogs, and post-mortems on seed-data edge cases.",
      },
      { property: "og:url", content: SITE_URL + PATH },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { name: "twitter:title", content: "Blog — satus.sh" },
      {
        name: "twitter:description",
        content:
          "Field notes on Postgres schemas, satus CLI changelogs, and seed-data post-mortems.",
      },
    ],
    links: [
      { rel: "canonical", href: SITE_URL + PATH },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "satus.sh blog",
        href: SITE_URL + "/blog/rss.xml",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts } = Route.useLoaderData();

  return (
    <PageShell sections={SECTIONS} currentPath={PATH}>
      <Section id="log" n="00" label="The log" title={<>field notes from the satus team.</>}>
        {posts.length === 0 ? (
          <p className="font-mono text-[13px] text-[var(--mute)]">
            No posts yet. Check back shortly.
          </p>
        ) : (
          <ol className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {posts.map((p: Post) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group grid grid-cols-[110px_1fr] gap-x-6 gap-y-1 px-1 py-5 transition-colors hover:bg-[var(--ink)]/[0.02] md:grid-cols-[130px_1fr_auto]"
                >
                  <time
                    dateTime={p.date}
                    className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--mute)]"
                  >
                    {p.date}
                  </time>
                  <div className="min-w-0">
                    <h3 className="font-mono text-[16px] font-medium leading-[1.3] text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 max-w-[62ch] text-[14px] leading-[1.55] text-[var(--ink)]/75">
                      {p.description}
                    </p>
                    {p.tags.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-x-3 font-mono text-[11px] text-[var(--mute)]">
                        {p.tags.map((t: string) => (
                          <li key={t}>·{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--mute)] md:col-start-3 md:self-start md:pt-1">
                    {p.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section id="subscribe" n="01" label="Subscribe" title={<>RSS, no email required.</>}>
        <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[var(--ink)]/85">
          We do not run a newsletter. The full feed lives at{" "}
          <a
            href="/blog/rss.xml"
            className="font-mono text-[var(--ink)] underline decoration-[var(--signal)] underline-offset-4 hover:text-[var(--signal)]"
          >
            /blog/rss.xml
          </a>
          . Add it to any reader. There are no tracking pixels in the feed
          and no cookies on this site.
        </p>
      </Section>
    </PageShell>
  );
}
