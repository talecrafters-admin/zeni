-- Create api schema and views for Data API consumption
create schema if not exists api;

-- Ensure base tables exist (no-op if they already do)
-- create table if not exists public.profiles (
--   id uuid primary key,
--   display_name text,
--   city text,
--   dob date,
--   avatar_url text,
--   onboarding jsonb default jsonb_build_object('completed', false)
-- );

-- create table if not exists public.assessments (
--   id bigserial primary key,
--   user_id uuid not null,
--   mood_score int,
--   sleep_score int,
--   stress_score int,
--   goal text,
--   created_at timestamptz default now()
-- );

-- create table if not exists public.user_consents (
--   user_id uuid primary key,
--   tos boolean not null,
--   privacy boolean not null,
--   analytics_ok boolean,
--   marketing_ok boolean,
--   created_at timestamptz default now()
-- );

-- If base tables already exist in api schema, skip view creation.
-- Otherwise, create api views over public tables for Data API exposure.
do $$ begin
  if exists (select 1 from pg_tables where schemaname='api' and tablename in ('profiles','assessments','user_consents')) then
    -- Tables exist in api; no views needed.
    null;
  else
    if exists (select 1 from pg_tables where schemaname='public' and tablename='profiles') then
      execute $$create or replace view api.profiles as
        select id, display_name, city, dob, avatar_url, onboarding
        from public.profiles$$;
    end if;
    if exists (select 1 from pg_tables where schemaname='public' and tablename='assessments') then
      execute $$create or replace view api.assessments as
        select user_id, mood_score, sleep_score, stress_score, goal, created_at
        from public.assessments$$;
    end if;
    if exists (select 1 from pg_tables where schemaname='public' and tablename='user_consents') then
      execute $$create or replace view api.user_consents as
        select user_id, tos, privacy, analytics_ok, marketing_ok, created_at
        from public.user_consents$$;
    end if;
  end if;
end $$;

-- Grants
grant usage on schema api to anon, authenticated;
grant select on all tables in schema api to anon, authenticated;
grant select on all views in schema api to anon, authenticated;
grant insert, update on all tables in schema api to authenticated;
grant insert, update on all views in schema api to authenticated; -- typically only authenticated can write

-- Future views also inherit grants
alter default privileges in schema api grant select on tables to anon, authenticated;
alter default privileges in schema api grant select on sequences to anon, authenticated;

-- RLS on base tables (idempotent guards)
do $$ begin
  -- Prefer api schema if present, else public
  if exists (select 1 from pg_tables where schemaname = 'api' and tablename = 'profiles') then
    execute 'alter table api.profiles enable row level security';
    -- Select
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_select'
    ) then
      execute $$create policy "profiles_self_select" on api.profiles for select using (auth.uid() = id)$$;
    end if;
    -- Insert
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_insert'
    ) then
      execute $$create policy "profiles_self_insert" on api.profiles for insert with check (auth.uid() = id)$$;
    end if;
    -- Update
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='profiles' and policyname='profiles_self_update'
    ) then
      execute $$create policy "profiles_self_update" on api.profiles for update using (auth.uid() = id)$$;
    end if;
  elsif exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    execute 'alter table public.profiles enable row level security';
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_self_select'
    ) then
      execute $$create policy "profiles_self_select" on public.profiles for select using (auth.uid() = id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_self_insert'
    ) then
      execute $$create policy "profiles_self_insert" on public.profiles for insert with check (auth.uid() = id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_self_update'
    ) then
      execute $$create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id)$$;
    end if;
  end if;
end $$;

do $$ begin
  if exists (select 1 from pg_tables where schemaname = 'api' and tablename = 'assessments') then
    execute 'alter table api.assessments enable row level security';
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='assessments' and policyname='assessments_self_select'
    ) then
      execute $$create policy "assessments_self_select" on api.assessments for select using (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='assessments' and policyname='assessments_self_insert'
    ) then
      execute $$create policy "assessments_self_insert" on api.assessments for insert with check (auth.uid() = user_id)$$;
    end if;
  elsif exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'assessments') then
    execute 'alter table public.assessments enable row level security';
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='assessments' and policyname='assessments_self_select'
    ) then
      execute $$create policy "assessments_self_select" on public.assessments for select using (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='assessments' and policyname='assessments_self_insert'
    ) then
      execute $$create policy "assessments_self_insert" on public.assessments for insert with check (auth.uid() = user_id)$$;
    end if;
  end if;
end $$;

do $$ begin
  if exists (select 1 from pg_tables where schemaname = 'api' and tablename = 'user_consents') then
    execute 'alter table api.user_consents enable row level security';
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_select'
    ) then
      execute $$create policy "consents_self_select" on api.user_consents for select using (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_upsert'
    ) then
      execute $$create policy "consents_self_upsert" on api.user_consents for insert with check (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='api' and tablename='user_consents' and policyname='consents_self_update'
    ) then
      execute $$create policy "consents_self_update" on api.user_consents for update using (auth.uid() = user_id)$$;
    end if;
  elsif exists (select 1 from pg_tables where schemaname = 'public' and tablename = 'user_consents') then
    execute 'alter table public.user_consents enable row level security';
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='user_consents' and policyname='consents_self_select'
    ) then
      execute $$create policy "consents_self_select" on public.user_consents for select using (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='user_consents' and policyname='consents_self_upsert'
    ) then
      execute $$create policy "consents_self_upsert" on public.user_consents for insert with check (auth.uid() = user_id)$$;
    end if;
    if not exists (
      select 1 from pg_policies where schemaname='public' and tablename='user_consents' and policyname='consents_self_update'
    ) then
      execute $$create policy "consents_self_update" on public.user_consents for update using (auth.uid() = user_id)$$;
    end if;
  end if;
end $$;


