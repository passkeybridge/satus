import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
import { template as licenseDelivery } from './license-delivery'
import { template as subscriptionCanceled } from './subscription-canceled'
import { template as subscriptionExpired } from './subscription-expired'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'license-delivery': licenseDelivery,
  'subscription-canceled': subscriptionCanceled,
  'subscription-expired': subscriptionExpired,
}
