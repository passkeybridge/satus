import { Command } from 'commander'
import pc from 'picocolors'

/**
 * `satus generate` — introspect schema, topologically sort tables by FK
 * dependency, generate seed rows per profile, and write via COPY in a single
 * transaction.
 *
 * TODO(v0.1): wire up pg introspection (information_schema + pg_catalog),
 * DAG sort, OpenAI structured outputs, COPY writer.
 */
export function registerGenerate(program: Command): void {
  program
    .command('generate')
    .description('Generate seed data for the configured database')
    .option('--profile <name>', 'reference profile (saas | ecommerce | b2b)', 'saas')
    .option('--rows <n>', 'approximate rows per table', '50')
    .option('--max-cost <usd>', 'abort if estimated LLM spend exceeds this', '1.00')
    .option('--dry-run', 'plan only, do not write to the database')
    .action(async (opts: { profile: string; rows: string; maxCost: string; dryRun?: boolean }) => {
      console.log(pc.yellow('satus generate is not implemented yet (v0.0.1 stub).'))
      console.log('Parsed options:', opts)
    })
}
