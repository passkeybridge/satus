// Microbenchmark for satus CLI introspection.
//
// Times v0.1 (five sequential catalog queries) vs v0.2 (one CTE+jsonb_agg
// round-trip) against the configured DSN. Both implementations are kept in
// this file so we don't need to swap source between runs.
//
// Local socket numbers understate the v0.2 win because each round-trip
// is ~10µs. The win is in round-trip count: 5 → 1. Against a managed
// Postgres with ~30-100ms RTT, that's the dominant cost.
import { Client } from 'pg'
import { performance } from 'node:perf_hooks'

const V01_SQL = {
  tables: `
    select table_name
    from information_schema.tables
    where table_schema = $1
      and table_type = 'BASE TABLE'
    order by table_name
  `,
  columns: `
    select table_name, column_name, data_type, udt_name, is_nullable,
      column_default, character_maximum_length, numeric_precision,
      numeric_scale, is_generated
    from information_schema.columns
    where table_schema = $1
    order by table_name, ordinal_position
  `,
  pks: `
    select kcu.table_name, kcu.column_name
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_schema = kcu.constraint_schema
     and tc.constraint_name   = kcu.constraint_name
    where tc.table_schema = $1
      and tc.constraint_type = 'PRIMARY KEY'
  `,
  fks: `
    select cls.relname as table_name, att.attname as column_name,
      fcls.relname as ref_table, fatt.attname as ref_column
    from pg_constraint con
    join pg_class cls    on cls.oid = con.conrelid
    join pg_namespace ns on ns.oid = cls.relnamespace
    join pg_class fcls   on fcls.oid = con.confrelid
    join pg_namespace fns on fns.oid = fcls.relnamespace
    join lateral unnest(con.conkey)  with ordinality as ck(attnum, ord) on true
    join lateral unnest(con.confkey) with ordinality as fk(attnum, ord) on fk.ord = ck.ord
    join pg_attribute att  on att.attrelid  = cls.oid  and att.attnum  = ck.attnum
    join pg_attribute fatt on fatt.attrelid = fcls.oid and fatt.attnum = fk.attnum
    where con.contype = 'f' and ns.nspname = $1
  `,
  uniques: `
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
  `,
}

async function v01(client, schema) {
  const a = await client.query(V01_SQL.tables, [schema])
  const b = await client.query(V01_SQL.columns, [schema])
  const c = await client.query(V01_SQL.pks, [schema])
  const d = await client.query(V01_SQL.fks, [schema])
  const e = await client.query(V01_SQL.uniques, [schema])
  return { tables: a.rows.length, cols: b.rows.length, fks: d.rows.length }
}

const V02_SQL = `
  with
  v_tables as (select table_name from information_schema.tables
    where table_schema = $1 and table_type = 'BASE TABLE' order by table_name),
  v_columns as (select table_name, column_name, data_type, udt_name, is_nullable,
    column_default, character_maximum_length, numeric_precision, numeric_scale,
    is_generated, ordinal_position
    from information_schema.columns where table_schema = $1
    order by table_name, ordinal_position),
  v_pks as (select kcu.table_name, kcu.column_name
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_schema = kcu.constraint_schema
     and tc.constraint_name   = kcu.constraint_name
    where tc.table_schema = $1 and tc.constraint_type = 'PRIMARY KEY'),
  v_fks as (select cls.relname as table_name, att.attname as column_name,
    fcls.relname as ref_table, fatt.attname as ref_column,
    con.condeferrable as deferrable, con.condeferred as initially_deferred
    from pg_constraint con
    join pg_class cls on cls.oid = con.conrelid
    join pg_namespace ns on ns.oid = cls.relnamespace
    join pg_class fcls on fcls.oid = con.confrelid
    join pg_namespace fns on fns.oid = fcls.relnamespace
    join lateral unnest(con.conkey) with ordinality as ck(attnum, ord) on true
    join lateral unnest(con.confkey) with ordinality as fk(attnum, ord) on fk.ord = ck.ord
    join pg_attribute att on att.attrelid = cls.oid and att.attnum = ck.attnum
    join pg_attribute fatt on fatt.attrelid = fcls.oid and fatt.attnum = fk.attnum
    where con.contype = 'f' and ns.nspname = $1),
  v_uniques as (select kcu.table_name, kcu.column_name
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_schema = kcu.constraint_schema
     and tc.constraint_name   = kcu.constraint_name
    where tc.table_schema = $1 and tc.constraint_type = 'UNIQUE'
      and (select count(*) from information_schema.key_column_usage k2
        where k2.constraint_schema = tc.constraint_schema
          and k2.constraint_name   = tc.constraint_name) = 1)
  select
    coalesce((select jsonb_agg(to_jsonb(v_tables.*))  from v_tables),  '[]'::jsonb) as tables,
    coalesce((select jsonb_agg(to_jsonb(v_columns.*)) from v_columns), '[]'::jsonb) as columns,
    coalesce((select jsonb_agg(to_jsonb(v_pks.*))     from v_pks),     '[]'::jsonb) as pks,
    coalesce((select jsonb_agg(to_jsonb(v_fks.*))     from v_fks),     '[]'::jsonb) as fks,
    coalesce((select jsonb_agg(to_jsonb(v_uniques.*)) from v_uniques), '[]'::jsonb) as uniques
`

async function v02(client, schema) {
  const r = await client.query(V02_SQL, [schema])
  const row = r.rows[0]
  return { tables: row.tables.length, cols: row.columns.length, fks: row.fks.length }
}

function stats(samples) {
  samples.sort((a, b) => a - b)
  const pct = (p) => samples[Math.floor((samples.length - 1) * p)]
  return {
    min_ms: +samples[0].toFixed(2),
    median_ms: +pct(0.5).toFixed(2),
    p95_ms: +pct(0.95).toFixed(2),
    max_ms: +samples[samples.length - 1].toFixed(2),
  }
}

async function bench(fn, client, schema, n) {
  await fn(client, schema) // warmup
  const samples = []
  for (let i = 0; i < n; i++) {
    const t0 = performance.now()
    await fn(client, schema)
    samples.push(performance.now() - t0)
  }
  return stats(samples)
}

const DSN = process.env.BENCH_DSN || 'postgresql://postgres@/postgres?host=/tmp&port=55432'
const SCHEMA = process.env.BENCH_SCHEMA || 'public'
const N = Number(process.env.BENCH_N || 50)

const client = new Client({ connectionString: DSN })
await client.connect()

const info = await v02(client, SCHEMA)
console.error(`schema "${SCHEMA}": ${info.tables} tables, ${info.cols} cols, ${info.fks} fks; N=${N}`)

const r01 = await bench(v01, client, SCHEMA, N)
const r02 = await bench(v02, client, SCHEMA, N)
const ratio = +(r01.median_ms / r02.median_ms).toFixed(2)

await client.end()
console.log(JSON.stringify({
  dsn_kind: DSN.includes('host=/') ? 'unix-socket' : 'tcp',
  schema_size: info,
  n_per_variant: N,
  v01_five_roundtrips: r01,
  v02_one_roundtrip:   r02,
  speedup_median: ratio,
}, null, 2))
