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

const DEFAULT_BASE = process.env.ANTHROPIC_BASE_URL ?? 'https://api.anthropic.com/v1'

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
 * USD per million tokens. Intentionally empty in v0.3.0 Pass 3 — the
 * spec defers concrete rates to Pass 4 so we don't ship numbers we
 * haven't verified against Anthropic's pricing page on the day of
 * release. Any model not in this map uses `FALLBACK_PRICE`, which is
 * deliberately pessimistic so `--max-cost` errs on the safe side.
 *
 * When populating: add entries keyed by model-id prefix
 * (e.g. 'claude-haiku-4-5', 'claude-sonnet-4-5') with a
 * `// last verified: YYYY-MM-DD` comment.
 */
const PRICING: Record<string, { input: number; output: number }> = {}

const FALLBACK_PRICE = { input: 3, output: 15 }

function priceFor(model: string) {
  for (const key of Object.keys(PRICING)) {
    if (model.startsWith(key)) return PRICING[key] ?? FALLBACK_PRICE
  }
  return FALLBACK_PRICE
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
  return {
    id: 'anthropic',
    model,
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

      const price = priceFor(model)
      const inputTokens = payload.usage?.input_tokens ?? 0
      const outputTokens = payload.usage?.output_tokens ?? 0
      const usd =
        (inputTokens / 1_000_000) * price.input +
        (outputTokens / 1_000_000) * price.output

      return { data: parsed, usage: { inputTokens, outputTokens, usd } }
    },
  }
}
