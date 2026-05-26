/**
 * Postgres schema introspection. We pull tables, columns, primary keys,
 * foreign keys, and single-column unique constraints from the catalog
 * in four queries scoped to a single schema. The output feeds both the
 * topological sort and the LLM JSON schema builder.
 *
 * v0.1 deliberately stays in one schema (default: public). Cross-schema
 * FKs are flagged but the referenced rows must already exist; we do not
 * attempt to introspect or seed schemas the user did not target.
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
}

export interface Table {
  schema: string
  name: string
  columns: Column[]
  primaryKey: string[]
  foreignKeys: ForeignKey[]
  /** Single-column unique constraints. Multi-col uniques are noted but not enforced in v0.1. */
  uniqueColumns: Set<string>
}

export interface IntrospectedSchema {
  schema: string
  tables: Table[]
}

const TABLES_SQL = `
  select table_name
  from information_schema.tables
  where table_schema = $1
    and table_type = 'BASE TABLE'
  order by table_name
`

const COLUMNS_SQL = `
  select
    table_name,
    column_name,
    data_type,
    udt_name,
    is_nullable,
    column_default,
    character_maximum_length,
    numeric_precision,
    numeric_scale,
    is_generated
  from information_schema.columns
  where table_schema = $1
  order by table_name, ordinal_position
`

const PK_SQL = `
  select kcu.table_name, kcu.column_name, kcu.ordinal_position
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_schema = kcu.constraint_schema
   and tc.constraint_name   = kcu.constraint_name
  where tc.table_schema = $1
    and tc.constraint_type = 'PRIMARY KEY'
  order by kcu.table_name, kcu.ordinal_position
`

const FK_SQL = `
  select
    kcu.table_name      as table_name,
    kcu.column_name     as column_name,
    ccu.table_schema    as ref_schema,
    ccu.table_name      as ref_table,
    ccu.column_name     as ref_column
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_schema = kcu.constraint_schema
   and tc.constraint_name   = kcu.constraint_name
  join information_schema.constraint_column_usage ccu
    on tc.constraint_schema = ccu.constraint_schema
   and tc.constraint_name   = ccu.constraint_name
  where tc.table_schema = $1
    and tc.constraint_type = 'FOREIGN KEY'
`

// Single-column unique constraints. We deliberately ignore multi-col uniques
// in v0.1 — they require coordinated generation across columns, which adds
// failure modes without changing the happy-path output much.
const UNIQUE_SQL = `
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
`

export async function introspect(
  client: Client,
  schema: string,
  exclude: string[] = [],
): Promise<IntrospectedSchema> {
  const skip = new Set(exclude)
  const tablesRes = await client.query(TABLES_SQL, [schema])
  const colsRes = await client.query(COLUMNS_SQL, [schema])
  const pksRes = await client.query(PK_SQL, [schema])
  const fksRes = await client.query(FK_SQL, [schema])
  const uqRes = await client.query(UNIQUE_SQL, [schema])

  const tablesByName = new Map<string, Table>()
  for (const r of tablesRes.rows) {
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

  for (const r of colsRes.rows) {
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
      isGenerated: r.is_generated && r.is_generated !== 'NEVER',
    })
  }

  for (const r of pksRes.rows) {
    tablesByName.get(r.table_name)?.primaryKey.push(r.column_name)
  }

  for (const r of fksRes.rows) {
    tablesByName.get(r.table_name)?.foreignKeys.push({
      column: r.column_name,
      refSchema: r.ref_schema,
      refTable: r.ref_table,
      refColumn: r.ref_column,
    })
  }

  for (const r of uqRes.rows) {
    tablesByName.get(r.table_name)?.uniqueColumns.add(r.column_name)
  }

  return { schema, tables: Array.from(tablesByName.values()) }
}
