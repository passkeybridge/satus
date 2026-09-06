import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'

// Resend webhook receiver for deliverability suppression.
//
// Resend signs webhooks with svix: headers `svix-id`, `svix-timestamp`,
// `svix-signature`, HMAC-SHA256 over `${id}.${timestamp}.${body}` keyed by
// the base64 secret after the `whsec_` prefix (RESEND_WEBHOOK_SECRET).
//
// We subscribe to `email.bounced` and `email.complained`; any other event
// type is acknowledged and ignored so the Resend-side subscription can be
// broadened without breaking this endpoint.
//
// IMPORTANT: Resend webhooks are scoped to the ACCOUNT, not to a sending
// domain. This Resend account carries nine verified domains across several
// unrelated products, so this endpoint is delivered every bounce any of
// them produces. Suppressions are enforced fail-closed in the send route —
// a `bounce` blocks transactional mail too — so an unfiltered write here
// means another product's cold-outreach bounce can silently block a satus
// customer's license key. Everything below the sender check exists to make
// sure only our own sends can suppress an address.

const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60

/** Sends we own. Must stay in sync with FROM_DOMAIN in the send route. */
const OUR_SENDER_SUFFIX = '@mail.satus.sh'

interface ResendWebhookEvent {
  type: string
  created_at?: string
  data: {
    email_id?: string
    from?: string
    to?: string[] | string
    subject?: string
    [key: string]: unknown
  }
}

function redactEmail(email: string): string {
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

type VerifyResult = { ok: true } | { ok: false; status: number; error: string }

async function verifySvixSignature(request: Request, body: string, secret: string): Promise<VerifyResult> {
  const svixId = request.headers.get('svix-id')
  const svixTimestamp = request.headers.get('svix-timestamp')
  const svixSignature = request.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return { ok: false, status: 401, error: 'Missing svix headers' }
  }

  const timestamp = Number.parseInt(svixTimestamp, 10)
  if (!Number.isFinite(timestamp)) {
    return { ok: false, status: 401, error: 'Invalid timestamp' }
  }
  const skew = Math.abs(Date.now() / 1000 - timestamp)
  if (skew > TIMESTAMP_TOLERANCE_SECONDS) {
    return { ok: false, status: 401, error: 'Stale timestamp' }
  }

  const secretB64 = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret
  let keyBytes: Uint8Array
  try {
    keyBytes = base64ToBytes(secretB64)
  } catch {
    return { ok: false, status: 500, error: 'Malformed webhook secret' }
  }

  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signedContent = `${svixId}.${svixTimestamp}.${body}`
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedContent))
  const expected = bytesToBase64(new Uint8Array(mac))

  // Header carries one or more space-separated `v1,<base64sig>` entries.
  for (const part of svixSignature.split(' ')) {
    const [version, sig] = part.split(',', 2)
    if (version === 'v1' && sig && constantTimeEqual(sig, expected)) {
      return { ok: true }
    }
  }
  return { ok: false, status: 401, error: 'Invalid signature' }
}

/**
 * Did this event come from one of our own sends?
 *
 * `from` arrives either bare (`noreply@mail.satus.sh`) or with a display
 * name (`satus <noreply@mail.satus.sh>`). Unparseable or absent means "not
 * ours", which fails open on purpose: skipping a real suppression costs one
 * email to a dead mailbox, while a wrong suppression costs a paying
 * customer their license key.
 */
function isOurSender(from: unknown): boolean {
  if (typeof from !== 'string') return false
  const open = from.lastIndexOf('<')
  const address = open === -1 ? from : from.slice(open + 1).replace(/>[^>]*$/, '')
  return address.trim().toLowerCase().endsWith(OUR_SENDER_SUFFIX)
}

function mapEventToReason(eventType: string): 'bounce' | 'complaint' | null {
  switch (eventType) {
    case 'email.bounced':
      return 'bounce'
    case 'email.complained':
      return 'complaint'
    default:
      return null
  }
}

function mapReasonToStatus(reason: 'bounce' | 'complaint'): 'bounced' | 'complained' {
  return reason === 'bounce' ? 'bounced' : 'complained'
}

function mapReasonToMessage(reason: 'bounce' | 'complaint'): string {
  return reason === 'bounce'
    ? 'Permanent bounce—email address is invalid or rejected'
    : 'Spam complaint—recipient marked email as spam'
}

export const Route = createFileRoute("/api/internal/email/suppression")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!webhookSecret || !supabaseUrl || !supabaseServiceKey) {
          console.error('Missing required environment variables')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const body = await request.text()

        const verification = await verifySvixSignature(request, body, webhookSecret)
        if (!verification.ok) {
          console.error('Webhook verification failed', { error: verification.error })
          return Response.json({ error: verification.error }, { status: verification.status })
        }

        let event: ResendWebhookEvent
        try {
          event = JSON.parse(body)
          if (!event || typeof event.type !== 'string' || typeof event.data !== 'object') {
            throw new Error('Malformed event')
          }
        } catch {
          return Response.json({ error: 'Invalid payload' }, { status: 400 })
        }

        const reason = mapEventToReason(event.type)
        if (!reason) {
          // Not a suppression event—acknowledge so Resend doesn't retry.
          return Response.json({ success: true, ignored: event.type })
        }

        // Account-wide webhook: drop anything we did not send. Acknowledged
        // with 200 so Resend does not retry an event that is simply not ours.
        if (!isOurSender(event.data.from)) {
          console.log('Suppression skipped—foreign sender', {
            event_type: event.type,
            from: typeof event.data.from === 'string' ? event.data.from : null,
          })
          return Response.json({ success: true, ignored: 'foreign_sender' })
        }

        const to = Array.isArray(event.data.to) ? event.data.to[0] : event.data.to
        if (!to || typeof to !== 'string' || !to.includes('@')) {
          return Response.json({ error: 'Missing recipient in event' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const normalizedEmail = to.toLowerCase()

        // 1. Upsert to suppressed_emails (idempotent—safe for retries)
        const { error: suppressError } = await supabase
          .from('suppressed_emails')
          .upsert(
            {
              email: normalizedEmail,
              reason,
              metadata: { source: 'resend', event_type: event.type, email_id: event.data.email_id ?? null },
            },
            { onConflict: 'email' },
          )

        if (suppressError) {
          console.error('Failed to upsert suppressed email', {
            error: suppressError,
            email_redacted: redactEmail(normalizedEmail),
          })
          return Response.json({ error: 'Failed to write suppression' }, { status: 500 })
        }

        // 2. Append a new log entry for the suppression event (never update existing rows)
        const { error: insertError } = await supabase
          .from('email_send_log')
          .insert({
            message_id: event.data.email_id ?? null,
            template_name: 'system',
            recipient_email: normalizedEmail,
            status: mapReasonToStatus(reason),
            error_message: mapReasonToMessage(reason),
            metadata: { source: 'resend', event_type: event.type },
          })

        if (insertError) {
          // Non-fatal—log and continue. The suppression was already recorded.
          console.warn('Failed to insert email_send_log', { error: insertError })
        }

        console.log('Suppression processed', {
          email_redacted: redactEmail(normalizedEmail),
          reason,
          event_type: event.type,
        })

        return Response.json({ success: true })
      },
    },
  },
})
