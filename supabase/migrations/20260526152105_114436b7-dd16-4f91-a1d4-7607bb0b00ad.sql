
-- Demo schema for satus CLI end-to-end validation.
-- Three FK-linked tables so we can verify topo order, FK chaining, and row counts.
CREATE SCHEMA IF NOT EXISTS satus_demo;

CREATE TABLE satus_demo.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE satus_demo.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES satus_demo.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE satus_demo.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES satus_demo.projects(id) ON DELETE CASCADE,
  assignee_id uuid REFERENCES satus_demo.users(id) ON DELETE SET NULL,
  title text NOT NULL,
  done boolean NOT NULL DEFAULT false,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Run telemetry table (public schema, viewable in Cloud).
-- Records every satus generate invocation: model used, cost, tables seeded, row counts, errors.
CREATE TABLE public.satus_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  status text NOT NULL DEFAULT 'running',  -- running | success | failed
  license_key text,
  profile text,
  model text,
  target_schema text,
  tables jsonb,         -- [{name, rows_generated}]
  total_rows integer,
  total_cost_usd numeric(10, 6),
  duration_ms integer,
  error_message text,
  cli_version text,
  environment text NOT NULL DEFAULT 'dev'
);

GRANT SELECT, INSERT, UPDATE ON public.satus_runs TO authenticated;
GRANT ALL ON public.satus_runs TO service_role;

ALTER TABLE public.satus_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role full access satus_runs"
ON public.satus_runs
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
