/**
 * License client. Talks to /api/public/license/verify on satus.sh and caches
 * the verdict under ~/.satus/license-cache.json for 24h.
 *
 * Cache rationale:
 *   1. Keeps the public endpoint cold for legitimate users.
 *   2. Allows offline use within the cache window (a flight, a CI runner with
 *      restricted egress, etc.).
 *   3. Bounds blast radius if the API is briefly unavailable.
 *
 * Failure modes:
 *   - Network error + valid cache  -> use cache, warn.
 *   - Network error + no cache     -> fail closed.
 *   - 4xx from API                 -> fail closed, do NOT cache.
 *   - 5xx from API + valid cache   -> use cache, warn.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import {
  SATUS_API_BASE,
  LICENSE_VERIFY_PATH,
  LICENSE_CACHE_TTL_MS,
  CONFIG_DIR_NAME,
  LICENSE_CACHE_FILE_NAME,
} from './config.js'

export interface LicenseResult {
  valid: boolean
  plan?: 'free' | 'pro' | 'team'
  reason?: string
  cachedAt: number
}

function cachePath(): string {
  return join(homedir(), CONFIG_DIR_NAME, LICENSE_CACHE_FILE_NAME)
}

export async function readCachedLicense(): Promise<LicenseResult | null> {
  try {
    const raw = await readFile(cachePath(), 'utf8')
    const parsed = JSON.parse(raw) as LicenseResult
    return parsed
  } catch {
    return null
  }
}

async function writeCachedLicense(result: LicenseResult): Promise<void> {
  await mkdir(join(homedir(), CONFIG_DIR_NAME), { recursive: true })
  await writeFile(cachePath(), JSON.stringify(result, null, 2), 'utf8')
}

export async function verifyLicense(
  key: string,
  opts: { force?: boolean } = {},
): Promise<LicenseResult> {
  if (!opts.force) {
    const cached = await readCachedLicense()
    if (cached && Date.now() - cached.cachedAt < LICENSE_CACHE_TTL_MS) {
      return cached
    }
  }

  const url = SATUS_API_BASE + LICENSE_VERIFY_PATH
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
  } catch {
    const cached = await readCachedLicense()
    if (cached) return cached
    return { valid: false, reason: 'network_unavailable', cachedAt: Date.now() }
  }

  if (response.status >= 500) {
    const cached = await readCachedLicense()
    if (cached) return cached
  }

  const body = (await response.json().catch(() => ({}))) as Partial<LicenseResult>
  const result: LicenseResult = {
    valid: Boolean(body.valid),
    plan: body.plan,
    reason: body.reason,
    cachedAt: Date.now(),
  }
  if (result.valid) await writeCachedLicense(result)
  return result
}
