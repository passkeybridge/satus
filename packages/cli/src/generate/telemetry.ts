/**
 * Fire-and-forget run telemetry. The CLI POSTs one record per `satus
 * generate` invocation so the operator can see real usage in the
 * `public.satus_runs` table. Failure to report MUST NEVER fail the run.
 *
 * ## What may go in this payload
 *
 * The published privacy promise (packages/cli/README.md, satus.sh/privacy)
 * reads: *"satus never sends your schema, your data, or your column names
 * to satus.sh ... Anonymous run telemetry (provider, model, profile, table
 * count, row count, duration, token totals — no table or column names, no
 * row data)."*
 *
 * That sentence is the specification for this file, not a description of
 * it. Every field below is either named in that list or is non-identifying
 * by construction (a UUID we mint, our own version string, a fixed-
 * vocabulary status or error class). If a field cannot be justified that
 * way it does not belong here — change the promise first, in public, or
 * leave the data on the user's machine.
 *
 * v0.3.7 removed three fields that violated it: `tables` (carried every
 * table name), `target_schema` (carried the schema name, which in
 * multi-tenant setups is itself a customer identifier), and
 * `error_message` (raw error text, which routinely embeds table names,
 * column names, and — in Postgres unique-violation messages — actual row
 * values). They are replaced by `table_count` and `error_class`.
 *
 * Endpoint base resolves to https://satus.sh in production. Override with
 * SATUS_API_URL for local/preview development.
 */
import { randomUUID } from 'node:crypto'
import { VERSION } from '../version.js'

const DEFAULT_BASE = 'https://satus.sh'

export interface RunTelemetry {
  status: 'running' | 'success' | 'failed'
  profile?: string
  /** v0.3.0: which LLM provider ran the generation. */
  provider?: 'openai' | 'anthropic'
  model?: string
  /** v0.3.7: how many tables the run touched. Replaces per-table names. */
  table_count?: number
  total_rows?: number
  total_cost_usd?: number
  /** v0.3.0: aggregate token counts across the whole run. */
  input_tokens?: number
  output_tokens?: number
  duration_ms?: number
  /**
   * v0.3.7. Fixed-vocabulary failure class from `classifyError` — never
   * free text. Replaces `error_message`.
   */
  error_class?: string
  environment?: 'dev' | 'live'
  /**
   * v0.3.3 (opt-in via `telemetry.share_failure_fingerprints`). Stable
   * SHA-256 of the normalised schema shape. Never contains actual
   * identifiers or row data. See generate/fingerprint.ts.
   */
  schema_fingerprint?: string
  /**
   * v0.3.3. Name of the validator rule that fired first, e.g.
   * "fk_missing_parent" or "unique_duplicate". Bounded to <= 64 chars.
   */
  validator_class?: string
  /**
   * v0.3.3. Subcommand + flag names only (never values). Bounded to
   * 16 short strings. Example: ["generate", "--dry-run", "--rows"].
   */
  invocation_sequence?: string[]
}

function baseUrl(): string {
  return (process.env.SATUS_API_URL ?? DEFAULT_BASE).replace(/\/$/, '')
}

/**
 * Reduce a thrown error to a short, fixed-vocabulary class that carries no
 * schema, identifier, or row content.
 *
 * The rule this function exists to enforce: nothing derived from the error
 * *text* is ever returned. We match on stable prefixes we ourselves emit,
 * on the HTTP status of a provider response, and on Postgres SQLSTATE —
 * all of which are drawn from closed vocabularies. Anything unrecognised
 * becomes 'unknown' rather than a truncated message, because a truncated
 * Postgres error is exactly where a row value would leak (a unique
 * violation reads `Key (email)=(ada@example.com) already exists`).
 */
export function classifyError(err: unknown): string {
  const e = err as { message?: string; code?: unknown } | null | undefined
  // Postgres errors from `pg` carry the five-character SQLSTATE.
  if (e && typeof e.code === 'string' && /^[0-9A-Z]{5}$/.test(e.code)) {
    return `pg_${e.code}`
  }
  const msg = typeof e?.message === 'string' ? e.message : ''

  // Provider HTTP failures: `OpenAI 429: ...` / `Anthropic 404: ...`.
  const http = /^(OpenAI|Anthropic) (\d{3}):/.exec(msg)
  if (http) return `provider_http_${http[2]}`

  // Prefixes we emit ourselves, matched against the literal leading text.
  if (msg.startsWith('Cost budget exceeded')) return 'budget_exceeded'
  if (msg.startsWith('No parent rows available')) return 'no_parent_rows'
  if (msg.startsWith('Cannot resolve ')) return 'fk_unresolvable'
  if (msg.startsWith('--truncate cannot run')) return 'truncate_blocked'
  if (msg.startsWith('Failed to parse model JSON')) return 'provider_bad_json'
  if (msg.startsWith('OpenAI returned no content')) return 'provider_empty'
  if (msg.includes("tool_use block")) return 'provider_no_tool_use'

  return 'unknown'
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
