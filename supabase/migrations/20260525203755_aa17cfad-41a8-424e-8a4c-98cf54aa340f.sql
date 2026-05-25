-- Waitlist signup capture for /pricing Pro and Team CTAs.
-- Public insert-only; reads gated to backend/admin via dashboard.

create type public.waitlist_tier as enum ('pro', 'team');

create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  tier public.waitlist_tier not null,
  note text,
  source text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now(),
  -- One signup per (email, tier). Re-submitting the same pair is a no-op.
  unique (email, tier)
);

-- Lightweight email shape check; full validation happens server-side via zod.
create or replace function public.waitlist_signups_validate()
returns trigger
language plpgsql
as $$
begin
  if new.email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid_email';
  end if;
  if length(new.email) > 254 then
    raise exception 'email_too_long';
  end if;
  if new.note is not null and length(new.note) > 500 then
    raise exception 'note_too_long';
  end if;
  new.email := lower(trim(new.email));
  return new;
end;
$$;

create trigger waitlist_signups_validate_trg
before insert on public.waitlist_signups
for each row execute function public.waitlist_signups_validate();

alter table public.waitlist_signups enable row level security;

-- Public can insert (the only public-facing action). No select/update/delete policies
-- means anon/authenticated cannot read or modify rows; only service-role (backend
-- and dashboard) can. This prevents email enumeration.
create policy "Anyone can submit a waitlist signup"
on public.waitlist_signups
for insert
to anon, authenticated
with check (true);

create index waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index waitlist_signups_tier_idx on public.waitlist_signups (tier);