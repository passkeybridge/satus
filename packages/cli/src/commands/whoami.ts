import { Command } from 'commander'
import pc from 'picocolors'
import { readCachedLicense } from '../license.js'

/**
 * `satus whoami` — print the current activated plan from the local cache.
 * Does NOT hit the network; use `satus activate <key>` to refresh.
 */
export function registerWhoami(program: Command): void {
  program
    .command('whoami')
    .description('Show the currently activated license (from local cache)')
    .action(async () => {
      const cached = await readCachedLicense()
      if (!cached) {
        console.log(pc.dim('No license activated. Running on Free tier.'))
        return
      }
      console.log(`Plan: ${pc.bold(cached.plan ?? 'unknown')}`)
      console.log(`Cached at: ${new Date(cached.cachedAt).toISOString()}`)
    })
}
