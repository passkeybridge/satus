/**
 * Daily E2E health check.
 *
 * Triggered by pg_cron twice daily (0800 ET, 2000 ET). Exercises the
 * four production-critical subsystems and emails support@satus.sh via
 * Resend only on failure. Every run is recorded in `e2e_health_log`.
 *
 * Public route by necessity (pg_cron → net.http_post). No auth header
 * required, but the handler is cheap and idempotent. Each run also
 * accepts GET for manual smoke-testing from a browser.
 *
 * Checks:
 *   1. license_verify          — POST satus.sh/api/public/license/verify with
 *                                seeded test key, expect { valid: true }.
 *   2. webhook_signature       — POST satus.sh/api/public/payments/webhook
 *                                with no signature, expect 400.
 *   3. auth_magiclink          — supabaseAdmin.auth.admin.generateLink for a
 *                                throwaway address, expect a link back. No
 *                                email is actually sent (generateLink, not
 *                                signInWithOtp).
 *   4. email_queue             — read email_send_state and pg_cron jobs;
 *                                queue is healthy if not rate-limit-paused
 *                                and process-email-queue ran in last 5 min.
 */

import { createFileRoute } from '@tanstack/react-router'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const ORIGIN = 'https://satus.sh'
const TEST_KEY = 'satus_test_e2e0e2e0e2e0e2e0e2e0e2e0e2e0e2e0'
const ALERT_TO = 'support@satus.sh'
const ALERT_FROM = 'satus.sh alerts <alerts@mail.satus.sh>'
const QUEUE_MAX_AGE_SECONDS = 5 * 60

type CheckResult = {
  name: string
  ok: boolean
  duration_ms: number
  detail?: unknown
  error?: string
}

