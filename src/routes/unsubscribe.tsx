/**
 * /unsubscribe — confirmation page for one-click unsubscribe links in
 * transactional emails. Validates the token on mount, then asks for an
 * explicit click before suppressing the address (RFC 8058 mail-client
 * one-clicks hit the JSON API directly and bypass this page).
 */

import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { TopBar, Footer } from '@/components/site/chrome'

const SITE_URL = 'https://satus.sh'

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (s: Record<string, unknown>): { token?: string } => ({
    token: typeof s.token === 'string' ? s.token : undefined,
  }),
  component: UnsubscribePage,
  head: () => ({
    meta: [
      { title: 'Unsubscribe — satus.sh' },
      { name: 'robots', content: 'noindex,nofollow' },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/unsubscribe' }],
  }),
})

function UnsubscribePage() {
  const { token } = Route.useSearch()
  const [state, setState] = useState<
    'checking' | 'ready' | 'submitting' | 'done' | 'already' | 'invalid'
  >('checking')

  useEffect(() => {
    if (!token) {
      setState('invalid')
      return
    }
    void fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const body = await r.json().catch(() => ({}))
        if (!r.ok) return setState('invalid')
        if (body.valid === true) return setState('ready')
        if (body.reason === 'already_unsubscribed') return setState('already')
        return setState('invalid')
      })
      .catch(() => setState('invalid'))
  }, [token])

  async function confirm() {
    if (!token) return
    setState('submitting')
    const r = await fetch('/email/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    const body = await r.json().catch(() => ({}))
    if (r.ok && body.success) return setState('done')
    if (body.reason === 'already_unsubscribed') return setState('already')
    setState('invalid')
  }

  return (
    <div className="satus-fade min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TopBar />
      <main className="mx-auto w-full max-w-[640px] px-6 py-16 lg:px-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span className="text-[var(--signal)]">§MAIL</span>
          <span className="mx-3 text-[var(--hairline)]">|</span>
          <span>Unsubscribe</span>
        </div>
        <h1 className="mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]">
          {state === 'done'
            ? 'unsubscribed.'
            : state === 'already'
            ? 'already unsubscribed.'
            : state === 'invalid'
            ? 'invalid link.'
            : 'confirm unsubscribe.'}
        </h1>
        <hr className="mt-6" />

        <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80">
          {state === 'checking' && 'Validating link…'}
          {state === 'ready' &&
            'Click below to stop receiving emails from satus.sh. Transactional emails for account changes will still reach you while a subscription is active.'}
          {state === 'submitting' && 'Processing…'}
          {state === 'done' &&
            'Your email address has been added to our suppression list. You will not receive further mail from satus.sh.'}
          {state === 'already' &&
            'This address was previously unsubscribed. Nothing to do.'}
          {state === 'invalid' &&
            'This link is not valid or has expired. If you keep receiving unwanted mail, contact hello@satus.sh.'}
        </p>

        {state === 'ready' && (
          <div className="mt-8">
            <button
              onClick={confirm}
              className="inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)]"
            >
              confirm unsubscribe
            </button>
          </div>
        )}

        <p className="mt-10 font-mono text-[12px] text-[var(--mute)]">
          <Link to="/" className="text-[var(--ink)] underline hover:text-[var(--signal)]">
            ← back to satus.sh
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}
