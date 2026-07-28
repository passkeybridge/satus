#!/usr/bin/env bash
# Reproduce the extension failure modes locally, in throwaway containers.
#
#   ./run.sh            # run all three
#   ./run.sh postgis    # run one
#
# Two images are used because no single mainstream Postgres image ships both
# PostGIS and pgvector. pgcrypto is contrib and present in both.
set -euo pipefail

cd "$(dirname "$0")"

POSTGIS_IMAGE="postgis/postgis:16-3.4"
PGVECTOR_IMAGE="pgvector/pgvector:pg16"
PASSWORD="satus-example"

run_case() {
  local name="$1" image="$2" file="$3"
  local container="satus-ext-${name}-$$"

  echo "==> ${name}: starting ${image}"
  docker run --rm -d --name "$container" \
    -e POSTGRES_PASSWORD="$PASSWORD" -e POSTGRES_DB=example \
    "$image" >/dev/null

  # Wait for the server, not for an arbitrary sleep.
  for _ in $(seq 1 60); do
    if docker exec "$container" pg_isready -U postgres -d example >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  docker cp "$file" "$container:/tmp/case.sql"
  docker exec -e PGPASSWORD="$PASSWORD" "$container" \
    psql -v ON_ERROR_STOP=1 -U postgres -d example -f /tmp/case.sql

  docker stop "$container" >/dev/null
  echo "==> ${name}: done"
  echo
}

target="${1:-all}"

case "$target" in
  postgis|all)  run_case postgis  "$POSTGIS_IMAGE"  01-postgis.sql ;;&
  pgvector|all) run_case pgvector "$PGVECTOR_IMAGE" 02-pgvector.sql ;;&
  pgcrypto|all) run_case pgcrypto "$PGVECTOR_IMAGE" 03-pgcrypto.sql ;;&
  postgis|pgvector|pgcrypto|all) ;;
  *) echo "unknown target: $target (use postgis | pgvector | pgcrypto | all)" >&2; exit 2 ;;
esac
