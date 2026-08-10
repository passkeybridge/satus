/**
 * Anthropic provider. Calls the Messages API directly with `fetch`
 * (no SDK dep). Override the endpoint with `ANTHROPIC_BASE_URL` to
 * point at a proxy or test server.
 *
 * Structured output: Anthropic does not support OpenAI-style
 * `response_format: json_schema`. We use **tool-use forcing**:
 *   - Register a single tool whose `input_schema` is our row schema.
 *   - Set `tool_choice: { type: 'tool', name: 'emit_rows' }` so the
 *     model is required to emit a `tool_use` content block.
 *   - The first `tool_use` block's `input` is the already-parsed object;
 *     no JSON string parsing on our side.
 *
 * Cost tracking: per-response `usage.input_tokens` / `usage.output_tokens`
 * is converted to a USD estimate with a small built-in price table. The
 * estimate drives the `--max-cost` guardrail; it is not accounting.
 */
import type { Provider, ProviderRequest, ProviderResponse } from './types.js'

/**
 * Anthropic's official SDK convention for ANTHROPIC_BASE_URL excludes the
 * /v1 suffix (the SDK appends it), and users often have the var exported
 * for other tools. Accept either form: append /v1 unless the override
 * already ends in a version segment. Without this, a bare
 * `https://api.anthropic.com` produced an unhelpful empty-body 404.
 */
function normalizeBase(raw: string | undefined): string {
  if (!raw) return 'https://api.anthropic.com/v1'
  const trimmed = raw.replace(/\/+$/, '')
  return /\/v\d+$/.test(trimmed) ? trimmed : `${trimmed}/v1`
}

const DEFAULT_BASE = normalizeBase(process.env.ANTHROPIC_BASE_URL)

/**
 * Pinned API version. This is the long-stable Messages API surface that
 * has carried Claude 3, 3.5, 4, and 4.5 without breaking changes. Pin
 * rather than float so an unannounced default flip can't break us.
 */
const ANTHROPIC_VERSION = '2023-06-01'

/**
 * The tool name the model is forced to call. Stable on our side; only
 * appears in the request body, never in user-facing output.
 */
const TOOL_NAME = 'emit_rows'

/**
 * USD per million tokens, keyed by model-id prefix. Last verified
 * 2026-08-10 against Anthropic's published per-MTok rates.
 *
 * Empty from v0.3.0 through v0.3.6: every Anthropic run fell through to
 * `FALLBACK_PRICE`, which was 3x the real rate for the default model
 * (`claude-haiku-4-5`). Costs were over-reported by exactly 3x, so
 * `--max-cost` aborted runs that were nowhere near the cap.
 *
 * Keys are matched with `startsWith`, longest first (see `priceFor`), so a
 * dated variant such as `claude-haiku-4-5-20251001` resolves to its family.
 */
const PRICING: Record<string, { input: number; output: number }> = {
  'claude-fable-5': { input: 10, output: 50 },
  'claude-opus-5': { input: 5, output: 25 },
  'claude-opus-4-8': { input: 5, output: 25 },
  'claude-opus-4-7': { input: 5, output: 25 },
  'claude-opus-4-6': { input: 5, output: 25 },
  // Sonnet 5 carries introductory pricing of $2/$10 through 2026-08-31.
  // We quote the standard rate: over-estimating during the promo is the
  // safe direction for a budget guardrail, and it needs no expiry logic.
  'claude-sonnet-5': { input: 3, output: 15 },
  'claude-sonnet-4-6': { input: 3, output: 15 },
  'claude-haiku-4-5': { input: 1, output: 5 },
}

/**
 * Applied to any model id not matched above — an id newer than this
 * release, or a proxy-specific name behind `ANTHROPIC_BASE_URL`. Set to
 * the most expensive entry in the table so an unpriced model can only ever
 * cause `--max-cost` to abort early, never to overshoot silently. This is
 * a deliberate upper bound, not a claim about any particular model.
 */
const FALLBACK_PRICE = { input: 10, output: 50 }

/**
 * Longest matching prefix wins, so adding a more specific id later (say
 * `claude-opus-5-mini`) cannot be shadowed by a shorter one already in the
 * table. Object key order is not relied upon.
 */
function priceFor(model: string) {
  let best: { input: number; output: number } | undefined
  let bestLen = -1
  for (const [key, price] of Object.entries(PRICING)) {
    if (model.startsWith(key) && key.length > bestLen) {
      best = price
      bestLen = key.length
    }
  }
  return best ?? FALLBACK_PRICE
}

export interface AnthropicProviderOptions {
  apiKey: string
  model: string
}

interface AnthropicMessagesResponse {
  content: Array<
    | { type: 'tool_use'; name: string; input: unknown }
    | { type: 'text'; text: string }
    | { type: string; [k: string]: unknown }
  >
  usage?: { input_tokens?: number; output_tokens?: number }
  stop_reason?: string
}

export function createAnthropicProvider(opts: AnthropicProviderOptions): Provider {
  const { apiKey, model } = opts
  const price = priceFor(model)
  return {
    id: 'anthropic',
    model,
    rates: { inputPerMTok: price.input, outputPerMTok: price.output },
    async generate<T>(req: ProviderRequest): Promise<ProviderResponse<T>> {
      const body = {
        model,
        // Messages API requires an explicit max_tokens. 4096 covers the
        // default --batch-size of 25 rows comfortably; if a user pushes
        // batch size up and overruns, the API returns a clear error.
        max_tokens: 4096,
        system: req.system,
        messages: [{ role: 'user', content: req.user }],
        tools: [
          {
            name: TOOL_NAME,
            description: 'Emit the requested structured rows.',
            input_schema: req.jsonSchema.schema,
          },
        ],
        tool_choice: { type: 'tool', name: TOOL_NAME },
      }

      const res = await fetch(`${DEFAULT_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Anthropic ${res.status}: ${text.slice(0, 500)}`)
      }

      const payload = (await res.json()) as AnthropicMessagesResponse

      const toolUse = payload.content?.find(
        (b): b is { type: 'tool_use'; name: string; input: unknown } =>
          b.type === 'tool_use' && b.name === TOOL_NAME,
      )
      if (!toolUse) {
        throw new Error(
          `Anthropic returned no '${TOOL_NAME}' tool_use block (stop_reason=${payload.stop_reason ?? 'unknown'}).`,
        )
      }

      const parsed = toolUse.input as T

      const inputTokens = payload.usage?.input_tokens ?? 0
      const outputTokens = payload.usage?.output_tokens ?? 0
      const usd =
        (inputTokens / 1_000_000) * price.input +
        (outputTokens / 1_000_000) * price.output

      return { data: parsed, usage: { inputTokens, outputTokens, usd } }
    },
  }
}
