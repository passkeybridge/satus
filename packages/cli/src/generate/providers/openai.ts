/**
 * OpenAI provider. Calls the chat-completions endpoint directly with
 * `fetch` (no SDK dep) and uses native structured output via
 * `response_format: json_schema` with `strict: true`. Override the
 * endpoint with `OPENAI_BASE_URL` to point at compatible providers
 * (Together, Groq, a local proxy, etc.).
 *
 * Cost tracking: per-response usage is converted to a USD estimate using
 * a small built-in price table. The estimate drives the `--max-cost`
 * guardrail; it is not accounting. Rates are last-verified values and
 * may drift — the README states this clearly.
 */
import type { Provider, ProviderRequest, ProviderResponse } from "./types.js";

const DEFAULT_BASE = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

/**
 * USD per million tokens. Keep ordered with the most specific prefixes
 * first if we ever add overlapping ids. Last verified: 2026-05 against
 * OpenAI's public pricing page.
 */
const PRICING: Record<string, { input: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4o": { input: 2.5, output: 10 },
  "gpt-4.1-mini": { input: 0.4, output: 1.6 },
  "gpt-4.1": { input: 2, output: 8 },
};

/**
 * Applied to any model id not matched above. Set to the most expensive
 * entry in the table: an unpriced model can then only cause `--max-cost`
 * to abort early, never to overshoot silently. The previous value
 * ($1/$3) was *below* three of the four priced models, so unlisted ids
 * were under-billed — the wrong direction for a budget guardrail. This is
 * a deliberate upper bound, not a claim about any particular model.
 */
const FALLBACK_PRICE = { input: 2.5, output: 10 };

/**
 * Longest matching prefix wins, so `gpt-4o-mini` cannot be shadowed by
 * `gpt-4o` regardless of object key order.
 */
function priceFor(model: string) {
  let best: { input: number; output: number } | undefined;
  let bestLen = -1;
  for (const [key, price] of Object.entries(PRICING)) {
    if (model.startsWith(key) && key.length > bestLen) {
      best = price;
      bestLen = key.length;
    }
  }
  return best ?? FALLBACK_PRICE;
}

/**
 * GPT-5 family pins temperature at 1; sending any other value is a 400.
 * Detect by prefix so future minor releases (gpt-5.x, gpt-5-mini, ...)
 * are covered without code changes.
 */
function supportsCustomTemperature(model: string): boolean {
  return !/^gpt-5/i.test(model);
}

export interface OpenAiProviderOptions {
  apiKey: string;
  model: string;
}

export function createOpenAiProvider(opts: OpenAiProviderOptions): Provider {
  const { apiKey, model } = opts;
  const price = priceFor(model);
  return {
    id: "openai",
    model,
    rates: { inputPerMTok: price.input, outputPerMTok: price.output },
    async generate<T>(req: ProviderRequest): Promise<ProviderResponse<T>> {
      const body: Record<string, unknown> = {
        model,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: req.user },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: req.jsonSchema.name,
            schema: req.jsonSchema.schema,
            strict: true,
          },
        },
      };
      if (supportsCustomTemperature(model)) {
        body.temperature = 0.7;
      }

      const res = await fetch(`${DEFAULT_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`OpenAI ${res.status}: ${text.slice(0, 500)}`);
      }

      const payload = (await res.json()) as {
        choices: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };

      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error("OpenAI returned no content");

      let parsed: T;
      try {
        parsed = JSON.parse(content) as T;
      } catch (err) {
        throw new Error(`Failed to parse model JSON: ${(err as Error).message}`);
      }

      const inputTokens = payload.usage?.prompt_tokens ?? 0;
      const outputTokens = payload.usage?.completion_tokens ?? 0;
      const usd =
        (inputTokens / 1_000_000) * price.input + (outputTokens / 1_000_000) * price.output;

      return { data: parsed, usage: { inputTokens, outputTokens, usd } };
    },
  };
}
