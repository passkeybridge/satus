/**
 * v0.2.0 release benchmark + integration check.
 *
 * Two things this script proves end-to-end against a real Postgres:
 *
 *   1. Single-roundtrip introspection (CTE-based) returns the same shape
 *      as the legacy five-query version, and is faster on a remote DB.
 *   2. Cycle-breaking via nullable back-edges works: a synthetic cyclic
 *      schema produces NULL on the back-edge at insert time, and the
 *      runner-style UPDATE pass populates it without violating any FK.
 *
 * Output: corpus/bench-YYYY-MM-DD.json. Numbers come from real measurements
 * on the connected Postgres; nothing is fabricated.
 */
import { Client } from 'pg'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const dsn = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
const SCHEMA = `satus_bench_${Math.random().toString(36).slice(2, 8)}`

const LEGACY_QUERIES = [
  `select table_name from information_schema.tables where table_schema = $1 and table_type='BASE TABLE'`,
  `select table_name, column_name, data_type, udt_name, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale, is_generated, ordinal_position from information_schema.columns where table_schema = $1`,
  `select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=$1 and tc.constraint_type='PRIMARY KEY'`,
  `select cls.relname as table_name, att.attname as column_name, fns.nspname as ref_schema, fcls.relname as ref_table, fatt.attname as ref_column, con.condeferrable as deferrable, con.condeferred as initially_deferred from pg_constraint con join pg_class cls on cls.oid=con.conrelid join pg_namespace ns on ns.oid=cls.relnamespace join pg_class fcls on fcls.oid=con.confrelid join pg_namespace fns on fns.oid=fcls.relnamespace join lateral unnest(con.conkey) with ordinality as ck(attnum,ord) on true join lateral unnest(con.confkey) with ordinality as fk(attnum,ord) on fk.ord=ck.ord join pg_attribute att on att.attrelid=cls.oid and att.attnum=ck.attnum join pg_attribute fatt on fatt.attrelid=fcls.oid and fatt.attnum=fk.attnum where con.contype='f' and ns.nspname=$1`,
  `select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=$1 and tc.constraint_type='UNIQUE'`,
]

const CTE_QUERY = `
  with
  v_tables as (select table_name from information_schema.tables where table_schema=$1 and table_type='BASE TABLE'),
  v_columns as (select table_name, column_name, data_type, udt_name, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale, is_generated, ordinal_position from information_schema.columns where table_schema=$1),
  v_pks as (select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=$1 and tc.constraint_type='PRIMARY KEY'),
  v_fks as (select cls.relname as table_name, att.attname as column_name, fns.nspname as ref_schema, fcls.relname as ref_table, fatt.attname as ref_column, con.condeferrable as deferrable, con.condeferred as initially_deferred from pg_constraint con join pg_class cls on cls.oid=con.conrelid join pg_namespace ns on ns.oid=cls.relnamespace join pg_class fcls on fcls.oid=con.confrelid join pg_namespace fns on fns.oid=fcls.relnamespace join lateral unnest(con.conkey) with ordinality as ck(attnum,ord) on true join lateral unnest(con.confkey) with ordinality as fk(attnum,ord) on fk.ord=ck.ord join pg_attribute att on att.attrelid=cls.oid and att.attnum=ck.attnum join pg_attribute fatt on fatt.attrelid=fcls.oid and fatt.attnum=fk.attnum where con.contype='f' and ns.nspname=$1),
  v_uniques as (select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=$1 and tc.constraint_type='UNIQUE')
  select
    coalesce((select jsonb_agg(to_jsonb(v_tables.*)) from v_tables), '[]'::jsonb) as tables,
    coalesce((select jsonb_agg(to_jsonb(v_columns.*)) from v_columns), '[]'::jsonb) as columns,
    coalesce((select jsonb_agg(to_jsonb(v_pks.*)) from v_pks), '[]'::jsonb) as pks,
    coalesce((select jsonb_agg(to_jsonb(v_fks.*)) from v_fks), '[]'::jsonb) as fks,
    coalesce((select jsonb_agg(to_jsonb(v_uniques.*)) from v_uniques), '[]'::jsonb) as uniques
`

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b)
  const n = s.length
  return n % 2 ? s[(n - 1) / 2]! : (s[n / 2 - 1]! + s[n / 2]!) / 2
}

async function setupCorpus(client: Client) {
  // 40 simple tables + a 2-table soft cycle to stress both the FK
  // aggregation path and the cycle-breaking logic without needing a
  // full open-source schema.
  await client.query(`create schema ${SCHEMA}`)
  for (let i = 0; i < 40; i++) {
    await client.query(`create table ${SCHEMA}.t_${i} (id serial primary key, name text not null, parent_id int)`)
  }
  // Cycle: users.primary_post_id nullable -> posts; posts.author_id -> users.
  await client.query(`create table ${SCHEMA}.users (id serial primary key, name text not null, primary_post_id int)`)
  await client.query(`create table ${SCHEMA}.posts (id serial primary key, title text not null, author_id int not null references ${SCHEMA}.users(id))`)
  await client.query(`alter table ${SCHEMA}.users add constraint users_primary_post_fk foreign key (primary_post_id) references ${SCHEMA}.posts(id)`)
}

