/**
 * Test config, deliberately separate from `vite.config.ts`.
 *
 * The app config builds the site: TanStack Start's plugin plus the Nitro
 * preset that emits `.output/`. Loaded under Vitest those plugins fail
 * outright — Nitro's Vite hook expects a build context Vitest does not
 * create. None of it is needed to exercise plain server-side modules, so
 * this config brings up nothing but the `@/` alias and a node environment.
 *
 * Scope is narrow on purpose: unit tests for server logic that has no DOM
 * and no network. Route handlers and React components are not covered here.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    /* packages/cli runs its own Vitest against its own config. */
    exclude: ["node_modules/**", "packages/**", ".output/**"],
  },
});
