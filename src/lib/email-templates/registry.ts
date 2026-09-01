import type { ComponentType } from "react";

export interface TemplateEntry {
  component: ComponentType<any>;
  subject: string | ((data: Record<string, any>) => string);
  displayName?: string;
  previewData?: Record<string, any>;
  /** Fixed recipient—overrides caller-provided recipientEmail when set. */
  to?: string;
  /**
   * 'transactional': service email the recipient's account requires
   * (license keys, billing lifecycle). Still delivered to an address whose
   * only suppression is an 'unsubscribe' — that records a marketing
   * opt-out, and CAN-SPAM exempts transactional mail from it. Bounce and
   * complaint suppressions block every category. Unset means 'marketing'
   * (blocked by any suppression), so a template must opt in explicitly to
   * bypass an unsubscribe.
   */
  category?: "transactional" | "marketing";
}

/**
 * Template registry—maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
import { template as licenseDelivery } from "./license-delivery";
import { template as subscriptionCanceled } from "./subscription-canceled";
import { template as subscriptionExpired } from "./subscription-expired";

export const TEMPLATES: Record<string, TemplateEntry> = {
  "license-delivery": licenseDelivery,
  "subscription-canceled": subscriptionCanceled,
  "subscription-expired": subscriptionExpired,
};
