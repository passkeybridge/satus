# satus.sh — Lovable Independence Migration Dossier

Status: **MIGRATION COMPLETE** (2026-08-05). satus.sh runs entirely on our
own Vercel + Supabase + Stripe + Resend accounts. DNS cut over (apex
canonical, www 308s to apex). Post-cutover smoke tests all green:
e2e-health 4/4 (license verify, webhook signature, magic link, email
queue), queue processor authenticates via the vault key, and a live
license-delivery email was sent through Resend end-to-end. Lovable's old
satus Stripe webhook endpoints disappeared on their own (verified absent);
only our direct endpoint remains. Daily e2e-health cron scheduled 06:00
UTC. Remaining: unpublish the Lovable deployment (owner action in the
Lovable editor). This document is the migration record.

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

## 2. Completed (2026-08-05)

1. **Code independence** — all Lovable runtime services removed:
   - `stripe.server.ts` talks directly to `api.stripe.com` using
     `STRIPE_SANDBOX_SECRET_KEY` / `STRIPE_LIVE_SECRET_KEY` (real `sk_` keys).
   - New `src/lib/resend.server.ts`; queue processor, webhook alerts, and
     e2e-health alerts all post directly to `api.resend.com`.
   - Sender domain switched `notify.satus.sh` → `mail.satus.sh` (verified in
     our Resend account).
   - Suppression endpoint rewritten as a svix-verified **Resend webhook**
     (`email.bounced` / `email.complained`), secret in
     `RESEND_WEBHOOK_SECRET`.
   - `@lovable.dev/email-js` + `@lovable.dev/webhooks-js` dropped;
     `bun.lock` regenerated against the public npm registry (was pinned to
     Lovable's private mirror); `@tanstack/react-router` pinned to 1.168.25.
   - Build + `tsc --noEmit` green.
2. **Supabase re-platform** — project `satus` (`xbnrjwzryuonuinzuomk`,
   us-east-1, our org, $10/mo compute) created; schema applied as four
   baseline migrations replaying the 24 repo files; the dynamically-created
   `email_queue_wake`/`email_queue_dispatch` self-arming queue trigger was
   extracted from the live Lovable DB and ported (URL now
   `https://satus.sh/lovable/email/queue/process`). All data copied and
   verified: 7 licenses, 8 satus_runs, 16 email_send_log, 2 unsubscribe
   tokens, 6 e2e_health_log, send-state config, e2e auth user + identity.
   The 3 prune cron jobs are scheduled. Function inventory matches the
   Lovable DB exactly.
   - Project URL: `https://xbnrjwzryuonuinzuomk.supabase.co`
   - Publishable key: `sb_publishable_lQTJrK09yoRsg2vHynu38g_Uh3qUYUq`

## 3. Remaining cutover steps

> Progress 2026-08-05 (later): live Stripe webhook endpoint created
> (`we_1U13qRGTWx4Bh4zbfpSCi9a5` → satus.sh, 4 events) and the three price
> lookup keys verified in live mode. Resend sending key
> (`satus-vercel-production`, scoped to mail.satus.sh) and suppression
> webhook (`ce189c42-...` → /lovable/email/suppression, bounced+complained)
> created; secrets handed to the owner in chat. Public Supabase config is
> now baked into `.env.production`, so the Vercel env list is secrets-only.
> At decommission: disable Lovable's satus webhook endpoints
> `we_1TbJPfGTWx4Bh4zbRPM9LfU5` and `we_1TbJPeGTWx4Bh4zb4cpZdPtc` (leave
> the petsupplies/booked/passkeybridge ones alone).

1. **Secrets (dashboard, human-held)** — set on the Vercel `satus` project:
   - `SUPABASE_URL` + `VITE_SUPABASE_URL` = `https://xbnrjwzryuonuinzuomk.supabase.co`
   - `SUPABASE_PUBLISHABLE_KEY` + `VITE_SUPABASE_PUBLISHABLE_KEY` =
     `sb_publishable_lQTJrK09yoRsg2vHynu38g_Uh3qUYUq`
   - `SUPABASE_SERVICE_ROLE_KEY` — from the new project's dashboard
     (Settings → API). Also store it in the DB vault so the queue cron can
     authenticate:
     `select vault.create_secret('<key>', 'email_queue_service_role_key');`
   - `STRIPE_SANDBOX_SECRET_KEY` / `STRIPE_LIVE_SECRET_KEY` — from the
     Stripe dashboard (acct_1TFI5yGTWx4Bh4zb).
   - `PAYMENTS_SANDBOX_WEBHOOK_SECRET` / `PAYMENTS_LIVE_WEBHOOK_SECRET` —
     from new Stripe webhook endpoints pointed at
     `https://satus.sh/api/public/payments/webhook`.
   - `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET` (create a Resend webhook →
     `https://satus.sh/lovable/email/suppression`, events: bounced,
     complained), `VITE_PAYMENTS_CLIENT_TOKEN` (real `pk_` publishable key),
     `PUBLIC_SITE_URL=https://satus.sh`, `ALERTS_TO_EMAIL`.
2. **Stripe** — confirm the three price lookup keys (`satus_pro_monthly`,
   `satus_pro_yearly`, `satus_team_seat_monthly`) resolve in live + sandbox
   mode now that calls bypass the gateway.
3. **DNS cutover** — add `satus.sh` + `www` to the Vercel project and point
   DNS at Vercel (currently Lovable's edge at 185.158.133.1). Released CLIs
   keep working: the license-verify URL is unchanged.
4. **Post-cutover smoke test** — checkout (sandbox), license verify, an
   e2e-health run, one transactional email through the queue.
5. **Decommission** — unpublish the Lovable deployment; keep the Lovable
   project as archive. Future edits happen via Claude on this repo.

## 4. Notes / follow-ups

- `@lovable.dev/vite-tanstack-config` (build tooling) is still used — it's a
  public npm package with no service dependency, so it keeps working without
  Lovable. Replacing it with plain Vite config is optional hardening.
- The e2e-health daily cron was never actually scheduled on the live DB
  (last cron-triggered run: 2026-06-12); schedule it on the new project
  post-cutover if we want daily checks.
- Ongoing ops previously done inside Lovable (weekly blog posts, accuracy
  audits, e2e health) move to this Claude thread.
