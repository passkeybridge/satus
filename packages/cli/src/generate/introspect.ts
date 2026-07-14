/**
 * Postgres schema introspection. We pull tables, columns, primary keys,
 * foreign keys, and single-column unique constraints from the catalog
 * scoped to a single schema. The output feeds both the topological sort
 * and the LLM JSON schema builder.
 *
 * v0.1 deliberately stayed in one schema (default: public). Cross-schema
 * FKs are flagged but the referenced rows must already exist; we do not
 * attempt to introspect or seed schemas the user did not target.
 *
 * v0.2 collapses the five catalog lookups into one round-trip and
 * surfaces FK deferrability flags so the runner can break cycles
 * via SET CONSTRAINTS ALL DEFERRED.
 */
import type { Client } from 'pg'

export interface Column {
  name: string
  dataType: string // information_schema.data_type, e.g. "text", "integer"
  udtName: string // pg_catalog name, e.g. "int4", "uuid", "_text"
  isNullable: boolean
  hasDefault: boolean
  defaultExpr: string | null
  charMaxLength: number | null
  numericPrecision: number | null
  numericScale: number | null
  isGenerated: boolean // GENERATED ALWAYS / IDENTITY columns
}

export interface ForeignKey {
  column: string
  refSchema: string
  refTable: string
  refColumn: string
  /** SQL-level DEFERRABLE (vs the default NOT DEFERRABLE). */
  deferrable: boolean
  /** DEFERRABLE INITIALLY DEFERRED. Implies deferrable=true. */
  initiallyDeferred: boolean
}

export interface Table {
  schema: string
  name: string
  columns: Column[]
  primaryKey: string[]
  foreignKeys: ForeignKey[]
  /** Single-column unique constraints. Multi-col uniques are noted but not enforced in v0.x. */
  uniqueColumns: Set<string>
}

export interface IntrospectedSchema {
  schema: string
  tables: Table[]
}

// v0.2: catalog introspection collapses into a single round-trip.
//
// v0.1 issued five sequential queries. Each one paid the network
// round-trip cost (cheap on a unix socket, ~30-100ms on managed
// Postgres like Supabase/Neon). On a 70-table schema against a
// remote DB that meant roughly half a second of pure wire latency
// before the first row was generated.
//
// v0.2 wraps the five lookups in CTEs and aggregates each into a
// JSONB array, returning one row with five keys. The server still
// executes the same five scans, but the client pays one round-trip
// instead of five. On a hot local socket the win is small (~5%);
// on a remote DB it scales linearly with round-trip time.
//
// FK introspection deliberately uses pg_catalog rather than
// information_schema.constraint_column_usage, which is
// privilege-filtered: a role that can read the table but not the
// parent table sees zero FK rows, silently breaking the topo sort.
// pg_catalog returns FK metadata for any role that can see the
// table.
//
// FK rows also surface condeferrable / condeferred so the runner
// can decide whether a topo-cycle is breakable via
// SET CONSTRAINTS ALL DEFERRED.
// Partitioned tables need special care. In pg_catalog a partitioned
// parent has relkind='p' and each partition child has relispartition=true.
// Postgres routes INSERTs on the parent to the correct partition, so we
// want to seed only the parent — not the children. But FKs are often
// declared per-partition in real-world schemas (pagila does this), which
// means naive introspection sees the parent as FK-less and the topo sort
// places it at in-degree 0. The runner then tries to INSERT into the
// parent before its FK targets exist and Postgres rejects the row.
//
// Fix: exclude partition children from v_tables, and use
// pg_partition_root() to re-attribute any FK declared on a partition
// child back to the topmost partitioned ancestor. Duplicate FK rows
// (same parent, same column pair) are collapsed with GROUP BY.
const INTROSPECT_SQL = `
  with
  v_tables as (
    select c.relname as table_name
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = $1
      and c.relkind in ('r', 'p')
      and not c.relispartition
    order by c.relname
  ),
  v_columns as (
    select
      table_name, column_name, data_type, udt_name, is_nullable,
      column_default, character_maximum_length, numeric_precision,
      numeric_scale, is_generated, ordinal_position
    from information_schema.columns
    where table_schema = $1
    order by table_name, ordinal_position
  ),
  v_pks as (
    select kcu.table_name, kcu.column_name, kcu.ordinal_position
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_schema = kcu.constraint_schema
     and tc.constraint_name   = kcu.constraint_name
    where tc.table_schema = $1
      and tc.constraint_type = 'PRIMARY KEY'
    order by kcu.table_name, kcu.ordinal_position
  ),
  v_fks_raw as (
    -- Attribute the FK to the partition root when the constraint is
    -- declared on a partition child. coalesce falls back to the table
    -- itself for non-partitioned tables.
    select
      coalesce(root_cls.relname, cls.relname)   as table_name,
      att.attname                               as column_name,
      coalesce(root_fns.nspname, fns.nspname)   as ref_schema,
      coalesce(root_fcls.relname, fcls.relname) as ref_table,
      fatt.attname                              as ref_column,
      con.condeferrable                         as is_deferrable,
      con.condeferred                           as is_initially_deferred
    from pg_constraint con
    join pg_class cls    on cls.oid = con.conrelid
    join pg_namespace ns on ns.oid = cls.relnamespace
    join pg_class fcls   on fcls.oid = con.confrelid
    join pg_namespace fns on fns.oid = fcls.relnamespace
    left join pg_class     root_cls  on cls.relispartition  and root_cls.oid  = pg_partition_root(cls.oid)
    left join pg_namespace root_ns   on root_ns.oid = root_cls.relnamespace
    left join pg_class     root_fcls on fcls.relispartition and root_fcls.oid = pg_partition_root(fcls.oid)
    left join pg_namespace root_fns  on root_fns.oid = root_fcls.relnamespace
    join lateral unnest(con.conkey)  with ordinality as ck(attnum, ord) on true
    join lateral unnest(con.confkey) with ordinality as fk(attnum, ord) on fk.ord = ck.ord
    join pg_attribute att  on att.attrelid  = cls.oid  and att.attnum  = ck.attnum
    join pg_attribute fatt on fatt.attrelid = fcls.oid and fatt.attnum = fk.attnum
    where con.contype = 'f'
      and coalesce(root_ns.nspname, ns.nspname) = $1
  ),
  v_fks as (
    -- Dedupe: when a FK is declared on the parent, Postgres also creates
    -- an inherited row on every partition child. All rows carry the same
    -- column pair; bool_or preserves DEFERRABLE if any copy has it.
    select
      table_name, column_name, ref_schema, ref_table, ref_column,
      bool_or(is_deferrable)         as is_deferrable,
      bool_or(is_initially_deferred) as is_initially_deferred
    from v_fks_raw
    group by table_name, column_name, ref_schema, ref_table, ref_column
  ),
  v_uniques as (
    -- Single-column unique constraints only. Multi-col uniques require
    -- coordinated generation across columns; we skip them in v0.x to
    -- keep the failure surface small.
    select kcu.table_name, kcu.column_name
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_schema = kcu.constraint_schema
     and tc.constraint_name   = kcu.constraint_name
    where tc.table_schema = $1
      and tc.constraint_type = 'UNIQUE'
      and (
        select count(*) from information_schema.key_column_usage k2
        where k2.constraint_schema = tc.constraint_schema
          and k2.constraint_name   = tc.constraint_name
      ) = 1
  )
  select
    coalesce((select jsonb_agg(to_jsonb(v_tables.*))  from v_tables),  '[]'::jsonb) as tables,
    coalesce((select jsonb_agg(to_jsonb(v_columns.*)) from v_columns), '[]'::jsonb) as columns,
    coalesce((select jsonb_agg(to_jsonb(v_pks.*))     from v_pks),     '[]'::jsonb) as pks,
    coalesce((select jsonb_agg(to_jsonb(v_fks.*))     from v_fks),     '[]'::jsonb) as fks,
    coalesce((select jsonb_agg(to_jsonb(v_uniques.*)) from v_uniques), '[]'::jsonb) as uniques
`


