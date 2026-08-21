# satus.sh returned 500 on every route for ~4 minutes

**Date:** 2026-08-10, ~23:36–23:40 UTC
**Trigger:** deploy `dpl_Cuf9J4ZzWhq71PKjhCC5xDbjza6A` (commit `137d9af`, the v0.3.7 release)
**Fix:** `6993b08`
**Guard added:** `a0acd54`

## What happened

The v0.3.7 release blog post shipped with a 211-character `description` in
its frontmatter. `src/lib/blog.ts` validates frontmatter with zod
(`description` max 200) inside `parsePost`, and `POSTS` is built by mapping
`parsePost` over every file **at module scope**.

So the throw did not fail one blog page. It failed the module, and with it
every route that imports the router: the homepage, `/api/public/cli/run`,
and `/api/public/license/verify` all returned 500. License verification was
down for the duration — a customer activating in that window would have
failed.

## Why the build did not catch it

`src/lib/blog.ts` claimed, in its own header comment, that "a malformed post
is a build-time error, not a runtime surprise." That was false. The check
lived only inside `parsePost`, which `vite build` never evaluates — the
module is first imported inside the deployed Worker. A bad post built clean,
deployed clean, and threw on the first request.

## What changed

Two layers, in this order:

1. `scripts/validate-blog.mjs` runs ahead of `vite build` (wired into the
   root `build` script), so Vercel fails the deploy instead of shipping.
   It also catches duplicate slugs, which silently shadow a post.
2. `blog.ts` now skips an unparseable post with a `console.error` instead of
   throwing. This is deliberately the *secondary* defence — a silently
   missing post is its own bug, which is what the build gate is for — but it
   puts a floor under the blast radius.

Both were verified by reproduction: restoring the 211-character description
fails the build before vite starts, and building with the guard bypassed
confirms the SSR bundle loads instead of throwing.

## The transferable lesson

Validation that runs at module-eval time in a serverless bundle is not
build-time validation. If a check must gate a deploy, it has to run in the
build command. And when one bad record can fail a shared module, the blast
radius is the whole module, not the record.
