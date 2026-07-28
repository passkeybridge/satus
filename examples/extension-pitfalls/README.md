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

Honest accounting of what has been executed and what has not:

- `03-pgcrypto.sql` behaviour is verified against PostgreSQL 17.6 with
  pgcrypto 1.3: `pgp_sym_decrypt` on random bytes raises
  `Wrong key or corrupt data`, `digest`/`crypt` round-trips hold, and the
  extension resolves through the `extensions` schema as documented above.
- `01-postgis.sql` and `02-pgvector.sql` are written against the documented
  behaviour of PostGIS 3.4 and pgvector 0.8 and have not been executed in
  this repository's CI, which has neither extension installed. Run `./run.sh`
  or the CI job above to execute them.
