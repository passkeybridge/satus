# Release and deploy traps in this repo

Four things that cost real time, all verified by reproduction.

## `.vercel/` must stay gitignored

`.gitignore` covered `.output` but not `.vercel`. A `git add -A` swept 157
build artifacts into the repo (there were zero at v0.3.6). Vercel treats a
checked-in `.vercel/output` as **prebuilt output and ships it instead of
building from source**, so the live site froze on whatever snapshot got
committed while later source changes only ever landed in `.output`.

Symptom: `/blog/rss.xml` 500ing with
`Cannot find package 'tslib' imported from /var/task/_ssr/start--wyh4sTq.mjs`.
The committed chunk had a bare `import "tslib"`; a fresh build emits
`import "../_libs/tslib.mjs"`. `tslib` is transitive-only (via `@radix-ui`,
`@supabase`), so a bare specifier cannot resolve in the deployed function.
Fixed in `c3e2767`. `.vercel` is now ignored — keep it that way.

## A tag push runs the workflow *at that tag's commit*

Not the one on `main`. `cli-publish.yml` was changed so that a tag naming an
already-published version is a green no-op rather than a failure — but that
only helps tags whose commit is at-or-after the fix (`8c182b0`). Tagging an
older release still runs the older workflow and still goes red. `v0.3.9`
went green; `v0.3.8` did not. Harmless, permanent, not worth re-running.

## Releases are published by dispatch, then tagged

Tag pushes are blocked from some environments (the sandbox git proxy 403s
them; branch pushes work). So the normal shape is: publish via
`workflow_dispatch` on `cli-publish.yml`, then push the tag afterwards for
reproducibility. That is why the no-op branch above exists.

Consequence to watch: **a published version can end up with no git tag.** It
has happened to 0.3.6, 0.3.7, 0.3.8, 0.3.9, 0.3.10 and 0.3.11. All are
tagged as of 2026-08-30, but nothing enforces it, so check
`git ls-remote --tags origin` against `npm view @passkeybridge/satus
versions` when picking up work.

## Ship a safeguard and its override together, everywhere

0.3.8 added the 10,000-row guard with `--force` as its documented escape
hatch, but the GitHub Action exposed no matching input. A workflow pointed at
a preview branch with real fixtures — the exact case `--force` exists for —
exited `11`, wrote nothing, and offered no way to proceed. A safeguard that
cannot be overridden in the one environment that runs unattended is worse
than the bug it prevents. Fixed in 0.3.9. When adding a guard, add its bypass
to the CLI *and* the action in the same release.
