import { defineConfig } from 'vitest/config'

// Standalone vitest config. The repo root runs TanStack Start under Vite,
// which fights to inject its router plugin into any vitest invocation it
// can see. The CLI is a plain Node package; this config strips Vite back
// to defaults so `npm test` inside packages/cli stays hermetic.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
