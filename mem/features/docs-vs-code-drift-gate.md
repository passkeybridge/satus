# Published claims drift from the code, silently

Between 2026-08-10 and 2026-08-11 an audit found eleven published claims the
code did not support. None was a lie; each described an intention that either
never landed or changed afterwards, and nothing re-checked them.

The ones worth remembering, because they show the range:

- A **10,000-row production safety guard** documented in detail on
  `/docs/how-it-works` — threshold, `--force` bypass, exit code `11`, and the
  reasoning — that **did not exist in the code at all**. `resolveDsn` took the
  string and connected. This is the dangerous class: a *safety* claim makes a
  reader less careful, not more. Built in 0.3.8 rather than deleted.
- **Exit `10` (`E_FK_CYCLE`)** documented, exit `1` emitted. Built in 0.3.9.
- The **homepage overstated the free tier 4x** (500 rows/run; the real cap is
  `FREE_MAX_ROWS` 25 x `FREE_MAX_TABLES` 5 = 125).
- The **CLI README priced Team at $79/mo** when it is $49/seat and a waitlist.
  That README ships inside the npm tarball, so the wrong price sat on
  npmjs.com.
- A **14-day offline license grace** in the pricing matrix and FAQ, where
  `LICENSE_CACHE_TTL_MS` is 24 hours.
- **Tarjan's algorithm** credited in the FK-planner section; `dag.ts` uses
  Kahn's, and there is no Tarjan implementation in the repo.

## The control

`scripts/validate-docs.mjs`, wired into the root `build` script ahead of
`vite build`, so a mismatch fails the Vercel deploy. Eight checks, each
parsing ground truth out of source rather than duplicating it:

flags exist · exit codes are defined in `exit-codes.ts` · free-tier caps match
the constants *and* any stated per-run total equals their product · guard
threshold matches `ROW_LIMIT` · profile names match the `ProfileName` union ·
default models match `DEFAULT_MODELS` · the version is identical across all
six files carrying it · `security.txt` has not expired (fails 30 days out).

All eight were mutation-tested — each check had its claim broken in turn and
was confirmed to turn the build red.

## Two things to carry forward

**A validator that cries wolf gets ignored.** The first draft flagged 45
legitimate flags because its regex assumed `'--flag'` when options are
declared `'--profile <name>'`. Fix false positives before wiring a gate in,
or the team learns to skip it.

**It cannot check prose.** "Tarjan's algorithm" is an adjective, not an
assertion, and would sail through. Numbers are now assertions in a test
suite; sentences still need a human reading the page next to the code at
each release. Do not let the green checkmark imply more coverage than it has.
