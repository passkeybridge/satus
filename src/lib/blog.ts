/**
 * Blog content loader.
 *
 * Posts live as `.md` files under `src/content/blog/` and are bundled into
 * the Worker at build time via `import.meta.glob`. No filesystem reads at
 * runtime, Cloudflare Workers safe.
 *
 * Frontmatter contract is documented in `src/content/blog/README.md`.
 * Validation is intentionally strict, and is enforced in two places:
 *
 *   - `scripts/validate-blog.mjs` runs before `vite build` and fails the
 *     deploy. This is where a malformed post is meant to be caught.
 *   - `parsePost` below re-validates at runtime; a post that somehow fails
 *     here is skipped with a console error rather than thrown, so it can
 *     never take the whole site down (see the POSTS comment).
 *
 * Until 2026-08-10 this comment claimed malformed posts were "a build-time
 * error, not a runtime surprise". They were exactly the opposite: the
 * check lived only inside parsePost, which `vite build` never evaluates.
 *
 * Frontmatter parsing is intentionally hand-rolled. The third-party
 * gray-matter package depends on Node's Buffer global, which is absent in
 * the browser bundle and stubbed unevenly in the Worker runtime. Our
 * frontmatter dialect is a tiny, controlled subset of YAML (scalars,
 * inline arrays, booleans, ISO dates), so a 30-line parser is both safer
 * and a smaller dependency surface for acquisition review.
 */

import { marked } from "marked";
import { z } from "zod";

/* GFM gives us tables + autolinks; pedantic off so we accept the lightly
 * extended CommonMark engineers actually write. */
marked.setOptions({ gfm: true, breaks: false });

/* Single source of truth for the frontmatter contract. Zod emits an actual
 * error path on malformed posts (e.g. "title: Required at draft.md"). */
const FrontmatterSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: z.string().min(1).max(140),
  description: z.string().min(20).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO YYYY-MM-DD"),
  author: z.string().min(1).max(80).default("satus.sh"),
  tags: z.array(z.string().min(1).max(40)).max(8).default([]),
  draft: z.boolean().default(false),
  /**
   * Optional embargo instant. Until it passes, the post is invisible to
   * every public accessor below — index, slug lookup, RSS, sitemap.
   *
   * Must carry an explicit UTC offset (`Z` or `±HH:MM`). `date` is a bare
   * calendar day and is display metadata; this is an absolute instant, and
   * an offsetless string would be read as the *server's* local time, which
   * on Workers is UTC and almost never what the author meant. Requiring the
   * offset also makes DST the author's problem at write time rather than a
   * silent one-hour drift at publish time: 09:00 EDT is `-04:00`, 09:00 EST
   * is `-05:00`.
   *
   * Omit it for immediate publication. `draft: true` still wins outright.
   */
  publishAt: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/,
      "publishAt must be ISO 8601 with an explicit offset, e.g. 2026-08-28T09:00:00-04:00",
    )
    .optional(),
  ogImage: z.string().min(1).max(200).optional(),
});

export type PostFrontmatter = z.infer<typeof FrontmatterSchema>;

export interface Post extends PostFrontmatter {
  /** Pre-rendered HTML body. Safe to inject, content is authored in-house. */
  html: string;
  /** Plain-text body, derived from markdown. Used for RSS description. */
  excerpt: string;
  /** Estimated read time in minutes, rounded up, minimum 1. */
  readingMinutes: number;
  /**
   * `publishAt` as epoch milliseconds, or null when unset. Parsed once at
   * module scope so the per-request visibility check is an integer compare
   * rather than a `Date` construction per post per request.
   */
  publishAtMs: number | null;
}

/* eager:true bundles content at build time. query:'?raw' pulls the markdown
 * source as a string instead of trying to module-load it. The README is
 * filtered out by filename so it doesn't ship as a (malformed) post. */
const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Minimal YAML-ish frontmatter parser.
 *
 * Supports the exact shapes our posts use:
 *   key: scalar              (string, number, boolean, ISO date)
 *   key: "quoted string"     (double or single quotes)
 *   key: [a, b, c]           (inline arrays of bare strings)
 *
 * Does NOT support block sequences, anchors, multi-line strings, or any
 * other YAML feature. If a post needs one of those, write it inline or
 * extend this parser.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: raw };
  const [, fm, body] = match;
  const data: Record<string, unknown> = {};
  for (const line of fm.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    const value = trimmed.slice(colon + 1).trim();
    data[key] = parseScalar(value);
  }
  return { data, body };
}

