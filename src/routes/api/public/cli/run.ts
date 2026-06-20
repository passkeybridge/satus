/**
 * CLI run telemetry sink. Called by `satus generate` (fire-and-forget) after
 * each run finishes. Records what was generated, the model used, and the
 * spend so we can validate end-to-end runs and see real usage data in the
 * `public.satus_runs` table.
 *
 * POST { id?, status, license_key?, profile, model, target_schema,
 *        tables, total_rows, total_cost_usd, duration_ms, error_message?,
 *        cli_version, environment }
 *
 * Public + bounded payload. No auth: the CLI runs on customer machines
 * where we can't ship secrets. Tight zod validation + small INSERTs only.
 */

import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
} as const

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })

const TableReport = z.object({
  name: z.string().min(1).max(128).regex(/^[a-zA-Z0-9_]+$/),
  rows_generated: z.number().int().min(0).max(1_000_000),
})

const RunSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['running', 'success', 'failed']),
  license_key: z.string().min(8).max(128).optional(),
  profile: z.string().min(1).max(32).optional(),
  // v0.3.0 (optional, backward-compatible with v0.2.x clients which omit it).
  provider: z.enum(['openai', 'anthropic']).optional(),
  model: z.string().min(1).max(64).optional(),
  target_schema: z.string().min(1).max(64).optional(),
  tables: z.array(TableReport).max(200).optional(),
  total_rows: z.number().int().min(0).max(10_000_000).optional(),
  total_cost_usd: z.number().min(0).max(10_000).optional(),
  // v0.3.0 token counts (optional). Bounded to prevent abuse but generous.
  input_tokens: z.number().int().min(0).max(1_000_000_000).optional(),
  output_tokens: z.number().int().min(0).max(1_000_000_000).optional(),
  duration_ms: z.number().int().min(0).max(24 * 60 * 60 * 1000).optional(),
  error_message: z.string().max(2_000).optional(),
  cli_version: z.string().min(1).max(32).optional(),
  environment: z.enum(['dev', 'live']).default('dev'),
})

export const Route = createFileRoute('/api/public/cli/run')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json(400, { ok: false, reason: 'invalid_json' })
        }
        const parsed = RunSchema.safeParse(body)
        if (!parsed.success) {
          return json(400, { ok: false, reason: 'invalid_payload', issues: parsed.error.issues })
        }
        const row = {
          ...parsed.data,
          finished_at: parsed.data.status === 'running' ? null : new Date().toISOString(),
        }

        // Upsert by id when the CLI provides one (so a single run shows up
        // as one row across "running" -> "success/failed" updates).
        if (parsed.data.id) {
          const { error } = await supabaseAdmin
            .from('satus_runs')
            .upsert(row, { onConflict: 'id' })
          if (error) return json(500, { ok: false, reason: 'db_error', detail: error.message })
          return json(200, { ok: true, id: parsed.data.id })
        }

        const { data, error } = await supabaseAdmin
          .from('satus_runs')
          .insert(row)
          .select('id')
          .single()
        if (error) return json(500, { ok: false, reason: 'db_error', detail: error.message })
        return json(200, { ok: true, id: data.id })
      },
    },
  },
})
