---
slug: introducing-the-log
title: Introducing the satus log
description: A plain-text changelog and field notebook for schema-aware seed data, written for engineers who read RFCs for fun.
date: 2026-05-26
author: satus.sh
tags: [meta, postgres]
draft: false
---

This is where we publish post-mortems on real production schemas, notes on
Postgres internals that surprised us, and changelog entries for the satus
CLI. No growth-hacked headlines, no listicles, no "Top 10 Reasons" posts.

## What you can expect

- **Schema reports.** We see hundreds of `CREATE TABLE` statements a week.
  When a pattern keeps biting people (cyclic FKs, partitioned tables with
  RLS, JSONB columns that are secretly relational), we'll write it up.
- **Profile deep-dives.** Each official profile (medical-booking,
  e-commerce, saas-subscriptions) gets a write-up explaining the heuristics
  it encodes and the trade-offs we made.
- **CLI changelogs.** Every release ships with a post explaining what
  changed and why, in prose, not just a git log.
- **Field notes.** Edge cases from support tickets, anonymized and
  generalized into something useful.

## What you will not see

No SEO farm posts. No AI-generated filler. No "What is a foreign key?"
content aimed at search-engine bots. If it isn't useful to someone who
already ships Postgres for a living, we won't publish it.

## Subscribe

The full feed is at [/blog/rss.xml](/blog/rss.xml). Add it to whichever
reader you already use. There is no email newsletter and there are no
tracking pixels.

—the satus.sh team
