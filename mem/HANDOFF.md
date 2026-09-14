# HANDOFF

Written 2026-09-14. Replace this file next session; do not append.

## State

`main` is `e67213a`, production serving it. `@passkeybridge/satus@0.3.11` is
npm `latest`. No unmerged branches. Health endpoint `status: pass`, all four
checks ok this evening.

Gates: tsc clean, eslint 0 errors with `prettier/prettier` enforced, 15 site
tests, 70 CLI tests, five validators, `prettier --check .` clean.

## Today

No code shipped. Verified Friday's work: CI never went red, and the TanStack
build break was local to the working tree, fixed before commit. Then triaged
the open flags, dates checked rather than recalled. Owner circles back
tomorrow.

## The flags, ranked

1. **`NPM_PUBLISH_TOKEN` expires 2026-10-12** — 28 days. The 401 would land
   on the last step of `cli-publish.yml`, after install, tests, typecheck and
   build have all passed, so the failure arrives mid-release. The owner
   rotates it in GitHub Secrets; do not handle the value.
2. **Node 20 has been EOL since 2026-04-30** (endoflife.date, checked).
   Pinned in `cli-ci.yml:24` and `cli-publish.yml:25`. Runner Node, not user
   Node, so the blast radius is small, but `cli-publish.yml` builds the npm
   tarball: bump it before a release week, not during one. 24 is Active LTS
   to 2026-10-20 and supported to 2028; 22 runs to 2027-04-30. Separate from
   `"engines": ">=20"` in the CLI's package.json, a published promise that
   must not move as a side effect. **Awaiting a go.**
3. **e2e-health auth.** The limiter closed the amplification (10/hour/IP,
   60/day, fails closed). A shared-secret header needs a new env var and a
   Supabase cron edit. Scheduled work, not a fire.
4. **CSP.** Ship `Content-Security-Policy-Report-Only` first; it collects
   violations from live traffic without breaking `/demo` (PGlite WASM) or
   `/checkout` (Stripe Embedded, the page that takes money).

Unchanged and fine: 19 `bun audit` findings, all dev-tree tooling absent from
the server bundle. 79 poisoned suppression rows, deliberate.

## Graduated this session

`mem/followups/refund-revocation-rides-on-a-removed-field.md` gained
**"`apiVersion` in `stripe.server.ts` does not answer this"**. The dahlia pin
was read aloud today as proof the refund gap is latent. It is not proof: the
pin governs outbound calls, while inbound payload shape comes from the
endpoint's registered `api_version`, which is `null`. Still open; needs the
Dashboard read.

## Do not redo

`strict: true` on the Anthropic tool; the docs-vs-code audit (run the
validator); purging the app-builder platform (`3abfa27`).

## Next

1. The Node bump, on a go.
2. `(planned)` Team features on `/pricing`, and a support SLA.
3. Content plan resumes at Q3 item 9.
