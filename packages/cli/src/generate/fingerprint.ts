/**
 * DDL fingerprinting for opt-in v0.3.3 telemetry.
 *
 * Purpose: give the maintainers a stable, anonymised identifier for the
 * *shape* of a target schema across runs, without ever transmitting the
 * schema's actual identifiers or row data. Two schemas that are
 * structurally identical but differ in whitespace, column order, or
 * casing produce the same SHA-256; two schemas that differ in a single
 * column type or FK edge produce different SHA-256s.
 *
 * Off by default. Only computed when `telemetry.share_failure_fingerprints`
 * is true in satus.config.json.
 *
 * The normalisation intentionally drops:
 *   - actual column and table names (replaced by their sorted position)
 *   - default expressions (may embed user-defined function names or literals)
 *   - char_max_length / numeric_precision / numeric_scale (schema *shape*,
 *     not sizing, is what discriminates failure modes)
 *
 * The normalisation intentionally preserves:
 *   - the set of column types (udt_name) per table, sorted
 *   - the set of FK edges (source-table-index -> target-table-index), sorted
 *   - primary-key arity per table
 *   - single-column unique arity per table
 *
 * This is enough to cluster failure modes ("all schemas that mix citext
 * with an int4 FK") without ever needing to know which schema was which.
 */
import { createHash } from 'node:crypto'
import type { IntrospectedSchema } from './introspect.js'

interface NormalizedTable {
  /** Sorted, comma-joined list of udt names. Never the column names. */
  cols: string
  /** Number of columns in the primary key. */
  pkArity: number
  /** Number of single-column unique constraints. */
  uniques: number
}

interface NormalizedFk {
  from: number
  to: number
}

interface Normalized {
  tables: NormalizedTable[]
  fks: NormalizedFk[]
}

export function normalize(schema: IntrospectedSchema): Normalized {
  // Sort tables by name so the position index is deterministic.
  const sortedTables = [...schema.tables].sort((a, b) => a.name.localeCompare(b.name))
  const indexByName = new Map(sortedTables.map((t, i) => [t.name, i]))

  const tables: NormalizedTable[] = sortedTables.map((t) => ({
    cols: [...t.columns].map((c) => c.udtName.toLowerCase()).sort().join(','),
    pkArity: t.primaryKey.length,
    uniques: t.uniqueColumns.size,
  }))

  const fks: NormalizedFk[] = []
  for (const t of sortedTables) {
    const from = indexByName.get(t.name)!
    for (const fk of t.foreignKeys) {
      const to = indexByName.get(fk.refTable)
      if (to === undefined) continue // cross-schema FK; skip rather than leak name
      fks.push({ from, to })
    }
  }
  fks.sort((a, b) => (a.from - b.from) || (a.to - b.to))

  return { tables, fks }
}

/**
 * Return a 64-char lowercase hex SHA-256 of the normalised schema.
 * Stable across runs, across formatting differences, across identifier
 * renames that don't change structural shape.
 */
export function fingerprint(schema: IntrospectedSchema): string {
  const normalized = normalize(schema)
  const canonical = JSON.stringify(normalized)
  return createHash('sha256').update(canonical).digest('hex')
}
