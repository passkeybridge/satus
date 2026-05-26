/**
 * /account — minimal billing portal entry point.
 *
 * Flow:
 *   1. Unauthenticated → email input → Supabase magic link sent to inbox.
 *   2. User clicks link → returned here authenticated.
 *   3. "Manage billing" → server fn issues a Stripe Customer Portal URL
 *      → opened in a new tab. Portal handles cancel/update card/invoices.
 *
 * No password, no profile, no dashboard. The auth.users row exists so
 * the magic-link round-trip can be verified server-side; nothing else is
 * stored about the user.
 */

import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { createPortalSession } from '@/lib/portal.functions'
import { getStripeEnvironment } from '@/lib/stripe'
import { TopBar, Footer } from '@/components/site/chrome'

const SITE_URL = 'https://satus.sh'

export const Route = createFileRoute('/account')({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: 'Account — satus.sh' },
      {
        name: 'description',
        content:
          'Manage your satus.sh subscription: update payment method, download invoices, change plan, or cancel.',
      },
      { name: 'robots', content: 'noindex,nofollow' },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/account' }],
  }),
})

function AccountPage() {
  const [email, setEmail] = useState('')
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error' | 'portal'
  >('idle')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    // Initial session check, then subscribe for magic-link return.
    void supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionEmail(session?.user.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: window.location.origin + '/account',
        // Don't create new users on demand — only customers we've issued
        // licenses to should be able to reach the portal. We can't enforce
        // this on the auth side without coupling, so we accept new rows
        // but the portal lookup below will fail for non-customers.
        shouldCreateUser: true,
      },
    })
    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }
    setStatus('sent')
  }

  async function openPortal() {
    setStatus('portal')
    setMessage('')
    try {
      const { url } = await createPortalSession({
        data: {
          returnUrl: window.location.origin + '/account',
          environment: getStripeEnvironment(),
        },
      })
      window.open(url, '_blank', 'noopener,noreferrer')
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setMessage(
        err instanceof Error
          ? err.message
          : 'Unable to open the billing portal.',
      )
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSessionEmail(null)
    setStatus('idle')
    setMessage('')
  }

  return (
    <div className="satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TopBar />
      <main className="mx-auto w-full max-w-[720px] px-6 py-16 lg:px-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§ACCOUNT</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Billing portal</span>
        </div>
        <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
          manage your subscription.
        </h1>
        <hr className="mt-6" />

        {!sessionEmail ? (
          <section className="mt-8 max-w-[60ch]">
            <p className="text-[15px] leading-[1.65] text-[var(--ink)]/80">
              Enter the email you used at checkout. We send a one-time link;
              no password to remember. The link opens Stripe's billing portal
              where you can update payment method, download invoices, switch
              plan, or cancel.
            </p>

            {status === 'sent' ? (
              <div className="mt-8 border border-[var(--ink)] bg-[var(--paper)] p-5 font-mono text-[12.5px] text-[var(--ink)]">
                <div className="text-[var(--signal)]">§ check your inbox</div>
                <p className="mt-2 text-[var(--ink)]/80">
                  We sent a sign-in link to {email}. The link expires in 60
                  minutes. You can close this tab.
                </p>
              </div>
            ) : (
              <form
                onSubmit={sendMagicLink}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                noValidate
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 flex-1 border border-[var(--ink)] bg-[var(--paper)] px-3 font-mono text-[13px] text-[var(--ink)] placeholder:text-[var(--mute)] focus:outline-none focus:ring-2 focus:ring-[var(--signal)]"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'sending…' : 'send sign-in link'}
                </button>
              </form>
            )}
            {status === 'error' && message && (
              <p className="mt-3 font-mono text-[12px] text-[var(--signal)]">
                {message}
              </p>
            )}
          </section>
        ) : (
          <section className="mt-8 max-w-[60ch]">
            <dl className="border-y border-[var(--hairline)] py-4 font-mono text-[12px]">
              <div className="flex items-baseline justify-between gap-3 text-[var(--mute)]">
                <dt>signed in as</dt>
                <dd className="truncate text-[var(--ink)]">{sessionEmail}</dd>
              </div>
            </dl>
            <p className="mt-6 text-[15px] leading-[1.65] text-[var(--ink)]/80">
              Open Stripe's billing portal in a new tab to manage your
              subscription. Changes take effect immediately.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={openPortal}
                disabled={status === 'portal'}
                className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'portal' ? 'opening…' : 'manage billing ↗'}
              </button>
              <button
                onClick={signOut}
                className="inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                sign out
              </button>
            </div>
            {status === 'error' && message && (
              <p className="mt-4 font-mono text-[12px] text-[var(--signal)]">
                {message}
              </p>
            )}
          </section>
        )}

        <hr className="mt-12" />
        <p className="mt-6 max-w-[60ch] font-mono text-[12px] text-[var(--mute)]">
          Lost your license key?{' '}
          <a
            href="mailto:hello@satus.sh"
            className="text-[var(--ink)] underline hover:text-[var(--signal)]"
          >
            hello@satus.sh
          </a>
          {' '}— we can re-issue it once you sign in.
        </p>
        <p className="mt-4 max-w-[60ch] font-mono text-[12px] text-[var(--mute)]">
          Back to{' '}
          <Link to="/" className="text-[var(--ink)] underline hover:text-[var(--signal)]">
            overview
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  )
}
