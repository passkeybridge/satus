/**
 * Transactional writer. All inserts for a single `satus generate` run
 * happen inside one BEGIN/COMMIT, so a failure half-way through leaves
 * the database exactly as it was. The writer returns the inserted PK
 * values to the orchestrator so downstream tables can use them as FK
 * targets.
 *
 * We use parameterized multi-row INSERT ... RETURNING. COPY would be
 * faster but it does not return generated PKs, which we need to chain
 * FKs across tables in the same run.
 */
import type { Client } from 'pg'
import type { Table } from './introspect.js'

export interface InsertResult {
  inserted: number
  /** Rows of returned PK columns, in insertion order. */
  returnedPkRows: Array<Record<string, unknown>>
}

function quoteIdent(s: string): string {
  // Defensive: identifiers come from information_schema (trusted), but we
  // still double-quote so reserved words and mixed case round-trip safely.
  return '"' + s.replace(/"/g, '""') + '"'
}

export async function insertRows(
  client: Client,
  table: Table,
  columnNames: string[],
  rows: Array<Record<string, unknown>>,
): Promise<InsertResult> {
  if (rows.length === 0) {
    return { inserted: 0, returnedPkRows: [] }
  }

  const colSql = columnNames.map(quoteIdent).join(', ')
  const placeholders: string[] = []
  const values: unknown[] = []
  let p = 1
  for (const row of rows) {
    const tuple: string[] = []
    for (const c of columnNames) {
      tuple.push(`$${p++}`)
      values.push(serialize(row[c]))
    }
    placeholders.push('(' + tuple.join(', ') + ')')
  }

  const returning = table.primaryKey.length > 0
    ? ' returning ' + table.primaryKey.map(quoteIdent).join(', ')
    : ''

  const sql =
    `insert into ${quoteIdent(table.schema)}.${quoteIdent(table.name)} ` +
    `(${colSql}) values ${placeholders.join(', ')}${returning}`

  const result = await client.query(sql, values)
  return {
    inserted: result.rowCount ?? 0,
    returnedPkRows: result.rows ?? [],
  }
}

/**
 * Coerce model output to a pg-friendly value. Objects/arrays become JSON
 * strings so jsonb columns accept them; everything else passes through.
 */
function serialize(v: unknown): unknown {
  if (v === undefined) return null
  if (v !== null && typeof v === 'object') {
    return JSON.stringify(v)
  }
  return v
}

export async function truncate(client: Client, tables: Table[]): Promise<void> {
  if (tables.length === 0) return
  const names = tables
    .map((t) => `${quoteIdent(t.schema)}.${quoteIdent(t.name)}`)
    .join(', ')
  // RESTART IDENTITY resets sequences so re-runs produce the same low IDs.
  // CASCADE handles FK chains so callers don't have to order the truncate.
  await client.query(`truncate ${names} restart identity cascade`)
}
