/**
 * Provider abstraction for LLM-backed row generation.
 *
 * Each concrete provider (OpenAI, Anthropic, ...) returns a `Provider`
 * object with a stable `generate()` method. The runner never imports a
 * provider directly — it receives one from the command layer and calls
 * `generate()` per batch. This keeps the runner free of provider-specific
 * HTTP shapes, auth headers, and structured-output quirks.
 *
 * v0.2.0 hardcoded OpenAI; v0.3.0 introduces this interface as a refactor
 * with no behavior change, then adds Anthropic alongside in Pass 3.
 */
export interface LlmUsage {
  inputTokens: number
  outputTokens: number
  usd: number
}

export interface ProviderRequest {
  /** System prompt; provider-agnostic plain text. */
  system: string
  /** User turn; provider-agnostic plain text. */
  user: string
  /**
   * JSON Schema for the desired structured output. Providers map this to
   * their native structured-output surface (OpenAI: response_format
   * json_schema; Anthropic: tool-use with input_schema).
   */
  jsonSchema: { name: string; schema: Record<string, unknown> }
}

export interface ProviderResponse<T> {
  data: T
  usage: LlmUsage
}

export interface Provider {
  /** Stable identifier; surfaces in telemetry and JSON output. */
  readonly id: 'openai' | 'anthropic'
  /** Model id actually being called; surfaces in telemetry and logs. */
  readonly model: string
  generate<T>(req: ProviderRequest): Promise<ProviderResponse<T>>
}

/**
 * USD budget tracker shared across providers. Lives here (not in any
 * single provider file) because every provider feeds the same budget and
 * the runner enforces it provider-agnostically.
 */
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
