import { Command } from 'commander'
import pc from 'picocolors'
import { verifyLicense } from '../license.js'

/**
 * `satus activate <key>` — verify a license key against satus.sh and cache
 * the result locally. Free tier does not require activation.
 */
export function registerActivate(program: Command): void {
  program
    .command('activate <key>')
    .description('Activate a Pro or Team license key')
    .action(async (key: string) => {
      const result = await verifyLicense(key, { force: true })
      if (!result.valid) {
        console.error(pc.red('License invalid: ') + result.reason)
        process.exit(1)
      }
      console.log(pc.green('Activated. ') + `Plan: ${result.plan}`)
    })
}
