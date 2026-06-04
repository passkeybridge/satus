/**
 * OpenAI client. We call the chat-completions endpoint directly with fetch
 * to avoid pulling in the heavy `openai` SDK. The shape we want is the
 * model's structured-output mode (response_format: json_schema, strict).
 *
 * Cost tracking: we record usage from each response and convert to a USD
 * estimate using a small built-in price table. The estimate is intended for
 * a --max-cost guardrail, not for accounting; rates are last-known-good and
 * may drift. Override OPENAI_BASE_URL for compatible providers.
 */

const DEFAULT_BASE = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'

/** USD per million tokens. Update as needed; conservative defaults. */
const PRICING: Record<string, { input: number; output: number }> = {
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gpt-4o': { input: 2.5, output: 10 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
  'gpt-4.1': { input: 2, output: 8 },
}

const FALLBACK_PRICE = { input: 1, output: 3 }

export interface LlmUsage {
  inputTokens: number
  outputTokens: number
  usd: number
}

export class CostBudget {
  private spent = 0
  constructor(public readonly maxUsd: number) {}
  add(usage: LlmUsage) {
    this.spent += usage.usd
  }
  get spentUsd() {
    return this.spent
  }
  remainingUsd() {
    return this.maxUsd - this.spent
  }
  exceeded() {
    return this.spent > this.maxUsd
  }
}

export interface ChatRequest {
  model: string
  apiKey: string
  system: string
  user: string
  jsonSchema: { name: string; schema: Record<string, unknown> }
}

export interface ChatResponse<T> {
  data: T
  usage: LlmUsage
}

function priceFor(model: string) {
  for (const key of Object.keys(PRICING)) {
    if (model.startsWith(key)) return PRICING[key] ?? FALLBACK_PRICE
  }
  return FALLBACK_PRICE
}

// GPT-5 family pins temperature at 1; sending any other value is a 400.
// Detect by prefix so future minor releases (gpt-5.x, gpt-5-mini, ...) are covered.
function supportsCustomTemperature(model: string): boolean {
  return !/^gpt-5/i.test(model)
}

export async function chatJson<T>(req: ChatRequest): Promise<ChatResponse<T>> {
  const body: Record<string, unknown> = {
    model: req.model,
    messages: [
      { role: 'system', content: req.system },
      { role: 'user', content: req.user },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: { name: req.jsonSchema.name, schema: req.jsonSchema.schema, strict: true },
    },
  }
  if (supportsCustomTemperature(req.model)) {
    body.temperature = 0.7
  }

  const res = await fetch(`${DEFAULT_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`OpenAI ${res.status}: ${text.slice(0, 500)}`)
  }

  const payload = (await res.json()) as {
    choices: Array<{ message: { content: string } }>
    usage?: { prompt_tokens?: number; completion_tokens?: number }
  }

  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error('OpenAI returned no content')

  let parsed: T
  try {
    parsed = JSON.parse(content) as T
  } catch (err) {
    throw new Error(`Failed to parse model JSON: ${(err as Error).message}`)
  }

  const price = priceFor(req.model)
  const inputTokens = payload.usage?.prompt_tokens ?? 0
  const outputTokens = payload.usage?.completion_tokens ?? 0
  const usd =
    (inputTokens / 1_000_000) * price.input +
    (outputTokens / 1_000_000) * price.output

  return { data: parsed, usage: { inputTokens, outputTokens, usd } }
}
