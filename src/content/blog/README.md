# Blog content

Each post is a single `.md` file in this directory. Filename does not affect
the URL; the slug comes from frontmatter.

## Frontmatter contract

```yaml
---
slug: my-post                       # required, kebab-case, becomes /blog/<slug>
title: Title of the post            # required
description: One-sentence dek.      # required, 140–160 chars for SEO
date: 2026-05-26                    # required, ISO 8601
author: satus.sh                    # optional, defaults to "satus.sh"
tags: [postgres, seeding]           # optional
draft: false                        # optional, true hides post from index, RSS, sitemap
ogImage: /og-image.png              # optional, defaults to site og
---
```

The body is standard CommonMark, parsed by `marked`. Inline code uses
backticks; fenced code blocks render in JetBrains Mono.

Posts are bundled into the Worker at build time via `import.meta.glob`.
No filesystem reads at runtime, Cloudflare Workers safe.
