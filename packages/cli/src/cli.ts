/**
 * satus CLI entry point.
 *
 * Generates realistic seed data for Postgres while respecting foreign keys,
 * unique constraints, and column types. Commands are intentionally small and
 * composable; each one lives in src/commands/.
 *
 * License is verified against https://satus.sh/api/public/license/verify and
 * the result is cached locally under ~/.satus/ for 24h to keep the endpoint
 * cold-path and to allow offline use within the cache window.
 */
import { Command } from 'commander'
import pc from 'picocolors'
import { registerInit } from './commands/init.js'
import { registerGenerate } from './commands/generate.js'
import { registerActivate } from './commands/activate.js'
import { registerWhoami } from './commands/whoami.js'
import { version } from './version.js'

const program = new Command()

program
  .name('satus')
  .description('Generate realistic seed data for Postgres. Respects FKs, constraints, and your schema.')
  .version(version, '-v, --version', 'print CLI version')
  .showHelpAfterError()

registerInit(program)
registerGenerate(program)
registerActivate(program)
registerWhoami(program)

program.parseAsync(process.argv).catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  console.error(pc.red('error: ') + message)
  process.exit(1)
})
