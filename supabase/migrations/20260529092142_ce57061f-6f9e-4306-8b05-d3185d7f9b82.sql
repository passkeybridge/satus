-- satus_runs retention: keep the last 90 days of telemetry. The table is
-- write-mostly (CLI POSTs one row per run); without GC it grows unbounded.
-- Function runs as security definer so the daily pg_cron job (service-role
-- only, never user-facing) can call it without granting blanket DELETE to
-- public.

create or replace function public.prune_satus_runs(retain_days integer default 90)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted integer;
begin
  if retain_days is null or retain_days < 7 then
    raise exception 'retain_days must be >= 7';
  end if;
  delete from public.satus_runs
   where created_at < now() - make_interval(days => retain_days);
  get diagnostics deleted = row_count;
  return deleted;
end;
$$;

revoke all on function public.prune_satus_runs(integer) from public, anon, authenticated;
grant execute on function public.prune_satus_runs(integer) to service_role;

-- Daily 03:00 UTC prune. Unschedule any prior instance first so re-running
-- the migration stays idempotent.
do $$
begin
  perform cron.unschedule('prune-satus-runs-daily');
exception when others then null;
end$$;

select cron.schedule(
  'prune-satus-runs-daily',
  '0 3 * * *',
  $cron$select public.prune_satus_runs(90);$cron$
);

-- Same retention for e2e_health_log (cron writes 2 rows/day, harmless but
-- there's no reason to keep years of green checks).
create or replace function public.prune_e2e_health_log(retain_days integer default 90)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted integer;
begin
  if retain_days is null or retain_days < 7 then
    raise exception 'retain_days must be >= 7';
  end if;
  delete from public.e2e_health_log
   where created_at < now() - make_interval(days => retain_days);
  get diagnostics deleted = row_count;
  return deleted;
end;
$$;

revoke all on function public.prune_e2e_health_log(integer) from public, anon, authenticated;
grant execute on function public.prune_e2e_health_log(integer) to service_role;

do $$
begin
  perform cron.unschedule('prune-e2e-health-log-daily');
exception when others then null;
end$$;

select cron.schedule(
  'prune-e2e-health-log-daily',
  '5 3 * * *',
  $cron$select public.prune_e2e_health_log(90);$cron$
);