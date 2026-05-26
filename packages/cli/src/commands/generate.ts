/**
 * `satus generate` — the headline command. Connects to Postgres, introspects
 * the target schema, sorts tables by FK dependency, asks the LLM for rows,
 * and writes them in a single transaction.
 *
 * License gating:
 *   - Free tier: max 25 rows/table, max 5 tables. Enough to demo the value;
 *     not enough to seed a real staging DB.
 *   - Pro / Team: no caps.
 *
 * Cost gating:
 *   - --max-cost USD ceiling. The budget tracks live token usage; if a run
 *     would overshoot, we abort BEFORE committing. The transaction rolls
 *     back so the database is untouched.
 */
import { Command } from 'commander'
import pc from 'picocolors'
import { Client } from 'pg'
import { loadConfig, resolveDsn, resolveProfile } from '../generate/config.js'
import { introspect } from '../generate/introspect.js'
import { topoSort } from '../generate/dag.js'
import { runGenerate, planRun } from '../generate/runner.js'
import { truncate } from '../generate/writer.js'
import { newRunId, reportRun } from '../generate/telemetry.js'
import { readCachedLicense } from '../license.js'

const FREE_MAX_ROWS = 25
const FREE_MAX_TABLES = 5

export function registerGenerate(program: Command): void {
  program
    .command('generate')
    .description('Generate seed data for the configured database')
    .option('--profile <name>', 'reference profile (saas | ecommerce | b2b)')
    .option('--rows <n>', 'rows to generate per table', '50')
    .option('--max-cost <usd>', 'abort if estimated LLM spend exceeds this', '1.00')
    .option('--batch-size <n>', 'rows per LLM call', '25')
    .option('--dsn <url>', 'Postgres connection string (overrides config + env)')
    .option('--schema <name>', 'Postgres schema to seed (overrides config)')
    .option('--model <id>', 'OpenAI model (overrides config)')
    .option('--truncate', 'truncate target tables before inserting')
    .option('--dry-run', 'plan only, do not write to the database')
    .action(async (opts) => {
      const cfg = await loadConfig()
      const dsn = resolveDsn(opts.dsn, cfg)
      if (!dsn) {
        console.error(
          pc.red('No database connection configured.') +
            '\n  Pass --dsn, set $DATABASE_URL, or run `satus init`.',
        )
        process.exit(1)
      }

      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey && !opts.dryRun) {
        console.error(
          pc.red('OPENAI_API_KEY is not set.') +
            '\n  Export it before running, or pass --dry-run to plan without calling the model.',
        )
        process.exit(1)
      }

      const license = await readCachedLicense()
      const isPaid = license?.valid && (license.plan === 'pro' || license.plan === 'team')
      const requestedRows = Number(opts.rows)
      const rowsPerTable =
        isPaid ? requestedRows : Math.min(requestedRows, FREE_MAX_ROWS)
      if (!isPaid && requestedRows > FREE_MAX_ROWS) {
        console.log(
          pc.yellow(
            `! Free tier capped at ${FREE_MAX_ROWS} rows/table (you asked for ${requestedRows}).`,
          ) + pc.dim(' Run `satus activate <key>` to unlock.'),
        )
      }

      const schemaName = opts.schema ?? cfg?.schema ?? 'public'
      const profile = resolveProfile(opts.profile, cfg)
      const model = opts.model ?? cfg?.model ?? 'gpt-4o-mini'
      const exclude = cfg?.exclude ?? []

      const client = new Client({ connectionString: dsn })
      try {
        await client.connect()
      } catch (err) {
        console.error(pc.red('Failed to connect to Postgres: ') + (err as Error).message)
        process.exit(1)
      }

      try {
        const schema = await introspect(client, schemaName, exclude)
        if (schema.tables.length === 0) {
          console.error(pc.red(`No tables found in schema "${schemaName}".`))
          process.exit(1)
        }

        const sort = topoSort(schema.tables)
        if (sort.cycle) {
          console.error(
            pc.red('FK cycle detected among: ') + sort.cycle.join(', ') +
              '\n  Exclude one of these in satus.config.json `exclude` and re-run.',
          )
          process.exit(1)
        }

        let ordered = sort.order
        if (!isPaid && ordered.length > FREE_MAX_TABLES) {
          console.log(
            pc.yellow(
              `! Free tier capped at ${FREE_MAX_TABLES} tables (schema has ${ordered.length}).`,
            ) + pc.dim(' Run `satus activate <key>` to unlock all tables.'),
          )
          ordered = ordered.slice(0, FREE_MAX_TABLES)
        }

        console.log(pc.bold(`\nsatus generate`))
        console.log(pc.dim(`  schema:   ${schemaName}`))
        console.log(pc.dim(`  profile:  ${profile}`))
        console.log(pc.dim(`  model:    ${model}`))
        console.log(pc.dim(`  rows:     ${rowsPerTable} per table`))
        console.log(pc.dim(`  tables:   ${ordered.map((t) => t.name).join(' -> ')}`))
        console.log()

        if (opts.dryRun) {
          const plan = planRun(ordered, {
            rowsPerTable,
            batchSize: Number(opts.batchSize),
            profile,
            model,
            apiKey: apiKey ?? '',
            maxCostUsd: Number(opts.maxCost),
            dryRun: true,
          })
          let total = 0
          for (const p of plan) {
            console.log(
              `  ${p.table.padEnd(28)} ${String(p.willInsert).padStart(6)} rows` +
                pc.dim(`  ~$${p.estimatedCostUsd.toFixed(4)}`),
            )
            total += p.estimatedCostUsd
          }
          console.log(pc.bold(`\n  estimated cost: $${total.toFixed(4)}`))
          if (total > Number(opts.maxCost)) {
            console.log(
              pc.yellow(`  ! exceeds --max-cost $${opts.maxCost}; raise the cap or lower --rows.`),
            )
          }
          return
        }

        const runId = newRunId()
        const startedAt = Date.now()
        const env = (process.env.SATUS_ENV === 'live' ? 'live' : 'dev') as 'dev' | 'live'
        const baseTelemetry = {
          profile,
          model,
          target_schema: schemaName,
          environment: env,
        }
        await reportRun(runId, { ...baseTelemetry, status: 'running' })

        await client.query('begin')
        try {
          if (opts.truncate) {
            console.log(pc.dim('  truncating target tables...'))
            await truncate(client, ordered)
          }
          const report = await runGenerate(client, ordered, {
            rowsPerTable,
            batchSize: Number(opts.batchSize),
            profile,
            model,
            apiKey: apiKey!,
            maxCostUsd: Number(opts.maxCost),
            dryRun: false,
          })
          await client.query('commit')
          const total = Object.values(report.inserted).reduce((a, b) => a + b, 0)
          console.log(pc.green(`\n✓ inserted ${total} rows across ${Object.keys(report.inserted).length} tables`))
          console.log(pc.dim(`  spent: $${report.spentUsd.toFixed(4)}`))
          await reportRun(runId, {
            ...baseTelemetry,
            status: 'success',
            tables: Object.entries(report.inserted).map(([name, rows_generated]) => ({
              name,
              rows_generated,
            })),
            total_rows: total,
            total_cost_usd: Number(report.spentUsd.toFixed(6)),
            duration_ms: Date.now() - startedAt,
          })
        } catch (err) {
          await client.query('rollback').catch(() => {})
          await reportRun(runId, {
            ...baseTelemetry,
            status: 'failed',
            error_message: (err as Error).message?.slice(0, 1900),
            duration_ms: Date.now() - startedAt,
          })
          throw err
        }
      } finally {
        await client.end().catch(() => {})
      }
    })
}
