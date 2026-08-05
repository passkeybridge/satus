/**
 * Direct Resend client (server-only).
 *
 * Replaces the Lovable email gateway (`@lovable.dev/email-js` /
 * `connector-gateway.lovable.dev/resend`). Talks straight to
 * `api.resend.com` with our own `RESEND_API_KEY`.
 *
 * Error contract: failures throw `ResendAPIError` carrying `status` and
 * `retryAfterSeconds` so the queue processor's rate-limit (429) and
 * forbidden (403) handling keeps working unchanged.
 */

const RESEND_API_URL = 'https://api.resend.com/emails'

export class ResendAPIError extends Error {
  status: number
  retryAfterSeconds: number | null

  constructor(status: number, message: string, retryAfterSeconds: number | null = null) {
    super(`Resend API error ${status}: ${message}`)
    this.name = 'ResendAPIError'
    this.status = status
    this.retryAfterSeconds = retryAfterSeconds
  }
}

export interface SendEmailArgs {
  to: string | string[]
  from: string
  subject: string
  html?: string
  text?: string
  /** Extra SMTP headers, e.g. List-Unsubscribe. */
  headers?: Record<string, string>
  /** Dedupe key—Resend suppresses duplicate sends within its idempotency window. */
  idempotencyKey?: string
}

export async function sendResendEmail(args: SendEmailArgs): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
  if (args.idempotencyKey) headers['Idempotency-Key'] = args.idempotencyKey

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      from: args.from,
      to: Array.isArray(args.to) ? args.to : [args.to],
      subject: args.subject,
      ...(args.html ? { html: args.html } : {}),
      ...(args.text ? { text: args.text } : {}),
      ...(args.headers ? { headers: args.headers } : {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const retryAfterHeader = res.headers.get('retry-after')
    const retryAfterSeconds = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) || null : null
    throw new ResendAPIError(res.status, body.slice(0, 500), retryAfterSeconds)
  }

  return (await res.json()) as { id: string }
}
