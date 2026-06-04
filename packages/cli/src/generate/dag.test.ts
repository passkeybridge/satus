/**
 * Unit tests for topoSort. We focus on the v0.2 cycle-breaking behavior
 * because the strict acyclic path is exercised end-to-end on every
 * regression against the corpus schemas.
 */
import { describe, it, expect } from 'vitest'
import { topoSort } from './dag.js'
import type { Table } from './introspect.js'

function tbl(name: string, opts: {
  pk?: string[]
  cols?: Array<{ name: string; nullable?: boolean }>
  fks?: Array<{ column: string; refTable: string; refColumn?: string }>
} = {}): Table {
  const cols = opts.cols ?? [{ name: 'id' }]
  return {
    schema: 'public',
    name,
    primaryKey: opts.pk ?? ['id'],
    columns: cols.map((c) => ({
      name: c.name,
      dataType: 'integer',
      udtName: 'int4',
      isNullable: c.nullable === true,
      hasDefault: false,
      defaultExpr: null,
      charMaxLength: null,
      numericPrecision: null,
      numericScale: null,
      isGenerated: false,
    })),
    foreignKeys: (opts.fks ?? []).map((fk) => ({
      column: fk.column,
      refSchema: 'public',
      refTable: fk.refTable,
      refColumn: fk.refColumn ?? 'id',
      deferrable: false,
      initiallyDeferred: false,
    })),
    uniqueColumns: new Set(),
  }
}

describe('topoSort', () => {
  it('orders acyclic tables parents-first', () => {
    const tables = [
      tbl('posts', { cols: [{ name: 'id' }, { name: 'author_id' }], fks: [{ column: 'author_id', refTable: 'users' }] }),
      tbl('users'),
    ]
    const r = topoSort(tables)
    expect(r.cycle).toBeNull()
    expect(r.brokenEdges).toEqual([])
    expect(r.order.map((t) => t.name)).toEqual(['users', 'posts'])
  })

  it('breaks a 2-table cycle when one back-edge is nullable', () => {
    // users.primary_post_id -> posts (nullable, back-edge)
    // posts.author_id       -> users (not null)
    const tables = [
      tbl('users', {
        cols: [{ name: 'id' }, { name: 'primary_post_id', nullable: true }],
        fks: [{ column: 'primary_post_id', refTable: 'posts' }],
      }),
      tbl('posts', {
        cols: [{ name: 'id' }, { name: 'author_id' }],
        fks: [{ column: 'author_id', refTable: 'users' }],
      }),
    ]
    const r = topoSort(tables)
    expect(r.cycle).toBeNull()
    expect(r.brokenEdges).toHaveLength(1)
    expect(r.brokenEdges[0]).toMatchObject({
      table: 'users',
      column: 'primary_post_id',
      refTable: 'posts',
    })
    // After breaking the back-edge, users must come before posts.
    const names = r.order.map((t) => t.name)
    expect(names.indexOf('users')).toBeLessThan(names.indexOf('posts'))
  })

  it('reports unresolved cycle when no back-edge is nullable', () => {
    const tables = [
      tbl('a', { cols: [{ name: 'id' }, { name: 'b_id' }], fks: [{ column: 'b_id', refTable: 'b' }] }),
      tbl('b', { cols: [{ name: 'id' }, { name: 'a_id' }], fks: [{ column: 'a_id', refTable: 'a' }] }),
    ]
    const r = topoSort(tables)
    expect(r.cycle).toEqual(['a', 'b'])
    expect(r.brokenEdges).toEqual([])
  })

  it('ignores self-references', () => {
    const tables = [
      tbl('comments', {
        cols: [{ name: 'id' }, { name: 'parent_id', nullable: true }],
        fks: [{ column: 'parent_id', refTable: 'comments' }],
      }),
    ]
    const r = topoSort(tables)
    expect(r.cycle).toBeNull()
    expect(r.brokenEdges).toEqual([])
    expect(r.order.map((t) => t.name)).toEqual(['comments'])
  })

  it('treats FKs to tables outside the target set as satisfied', () => {
    const tables = [
      tbl('posts', { cols: [{ name: 'id' }, { name: 'tenant_id' }], fks: [{ column: 'tenant_id', refTable: 'tenants_outside' }] }),
    ]
    const r = topoSort(tables)
    expect(r.cycle).toBeNull()
    expect(r.order.map((t) => t.name)).toEqual(['posts'])
  })
})
