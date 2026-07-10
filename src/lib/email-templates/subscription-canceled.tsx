/**
 * Subscription canceled email.
 *
 * Sent when a customer cancels (cancel_at_period_end flips to true). The
 * license remains valid until `accessEndsOn`; this email exists so the
 * customer knows the exact end-of-access date and how to reactivate.
 *
 * Visual system mirrors license-delivery: Swiss-Red on paper.
 */

import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'satus.sh'

interface SubscriptionCanceledProps {
  planLabel?: string
  /** ISO date (YYYY-MM-DD) when paid access ends. */
  accessEndsOn?: string
  /** Deep link that opens a Stripe billing portal session for this key. */
  manageUrl?: string
}

const SubscriptionCanceledEmail = ({
  planLabel = 'Pro · monthly',
  accessEndsOn,
  manageUrl,
}: SubscriptionCanceledProps) => (

  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} subscription has been canceled.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandRow}>
          <Text style={wordmark}>
            <span>satus</span>
            <span style={wordmarkDot}>.</span>
          </Text>
        </Section>

        <Text style={label}>
          <span style={signal}>§CANCELED</span>
          <span style={pipe}> | </span>
          <span>Subscription canceled</span>
        </Text>

        <Heading as="h1" style={h1}>
          your subscription is canceled.
        </Heading>

        <Hr style={hr} />

        <Text style={paragraph}>
          We have processed your cancellation. Your license key will continue
          to work until the end of the current billing period; you will not
          be charged again.
        </Text>

        <Section style={metaTable}>
          <Text style={metaRow}>
            <span style={metaKey}>plan</span>
            <span style={metaValue}>{planLabel}</span>
          </Text>
          {accessEndsOn && (
            <Text style={metaRow}>
              <span style={metaKey}>access ends</span>
              <span style={metaValue}>{accessEndsOn}</span>
            </Text>
          )}
        </Section>

        <Heading as="h2" style={h2}>
          manage subscription
        </Heading>
        <Text style={paragraph}>
          You can reactivate, change plan, or update payment details in the
          Stripe billing portal for this subscription
          {accessEndsOn ? ` before ${accessEndsOn}` : ''}:
        </Text>
        {manageUrl && (
          <Section style={{ margin: '4px 0 16px' }}>
            <Link href={manageUrl} style={linkStyle}>
              → manage subscription
            </Link>
          </Section>
        )}
        <Text style={paragraph}>
          Or reply to this email or write to{' '}
          <Link href="mailto:support@satus.sh" style={linkStyle}>
            support@satus.sh
          </Link>
          .
        </Text>


        <Hr style={hr} />

        <Text style={footer}>
          {SITE_NAME} · A{' '}
          <Link href="https://passkeybridge.io" style={footerLink}>
            PasskeyBridge LLC
          </Link>{' '}
          service ·{' '}
          <Link href={`mailto:support@satus.sh`} style={footerLink}>
            support@satus.sh
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SubscriptionCanceledEmail,
  subject: 'Your satus.sh subscription has been canceled',
  displayName: 'Subscription canceled',
  previewData: {
    planLabel: 'Pro · monthly',
    accessEndsOn: '2026-06-26',
    manageUrl:
      'https://satus.sh/api/public/billing/portal?key=satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3',
  },
} satisfies TemplateEntry


/* ----- styles (kept in sync with license-delivery.tsx) ----- */

const monoStack =
  '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
const sansStack =
  '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

const main = { backgroundColor: '#ffffff', fontFamily: sansStack, padding: '24px 0' }
const container = {
  maxWidth: '640px',
  margin: '0 auto',
  padding: '32px 28px',
  backgroundColor: '#fafaf7',
  border: '1px solid #e5e5e0',
}
const brandRow = { margin: '0 0 28px', paddingBottom: '20px', borderBottom: '1px solid #e5e5e0' }
const wordmark = {
  fontFamily: monoStack,
  fontSize: '20px',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  color: '#0a0a0a',
  margin: 0,
  lineHeight: 1,
}
const wordmarkDot = { color: '#dc2626' }
const label = {
  fontFamily: monoStack,
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#525252',
  margin: '0 0 20px',
}
const signal = { color: '#dc2626' }
const pipe = { color: '#e5e5e0', margin: '0 8px' }
const h1 = {
  fontFamily: monoStack,
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: 1.2,
  color: '#0a0a0a',
  margin: '0 0 16px',
}
const h2 = {
  fontFamily: monoStack,
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'lowercase' as const,
  color: '#0a0a0a',
  margin: '32px 0 12px',
}
const hr = { border: 'none', borderTop: '1px solid #0a0a0a', margin: '20px 0' }
const paragraph = {
  fontFamily: sansStack,
  fontSize: '14px',
  lineHeight: 1.65,
  color: '#0a0a0a',
  margin: '0 0 16px',
}
const metaTable = {
  borderTop: '1px solid #e5e5e0',
  borderBottom: '1px solid #e5e5e0',
  padding: '12px 0',
  margin: '20px 0 28px',
}
const metaRow = {
  fontFamily: monoStack,
  fontSize: '12px',
  color: '#0a0a0a',
  margin: '4px 0',
  display: 'flex',
  justifyContent: 'space-between' as const,
}
const metaKey = { color: '#525252' }
const metaValue = { color: '#0a0a0a' }
const linkStyle = {
  color: '#dc2626',
  fontFamily: monoStack,
  fontSize: '13px',
  textDecoration: 'none',
}
const footer = { fontFamily: monoStack, fontSize: '11px', color: '#525252', margin: '24px 0 0' }
const footerLink = { color: '#525252', textDecoration: 'underline' }
