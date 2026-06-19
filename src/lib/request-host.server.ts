/**
 * Server-only helper: read the inbound request host so the root route can
 * mark preview/staging origins as noindex. Lives in a `.server.ts` module
 * (filename-blocked from client bundles) so the import-protection plugin
 * allows the `@tanstack/react-start/server` dependency without flagging
 * the root route as a server-only importer.
 */
import { getRequestHost } from "@tanstack/react-start/server";

export function readRequestHost(): string {
  try {
    return getRequestHost({ xForwardedHost: true });
  } catch {
    // No request in scope (e.g., prerender or unexpected call site).
    return "";
  }
}
