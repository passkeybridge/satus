---
slug: what-a-bad-profile-looks-like
title: "What a bad profile looks like"
description: Three profile drafts we threw away before we shipped saas, ecommerce, and b2b—too many knobs, distributions that did not compose, and vertical assumptions leaking into shared code.
date: 2026-07-24
author: satus.sh
tags: [profile, methodology, anti-pattern]
draft: false
---

The [three profiles](/profiles) satus ships today, `saas`, `ecommerce`, and `b2b`, are the survivors of a longer list. Before them we drafted profiles for medical booking, marketplace logistics, and a "generic" catch-all, and threw all three away. This post is a retrospective on why. If you are designing your own profile abstraction, for seed data or for any generator that has to sound like a domain, these are the shapes to avoid.

Reference material: the current profiles live as short prose blocks in `packages/cli/src/generate/profiles.ts` and are documented at [/profiles](/profiles). Two earlier posts, [When Faker is the wrong answer](/blog/when-faker-is-the-wrong-answer) and [Designing the medical booking profile](/blog/medical-booking-profile), cover the case for prose-shaped profiles and the design-phase sketch we did not ship. This post is the counterpart: what the discarded drafts got wrong.

## Anti-pattern 1: too many knobs

The first draft of the medical-booking profile had a configuration object. It let the user pass a locale, a specialty mix, an appointment-density curve, a no-show rate, and a payer mix. The intent was flexibility. The effect was that no one could pick a set of values that composed into a coherent clinic.

The problem is that these knobs are not independent. A US-based dermatology practice has a different payer mix from a UK NHS clinic, which has a different appointment-density curve from a mental-health telehealth startup. Exposing them as orthogonal parameters implied a product surface that would silently generate incoherent data whenever the user's picks disagreed with each other. And the failure mode was invisible: the generated rows still satisfied every foreign key and check constraint the user's schema declared. They just described a clinic that could not exist.

The fix, and the shape of every profile we shipped, is that a profile is a single opinionated prose block. It picks one internally consistent world and describes it. If the user wants a different world, that is a different profile, not a different flag on the same profile. `saas`, `ecommerce`, and `b2b` are three worlds, not one profile with three modes.

## Anti-pattern 2: distributions that do not compose

The second draft, an early marketplace-logistics profile, sampled fields independently. Order status was drawn from a categorical distribution (`pending`, `in_transit`, `delivered`, `cancelled`). `created_at` was drawn from a uniform distribution over the last 12 months. `delivered_at` was drawn from a uniform distribution over the last 6 months. Each column, in isolation, looked plausible.

The composite rows did not. Around a quarter of the `delivered` rows had `delivered_at` timestamps earlier than their `created_at`. Around a fifth of the `cancelled` rows had a non-null `delivered_at`. `in_transit` rows aged three hundred days sat next to `pending` rows created two hours ago. Nothing was type-invalid. Nothing violated a foreign key. The rows were still nonsense, because status, creation time, and delivery time are not independent columns; they are a joint state machine, and drawing from their marginals throws the joint away.

The lesson is that a profile's distributions have to be phrased at the row level, not the column level. The [saas subscriptions profile](/blog/saas-subscriptions-profile) writeup goes into detail on how status legality is enforced for billing rows; the same principle applies to any timeline-shaped table. When you sketch a profile, describe the row, not the columns.

## Anti-pattern 3: vertical assumptions in shared utilities

The third failure was structural, not statistical. The "generic" profile we sketched relied on shared helpers for names, addresses, prices, and dates. Those helpers, written for the first ecommerce sketch, quietly assumed English names, US addresses, and USD prices with two-decimal cents. When we tried to pull them into the medical-booking draft and then again into the marketplace draft, every profile started to sound like a slightly reskinned US ecommerce store.

The vertical assumptions had not been declared as assumptions; they were hard-coded into utilities that presented themselves as neutral. A profile can only be as domain-specific as its lowest-level helpers allow it to be, and a helper that only knows how to produce `$19.99` will drag every profile that touches it toward the same tone.

The fix was to move the value-choice logic into the profile prose itself, and let the LLM handle locale, currency, and naming conventions per profile. The [ecommerce profile](/blog/ecommerce-profile) post shows the current shape: the profile block explicitly enumerates the countries, price ranges, and cent-suffix conventions it wants, so nothing has to be assumed by a shared utility further down the stack. There are still shared helpers, but they are strictly structural (topological sort, FK closure, batch inserts) and know nothing about domains.

## What survived

The three shipped profiles are the ones that passed all three tests:

- Each is a single opinionated prose block, not a config object with modes.
- Each describes distributions at the row level, so composite rows stay coherent even under random sampling within each profile's stated ranges.
- Each carries its own vocabulary of names, prices, and dates in the prose, so shared code stays strictly structural.

If you are adding a fourth, the same three checks apply. If a candidate profile wants a config object, splits its distributions across columns, or leans on a shared helper to pick a name or a price, it is going to compose badly with the schema the user hands it. Cut it back to a single prose block that describes one internally consistent world, or split it into two profiles that each describe one.

## References

- [/profiles](/profiles)—the three shipped profiles, verbatim from `packages/cli/src/generate/profiles.ts`.
- [When Faker is the wrong answer](/blog/when-faker-is-the-wrong-answer)—why prose-shaped profiles beat column-by-column value generators.
- [Designing the medical booking profile](/blog/medical-booking-profile)—the design-phase sketch referenced above; not shipped in the current CLI.
- [Designing the ecommerce profile](/blog/ecommerce-profile)—the shipped `ecommerce` profile design writeup.
- [Designing the SaaS subscriptions profile](/blog/saas-subscriptions-profile)—row-level status legality for billing tables.
