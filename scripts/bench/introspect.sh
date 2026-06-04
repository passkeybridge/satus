#!/usr/bin/env bash
# v0.2.0 introspection bench, psql-driven. We can't open a raw pg Node
# connection from this sandbox (the pooled role rejects pg's startup
# query), but psql works. Measure wall time for the legacy 5-query path
# vs the CTE single-query path, averaged over N iterations after warmup.
#
# Output is consumed by scripts/bench/finalize.ts to write the JSON.

set -euo pipefail

SCHEMA="${1:-public}"
ITERS="${2:-20}"
WARMUP=3

LEGACY_SQL='\set ON_ERROR_STOP on
select table_name from information_schema.tables where table_schema = :'schema' and table_type='\''BASE TABLE'\'';
select table_name, column_name, data_type from information_schema.columns where table_schema = :'schema';
select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=:'schema' and tc.constraint_type='\''PRIMARY KEY'\'';
select cls.relname, att.attname, fcls.relname, fatt.attname, con.condeferrable, con.condeferred from pg_constraint con join pg_class cls on cls.oid=con.conrelid join pg_namespace ns on ns.oid=cls.relnamespace join pg_class fcls on fcls.oid=con.confrelid join lateral unnest(con.conkey) with ordinality as ck(attnum,ord) on true join lateral unnest(con.confkey) with ordinality as fk(attnum,ord) on fk.ord=ck.ord join pg_attribute att on att.attrelid=cls.oid and att.attnum=ck.attnum join pg_attribute fatt on fatt.attrelid=fcls.oid and fatt.attnum=fk.attnum where con.contype='\''f'\'' and ns.nspname=:'schema';
select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=:'schema' and tc.constraint_type='\''UNIQUE'\'';
'

CTE_SQL='\set ON_ERROR_STOP on
with
  v_tables as (select table_name from information_schema.tables where table_schema=:'schema' and table_type='\''BASE TABLE'\''),
  v_columns as (select table_name, column_name, data_type from information_schema.columns where table_schema=:'schema'),
  v_pks as (select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=:'schema' and tc.constraint_type='\''PRIMARY KEY'\''),
  v_fks as (select cls.relname as t, att.attname as c from pg_constraint con join pg_class cls on cls.oid=con.conrelid join pg_namespace ns on ns.oid=cls.relnamespace join lateral unnest(con.conkey) as a(n) on true join pg_attribute att on att.attrelid=cls.oid and att.attnum=a.n where con.contype='\''f'\'' and ns.nspname=:'schema'),
  v_uniques as (select kcu.table_name, kcu.column_name from information_schema.table_constraints tc join information_schema.key_column_usage kcu on tc.constraint_schema=kcu.constraint_schema and tc.constraint_name=kcu.constraint_name where tc.table_schema=:'schema' and tc.constraint_type='\''UNIQUE'\'')
select
  (select jsonb_agg(to_jsonb(v_tables.*))  from v_tables)  as tables,
  (select jsonb_agg(to_jsonb(v_columns.*)) from v_columns) as columns,
  (select jsonb_agg(to_jsonb(v_pks.*))     from v_pks)     as pks,
  (select jsonb_agg(to_jsonb(v_fks.*))     from v_fks)     as fks,
  (select jsonb_agg(to_jsonb(v_uniques.*)) from v_uniques) as uniques;
'

# Warmup
for ((i=0; i<WARMUP; i++)); do
  printf "%s" "$LEGACY_SQL" | psql -v schema="$SCHEMA" -q -o /dev/null
  printf "%s" "$CTE_SQL"    | psql -v schema="$SCHEMA" -q -o /dev/null
done

# `select 1` baseline RTT
rtt_samples=()
for ((i=0; i<ITERS; i++)); do
  t=$( { time psql -q -c "select 1" >/dev/null; } 2>&1 | awk '/real/{print $2}' )
  rtt_samples+=("$t")
done

legacy_samples=()
for ((i=0; i<ITERS; i++)); do
  t=$( { time printf "%s" "$LEGACY_SQL" | psql -v schema="$SCHEMA" -q -o /dev/null; } 2>&1 | awk '/real/{print $2}' )
  legacy_samples+=("$t")
done

cte_samples=()
for ((i=0; i<ITERS; i++)); do
  t=$( { time printf "%s" "$CTE_SQL" | psql -v schema="$SCHEMA" -q -o /dev/null; } 2>&1 | awk '/real/{print $2}' )
  cte_samples+=("$t")
done

# Emit one JSON record so finalize.ts can read and combine with binary size.
python3 - "$SCHEMA" "$ITERS" "${rtt_samples[@]}" "__SPLIT__" "${legacy_samples[@]}" "__SPLIT__" "${cte_samples[@]}" <<'PY'
import json, re, sys, statistics
schema = sys.argv[1]
iters  = int(sys.argv[2])
rest   = sys.argv[3:]
def split(arr):
  parts, cur = [[]], 0
  for a in arr:
    if a == "__SPLIT__":
      parts.append([])
    else:
      parts[-1].append(a)
  return parts
groups = split(rest)
def to_ms(s):
  # bash `time` real: "0m0.045s"
  m = re.match(r"(\d+)m([\d.]+)s", s)
  if not m: return None
  return (int(m.group(1)) * 60 + float(m.group(2))) * 1000
def stats(samples):
  vals = [to_ms(x) for x in samples if to_ms(x) is not None]
  if not vals: return None
  return {
    "n": len(vals),
    "median_ms": round(statistics.median(vals), 2),
    "min_ms": round(min(vals), 2),
    "max_ms": round(max(vals), 2),
  }
rtt, legacy, cte = (stats(g) for g in groups[:3])
out = {
  "schema": schema,
  "iterations": iters,
  "rtt_select_1": rtt,
  "legacy_5_queries": legacy,
  "cte_1_query": cte,
  "speedup_x": round((legacy["median_ms"]/cte["median_ms"]), 2) if legacy and cte else None,
}
print(json.dumps(out, indent=2))
PY
