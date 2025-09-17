-- Add sequence grants for authenticated role in api schema
-- Safe to run multiple times

grant usage, select on all sequences in schema api to authenticated;

-- Ensure future sequences also inherit these privileges
alter default privileges in schema api grant usage, select on sequences to authenticated;


