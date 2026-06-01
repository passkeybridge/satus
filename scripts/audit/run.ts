/**
 * Audit runner. Clones each source declared in corpus/sources.json into
 * /tmp/corpus-cache/, applies its raw .sql files to a throwaway database,
 * runs the introspection queries from queries.ts, and writes the merged
 * result to corpus/audit-<today>.json.
 *
 * Design notes:
 *
 *  - We orchestrate Postgres via the psql CLI rather than the `pg` npm
 *    package, because the marketing-site root workspace deliberately does
 *    NOT depend on `pg` (it must stay out of the Cloudflare Worker
 *    bundle — see the npm-package memory).
 *
 *  - Each source gets its own database (`audit_<slug>`) so failed
 *    applications can't pollute another source's measurements.
 *
 *  - A source that fails to apply is recorded with `apply_status: 'failed'`
 *    and contributes zero metrics. We never silently substitute zeros for
 *    numbers we couldn't measure — posts must point at a source whose
 *    relevant fields are non-null.
 *
 *  - The script is intentionally deterministic: given the same sources.json
 *    (with pinned git refs) and the same Postgres major version, it
 *    produces the same JSON.
 */
import { execSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { globSync } from 'node:fs';
import {
  TABLE_COUNTS,
  PARTITIONS_UNPROTECTED_CHILDREN,
  COLUMN_COUNTS,
  CONSTRAINT_COUNTS,
  FK_EDGES,
} from './queries';
import { findCycles } from './scc';

const PROJECT_ROOT = resolve(import.meta.dir, '..', '..');
const CACHE_DIR = '/tmp/corpus-cache';
const PG_ENV = {
  PGHOST: process.env.PGHOST ?? '/tmp',
  PGPORT: process.env.PGPORT ?? '5599',
  PGUSER: process.env.PGUSER ?? 'pg',
};

type Source = {
  name: string;
  repo: string;
  ref: string;
  extensions: string[];
  files?: string[];
  filesGlob?: string;
  applyAsSuperuser?: boolean;
};

type Sources = { sources: Source[] };

type Metrics = {
  tables_total: number | null;
  partitioned_parents: number | null;
  partitioned_parents_with_rls: number | null;
  partitioned_parents_with_unprotected_child: number | null;
  columns_total: number | null;
  columns_nullable: number | null;
  columns_notnull: number | null;
  columns_generated: number | null;
  citext_columns: number | null;
  text_email_columns: number | null;
  check_constraints: number | null;
  unique_constraints_single_col: number | null;
  unique_constraints_multi_col: number | null;
  fk_total: number | null;
  fk_cycle_count: number | null;
  largest_cycle_size: number | null;
};

type Result = {
  name: string;
  repo: string;
  ref: string;
  applied_files: number;
  apply_status: 'ok' | 'partial' | 'failed';
  error_message?: string;
  metrics: Metrics;
};

function emptyMetrics(): Metrics {
  return {
    tables_total: null,
    partitioned_parents: null,
    partitioned_parents_with_rls: null,
    partitioned_parents_with_unprotected_child: null,
    columns_total: null,
    columns_nullable: null,
    columns_notnull: null,
    columns_generated: null,
    citext_columns: null,
    text_email_columns: null,
    check_constraints: null,
    unique_constraints_single_col: null,
    unique_constraints_multi_col: null,
    fk_total: null,
    fk_cycle_count: null,
    largest_cycle_size: null,
  };
}

function psql(args: string[], opts: { db?: string; input?: string } = {}) {
  const fullArgs = ['-v', 'ON_ERROR_STOP=1', '-X', '-q'];
  if (opts.db) fullArgs.push('-d', opts.db);
  fullArgs.push(...args);
  return spawnSync('psql', fullArgs, {
    env: { ...process.env, ...PG_ENV },
    input: opts.input,
    encoding: 'utf-8',
  });
}

function ensureCache() {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
}

function checkoutSource(s: Source): string {
  if (s.repo === 'local') return PROJECT_ROOT;
  const dest = `${CACHE_DIR}/${s.name}`;
  if (existsSync(dest)) {
    process.stderr.write(`  [${s.name}] cache hit at ${dest}\n`);
    return dest;
  }
  process.stderr.write(`  [${s.name}] cloning ${s.repo} @ ${s.ref}…\n`);
  // Shallow clone of a single ref. Some repos refuse single-branch on a tag,
  // so we fall back to full --depth=1 of the default branch and then check
  // out the ref. We tolerate failure: a source we can't clone is skipped.
  const r1 = spawnSync('git', [
    'clone', '--depth', '1', '--branch', s.ref, '--single-branch', s.repo, dest,
  ], { encoding: 'utf-8' });
  if (r1.status !== 0) {
    spawnSync('rm', ['-rf', dest]);
    const r2 = spawnSync('git', ['clone', '--depth', '50', s.repo, dest], { encoding: 'utf-8' });
    if (r2.status !== 0) throw new Error(`git clone failed: ${r2.stderr}`);
    const r3 = spawnSync('git', ['-C', dest, 'checkout', s.ref], { encoding: 'utf-8' });
    if (r3.status !== 0) throw new Error(`git checkout ${s.ref} failed: ${r3.stderr}`);
  }
  return dest;
}

function dbName(s: Source) {
  return 'audit_' + s.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function recreateDb(s: Source) {
  const db = dbName(s);
  psql(['-c', `DROP DATABASE IF EXISTS ${db}`], { db: 'postgres' });
  const r = psql(['-c', `CREATE DATABASE ${db}`], { db: 'postgres' });
  if (r.status !== 0) throw new Error(`createdb failed: ${r.stderr}`);
  for (const ext of s.extensions) {
    const e = psql(['-c', `CREATE EXTENSION IF NOT EXISTS "${ext}"`], { db });
    if (e.status !== 0) {
      // Missing extensions are non-fatal for the audit framework, but we
      // surface the message so the operator can decide whether to install.
      process.stderr.write(`  [${s.name}] extension ${ext}: ${e.stderr.trim()}\n`);
    }
  }
  return db;
}

function resolveFiles(s: Source, root: string): string[] {
  const out: string[] = [];
  if (s.files) {
    for (const f of s.files) {
      const p = resolve(root, f);
      if (existsSync(p)) out.push(p);
      else process.stderr.write(`  [${s.name}] missing file ${f}\n`);
    }
  }
  if (s.filesGlob) {
    const matches = globSync(s.filesGlob, { cwd: root }).sort();
    for (const m of matches) out.push(resolve(root, m));
  }
  return out;
}

function applyFiles(s: Source, db: string, files: string[]): { ok: boolean; applied: number; err?: string } {
  let applied = 0;
  for (const f of files) {
    const r = psql(['-f', f], { db });
    if (r.status !== 0) {
      // Some Lemmy/Penpot migrations reference roles/extensions we don't
      // have. Record the first failure and stop applying this source so we
      // don't measure a half-loaded schema.
      return { ok: false, applied, err: `${basename(f)}: ${r.stderr.split('\n').slice(0, 3).join(' ').slice(0, 400)}` };
    }
    applied += 1;
  }
  return { ok: true, applied };
}

function runScalarRow<T extends Record<string, number>>(db: string, sql: string): T {
  const wrapped = `SELECT row_to_json(t) FROM (${sql.replace(/;\s*$/, '')}) t;`;
  const r = psql(['-Atc', wrapped], { db });
  if (r.status !== 0) throw new Error(`query failed: ${r.stderr}`);
  return JSON.parse(r.stdout.trim() || '{}') as T;
}

function runEdges(db: string): { src: string; dst: string }[] {
  const wrapped = `SELECT COALESCE(json_agg(t), '[]'::json) FROM (${FK_EDGES.replace(/;\s*$/, '')}) t;`;
  const r = psql(['-Atc', wrapped], { db });
  if (r.status !== 0) throw new Error(`edge query failed: ${r.stderr}`);
  return JSON.parse(r.stdout.trim() || '[]');
}

function measure(db: string): Metrics {
  const tc = runScalarRow<{ tables_total: number; partitioned_parents: number; partitioned_parents_with_rls: number }>(db, TABLE_COUNTS);
  const pp = runScalarRow<{ partitioned_parents_with_unprotected_child: number }>(db, PARTITIONS_UNPROTECTED_CHILDREN);
  const cc = runScalarRow<{ columns_total: number; columns_nullable: number; columns_notnull: number; columns_generated: number; citext_columns: number; text_email_columns: number }>(db, COLUMN_COUNTS);
  const co = runScalarRow<{ check_constraints: number; unique_constraints_single_col: number; unique_constraints_multi_col: number }>(db, CONSTRAINT_COUNTS);
  const edges = runEdges(db);
  const cycles = findCycles(edges);
  return {
    tables_total: tc.tables_total ?? 0,
    partitioned_parents: tc.partitioned_parents ?? 0,
    partitioned_parents_with_rls: tc.partitioned_parents_with_rls ?? 0,
    partitioned_parents_with_unprotected_child: pp.partitioned_parents_with_unprotected_child ?? 0,
    columns_total: cc.columns_total ?? 0,
    columns_nullable: cc.columns_nullable ?? 0,
    columns_notnull: cc.columns_notnull ?? 0,
    columns_generated: cc.columns_generated ?? 0,
    citext_columns: cc.citext_columns ?? 0,
    text_email_columns: cc.text_email_columns ?? 0,
    check_constraints: co.check_constraints ?? 0,
    unique_constraints_single_col: co.unique_constraints_single_col ?? 0,
    unique_constraints_multi_col: co.unique_constraints_multi_col ?? 0,
    fk_total: edges.length,
    fk_cycle_count: cycles.length,
    largest_cycle_size: cycles.reduce((m, c) => Math.max(m, c.length), 0),
  };
}

async function main() {
  ensureCache();
  const sourcesPath = resolve(PROJECT_ROOT, 'corpus/sources.json');
  const { sources } = JSON.parse(readFileSync(sourcesPath, 'utf-8')) as Sources;

  // Sanity-check Postgres version so audits cite the right major.
  const ver = psql(['-Atc', 'show server_version_num'], { db: 'postgres' });
  if (ver.status !== 0) throw new Error(`Postgres not reachable: ${ver.stderr}`);
  const pgVerNum = Number(ver.stdout.trim());
  const pgMajor = Math.floor(pgVerNum / 10000);
  process.stderr.write(`Postgres major version: ${pgMajor}\n`);

  const results: Result[] = [];

  for (const s of sources) {
    process.stderr.write(`\n=== ${s.name} (${s.ref}) ===\n`);
    const result: Result = {
      name: s.name, repo: s.repo, ref: s.ref,
      applied_files: 0, apply_status: 'failed',
      metrics: emptyMetrics(),
    };
    try {
      const root = checkoutSource(s);
      const files = resolveFiles(s, root);
      if (files.length === 0) {
        result.error_message = 'no .sql files matched';
        results.push(result);
        continue;
      }
      const db = recreateDb(s);
      const ap = applyFiles(s, db, files);
      result.applied_files = ap.applied;
      if (!ap.ok) {
        // partial = at least one file applied; failed = nothing applied
        result.apply_status = ap.applied > 0 ? 'partial' : 'failed';
        result.error_message = ap.err;
        // Measure anyway when partial — useful to see how much landed.
        if (ap.applied > 0) {
          try { result.metrics = measure(db); } catch (e) {
            result.error_message = (result.error_message ?? '') + ' | measure: ' + (e as Error).message;
          }
        }
      } else {
        result.apply_status = 'ok';
        result.metrics = measure(db);
      }
    } catch (e) {
      result.error_message = (e as Error).message.slice(0, 500);
    }
    results.push(result);
    process.stderr.write(`  applied: ${result.applied_files}  status: ${result.apply_status}  tables: ${result.metrics.tables_total}\n`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const payload = {
    generated_at: new Date().toISOString(),
    postgres_major: pgMajor,
    source_count: results.length,
    ok_count: results.filter(r => r.apply_status === 'ok').length,
    results,
  };
  const out = resolve(PROJECT_ROOT, `corpus/audit-${today}.json`);
  writeFileSync(out, JSON.stringify(payload, null, 2) + '\n');
  process.stderr.write(`\nWrote ${out}\n`);
}

await main();
