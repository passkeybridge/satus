-- Cross-isolate rate limiter, backed by Postgres so it actually works on
-- Cloudflare (where each Worker isolate has its own memory). Schema is
-- intentionally minimal: (bucket, key, window_start) with a count column.
-- The check_rate_limit() helper does an UPSERT-with-increment and returns
-- the new count, all in one round-trip.

CREATE TABLE IF NOT EXISTS public.rate_limit_counters (
  bucket TEXT NOT NULL,            -- logical limiter name, e.g. 'license_verify'
  key TEXT NOT NULL,               -- caller fingerprint (ip_hash)
  window_start TIMESTAMPTZ NOT NULL,
  hits INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, key, window_start)
);

-- No anon/authenticated access — only service_role (server functions) touches this.
GRANT ALL ON public.rate_limit_counters TO service_role;

ALTER TABLE public.rate_limit_counters ENABLE ROW LEVEL SECURITY;

-- Deny-by-default: no policies means anon/authenticated cannot read or write.
-- service_role bypasses RLS, which is exactly what we want.

-- Index for the GC job below.
CREATE INDEX IF NOT EXISTS rate_limit_counters_window_idx
  ON public.rate_limit_counters (window_start);

-- Atomic check-and-increment. Returns the post-increment hit count for the
-- caller's current window. Caller decides whether to 429 based on the limit.
-- window_seconds quantizes the window so all callers in the same period
-- share a row (cheap and avoids row explosion).
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_bucket TEXT,
  p_key TEXT,
  p_window_seconds INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start TIMESTAMPTZ;
  v_hits INTEGER;
BEGIN
  -- Quantize "now" to the start of the current window. Using epoch math
  -- keeps this deterministic across clients.
  v_window_start := to_timestamp(
    (EXTRACT(EPOCH FROM now())::BIGINT / p_window_seconds) * p_window_seconds
  );

  INSERT INTO public.rate_limit_counters (bucket, key, window_start, hits)
  VALUES (p_bucket, p_key, v_window_start, 1)
  ON CONFLICT (bucket, key, window_start)
    DO UPDATE SET hits = public.rate_limit_counters.hits + 1
  RETURNING hits INTO v_hits;

  RETURN v_hits;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT, TEXT, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, TEXT, INTEGER) TO service_role;

-- GC: drop rows older than 24h. Plenty of headroom for any reasonable window.
CREATE OR REPLACE FUNCTION public.prune_rate_limit_counters()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM public.rate_limit_counters
  WHERE window_start < now() - INTERVAL '24 hours';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.prune_rate_limit_counters() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.prune_rate_limit_counters() TO service_role;

-- Schedule GC hourly. Idempotent: unschedule first if already present.
DO $$
BEGIN
  PERFORM cron.unschedule('prune-rate-limit-counters');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

SELECT cron.schedule(
  'prune-rate-limit-counters',
  '0 * * * *',
  $$SELECT public.prune_rate_limit_counters();$$
);