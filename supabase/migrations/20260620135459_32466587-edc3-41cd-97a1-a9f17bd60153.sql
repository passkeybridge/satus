
-- Dedup table for Stripe webhook failure alerts. PRIMARY KEY on event_id
-- means a retry storm for the same Stripe event sends exactly one email;
-- distinct failing events still each produce their own alert.
CREATE TABLE public.webhook_alerts_sent (
  event_id      text PRIMARY KEY,
  event_type    text,
  environment   text,
  error_message text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Service-role only. No anon / authenticated grants — this is an internal
-- ops table containing error metadata that should never reach the client.
GRANT SELECT, INSERT ON public.webhook_alerts_sent TO service_role;
GRANT ALL              ON public.webhook_alerts_sent TO service_role;

ALTER TABLE public.webhook_alerts_sent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role full access"
  ON public.webhook_alerts_sent
  FOR ALL
  TO service_role
  USING  (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Maintenance helper to keep the table tiny. Matches the existing
-- prune_satus_runs / prune_e2e_health_log shape so it can be wired into
-- the same nightly cron job later.
CREATE OR REPLACE FUNCTION public.prune_webhook_alerts_sent(retain_days integer DEFAULT 30)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  deleted integer;
BEGIN
  IF retain_days IS NULL OR retain_days < 7 THEN
    RAISE EXCEPTION 'retain_days must be >= 7';
  END IF;
  DELETE FROM public.webhook_alerts_sent
   WHERE created_at < now() - make_interval(days => retain_days);
  GET DIAGNOSTICS deleted = ROW_COUNT;
  RETURN deleted;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.prune_webhook_alerts_sent(integer) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.prune_webhook_alerts_sent(integer) TO service_role;
