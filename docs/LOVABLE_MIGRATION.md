# satus.sh — Lovable Independence Migration Dossier

Status: **discovery complete** (2026-08-05). This document inventories every
Lovable dependency in the satus stack and lays out the cutover plan to run
fully on our own Vercel + Supabase + Stripe + Resend accounts, following the
same playbook as PasskeyBridge.

## 1. Current architecture

| Layer | Today | Owned by us? |
|---|---|---|
| Code | `passkeybridge/satus` (GitHub, public), written via Lovable (`gpt-engineer-app[bot]` commits to `main`) | ✅ yes |
| Framework | TanStack Start + React 19 + Vite 7 + Tailwind 4 + shadcn/Radix, Nitro server, Bun lockfile | ✅ yes |
| Hosting (live) | Lovable hosting — `satus.sh` DNS → `185.158.133.1` (Lovable edge), published as `satus.lovable.app` | ❌ Lovable |
| Hosting (shadow) | Vercel project `satus` (`prj_1Ac9AOYXFE6wYNpXyCUIeIcLOw0Z`, team `passkey-bridge-llc`) auto-deploys every push to `main`; production READY and SSR verified at `satus-olive.vercel.app` | ✅ yes |
| Database + Auth | Supabase project `nrdhmvxnorvfujgwslot` — **Lovable Cloud managed**, not in our Supabase org (our org only has `PasskeyBridge` / `rdjluricrvasamkmzdtm`) | ❌ Lovable |
| Payments | Stripe SDK pointed at `connector-gateway.lovable.dev/stripe`; `STRIPE_SANDBOX_API_KEY` / `STRIPE_LIVE_API_KEY` are **gateway connection IDs, not real keys**; real secret lives with Lovable. Underlying Stripe account is ours: `acct_1TFI5yGTWx4Bh4zb` (PasskeyBridge LLC) | ⚠️ split |
| Transactional email | `@lovable.dev/email-js` `sendLovableEmail` via `LOVABLE_SEND_URL`, sender domain `notify.satus.sh` (subdomain NS-delegated to Lovable) | ❌ Lovable |
| Email infra (queue) | Supabase-backed queue (pgmq-style) + DLQ + suppression + unsubscribe tokens, processed by `/lovable/email/queue/process` | ✅ portable code, ❌ Lovable DB + trigger |
| CLI | `@passkeybridge/satus` v0.3.5 on npm; verifies licenses against `https://satus.sh/api/public/license/verify` (`SATUS_API_BASE` overridable) | ✅ yes |
| GitHub Action | `packages/action` | ✅ yes |

### Key code paths

- `src/lib/stripe.server.ts` — Stripe client rewritten to Lovable connector
  gateway; `verifyWebhook` is SDK-free HMAC (works unchanged with a real
  Stripe webhook secret).
- `src/lib/payments.functions.ts` — Embedded Checkout server fns; price
  lookup keys: `satus_pro_monthly`, `satus_pro_yearly`,
  `satus_team_seat_monthly`.
- `src/routes/api/public/*` — waitlist, billing portal, license verify
  (CLI-critical), payments webhook, CLI run telemetry, e2e-health hook.
- `src/routes/lovable/email/*` — transactional send, queue processor,
  suppression. Only the *send* call is Lovable-specific.
- Env vars in use: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_*`, `STRIPE_{SANDBOX,LIVE}_API_KEY`,
  `PAYMENTS_{SANDBOX,LIVE}_WEBHOOK_SECRET`, `LOVABLE_API_KEY`,
  `LOVABLE_SEND_URL`, `RESEND_API_KEY`, `ALERTS_{FROM,TO}_EMAIL`,
  `PUBLIC_SITE_URL`, `VITE_PAYMENTS_CLIENT_TOKEN`.

### Data to migrate (tiny — copy is trivial)

From Lovable Cloud Supabase (`nrdhmvxnorvfujgwslot`), public schema:
`licenses` (7), `satus_runs` (8), `email_send_log` (16),
`email_send_state` (1), `email_unsubscribe_tokens` (2), `e2e_health_log` (6),
`waitlist_signups` / `suppressed_emails` / storage objects (0). `auth.users`
has 1 user. All 24 SQL migrations are already in-repo under
`supabase/migrations/`, so a fresh project can be rebuilt from source and the
handful of rows copied over.

### Assets already in place on our side

- Vercel team `PasskeyBridge LLC` with working `satus` project + GitHub
  integration (build verified green, Node 24, framework `vite`).
- Stripe account `acct_1TFI5yGTWx4Bh4zb` (the gateway was always fronting
  *our* account, so products/prices/customers stay put).
- Resend account with **`mail.satus.sh` already verified** (us-east-1,
  sending enabled) — ready to replace Lovable email.

## 2. Cutover plan

1. **Supabase** — create `satus` project in our org; apply the in-repo
   migrations; copy the rows above; issue publishable + service-role keys.
2. **Stripe direct** — replace the gateway `httpClient` in
   `stripe.server.ts` with a plain `Stripe(secretKey)` client
   (`STRIPE_SECRET_KEY` sandbox/live); register our own webhook endpoint at
   `https://satus.sh/api/public/payments/webhook` and swap in its signing
   secrets. Confirm the three price lookup keys resolve in live mode.
3. **Email via Resend** — swap `sendLovableEmail` for the Resend API using
   `mail.satus.sh` as sender domain (update `SENDER_DOMAIN`/`FROM_DOMAIN`
   in `send.ts`, or verify `notify.satus.sh` in Resend and un-delegate its
   NS from Lovable). Queue/DLQ/suppression code stays as-is.
4. **Vercel env + cron** — set all env vars on the Vercel project; add a
   Vercel Cron (or Routine) to hit the email queue processor, which Lovable
   currently triggers.
5. **DNS cutover** — point `satus.sh` (+ `www`) at Vercel; add the domains
   to the Vercel project. The CLI's license-verify URL doesn't change, so
   released CLI versions keep working through the cutover.
6. **Decommission** — smoke-test checkout (sandbox + live), license verify,
   email send; then unpublish the Lovable deployment and treat the Lovable
   project as archive-only. Future edits happen via Claude on this repo.

## 3. Open items

- Vercel project env vars can't be listed via API from here — audit in the
  dashboard while setting the new ones.
- `VITE_PAYMENTS_CLIENT_TOKEN` (Lovable payments client token) — replaced by
  our real Stripe publishable key in the embedded checkout component.
- Decide sender identity: keep `notify.satus.sh` (re-verify in Resend after
  removing Lovable NS delegation) vs. standardize on `mail.satus.sh`.
- Ongoing ops previously done inside Lovable (weekly blog posts, e2e health
  checks, accuracy audits) move to this Claude thread.
