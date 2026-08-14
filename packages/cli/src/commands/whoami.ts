import { Command } from 'commander'
import pc from 'picocolors'
import { readCachedLicense } from '../license.js'
import { LICENSE_CACHE_TTL_MS } from '../config.js'

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
      if (Date.now() - cached.cachedAt >= LICENSE_CACHE_TTL_MS) {
        console.log(
          pc.dim('Cache is older than 24h; the next `satus generate` re-verifies it.'),
        )
      }
    })
}
