/**
 * Subscription expired email.
 *
 * Sent when a subscription is deleted in Stripe (period_end passed on a
 * canceled sub, or final dunning failure). The license key now returns
 * valid:false from /api/public/license/verify; this email tells the user
 * why their CLI stopped working and how to resubscribe.
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

interface SubscriptionExpiredProps {
  planLabel?: string
  /** Deep link that opens a Stripe billing portal session for this key. */
  manageUrl?: string
}

const SubscriptionExpiredEmail = ({
  planLabel = 'Pro · monthly',
  manageUrl,
}: SubscriptionExpiredProps) => (

  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} subscription has ended.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandRow}>
          <Text style={wordmark}>
            <span>satus</span>
            <span style={wordmarkDot}>.</span>
          </Text>
        </Section>

        <Text style={label}>
          <span style={signal}>§EXPIRED</span>
          <span style={pipe}> | </span>
          <span>Access ended</span>
        </Text>

        <Heading as="h1" style={h1}>
          your access has ended.
        </Heading>

        <Hr style={hr} />

        <Text style={paragraph}>
          Your {SITE_NAME} subscription has reached the end of its paid
          period. The satus CLI will report your license as invalid on its
          next verification and any cached verdict will expire within 24
          hours.
        </Text>

        <Section style={metaTable}>
          <Text style={metaRow}>
            <span style={metaKey}>previous plan</span>
            <span style={metaValue}>{planLabel}</span>
          </Text>
          <Text style={metaRow}>
            <span style={metaKey}>status</span>
            <span style={metaValue}>expired</span>
          </Text>
        </Section>

        <Heading as="h2" style={h2}>
          resubscribe
        </Heading>
        <Text style={paragraph}>
          You can start a new subscription at any time at{' '}
          <Link href="https://satus.sh/pricing" style={linkStyle}>
            satus.sh/pricing
          </Link>
          . If you believe this is an error, reply to this email or write to{' '}
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
  component: SubscriptionExpiredEmail,
  subject: 'Your satus.sh subscription has ended',
  displayName: 'Subscription expired',
  previewData: { planLabel: 'Pro · monthly' },
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
