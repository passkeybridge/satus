# Run telemetry is opt-in (v0.3.11)

**Landed:** 2026-08-27

## What was wrong

`satus.sh/security` said "Telemetry. Off by default" from the day the page
went up. That was true of `telemetry.share_failure_fingerprints` and false
of the run record: `reportRun` was called unconditionally at the end of
every `satus generate`, with no config key, environment variable, or flag
able to stop it. The pricing FAQ separately called the Free tier "fully
offline forever", which had the same problem.

Nothing identifying was collected. The payload had been the minimal one
since v0.3.7, and all twelve rows in `public.satus_runs` are our own
release tests (`environment = 'dev'`, clustered on release dates, and
satus has no external paying customers). The defect was the gap between
the published sentence and the binary, not a leak.

## Shape of the fix

`telemetryEnabled(configEnabled)` in `generate/telemetry.ts` resolves,
highest precedence first:

1. `DO_NOT_TRACK` — always wins, never overridable
2. `SATUS_TELEMETRY` — explicit on/off, for CI
3. `telemetry.enabled` in `satus.config.json`
4. off

`configureTelemetry()` latches the answer once at startup into a
module-scope `enabled`, initialised to `false`, and `reportRun` early-returns
on it. Held in the module rather than threaded through call sites so a new
caller cannot forget the check, and initialised false so a path that never
configures sends nothing. Fail closed.

## The test that did not test anything

The first version of the fail-closed test called `configureTelemetry(false)`
before asserting, so it never observed the initial value and **passed
against a build with `let enabled = true`**. Mutation testing caught it.
The replacement uses `vi.resetModules()` plus a dynamic import to get a
pristine module and asserts on that.

If you touch this file, re-run both mutations: delete the `if (!enabled)
return` guard, and flip the initialiser to `true`. Both must turn the suite
red.

## Verified

Against a local collector, using the tarball installed from npm rather than
a local build: default sends nothing, `SATUS_TELEMETRY=1` sends exactly one
record, `SATUS_TELEMETRY=1 DO_NOT_TRACK=1` sends nothing.
