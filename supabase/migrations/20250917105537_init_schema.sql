-- Initial schema for zeni (API-first)
-- Creates application tables directly in the api schema

create schema if not exists api;

-- Profiles: one row per user
create table if not exists api.profiles (
  id uuid primary key,
  display_name text,
  city text,
  dob date,
  avatar_url text,
  onboarding jsonb default jsonb_build_object('completed', false),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function api.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on api.profiles;
create trigger set_profiles_updated_at
before update on api.profiles
for each row execute procedure api.set_updated_at();

-- Assessments: many rows per user
create table if not exists api.assessments (
  id bigserial primary key,
  user_id uuid not null,
  mood_score int,
  sleep_score int,
  stress_score int,
  goal text,
  created_at timestamptz not null default now()
);
create index if not exists idx_assessments_user_id on api.assessments(user_id);

-- Consents: one row per user
create table if not exists api.user_consents (
  user_id uuid primary key,
  tos boolean not null,
  privacy boolean not null,
  analytics_ok boolean,
  marketing_ok boolean,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_user_consents_updated_at on api.user_consents;
create trigger set_user_consents_updated_at
before update on api.user_consents
for each row execute procedure api.set_updated_at();

-- Grants for Data API roles
grant usage on schema api to anon, authenticated;
grant select on all tables in schema api to anon, authenticated;
grant insert, update on all tables in schema api to authenticated;
-- Sequences: allow reading/nextval for authenticated
grant usage, select on all sequences in schema api to authenticated;

-- Ensure future objects inherit sensible defaults
alter default privileges in schema api grant select on tables to anon, authenticated;
alter default privileges in schema api grant insert, update on tables to authenticated;
alter default privileges in schema api grant usage, select on sequences to authenticated;

-- Row Level Security policies
alter table api.profiles enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_select'
  ) then
    create policy "profiles_self_select" on api.profiles for select using (auth.uid() = id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_insert'
  ) then
    create policy "profiles_self_insert" on api.profiles for insert with check (auth.uid() = id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_update'
  ) then
    create policy "profiles_self_update" on api.profiles for update using (auth.uid() = id);
  end if;
end $$;

alter table api.assessments enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='assessments' and policyname='assessments_self_select'
  ) then
    create policy "assessments_self_select" on api.assessments for select using (auth.uid() = user_id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='assessments' and policyname='assessments_self_insert'
  ) then
    create policy "assessments_self_insert" on api.assessments for insert with check (auth.uid() = user_id);
  end if;
end $$;

alter table api.user_consents enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_select'
  ) then
    create policy "consents_self_select" on api.user_consents for select using (auth.uid() = user_id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_upsert'
  ) then
    create policy "consents_self_upsert" on api.user_consents for insert with check (auth.uid() = user_id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_update'
  ) then
    create policy "consents_self_update" on api.user_consents for update using (auth.uid() = user_id);
  end if;
end $$;


