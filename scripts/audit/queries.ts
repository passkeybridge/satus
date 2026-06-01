/**
 * Introspection queries used by the corpus audit. Each returns a single
 * row of integers/aggregates against the currently-connected database,
 * scoped to user-defined schemas (we exclude pg_catalog, information_schema,
 * pg_toast, and the supabase/extensions noise that appears when the
 * project's own migrations are applied).
 *
 * Keep queries dependent only on pg_catalog + information_schema — no
 * extension-specific catalogs — so they run against any vanilla cluster.
 */

export const USER_SCHEMAS_FILTER = `
  nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast', 'extensions', 'graphql', 'graphql_public', 'realtime', 'storage', 'vault', 'pgsodium', 'pgsodium_masks', 'supabase_functions', 'net', 'pgmq', 'auth', 'cron')
  AND nspname NOT LIKE 'pg_%'
`;

export const TABLE_COUNTS = `
  SELECT
    count(*) FILTER (WHERE c.relkind = 'r')::int AS tables_total,
    count(*) FILTER (WHERE c.relkind = 'p')::int AS partitioned_parents,
    count(*) FILTER (WHERE c.relkind = 'p' AND c.relrowsecurity)::int AS partitioned_parents_with_rls
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE ${USER_SCHEMAS_FILTER};
`;

/**
 * Partitioned parents whose children skip RLS. A parent's policy does NOT
 * apply when you query a child partition directly (this is the subject of
 * 2026-06-01-partitioned-tables-meet-rls). We count parents where the
 * parent has RLS enabled but at least one child has neither relrowsecurity
 * nor relforcerowsecurity set.
 */
export const PARTITIONS_UNPROTECTED_CHILDREN = `
  WITH parents AS (
    SELECT c.oid, c.relname, n.nspname
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind = 'p' AND c.relrowsecurity AND (${USER_SCHEMAS_FILTER})
  ),
  parent_children AS (
    SELECT p.oid AS parent_oid, child.oid AS child_oid,
           child.relrowsecurity, child.relforcerowsecurity
    FROM parents p
    JOIN pg_inherits i ON i.inhparent = p.oid
    JOIN pg_class child ON child.oid = i.inhrelid
  )
  SELECT
    count(DISTINCT parent_oid) FILTER (
      WHERE NOT (relrowsecurity OR relforcerowsecurity)
    )::int AS partitioned_parents_with_unprotected_child
  FROM parent_children;
`;

export const COLUMN_COUNTS = `
  SELECT
    count(*)::int AS columns_total,
    count(*) FILTER (WHERE is_nullable = 'YES')::int AS columns_nullable,
    count(*) FILTER (WHERE is_nullable = 'NO')::int AS columns_notnull,
    count(*) FILTER (WHERE is_generated <> 'NEVER')::int AS columns_generated,
    count(*) FILTER (WHERE udt_name = 'citext')::int AS citext_columns,
    count(*) FILTER (
      WHERE udt_name IN ('text', 'varchar', 'bpchar')
        AND column_name ~* 'email'
    )::int AS text_email_columns
  FROM information_schema.columns
  WHERE table_schema NOT IN (
    'pg_catalog','information_schema','pg_toast','extensions','graphql','graphql_public','realtime','storage','vault','pgsodium','pgsodium_masks','supabase_functions','net','pgmq','auth','cron'
  ) AND table_schema NOT LIKE 'pg_%';
`;

export const CONSTRAINT_COUNTS = `
  SELECT
    count(*) FILTER (WHERE contype = 'c')::int AS check_constraints,
    count(*) FILTER (
      WHERE contype = 'u' AND array_length(conkey, 1) = 1
    )::int AS unique_constraints_single_col,
    count(*) FILTER (
      WHERE contype = 'u' AND array_length(conkey, 1) > 1
    )::int AS unique_constraints_multi_col
  FROM pg_constraint con
  JOIN pg_namespace n ON n.oid = con.connamespace
  WHERE ${USER_SCHEMAS_FILTER};
`;

/**
 * Foreign-key edges, scoped to user tables. We materialize the edge list
 * here and do cycle detection (Tarjan SCC) in TS rather than SQL — the
 * cycle algorithm is easier to test outside the database.
 */
// FK_EDGES qualifies the namespace filter to ns.nspname (the constraint's
// own schema) explicitly — the source-side. Cross-schema FKs are still
// returned because the join brings in fns.nspname for the destination.
export const FK_EDGES = `
  SELECT
    ns.nspname || '.' || cls.relname AS src,
    fns.nspname || '.' || fcls.relname AS dst,
    con.conname
  FROM pg_constraint con
  JOIN pg_class cls ON cls.oid = con.conrelid
  JOIN pg_namespace ns ON ns.oid = cls.relnamespace
  JOIN pg_class fcls ON fcls.oid = con.confrelid
  JOIN pg_namespace fns ON fns.oid = fcls.relnamespace
  WHERE con.contype = 'f'
    AND ns.nspname NOT IN ('pg_catalog','information_schema','pg_toast','extensions','graphql','graphql_public','realtime','storage','vault','pgsodium','pgsodium_masks','supabase_functions','net','pgmq','auth','cron')
    AND ns.nspname NOT LIKE 'pg_%';
`;
