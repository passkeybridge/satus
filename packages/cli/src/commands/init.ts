import { Command } from 'commander'
import pc from 'picocolors'

/**
 * `satus init` — scaffold a satus.config.json in the current directory.
 *
 * TODO(v0.1): write a real config file with DSN prompt, profile selection
 * (saas / ecommerce / b2b), and optional BYO LLM key.
 */
export function registerInit(program: Command): void {
  program
    .command('init')
    .description('Scaffold satus.config.json in the current directory')
    .action(async () => {
      console.log(pc.yellow('satus init is not implemented yet (v0.0.1 stub).'))
      console.log('Roadmap: prompt for Postgres DSN, profile, and LLM key, then write satus.config.json.')
    })
}
