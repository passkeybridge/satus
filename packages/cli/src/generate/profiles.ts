/**
 * Reference profiles. Each one is a short, high-signal hint the model uses
 * to choose plausible names, domains, prices, and tone for generated rows.
 *
 * We keep these as prose blocks rather than structured fields because the
 * model is best at "act like X" instructions, and because expanding the
 * profile catalog is the single highest-leverage product knob in v0.1.
 */
export type ProfileName = 'saas' | 'ecommerce' | 'b2b'

export const PROFILES: Record<ProfileName, string> = {
  saas: [
    'You are generating seed data for a B2B SaaS application.',
    'Use realistic startup/company names (mix of single-word brands and "X-ly" / "Get-X" style),',
    'workplace emails (alice@acme.com, not gmail), plausible job titles (Engineer, PM, Designer),',
    'and feature-flag / billing-plan style enums when the column name suggests it (free, pro, team).',
    'Dates should cluster in the last 18 months; subscriptions distributed across plans.',
  ].join(' '),
  ecommerce: [
    'You are generating seed data for a consumer e-commerce store.',
    'Use realistic product names across apparel, home goods, and accessories;',
    'prices between 9.99 and 299.99 with cents .99 / .49 / .00;',
    'customer names and shipping addresses from US/UK/DE/FR/JP;',
    'order statuses biased toward fulfilled, with a long tail of pending and refunded.',
  ].join(' '),
  b2b: [
    'You are generating seed data for a B2B service or marketplace application.',
    'Use realistic mid-market company names, named accounts with renewal cycles,',
    'contract values $5,000–$250,000, multi-seat licensing, and procurement-style metadata',
    '(PO numbers, NET-30 terms, MSA dates). Avoid consumer language entirely.',
  ].join(' '),
}

export function profilePrompt(name: ProfileName): string {
  return PROFILES[name]
}
