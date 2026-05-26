/**
 * Blog content loader.
 *
 * Posts live as `.md` files under `src/content/blog/` and are bundled into
 * the Worker at build time via `import.meta.glob`. No filesystem reads at
 * runtime — Cloudflare Workers safe.
 *
 * Frontmatter contract is documented in `src/content/blog/README.md`.
 * Validation here is intentionally strict: a malformed post is a build-time
 * error, not a runtime surprise.
 */

/* gray-matter calls Buffer.isBuffer at module init. Node has Buffer; the
 * browser bundle does not. A 3-line shim satisfies the check without a
 * 50 KB polyfill. Must run before the gray-matter import is evaluated. */
if (typeof globalThis !== "undefined" && typeof (globalThis as { Buffer?: unknown }).Buffer === "undefined") {
  (globalThis as { Buffer?: unknown }).Buffer = class { static isBuffer() { return false; } };
}

import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

/* Single shared parser config. GFM gives us tables + autolinks; pedantic
 * off so we accept the lightly-extended CommonMark engineers actually write. */
marked.setOptions({ gfm: true, breaks: false });

/* Zod is overkill for three required string fields, but it gives us a
 * single source of truth for the frontmatter contract and emits an actual
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
  /** Pre-rendered HTML body. Safe to inject — content is authored in-house. */
  html: string;
  /** Plain-text body, derived from markdown. Used for RSS description. */
  excerpt: string;
  /** Estimated read time in minutes, rounded up, minimum 1. */
  readingMinutes: number;
}

/* eager:true bundles content at build time. query:'?raw' pulls the markdown
 * source as a string instead of trying to module-load it. We exclude the
 * README so it doesn't ship as a (malformed) post. */
const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parsePost(rawPath: string, raw: string): Post {
  const parsed = matter(raw);
  /* gray-matter parses YAML 1.1, which auto-coerces unquoted ISO dates into
   * JS Date objects. Normalize back to a YYYY-MM-DD string before validation
   * so authors don't have to remember to quote the date. */
  const data: Record<string, unknown> = { ...parsed.data };
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().slice(0, 10);
  }
  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `[blog] invalid frontmatter in ${rawPath}: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`,
    );
  }
  const fm = result.data;
  const html = marked.parse(parsed.content, { async: false }) as string;
  /* Crude but adequate plain-text derivation for the RSS <description> and
   * the index-page dek. We never render this as HTML, so stripping tags is
   * the safe path. */
  const plain = parsed.content
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
 * subsequent requests pay nothing. The README is filtered out by filename. */
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
