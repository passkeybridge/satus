# House voice

How satus.sh prose actually reads, measured from the 44 published posts
(66,969 words) plus the site routes — not invented. `scripts/validate-language.mjs`
enforces the mechanical half of this at build time; the rest is judgement.

## The rule behind the rules

Every claim carries its evidence, and the evidence is specific. A number, a
file path, a transcript, a commit SHA. Posts routinely say we were wrong,
name the version it shipped in, and link the fix. Nothing is sold.

If a sentence would survive being wrong without anyone noticing, it is not
carrying its weight.

## Measured markers

| marker | count in 66,969 words | reading |
|---|---|---|
| exclamation marks | 9 | effectively never |
| `obviously` / `clearly` | 3 | never tell the reader it is obvious |
| `I` | 10 | first-person singular is not the voice |
| contractions (`n't`) | 42 | rare; prefer "it is", "does not" |
| `simply` / `just` | 26 | sparse — usually deletable |
| rhetorical `?` | 49 | roughly one per 1,400 words |
| em dashes | 172 | used freely, about one per 390 words |
| `we` | 440 | the default subject |
| `you` | 304 | the reader, when giving instructions |

Em dashes are house style, not a tell. Do not strip them.

## Openings

Open on a fact. No throat-clearing, no "in this post", no summary of what
is about to be argued.

- "`@passkeybridge/satus@0.3.8` is on npm. It adds one feature, and the
  feature is one our documentation has claimed we already had."
- "[faker.js](https://fakerjs.dev/) is a good library. It is also the wrong
  tool for most of the work people reach for it to do."
- "The hardest part of maintaining a schema-aware tool is not fixing bugs.
  It is reproducing them."

Release notes always open on the literal npm line.

## Headings

Concrete and specific, naming the thing: "Lie #3: the NOT VALID
constraint", "Bug 2: `date_trunc('day', ts)` in the wrong timezone", "Not in
this release". Never a teaser, never a question standing in for a claim.

## The constructions to avoid

The gate catches these. They are LLM tells: rhythm standing in for content.

- **Hollow antithesis.** "It wasn't about X, it was about Y." "Not merely
  imprecise, but wrong." The shape promises a reveal and delivers a
  restatement.
- **Teaser headings.** "What the receipts actually say." "Here's the
  thing."
- **Throat-clearing.** "Let's dive in", "let's unpack", "at the end of the
  day", "make no mistake", "it's worth noting", "buckle up".
- **Marketing adjectives.** seamless, robust, game-changing, cutting-edge,
  best-in-class, supercharge, unlock, elevate, delve, tapestry, testament
  to, ever-evolving.

**A real contrast is not the banned pattern.** "The hardest part is not
fixing bugs. It is reproducing them." earns its shape because both halves
carry information and the second is the post's subject. The test: delete
the first half. If nothing is lost, it was decoration.

## When the gate is wrong

`scripts/validate-language.mjs` prints `file:line` and the phrase. Reword
it. If a flagged phrase is genuinely the right words — a quotation, or a
title callback like "The real question is what the column means" on a post
titled *NULL vs NOT NULL is not the question* — put
`<!-- voice-ok: why -->` on the line before. The escape is deliberate and
rare; there is exactly one in the corpus today.

Do not loosen the pattern list to make a build pass.
