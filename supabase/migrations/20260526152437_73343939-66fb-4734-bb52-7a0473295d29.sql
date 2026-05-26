
GRANT USAGE ON SCHEMA satus_demo TO anon, authenticated, service_role, postgres;
GRANT ALL ON ALL TABLES IN SCHEMA satus_demo TO anon, authenticated, service_role, postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA satus_demo TO anon, authenticated, service_role, postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA satus_demo GRANT ALL ON TABLES TO anon, authenticated, service_role, postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA satus_demo GRANT ALL ON SEQUENCES TO anon, authenticated, service_role, postgres;
