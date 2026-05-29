-- Postgres grants EXECUTE on new functions to PUBLIC by default, which the
-- linter flags as a security risk for SECURITY DEFINER. Revoke it explicitly
-- on the prune helpers; only service_role (and cron, which runs as superuser)
-- should be able to call them.

REVOKE EXECUTE ON FUNCTION public.prune_satus_runs(INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_satus_runs(INTEGER) TO service_role;

REVOKE EXECUTE ON FUNCTION public.prune_e2e_health_log(INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_e2e_health_log(INTEGER) TO service_role;

REVOKE EXECUTE ON FUNCTION public.check_rate_limit(TEXT, TEXT, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, TEXT, INTEGER) TO service_role;

REVOKE EXECUTE ON FUNCTION public.prune_rate_limit_counters() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_rate_limit_counters() TO service_role;