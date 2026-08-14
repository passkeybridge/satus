/**
 * License client. Talks to /api/public/license/verify on satus.sh and caches
 * the verdict (with the key, so it can be re-verified later) under
 * ~/.satus/license-cache.json for 24h.
 *
 * Cache rationale:
 *   1. Keeps the public endpoint cold for legitimate users.
 *   2. Allows offline use within the cache window (a flight, a CI runner with
 *      restricted egress, etc.).
 *   3. Bounds blast radius if the API is briefly unavailable.
 *
 * Failure modes inside verifyLicense:
 *   - Network error + cache        -> return cache (caller enforces the TTL).
 *   - Network error + no cache     -> fail closed.
 *   - 4xx from API                 -> fail closed, do NOT cache.
 *   - 5xx/429 from API + cache     -> return cache (caller enforces the TTL).
 *
 * currentLicense() is the `generate` entry point and is where the published
 * contract is enforced: a verdict older than 24h is never honored, so the
 * pricing-page promise ("24-hour offline grace, then fails closed") and the
 * expiry email ("any cached verdict will expire within 24 hours") are true.
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
  /** The activated key, persisted so an expired cache can be re-verified.
   *  Absent from caches written by <= 0.3.9, which discarded it. */
  key?: string
}

export interface LicenseStatus {
  /** Honored license, or null when unlicensed or expired-and-unverifiable. */
  license: LicenseResult | null
  /** Set when a previously activated license stopped being honored. */
  note?: string
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

  // Treat 5xx AND 429 (rate limited) as transient: prefer a fresh-enough
  // cache hit over failing the user's run. 4xx other than 429 indicates the
  // request itself is wrong (bad key, malformed JSON), so do NOT fall back.
  if (response.status >= 500 || response.status === 429) {
    const cached = await readCachedLicense()
    if (cached) return cached
  }

  const body = (await response.json().catch(() => ({}))) as Partial<LicenseResult>
  const result: LicenseResult = {
    valid: Boolean(body.valid),
    plan: body.plan,
    // Always surface SOMETHING actionable instead of "License invalid: undefined".
    reason: body.reason ?? (response.ok ? 'unknown' : `http_${response.status}`),
    cachedAt: Date.now(),
    key,
  }
  if (result.valid) await writeCachedLicense(result)
  return result
}

/**
 * TTL-aware lookup for `generate`. A fresh cache is honored as-is; a stale
 * one is re-verified with the stored key. When re-verification cannot
 * produce a verdict newer than the TTL (offline, 5xx, or a legacy cache
 * with no stored key), the run falls back to Free caps instead of honoring
 * a stale verdict forever — that ceiling is the 24-hour offline grace the
 * pricing page sells.
 */
export async function currentLicense(): Promise<LicenseStatus> {
  const cached = await readCachedLicense()
  if (!cached) return { license: null }
  if (Date.now() - cached.cachedAt < LICENSE_CACHE_TTL_MS) {
    return { license: cached }
  }

  if (!cached.key) {
    return {
      license: null,
      note:
        'License cache expired and no key is stored (activated by an older CLI). ' +
        'Run `satus activate <key>` to restore paid caps.',
    }
  }

  const fresh = await verifyLicense(cached.key, { force: true })
  if (Date.now() - fresh.cachedAt >= LICENSE_CACHE_TTL_MS) {
    // verifyLicense fell back to the stale cache: network error or 5xx.
    return {
      license: null,
      note:
        'License could not be re-verified and the 24-hour offline grace has passed; ' +
        'running on Free caps until the license server is reachable again.',
    }
  }
  if (!fresh.valid) {
    return {
      license: null,
      note: `License is no longer valid (${fresh.reason ?? 'unknown'}); running on Free caps.`,
    }
  }
  return { license: fresh }
}
