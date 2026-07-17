---
slug: what-pg-dump-doesnt-tell-you
title: "What pg_dump doesn't tell you about your own schema"
description: pg_dump is a backup tool, not a schema-understanding tool. Three things it silently omits or hoists to the end of the file, and why a seeder reads pg_catalog directly instead.
date: 2026-07-17
author: satus.sh
tags: [postgres, introspection, pg_dump]
draft: false
---

`pg_dump` is the canonical way to serialise a Postgres database to a file, and for restoring a database that is precisely what it should do. It is not, and does not claim to be, a faithful description of your schema as the server sees it. Early in [satus](/) we treated the output of `pg_dump --schema-only` as ground truth for what a seeder needed to know about a table. We were wrong three times in a row, in three different ways, and each of the three is documented behaviour rather than a bug. This post names them, points at the [`pg_dump` reference](https://www.postgresql.org/docs/current/app-pgdump.html) for each, and describes what we read out of [`pg_catalog`](https://www.postgresql.org/docs/current/catalogs.html) instead.

## The short version

`pg_dump` produces a file that, when replayed, reconstructs the objects in one database. To do that reliably across major versions and across cyclic dependencies, it normalises what it emits. It omits planner statistics by default, it emits `CREATE EXTENSION` in place of the tables, types, and functions that the extension actually installed, and it hoists constraints and indexes into a post-data section so the DDL order in the file is not the DDL order you wrote. A schema-understanding tool has to look past the file at the catalogs, because the file is the restore plan, not the schema.

## What pg_dump is for, and what it isn't for

`pg_dump` reads a live server and writes a script (or a custom-format archive) that will recreate the same database elsewhere. The reference is explicit about scope: it dumps "a single database", it "does not dump roles or other database objects including tablespaces that are only present at the cluster level", and the emitted script is meant to be reloaded by `psql` or `pg_restore`. Everything the tool does is optimised for that. When we borrowed it as an introspection source, we were asking a restore tool to describe a schema, and it answered honestly, in the vocabulary of a restore.

The tool we actually want is the catalog. `pg_class`, `pg_attribute`, `pg_attrdef`, `pg_constraint`, `pg_index`, `pg_depend`, `pg_statistic`: every fact `pg_dump` had to normalise is available there, unnormalised, in the form the planner and the executor themselves use. The three sections below walk through the specific facts we lost by reading the dump instead of the catalog, in the order we lost them.

## 1. Planner statistics are omitted by default

The first surprise is the loudest. A seeder that wants to reproduce the shape of a production dataset needs to know, for each column, roughly what the distribution looks like: the most common values, the number of distinct values, the null fraction, a histogram. Postgres already computes all of that, stores it in `pg_statistic`, and exposes it through the `pg_stats` view. `ANALYZE` maintains it and the autovacuum daemon keeps it fresh; see [Updating Planner Statistics](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-STATISTICS) in the manual.

`pg_dump` does not include any of it by default. The `--statistics` and `--no-statistics` flags exist, and the default is `--no-statistics`. The reference is unambiguous:

> Do not dump statistics. This is the default.

For a dump-and-restore workflow the default is correct, because `ANALYZE` on the restored database will produce fresher and more accurate statistics than the ones frozen into the dump would have been. For a workflow that wants to look at the shape of the data without pulling the data, the default is a wall.

Even with `--statistics` set, the reference names three categories the flag does not cover: user-defined `CREATE STATISTICS` objects that are extended-statistics rather than per-column, statistics added by extensions, and everything in the [cumulative statistics system](https://www.postgresql.org/docs/current/monitoring-stats.html) (`pg_stat_user_tables`, `pg_stat_all_indexes`, and the family). The `pg_dump` reference calls this out explicitly and recommends running `ANALYZE` after restore.

What we do instead. `satus` reads `pg_stats` directly for every non-system table it is planning against, keyed on `schemaname` and `tablename`. The columns we care about are `null_frac`, `n_distinct`, `most_common_vals`, `most_common_freqs`, and `histogram_bounds`; a nullable text column with `n_distinct = -0.6` and a histogram_bounds array that skews toward short strings is a very different sampling problem from one with `n_distinct = 40` and a most-common list that covers most of the mass. We wrote about the sampling side of this decision in [Picking distributions, not values](/blog/picking-distributions-not-values); the point here is that the input to any of it is a catalog read, not a dump parse. If we had shipped v0.1 on top of `pg_dump` we would have shipped v0.1 blind.

## 2. Extension member objects are hidden behind CREATE EXTENSION

The second surprise is quieter and took us longer to notice. When a database uses [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html) to install a package like `citext`, `pg_trgm`, `postgis`, or `pgcrypto`, Postgres records every object the extension creates in `pg_depend` with a `deptype` of `'e'` (extension member). The extension owns those objects; a `DROP EXTENSION` removes them all together, and `pg_dump` respects that ownership.

The consequence is that `pg_dump` emits one line, `CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;`, in place of the several tables, types, operators, casts, and functions that `citext` actually installed. The extension's own SQL script, installed under `share/extension/`, is the source of truth for those objects; the dump does not repeat it. This is correct behaviour for a restore, because replaying `CREATE EXTENSION` on the target server will reproduce exactly the same objects at whatever version of the extension the target has installed. It is very wrong behaviour for an introspector, because a schema that uses `citext` for its case-insensitive columns, or `postgis` for its geometry columns, or `pg_trgm` for its trigram indexes, looks in the dump as if those columns and indexes are of types that the server has never heard of.

The related trap is version drift. A schema that was designed against `postgis` 3.3 can be replayed on a server that has `postgis` 3.5 installed, and the geometry types will resolve, but the exact set of operators and functions available will differ. `pg_dump` does not pin the extension version by default; the header records the extension name and the schema it lives in, and that is all. The [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html) documentation covers the `VERSION` clause and its restore-time behaviour.

What we do instead. During introspection `satus` queries `pg_extension` for the installed extensions and their versions, then joins `pg_depend` on `refclassid = 'pg_extension'::regclass` to enumerate every object that belongs to each one. Types like `citext` and `geometry` are recognised by their `pg_type.typname` in the extension member set, not by textual matching in a `CREATE TABLE`. The [`citext` field guide](/blog/the-citext-trap) is the longer version of why this matters for a seeder specifically; the general point is that any schema that uses extensions has meaningful surface area that a `pg_dump` script cannot describe on its own.

## 3. Constraints and indexes are hoisted to a post-data section

The third surprise is a reordering, not an omission. `pg_dump` (and `pg_restore`) organise the output into three sections named `pre-data`, `data`, and `post-data`. The reference describes the split under the [`--section`](https://www.postgresql.org/docs/current/app-pgdump.html) flag: `pre-data` holds the object definitions "other than indexes, triggers, rules, and constraints other than validated check constraints", `data` holds the table contents, and `post-data` holds everything the split moved out of `pre-data`. This is what lets `pg_restore` load the data with indexes and triggers absent, then build the indexes and enable the triggers afterwards, which is much faster than loading into a fully-constrained schema.

For introspection this reordering means the `CREATE TABLE` you read in the dump is not the full definition of the table. Non-validated `CHECK` constraints, unique constraints backed by indexes, foreign keys, primary keys defined via an index, exclusion constraints, triggers, and rules are all in the post-data section, well below the `CREATE TABLE` they belong to, in `ALTER TABLE ... ADD CONSTRAINT` form. A regex over `CREATE TABLE` blocks will miss most of the relational structure of the schema. Foreign keys in particular are always hoisted, because they cannot be added until the referenced table exists, and cycles among referencing tables force the constraint to be added after all the tables are in place. We wrote about the cycle case specifically in [Cyclic FKs in the wild](/blog/cyclic-fks-in-the-wild); the reordering in the dump is a direct consequence.

A worked example makes the split obvious. This schema, written the way an engineer would type it:

```sql
CREATE TABLE customers (
  id    bigserial PRIMARY KEY,
  email text NOT NULL,
  CONSTRAINT customers_email_lower_unique UNIQUE (lower(email))
);

CREATE TABLE orders (
  id          bigserial PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers(id),
  total_cents integer NOT NULL CHECK (total_cents >= 0)
);

CREATE INDEX orders_customer_id_idx ON orders (customer_id);
```

comes back out of `pg_dump --schema-only` in roughly this shape (irrelevant boilerplate removed):

```text
-- pre-data
CREATE TABLE public.customers (
    id bigint NOT NULL,
    email text NOT NULL
);
CREATE TABLE public.orders (
    id bigint NOT NULL,
    customer_id bigint NOT NULL,
    total_cents integer NOT NULL,
    CONSTRAINT orders_total_cents_check CHECK (total_cents >= 0)
);
-- (sequences, defaults, etc.)

-- post-data
ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_lower_unique UNIQUE (lower(email));
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
CREATE INDEX orders_customer_id_idx ON public.orders USING btree (customer_id);
ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey
    FOREIGN KEY (customer_id) REFERENCES public.customers(id);
```

Neither `CREATE TABLE` block, on its own, tells you that `customers.id` is a primary key, that `customers.email` participates in a case-insensitive uniqueness constraint, that `orders.customer_id` has an index, or that it points at `customers.id`. All of that arrives later, in `ALTER TABLE` form, in the post-data section. The validated `CHECK` on `total_cents` is the only structural fact the pre-data section keeps inline, and that only because Postgres and `pg_dump` treat validated `CHECK` constraints specially.

What we do instead. `satus` builds the dependency graph from `pg_constraint` joined against `pg_attribute` and `pg_class`, and reads indexes from `pg_index`. The queries are boring and the results are exact: primary keys have `contype = 'p'`, unique constraints have `contype = 'u'`, foreign keys have `contype = 'f'` plus `confrelid` and `confkey` for the target, `CHECK` constraints have `contype = 'c'` and the expression is recovered with `pg_get_constraintdef(oid)`. The topological order our DAG produces is derived from `confrelid` edges, not from the position of `ALTER TABLE ADD CONSTRAINT` statements in a file.

## What we read out of pg_catalog instead

For anyone starting from scratch, the smallest set of catalogs that gives you back what `pg_dump` normalised away is short:

| What you want                            | Where it actually lives                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| Tables and their storage flags           | `pg_class` (`relkind`, `relpersistence`, `relispartition`)                           |
| Columns, types, nullability, defaults    | `pg_attribute` joined to `pg_type`; defaults in `pg_attrdef` via `pg_get_expr`       |
| Primary keys, unique, FK, CHECK, exclusion | `pg_constraint` filtered by `contype`; text via `pg_get_constraintdef`             |
| Indexes and their expressions            | `pg_index` joined to `pg_class`; `pg_get_indexdef` for the text                      |
| Partitions and partition keys            | `pg_inherits`, `pg_partitioned_table`                                                |
| Extension-owned objects                  | `pg_extension` joined to `pg_depend` on `deptype = 'e'`                              |
| Planner statistics                       | `pg_stats` (view over `pg_statistic`); `pg_stats_ext` for `CREATE STATISTICS`        |
| Object dependencies (for DAG order)      | `pg_depend`, `pg_constraint.confrelid`                                               |
| Row-level security                       | `pg_policy`; `pg_class.relrowsecurity` and `relforcerowsecurity`                     |

These are all documented in the [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html) chapter, they are versioned with the server rather than with any client tool, and they answer the questions a seeder needs to ask about a table in one round trip per table. The [`pg_stats`](https://www.postgresql.org/docs/current/view-pg-stats.html) view is worth calling out specifically, because it is the one that closes the loop on the first section: it is how a tool that never touches production data can still reason about the shape of production data.

## Where this leaves pg_dump

We use `pg_dump` daily, for exactly what it was written for: capturing a database so it can be restored. Backups against production, seed captures for a staging environment that already has representative data, migrations across major Postgres versions, cluster moves. The three limitations above are the price of the guarantees the tool provides. It is a restore plan first, and a restore plan is not the same object as a schema description.

If you have been treating a `pg_dump --schema-only` file as the schema for tooling you are writing, [`satus plan`](/quickstart) reads the same catalogs described in the table above and prints the composed view the dump can't. If the tooling you are writing is more general than a seeder, the sections here are the ones we would spend our own time re-reading; the catalog is small, well-named, and stable across releases in a way very little else in this ecosystem is.

## References

- PostgreSQL documentation, [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html).
- PostgreSQL documentation, [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html).
- PostgreSQL documentation, [Updating Planner Statistics](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-STATISTICS).
- PostgreSQL documentation, [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html), including [`pg_class`](https://www.postgresql.org/docs/current/catalog-pg-class.html), [`pg_attribute`](https://www.postgresql.org/docs/current/catalog-pg-attribute.html), [`pg_constraint`](https://www.postgresql.org/docs/current/catalog-pg-constraint.html), [`pg_index`](https://www.postgresql.org/docs/current/catalog-pg-index.html), [`pg_depend`](https://www.postgresql.org/docs/current/catalog-pg-depend.html), and [`pg_extension`](https://www.postgresql.org/docs/current/catalog-pg-extension.html).
- PostgreSQL documentation, [`pg_stats`](https://www.postgresql.org/docs/current/view-pg-stats.html) and [Cumulative Statistics System](https://www.postgresql.org/docs/current/monitoring-stats.html).
