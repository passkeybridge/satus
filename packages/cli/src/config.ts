/**
 * CLI-wide constants. Keep this file free of runtime side effects so it can
 * be imported by tests without spinning up Node IO.
 */
export const SATUS_API_BASE = process.env.SATUS_API_BASE ?? 'https://satus.sh'
export const LICENSE_VERIFY_PATH = '/api/public/license/verify'
export const LICENSE_CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h
export const CONFIG_DIR_NAME = '.satus'
export const CONFIG_FILE_NAME = 'config.json'
export const LICENSE_CACHE_FILE_NAME = 'license-cache.json'
