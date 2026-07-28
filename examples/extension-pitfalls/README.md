# Extension pitfalls: a reproducible example dataset

Companion to [Postgres extensions that trip up seeders](https://satus.sh/blog/postgres-extensions-that-trip-up-seeders).

Three self-contained SQL scripts. Each one creates a small schema, runs the
seed that a type-driven generator would produce (and shows exactly how it
fails), then runs the seed that respects the extension's semantics.

| File | Extension | Failure demonstrated |
| --- | --- | --- |
| `01-postgis.sql` | PostGIS | random bytea as geometry, wrong subtype, wrong SRID, self-intersecting polygon that stores cleanly |
| `02-pgvector.sql` | pgvector | wrong declared dimension, zero vector producing NaN cosine distance, random vectors giving meaningless ANN results |
| `03-pgcrypto.sql` | pgcrypto | random bytes accepted as ciphertext then failing to decrypt, hash columns that never match a lookup, `crypt` password hashes |

The failing statements are wrapped in `DO ... EXCEPTION` blocks so each script
runs top to bottom and prints the real server messages instead of aborting on
the first error.

## Run locally

Requires Docker. Containers are ephemeral; nothing touches your own database.

```bash
cd examples/extension-pitfalls
./run.sh              # all three
./run.sh pgvector     # just one
```

Two images are used because no mainstream Postgres image ships both PostGIS
and pgvector: `postgis/postgis:16-3.4` for the PostGIS case,
`pgvector/pgvector:pg16` for the pgvector case. pgcrypto is contrib and runs
on either.

## Run against an existing database

```bash
psql "$DATABASE_URL" -f 03-pgcrypto.sql
```

On managed Postgres, extensions are frequently installed into an `extensions`
schema rather than `public`. If `pgp_sym_encrypt` reports "function does not
exist", the function is there but off the search path:

```sql
SET search_path = public, extensions;
```

## Run in CI

Drop this job into any GitHub Actions workflow. It asserts the corrected seeds
load and the round-trips hold; the failure cases print as notices.

```yaml
jobs:
  extension-pitfalls:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - image: postgis/postgis:16-3.4
            script: 01-postgis.sql
          - image: pgvector/pgvector:pg16
            script: 02-pgvector.sql
          - image: pgvector/pgvector:pg16
            script: 03-pgcrypto.sql
    services:
      postgres:
        image: ${{ matrix.image }}
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: example
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 5s --health-timeout 5s --health-retries 20
    steps:
      - uses: actions/checkout@v4
      - name: Run case
        env:
          PGPASSWORD: postgres
        run: |
          psql -h localhost -U postgres -d example -v ON_ERROR_STOP=1 \
            -f examples/extension-pitfalls/${{ matrix.script }}
```

## Verification status

All three scripts were executed end to end, twice (they are re-runnable), on
PostgreSQL 17.9 with PostGIS 3.6.1, pgvector 0.8.2, and pgcrypto 1.3. Observed
output:

| Case | Server message |
| --- | --- |
| PostGIS, random bytea | `Unknown WKB type (84148994)!` |
| PostGIS, wrong subtype | `Geometry type (LineString) does not match column type (Point)` |
| PostGIS, wrong SRID | `Geometry SRID (3857) does not match column SRID (4326)` |
| PostGIS, bowtie polygon | stored; `ST_IsValid` false, `ST_IsValidReason` = `Self-intersection[0.5 0.5]`, `ST_Area` = 0 |
| pgvector, wrong dimension | `expected 1536 dimensions, not 384` |
| pgvector, zero vector | cosine `<=>` returns `NaN`; L2 `<->` returns a finite 3.742 |
| pgvector, random unit vectors | 200 rows, HNSW index builds, nearest-neighbour distances cluster at 0.916–0.942 (no meaningful ranking) |
| pgcrypto, random bytes | 10 rows accepted; `pgp_sym_decrypt` then raises `Wrong key or corrupt data`; hash lookup returns 0 rows |
| pgcrypto, correct seed | decrypt round-trips, hash lookup returns 1 row, `crypt` login true / wrong password false |

The corrected seeds in each script are the assertions: run under
`psql -v ON_ERROR_STOP=1`, any regression fails the script.

