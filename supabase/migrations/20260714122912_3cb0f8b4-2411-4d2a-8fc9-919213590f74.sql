ALTER TABLE public.satus_runs
  ADD COLUMN IF NOT EXISTS schema_fingerprint  text,
  ADD COLUMN IF NOT EXISTS validator_class     text,
  ADD COLUMN IF NOT EXISTS invocation_sequence jsonb;

COMMENT ON COLUMN public.satus_runs.schema_fingerprint IS
  'v0.3.3 opt-in. SHA-256 of the normalised schema shape. Never contains identifiers or row data. See packages/cli/src/generate/fingerprint.ts.';
COMMENT ON COLUMN public.satus_runs.validator_class IS
  'v0.3.3 opt-in. Name of the validator rule that fired first on a dry-run failure (e.g. "fk_missing_parent"). Bounded to 64 chars in the ingest zod.';
COMMENT ON COLUMN public.satus_runs.invocation_sequence IS
  'v0.3.3 opt-in. Subcommand + flag names only, never flag values. jsonb array of up to 16 short strings.';