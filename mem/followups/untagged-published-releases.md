# Published npm versions with no git tag

**Status:** RESOLVED 2026-08-27. `v0.3.10` and `v0.3.11` were pushed
from a machine with direct GitHub access and both point at the right
commits (`9e47b64`, `8e17aa9`). Kept for the constraint it documents: tag
pushes 403 from the sandbox, so every future release needs this same
hand-off step.
**Effort:** minutes

`@passkeybridge/satus@0.3.10` (published 2026-08-14 from `9e47b64`) and
`0.3.11` (published 2026-08-27 from `8e17aa9`) are both on npm, but
`git ls-remote --tags origin` shows only
`v0.3.3 v0.3.5 v0.3.7 v0.3.8 v0.3.9`. Neither has a tag.

An untagged release cannot be rebuilt from git by anyone who does not know
to read the provenance attestation. Every release should be reachable by tag.

## Fix

```bash
git fetch origin main && git checkout main && git pull origin main
git tag -a v0.3.10 -m "v0.3.10: enforce the 24-hour license grace" 9e47b64
git tag -a v0.3.11 -m "v0.3.11: make run telemetry opt-in" 8e17aa9
git push origin v0.3.10 v0.3.11
```

Tag pushes are blocked from this environment — confirmed again on
2026-08-27, where `git push origin v0.3.10 v0.3.11` returned
`RPC failed; HTTP 403` while branch pushes to the same remote succeeded in
the same session. The GitHub MCP server has no tag- or release-creation
tool either, so this cannot be worked around from inside; it has to be done
from a machine with direct GitHub access.

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
