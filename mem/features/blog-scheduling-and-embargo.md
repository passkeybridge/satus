# Blog post scheduling (`publishAt`)

**Landed:** 2026-08-27

## Why it exists

The blog had no scheduling. `date` is `YYYY-MM-DD` with no time component,
and `PUBLIC_POSTS` filtered on `draft` alone, so a post committed with a
future date went live on the next deploy regardless.

## Contract

Optional `publishAt` in frontmatter, ISO 8601 **with an explicit offset**
(`Z` or `±HH:MM`). Absent means publish on deploy. `draft: true` still wins
outright.

The offset is mandatory on purpose: `date` is a calendar day and display
metadata, `publishAt` is an absolute instant, and an offsetless string
would be read as the server's local time — UTC on Workers, almost never
what the author meant. Requiring it also makes DST explicit at write time
instead of a silent one-hour drift at publish time. 09:00 EDT is `-04:00`;
after 2026-11-01 it is `-05:00`.

## The part that is easy to get wrong

`publicPosts(now)` is a **function**, not the module-scope const it
replaced. Cloudflare evaluates the module once per isolate and reuses it
across requests for minutes or hours, so a `Date.now()` captured at module
scope freezes at whatever instant the isolate booted: a post could stay
hidden past its slot, or appear on one colo and not another. `POSTS` stays
precomputed because markdown does not change between requests; only the
comparison moves per-request. Do not "optimise" this by caching the result.

## Gates

`scripts/validate-blog.mjs` mirrors the format rule and adds a drift guard:
`date` and `publishAt` must name the same calendar day, since one drives
sort order and every rendered byline while the other drives visibility.
Both rules are mutation-tested.

## Caveat

`/blog` and `/blog/<slug>` reflect the embargo immediately. `/blog/rss.xml`
and `/sitemap.xml` send `Cache-Control: public, max-age=3600`, so they can
lag by up to an hour.

## Verified in production

First real firing: `2026-08-28-the-cycle-breaking-heuristic-we-never-shipped`
went live at its slot with no deploy in between, which is the whole point of
filtering per request. Checked 2026-08-30 on all four surfaces at once:

| Surface | Live post | Three embargoed |
| --- | --- | --- |
| `/blog` | listed | absent |
| `/blog/<slug>` | 200 | 404 |
| `/blog/rss.xml` | present | absent (40 items = 43 − 3) |
| `/sitemap.xml` | present | absent |

RSS and sitemap enumerate through `getAllPosts()`, so they inherit the
filter rather than reimplementing it. That is load-bearing: a future feed
or index that reads `POSTS` directly would leak every embargoed draft.

Note the route path. The file is `src/routes/blog.rss[.]xml.ts`, where `.`
separates segments and `[.]` escapes a literal dot, so the feed is at
`/blog/rss.xml`. `/blog.rss.xml` is not an alias; it 404s.