export async function introspect(
  client: Client,
  schema: string,
  exclude: string[] = [],
): Promise<IntrospectedSchema> {
  const skip = new Set(exclude)
  const res = await client.query(INTROSPECT_SQL, [schema])
  const row = res.rows[0] as {
    tables: Array<{ table_name: string }>
    columns: Array<{
      table_name: string
      column_name: string
      data_type: string
      udt_name: string
      is_nullable: string
      column_default: string | null
      character_maximum_length: number | null
      numeric_precision: number | null
      numeric_scale: number | null
      is_generated: string
    }>
    pks: Array<{ table_name: string; column_name: string }>
    fks: Array<{
      table_name: string
      column_name: string
      ref_schema: string
      ref_table: string
      ref_column: string
      deferrable: boolean
      initially_deferred: boolean
    }>
    uniques: Array<{ table_name: string; column_name: string }>
  }

  const tablesByName = new Map<string, Table>()
  for (const r of row.tables) {
    if (skip.has(r.table_name)) continue
    tablesByName.set(r.table_name, {
      schema,
      name: r.table_name,
      columns: [],
      primaryKey: [],
      foreignKeys: [],
      uniqueColumns: new Set(),
    })
  }

  for (const r of row.columns) {
    const t = tablesByName.get(r.table_name)
    if (!t) continue
    t.columns.push({
      name: r.column_name,
      dataType: r.data_type,
      udtName: r.udt_name,
      isNullable: r.is_nullable === 'YES',
      hasDefault: r.column_default !== null,
      defaultExpr: r.column_default,
      charMaxLength: r.character_maximum_length,
      numericPrecision: r.numeric_precision,
      numericScale: r.numeric_scale,
      isGenerated: !!r.is_generated && r.is_generated !== 'NEVER',
    })
  }

  for (const r of row.pks) {
    tablesByName.get(r.table_name)?.primaryKey.push(r.column_name)
  }

  for (const r of row.fks) {
    tablesByName.get(r.table_name)?.foreignKeys.push({
      column: r.column_name,
      refSchema: r.ref_schema,
      refTable: r.ref_table,
      refColumn: r.ref_column,
      deferrable: r.deferrable === true,
      initiallyDeferred: r.initially_deferred === true,
    })
  }

  for (const r of row.uniques) {
    tablesByName.get(r.table_name)?.uniqueColumns.add(r.column_name)
  }

  return { schema, tables: Array.from(tablesByName.values()) }
}
