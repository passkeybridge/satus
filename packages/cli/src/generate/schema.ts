/**
 * Build a JSON Schema for one table that the LLM will fill via OpenAI
 * structured outputs. We deliberately:
 *
 *   - Skip columns the database fills itself (defaults, identity, generated).
 *     Those land via DEFAULT in the INSERT, which means we don't have to
 *     fight the model about sequences, gen_random_uuid(), now(), etc.
 *   - Skip FK columns entirely. We inject FK values directly from the
 *     already-inserted parent rows after the model returns — letting the
 *     model invent UUIDs would defeat referential integrity.
 *   - Translate each kept column to the narrowest JSON type we can prove
 *     from the catalog. Unknowns fall through to "string" with the column
 *     name as a hint, which works well for text/varchar/citext.
 *
 * Strict mode forces every property to be required and disallows extras,
 * which OpenAI enforces server-side. Nullability is expressed via type
 * unions (["string","null"]) rather than nullable: true because the
 * latter is not part of the JSON Schema dialect OpenAI accepts.
 */
import type { Column, ForeignKey, Table } from './introspect.js'

export interface RowSchema {
  jsonSchema: { name: string; schema: Record<string, unknown> }
  /** Columns the model is asked to produce, in property order. */
  modelColumns: Column[]
  /** FK columns we inject after the model returns. */
  fkColumns: ForeignKey[]
  /** All columns that will be present in the INSERT (modelColumns + fkColumns). */
  insertColumns: string[]
}

function jsonTypeFor(col: Column): { type: string | string[]; format?: string; pattern?: string; minimum?: number; maximum?: number; description?: string } {
  const t = col.udtName.toLowerCase()
  const base = (() => {
    switch (t) {
      case 'bool':
        return { type: 'boolean' as const }
      case 'int2':
        return { type: 'integer' as const, minimum: -32768, maximum: 32767 }
      case 'int4':
        return { type: 'integer' as const, minimum: -2147483648, maximum: 2147483647 }
      case 'int8':
        // JSON cannot safely represent 64-bit ints; cap at 53-bit safe range.
        return { type: 'integer' as const, minimum: -9007199254740991, maximum: 9007199254740991 }
      case 'numeric':
      case 'float4':
      case 'float8':
        return { type: 'number' as const }
      case 'uuid':
        return {
          type: 'string' as const,
          pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
        }
      case 'date':
        return { type: 'string' as const, format: 'date' }
      case 'timestamp':
      case 'timestamptz':
        return { type: 'string' as const, format: 'date-time' }
      case 'json':
      case 'jsonb':
        // Allow any JSON object. We keep it permissive because the column
        // semantics are user-defined.
        return { type: 'object' as const }
      case 'text':
      case 'varchar':
      case 'bpchar':
      case 'citext':
      default:
        return { type: 'string' as const }
    }
  })()

  return base
}

function colDescription(col: Column): string | undefined {
  // Light semantic nudges based on column name. Cheap and often decisive
  // for the model — naming "email" vs "address" vs "phone" routes it to
  // the right generator instinct.
  const n = col.name.toLowerCase()
  if (n === 'email' || n.endsWith('_email')) return 'A realistic email address.'
  if (n === 'phone' || n.endsWith('_phone')) return 'A phone number with country code, e.g. +1-415-555-0142.'
  if (n === 'url' || n.endsWith('_url')) return 'A plausible https URL.'
  if (n === 'name' || n.endsWith('_name')) return 'A realistic human or product name suited to the profile.'
  if (n.includes('price') || n.includes('amount') || n.includes('cost')) return 'A plausible price in the column units.'
  if (n.includes('description') || n.includes('bio') || n.includes('note')) return 'A short, plausible description.'
  if (n.includes('status')) return 'A status keyword. Prefer values typical for the domain (active, pending, archived, etc.).'
  return undefined
}

export function buildRowSchema(table: Table, batchSize: number): RowSchema {
  const fkColumnSet = new Set(table.foreignKeys.map((fk) => fk.column))

  // Columns the model should produce: not generated, not defaulted (so the
  // DB will not fill them), not an FK (we inject), not a PK with a sequence
  // default. We DO include nullable columns and let the schema reflect that.
  const modelColumns = table.columns.filter((c) => {
    if (c.isGenerated) return false
    if (fkColumnSet.has(c.name)) return false
    if (c.hasDefault) return false
    return true
  })

  const properties: Record<string, unknown> = {}
  for (const col of modelColumns) {
    const t = jsonTypeFor(col)
    const desc = colDescription(col)
    const node: Record<string, unknown> = {}
    if (col.isNullable) {
      node.type = Array.isArray(t.type) ? t.type : [t.type, 'null']
    } else {
      node.type = t.type
    }
    if (t.format) node.format = t.format
    if (t.pattern) node.pattern = t.pattern
    if (typeof t.minimum === 'number') node.minimum = t.minimum
    if (typeof t.maximum === 'number') node.maximum = t.maximum
    // Cap string length to the column's declared max so the model does not
    // overshoot varchar(N). Falls back to a sane upper bound for unbounded text.
    if ((node.type === 'string' || (Array.isArray(node.type) && (node.type as string[]).includes('string')))) {
      const max = col.charMaxLength ?? 280
      node.maxLength = max
    }
    if (desc) node.description = desc
    properties[col.name] = node
  }

  const rowSchema = {
    type: 'object',
    properties,
    required: modelColumns.map((c) => c.name),
    additionalProperties: false,
  }

  const jsonSchema = {
    name: `${table.name}_rows`,
    schema: {
      type: 'object',
      properties: {
        rows: {
          type: 'array',
          minItems: batchSize,
          maxItems: batchSize,
          items: rowSchema,
        },
      },
      required: ['rows'],
      additionalProperties: false,
    },
  }

  const insertColumns = [
    ...modelColumns.map((c) => c.name),
    ...table.foreignKeys.map((fk) => fk.column),
  ]

  return {
    jsonSchema,
    modelColumns,
    fkColumns: table.foreignKeys,
    insertColumns,
  }
}
