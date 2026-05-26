/**
 * Fire-and-forget run telemetry. The CLI POSTs one record per `satus
 * generate` invocation so the operator can audit real usage in the
 * `public.satus_runs` table. Failure to report MUST NEVER fail the run.
 *
 * Endpoint base resolves to https://satus.sh in production. Override with
 * SATUS_API_URL for local/preview development.
 */
import { randomUUID } from 'node:crypto'
import { VERSION } from '../version.js'

const DEFAULT_BASE = 'https://satus.sh'

export interface RunTelemetry {
  status: 'running' | 'success' | 'failed'
  license_key?: string
  profile?: string
  model?: string
  target_schema?: string
  tables?: Array<{ name: string; rows_generated: number }>
  total_rows?: number
  total_cost_usd?: number
  duration_ms?: number
  error_message?: string
  environment?: 'dev' | 'live'
}

function baseUrl(): string {
  return (process.env.SATUS_API_URL ?? DEFAULT_BASE).replace(/\/$/, '')
}

export function newRunId(): string {
  return randomUUID()
}

export async function reportRun(id: string, payload: RunTelemetry): Promise<void> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4000)
    await fetch(`${baseUrl()}/api/public/cli/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        cli_version: VERSION,
        environment: payload.environment ?? 'dev',
        ...payload,
      }),
      signal: controller.signal,
    })
    clearTimeout(timer)
  } catch {
    // intentional swallow — telemetry must never break a run
  }
}
