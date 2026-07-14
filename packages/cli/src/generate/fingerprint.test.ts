/**
 * Fingerprint stability tests. The point of these is that structural
 * equivalence must round-trip to an identical hash even when identifiers,
 * ordering, or casing change.
 */
import { describe, it, expect } from 'vitest'
import { fingerprint } from './fingerprint.js'
import type { IntrospectedSchema, Table } from './introspect.js'

function tbl(name: string, columns: Array<{ name: string; udt: string; nullable?: boolean }>, opts: {
  pk?: string[]
  uniques?: string[]
  fks?: Array<{ column: string; refTable: string; refColumn: string }>
} = {}): Table {
  return {
    schema: 'public',
    name,
    columns: columns.map((c) => ({
      name: c.name,
      dataType: c.udt,
      udtName: c.udt,
      isNullable: c.nullable ?? false,
      hasDefault: false,
      defaultExpr: null,
      charMaxLength: null,
      numericPrecision: null,
      numericScale: null,
      isGenerated: false,
    })),
    primaryKey: opts.pk ?? [],
    foreignKeys: (opts.fks ?? []).map((f) => ({
      column: f.column,
      refSchema: 'public',
      refTable: f.refTable,
      refColumn: f.refColumn,
      deferrable: false,
      initiallyDeferred: false,
    })),
    uniqueColumns: new Set(opts.uniques ?? []),
  }
}

const schemaA: IntrospectedSchema = {
  schema: 'public',
  tables: [
    tbl('users', [
      { name: 'id', udt: 'uuid' },
      { name: 'email', udt: 'citext' },
    ], { pk: ['id'], uniques: ['email'] }),
    tbl('orders', [
      { name: 'id', udt: 'uuid' },
      { name: 'user_id', udt: 'uuid' },
    ], { pk: ['id'], fks: [{ column: 'user_id', refTable: 'users', refColumn: 'id' }] }),
  ],
}

// Identical shape as A, but: reordered tables, reordered columns, renamed
// identifiers, upper-cased type names. Fingerprint MUST match A.
const schemaAEquivalent: IntrospectedSchema = {
  schema: 'public',
  tables: [
    tbl('ORDERS', [
      { name: 'CUSTOMER_ID', udt: 'UUID' },
      { name: 'ORDER_ID', udt: 'UUID' },
    ], { pk: ['ORDER_ID'], fks: [{ column: 'CUSTOMER_ID', refTable: 'USERS', refColumn: 'PRIMARY_KEY' }] }),
    tbl('USERS', [
      { name: 'MAIL', udt: 'CITEXT' },
      { name: 'PRIMARY_KEY', udt: 'UUID' },
    ], { pk: ['PRIMARY_KEY'], uniques: ['MAIL'] }),
  ],
}

// Structurally different: users.email is now text, not citext.
const schemaB: IntrospectedSchema = {
  schema: 'public',
  tables: [
    tbl('users', [
      { name: 'id', udt: 'uuid' },
      { name: 'email', udt: 'text' },
    ], { pk: ['id'], uniques: ['email'] }),
    tbl('orders', [
      { name: 'id', udt: 'uuid' },
      { name: 'user_id', udt: 'uuid' },
    ], { pk: ['id'], fks: [{ column: 'user_id', refTable: 'users', refColumn: 'id' }] }),
  ],
}

describe('fingerprint', () => {
  it('returns a 64-char lowercase hex string', () => {
    const fp = fingerprint(schemaA)
    expect(fp).toMatch(/^[0-9a-f]{64}$/)
  })

  it('is stable across identifier renames, casing, and column/table ordering', () => {
    // Note: renaming the FK target column from `id` to `primary_key` is
    // still an equivalent shape only if the FK edge lands on the same
    // TABLE index. Since fingerprint drops actual column names, the FK
    // edge is table-to-table only, so this must match.
    expect(fingerprint(schemaA)).toBe(fingerprint(schemaAEquivalent))
  })

  it('changes when a column type changes', () => {
    expect(fingerprint(schemaA)).not.toBe(fingerprint(schemaB))
  })

  it('changes when an FK edge is added or removed', () => {
    const schemaNoFk: IntrospectedSchema = {
      schema: 'public',
      tables: [
        tbl('users', [
          { name: 'id', udt: 'uuid' },
          { name: 'email', udt: 'citext' },
        ], { pk: ['id'], uniques: ['email'] }),
        tbl('orders', [
          { name: 'id', udt: 'uuid' },
          { name: 'user_id', udt: 'uuid' },
        ], { pk: ['id'] }),
      ],
    }
    expect(fingerprint(schemaA)).not.toBe(fingerprint(schemaNoFk))
  })
})
