import { defineConfig } from 'tsup'

// v0.2: ship a minified, source-map-free binary. The CLI is invoked from a
// shebang and never debugged in-place by end users; the maps were padding
// the tarball without serving anyone. Minification with esbuild's defaults
// is safe for Node 20+ targets.
export default defineConfig({
  entry: { cli: 'src/cli.ts' },
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  clean: true,
  minify: true,
  sourcemap: false,
  shims: true,
  banner: { js: '#!/usr/bin/env node' },
})
