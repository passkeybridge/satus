/**
 * Stripe webhook failure alerting.
 *
 * Purpose: ops gets one email when a webhook event fails to process, so we
 * intervene before Stripe gives up retrying (~3 days) and license state
 * drifts. Without this, a silently broken webhook = a paying customer who
 * never gets their license = refund + churn.
 *
 * Delivery: posts to Resend through the Lovable connector gateway. Avoids
 * the project's queued email infra on purpose — ops alerts must not sit
 * in a queue that depends on the same Postgres/cron path that may be the
 * thing breaking.
 *
 * Dedup: every Stripe webhook delivery carries the same `event.id` across
 * its retry attempts. We INSERT that id into `public.webhook_alerts_sent`
 * with the id as PRIMARY KEY; on conflict we skip sending. Result:
 *   - one failing event => one email, regardless of how many times Stripe
 *     retries it,
 *   - N distinct failing events => N emails (you want to see the scope),
 *   - a 30-day prune keeps the table tiny.
 *
 * For pre-verify errors (env query missing/invalid) we have no event id, so
 * we synthesize a per-day key. That bounds those alerts to one/day/env even
 * if a misconfigured caller hits the endpoint in a loop.
 *
 * Never throws. Alerting that breaks the webhook response defeats the
 * point — Stripe must still see our 500 so it retries.
 */

import { supabaseAdmin } from '@/integrations/supabase/client.server'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

/**
 * Visible "From:" address. `onboarding@resend.dev` is the only sender that
 * works without a verified Resend domain. Override with ALERTS_FROM_EMAIL
 * once a satus.sh sender is verified in Resend.
 */
const FROM = process.env.ALERTS_FROM_EMAIL ?? 'satus alerts <onboarding@resend.dev>'

/** Where the alert lands. Defaults to the founder-facing support inbox. */
const TO = process.env.ALERTS_TO_EMAIL ?? 'support@satus.sh'

export interface WebhookFailureArgs {
  /**
   * Stripe event id (`evt_...`). Pass null for pre-verify failures (env
   * query invalid, etc.) — a synthetic per-day key will be used instead.
   */
  eventId: string | null
  /** Stripe event type, or a short label for pre-verify cases. */
  eventType: string
  /** 'sandbox' | 'live' so we can tell test noise from real revenue at a glance. */
  environment: 'sandbox' | 'live' | 'unknown'
  /** The thrown error (or any value caught). Strings are coerced safely. */
  error: unknown
}

/**
 * Best-effort: try to claim the dedup row. Returns true if this caller
 * "owns" sending the alert, false if another retry already did.
 * Swallows DB errors so we degrade to "alert anyway" rather than "stay silent".
 */
async function claimDedupKey(args: {
  eventId: string
  eventType: string
  environment: string
  errorMessage: string
}): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('webhook_alerts_sent')
      .insert({
        event_id: args.eventId,
        event_type: args.eventType,
        environment: args.environment,
        error_message: args.errorMessage,
      })

    if (!error) return true

    // 23505 = unique_violation = a previous attempt already inserted.
    // Anything else is unexpected; log it and fall through to "alert
    // anyway" so we don't silently lose the signal.
    const code = (error as { code?: string }).code
    if (code === '23505') return false

    console.error('[webhook-alerts] dedup insert failed, will alert anyway', error)
    return true
  } catch (err) {
    console.error('[webhook-alerts] dedup threw, will alert anyway', err)
    return true
  }
}

function toMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

function toStack(err: unknown): string | null {
  if (err instanceof Error && err.stack) return err.stack
  return null
}

/**
 * Compose the alert email body. Plain text on purpose — ops email reads
 * better in any client, doesn't trigger HTML-render quirks in alert
 * forwarders, and survives copy/paste into a ticket.
 */
function renderEmail(args: WebhookFailureArgs & { dedupKey: string }) {
  const subject = `[satus][${args.environment}] Stripe webhook failed: ${args.eventType}`
  const message = toMessage(args.error)
  const stack = toStack(args.error)

  const lines = [
    `Stripe webhook handler returned an error.`,
    ``,
    `event id     : ${args.eventId ?? '(pre-verify, none)'}`,
    `event type   : ${args.eventType}`,
    `environment  : ${args.environment}`,
    `dedup key    : ${args.dedupKey}`,
    `occurred at  : ${new Date().toISOString()}`,
    ``,
    `error message:`,
    message,
    ``,
  ]
  if (stack) {
    lines.push('stack trace:', stack, '')
  }
  lines.push(
    `What to check:`,
    `  - Stripe dashboard -> Developers -> Events -> ${args.eventId ?? '(n/a)'}`,
    `  - public.licenses for the affected subscription`,
    `  - Recent migrations / deploys that might have broken the handler`,
    ``,
    `Stripe will keep retrying 5xx responses for up to 3 days. A retry-storm`,
    `for this same event will NOT trigger a second email — dedup key above`,
    `was claimed in public.webhook_alerts_sent.`,
  )
  return { subject, text: lines.join('\n') }
}

/**
 * Send the alert. All failure paths are caught and logged; this function
 * resolves to void no matter what — the caller (a webhook handler) needs
 * to keep its own response code intact so Stripe retries correctly.
 */
export async function notifyWebhookFailure(args: WebhookFailureArgs): Promise<void> {
  try {
    const lovableKey = process.env.LOVABLE_API_KEY
    const resendKey = process.env.RESEND_API_KEY
    if (!lovableKey || !resendKey) {
      console.error('[webhook-alerts] missing LOVABLE_API_KEY or RESEND_API_KEY; skipping alert')
      return
    }

    // Pre-verify failures (no event id) collapse to one alert per env per
    // UTC day. Real Stripe events use evt_... directly.
    const dedupKey =
      args.eventId ??
      `prelim-${args.environment}-${args.eventType}-${new Date().toISOString().slice(0, 10)}`

    const errorMessage = toMessage(args.error).slice(0, 1900)

    const owned = await claimDedupKey({
      eventId: dedupKey,
      eventType: args.eventType,
      environment: args.environment,
      errorMessage,
    })
    if (!owned) return // already alerted on this event

    const { subject, text } = renderEmail({ ...args, dedupKey })

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lovableKey}`,
        'X-Connection-Api-Key': resendKey,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        text,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[webhook-alerts] resend non-2xx', res.status, body.slice(0, 500))
    }
  } catch (err) {
    // Never let alerting throw into the webhook response path.
    console.error('[webhook-alerts] unexpected failure', err)
  }
}
