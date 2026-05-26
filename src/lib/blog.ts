/**
 * Blog content loader.
 *
 * Posts live as `.md` files under `src/content/blog/` and are bundled into
 * the Worker at build time via `import.meta.glob`. No filesystem reads at
 * runtime, Cloudflare Workers safe.
 *
 * Frontmatter contract is documented in `src/content/blog/README.md`.
 * Validation is intentionally strict: a malformed post is a build-time
 * error, not a runtime surprise.
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
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
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
  return {
    ...fm,
    html,
    excerpt: plain.slice(0, 280),
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
  };
}

/* Parse once at module-eval time. Module is cached per Worker isolate, so
 * subsequent requests pay nothing. */
const POSTS: Post[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const PUBLIC_POSTS = POSTS.filter((p) => !p.draft);

/** All non-draft posts, newest first. */
export function getAllPosts(): Post[] {
  return PUBLIC_POSTS;
}

/** Single post by slug, or null. Draft posts are not retrievable in prod. */
export function getPostBySlug(slug: string): Post | null {
  return PUBLIC_POSTS.find((p) => p.slug === slug) ?? null;
}

/** Slugs for sitemap and route preloading. */
export function getAllSlugs(): string[] {
  return PUBLIC_POSTS.map((p) => p.slug);
}

/** Latest ISO date across all posts, for sitemap <lastmod>. */
export function getLatestDate(): string | undefined {
  return PUBLIC_POSTS[0]?.date;
}
