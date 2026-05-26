/**
 * createPortalSession — opens a Stripe Customer Portal session for the
 * signed-in user. The user authenticates via magic link (no password),
 * which gives us their verified email. We look up their Stripe customer
 * by that email and return the portal URL.
 *
 * The /account route opens the result in a new tab.
 */

import { createServerFn } from '@tanstack/react-start'
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware'
import { createStripeClient, type StripeEnv } from '@/lib/stripe.server'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

export const createPortalSession = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { returnUrl: string; environment: StripeEnv }) => {
    if (data.environment !== 'sandbox' && data.environment !== 'live') {
      throw new Error('Invalid environment')
    }
    if (typeof data.returnUrl !== 'string' || data.returnUrl.length > 2048) {
      throw new Error('Invalid returnUrl')
    }
    return data
  })
  .handler(async ({ data, context }) => {
    // Use the middleware's user-scoped client to read the verified email.
    const {
      data: { user },
    } = await context.supabase.auth.getUser()
    const email = user?.email?.toLowerCase()
    if (!email) throw new Error('No verified email on session')

    // Look up the most recent license issued to this email to find the
    // Stripe customer id. Licenses table is service-role only; use admin.
    const { data: lic } = await supabaseAdmin
      .from('licenses')
      .select('stripe_customer_id, environment')
      .eq('email', email)
      .eq('environment', data.environment)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!lic?.stripe_customer_id) {
      throw new Error('No subscription found for this email')
    }

    const stripe = createStripeClient(data.environment)
    const portal = await stripe.billingPortal.sessions.create({
      customer: lic.stripe_customer_id,
      return_url: data.returnUrl,
    })

    return { url: portal.url }
  })
