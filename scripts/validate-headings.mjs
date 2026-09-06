#!/usr/bin/env node
/**
 * Fail the build when a route would ship without exactly one <h1>.
 *
 * Every page on this site is a stack of <Section> components, and Section
 * hardcoded <h2>. The result, found on 2026-09-01: thirteen routes live with
 * no <h1> at all -- /, /blog, /cli, /compare, /demo, /docs and its three
 * children, /pricing, /profiles, /quickstart, /recipes. The entire marketing
 * and docs surface. Only the 43 blog posts and the legal/checkout routes,
 * which build their own headings, had one.
 *
 * Nothing was broken in a way anyone would notice: the pages looked right,
 * the type scale was correct, and the outline was wrong invisibly.
 *
 * Two checks, and the second exists because the first was not enough:
 *
 *   1. Every route that renders <Section> marks exactly one heading="h1".
 *   2. That marked Section is not inside a .map() callback.
 *
 * Check 2 is the one that bites. profiles.tsx renders its Sections from
 * PROFILES.map(...), so a single heading="h1" in the source emitted three
 * <h1> elements in the DOM -- source-level counting said one, the page said
 * three. It is fixed there with `heading={i === 0 ? "h1" : "h2"}`, which this
 * script accepts because the ternary is not a bare "h1".
 *
 * Wired into `npm run build` ahead of `vite build`, so a route that loses its
 * h1 fails the deploy rather than shipping.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROUTES = join(ROOT, "src/routes");
const failures = [];

/** Routes that legitimately build their own <h1> outside Section. */
const OWN_HEADING = new Set([
  "__root.tsx",
  "blog.$slug.tsx",
  "checkout.index.tsx",
  "checkout.success.tsx",
  "checkout.cancel.tsx",
  "privacy.tsx",
  "security.tsx",
  "terms.tsx",
  "unsubscribe.tsx",
]);

const files = readdirSync(ROUTES).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  if (OWN_HEADING.has(file)) continue;
  const src = readFileSync(join(ROUTES, file), "utf8");

  // Only routes that actually render a Section are in scope. `<SectionMeta`
  // is the nav-rail type and must not count, hence the lookahead.
  const sections = [...src.matchAll(/<Section(?=[\s>])/g)];
  if (sections.length === 0) continue;

  const marks = [...src.matchAll(/heading=(?:"h1"|\{[^}]*"h1"[^}]*\})/g)];

  if (marks.length === 0) {
    failures.push(`${file}: renders <Section> but marks no heading="h1" — page ships with no <h1>`);
    continue;
  }
  if (marks.length > 1) {
    failures.push(`${file}: marks ${marks.length} h1 headings — a page gets exactly one`);
    continue;
  }

  // A bare heading="h1" inside a .map() callback multiplies into one <h1>
  // per item. Walk braces from each .map( to find its extent.
  const bare = /heading="h1"/.exec(src);
  if (!bare) continue; // ternary form; author has handled the repeat explicitly
  for (const m of src.matchAll(/\.map\(/g)) {
    let depth = 0;
    let i = m.index + m[0].length - 1;
    for (; i < src.length; i++) {
      if (src[i] === "(") depth++;
      else if (src[i] === ")") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (bare.index > m.index && bare.index < i) {
      failures.push(
        `${file}: heading="h1" sits inside a .map() at char ${m.index} — ` +
          `this renders one <h1> per item. Use heading={i === 0 ? "h1" : "h2"}.`,
      );
      break;
    }
  }
}

if (failures.length > 0) {
  console.error(`\n✗ heading outline is wrong — refusing to build (${failures.length}):\n`);
  for (const f of failures) console.error(`    ${f}`);
  console.error(
    "\n  Each page needs exactly one <h1>, on its first Section. Add\n" +
      '  heading="h1" there rather than loosening this script.\n',
  );
  process.exit(1);
}

const checked = files.filter((f) => !OWN_HEADING.has(f)).length;
console.log(`✓ every route opens with exactly one h1 (${checked} Section-based routes checked)`);
