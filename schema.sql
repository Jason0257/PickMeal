create table if not exists public.pickmeal_events (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  event_type text not null,
  timestamp timestamptz not null default now(),
  companion text,
  mood text,
  budget text,
  recommendation_set jsonb,
  set_no integer,
  reroll_reason text,
  reroll_set_no integer,
  selected_menu text,
  decision_sec integer,
  reroll_count integer,
  feedback smallint check (feedback in (0, 1))
);

alter table public.pickmeal_events enable row level security;

create policy "Allow anonymous event inserts"
on public.pickmeal_events
for insert
to anon
with check (true);
