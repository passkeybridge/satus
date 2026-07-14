/**
 * Customer billing portal redirect.
 *
 * GET /api/public/billing/portal?key=<license_key>
 *   → 302 to a freshly-minted Stripe Billing Portal session for the
 *     Stripe customer that owns this license.
 *
 * The license key is issued to the customer over email and is already the
 * bearer secret they use to activate the CLI — treating it as the sole
 * credential here avoids inventing a separate account/login for a v1
 * surface that has no /account page. Portal sessions themselves are
 * short-lived and single-use, so leaking one URL only exposes one
 * session, not the customer record.
 *
 * Rate limit: 10 hits / hour / license key (Postgres-backed, so the cap
 * holds across Cloudflare Worker isolates). Enough for legit "click the
 * link in the email" traffic, tight enough to squash key-guessing.
 */

import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { createStripeClient, type StripeEnv } from '@/lib/stripe.server'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const RATE_BUCKET = 'billing_portal'
const RATE_WINDOW_SECONDS = 3600
const RATE_LIMIT = 10

const KEY_RE = /^satus_(live|test)_[a-f0-9]{32}$/

const QuerySchema = z.object({
  key: z.string().min(20).max(80).regex(KEY_RE),
})

async function rateLimited(key: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin.rpc('check_rate_limit', {
    p_bucket: RATE_BUCKET,
    p_key: key,
    p_window_seconds: RATE_WINDOW_SECONDS,
  })
  if (error) {
    // Fail open on counter errors — same posture as /license/verify.
    console.error('[billing/portal] rate-limit counter failed', error)
    return false
  }
  return typeof data === 'number' && data > RATE_LIMIT
}

function plainError(status: number, message: string): Response {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export const Route = createFileRoute('/api/public/billing/portal')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const parsed = QuerySchema.safeParse({ key: url.searchParams.get('key') })
        if (!parsed.success) {
          return plainError(400, 'Missing or malformed license key.')
        }
        const licenseKey = parsed.data.key
        const env: StripeEnv = licenseKey.startsWith('satus_live_') ? 'live' : 'sandbox'

        if (await rateLimited(licenseKey)) {
          return plainError(429, 'Too many portal requests. Try again shortly.')
        }

        const { data: license, error: lookupErr } = await supabaseAdmin
          .from('licenses')
          .select('stripe_customer_id, environment')
          .eq('license_key', licenseKey)
          .maybeSingle()

        if (lookupErr) {
          console.error('[billing/portal] lookup failed', lookupErr)
          return plainError(500, 'Server error.')
        }
        if (!license || !license.stripe_customer_id) {
          // Same 404 body whether the key is unknown or the row lacks a
          // customer id — avoids turning this into a key-enumeration oracle.
          return plainError(404, 'License not found.')
        }
        // Belt-and-braces: environment on the row must match the prefix.
        if (license.environment !== env) {
          console.error('[billing/portal] env mismatch for key', {
            keyEnv: env,
            rowEnv: license.environment,
          })
          return plainError(404, 'License not found.')
        }

        try {
          const stripe = createStripeClient(env)
          const session = await stripe.billingPortal.sessions.create({
            customer: license.stripe_customer_id as string,
            return_url: 'https://satus.sh/',
          })
          return Response.redirect(session.url, 302)
        } catch (err) {
          console.error('[billing/portal] session create failed', err)
          return plainError(502, 'Could not open the billing portal. Email support@satus.sh.')
        }
      },
    },
  },
})
