-- Fix: pin search_path on validation function (lint 0011).
create or replace function public.waitlist_signups_validate()
returns trigger
language plpgsql
set search_path = public
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

-- Fix: tighten insert policy beyond `with check (true)` (lint 0024).
-- Authoritative validation still happens in the trigger + the server route;
-- this adds a non-trivial expression at the policy layer for defense in depth.
drop policy "Anyone can submit a waitlist signup" on public.waitlist_signups;

create policy "Public waitlist insert with bounded payload"
on public.waitlist_signups
for insert
to anon, authenticated
with check (
  length(email) between 5 and 254
  and (note is null or length(note) <= 500)
  and (source is null or length(source) <= 64)
  and (user_agent is null or length(user_agent) <= 512)
);