
-- E2E health log
CREATE TABLE public.e2e_health_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('pass','fail')),
  duration_ms integer NOT NULL,
  checks jsonb NOT NULL,
  error_message text,
  triggered_by text NOT NULL DEFAULT 'cron'
);

ALTER TABLE public.e2e_health_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role full access e2e_health_log"
  ON public.e2e_health_log
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_e2e_health_log_created_at ON public.e2e_health_log (created_at DESC);

-- Seed permanent test license for the E2E
INSERT INTO public.licenses (
  license_key, email, stripe_customer_id, stripe_subscription_id,
  plan, status, environment
) VALUES (
  'satus_test_e2e0000000000000000000000000000',
  'e2e+monitor@satus.sh',
  'cus_e2e_monitor',
  'sub_e2e_monitor',
  'monitor',
  'active',
  'test'
) ON CONFLICT DO NOTHING;