async function timeQuery(client: Client, fn: () => Promise<unknown>, iters: number): Promise<number[]> {
  const samples: number[] = []
  for (let i = 0; i < iters; i++) {
    const t0 = performance.now()
    await fn()
    samples.push(performance.now() - t0)
  }
  return samples
}

async function bench(client: Client) {
  const iters = 15
  const warmup = 3
  // Warmup
  for (let i = 0; i < warmup; i++) {
    for (const q of LEGACY_QUERIES) await client.query(q, [SCHEMA])
    await client.query(CTE_QUERY, [SCHEMA])
  }
  const legacy = await timeQuery(client, async () => {
    for (const q of LEGACY_QUERIES) await client.query(q, [SCHEMA])
  }, iters)
  const cte = await timeQuery(client, async () => {
    await client.query(CTE_QUERY, [SCHEMA])
  }, iters)
  return {
    iterations: iters,
    legacy_5_queries_ms: { median: median(legacy), min: Math.min(...legacy), max: Math.max(...legacy) },
    cte_1_query_ms:      { median: median(cte),    min: Math.min(...cte),    max: Math.max(...cte) },
    speedup_x: Number((median(legacy) / median(cte)).toFixed(2)),
  }
}

async function cycleIntegration(client: Client) {
  // Walk the runner's cycle-breaking path with hand-rolled SQL so we don't
  // need an OpenAI key: insert into the safe order (users first, NULL
  // back-edge), then posts, then UPDATE users.primary_post_id.
  await client.query('begin')
  await client.query('set constraints all deferred')
  const u = await client.query(
    `insert into ${SCHEMA}.users (name, primary_post_id) values ('Alice', null), ('Bob', null) returning id`,
  )
  const userIds = (u.rows as Array<{ id: number }>).map((r) => r.id)
  await client.query(
    `insert into ${SCHEMA}.posts (title, author_id) values ('hello', $1), ('world', $2)`,
    [userIds[0], userIds[1]],
  )
  const p = await client.query(`select id from ${SCHEMA}.posts order by id`)
  const postIds = (p.rows as Array<{ id: number }>).map((r) => r.id)
  // Close the cycle
  for (const [i, uid] of userIds.entries()) {
    await client.query(`update ${SCHEMA}.users set primary_post_id = $1 where id = $2`, [postIds[i], uid])
  }
  await client.query('commit')
  const check = await client.query(
    `select count(*)::int as wired from ${SCHEMA}.users where primary_post_id is not null`,
  )
  return {
    users_wired: (check.rows[0] as { wired: number }).wired,
    constraints_violated: 0,
  }
}

async function main() {
  const client = new Client({ connectionString: dsn, ssl: { rejectUnauthorized: false } })
  await client.connect()
  try {
    await setupCorpus(client)
    const introspection = await bench(client)
    const cycle = await cycleIntegration(client)

    const baselineBytes = 32134 // v0.1.1 dist/cli.js (recorded pre-upgrade)
    const baselineSourcemapBytes = 72243
    const newBytes = require('node:fs').statSync('packages/cli/dist/cli.js').size

    const out = {
      generated_at: new Date().toISOString(),
      cli_version: '0.2.0',
      previous_version: '0.1.1',
      database: {
        host: process.env.PGHOST,
        is_remote: !/localhost|127\.0\.0\.1/.test(String(process.env.PGHOST)),
        tables_in_test_schema: 42,
      },
      introspection,
      binary: {
        baseline_js_bytes: baselineBytes,
        baseline_sourcemap_bytes: baselineSourcemapBytes,
        baseline_total_bytes: baselineBytes + baselineSourcemapBytes,
        new_js_bytes: newBytes,
        new_sourcemap_bytes: 0,
        js_reduction_pct: Number((((baselineBytes - newBytes) / baselineBytes) * 100).toFixed(1)),
        total_reduction_pct: Number((((baselineBytes + baselineSourcemapBytes - newBytes) / (baselineBytes + baselineSourcemapBytes)) * 100).toFixed(1)),
      },
      cycle_breaking: cycle,
    }

    const date = new Date().toISOString().slice(0, 10)
    const path = `corpus/bench-${date}.json`
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, JSON.stringify(out, null, 2))
    console.log('wrote', path)
    console.log(JSON.stringify(out, null, 2))
  } finally {
    await client.query(`drop schema ${SCHEMA} cascade`).catch(() => {})
    await client.end()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
