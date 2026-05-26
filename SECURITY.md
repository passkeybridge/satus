# Security Policy

We take the security of satus.sh and its users seriously. This document
describes how to report vulnerabilities and what to expect in response.

## Reporting a vulnerability

Email **support@satus.sh** with the subject line `SECURITY:` followed by
a short summary. Until a dedicated `security@` mailbox is published per
RFC 9116, `support@` is the canonical address and is monitored by a
human on every business day.

Please include:

- A description of the issue and its impact.
- Reproduction steps, proof-of-concept, or a minimal failing schema.
- The affected version (`satus --version`) and runtime (Node version, OS).
- Your preferred name and contact for credit, or a request to remain
  anonymous.

Please do **not** open public GitHub issues, post to social media, or
share details with third parties before we have had a chance to
respond.

## What to expect

- Acknowledgement within **2 business days**.
- A triage decision (accepted, needs more info, not a vulnerability)
  within **7 business days**.
- A coordinated disclosure timeline agreed with the reporter. Default
  embargo is **90 days** from triage, shortened if a fix ships sooner.
- Credit in the release notes for the fix, unless anonymity is
  requested.

## Scope

In scope:

- The satus CLI (`satus` package on npm and Homebrew).
- The satus.sh marketing site and license-verification API
  (`/api/public/license/verify`, `/api/public/payments/webhook`).
- License-delivery emails sent from PasskeyBridge LLC infrastructure.

Out of scope:

- Issues that require physical access to a user's machine.
- Denial-of-service via deliberate misuse of the user's own LLM API
  key quota.
- Social engineering of PasskeyBridge LLC staff or customers.
- Findings on third-party services (Stripe, the user's chosen LLM
  provider, the user's database) — please report those to the
  respective vendors.

## Safe harbor

We will not pursue legal action against researchers who:

- Make a good-faith effort to comply with this policy.
- Avoid privacy violations, data destruction, and service degradation.
- Give us reasonable time to remediate before public disclosure.

Thank you for helping keep satus.sh users safe.
