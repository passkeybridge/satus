/**
 * License delivery email.
 *
 * Sent after a successful Stripe checkout. Carries the license key the
 * customer needs to activate the CLI, plus a contact address where
 * they manage billing via Stripe Customer Portal.
 *
 * Visual system: Swiss-Red on paper. Mono headings (web-safe stack since
 * mail clients drop @font-face), hairline rules, no rounded corners.
 * Body background is white per platform rule.
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
const SITE_URL = 'https://satus.sh'

interface LicenseDeliveryProps {
  /** The license key to deliver. */
  licenseKey?: string
  /** Human-readable plan label, e.g. "Pro · monthly". */
  planLabel?: string
  /** ISO timestamp of next renewal, formatted as YYYY-MM-DD. */
  renewsOn?: string
}

const LicenseDeliveryEmail = ({
  licenseKey = 'satus_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  planLabel = 'Pro · monthly',
  renewsOn,
}: LicenseDeliveryProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} license key.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Wordmark, matching the site header: "satus" + signal-red period.
         *  The mark anchors the email; the §OK status chip sits below it as a
         *  spec-style label. Rendered with inline styles because mail clients
         *  drop classes and many drop @font-face. */}
        <Section style={brandRow}>
          <Text style={wordmark}>
            <span>satus</span>
            <span style={wordmarkDot}>.</span>
          </Text>
        </Section>

        <Text style={label}>
          <span style={signal}>§OK</span>
          <span style={pipe}> | </span>
          <span>License issued</span>
        </Text>

        <Heading as="h1" style={h1}>
          your subscription is active.
        </Heading>

        <Hr style={hr} />


        <Text style={paragraph}>
          Thank you for subscribing. Below is the license key required to
          activate the satus CLI. Keep it private; one key, one workstation.
        </Text>

        <Section style={keyBox}>
          <Text style={keyLabel}>LICENSE KEY</Text>
          <Text style={keyValue}>{licenseKey}</Text>
        </Section>

        <Section style={metaTable}>
          <Text style={metaRow}>
            <span style={metaKey}>plan</span>
            <span style={metaValue}>{planLabel}</span>
          </Text>
          {renewsOn && (
            <Text style={metaRow}>
              <span style={metaKey}>renews</span>
              <span style={metaValue}>{renewsOn}</span>
            </Text>
          )}
        </Section>

        <Heading as="h2" style={h2}>
          activate the CLI
        </Heading>
        <Text style={paragraph}>
          Install the binary, then export the key as an environment variable:
        </Text>
        <Section style={codeBlock}>
          <Text style={codeLine}>npm i -g satus-cli</Text>
          <Text style={codeLine}>export SATUS_LICENSE_KEY={'"'}{licenseKey}{'"'}</Text>
          <Text style={codeLine}>satus init</Text>
        </Section>

        <Heading as="h2" style={h2}>
          manage billing
        </Heading>
        <Text style={paragraph}>
          To change payment method, download invoices, switch plan, or
          cancel, reply to this email or write to{' '}
          <Link href="mailto:support@satus.sh" style={linkStyle}>
            support@satus.sh
          </Link>
          . We route you to the Stripe billing portal for this subscription.
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
  component: LicenseDeliveryEmail,
  subject: 'Your satus.sh license key',
  displayName: 'License delivery',
  previewData: {
    licenseKey: 'satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3',
    planLabel: 'Pro · monthly',
    renewsOn: '2026-06-26',
  },
} satisfies TemplateEntry

/* ----- styles: web-safe stack only, mail clients strip @font-face ----- */

const monoStack =
  '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
const sansStack =
  '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

const main = {
  backgroundColor: '#ffffff',
  fontFamily: sansStack,
  padding: '24px 0',
}
const container = {
  maxWidth: '640px',
  margin: '0 auto',
  padding: '32px 28px',
  backgroundColor: '#fafaf7',
  border: '1px solid #e5e5e0',
}
/* Wordmark row: matches the site header. The dot is the only saturated
 * color in the entire email until you hit the §OK chip, which gives the
 * mark presence without ever feeling like marketing chrome. */
const brandRow = {
  margin: '0 0 28px',
  paddingBottom: '20px',
  borderBottom: '1px solid #e5e5e0',
}
const wordmark = {
  fontFamily: monoStack,
  fontSize: '20px',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  color: '#0a0a0a',
  margin: 0,
  lineHeight: 1,
}
const wordmarkDot = {
  color: '#dc2626',
}
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
const hr = {
  border: 'none',
  borderTop: '1px solid #0a0a0a',
  margin: '20px 0',
}
const paragraph = {
  fontFamily: sansStack,
  fontSize: '14px',
  lineHeight: 1.65,
  color: '#0a0a0a',
  margin: '0 0 16px',
}
const keyBox = {
  backgroundColor: '#0a0a0a',
  color: '#fafaf7',
  padding: '16px 18px',
  margin: '20px 0',
  border: '1px solid #0a0a0a',
}
const keyLabel = {
  fontFamily: monoStack,
  fontSize: '10px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#dc2626',
  margin: '0 0 6px',
}
const keyValue = {
  fontFamily: monoStack,
  fontSize: '14px',
  color: '#fafaf7',
  wordBreak: 'break-all' as const,
  margin: 0,
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
const codeBlock = {
  backgroundColor: '#0a0a0a',
  color: '#fafaf7',
  padding: '14px 16px',
  margin: '12px 0 20px',
}
const codeLine = {
  fontFamily: monoStack,
  fontSize: '12.5px',
  color: '#fafaf7',
  margin: '2px 0',
  wordBreak: 'break-all' as const,
}
const linkStyle = {
  color: '#dc2626',
  fontFamily: monoStack,
  fontSize: '13px',
  textDecoration: 'none',
}
const footer = {
  fontFamily: monoStack,
  fontSize: '11px',
  color: '#525252',
  margin: '24px 0 0',
}
const footerLink = { color: '#525252', textDecoration: 'underline' }
