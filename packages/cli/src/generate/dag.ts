/**
 * Topological sort of tables by FK dependency.
 *
 * Kahn's algorithm. Self-references are ignored (a table that FKs into
 * itself can still be seeded — we'll just leave the self-FK NULL or skip).
 * Cross-schema FKs and FKs to tables outside the target set are also
 * ignored: we cannot generate those parents, so we assume they exist or
 * the column is nullable.
 *
 * Cycles are detected and reported. Callers should surface a clear error
 * with the cycle members so the user can either exclude one of the tables
 * or accept NULL FKs for the cycle-breaking column.
 */
import type { Table } from './introspect.js'

export interface SortResult {
  order: Table[]
  cycle: string[] | null
}

export function topoSort(tables: Table[]): SortResult {
  const byName = new Map(tables.map((t) => [t.name, t]))
  const inDegree = new Map<string, number>()
  const edges = new Map<string, Set<string>>() // parent -> dependents

  for (const t of tables) {
    inDegree.set(t.name, 0)
    edges.set(t.name, new Set())
  }

  for (const t of tables) {
    for (const fk of t.foreignKeys) {
      // Same-table self-FK: do not count as a dependency edge.
      if (fk.refTable === t.name) continue
      // Parent not in our target set: assume it already exists.
      if (!byName.has(fk.refTable)) continue
      edges.get(fk.refTable)!.add(t.name)
      inDegree.set(t.name, (inDegree.get(t.name) ?? 0) + 1)
    }
  }

  const queue: string[] = []
  for (const [name, deg] of inDegree) {
    if (deg === 0) queue.push(name)
  }
  queue.sort() // deterministic order across runs

  const order: Table[] = []
  while (queue.length > 0) {
    const name = queue.shift()!
    order.push(byName.get(name)!)
    for (const dep of edges.get(name) ?? []) {
      const next = (inDegree.get(dep) ?? 0) - 1
      inDegree.set(dep, next)
      if (next === 0) queue.push(dep)
    }
  }

  if (order.length === tables.length) {
    return { order, cycle: null }
  }

  // Surface the unresolved nodes; users can read this as the cycle members.
  const remaining = tables
    .map((t) => t.name)
    .filter((n) => !order.some((o) => o.name === n))
  return { order, cycle: remaining }
}
