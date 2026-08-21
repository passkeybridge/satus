# Published npm versions with no git tag

**Status:** open as of 2026-08-21
**Effort:** minutes

`@passkeybridge/satus@0.3.10` is on npm (published 2026-08-14, built from
`9e47b64` per its SLSA provenance) but `git ls-remote --tags origin` shows
only `v0.3.3 v0.3.5 v0.3.7 v0.3.8 v0.3.9`. There is no `v0.3.10`.

An untagged release cannot be rebuilt from git by anyone who does not know
to read the provenance attestation. Every release should be reachable by tag.

## Fix

```bash
git fetch origin main && git checkout main && git pull origin main
git tag -a v0.3.10 -m "v0.3.10 — enforce the 24-hour license grace" 9e47b64
git push origin v0.3.10
```

Tag pushes are blocked from some sandboxed environments — see
`mem/features/release-and-deploy-traps.md`. If the push 403s, it has to be
done from a machine with direct GitHub access.

The run this triggers should be **green**: `9e47b64` carries the workflow
change (`8c182b0`) that makes a tag naming an already-published version a
no-op rather than a failure.

## Prevention

Nothing currently checks tag-vs-registry parity. A ninth check in
`scripts/validate-docs.mjs` could assert that the version in
`packages/cli/package.json`, once published, has a corresponding tag — but
that check would have to tolerate the window between publishing and tagging,
so it is not obviously worth it. Recorded as an option, not a
recommendation.
