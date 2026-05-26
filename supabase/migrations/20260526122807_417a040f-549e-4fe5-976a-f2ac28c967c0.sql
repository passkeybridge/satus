
-- License keys issued from Stripe subscription events.
-- Service role only — keys are issued by the webhook and validated by the
-- license verify endpoint. End users never query this table from the client.

create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text not null unique,
  email text not null,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  plan text not null,
  status text not null default 'active',
  environment text not null default 'live',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index idx_licenses_email on public.licenses (lower(email));
create index idx_licenses_customer on public.licenses (stripe_customer_id);

alter table public.licenses enable row level security;

create policy "service role full access licenses"
  on public.licenses for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create or replace function public.licenses_touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger licenses_touch_updated_at
  before update on public.licenses
  for each row execute function public.licenses_touch_updated_at();
