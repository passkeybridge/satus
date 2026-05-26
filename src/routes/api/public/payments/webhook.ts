/**
 * Stripe webhook handler — license fulfillment.
 *
 * Lives under /api/public/* so Lovable's published-site auth wrapper lets
 * Stripe POST in. Security is enforced in-handler via HMAC verification of
 * the `stripe-signature` header (verifyWebhook in stripe.server.ts).
 *
 * Events handled:
 *   - checkout.session.completed       → issue license, enqueue email
 *   - customer.subscription.updated    → sync status, period, cancel flag
 *   - customer.subscription.deleted    → revoke license
 *
 * Idempotency: subscription rows key on `stripe_subscription_id` UNIQUE.
 * A repeated event upserts the same row, never duplicates.
 */

import { createFileRoute } from '@tanstack/react-router'
import {
  createStripeClient,
  type StripeEnv,
  verifyWebhook,
} from '@/lib/stripe.server'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const PLAN_LABELS: Record<string, string> = {
  satus_pro_monthly: 'Pro · monthly',
  satus_pro_yearly: 'Pro · yearly',
  satus_team_seat_monthly: 'Team seat · monthly',
}

/** `satus_live_<32 hex>` for live, `satus_test_<32 hex>` for sandbox. */
function generateLicenseKey(env: StripeEnv): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const prefix = env === 'live' ? 'satus_live_' : 'satus_test_'
  return prefix + hex
}

function planLabel(plan: string | null | undefined): string {
  if (!plan) return 'satus.sh subscription'
  return PLAN_LABELS[plan] ?? plan
}

function isoDateOnly(ts: number | null | undefined): string | null {
  if (!ts) return null
  return new Date(ts * 1000).toISOString().slice(0, 10)
}

async function enqueueLicenseEmail(args: {
  recipientEmail: string
  licenseKey: string
  plan: string
  currentPeriodEnd: number | null
  subscriptionId: string
}) {
  const origin =
    process.env.PUBLIC_SITE_URL ?? 'https://satus.sh'
  const res = await fetch(`${origin}/lovable/email/transactional/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      templateName: 'license-delivery',
      recipientEmail: args.recipientEmail,
      idempotencyKey: `license-${args.subscriptionId}`,
      templateData: {
        licenseKey: args.licenseKey,
        planLabel: planLabel(args.plan),
        renewsOn: isoDateOnly(args.currentPeriodEnd),
      },
    }),
  }).catch((err) => {
    console.error('[payments-webhook] email enqueue failed', err)
    return null
  })
  if (res && !res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[payments-webhook] email enqueue non-2xx', res.status, body)
  }
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  if (session.mode !== 'subscription') return
  const subscriptionId: string | undefined = session.subscription
  if (!subscriptionId) return

  const email: string | undefined =
    session.customer_details?.email ?? session.customer_email ?? undefined
  if (!email) {
    console.error('[payments-webhook] no email on session', session.id)
    return
  }

  const customerId: string | undefined =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id
  if (!customerId) return

  const stripe = createStripeClient(env)
  const sub = await stripe.subscriptions.retrieve(subscriptionId)
  const item = sub.items?.data?.[0]
  const price = item?.price
  const plan = (price?.lookup_key as string) ?? price?.id ?? 'unknown'
  const periodEnd =
    (item as any)?.current_period_end ??
    (sub as any).current_period_end ??
    null

  const { data: existing } = await supabaseAdmin
    .from('licenses')
    .select('license_key')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle()

  const licenseKey = existing?.license_key ?? generateLicenseKey(env)

  const { error } = await supabaseAdmin
    .from('licenses')
    .upsert(
      {
        license_key: licenseKey,
        email: email.toLowerCase(),
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        plan,
        status: sub.status,
        environment: env,
        current_period_end: periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null,
        cancel_at_period_end: sub.cancel_at_period_end ?? false,
        revoked_at: null,
      },
      { onConflict: 'stripe_subscription_id' },
    )

  if (error) {
    console.error('[payments-webhook] license upsert failed', error)
    return
  }

  await enqueueLicenseEmail({
    recipientEmail: email,
    licenseKey,
    plan,
    currentPeriodEnd: periodEnd,
    subscriptionId,
  })
}

async function handleSubscriptionUpdated(subscription: any, env: StripeEnv) {
  const item = subscription.items?.data?.[0]
  const plan = (item?.price?.lookup_key as string) ?? item?.price?.id ?? 'unknown'
  const periodEnd =
    (item as any)?.current_period_end ??
    subscription.current_period_end ??
    null

  await supabaseAdmin
    .from('licenses')
    .update({
      status: subscription.status,
      plan,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    })
    .eq('stripe_subscription_id', subscription.id)
    .eq('environment', env)
}

async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  await supabaseAdmin
    .from('licenses')
    .update({
      status: 'canceled',
      revoked_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)
    .eq('environment', env)
}

export const Route = createFileRoute('/api/public/payments/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get('env')
        if (rawEnv !== 'sandbox' && rawEnv !== 'live') {
          console.error('[payments-webhook] invalid env query', rawEnv)
          return Response.json({ received: true, ignored: 'invalid env' })
        }
        const env: StripeEnv = rawEnv

        let event: { type: string; data: { object: any } }
        try {
          event = await verifyWebhook(request, env)
        } catch (err) {
          console.error('[payments-webhook] signature verification failed', err)
          return new Response('Invalid signature', { status: 400 })
        }

        try {
          switch (event.type) {
            case 'checkout.session.completed':
              await handleCheckoutCompleted(event.data.object, env)
              break
            case 'customer.subscription.updated':
              await handleSubscriptionUpdated(event.data.object, env)
              break
            case 'customer.subscription.deleted':
              await handleSubscriptionDeleted(event.data.object, env)
              break
            default:
              break
          }
          return Response.json({ received: true })
        } catch (err) {
          console.error('[payments-webhook] handler error', event.type, err)
          return new Response('Handler error', { status: 500 })
        }
      },
    },
  },
})
