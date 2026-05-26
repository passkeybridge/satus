/**
 * License verification endpoint — called by the satus CLI on each run
 * (cached locally for ~24h). Public, rate-limited per IP-hash.
 *
 * POST { key: string } → { valid: bool, plan?, expires_at?, reason? }
 *
 * Treats canceled-but-still-within-period as valid (grace window).
 * Revoked or past-due keys are rejected.
 */

import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import crypto from 'node:crypto'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
} as const

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })

// 60 verify calls / 10 min / IP-hash. CLI caches; legit users shouldn't hit it.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 60
const hits = new Map<string, number[]>()

function rateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 32)
}

const Payload = z.object({
  key: z
    .string()
    .min(20)
    .max(80)
    .regex(/^satus_(live|test)_[a-f0-9]{32}$/),
})

export const Route = createFileRoute('/api/public/license/verify')({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return json(400, { valid: false, reason: 'invalid_json' })
        }

        const parsed = Payload.safeParse(raw)
        if (!parsed.success) {
          return json(400, { valid: false, reason: 'invalid_key_format' })
        }

        const ip =
          request.headers.get('cf-connecting-ip') ??
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
          null
        const ipHash = hashIp(ip)
        if (ipHash && rateLimited(ipHash)) {
          return json(429, { valid: false, reason: 'rate_limited' })
        }

        const { data, error } = await supabaseAdmin
          .from('licenses')
          .select('plan, status, current_period_end, revoked_at')
          .eq('license_key', parsed.data.key)
          .maybeSingle()

        if (error) {
          console.error('[license/verify] lookup failed', error)
          return json(500, { valid: false, reason: 'server_error' })
        }
        if (!data) {
          return json(200, { valid: false, reason: 'unknown_key' })
        }
        if (data.revoked_at) {
          return json(200, { valid: false, reason: 'revoked' })
        }

        const now = Date.now()
        const periodEnd = data.current_period_end
          ? new Date(data.current_period_end).getTime()
          : null

        // Expiration is checked first so the CLI can distinguish "your
        // subscription period ended, renew it" (expired) from "your
        // subscription is broken on the Stripe side, fix billing"
        // (inactive). A canceled-but-still-in-period license is treated
        // as valid (grace window) and falls through to the success path.
        if (periodEnd !== null && periodEnd <= now) {
          return json(200, { valid: false, reason: 'expired' })
        }

        // Active / trialing / past_due (grace) all pass if within period.
        // Canceled also passes while still inside the paid period.
        const goodStatus = ['active', 'trialing', 'past_due'].includes(
          data.status,
        )
        const canceledButInPeriod =
          data.status === 'canceled' && periodEnd !== null && periodEnd > now

        if (!(goodStatus || canceledButInPeriod)) {
          return json(200, { valid: false, reason: 'inactive' })
        }

        return json(200, {
          valid: true,
          plan: data.plan,
          expires_at: data.current_period_end,
        })
      },
    },
  },
})
