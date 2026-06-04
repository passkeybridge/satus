// Microbenchmark for satus CLI introspection.
// Runs introspect() N times against the configured DSN+schema and
// reports min / median / p95 / max in milliseconds.
import { Client } from 'pg'
import { performance } from 'node:perf_hooks'
import { introspect } from './src/generate/introspect.ts'

const DSN = process.env.BENCH_DSN || 'postgresql://postgres@/postgres?host=/tmp&port=55432'
const SCHEMA = process.env.BENCH_SCHEMA || 'public'
const N = Number(process.env.BENCH_N || 25)

const client = new Client({ connectionString: DSN })
await client.connect()

// Warmup
await introspect(client, SCHEMA)

const samples = []
for (let i = 0; i < N; i++) {
  const t0 = performance.now()
  const s = await introspect(client, SCHEMA)
  samples.push(performance.now() - t0)
  if (i === 0) {
    console.error(`schema "${SCHEMA}": ${s.tables.length} tables, ` +
      `${s.tables.reduce((a, t) => a + t.columns.length, 0)} columns, ` +
      `${s.tables.reduce((a, t) => a + t.foreignKeys.length, 0)} FKs`)
  }
}
await client.end()

samples.sort((a, b) => a - b)
const pct = (p) => samples[Math.floor((samples.length - 1) * p)]
console.log(JSON.stringify({
  n: N,
  min_ms: +samples[0].toFixed(2),
  median_ms: +pct(0.5).toFixed(2),
  p95_ms: +pct(0.95).toFixed(2),
  max_ms: +samples[samples.length - 1].toFixed(2),
}, null, 2))