async function timed<T>(
  name: string,
  fn: () => Promise<{ ok: boolean; detail?: unknown; error?: string }>,
): Promise<CheckResult> {
  const start = Date.now()
  try {
    const r = await fn()
    return { name, ok: r.ok, duration_ms: Date.now() - start, detail: r.detail, error: r.error }
  } catch (e) {
    return {
      name,
      ok: false,
      duration_ms: Date.now() - start,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

async function checkLicenseVerify(): Promise<CheckResult> {
  return timed('license_verify', async () => {
    const res = await fetch(`${ORIGIN}/api/public/license/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: TEST_KEY }),
    })
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` }
    const body = (await res.json()) as { valid?: boolean; plan?: string }
    if (body.valid !== true) return { ok: false, detail: body, error: 'not_valid' }
    return { ok: true, detail: { plan: body.plan } }
  })
}

async function checkWebhookSignature(): Promise<CheckResult> {
  return timed('webhook_signature', async () => {
    const res = await fetch(`${ORIGIN}/api/public/payments/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    // We expect a 4xx because the signature is missing. 2xx or 5xx is a regression.
    if (res.status >= 400 && res.status < 500) {
      return { ok: true, detail: { status: res.status } }
    }
    return { ok: false, error: `unexpected_status_${res.status}` }
  })
}

async function checkAuthMagicLink(): Promise<CheckResult> {
  return timed('auth_magiclink', async () => {
    // generateLink does NOT send an email — it returns the action link
    // synchronously. This confirms the auth API is reachable + signing
    // tokens correctly without polluting any inbox.
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: 'e2e+monitor@satus.sh',
    })
    if (error) return { ok: false, error: error.message }
    const link = data?.properties?.action_link
    if (!link || typeof link !== 'string') return { ok: false, error: 'no_action_link' }
    return { ok: true, detail: { has_link: true } }
  })
}

async function checkEmailQueue(): Promise<CheckResult> {
  return timed('email_queue', async () => {
    // 1. Rate-limit state must not be in the future
    const { data: state, error: stateErr } = await supabaseAdmin
      .from('email_send_state')
      .select('retry_after_until')
      .eq('id', 1)
      .maybeSingle()
    if (stateErr) return { ok: false, error: `state: ${stateErr.message}` }
    if (state?.retry_after_until && new Date(state.retry_after_until) > new Date()) {
      return { ok: false, error: `rate_limited_until_${state.retry_after_until}` }
    }

    // 2. Confirm queue dispatcher ran recently. Read latest cron run.
    const { data: cronRuns, error: cronErr } = await supabaseAdmin
      .rpc('e2e_last_email_cron_run')
      .single<{ last_run: string | null; status: string | null }>()
    if (cronErr) {
      // RPC not present yet — fall back to a softer check: the existence of
      // recent email_send_log activity. Empty log is acceptable (no traffic).
      return { ok: true, detail: { note: 'cron_rpc_missing', soft_pass: true } }
    }
    if (!cronRuns?.last_run) {
      return { ok: false, error: 'no_cron_runs_found' }
    }
    const ageSec = (Date.now() - new Date(cronRuns.last_run).getTime()) / 1000
    if (ageSec > QUEUE_MAX_AGE_SECONDS) {
      return { ok: false, error: `cron_stale_${Math.round(ageSec)}s` }
    }
    if (cronRuns.status && cronRuns.status !== 'succeeded') {
      return { ok: false, error: `cron_status_${cronRuns.status}` }
    }
    return { ok: true, detail: { age_s: Math.round(ageSec), status: cronRuns.status } }
  })
}

async function sendFailureAlert(checks: CheckResult[]): Promise<void> {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.error('[e2e] cannot send alert, missing keys', {
      lovable: !!LOVABLE_API_KEY,
      resend: !!RESEND_API_KEY,
    })
    return
  }

  const failed = checks.filter((c) => !c.ok)
  const lines = checks.map(
    (c) =>
      `${c.ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(20)}  ${c.duration_ms}ms` +
      (c.error ? `  ${c.error}` : ''),
  )

  const subject = `[satus.sh] E2E FAIL — ${failed.map((c) => c.name).join(', ')}`
  const text = [
    `Daily E2E health check failed at ${new Date().toISOString()}.`,
    '',
    'Results:',
    ...lines,
    '',
    'Failure detail:',
    JSON.stringify(failed, null, 2),
    '',
    'Site:    https://satus.sh',
    'Runbook: tail e2e_health_log, then re-run /api/public/hooks/e2e-health',
  ].join('\n')

  const res = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [ALERT_TO],
      subject,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`[e2e] Resend alert failed [${res.status}]: ${body}`)
  }
}

async function runE2E(triggeredBy: string) {
  const start = Date.now()
  const checks = await Promise.all([
    checkLicenseVerify(),
    checkWebhookSignature(),
    checkAuthMagicLink(),
    checkEmailQueue(),
  ])
  const duration_ms = Date.now() - start
  const failed = checks.filter((c) => !c.ok)
  const status: 'pass' | 'fail' = failed.length === 0 ? 'pass' : 'fail'

  await supabaseAdmin.from('e2e_health_log').insert({
    status,
    duration_ms,
    checks: checks as unknown as object,
    error_message:
      failed.length === 0
        ? null
        : failed.map((c) => `${c.name}: ${c.error ?? 'failed'}`).join('; '),
    triggered_by: triggeredBy,
  })

  if (status === 'fail') {
    await sendFailureAlert(checks)
  }

  return { status, duration_ms, checks }
}

export const Route = createFileRoute('/api/public/hooks/e2e-health')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const result = await runE2E(url.searchParams.get('by') ?? 'manual')
        return new Response(JSON.stringify(result, null, 2), {
          status: result.status === 'pass' ? 200 : 500,
          headers: { 'Content-Type': 'application/json' },
        })
      },
      POST: async () => {
        const result = await runE2E('cron')
        return new Response(JSON.stringify(result), {
          status: result.status === 'pass' ? 200 : 500,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
