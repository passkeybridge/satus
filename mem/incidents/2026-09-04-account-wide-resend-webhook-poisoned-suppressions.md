# Another product's bounces were suppressing satus addresses

**Date found:** 2026-09-04 (started 2026-08-06)
**Impact:** none realised. Silent loss of license delivery to 79 addresses
had any of them bought.

## What happened

`https://satus.sh/api/internal/email/suppression` is registered as a Resend
webhook (`ce189c42`, created 2026-08-05) for `email.bounced` and
`email.complained`.

**Resend webhooks are scoped to the account, not to a sending domain.** This
Resend account carries nine verified domains across at least four unrelated
products — `mail.satus.sh`, `outreach.passkeybridge.io`,
`updates.passkeybridge.io`, `reply.passkeybridge.io`, `open.booked.co`,
`mail.booked.co`, `news.petsupplies.co`, `notify.petsupplies.co`,
`alerts.trapicons.com`. The handler wrote every one of those bounces into
satus's `suppressed_emails` and `email_send_log` without checking who sent
the message.

## Why it matters

`send.ts` enforces suppressions fail-closed, and a `bounce` blocks *every*
category including transactional. Only an `unsubscribe` is bypassed, and
only for templates marked transactional. So a cold-outreach bounce belonging
to a different product silently blocks a satus license key — the same
"paid and locked out" failure mode recorded in the 2026-08-26 incident.

## Numbers at the time of the find

- `email_send_log`: 80 rows, `template_name = 'system'`, all `bounced`,
  2026-08-06 03:14 through 2026-09-03 17:00. First row lands 15 hours after
  the webhook was created.
- `suppressed_emails`: 79 rows, all `reason = 'bounce'`, same window.
- satus's own templates are unaffected and idle: `license-delivery` 10 rows
  (last 2026-08-05), `subscription-expired` 8 rows (last 2026-07-10).
- Resend, 2026-08-06 → 09-04, by domain: `mail.satus.sh` sent **5**,
  delivered 4, **0 permanent bounces**. `outreach.passkeybridge.io` sent 730
  with 22 permanent; `open.booked.co` sent 673 with 18.

That last line is the one to remember. satus's own deliverability was never
the problem — its sending domain is clean. The damage was inbound, into a
table satus reads before every send.

## Fix

`isOurSender()` gates the write on `event.data.from` ending in
`@mail.satus.sh`; anything else is acknowledged with 200 (so Resend does not
retry) and logged. It fails **open** — an absent or unparseable `from` is
treated as not ours — because skipping a real suppression costs one email to
a dead mailbox, while a wrong suppression costs a customer their license
key.

All three satus senders match the filter: `noreply@mail.satus.sh`
(transactional), `alerts@mail.satus.sh` (webhook alerts and e2e health).
Note `ALERTS_FROM_EMAIL` can override the alerts address; if it is ever
pointed off-domain, its bounces stop suppressing, which is the desired
direction anyway.

The other products are unaffected by the filter — booked.co and the shield
stack already run their own suppression webhooks
(`handle-email-suppression`, `shield-outreach-webhook`) against their own
Supabase projects. satus's endpoint was redundant for them.

## Not done

The 79 existing rows were left in place. Deleting suppression data is not
reversible and some of those addresses may be genuinely dead mailboxes, so
it is the owner's call rather than a cleanup to run unattended. The rows are
identifiable: `suppressed_emails` where `metadata->>'source' = 'resend'`
joined against `email_send_log` rows with `template_name = 'system'`.
