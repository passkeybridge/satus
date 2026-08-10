import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./chrome-Dtk_UEXJ.mjs";
import { S as Section, P as Prose } from "./primitives-vAmdBvDX.mjs";
import "../_libs/marked.mjs";
import "../_libs/stripe.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "./router-B2kWt1Bm.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/vercel__analytics.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:crypto";
import "./stripe.server-BpuPeHCa.mjs";
import "../_libs/react-email__render.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__text.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__hr.mjs";
import "../_libs/react-email__link.mjs";
import "../_libs/zod.mjs";
import "events";
import "http";
import "https";
import "os";
import "../_libs/lucide-react.mjs";
const SECTIONS = [{
  id: "try",
  n: "01",
  label: "Try it"
}, {
  id: "results",
  n: "02",
  label: "Results"
}, {
  id: "reality",
  n: "03",
  label: "Demo vs CLI"
}];
const SAMPLE_DDL = `create type order_status as enum ('pending','paid','fulfilled','refunded');

create table customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  country char(2) not null
);

create table categories (
  id serial primary key,
  name text not null unique,
  featured_product_id int  -- cycle: closed after products exists
);

create table products (
  id serial primary key,
  category_id int not null references categories(id),
  sku text not null unique,
  name text not null,
  price_usd numeric(8,2) not null check (price_usd > 0)
);

alter table categories add constraint categories_featured_fk
  foreign key (featured_product_id) references products(id);

create table orders (
  id bigserial primary key,
  customer_id uuid not null references customers(id),
  status order_status not null default 'pending',
  total_usd numeric(10,2) not null
);

create table order_items (
  id bigserial primary key,
  order_id bigint not null references orders(id),
  product_id int not null references products(id),
  qty int not null check (qty between 1 and 20),
  unit_price_usd numeric(8,2) not null
);`;
const ROWS_PER_TABLE = 5;
const MAX_TABLES = 6;
const PHASE_LABEL = {
  idle: "",
  engine: "loading postgres (wasm)...",
  ddl: "running your DDL...",
  introspect: "introspecting pg_catalog...",
  generate: "generating rows (claude-haiku-4-5)...",
  insert: "inserting + validating...",
  done: "",
  error: ""
};
function topoSortDemo(tables) {
  const byName = new Map(tables.map((t) => [t.name, t]));
  let edges = [];
  for (const t of tables) {
    for (const fk of t.foreignKeys) {
      if (fk.refTable === t.name) continue;
      if (!byName.has(fk.refTable)) continue;
      const col = t.columns.find((c) => c.name === fk.column);
      edges.push({
        from: fk.refTable,
        to: t.name,
        column: fk.column,
        refColumn: fk.refColumn,
        nullable: col?.nullable === true
      });
    }
  }
  const brokenEdges = [];
  const kahn = (es) => {
    const inDeg = /* @__PURE__ */ new Map();
    const out = /* @__PURE__ */ new Map();
    for (const t of tables) {
      inDeg.set(t.name, 0);
      out.set(t.name, []);
    }
    for (const e of es) {
      out.get(e.from).push(e);
      inDeg.set(e.to, (inDeg.get(e.to) ?? 0) + 1);
    }
    const queue = [...inDeg.entries()].filter(([, d]) => d === 0).map(([n]) => n).sort();
    const order = [];
    while (queue.length > 0) {
      const n = queue.shift();
      order.push(byName.get(n));
      for (const e of out.get(n) ?? []) {
        const next = (inDeg.get(e.to) ?? 0) - 1;
        inDeg.set(e.to, next);
        if (next === 0) queue.push(e.to);
      }
    }
    const unresolved = new Set(tables.filter((t) => !order.includes(t)).map((t) => t.name));
    return {
      order,
      unresolved
    };
  };
  for (let round = 0; round <= tables.length; round++) {
    const {
      order,
      unresolved
    } = kahn(edges);
    if (unresolved.size === 0) return {
      order,
      brokenEdges,
      cycle: null
    };
    const candidates = edges.filter((e) => unresolved.has(e.from) && unresolved.has(e.to) && e.nullable).sort((a, b) => (a.to + "." + a.column).localeCompare(b.to + "." + b.column));
    const pick = candidates[0];
    if (!pick) {
      return {
        order,
        brokenEdges,
        cycle: Array.from(unresolved).sort()
      };
    }
    brokenEdges.push({
      table: pick.to,
      column: pick.column,
      refTable: pick.from,
      refColumn: pick.refColumn
    });
    edges = edges.filter((e) => e !== pick);
  }
  return {
    order: [],
    brokenEdges,
    cycle: tables.map((t) => t.name)
  };
}
function quoteIdent(s) {
  return '"' + s.replace(/"/g, '""') + '"';
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function DemoPage() {
  const [ddl, setDdl] = reactExports.useState(SAMPLE_DDL);
  const [profile, setProfile] = reactExports.useState("ecommerce");
  const [phase, setPhase] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  const [results, setResults] = reactExports.useState([]);
  const [runMeta, setRunMeta] = reactExports.useState(null);
  const running = reactExports.useRef(false);
  async function run() {
    if (running.current) return;
    running.current = true;
    setError(null);
    setResults([]);
    setRunMeta(null);
    try {
      setPhase("engine");
      const {
        PGlite
      } = await import("../_libs/electric-sql__pglite.mjs");
      const db = new PGlite();
      setPhase("ddl");
      await db.exec(ddl);
      setPhase("introspect");
      const cols = await db.query(
        // is_identity is read separately from is_generated: Postgres reports
        // identity columns as column_default = NULL and is_generated =
        // 'NEVER', so neither of the other two flags catches them.
        `select c.table_name, c.column_name, c.data_type, c.udt_name, c.is_nullable,
                c.column_default, c.character_maximum_length, c.is_generated,
                c.is_identity
         from information_schema.columns c
         join pg_class pc on pc.relname = c.table_name
         join pg_namespace pn on pn.oid = pc.relnamespace and pn.nspname = 'public'
         where c.table_schema = 'public' and pc.relkind = 'r'
         order by c.table_name, c.ordinal_position`
      );
      const pks = await db.query(`select cls.relname as table_name, att.attname as column_name
         from pg_constraint con
         join pg_class cls on cls.oid = con.conrelid
         join pg_namespace ns on ns.oid = cls.relnamespace and ns.nspname = 'public'
         join lateral unnest(con.conkey) as k(attnum) on true
         join pg_attribute att on att.attrelid = cls.oid and att.attnum = k.attnum
         where con.contype = 'p'`);
      const fks = await db.query(`select cls.relname as table_name, att.attname as column_name,
                fcls.relname as ref_table, fatt.attname as ref_column
         from pg_constraint con
         join pg_class cls on cls.oid = con.conrelid
         join pg_namespace ns on ns.oid = cls.relnamespace and ns.nspname = 'public'
         join pg_class fcls on fcls.oid = con.confrelid
         join lateral unnest(con.conkey) with ordinality as ck(attnum, ord) on true
         join lateral unnest(con.confkey) with ordinality as fk(attnum, ord) on fk.ord = ck.ord
         join pg_attribute att on att.attrelid = cls.oid and att.attnum = ck.attnum
         join pg_attribute fatt on fatt.attrelid = fcls.oid and fatt.attnum = fk.attnum
         where con.contype = 'f'`);
      const enums = await db.query(`select t.typname, e.enumlabel
         from pg_enum e join pg_type t on t.oid = e.enumtypid
         order by t.typname, e.enumsortorder`);
      const enumMap = /* @__PURE__ */ new Map();
      for (const r of enums.rows) {
        const list = enumMap.get(r.typname) ?? [];
        list.push(r.enumlabel);
        enumMap.set(r.typname, list);
      }
      const tableMap = /* @__PURE__ */ new Map();
      for (const r of cols.rows) {
        let t = tableMap.get(r.table_name);
        if (!t) {
          t = {
            name: r.table_name,
            columns: [],
            primaryKey: [],
            foreignKeys: []
          };
          tableMap.set(r.table_name, t);
        }
        t.columns.push({
          name: r.column_name,
          dataType: r.data_type,
          udtName: r.udt_name,
          nullable: r.is_nullable === "YES",
          hasDefault: r.column_default !== null,
          isGenerated: !!r.is_generated && r.is_generated !== "NEVER",
          isIdentity: r.is_identity === "YES",
          maxLength: r.character_maximum_length,
          enumValues: enumMap.get(r.udt_name)
        });
      }
      for (const r of pks.rows) tableMap.get(r.table_name)?.primaryKey.push(r.column_name);
      for (const r of fks.rows) tableMap.get(r.table_name)?.foreignKeys.push({
        column: r.column_name,
        refTable: r.ref_table,
        refColumn: r.ref_column
      });
      const tables = Array.from(tableMap.values());
      if (tables.length === 0) {
        throw new Error("No tables found — the DDL must create at least one table.");
      }
      if (tables.length > MAX_TABLES) {
        throw new Error(`Demo is capped at ${MAX_TABLES} tables (you created ${tables.length}). The CLI has no such cap.`);
      }
      const sort = topoSortDemo(tables);
      if (sort.cycle) {
        throw new Error(`FK cycle with no nullable back-edge: ${sort.cycle.join(", ")}. Make one FK column on the cycle nullable (the CLI gives the same guidance).`);
      }
      setRunMeta({
        order: sort.order.map((t) => t.name),
        broken: sort.brokenEdges
      });
      const fkCols = (t) => new Set(t.foreignKeys.map((f) => f.column));
      const generatable = (t) => t.columns.filter((c) => !c.isGenerated && !c.isIdentity && !c.hasDefault && !fkCols(t).has(c.name));
      setPhase("generate");
      const requestTables = sort.order.map((t) => ({
        name: t.name,
        columns: generatable(t).map((c) => ({
          name: c.name,
          dataType: c.dataType,
          udtName: c.udtName,
          nullable: c.nullable,
          maxLength: c.maxLength,
          ...c.enumValues ? {
            enumValues: c.enumValues
          } : {}
        }))
      })).filter((t) => t.columns.length > 0);
      let generated = {};
      if (requestTables.length > 0) {
        const res = await fetch("/api/public/demo/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            profile,
            rows: ROWS_PER_TABLE,
            tables: requestTables
          })
        });
        if (res.status === 429) {
          throw new Error("Demo rate limit reached — it runs on our API bill. Install the CLI (free tier, your key) for unlimited runs.");
        }
        if (res.status === 503) {
          throw new Error("The demo backend is not configured right now. The CLI works regardless: npm i -g @passkeybridge/satus");
        }
        if (!res.ok) {
          throw new Error("Generation failed upstream. Try again in a minute.");
        }
        const body = await res.json();
        generated = body.tables;
      }
      setPhase("insert");
      const brokenByTable = /* @__PURE__ */ new Map();
      for (const e of sort.brokenEdges) {
        const set = brokenByTable.get(e.table) ?? /* @__PURE__ */ new Set();
        set.add(e.column);
        brokenByTable.set(e.table, set);
      }
      const pkPool = /* @__PURE__ */ new Map();
      const tableResults = [];
      for (const t of sort.order) {
        const gen = generated[t.name] ?? [];
        const fkSet = fkCols(t);
        const broken = brokenByTable.get(t.name) ?? /* @__PURE__ */ new Set();
        const insertCols = t.columns.filter((c) => !c.isGenerated && !c.isIdentity && !c.hasDefault).map((c) => c.name);
        const rejected = [];
        let inserted = 0;
        const returnedPks = [];
        for (let i = 0; i < ROWS_PER_TABLE; i++) {
          const source = gen[i] ?? {};
          const row = {};
          let skip = null;
          for (const col of insertCols) {
            if (fkSet.has(col)) {
              const fk = t.foreignKeys.find((f) => f.column === col);
              if (broken.has(col) || fk.refTable === t.name) {
                row[col] = null;
                continue;
              }
              const parents = pkPool.get(fk.refTable) ?? [];
              if (parents.length === 0) {
                const c = t.columns.find((x) => x.name === col);
                if (c?.nullable) {
                  row[col] = null;
                } else {
                  skip = `no parent rows for NOT NULL FK ${col} -> ${fk.refTable}`;
                }
                continue;
              }
              row[col] = pickRandom(parents)[fk.refColumn];
            } else {
              const v = source[col];
              row[col] = v !== null && typeof v === "object" ? JSON.stringify(v) : v ?? null;
            }
          }
          if (skip) {
            rejected.push({
              row: i + 1,
              message: skip
            });
            continue;
          }
          const colSql = insertCols.map(quoteIdent).join(", ");
          const params = insertCols.map((_, j) => `$${j + 1}`).join(", ");
          const returning = t.primaryKey.length > 0 ? ` returning ${t.primaryKey.map(quoteIdent).join(", ")}` : "";
          const sql = insertCols.length > 0 ? `insert into ${quoteIdent(t.name)} (${colSql}) values (${params})${returning}` : `insert into ${quoteIdent(t.name)} default values${returning}`;
          try {
            const r = await db.query(sql, insertCols.map((c) => row[c]));
            inserted += 1;
            if (r.rows[0]) returnedPks.push(r.rows[0]);
          } catch (e) {
            rejected.push({
              row: i + 1,
              message: e.message.split("\n")[0].slice(0, 160)
            });
          }
        }
        if (returnedPks.length > 0) pkPool.set(t.name, returnedPks);
        tableResults.push({
          name: t.name,
          inserted,
          rejected,
          columns: [],
          rows: []
        });
      }
      for (const e of sort.brokenEdges) {
        const parents = pkPool.get(e.refTable) ?? [];
        if (parents.length === 0) continue;
        const child = tableMap.get(e.table);
        if (child.primaryKey.length === 0) continue;
        const pkCols = child.primaryKey.map(quoteIdent).join(", ");
        const nulls = await db.query(`select ${pkCols} from ${quoteIdent(e.table)} where ${quoteIdent(e.column)} is null`);
        for (const r of nulls.rows) {
          const where = child.primaryKey.map((c, i) => `${quoteIdent(c)} = $${i + 2}`).join(" and ");
          await db.query(`update ${quoteIdent(e.table)} set ${quoteIdent(e.column)} = $1 where ${where}`, [pickRandom(parents)[e.refColumn], ...child.primaryKey.map((c) => r[c])]);
        }
      }
      for (const tr of tableResults) {
        const sel = await db.query(`select * from ${quoteIdent(tr.name)} limit ${ROWS_PER_TABLE}`);
        tr.rows = sel.rows;
        tr.columns = sel.rows[0] ? Object.keys(sel.rows[0]) : [];
      }
      setResults(tableResults);
      setPhase("done");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    } finally {
      running.current = false;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { sections: SECTIONS, currentPath: "/demo", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "try", n: "01", label: "Try it", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "paste a schema. get real rows. nothing to install." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "This page runs ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "real Postgres" }),
        " (compiled to WASM) in your browser. Your DDL never leaves the tab — only column names and types are sent to our server for the one model call, on our API bill. Capped at ",
        ROWS_PER_TABLE,
        " rows across",
        " ",
        MAX_TABLES,
        " tables; the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quickstart", className: "link-underline", children: "CLI" }),
        " ",
        "has no such caps and runs against your own database with your own key."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 max-w-[760px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: ddl, onChange: (e) => setDdl(e.target.value), spellCheck: false, rows: 16, "aria-label": "Postgres DDL", className: "w-full resize-y border border-[var(--ink)] bg-transparent px-4 py-3 font-mono text-[13px] leading-[1.7] text-[var(--ink)] outline-none focus:border-[var(--signal)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--mute)]", children: [
            "profile",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: profile, onChange: (e) => setProfile(e.target.value), className: "ml-3 border border-[var(--hairline)] bg-transparent px-2 py-1 font-mono text-[13px] normal-case tracking-normal text-[var(--ink)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ecommerce", children: "ecommerce" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "saas", children: "saas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "b2b", children: "b2b" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: run, disabled: phase !== "idle" && phase !== "done" && phase !== "error", className: "border border-[var(--ink)] bg-[var(--ink)] px-5 py-2 font-mono text-[13px] text-[var(--paper)] transition-opacity disabled:opacity-50", children: phase === "idle" || phase === "done" || phase === "error" ? "run demo →" : PHASE_LABEL[phase] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 border-l-2 border-[var(--signal)] pl-4 font-mono text-[13px] text-[var(--ink)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: "error · " }),
          error
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "results", n: "02", label: "Results", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what actually landed." }), children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Run the demo above. You’ll see the FK-dependency order satus derived, any cycle it broke, and the rows Postgres accepted — including anything it rejected, shown honestly." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[900px]", children: [
      runMeta && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[12.5px] text-[var(--mute)]", children: [
        "order · ",
        runMeta.order.join(" → "),
        runMeta.broken.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "cycles · ",
          runMeta.broken.map((b) => `${b.table}.${b.column} → ${b.refTable} (deferred + back-patched)`).join(", ")
        ] })
      ] }),
      results.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--signal)]", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-[var(--hairline)]", children: "|" }),
          t.inserted,
          " inserted",
          t.rejected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-[var(--hairline)]", children: "|" }),
            t.rejected.length,
            " rejected by constraints"
          ] })
        ] }),
        t.rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 overflow-x-auto border-y border-[var(--hairline)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full font-mono text-[12px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left text-[var(--mute)]", children: t.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "whitespace-nowrap px-3 py-2 font-normal", children: c }, c)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: t.rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-[var(--hairline)] align-top", children: t.columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[220px] truncate px-3 py-2", children: r[c] === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--mute)]", children: "null" }) : String(r[c]) }, c)) }, i)) })
        ] }) }),
        t.rejected.map((rej) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-mono text-[12px] text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--signal)]", children: [
            "row ",
            rej.row
          ] }),
          " · ",
          rej.message
        ] }, rej.row))
      ] }, t.name))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "reality", n: "03", label: "Demo vs CLI", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "what the demo skips." }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "The demo is the toy version: ",
        ROWS_PER_TABLE,
        " rows, ",
        MAX_TABLES,
        " tables, one shared rate-limited key, and no partitioned-table handling. The CLI introspects your live database, handles partitions and deferrable constraints, wraps every run in a single transaction with a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--max-cost" }),
        " budget, and validates offline with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "--dry-run" }),
        ". Install it with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "npm i -g @passkeybridge/satus" }),
        " — the free tier needs no signup."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quickstart", className: "link-underline font-mono text-[13px]", children: "read the quickstart →" }) })
    ] })
  ] });
}
export {
  DemoPage as component
};
