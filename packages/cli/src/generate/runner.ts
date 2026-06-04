/**
 * Orchestrator. Walks the topologically sorted table list and for each
 * table:
 *
 *   1. Builds a JSON schema from the column metadata (see schema.ts).
 *   2. Calls the LLM in batches to produce row dicts.
 *   3. Injects FK values from previously-inserted parents at random.
 *   4. Sends one multi-row INSERT … RETURNING to capture generated PKs.
 *   5. Tracks USD spend against the budget; aborts cleanly on overrun.
 *
 * The whole run is wrapped in a single transaction by the caller (`generate`
 * command) — this module never opens or commits transactions itself.
 */
import pc from 'picocolors'
import type { Client } from 'pg'
import { buildRowSchema } from './schema.js'
import type { Table } from './introspect.js'
import { CostBudget, chatJson } from './llm.js'
import { profilePrompt, type ProfileName } from './profiles.js'
import { insertRows, updateBrokenEdge } from './writer.js'

export interface RunOptions {
  rowsPerTable: number
  /** Hard cap on rows per LLM call. Keeps response sizes predictable. */
  batchSize: number
  profile: ProfileName
  model: string
  apiKey: string
  maxCostUsd: number
  dryRun: boolean
  /** Soft-cycle back-edges to populate after every table is seeded. */
  brokenEdges?: Array<{ table: string; column: string; refTable: string; refColumn: string }>
}


export interface TablePlan {
  table: string
  willInsert: number
  estimatedCostUsd: number
}

export interface RunReport {
  inserted: Record<string, number>
  spentUsd: number
}

/**
 * Dry-run estimate. Uses a rough heuristic of 80 input tokens per column
 * per row + 40 output tokens per cell. Good enough to choose --rows safely;
 * the real number is logged at the end of a real run.
 */
export function planRun(tables: Table[], opts: RunOptions): TablePlan[] {
  const ratePerMillionInput = 0.15
  const ratePerMillionOutput = 0.6
  return tables.map((t) => {
    const cells = t.columns.length * opts.rowsPerTable
    const inputTokens = cells * 80
    const outputTokens = cells * 40
    const usd =
      (inputTokens / 1_000_000) * ratePerMillionInput +
      (outputTokens / 1_000_000) * ratePerMillionOutput
    return {
      table: t.name,
      willInsert: opts.rowsPerTable,
      estimatedCostUsd: usd,
    }
  })
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T
}

export async function runGenerate(
  client: Client,
  tables: Table[],
  opts: RunOptions,
): Promise<RunReport> {
  const budget = new CostBudget(opts.maxCostUsd)
  const inserted: Record<string, number> = {}
  // PK values per table, keyed by table name. Used to satisfy FKs from
  // children later in the run.
  const pkPool: Map<string, Array<Record<string, unknown>>> = new Map()

  for (const table of tables) {
    if (budget.exceeded()) {
      throw new Error(
        `Cost budget exceeded ($${budget.spentUsd.toFixed(4)} > $${opts.maxCostUsd}). Aborting before ${table.name}.`,
      )
    }

    process.stdout.write(pc.dim(`  ${table.name} `))

    const remaining = opts.rowsPerTable
    const allRows: Array<Record<string, unknown>> = []

    for (let produced = 0; produced < remaining; ) {
      const thisBatch = Math.min(opts.batchSize, remaining - produced)
      const rowSchema = buildRowSchema(table, thisBatch)

      const system =
        profilePrompt(opts.profile) +
        ' Return ONLY data that conforms to the provided JSON schema. ' +
        'Do not narrate. Do not add fields. Do not invent IDs for foreign keys.'

      const user =
        `Generate ${thisBatch} realistic rows for the Postgres table "${table.name}". ` +
        `Columns and their constraints are encoded in the JSON schema. ` +
        `Vary the values; do not repeat row 1 for row N. ` +
        `For status / enum-like text columns, choose values that read as plausible domain vocabulary.`

      const { data, usage } = await chatJson<{ rows: Array<Record<string, unknown>> }>({
        model: opts.model,
        apiKey: opts.apiKey,
        system,
        user,
        jsonSchema: rowSchema.jsonSchema,
      })

      budget.add(usage)
      if (budget.exceeded()) {
        throw new Error(
          `Cost budget exceeded mid-table ($${budget.spentUsd.toFixed(4)} > $${opts.maxCostUsd}). Aborting at ${table.name}.`,
        )
      }

      // Inject FK values from parent pools. If the column is nullable and
      // we have no parents, leave it null; otherwise we fail loudly because
      // a NOT NULL FK with no parent rows is a planning bug.
      for (const row of data.rows) {
        for (const fk of rowSchema.fkColumns) {
          if (fk.refTable === table.name) {
            // Self-reference: leave null (caller can wire up post-hoc).
            row[fk.column] = null
            continue
          }
          const parents = pkPool.get(fk.refTable)
          if (!parents || parents.length === 0) {
            const col = table.columns.find((c) => c.name === fk.column)
            if (col?.isNullable) {
              row[fk.column] = null
            } else {
              throw new Error(
                `No parent rows available for ${table.name}.${fk.column} -> ${fk.refTable}.${fk.refColumn}. ` +
                  `Check that ${fk.refTable} is in the run set and not excluded.`,
              )
            }
            continue
          }
          row[fk.column] = pickRandom(parents)[fk.refColumn]
        }
      }

      allRows.push(...data.rows)
      produced += thisBatch
      process.stdout.write(pc.dim('.'))
    }

    if (opts.dryRun) {
      inserted[table.name] = 0
      process.stdout.write(pc.yellow(' (dry-run)\n'))
      continue
    }

    const result = await insertRows(client, table, buildRowSchema(table, 1).insertColumns, allRows)
    inserted[table.name] = result.inserted
    pkPool.set(table.name, result.returnedPkRows)
    process.stdout.write(pc.green(` ${result.inserted}\n`))
  }

  // Soft-cycle close-out. Each broken edge corresponds to a child table that
  // was inserted with NULL in `column` because its parent hadn't been seeded
  // yet (the dependency was a cycle back-edge). Now that every table is
  // populated, wire the children to random parent PKs. Failures here roll
  // back the whole transaction along with the inserts.
  if (!opts.dryRun && opts.brokenEdges && opts.brokenEdges.length > 0) {
    const byName = new Map(tables.map((t) => [t.name, t]))
    for (const edge of opts.brokenEdges) {
      const child = byName.get(edge.table)
      const parents = pkPool.get(edge.refTable) ?? []
      if (!child || parents.length === 0) continue
      const n = await updateBrokenEdge(client, child, edge.column, edge.refColumn, parents)
      if (n > 0) {
        process.stdout.write(
          pc.dim(`  wired ${edge.table}.${edge.column} -> ${edge.refTable} (${n} rows)\n`),
        )
      }
    }
  }

  return { inserted, spentUsd: budget.spentUsd }
}