function parseScalar(value: string): unknown {
  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  /* Inline array: [a, b, c]. Strip brackets, split on commas, trim quotes. */
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((s) => stripQuotes(s.trim()));
  }
  return stripQuotes(value);
}

function stripQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parsePost(rawPath: string, raw: string): Post {
  const { data, body } = parseFrontmatter(raw);
  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `[blog] invalid frontmatter in ${rawPath}: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`,
    );
  }
  const fm = result.data;
  const html = marked.parse(body, { async: false }) as string;
  /* Crude but adequate plain-text derivation for the RSS <description> and
   * the index-page dek. Never rendered as HTML, so stripping tags is safe. */
  const plain = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_`>\-[\]()!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  /* 220 wpm is the conservative median for technical prose. */
  const words = plain.split(/\s+/).filter(Boolean).length;
  /* The regex above already proved the shape, so Date.parse cannot return
   * NaN here for any string that reached this line. Guard anyway: a NaN
   * would compare false against every `now` and silently bury the post
   * forever, which is the worst failure mode this feature can have. */
  let publishAtMs: number | null = null;
  if (fm.publishAt) {
    const parsed = Date.parse(fm.publishAt);
    if (Number.isNaN(parsed)) {
      throw new Error(
        `[blog] invalid frontmatter in ${rawPath}: publishAt is not a parseable instant: ${fm.publishAt}`,
      );
    }
    publishAtMs = parsed;
  }
  return {
    ...fm,
    html,
    excerpt: plain.slice(0, 280),
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
    publishAtMs,
  };
}

/* Parse once at module-eval time. Module is cached per Worker isolate, so
 * subsequent requests pay nothing.
 *
 * A malformed post is skipped here rather than thrown, and this is the
 * whole reason: module-scope evaluation means a throw does not fail one
 * blog page, it fails the module — and with it every route that imports
 * the router. On 2026-08-10 a post with a 211-character description (limit
 * 200) took satus.sh down entirely, homepage included, for about four
 * minutes. A content typo should never be able to do that.
 *
 * Skipping is NOT the primary defence, because a silently missing post is
 * its own bug. `scripts/validate-blog.mjs` runs ahead of `vite build` and
 * fails the deploy loudly. This is the blast-radius floor for anything
 * that gets past it. */
const POSTS: Post[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .flatMap(([path, raw]) => {
    try {
      return [parsePost(path, raw)];
    } catch (err) {
      console.error(`[blog] skipping ${path}: ${err instanceof Error ? err.message : String(err)}`);
      return [];
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/**
 * Posts visible to the public right now.
 *
 * Deliberately a function, not the module-scope const this used to be.
 * `POSTS` can be computed once because markdown does not change between
 * requests, but visibility does: a post embargoed with `publishAt` becomes
 * public while the isolate is still warm. Cloudflare evaluates the module
 * once per isolate and reuses it across requests for minutes or hours, so a
 * `Date.now()` captured up there would freeze at whatever instant the
 * isolate happened to boot. A post could then stay hidden well past its
 * slot, or — worse, on an isolate booted after the embargo — appear on one
 * colo and not another.
 *
 * The filter is an integer compare over a pre-parsed array. At our post
 * count this is not worth caching, and caching it is what would reintroduce
 * the bug.
 */
function publicPosts(now: number = Date.now()): Post[] {
  return POSTS.filter((p) => !p.draft && (p.publishAtMs === null || p.publishAtMs <= now));
}

/** All published posts, newest first. */
export function getAllPosts(now?: number): Post[] {
  return publicPosts(now);
}

/** Single post by slug, or null. Draft and embargoed posts return null. */
export function getPostBySlug(slug: string, now?: number): Post | null {
  return publicPosts(now).find((p) => p.slug === slug) ?? null;
}

/** Slugs for sitemap and route preloading. */
export function getAllSlugs(now?: number): string[] {
  return publicPosts(now).map((p) => p.slug);
}

/** Latest ISO date across published posts, for sitemap <lastmod>. */
export function getLatestDate(now?: number): string | undefined {
  return publicPosts(now)[0]?.date;
}
