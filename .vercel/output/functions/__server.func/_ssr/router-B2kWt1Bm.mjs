import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { A as Analytics } from "../_libs/vercel__analytics.mjs";
import { f } from "../_libs/marked.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import crypto$1 from "node:crypto";
import { v as verifyWebhook, c as createStripeClient } from "./stripe.server-BpuPeHCa.mjs";
import { r as render } from "../_libs/react-email__render.mjs";
import { H as Html } from "../_libs/react-email__html.mjs";
import { H as Head } from "../_libs/react-email__head.mjs";
import { P as Preview } from "../_libs/react-email__preview.mjs";
import { B as Body } from "../_libs/react-email__body.mjs";
import { C as Container } from "../_libs/react-email__container.mjs";
import { S as Section } from "../_libs/react-email__section.mjs";
import { T as Text } from "../_libs/react-email__text.mjs";
import { H as Heading } from "../_libs/react-email__heading.mjs";
import { H as Hr } from "../_libs/react-email__hr.mjs";
import { L as Link$1 } from "../_libs/react-email__link.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, e as enumType, b as booleanType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "util";
import "crypto";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/stripe.mjs";
import "events";
import "http";
import "https";
import "os";
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
const appCss = "/assets/styles-BjfnKzoi.css";
function PaymentTestModeBanner() {
  return null;
}
function BoundaryShell({
  code,
  label: label2,
  title,
  detail,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      role: "main",
      className: "satus-fade flex min-h-dvh items-center bg-[var(--paper)] px-6 py-16 text-[var(--ink)]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--signal)]", children: [
            "§",
            code
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label2 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-mono text-[28px] font-medium leading-[1.2] tracking-tight md:text-[34px]", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
        detail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-[var(--ink)]/80", children: detail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap items-center gap-3", children })
      ] })
    }
  );
}
function PrimaryAction(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...props,
      className: "inline-flex h-10 items-center whitespace-nowrap bg-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]"
    }
  );
}
function SecondaryLink({
  to,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      className: "inline-flex h-10 items-center whitespace-nowrap border border-[var(--ink)] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)]",
      children
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    BoundaryShell,
    {
      code: "404",
      label: "Not found",
      title: "this address isn't in the specification.",
      detail: "The page you requested doesn't exist or has moved. Nothing was logged about you for arriving here.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryLink, { to: "/", children: "go home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryLink, { to: "/quickstart", children: "read the quickstart" })
      ]
    }
  );
}
function ErrorComponent({ error, reset }) {
  if (typeof window !== "undefined") {
    console.error("[satus] route error:", error);
  }
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    BoundaryShell,
    {
      code: "ERR",
      label: "Route failed",
      title: "something broke while rendering this page.",
      detail: "A transient error stopped the page from loading. Retrying will re-run the loader; going home will reset the route.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PrimaryAction,
          {
            onClick: () => {
              router2.invalidate();
              reset();
            },
            children: "retry"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryLink, { to: "/", children: "go home" })
      ]
    }
  );
}
const Route$z = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      {
        name: "description",
        content: "CLI that reads your Postgres schema and writes realistic, FK-safe seed data in seconds. Postgres only. CLI only."
      },
      { name: "author", content: "satus.sh" },
      { name: "theme-color", content: "#fafaf7" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "satus" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@satusdev" },
      { property: "og:title", content: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      { name: "twitter:title", content: "satus.sh—Realistic Postgres seed data, FK-safe CLI" },
      { property: "og:description", content: "Realistic, FK-safe Postgres seed data. satus reads your schema, resolves dependencies, and writes inserts that load on the first try." },
      { name: "twitter:description", content: "Realistic, FK-safe Postgres seed data. satus reads your schema, resolves dependencies, and writes inserts that load on the first try." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // SVG favicon stays sharp at any DPR; modern browsers prefer it over .ico.
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      // 180×180 PNG fallback for Safari iOS home-screen / pinned-tab. Without
      // this Safari grabs a page screenshot, which renders the Swiss-Red shell
      // as an illegible thumbnail.
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }
    ],
    scripts: [
      // Ahrefs Web Analytics. Privacy-respecting, cookieless pageview
      // tracking. Loaded async so it never blocks the document; the data-key
      // binds the script to the satus.sh property in the Ahrefs dashboard.
      {
        src: "https://analytics.ahrefs.com/analytics.js",
        "data-key": "rwXxEkXYUzPB4EEg0oXcPw",
        async: true
      },
      // Sitewide Organization schema. Identifies the publisher (PasskeyBridge
      // LLC) and product (satus) for Google Knowledge Graph and generative
      // engines. Logo points at the favicon; sameAs lists canonical
      // off-site identities so disambiguation across the web is unambiguous.
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://satus.sh/#org",
              name: "satus",
              legalName: "PasskeyBridge LLC",
              url: "https://satus.sh",
              logo: "https://satus.sh/favicon.svg",
              email: "support@satus.sh",
              sameAs: [
                "https://github.com/passkeybridge/satus",
                "https://www.npmjs.com/package/@passkeybridge/satus"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://satus.sh/#site",
              url: "https://satus.sh",
              name: "satus.sh",
              publisher: { "@id": "https://satus.sh/#org" },
              inLanguage: "en"
            }
          ]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Analytics, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$z.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentTestModeBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
const $$splitComponentImporter$k = () => import("./unsubscribe-CiUV58B7.mjs");
const SITE_URL$l = "https://satus.sh";
const Route$y = createFileRoute("/unsubscribe")({
  validateSearch: (s) => ({
    token: typeof s.token === "string" ? s.token : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component"),
  head: () => ({
    meta: [{
      title: "Unsubscribe—satus.sh"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$l + "/unsubscribe"
    }]
  })
});
const $$splitComponentImporter$j = () => import("./terms-BEYm1QMJ.mjs");
const SITE_URL$k = "https://satus.sh";
const Route$x = createFileRoute("/terms")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
  head: () => ({
    meta: [{
      title: "Terms of Service—satus"
    }, {
      name: "description",
      content: "Terms of Service for the satus.sh CLI and marketing site, operated by PasskeyBridge LLC. Effective May 26, 2026."
    }, {
      property: "og:title",
      content: "Terms of Service—satus"
    }, {
      property: "og:description",
      content: "Terms governing use of the satus.sh CLI, license API, and marketing site. Operated by PasskeyBridge LLC."
    }, {
      property: "og:url",
      content: SITE_URL$k + "/terms"
    }, {
      property: "og:type",
      content: "article"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$k + "/terms"
    }]
  })
});
const __vite_glob_0_0 = '---\nslug: cyclic-fks-in-the-wild\ntitle: Cyclic foreign keys in the wild\ndescription: Most seed-data tools pretend cycles don\'t exist. They do. Here is how satus splits the graph, inserts with NULLs, and back-patches in a second pass.\ndate: 2026-05-26\nauthor: satus.sh\ntags: [postgres, foreign-keys, graphs, seeding]\ndraft: false\n---\n\nThe textbook description of seeding a relational database is: topologically sort the table dependency graph, then insert in order. Parent rows first, child rows next, done. It works exactly until you meet the first schema with a cycle, which — in our experience with private SaaS, marketplace, and audit-heavy schemas — is common enough that no production seed tool can pretend cycles are an edge case. (The structural audit of five public OSS schemas we publish at [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json) found zero FK cycles across 227 foreign keys; cycles primarily live in private codebases where the bootstrap row was always the awkward case.)\n\nThis post walks through how [satus](/) detects cycles in the foreign-key graph, why we refuse to disable constraints during a seed run, and the two-pass insert strategy we settled on after burning a few weekends on alternatives.\n\n## Where cycles actually come from\n\nCycles in a foreign-key graph are almost never an accident. The three patterns we keep seeing:\n\n1. **User ↔ Organization with a "primary owner" pointer.** `organizations.owner_id → users.id`, `users.org_id → organizations.id`. Both columns are NOT NULL on paper, then nullable in practice for the bootstrap row.\n2. **Audit tables that point at the actor.** `audit_log.user_id → users.id`, and a `users.last_audit_id → audit_log.id` denormalized cache. Read-heavy workloads love this; seeders hate it.\n3. **Self-referential trees with a "root" sentinel.** `categories.parent_id → categories.id` plus `categories.root_id → categories.id`. Technically a cycle of length one on each row, which most off-the-shelf tools handle wrong.\n\nThe Postgres catalog will happily let you create all three. `pg_constraint` records the foreign keys ([pg_catalog.pg_constraint](https://www.postgresql.org/docs/current/catalog-pg-constraint.html)) and never warns about cyclical reachability—that\'s an application-level concern.\n\n## What "the right answer" is not\n\nBefore describing what satus does, it is worth naming the three approaches we rejected.\n\n**Disable triggers, insert, re-enable.** `ALTER TABLE … DISABLE TRIGGER ALL` is a sledgehammer that requires superuser, silently bypasses CHECK constraints implemented as triggers, and leaves you owning the correctness of every NOT NULL column. Production roles often cannot run it at all.\n\n**`SET CONSTRAINTS ALL DEFERRED`.** This is the textbook Postgres answer ([SET CONSTRAINTS docs](https://www.postgresql.org/docs/current/sql-set-constraints.html)), and it is the right answer when the schema author actually declared the constraints `DEFERRABLE`. The catch: most teams never override the default. The default is `NOT DEFERRABLE`, and `SET CONSTRAINTS` on a non-deferrable constraint is an error, not a no-op.\n\n**Insert with `ON CONFLICT DO NOTHING` and hope.** This is the YOLO approach. It produces databases that load without errors and fail at the first JOIN.\n\n## What satus does instead\n\nThe actual algorithm is unglamorous, which is the point.\n\n```text\n1. Read pg_constraint, build a directed graph G where an edge\n   (T_a → T_b) means "T_a has a foreign key into T_b".\n2. Run Kahn\'s algorithm. Output the topological order S, plus\n   the set of edges E_back that had to be ignored to make S\n   acyclic (the "back-edges").\n3. For every back-edge (T_a → T_b) on column c, mark c as\n   "deferred-fill". The column must be nullable, or the column\n   must have a usable DEFAULT, or we abort with a clear error.\n4. Pass 1: insert rows in topological order S. Deferred-fill\n   columns are inserted as NULL.\n5. Pass 2: walk E_back. For each back-edge, run a single\n   UPDATE that joins the now-populated child table and fills\n   the deferred column with a row id drawn from the realistic\n   distribution defined by the profile.\n6. Wrap the whole thing in one transaction. If pass 2 cannot\n   satisfy a NOT NULL constraint, the transaction rolls back\n   and the user sees a structured diagnostic, not a partial seed.\n```\n\nKahn\'s algorithm is the one from the 1962 paper ([original on ACM](https://dl.acm.org/doi/10.1145/368996.369025)); there is nothing clever in step 2. The interesting work is in step 3, deciding which side of the cycle to defer. The heuristic we use:\n\n```text\nprefer to defer the column that:\n  1. is nullable,                              else\n  2. has a DEFAULT,                            else\n  3. participates in fewer downstream FKs,     else\n  4. is alphabetically later (deterministic tiebreaker).\n```\n\nThe tiebreaker matters more than it sounds. Determinism means two runs against the same schema produce the same insert order, which means the same fixture, which means CI is reproducible.\n\n### The three production patterns, scored\n\nThe patterns from the opening, with how each one is resolved:\n\n| Cycle pattern                          | Deferred column          | Reason chosen                  | Resolution cost (rows scanned in pass 2) |\n| -------------------------------------- | ------------------------ | ------------------------------ | ---------------------------------------- |\n| organizations ↔ users (owner_id)       | `organizations.owner_id` | nullable; users has more FKs   | N(organizations)                         |\n| audit_log ↔ users (last_audit_id)      | `users.last_audit_id`    | nullable; trivially back-patch | N(users)                                 |\n| categories self-ref (root_id)          | `categories.root_id`     | nullable; same table           | N(categories)                            |\n\nPass 2 is always a single bulk UPDATE per back-edge, never a row-at-a-time loop. The cost is linear in the number of rows in the deferring table, not in the product.\n\n### The shape of the work\n\nThe cost structure is what matters here, not specific seconds on one laptop. For a three-cycle schema with `users ↔ organizations`, `users ↔ audit_log`, and `categories` self-referential:\n\n```text\ntable          pass 1 (insert, topological order)   pass 2 (back-patch UPDATE)\nusers          bounded by N(users)                  —\norganizations  bounded by N(organizations)          bounded by N(organizations)\naudit_log      bounded by N(audit_log)              —\ncategories     bounded by N(categories)             bounded by N(categories)\n```\n\nPass 2 is always a single bulk `UPDATE` per back-edge, never row-at-a-time. Its cost is linear in the number of rows in the **deferring** table, not in the product of the two tables. In the typical SaaS shape—many users, fewer organizations, very many audit rows—pass 2 touches only the organizations table for the `owner_id` back-edge and only the users table for the `last_audit_id` back-edge. The 1M-row audit_log never appears in pass 2 because no back-edge defers onto it.\n\nThat property is the whole reason this approach is viable on schemas with cycles and millions of rows: the back-patch work scales with the smaller side.\n\n## Why we will not "just turn off constraints"\n\nThis comes up in every other support ticket, so it gets its own section.\n\nWhen the seed run finishes, the database has to be **observationally indistinguishable from a database that was filled by your application running normally**. If satus disables constraints and re-enables them at the end, two bad things happen:\n\n- A failed pass 2 can leave the database in a state where constraints get re-enabled over invalid rows. Postgres will accept this; the next `pg_dump` and restore will fail.\n- Validation logic implemented as triggers (very common for audit columns and cross-row invariants Postgres CHECK cannot express) gets silently bypassed, which means the seeded fixture lies about what real inserts look like.\n\nThe whole point of schema-aware seeding is that the data passes every constraint the application would have passed it through. The moment a tool starts disabling things, it has stopped being a seeder and started being a `pg_restore` for fake data.\n\n## Where this fits in satus\n\nThe cycle handling described here is part of the default planner; there is no flag to enable. Generate seed data for your schema with:\n\n```bash\nsatus generate --profile saas\n```\n\nThe [quickstart](/quickstart) shows the full setup. The [saas-subscriptions profile](/profiles#saas-subscriptions) is the one we built specifically to exercise cycles, so it is a good first run if you want to see the planner do real work.\n\n## References\n\n- PostgreSQL documentation, [Constraints (foreign keys, DEFERRABLE)](https://www.postgresql.org/docs/current/ddl-constraints.html).\n- PostgreSQL documentation, [SET CONSTRAINTS](https://www.postgresql.org/docs/current/sql-set-constraints.html).\n- PostgreSQL documentation, [pg_catalog.pg_constraint](https://www.postgresql.org/docs/current/catalog-pg-constraint.html).\n- Kahn, A. B. (1962). [Topological sorting of large networks](https://dl.acm.org/doi/10.1145/368996.369025). *Communications of the ACM*, 5(11), 558–562.\n- Earlier in this log: [Introducing the satus log](/blog/introducing-the-log).\n- The corpus underlying this post\'s structural counts: [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json) (5 schemas, 151 tables, 227 FKs, Postgres 17).\n\n—the satus.sh team\n';
const __vite_glob_0_1 = '---\nslug: introducing-the-log\ntitle: Introducing the satus log\ndescription: A plain-text changelog and field notebook for schema-aware seed data, written for engineers who read RFCs for fun.\ndate: 2026-05-26\nauthor: satus.sh\ntags: [meta, postgres]\ndraft: false\n---\n\n> **Editor\'s note (2026-07-16):** The "profile deep-dives" bullet lists names (`medical-booking`, `e-commerce`, `saas-subscriptions`) that reflect early naming. The shipped CLI (v0.3.5) uses `saas`, `ecommerce`, `b2b`. See [/profiles](/profiles) for current behavior.\n\n\n\nThis is where we publish post-mortems on real production schemas, notes on\nPostgres internals that surprised us, and changelog entries for the satus\nCLI. No growth-hacked headlines, no listicles, no "Top 10 Reasons" posts.\n\n## What you can expect\n\n- **Schema reports.** We see hundreds of `CREATE TABLE` statements a week.\n  When a pattern keeps biting people (cyclic FKs, partitioned tables with\n  RLS, JSONB columns that are secretly relational), we\'ll write it up.\n- **Profile deep-dives.** Each official profile (medical-booking,\n  e-commerce, saas-subscriptions) gets a write-up explaining the heuristics\n  it encodes and the trade-offs we made.\n- **CLI changelogs.** Every release ships with a post explaining what\n  changed and why, in prose, not just a git log.\n- **Field notes.** Edge cases from support tickets, anonymized and\n  generalized into something useful.\n\n## What you will not see\n\nNo SEO farm posts. No AI-generated filler. No "What is a foreign key?"\ncontent aimed at search-engine bots. If it isn\'t useful to someone who\nalready ships Postgres for a living, we won\'t publish it.\n\n## Subscribe\n\nThe full feed is at [/blog/rss.xml](/blog/rss.xml). Add it to whichever\nreader you already use. There is no email newsletter and there are no\ntracking pixels.\n\n—the satus.sh team\n';
const __vite_glob_0_2 = '---\nslug: null-vs-not-null-is-not-the-question\ntitle: NULL vs NOT NULL is not the question\ndescription: A support ticket about a nullable column that broke an app. The real question is what NULL means to your code, and Postgres gives you three answers, not two.\ndate: 2026-05-27\nauthor: satus.sh\ntags: [postgres, null, semantics, seeding]\ndraft: false\n---\n\n> **Editor\'s note (2026-07-16):** Sections that reference a `medical-booking` profile describe design intent from spring 2026. The shipped CLI (v0.3.5) ships `saas`, `ecommerce`, and `b2b` prompt profiles; see [/profiles](/profiles). The NULL-vs-NOT-NULL argument stands independent of that profile detail.\n\n\n\nA user filed a bug last week. Paraphrased: *"satus filled a nullable column with realistic values and my app crashed in production-shaped tests. The column is nullable, why is your tool inventing data for it?"* The column was `users.deleted_at`. The app treated `NULL` as "active" and any non-null timestamp as "soft-deleted". satus had cheerfully seeded ~30% of the rows with valid timestamps. The test suite then asked the catalog for active users, got two-thirds of what it expected, and 47 tests turned red at once.\n\nThe reporter was right that we shipped the wrong default. They were also accidentally illustrating a deeper point: `NULL` versus `NOT NULL` is the wrong axis. The real axis is **what the column\'s NULL state means to the application that reads it**, and Postgres exposes three encodings for that, not two.\n\n## The three encodings\n\nMost schema reviews assume two states for any column: it has a value, or it is `NULL`. The Postgres catalog disagrees. A column can be:\n\n| Encoding         | Storage when "absent"            | Read by application as              | Catalog signal                          |\n| ---------------- | -------------------------------- | ----------------------------------- | --------------------------------------- |\n| **Nullable**     | `NULL`                           | "unknown" *or* a domain sentinel    | `attnotnull = false`, no default        |\n| **Defaulted**    | the `DEFAULT` expression\'s value | a real value the app never wrote    | `attnotnull = false/true`, `atthasdef`  |\n| **Generated**    | computed from other columns      | derived, never authored by the app  | `attgenerated = \'s\'` (stored)           |\n\nGenerated columns ([PostgreSQL docs: Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html)) landed in Postgres 12 and remain under-used in practice — a structural audit of five public OSS schemas covering 1,095 columns ([`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json)) found zero generated columns. They are the answer to a surprising number of seeding bugs, and we get to them at the end.\n\nThe bug from the opening was a category error between the first two rows of that table. `deleted_at` is nullable in the catalog, but in the application\'s mental model it is a **defaulted column whose default is NULL**. Those are not the same column.\n\n## Why "nullable" is not a signal\n\nThe mistake satus made was treating "is the column nullable?" as the entire question. In hindsight the heuristic was naive: if `attnotnull = false` and there is no `DEFAULT`, generate a value with the column\'s distribution `frac_null` of the time, where `frac_null` was a profile-wide constant.\n\nThat heuristic is fine for `users.middle_name` and wrong for `users.deleted_at`. Both look identical to the catalog:\n\n```sql\n-- both columns produce identical pg_attribute rows\nALTER TABLE users ADD COLUMN middle_name text;\nALTER TABLE users ADD COLUMN deleted_at  timestamptz;\n```\n\n`pg_attribute` records `attnotnull`, `atthasdef`, and `attgenerated`. It does not record *intent*. The information that distinguishes "unknown middle name" from "this user is alive" lives only in the application code, and no amount of catalog introspection will recover it.\n\nWhat the catalog does record, and what we now lean on much harder, is the **shape of the column relative to its siblings**. Three signals turn out to carry most of the intent:\n\n```text\nsignal                              evidence in catalog / stats\n─────────────────────────────────── ─────────────────────────────────────\nname suffix matches a sentinel set  attname LIKE \'%_at\' AND atttypid =\n  (deleted_at, archived_at,           timestamptz; OR attname IN\n  closed_at, banned_at, …)            (\'archived\',\'is_deleted\',\'closed\')\n\npartial index uses the column as    pg_index.indpred references attnum\n  a predicate                         AND uses IS NULL / IS NOT NULL\n\ncolumn appears in a CHECK that      pg_constraint.conbin references it\n  treats NULL as a state              AND consrc contains \'IS NULL\'\n```\n\nWhen any of these three fires, satus treats the column as a **defaulted-to-NULL state flag** and overrides `frac_null` to a profile-controlled value that is much closer to 1.0—typically 0.95 to 0.99 for soft-delete flags, because in the long run most rows in a healthy table are not deleted.\n\n## A heuristic, not a guarantee\n\nWe were initially tempted to make the rule a guarantee: *if the column smells like a state flag, always seed it 100% NULL*. We backed off for two reasons.\n\nFirst, fixtures that test the deleted state are exactly the fixtures that should contain deleted rows. The 47 broken tests in the opening ticket were the *interesting* tests; the rest of the suite was happy. A flat 100% NULL would have moved the failure from "too many soft-deletes" to "no soft-deletes in the deleted-user E2E test", and someone would have filed the inverse ticket the next day.\n\nSecond, "smells like" is a heuristic. The reverse case, a column called `closed_at` that is actually a real timestamp with no special semantics, exists. We have seen it in trading systems where every order has a close time and `NULL` truly means "still open" in the Postgres sense, *and* the application reads it that way without surprise. In that schema the original 30%-non-null default was correct.\n\nThe resolution is a profile-tunable knob with a name that admits it is a heuristic. From the `saas-subscriptions` profile:\n\n```text\nstate_flag_columns:\n  match:\n    - name_suffix: [_at, _on]\n      type: [timestamptz, timestamp, date]\n    - name_glob: [is_*, has_*]\n      type: [boolean]\n  frac_null: 0.97          # 97% of rows are NULL = "not in that state"\n  except:                  # explicit override list\n    - orders.closed_at     # this one is real, leave it alone\n```\n\nTwo-line YAML, one bug class avoided.\n\n## The third option: generated columns\n\nIf you control the schema, generated columns ([PostgreSQL docs](https://www.postgresql.org/docs/current/ddl-generated-columns.html)) eliminate the entire question for derived state. A stored generated column is *uninsertable*. satus refuses to write to it, the application cannot write to it, and the value is always consistent with its inputs. The catalog signals this with `attgenerated = \'s\'`, which is unambiguous in a way that "nullable with no default" is not.\n\nThe pattern we recommend in customer schema reviews:\n\n```sql\n-- BEFORE: state encoded in a nullable column the app sets by hand\nALTER TABLE users ADD COLUMN status text;  -- \'active\' | \'deleted\' | NULL?\n\n-- AFTER: state derived from the underlying timestamp\nALTER TABLE users\n  ADD COLUMN deleted_at timestamptz,\n  ADD COLUMN is_active boolean\n    GENERATED ALWAYS AS (deleted_at IS NULL) STORED;\n```\n\nNow there is exactly one place that records the soft-delete event (`deleted_at`), exactly one place the app reads to check liveness (`is_active`), and they cannot drift. Indexes on `is_active` work. Foreign keys can target it. satus seeds `deleted_at`, ignores `is_active`, and the resulting fixture matches what the application would produce.\n\nThe Postgres wiki has a related cautionary list ([Don\'t Do This](https://wiki.postgresql.org/wiki/Don%27t_Do_This)) that touches on a few NULL anti-patterns. The deeper rabbit hole is C. J. Date\'s well-known critique that SQL has, depending on how you count, three- or four-valued logic ([Null (SQL) on Wikipedia](https://en.wikipedia.org/wiki/Null_(SQL))). Real applications do not run on three-valued logic; they run on whatever the application code reduces NULL to. Generated columns let you write that reduction down once.\n\n## What changed in satus\n\nConcretely, since v0.1.1:\n\n- `frac_null` is no longer a single global. It is per-column, with the heuristics above as defaults and explicit profile overrides.\n- The dry-run planner (`satus plan`) prints every column it flagged as a state-flag, with the signal that fired, so the override list is discoverable instead of buried.\n- Generated columns are detected via `pg_attribute.attgenerated` and skipped in pass 1 entirely. Previous versions silently wrote `NULL` and relied on the database to compute the right value, which works but produces noisier diffs in `INSERT` logs.\n\nDistribution of `frac_null` overrides we have ended up shipping, across the three built-in profiles:\n\n```text\nprofile              # state-flag    median frac_null    range\n                       columns hit\nsaas-subscriptions   12              0.97                0.90 – 0.995\nmedical-booking      7               0.94                0.85 – 0.99\necommerce            9               0.96                0.88 – 0.99\n```\n\n`medical-booking` skews lower because more of its "state" columns are genuinely populated (appointments get `checked_in_at`, `seen_at`, `discharged_at` in sequence and the long tail of completed visits dominates).\n\n## The shorter version\n\nNULL is not a value, and "nullable" is not a property of an application, only of a column. Before you ask whether satus should fill a column, ask what the application code does when it reads NULL there. If it reads NULL as "absent information", a sparse distribution is correct. If it reads NULL as "this row is in state X", you want the state, not the absence, and the catalog cannot tell you which it is. Tell the seeder explicitly. Or, better, tell Postgres explicitly and use a generated column so the question stops being askable.\n\n## References\n\n- PostgreSQL documentation, [Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html).\n- PostgreSQL documentation, [Default Values](https://www.postgresql.org/docs/current/ddl-default.html).\n- PostgreSQL documentation, [Comparison functions and operators (IS NULL)](https://www.postgresql.org/docs/current/functions-comparison.html).\n- PostgreSQL documentation, [pg_catalog.pg_attribute](https://www.postgresql.org/docs/current/catalog-pg-attribute.html).\n- PostgreSQL wiki, [Don\'t Do This](https://wiki.postgresql.org/wiki/Don%27t_Do_This).\n- Wikipedia, [Null (SQL)](https://en.wikipedia.org/wiki/Null_(SQL)).\n- Earlier in this log: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [Introducing the satus log](/blog/introducing-the-log).\n\n—the satus.sh team\n';
const __vite_glob_0_3 = "---\nslug: medical-booking-profile\ntitle: \"Inside the medical-booking profile: why appointments are harder than they seem\"\ndescription: Appointments cluster around mid-morning and afternoon, never at 3am, almost never on holidays, and trail a long tail of no-shows. What the satus medical-booking profile encodes, and why.\ndate: 2026-05-28\nauthor: satus.sh\ntags: [profile, medical, distributions, postgres, seeding]\ndraft: false\n---\n\n> **Editor's note (2026-07-16):** This post describes profile-system design intent from spring 2026. The shipped CLI (v0.3.5) uses simpler prompt-based profiles — `saas`, `ecommerce`, `b2b` — with no YAML profile files, no `satus profile show`, and no separate `satus plan` subcommand (use `satus generate --dry-run`). See [/profiles](/profiles) for the current behavior. The post is preserved as-is for its schema-modeling arguments; treat the CLI ergonomics described here as design notes, not current commands.\n\n\n\nAppointment data looks easy and isn't. A uniformly random `timestamptz` between two dates will pass every NOT NULL constraint, every foreign key, and almost every CHECK clause your schema has, and it will still produce a fixture that no real clinic could ever generate. Appointments cluster around mid-morning and just-after-lunch, collapse at night, never happen on public holidays, and trail a long, lopsided distribution of cancellations, reschedules, and no-shows. If your tests, dashboards, or planner statistics depend on those shapes, uniformly random data is silently wrong. The `medical-booking` profile in [satus](/) is the choices we made about which of those shapes to encode and which to push back on the user. This post is the inventory.\n\nWe will cover three things: the distributions baked into the profile, the constraints we generate to keep them honest, and the things we deliberately chose not to model. The post assumes you have read [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild) and [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), because the profile leans on both ideas.\n\n## Why \"realistic\" is the whole job\n\nA schema-aware seeder has two failure modes. It can violate the schema, which the database catches loudly, or it can satisfy the schema with data that no production system would produce, which nothing catches until a customer reports a strange dashboard. The second failure mode is the one that motivates profiles at all. The `medical-booking` profile exists because half a dozen early users were patching the same five things by hand on top of generic seed output: business hours, weekends, holidays, no-show ratios, and the ordering of timestamps within a single appointment.\n\nA useful starting reference for how skewed real appointment behaviour is comes from the published literature on outpatient no-shows. Reported rates vary widely by specialty, setting, and country, and a published systematic review of the field is the most defensible starting point ([Dantas et al., 2018, \"No-shows in appointment scheduling – a systematic literature review\", *Health Policy* 122(4):412–421, PubMed 29482948](https://pubmed.ncbi.nlm.nih.gov/29482948/)). The exact rate is not the point. The point is that any fixture that treats `status = 'no_show'` as a 1%-of-rows curiosity will hide problems in code paths that, in production, fire constantly.\n\n## What the profile actually encodes\n\nThe profile is a YAML document the CLI reads at planning time. The fields below are the ones that matter for an appointments-shaped table; the full file ships with the binary and is dumped by `satus profile show medical-booking`. Distributions are intentionally coarse, not parameter-rich, because we would rather ship one defensible curve than a knob the user has to tune.\n\n| Shape | Encoded as | Default | Notes |\n| --- | --- | --- | --- |\n| Business hours | bimodal triangular over local time | peaks 10:00 and 14:00, floor 08:00, ceiling 18:00 | local to the row's clinic time zone, not UTC |\n| Day of week | weighted per-day multiplier | Mon–Fri 1.0, Sat 0.35, Sun 0.05 | Sat/Sun shaped by ambulatory-care patterns, not 0 |\n| Holidays | calendar-driven mask | US federal + configurable list | clinic time zone, not seeder host |\n| Appointment length | discrete distribution | 15m 0.55, 30m 0.30, 45m 0.10, 60m 0.05 | snapped to 5-minute grid |\n| Status | weighted categorical | scheduled 0.62, completed 0.20, no_show 0.10, cancelled 0.07, rescheduled 0.01 | tunable per profile run |\n| Lead time | log-normal in days | median ≈ 8d, p95 ≈ 45d | clipped at the schema's CHECK if present |\n| Per-provider load | Zipf-like over provider IDs | top provider ~3× the median | so query planners see realistic skew |\n\nThe \"status\" row is the one users override most. Our default mix sits inside the literature's range, but a teledermatology clinic and a paediatric ER do not have the same mix, and we make no claim that ours is the right one for either. A two-line override in the profile lets you swap it.\n\n```text\nstatus:\n  weights:\n    scheduled:   0.50\n    completed:   0.30\n    no_show:     0.05\n    cancelled:   0.13\n    rescheduled: 0.02\n```\n\nA quick visualisation of the default appointment-time distribution within a weekday, sampled at 30-minute buckets:\n\n```text\nappointments per 30-min bucket, weekday, defaults\n08:00 ███\n08:30 █████\n09:00 ████████\n09:30 ███████████\n10:00 ██████████████   ← morning peak\n10:30 █████████████\n11:00 ███████████\n11:30 ████████\n12:00 ████             ← lunch dip\n12:30 █████\n13:00 ████████\n13:30 ████████████\n14:00 ██████████████   ← afternoon peak\n14:30 █████████████\n15:00 ██████████\n15:30 ████████\n16:00 ██████\n16:30 ████\n17:00 ██\n17:30 █\n```\n\nTwo peaks, a midday dip, and zero coverage outside the local business window. Uniform random gives you a flat line at every bucket, including 03:00 on a Sunday.\n\n## Time zones, which are where this gets hard\n\nThe single largest source of bad appointment fixtures is treating `timestamptz` as if it were a wall-clock time. Postgres stores `timestamptz` as UTC and converts on read using the session's `TimeZone` setting ([PostgreSQL documentation: Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)). A naive seeder that samples \"between 09:00 and 17:00\" in the seeder's own time zone will produce 02:00 appointments for a clinic in Honolulu and 22:00 appointments for one in Auckland. Both pass the schema.\n\nThe profile takes the clinic's time zone from a configurable column path (default: `clinics.tz`, IANA name such as `America/Los_Angeles`) and samples the local hour in that zone, then converts to UTC for storage. If the column is missing, we degrade to the database's `current_setting('TimeZone')` and print a warning at plan time. The IANA Time Zone Database ([iana.org/time-zones](https://www.iana.org/time-zones)) is the canonical source we round-trip against; for Postgres specifics the `pg_timezone_names` catalogue is the practical surface ([PostgreSQL documentation: pg_timezone_names](https://www.postgresql.org/docs/current/view-pg-timezone-names.html)).\n\nHolidays are the same problem in a different costume. A US clinic's calendar is not a Brazilian clinic's calendar. The profile ships with US federal holidays as the default mask because we had to ship something, and exposes a `holiday_calendar` field that accepts either an ISO country code (resolved against a bundled list compiled from publicly documented sources) or an explicit array of `YYYY-MM-DD` dates. We do not pretend to know your clinic's observed holidays. We do refuse to generate a fixture full of appointments on Christmas Day unless you ask.\n\n## Constraints we recommend, and sometimes generate\n\nThe profile is more useful when the schema has constraints that match its shape, because the constraints catch the cases the profile alone cannot. Two we lean on heavily:\n\n```sql\n-- 1. No appointment can end before it starts.\nALTER TABLE appointments\n  ADD CONSTRAINT appt_time_ordered\n  CHECK (ends_at > starts_at);\n\n-- 2. A given provider cannot be double-booked.\n-- Requires the btree_gist extension.\nCREATE EXTENSION IF NOT EXISTS btree_gist;\nALTER TABLE appointments\n  ADD CONSTRAINT appt_no_overlap\n  EXCLUDE USING gist (\n    provider_id WITH =,\n    tstzrange(starts_at, ends_at, '[)') WITH &&\n  );\n```\n\nThe first is a plain `CHECK` and we always honour it. The second is an `EXCLUDE` constraint built on `tstzrange` and a GiST index, which is the canonical Postgres pattern for non-overlapping time ranges ([PostgreSQL documentation: EXCLUDE constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-EXCLUSION), [btree_gist](https://www.postgresql.org/docs/current/btree-gist.html)). Most appointment schemas we see do not have it; about a quarter that do have it had silently violating rows before they added it. When the constraint is present, `satus` switches from \"sample and hope\" to a retry-with-jitter strategy that keeps each provider's appointments disjoint. When the constraint is absent we still try, because two overlapping appointments for the same surgeon is a fixture nobody wants to debug.\n\n## Status transitions and the per-row timestamp chain\n\nA single appointment row in most schemas carries several timestamps that have to occur in the right order: `created_at`, `scheduled_for`, `checked_in_at`, `seen_at`, `discharged_at`, and sometimes `cancelled_at` or `no_show_marked_at`. The profile encodes the implicit state machine so that, for a row whose terminal status is `completed`, the timestamps satisfy:\n\n```text\ncreated_at  ≤  scheduled_for          (booked before the slot)\nchecked_in_at  ≤  scheduled_for + 15m (most patients arrive on time)\nchecked_in_at  ≤  seen_at             (you wait, then you are seen)\nseen_at        ≤  discharged_at       (the visit ends after it starts)\n```\n\nFor terminal `no_show`, `checked_in_at`, `seen_at`, and `discharged_at` stay NULL — which is the case discussed at length in [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), and is exactly why the `medical-booking` profile has more state-flag columns than the other two built-in profiles.\n\nA quick reminder of where that lands across profiles, from the table in that earlier post:\n\n| Profile | State-flag columns hit | Median `frac_null` | Range |\n| --- | --- | --- | --- |\n| saas-subscriptions | 12 | 0.97 | 0.90 – 0.995 |\n| medical-booking | 7 | 0.94 | 0.85 – 0.99 |\n| ecommerce | 9 | 0.96 | 0.88 – 0.99 |\n\n`medical-booking` has the lowest median because more of its state-flag timestamps are actually populated in the common case (a completed visit fills three of them), not because the heuristic is weaker.\n\n## What the profile deliberately does not encode\n\nWe get asked for these regularly and have, so far, declined to ship them. The reasons matter more than the list.\n\n- **Patient names, addresses, or demographics tied to real distributions.** We seed names from a generic multilingual pool and explicitly do not vary them by clinic location. Geographic name distributions are real but using them in a default profile risks producing fixtures that look like a particular real population, which is the opposite of what de-identification expects under, for example, the HIPAA Privacy Rule's Safe Harbor method ([45 CFR §164.514(b)(2)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514#p-164.514(b)(2))). Synthetic data is not protected health information; we still see no reason to generate data that mimics a specific cohort by default.\n- **Diagnoses, ICD-10 codes, medications.** We will fill an `icd10` column with codes that pass format validation (one letter, two digits, optional decimal and subcode) but we do not weight them by epidemiology. A fixture that says 4% of all encounters are myocardial infarctions is wrong in a way that is worse than obviously fake. ICD-10-CM is published by the CDC's National Center for Health Statistics ([NCHS ICD-10-CM](https://www.cdc.gov/nchs/icd/icd-10-cm/index.html)); using it as a vocabulary is fine, sampling it as a distribution is a research project.\n- **Insurance, billing codes, claims lifecycles.** Out of scope for v1. Plausibly a future `medical-billing` profile if enough users ask for it.\n- **PHI-shaped free text.** Notes, complaint fields, and discharge summaries are filled with neutral lorem-ipsum-style strings, not LLM-generated prose that looks like a clinical note. The risk of an indistinguishable-from-real note ending up in a screenshot or a public bug report is, in our view, not worth the realism.\n\nNone of these are technically hard. They are choices about what a default profile should look like. A user who needs any of them can override the relevant column in their own profile file. We will help. We will not ship them on by default.\n\n## How to inspect what you are getting\n\nTwo commands cover most questions:\n\n```bash\n# Dump the resolved profile (defaults + your overrides) as JSON\nsatus profile show medical-booking --resolved\n\n# Plan a run without writing rows; prints the distribution\n# satus will sample from for every column it touches\nsatus plan --profile medical-booking --schema appointments\n```\n\n`satus plan` is the same dry-run planner mentioned in the last post; it now annotates each appointments column with the distribution name, the parameters, and the source (default, profile override, or schema-derived). If a number in your fixture looks wrong, the plan output is where to look first.\n\n## The shorter version\n\nA medical-booking profile is mostly a list of opinions about time. The opinions are: clinics open in the morning and close in the evening; weekends are quieter, not empty; holidays exist; appointments cluster; some never happen; time zones belong to clinics, not to seeders; and the timestamps inside a single appointment row are ordered. Encoding those opinions turns out to be much more of the value than any single distribution, because almost any sane curve over the right local window beats a uniform curve over the wrong one.\n\nIf you are seeding a clinic-shaped schema and the default profile is wrong for your setting, override the bits that matter and leave the rest. If you want a profile we do not yet ship, the [/profiles](/profiles) page lists the three built-ins, the [/quickstart](/quickstart) shows how to point the CLI at your schema, and the [/recipes](/recipes) page has a worked example of a profile override.\n\n## References\n\n- Dantas, L. F., Fleck, J. L., Cyrino Oliveira, F. L., Hamacher, S. (2018), \"No-shows in appointment scheduling – a systematic literature review\", *Health Policy* 122(4):412–421. [PubMed entry](https://pubmed.ncbi.nlm.nih.gov/29482948/).\n- PostgreSQL documentation, [Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html).\n- PostgreSQL documentation, [pg_timezone_names](https://www.postgresql.org/docs/current/view-pg-timezone-names.html).\n- PostgreSQL documentation, [EXCLUDE constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-EXCLUSION).\n- PostgreSQL documentation, [btree_gist extension](https://www.postgresql.org/docs/current/btree-gist.html).\n- IANA, [Time Zone Database](https://www.iana.org/time-zones).\n- US Department of Health and Human Services, [45 CFR §164.514(b)(2), HIPAA Safe Harbor de-identification](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514#p-164.514(b)(2)).\n- CDC National Center for Health Statistics, [ICD-10-CM](https://www.cdc.gov/nchs/icd/icd-10-cm/index.html).\n- Earlier in this log: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [Introducing the satus log](/blog/introducing-the-log).\n\n—the satus.sh team\n";
const __vite_glob_0_4 = "---\nslug: partitioned-tables-meet-rls\ntitle: Partitioned tables meet RLS, and nobody wins\ndescription: RLS policies on a partitioned parent do not protect the children. We hit this in two customer schemas last week. Here is what Postgres actually does, and the two-line workaround satus now prints.\ndate: 2026-06-01\nauthor: satus.sh\ntags: [postgres, rls, partitioning, seeding]\ndraft: false\n---\n\nIf you `ENABLE ROW LEVEL SECURITY` on a partitioned parent and call it a day, you have not secured the children, and you have probably broken your seed job. Postgres treats the parent and each partition as separate tables for RLS purposes. Policies attached to the parent apply to queries that go *through* the parent; the partitions carry their own, independent RLS state. We hit this in two customer schemas in the same week. Both teams thought they had locked the table down. Neither had. satus v0.2.0 now detects the shape and prints the fix inline.\n\n## The setup\n\nA canonical multi-tenant events table, partitioned by month:\n\n```sql\nCREATE TABLE events (\n  id          bigint generated always as identity,\n  tenant_id   uuid    not null,\n  occurred_at timestamptz not null,\n  payload     jsonb   not null\n) PARTITION BY RANGE (occurred_at);\n\nCREATE TABLE events_2026_05 PARTITION OF events\n  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');\nCREATE TABLE events_2026_06 PARTITION OF events\n  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');\n\nALTER TABLE events ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY tenant_isolation ON events\n  USING (tenant_id = current_setting('app.tenant_id')::uuid)\n  WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);\n```\n\nThis reads like a complete RLS setup. It is not. Two things are quietly true.\n\nFirst, `ENABLE ROW LEVEL SECURITY` on `events` does *not* enable RLS on `events_2026_05` or `events_2026_06`. Each partition is a real table with its own `pg_class.relrowsecurity` flag. The parent's flag is independent.\n\nSecond, the `CREATE POLICY tenant_isolation ON events` row lives in `pg_policy` attached to the parent only. When a query goes through the parent, the planner expands it to the partitions and applies the parent's policy at each child. When a query goes *directly* at a child, the parent's policy is not in scope. Only the child's own policies, if any, are.\n\nThe combined effect, summarized:\n\n| Access path                                  | Parent policy enforced? | Child policy enforced? |\n| -------------------------------------------- | ----------------------- | ---------------------- |\n| `SELECT FROM events WHERE …`                 | yes                     | yes, if any            |\n| `INSERT INTO events VALUES (…)` (routed)     | yes                     | yes, if any            |\n| `SELECT FROM events_2026_05 WHERE …`         | no                      | yes, if any            |\n| `COPY events_2026_05 FROM …`                 | no                      | yes, if any            |\n| `INSERT INTO events_2026_05 VALUES (…)`      | no                      | yes, if any            |\n\nIf \"yes, if any\" reads as \"no, because nobody created one\", that is exactly the failure mode. A tenant-isolation policy on the parent is a fence around the front door. The partitions are unlocked back doors.\n\n## The bug as it actually shows up\n\nNeither customer noticed the security gap directly. They both noticed seeding broke. The shape was the same on each ticket.\n\nTheir migration tool created the policy as above, then ran `satus generate` to fill the database with realistic fixture rows. The tool was running as the role that owned `events`. Postgres documents an important detail: a table's owner is not subject to its policies unless `FORCE ROW LEVEL SECURITY` is set ([PostgreSQL: Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)). In both schemas, `FORCE` was set, because the team's security review had asked for it. So the owner *was* subject to RLS.\n\nsatus computes the FK DAG, sees `events` is a partitioned parent, and chooses its insert path. Pre-v0.2.0 it preferred direct-to-partition inserts for partitioned tables, because routing every row through the parent is measurably slower for the bulk-load case. Direct inserts into `events_2026_05` bypassed the parent's `tenant_isolation` policy entirely, and there was no policy on the child, so a default-deny outcome should follow only if RLS was *enabled* on the child. It was not. The inserts went through.\n\nSo far so good for seeding, except now the application opened a session, set `app.tenant_id`, and ran `SELECT count(*) FROM events`. The parent policy did its job: only rows matching the session's tenant were returned. Most of the seeded rows had been generated with a uniform tenant distribution across the profile's tenant pool, so the count came back at roughly `1/N` of the expected total, where `N` was the number of tenants. The test suite, naturally, asserted on the full count. Red.\n\nThe customer's read of this was reasonable and wrong: *\"satus is dropping rows.\"* satus had not dropped anything. The rows were physically present, distributed across partitions, and visible to the postgres superuser. They were invisible to the application role, because the parent policy filtered them, and the application happened to read through the parent.\n\nThe second customer had the inverse symptom: their test runner connected as a role *with* `BYPASSRLS` and saw all the rows fine, but their integration test, which spun up an application connection, saw a different count from `events_2026_05` directly than from `events`. Same root cause, opposite confusion.\n\n## What we now print\n\nWhen the planner sees a partitioned parent with at least one RLS policy and at least one child whose `relrowsecurity` is `false`, satus stops and prints the following before any DML runs:\n\n```text\nsatus: partitioned table `public.events` has RLS policies but\n       1 of 2 partition(s) do not have RLS enabled.\n\n       partition                     rls?    own policies\n       ───────────────────────────── ─────── ────────────\n       public.events_2026_05         OFF     0\n       public.events_2026_06         ON      0\n\n       Direct inserts into a partition skip parent policies.\n       Direct selects from a partition skip parent policies.\n\n       To inherit the parent's posture on every partition:\n\n         ALTER TABLE public.events_2026_05 ENABLE ROW LEVEL SECURITY;\n         ALTER TABLE public.events_2026_05 FORCE  ROW LEVEL SECURITY;\n\n       Or pass --route-through-parent to force satus to insert via\n       the parent. Slower; preserves the parent's policy on every row.\n```\n\nTwo lines, run once per missing partition. The choice between `ENABLE` and `ENABLE` + `FORCE` follows whatever the parent has; if the parent has `FORCE`, the children should too, otherwise the table owner can still bypass the children directly.\n\nThere is a deeper question buried in this: should the parent's policies be *automatically* attached to new partitions? Postgres has chosen no. New partitions are independent tables; their RLS state is whatever `CREATE TABLE PARTITION OF` and any subsequent `ALTER TABLE` give them. There is no `INHERIT POLICIES` keyword. The CREATE POLICY documentation is explicit that policies are per-table ([PostgreSQL: CREATE POLICY, Notes](https://www.postgresql.org/docs/current/sql-createpolicy.html)). This is a defensible design—policies often need to differ by partition for retention or archival reasons—but it makes the partition-creation step a security boundary that most ORMs and migration tools do not surface.\n\nWe ran a structural audit of five open-source Postgres schemas that ship raw SQL migrations (listmonk, lemmy, powerdns, penpot, pagila) on Postgres 17, covering 151 user tables. The full results are in [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json). The number of declarative-partitioned parent tables across all five: **one**. The number of parents whose policies could be bypassed by writing directly to a child: zero in this corpus, because only one schema partitioned at all and it has no RLS policies on the parent.\n\nThat is itself the headline. Declarative partitioning is rare in published open-source OLTP schemas; teams that adopt it almost always do so inside private codebases (per-tenant SaaS, time-series telemetry, audit logs) that are exactly where RLS *also* gets adopted. The intersection is small and almost never visible in public corpora, which is part of why this footgun keeps surprising people: there is no public schema to copy a working pattern from.\n\nThe pattern is not \"some teams forgot once\". It is the default outcome of every workflow we have seen on private schemas, including ones written by experienced platform teams. The migration that creates the parent enables RLS on the parent. The migration that creates the next month's partition does not, because it is a copy-paste of last month's, which did not need to.\n\n## The seeding workaround, in two lines\n\nFor the immediate \"satus made my tests red\" case, the workaround the tool now prints is the right answer for most teams. Enable and (if the parent uses it) force RLS on every partition, including ones created by future migrations. The simplest enforcement is a trigger on `pg_event_trigger` that fires on `CREATE TABLE` for partitions of an RLS-enabled parent and runs the `ENABLE`/`FORCE` statements automatically. The Postgres event triggers documentation covers the mechanism ([PostgreSQL: Event Triggers](https://www.postgresql.org/docs/current/event-triggers.html)).\n\nThe shorter answer, if you genuinely never want partitions to be accessed directly, is to revoke direct privileges on each partition and force all traffic through the parent. `REVOKE ALL ON events_2026_05 FROM public, app` plus `GRANT` on the parent only. This is a privilege fix, not an RLS fix, and it is independent of the policy state. We do not print this one automatically because it has real operational consequences (no per-partition `pg_dump` as the app role, no per-partition maintenance jobs), and the right call depends on the team. The detection just notes the option.\n\n## What this does not solve\n\nA few things this detection deliberately does not try to handle:\n\n- **Policy drift.** If `events_2026_05` has RLS enabled but a different policy than the parent, satus does not currently diff the policy expressions. We have not seen this be the failure mode in practice; the dominant mode is \"no policy at all on the child\".\n- **Default partition gaps.** A `DEFAULT` partition with mismatched RLS is the worst version of this bug, because rows that do not match any other range end up there and may be silently invisible. We flag it the same way as any other partition, with no special call-out yet. That should change; it is on the v0.3 list.\n- **Inheritance (the legacy `INHERITS` mechanism, not declarative partitioning).** Pre-PG10 inheritance has slightly different RLS semantics for some access paths. We see it rarely in modern schemas and currently do not run the partition check on inheritance trees. If you are on legacy inheritance and want this, file an issue.\n\n## The shorter version\n\n`ENABLE ROW LEVEL SECURITY` on a partitioned parent secures the parent, not the partitions. Policies are per-table, partitions are tables, and Postgres will not propagate either one for you. If your application reads through the parent and your seeder writes through a child, you will get a row count that nobody at the table can explain. Enable RLS on every partition, force it if the parent forces it, and consider an event trigger so the next partition does not reopen the back door.\n\n## References\n\n- PostgreSQL documentation, [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).\n- PostgreSQL documentation, [CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html).\n- PostgreSQL documentation, [Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html).\n- PostgreSQL documentation, [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html) (ENABLE / FORCE ROW LEVEL SECURITY).\n- PostgreSQL documentation, [Event Triggers](https://www.postgresql.org/docs/current/event-triggers.html).\n- Earlier in this log: [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n- The corpus underlying this post's structural counts: [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json) (5 schemas, 151 tables, Postgres 17).\n- See also: [satus profiles](/profiles), [quickstart](/quickstart).\n\n—the satus.sh team\n";
const __vite_glob_0_5 = "---\nslug: the-citext-trap\ntitle: The CITEXT trap\ndescription: A seed job asked for 10,000 users and inserted 6,200. The unique index on a CITEXT column folded Alice and alice into one row. What CITEXT does, why new schemas avoid it, and what satus generates.\ndate: 2026-06-03\nauthor: satus.sh\ntags: [postgres, citext, unique, collations, seeding]\ndraft: false\n---\n\nA user opened a ticket last week: *\"satus said it inserted 10,000 rows. `SELECT count(*) FROM users` returns 6,200. What happened to the rest?\"* Postgres had not lost anything. The `users.email` column was declared `CITEXT`, the column had a `UNIQUE` constraint, and the seeder had cheerfully generated names like `Alice.Smith@example.com` and `alice.smith@example.com` from the same distribution. To the unique index those are the same value. About 38% of the inserts hit a conflict and were swallowed by the `ON CONFLICT DO NOTHING` clause that satus uses to keep partial runs idempotent. The math worked out exactly.\n\nThat was the visible bug. The bigger trap is that the Postgres documentation itself now tips readers toward nondeterministic ICU collations (introduced in Postgres 12) over the `citext` extension, and almost every schema that \"needs case-insensitive text\" has quietly stopped using it without telling anyone. We looked.\n\n## What CITEXT actually is\n\n`CITEXT` is a contrib extension ([PostgreSQL: citext](https://www.postgresql.org/docs/current/citext.html)) that ships a single data type: a `text`-shaped value whose comparison operators are case-insensitive. The implementation is a thin wrapper that lower-cases both operands before comparing. That has three consequences worth naming up front, because the readme buries them under usage examples.\n\n1. **Equality is case-insensitive everywhere.** `=`, `<`, `IN`, `GROUP BY`, and any unique index on the column all fold case. There is no way to ask \"are these two values byte-equal?\" without an explicit cast back to `text`.\n2. **The folding is not Unicode-aware by default.** `LOWER()` in stock Postgres uses libc's locale rules; on most installations that means ASCII case folding plus whatever the database's collation happens to do. `İ` (Turkish capital I with dot) and `i` are not equal under CITEXT on a `en_US.UTF-8` cluster. They are equal under a Turkish locale. The extension's docs flag this explicitly.\n3. **It is not free.** Each comparison calls `lower()` on both sides. A unique index on a CITEXT column is, internally, an index on the lower-cased value. Inserts pay the lowering cost on every row; lookups pay it on every query.\n\nNone of this is wrong, exactly. It is a small, sharp tool that does what it says. The trap is that \"case-insensitive text\" sounds like a property of the column, and people reach for it without specifying *whose* case rules and *which* operations they wanted folded.\n\n## What the docs now recommend instead\n\nPostgres 12 added nondeterministic ICU collations ([PostgreSQL: Collation Support](https://www.postgresql.org/docs/current/collation.html#COLLATION-NONDETERMINISTIC)). The relevant paragraph is short enough to paraphrase: a nondeterministic collation can declare its own equality rules, including case-insensitivity and accent-insensitivity, and those rules apply to any `text` column that uses the collation. No extension required, ICU rules instead of libc, and the comparison is integrated with the planner rather than bolted on top.\n\nThe replacement pattern looks like this:\n\n```sql\nCREATE COLLATION case_insensitive (\n  provider    = icu,\n  locale      = 'und-u-ks-level2',  -- \"und\" = root locale, ks-level2 = ignore case\n  deterministic = false\n);\n\nCREATE TABLE users (\n  id    bigint generated always as identity primary key,\n  email text COLLATE case_insensitive NOT NULL UNIQUE\n);\n```\n\nTwo practical differences from CITEXT:\n\n| Concern                       | CITEXT                                  | Nondeterministic collation              |\n| ----------------------------- | --------------------------------------- | --------------------------------------- |\n| Source                        | contrib extension (`CREATE EXTENSION`)  | core, no extension needed since PG 12   |\n| Unicode rules                 | libc + ASCII fold via `lower()`         | ICU; predictable across platforms       |\n| Pattern matching (`LIKE`)     | works                                   | not supported on nondeterministic cols  |\n| Per-column vs. per-database   | per-column type choice                  | per-column collation, mix freely        |\n| Index on the column           | unique works, FTS-style ops do not      | unique works, `LIKE` does not           |\n\nThe `LIKE` row is the one that bites teams migrating off CITEXT. If your app does `WHERE email LIKE 'admin@%'`, that query stops planning when the column moves to a nondeterministic collation. The fix is usually a separate functional index on `lower(email)`, which is the pattern the rest of the Postgres world has been quietly using all along instead of either CITEXT or nondeterministic collations.\n\n## What real schemas actually do\n\nWe ran a structural audit of five open-source Postgres schemas (listmonk, lemmy, powerdns, penpot, pagila) on Postgres 17 covering 151 user tables and 1,095 columns. The full numbers are in [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json). Two findings are directly relevant to this post:\n\n```text\nmetric                                           value across 5 schemas\n─────────────────────────────────────────────── ───────────────────────\ntotal columns                                    1,095\ncolumns whose udt_name is 'citext'                   0\ntext/varchar/bpchar columns named like '%email%'     9\n```\n\nZero CITEXT columns across all five schemas, including the two that ship explicit user-account tables with email addresses. Nine email-named columns, all of them plain `text` or `varchar`. None of these schemas opted into CITEXT, and only one (the schemas we cannot inspect because they are private) is using nondeterministic ICU collations as far as we can tell from public migration files in the broader OSS Postgres ecosystem—it remains rare.\n\nThe dominant pattern in the wild is the third option: keep the column as plain `text`, store the case the user typed, and enforce uniqueness with a functional unique index on `lower(email)`. That preserves `LIKE`, makes the comparison explicit at every call site, and never imports an extension. It is also the pattern that the satus seeder has always handled correctly, because there is no special type to detect, just a `UNIQUE (lower(email))` constraint that the planner introspects like any other expression index.\n\n## The seeding bug, more carefully\n\nReturning to the opening ticket. The customer's schema had CITEXT, and satus had not noticed. The relevant slice of the schema:\n\n```sql\nCREATE EXTENSION IF NOT EXISTS citext;\n\nCREATE TABLE users (\n  id        bigint generated always as identity primary key,\n  email     citext  NOT NULL UNIQUE,\n  full_name text    NOT NULL\n);\n```\n\nPre-v0.2.0, satus walked `information_schema.columns`, saw `data_type = 'USER-DEFINED'` and `udt_name = 'citext'`, treated the column as \"some custom type, fall back to text\", and asked the LLM-backed generator for realistic email-shaped strings. The generator did its job. It produced strings drawn from a name pool with random casing, because real email lists in the wild contain both `Alice.Smith@…` and `alice.smith@…` and the profile's stated goal was realism.\n\nPostgres then deduplicated on insert. The unique index on `email` folded case, the `ON CONFLICT DO NOTHING` clause absorbed the conflict, and the visible row count came in low. The user saw \"satus is dropping rows\". satus was not dropping rows; the database was, and it was correct to.\n\nThe fix in v0.2.0 is two changes that together close the gap:\n\n- **Detection.** During introspection, satus now checks `pg_type.typname IN ('citext')` for every column and records a `case_insensitive_unique = true` flag whenever that type participates in a unique constraint. The same flag is set for columns whose type uses a nondeterministic collation (`pg_collation.collisdeterministic = false`) and for columns referenced by a functional unique index that calls `lower()` or `upper()`.\n- **Generation.** When the flag is set, the generator draws from a case-normalized pool and applies the column's intended canonical form (`lower()` for the email cases, profile-configurable otherwise) before checking the in-memory uniqueness ledger that satus maintains for the run. The on-disk row keeps whatever casing the generator produced; the uniqueness check sees the folded form.\n\nThe result, on the customer's schema:\n\n```text\n                                pre-v0.2.0       v0.2.0\n                                ───────────      ──────\nrequested rows                       10,000      10,000\ninserted                              6,213      10,000\nsilently deduped by index             3,787           0\nsatus.plan warnings printed               0           1\n```\n\nThe single warning, for completeness:\n\n```text\nsatus: column `public.users.email` is CITEXT and participates in a\n       UNIQUE index. Generation will normalize case before checking\n       uniqueness. To preserve mixed-case input but enforce uniqueness\n       on the canonical form, this matches Postgres' own behavior.\n```\n\n## The broader recommendation\n\nIf you are starting a schema today and want case-insensitive uniqueness on an email or username column, the order of preference we use in customer schema reviews:\n\n1. **`text` with a functional unique index on `lower(col)`.** Works on every Postgres, preserves `LIKE`, makes the case-folding explicit at every site that cares. This is what the OSS schemas we audited do, and it is what satus generates against without any special handling.\n2. **`text COLLATE <nondeterministic-icu>` for the column.** Cleaner at the schema level, predictable Unicode rules, but you lose `LIKE` on the column and you take a hard dependency on ICU being available (Postgres builds without ICU exist, especially in older containers).\n3. **`CITEXT`.** Only if you are extending a schema that already uses it, or if you have a specific reason to want the extension's `lower()`-based folding behavior. New code should not reach for it; the citext docs themselves contain a Tip recommending nondeterministic collations instead ([PostgreSQL: citext](https://www.postgresql.org/docs/current/citext.html)).\n\nThe thing every option has in common, and the thing satus learned the hard way, is that \"case-insensitive\" is a property of the comparison, not of the data. The row on disk still has the case the user typed. The index, the collation, or the functional expression decides what counts as equal. If your seeder ignores that and treats the column as plain text, the database will silently disagree with it and the disagreement will show up as a count that does not match. The opening ticket was the cleanest possible version of that story. We have since seen it in three other shapes (a `usernames` table, a `tags` table, and a tenancy `subdomains` table) and the resolution is the same in all of them: detect the case-folding contract on the column, fold inside the generator, let the database see only values it has not seen before.\n\n## The shorter version\n\nCITEXT is a real extension, it does what it advertises, and it will collapse `Alice` into `alice` for every operation that touches the column, including the unique index your seeder is inserting against. Postgres 12 and later prefer nondeterministic ICU collations; the broader OSS ecosystem has mostly settled on plain `text` plus a `lower()` functional index. None of these are wrong. All of them require your seed-data tool to know which one the column is using and to fold before it asks the database to accept the row. satus v0.2.0 detects all three shapes and generates accordingly. The pre-v0.2.0 behavior was to trust the column's apparent text-ness and let the database arbitrate, which is the same as letting the database silently drop your test data.\n\n## References\n\n- PostgreSQL documentation, [citext](https://www.postgresql.org/docs/current/citext.html).\n- PostgreSQL documentation, [Collation Support](https://www.postgresql.org/docs/current/collation.html), specifically [Nondeterministic Collations](https://www.postgresql.org/docs/current/collation.html#COLLATION-NONDETERMINISTIC).\n- PostgreSQL documentation, [Unique Indexes](https://www.postgresql.org/docs/current/indexes-unique.html).\n- PostgreSQL documentation, [Indexes on Expressions](https://www.postgresql.org/docs/current/indexes-expressional.html).\n- PostgreSQL documentation, [INSERT … ON CONFLICT](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT).\n- Earlier in this log: [Partitioned tables meet RLS, and nobody wins](/blog/partitioned-tables-meet-rls), [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n- The corpus underlying this post's structural counts: [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json) (5 schemas, 151 tables, Postgres 17).\n- See also: [satus profiles](/profiles), [quickstart](/quickstart).\n\n—the satus.sh team\n";
const __vite_glob_0_6 = "---\nslug: v0-2-0-deferred-constraints-faster-planning-smaller-binary\ntitle: \"v0.2.0: deferred constraints, faster planning, and a smaller binary\"\ndescription: Cyclic foreign keys now seed end-to-end via deferred constraints and a post-insert wire-up pass. Catalog introspection drops from five round-trips to one. The npm tarball is 77.6% smaller.\ndate: 2026-06-04\nauthor: satus.sh\ntags: [postgres, satus, release, foreign-keys, performance]\ndraft: false\n---\n\n`@passkeybridge/satus@0.2.0` is on npm. Three changes are worth writing up: cyclic foreign keys now seed in a single transaction without a workaround, catalog introspection collapses from five sequential round-trips to one CTE, and the published tarball shrinks from 104 kB to 23 kB by dropping shipped sourcemaps and turning on minification. None of these are headline-feature work. They are the kind of changes you make once the v1 surface is stable and the bug reports start to cluster.\n\n## Cyclic foreign keys, end to end\n\nA two-table cycle is the smallest example that previously failed: `users.primary_org_id → orgs.id` and `orgs.owner_user_id → users.id`. There is no insert order that satisfies both `NOT NULL` and both foreign keys at once. We wrote about the general shape in [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild); v0.2.0 is the implementation.\n\nThe algorithm is unglamorous. After Kahn's topological sort fails, the planner scans the residual edges for a foreign-key column declared nullable. The first such edge it finds is removed from the DAG and recorded as a `BrokenEdge`. Kahn's runs again. Repeat until the graph is acyclic or no nullable back-edge remains. At runtime:\n\n1. `SET CONSTRAINTS ALL DEFERRED` is issued at the top of the transaction, so any `DEFERRABLE` foreign keys the user already declared validate at `COMMIT` instead of after each statement.\n2. Parents in the broken-edge relationship are inserted first. Children are inserted with `NULL` in the broken column.\n3. After both tables are seeded, a single `UPDATE` per broken edge wires each child row to a random parent primary key, still inside the same transaction.\n4. `COMMIT`.\n\nIf every edge in a cycle is `NOT NULL`, the planner refuses to run and prints the cycle with a one-line remediation: make a column nullable, or drop one of the cycle members from the run. We do not synthesize a placeholder row, we do not disable constraints, and we do not silently widen `NULL` semantics on a column the user said was `NOT NULL`.\n\nThe integration test we ran on the release runner, against a local PostgreSQL 17 instance:\n\n```text\nfixture        users(primary_org_id -> orgs)\n               orgs(owner_user_id  -> users NOT NULL)\nbroken edge    users.primary_org_id (nullable)\ncommand        satus generate --rows 5\n\nresult\n  rows inserted              10  (5 users, 5 orgs)\n  NULL FKs after wire-up      0  (5/5 users.primary_org_id resolved)\n  cycle members reachable    yes (both directions)\n```\n\nThe numbers, the fixture schema, and the exact command are recorded in [`corpus/bench-2026-06-04.json`](https://satus.sh/corpus/bench-2026-06-04.json) so future regressions are easy to spot.\n\n### Two limits worth naming\n\nThis is the smallest useful version of cycle handling, not the most general one.\n\n- **Cycles where every edge is `NOT NULL` are unsupported.** Breaking them requires either pre-allocating sentinel rows or temporarily dropping a constraint, both of which we want to avoid in v0.x.\n- **Cycles longer than two tables are handled by the same algorithm**, but the wire-up pass scales linearly with the number of broken edges. The test corpus does not yet include a real-world four-table cycle; if you have one, we want it.\n\n## Catalog introspection, one round-trip\n\nPre-v0.2.0, the generator's first phase ran five sequential queries against `information_schema` and `pg_catalog`: tables, columns, primary keys, foreign keys, and unique constraints. On a local socket the overhead was invisible. On a remote Postgres (Supabase, Neon, RDS over the public internet, an SSH tunnel) the overhead was four extra network round-trips, each paying the full latency budget back-to-back.\n\nv0.2.0 collapses the five into one CTE-shaped query that returns each result set as a `jsonb_agg` column. The client decodes a single response. Wire shape and per-column meaning are unchanged; only the trip count moves.\n\nBenchmarked against pooled Supabase from the release runner, fifteen iterations after a three-iteration warmup, with `psql` process startup and the TLS handshake measured separately via `select 1` and subtracted out:\n\n```text\n                                  median (ms)\n                                  ───────────\npsql + TLS baseline (select 1)            603\nlegacy, five queries                      981   ->   378 ms wire\nv0.2.0, single CTE query                  646   ->    43 ms wire\n\nspeedup on wire work                     8.79x\nround-trips saved                            4\nend-to-end speedup                       1.52x\n```\n\nThe end-to-end number is the honest one to lead with. A 1.52x improvement on the introspection phase is not a marketing number; it is what happens when you stop spending four round-trips on something that fits in one query. The 8.79x figure on isolated wire time is the same change measured without the constant cost of opening a connection, included for completeness rather than for the headline.\n\n| Surface           | Pre-v0.2.0 | v0.2.0     | Delta                  |\n| ----------------- | ---------- | ---------- | ---------------------- |\n| Catalog queries   | 5          | 1          | -4 round-trips         |\n| Median end-to-end | 981 ms     | 646 ms     | -335 ms (-34%)         |\n| Isolated wire     | 378 ms     | 43 ms      | -335 ms (8.79x faster) |\n\nThe CTE is built from documented relations only: `information_schema.tables`, `information_schema.columns`, `pg_constraint`, `pg_attribute`, `pg_class`, `pg_namespace`. No vendor extensions, no system-internal views, nothing that breaks on managed providers.\n\n## A smaller tarball\n\nThe 0.1.x release shipped with sourcemaps and an unminified bundle. Sourcemaps make sense for a library that consumers re-bundle. They do not make sense for a CLI that ships as a `#!/usr/bin/env node` shebang and is never opened in a browser devtools panel. No end user has ever pointed a stack trace at our sourcemap. We removed them and turned on `tsup`'s minifier.\n\n```text\n                          0.1.1        v0.2.0\n                          ─────        ──────\ndist/cli.js                32134        23403   bytes\ndist/cli.js.map            72243            0   bytes\ntotal npm payload         104377        23403   bytes\nreduction                                77.6%\n```\n\nThe user-visible behavior change is that `npm i -g @passkeybridge/satus` installs faster on slow networks and the on-disk footprint is roughly a quarter of what it was. Error stack traces still resolve to the right file and line, because `tsup`'s minifier preserves function names and source positions sufficiently for `node --enable-source-maps`-style frames; we keep an unminified build available locally for our own debugging.\n\n## A small bug we found by writing the integration test\n\nWhile running the cyclic-schema test against `gpt-5-mini`, the LLM call returned `400`: *\"`temperature` does not support 0.7 with this model. Only the default (1) value is supported.\"* The OpenAI GPT-5 family pins temperature at 1 and rejects any other value with a hard error. Our client sent `temperature: 0.7` unconditionally. The fix is one branch: send `temperature` only when the model is not GPT-5. The detection is by prefix, so `gpt-5`, `gpt-5-mini`, and future `gpt-5.x` minor releases are all covered.\n\nThis is not a release-worthy feature on its own. It is mentioned here because it is the kind of bug that an integration test against a real model catches, and a unit test with a mocked OpenAI client does not. The release runner now runs the cyclic-schema test against a real model on every release.\n\n## Upgrade\n\n```bash\nnpm i -g @passkeybridge/satus\nsatus --version    # 0.2.0\n```\n\nExisting configs work unchanged. The new behavior is opt-in only in the sense that you have to have a cycle in your schema to see the new cycle handling, a remote database to feel the round-trip improvement, and a slow network to notice the smaller tarball. If none of those describe you, the 0.2.0 upgrade is a silent improvement.\n\n## What did not ship\n\nFor honesty, the four things we considered and explicitly deferred:\n\n- **`NOT NULL` cycle breaking via sentinel rows.** Discussed in the cycle write-up; the v1 stance is that the workaround should be visible in the schema, not hidden in the seeder.\n- **Cycle handling at the `serializable` isolation level.** The post-insert `UPDATE` pass conflicts with concurrent writers in `serializable`; we have not yet decided whether to retry the wire-up or to require `read committed` for cyclic schemas.\n- **Statement-level batching of the wire-up `UPDATE`s.** A single `UPDATE … FROM (VALUES …)` would be tighter than the current per-row loop on schemas with thousands of broken-edge rows. Queued for v0.3.\n- **A `--plan-only` flag that emits the broken-edge plan as JSON.** Useful for CI gates that want to fail on unexpected new cycles. Also queued.\n\n## References\n\n- PostgreSQL documentation, [`SET CONSTRAINTS`](https://www.postgresql.org/docs/current/sql-set-constraints.html).\n- PostgreSQL documentation, [Constraints, Foreign Keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK).\n- PostgreSQL documentation, [System Catalogs: `pg_constraint`](https://www.postgresql.org/docs/current/catalog-pg-constraint.html).\n- PostgreSQL documentation, [`WITH` Queries (Common Table Expressions)](https://www.postgresql.org/docs/current/queries-with.html).\n- Kahn, A. B., *Topological sorting of large networks*, Communications of the ACM, 1962. [ACM DL](https://dl.acm.org/doi/10.1145/368996.369025).\n- Earlier in this log: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [Partitioned tables meet RLS, and nobody wins](/blog/partitioned-tables-meet-rls), [The CITEXT trap](/blog/the-citext-trap).\n- Release artifact: [`corpus/bench-2026-06-04.json`](https://satus.sh/corpus/bench-2026-06-04.json).\n- Package: [`@passkeybridge/satus` on npm](https://www.npmjs.com/package/@passkeybridge/satus).\n- See also: [quickstart](/quickstart), [profiles](/profiles), [how it works](/docs/how-it-works).\n\n—the satus.sh team\n";
const __vite_glob_0_7 = '---\nslug: jsonb-that-is-secretly-relational\ntitle: JSONB columns that are secretly relational\ndescription: Half the JSONB columns we see are key/value bags. The other half are foreign keys in disguise — arrays of IDs pointing at real rows, with no constraint to prove it. How to tell them apart.\ndate: 2026-06-08\nauthor: satus.sh\ntags: [postgres, jsonb, modeling, seeding]\ndraft: false\n---\n\nA `JSONB` column declares almost nothing about its contents. The catalog tells you the column is `jsonb`, that it is `NOT NULL`, maybe that it defaults to `\'{}\'` or `\'[]\'`. After that the schema is silent, and the application owns the meaning. That silence is what makes JSONB useful — and also what makes seeding it correctly the single most error-prone part of generating realistic data for a schema you did not write.\n\nIn practice there are two populations of JSONB columns in real Postgres schemas, and they want very different things from a seed generator.\n\n1. **Key/value bags.** Free-form attribute storage. `subscribers.attribs`, a user-profile `props`, a per-event `metadata` blob. The keys are loosely conventional, the values are scalars or short arrays, and nothing inside the JSON refers to another row.\n2. **Secretly relational columns.** The JSON contains IDs (or URIs, or composite keys) that point at rows in other tables, with no foreign key constraint to enforce the link. The column is a denormalized relation, written into JSONB because the team wanted set semantics, schemaless evolution, or just a faster path through their ORM.\n\nThe first population is easy to fake. The second one is where seed runs silently produce data that looks plausible, passes every constraint Postgres knows about, and then breaks the application the moment a feature joins against it.\n\n## What the corpus shows\n\nWe publish a structural audit of five open-source Postgres schemas at [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json). The audit summary does not break out JSONB counts, but the underlying schemas are pinned to specific tags and a direct grep against them is reproducible. Across listmonk v3.0.0, lemmy 0.19.5, powerdns auth-4.9.3, penpot 2.4.3, and pagila (master), three of the five schemas declare JSONB columns; two (powerdns, pagila) declare none. Of the JSONB columns that do exist, the split between bag and relation is roughly even, and the relational ones are not annotated as such in any way the catalog can see.\n\nThree concrete cases worth naming, all verifiable in the upstream sources:\n\n```text\nschema     table             column         shape                       relational?\n─────────  ────────────────  ─────────────  ──────────────────────────  ────────────\nlistmonk   subscribers       attribs        free-form attribute bag      no\npenpot     comment_thread    participants   set of profile IDs           yes (no FK)\nlemmy      activity          data           ActivityPub envelope         yes (URI refs)\n```\n\nThe penpot example is the cleanest. The `comment_thread` table in penpot\'s migration [`0031-add-conversation-related-tables.sql`](https://github.com/penpot/penpot/blob/2.4.3/backend/src/app/migrations/sql/0031-add-conversation-related-tables.sql) declares two explicit foreign keys (`file_id`, `owner_id`) and then this:\n\n```sql\nCREATE TABLE comment_thread (\n  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),\n  file_id      uuid NOT NULL REFERENCES file(id) ON DELETE CASCADE,\n  owner_id     uuid NOT NULL REFERENCES profile(id) ON DELETE CASCADE,\n  page_id      uuid NOT NULL,\n  participants jsonb NOT NULL,\n  -- ...\n);\n```\n\n`participants` has no constraint. The catalog will tell a seed tool "this is a JSONB column, default permissive object, do whatever you want." But the application code writes it as a JSON set of `profile.id` UUIDs — the relevant line in `comments.clj` is literally `:participants (db/tjson #{profile-id})`. Every UUID inside that array is supposed to exist as a row in `profile`. There is no database-level guarantee that it does, and no `ON DELETE CASCADE` to clean it up when a profile is deleted. The relation lives in the application\'s head.\n\nThe lemmy example is a degree harder. The `activity` table stores an ActivityPub payload as `data jsonb NOT NULL`. ActivityPub envelopes contain fields like `actor`, `object`, `to`, and `cc` whose values are URIs ([ActivityPub §4.5](https://www.w3.org/TR/activitypub/#object-without-create)). On a federated instance many of those URIs resolve to rows on the same Postgres cluster — local users, local communities, local posts. From Postgres\'s point of view it is a string inside JSON. From the application\'s point of view it is a foreign key spelled in URL form.\n\nThe listmonk case is the negative control. `subscribers.attribs` ([schema.sql](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql)) is a true bag — declared `JSONB NOT NULL DEFAULT \'{}\'`, used for whatever per-subscriber attributes the operator wants to track, never queried for cross-table integrity. The same column declaration syntax, the same catalog metadata, completely different semantics.\n\n## Why a generator cannot ignore the distinction\n\nA seed run that treats every JSONB column as an opaque object produces three failure modes against secretly-relational columns. They are progressively worse.\n\n**Failure 1: the JSON parses but the IDs are nonsense.** The generator emits `{"foo": "bar", "n": 42}` for `comment_thread.participants`. The insert succeeds — JSONB takes anything. Nothing inside resembles a UUID, nothing inside resembles a profile, and the first time the application page loads the thread it crashes on a missing key or a type error in the consuming code.\n\n**Failure 2: the JSON parses and looks shaped right, but the IDs are unrelated to anything.** The generator notices the column name `participants`, decides this looks like a list, emits `["uuid-1", "uuid-2"]` with freshly minted UUIDs. The application\'s "who is on this thread" query joins against `profile` and returns zero rows. The failure mode is silent: no exception, no row count drop, just a feature that quietly shows no participants forever after.\n\n**Failure 3: the JSON looks right and the IDs do exist, but they were chosen without regard to the surrounding rows.** The generator (somehow) picks real `profile.id` values, but at random. The `comment_thread.owner_id` says profile A wrote the thread; `participants` contains profiles X, Y, Z with no relationship to A. The data is consistent at the constraint layer and inconsistent at every higher layer — moderation queries, permission checks, anything that assumes the owner is also a participant. This is the worst case because it looks fine in a quick spot-check and breaks specific feature tests at apparently random places.\n\nThe constraint engine cannot catch any of these because there are no constraints. JSON Schema validation in the application can — and frequently does — catch the first one, but it cannot catch the second or third.\n\n## How satus handles JSONB today\n\nWe owe this section honesty. As of v0.2.0, satus treats every JSONB column as a permissive object and asks the LLM-backed generator for a plausibly-shaped JSON value. The relevant line is in [`packages/cli/src/generate/schema.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/schema.ts), case `\'json\' | \'jsonb\'` → `{ type: \'object\' as const }`. There is no detection for "this JSONB column is secretly an array of foreign keys."\n\nThat means satus, today, produces Failure 1 or Failure 2 on penpot\'s `participants` column — depending on how well the column name primes the generator. It will not produce Failure 3, because it does not know to pick from `profile.id`, so the IDs it invents will not exist. The visible symptom is that the seeded database loads, the threads exist, the thread participant counts are wrong, and nothing crashes until the application actually consults the field.\n\nThis is not where we want to land. The roadmap entry that prompted this post is "JSONB shape inference," and the design we are heading toward has three layers.\n\n1. **Catalog-only signals.** Column name (`participant_ids`, `member_ids`, `tags`), default value (`\'[]\'` strongly implies an array), and `NOT NULL` + array default together suggest "set of something."\n2. **Sample-driven signals.** When the target database already contains rows (the common case for staging refreshes — distinct from a from-empty seed), satus can read up to N existing values and infer the JSON shape: array vs. object, scalar element type, UUID-likeness of element values, overlap of element values with the PK columns of other tables in the schema.\n3. **Profile overrides.** Customers who know their own schema can declare, in `satus.config.json`, that `comment_thread.participants` is "JSONB array of profile.id" and have satus generate accordingly. This is the escape hatch for cases where the catalog and the sample both fail to reveal the relation.\n\nLayer 1 is cheap and ships first. Layer 2 is the one that actually solves the penpot case, because it catches "this column is full of UUIDs that also appear in `profile.id`" without anyone having to write a config entry. Layer 3 is where this lands long-term, because every team eventually has at least one JSONB column whose meaning lives in a Confluence page nobody updated in two years.\n\nA planned warning, modeled on the [CITEXT one we already emit](/blog/the-citext-trap), will look approximately like this:\n\n```text\nsatus: column `public.comment_thread.participants` is JSONB. The\n       column has no FK constraint, but 100% of sampled values are\n       arrays of UUIDs and ≥95% of those UUIDs exist in `public.profile.id`.\n       Generation will draw participant UUIDs from existing `profile`\n       rows. To disable, set `jsonb.infer = false` in satus.config.json.\n```\n\nThe warning is the point. JSONB columns are a place where the schema gives the seed tool too little information to be correct silently; the only honest behavior is to surface the inference, name the source table it picked, and let the operator override it.\n\n## What to do today, on a real schema\n\nIf you are seeding a database that has JSONB columns you suspect are relational, three steps that work right now without waiting for satus to grow the detection:\n\n1. **Find them.** A one-line query is enough to enumerate every JSONB column in the schema:\n   ```sql\n   SELECT table_schema, table_name, column_name, column_default\n   FROM information_schema.columns\n   WHERE udt_name IN (\'json\', \'jsonb\')\n     AND table_schema NOT IN (\'pg_catalog\', \'information_schema\')\n   ORDER BY table_schema, table_name;\n   ```\n2. **Sample them.** For each column, `SELECT data FROM <table> WHERE data IS NOT NULL LIMIT 20` is sufficient to see whether the contents are objects with stable keys (bag) or arrays/objects of UUIDs and integers (probably relational). Five minutes per column.\n3. **Declare them in `satus.config.json`.** Until the inference layer ships, the supported escape hatch is a per-column generator override. The shape we are stabilizing is:\n   ```jsonc\n   {\n     "tables": {\n       "comment_thread": {\n         "columns": {\n           "participants": {\n             "kind": "jsonb_array_of_ids",\n             "references": "profile.id",\n             "min": 1,\n             "max": 5\n           }\n         }\n       }\n     }\n   }\n   ```\n\nThe override is the same one Layer 3 of the roadmap will accept, so config you write today carries forward.\n\n## The broader claim\n\nA JSONB column is a foreign key whenever the application treats it as one, regardless of what the constraint catalog says. Seed tools that ignore this produce datasets that look statistically reasonable and fail the moment they meet a feature that joins through the JSON. The fix is not "always sample" or "never sample"; it is to treat JSONB shape inference as a first-class step of introspection, surface it as an explicit warning the way we surface CITEXT and unique-constraint folding, and give the operator a config-level override for the cases where the inference is wrong.\n\nThat is the work between v0.2.0 and the next minor release. Until it ships, the honest workaround is the three-step process above. The pattern is real, it is common in private schemas more than in OSS ones, and naming it is the prerequisite for fixing it.\n\n## References\n\n- penpot, `comment_thread.participants` declaration — [`backend/src/app/migrations/sql/0031-add-conversation-related-tables.sql`](https://github.com/penpot/penpot/blob/2.4.3/backend/src/app/migrations/sql/0031-add-conversation-related-tables.sql)\n- penpot, write-site for `participants` — [`backend/src/app/rpc/commands/comments.clj`](https://github.com/penpot/penpot/blob/2.4.3/backend/src/app/rpc/commands/comments.clj)\n- lemmy, `activity.data` declaration — [`migrations/2020-03-26-192410_add_activitypub_tables/up.sql`](https://github.com/LemmyNet/lemmy/blob/0.19.5/migrations/2020-03-26-192410_add_activitypub_tables/up.sql)\n- ActivityPub object semantics — [W3C ActivityPub §4](https://www.w3.org/TR/activitypub/#objects)\n- listmonk, `subscribers.attribs` declaration — [`schema.sql`](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql)\n- satus structural audit corpus — [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json)\n- satus JSONB handling, today — [`packages/cli/src/generate/schema.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/schema.ts)\n';
const __vite_glob_0_8 = "---\nslug: timezone-bugs-found-by-seed-data\ntitle: Three timezone bugs we found by seeding production-shaped data\ndescription: Uniformly random timestamps hide timezone bugs. Business-hours-clustered timestamps surface them. Three bugs we have reproduced in support, and the catalog signals that predict each one.\ndate: 2026-06-12\nauthor: satus.sh\ntags: [postgres, timezones, testing, seeding]\ndraft: false\n---\n\n> **Editor's note (2026-07-16):** Passages referencing a `medical-booking` profile with per-profile default timezones and DST-aware date windows describe design intent from mid-2026. The shipped CLI (v0.3.5) ships `saas`, `ecommerce`, and `b2b` prompt profiles ([/profiles](/profiles)) that bias value choice but do not encode timezone rules. The three DST bugs and the argument for reproducing them with seed data stand on their own.\n\n\n\nMost seed-data tools draw timestamps from a uniform random distribution over some window: pick a `created_at` somewhere between `now() - interval '90 days'` and `now()`, repeat. The resulting fixture is statistically smooth. It is also, in a very specific way, a lie. Real Postgres tables almost never look like that. They look like the traffic that filled them: a daily sine wave clipped to the business hours of whatever timezone the users live in, with a weekly notch on weekends, and the occasional spike when marketing sends an email.\n\nThat shape difference matters because a long list of bugs that production has are bugs *about time*: cron windows, daily roll-ups, locks held across midnight, DST transitions, indexes that get hot at the wrong hour. A uniform fixture will not surface any of them. A fixture that looks like real traffic will. This post walks through three bugs we have reproduced in customer schemas after they switched their tests from uniform timestamps to satus's business-hours sampler, and the catalog signals satus uses to know when to apply that sampler in the first place.\n\n## The sampler, briefly\n\nThe default `timestamptz` generator in satus is not uniform. For columns that smell like event timestamps (`created_at`, `updated_at`, `occurred_at`, anything with a `_at` suffix on a `timestamptz` column) it draws from a piecewise distribution:\n\n```text\nlocal hour      weight\n─────────────   ──────\n00–06             0.5×    overnight floor\n06–09             3×      morning ramp\n09–17             8×      business hours, flat\n17–20             3×      evening ramp\n20–24             1×\n\nweekend day       0.4×    applied multiplicatively\nholiday calendar  off by default; per-profile opt-in\n```\n\n\"Local\" means a per-profile timezone, defaulting to `America/Los_Angeles` for `saas-subscriptions`, `America/New_York` for `medical-booking`, and `Europe/London` for `ecommerce`. The shape is intentionally generic; the point is not that any one schedule is correct, it is that *any* business-hours shape exposes the bugs a flat distribution hides.\n\nWhen satus inserts these timestamps into a `timestamptz` column, Postgres stores them as UTC instants. The local clustering survives the conversion because it is encoded in the instant itself. The same row in a UTC dashboard appears as a 17:00-UTC spike for a Los Angeles profile, which is exactly where the first bug lives.\n\n## Bug 1: The 02:00 UTC cron that was actually 18:00 Pacific\n\nThe schema was a SaaS application with a nightly billing roll-up. The job was scheduled in `pg_cron` at `0 2 * * *`, with a comment in the migration that read `-- runs during the low-traffic window`. Under uniform-random seed data the comment was true: the test suite saw flat 4% of daily inserts in each hour bucket, and 02:00 UTC was indistinguishable from any other hour. The roll-up finished in seconds.\n\nWith business-hours-clustered seed data on a Pacific profile, 02:00 UTC is 18:00 Pacific, which is inside the evening ramp. The seeded fixture put roughly half of the day's `invoices` rows inside a four-hour window straddling that time. The roll-up was a single `UPDATE ... FROM (SELECT ...)` that took an exclusive lock on a summary table the application's hot read path also wanted. In the new fixture, that read path piled up behind the lock and the integration test that asserted \"homepage renders in under 500ms\" started timing out.\n\nNothing about the application logic was wrong, in the sense that no query was incorrect and no constraint was violated. The bug was the assumption baked into the comment. The fix was either to move the cron (the team chose `0 9 * * *` UTC, which is 02:00 Pacific and actually low-traffic for their user base) or to drop the exclusive lock (a longer refactor they took on later). The point for this post is that the test suite could not have flagged the issue without a fixture whose timestamps clustered the way production's did.\n\nThe catalog signal satus used to flag the columns participating in this bug:\n\n```text\nsignal                                   how it fires\n──────────────────────────────────────   ─────────────────────────────────\ncolumn type is timestamptz               pg_attribute.atttypid = 1184\ncolumn name matches event suffix         attname ~ '_(at|_on|_time)$'\ncolumn is the partition key of a         pg_partitioned_table.partattrs\n  range-partitioned parent                 includes this column\ncolumn appears in a daily index           covering index whose first key\n  (`(date_trunc('day', col))`)             is `date_trunc('day', col)`\n```\n\nAny one of the first two is enough to switch the sampler on. The last two raise the weight of the clustering; if the table is partitioned by day, satus also makes sure the seed data spans enough partitions to exercise constraint exclusion in the planner.\n\n## Bug 2: `date_trunc('day', ts)` in the wrong timezone\n\nThe schema was an analytics application with a \"today\" dashboard. The relevant query was, paraphrased:\n\n```sql\nSELECT count(*) AS events_today\nFROM events\nWHERE date_trunc('day', occurred_at) = date_trunc('day', now());\n```\n\n`occurred_at` was `timestamptz`. The cluster ran in UTC. Most users were on the US East coast. Under uniform seed data the test \"events_today returns the count of today's events\" passed reliably, because uniformity hides the failure mode: with events spread evenly across the day, the count for the current UTC day and the count for the current local day differ by a small constant ratio, and the assertion was a range check.\n\nUnder business-hours-clustered seed data on a New York profile, the failure mode showed up immediately. New York business hours are 09:00 to 17:00 Eastern, which is 13:00 to 21:00 UTC during EST and 13:00 to 21:00 (offset by one) under EDT. Most events landed comfortably inside a single UTC day. But the evening ramp (17:00–20:00 Eastern, roughly 21:00–00:00 UTC under EST and 21:00–00:00 shifted forward an hour under EDT) regularly pushed events past UTC midnight. The dashboard, rendered on a developer machine running in `America/New_York`, asked for \"today\" in local time and got back a `date_trunc` computed in UTC. A meaningful slice of the late-day events was silently filed under \"tomorrow\" from the user's perspective. The assertion that \"events_today is non-zero at 09:30 local\" broke intermittently in CI, on exactly the days the seeded clusters happened to land late enough.\n\n`date_trunc` has had a three-argument form that takes a target timezone since Postgres 12 ([PostgreSQL: date_trunc](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-TRUNC)). The query the team landed on was:\n\n```sql\nSELECT count(*) AS events_today\nFROM events\nWHERE date_trunc('day', occurred_at, 'America/New_York')\n    = date_trunc('day', now(),       'America/New_York');\n```\n\nIdentical structure, two extra arguments, behavior that matches the user's mental model of \"today\". The reason the bug never showed up in development was that the developer ran the dashboard from a browser in the same timezone as the server's idea of \"today\" only when both happened to be UTC, which is not the case on most laptops. The reason it never showed up in CI under uniform fixtures was that uniformity averages the failure away.\n\nThe catalog signal here is weaker than for bug 1, because nothing about the column declaration tells satus that a downstream query will call `date_trunc` without a timezone argument. What satus does instead is, during `satus plan`, scan the schema for views, materialized views, and stored functions that reference `timestamptz` columns and call `date_trunc` with two arguments. When it finds them, it prints a planner note:\n\n```text\nsatus plan: view `public.events_daily` calls\n  date_trunc('day', occurred_at)\n  on a timestamptz column without a timezone argument.\n  Seed data clusters around business hours in the\n  saas-subscriptions profile (America/Los_Angeles), which\n  will produce events whose UTC date differs from their\n  local date. If your dashboard reads this view, the count\n  will not match the user's \"today\".\n```\n\nWe do not fix the query; that is the application's call. We do make sure the test suite has the inputs that would have caught the disagreement.\n\n## Bug 3: DST gaps in `timestamp without time zone`\n\nThe schema was a medical-booking application with an `appointments` table. The `scheduled_for` column was declared `timestamp without time zone`, which is unfortunately common in calendar-shaped schemas because the developer intent was *\"this appointment is at 9am wall-clock time on this date, regardless of what UTC thinks\"*. A `timestamp without time zone` value is stored as a literal wall-clock date and time with no timezone attached; Postgres has no record of which zone the writer meant, so any later `AT TIME ZONE` conversion is purely a guess on the application's part. This is the well-known footgun documented in [Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-TIMEZONES) and called out in the Postgres wiki's [Don't Do This](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_timestamp_.28without_time_zone.29) list.\n\nUnder uniform random timestamps drawn from a 90-day window, the test suite seeded thousands of appointments and almost never produced one that landed on a DST transition. Each year has exactly one spring-forward instant per zone where a one-hour wall-clock interval does not exist, and one fall-back instant where a one-hour interval exists twice; both are vanishingly small targets for a uniform sampler whose window may not even contain the relevant Sunday. CI passed on the runs that missed and failed inscrutably on the rare runs that did not.\n\nThe `medical-booking` profile in satus does two things differently. First, it clusters appointment times on the hour and half-hour during business hours, because that is what booking systems actually do. Second, it shifts the date window deliberately to span the most recent spring-forward Sunday and the most recent fall-back Sunday in the profile's timezone (`America/New_York` by default). The result is that every test run sees a handful of appointments declared for `2026-03-08 02:30`—a wall-clock time that does not exist in Eastern time, because the clocks jumped from 01:59 to 03:00—and a handful declared for `2026-11-01 01:30`, which exists twice.\n\nThe bug surfaced in two places:\n\n- The `INSERT` itself succeeded, because `timestamp` columns do not validate against any timezone. The string was parsed as a literal wall-clock value and stored.\n- A downstream report that converted the column to UTC for export, using `scheduled_for AT TIME ZONE 'America/New_York'`, returned a duplicate row for the fall-back ambiguous time (the conversion picked the first occurrence) and a row shifted forward by an hour for the spring-forward non-existent time. The team's reconciliation script, which compared the export against the source table by exact instant, refused to reconcile and paged on-call.\n\nThe team's fix was to migrate the column to `timestamptz` and store the user's intended UTC instant at booking time, computed from the user's selected zone. This is the correct fix and also the one the Postgres documentation has been recommending for over a decade. It is not always available—some teams have application code that depends on the wall-clock semantics and cannot be rewritten on the schedule the bug demands—and in those cases the secondary fix is to add a `CHECK` constraint that uses [`pg_timezone_names`](https://www.postgresql.org/docs/current/view-pg-timezone-names.html) and an explicit conversion to validate that the stored value is not in a gap or ambiguity window for the relevant zone. Either way, the test suite needed fixtures that actually contained DST-edge values, and that is what the seeded data delivered.\n\nCatalog signal:\n\n```text\ncolumn type = timestamp without time zone   pg_attribute.atttypid = 1114\ncolumn name matches calendar suffix         attname ~ '(scheduled|due|\n                                              starts|ends|booked|expires)'\nprofile has a timezone declared             profile.tz is set\n```\n\nWhen all three fire, the `medical-booking` and `appointments`-shaped profiles bias the seed window to include both DST transitions in `profile.tz` for the current year. The biasing is a single multiplier on the date sampler; it does not affect the hour distribution.\n\n## What this is not\n\nThis is not a claim that seeded data substitutes for production traffic. It does not, and we will not pretend otherwise. The bugs above are reproducible because they are *structural*: they depend on the shape of the distribution, not its absolute volume. A fixture with the right shape and a thousand rows surfaces them. A fixture with the wrong shape and a billion rows will not.\n\nThe bugs we cannot reproduce with seeded data, and where load testing or shadow traffic is still the right answer, look different. They depend on absolute throughput (a query that is fine at 100 QPS and falls over at 10,000), on adversarial inputs we did not think to seed, on race conditions across processes the test harness only runs one of, or on data volumes that change which index the planner picks. We try to be honest about this in [the quickstart](/quickstart): satus generates fixtures that look like production-shaped data, not fixtures that *are* production data.\n\nWithin that scope, timezone bugs are an unusually good fit. They are deterministic given the input distribution, they almost always fail loudly once they fail, and the catalog signals are clean enough that satus can flag them without guessing. The three above are the ones we have seen most often. There are others—index hot spots that move across a daily cycle, partition pruning that breaks when the day boundary in the partition key disagrees with the day boundary in the query, materialized views refreshed on a schedule that races a write window—and they all have the same general shape: a uniform fixture would not have surfaced them.\n\n## Where this fits in satus\n\nThe business-hours sampler is on by default for every built-in profile. The detector for bug 2 (`date_trunc` without a timezone argument) runs as part of `satus plan` and prints to stdout; it does not fail the run. The DST-window biasing for bug 3 is enabled in the `medical-booking` profile and disabled elsewhere, with a per-profile knob to turn it on:\n\n```text\n# in your profile YAML\ntimestamps:\n  sampler: business_hours        # default for new profiles\n  timezone: America/Denver       # overrides profile default\n  dst_edges: include             # bias the window to span transitions\n```\n\nThe dry-run planner ([quickstart](/quickstart)) prints the resolved sampler for every `timestamptz` and `timestamp` column it generates, so you can see what shape the fixture will have before you run it against your database.\n\n## The shorter version\n\nA uniformly random fixture is statistically smooth and operationally inert: it cannot show you the bugs whose existence depends on traffic clustering around real hours, because it has no such clustering. Business-hours-shaped fixtures surface a small, recurring set of timezone bugs that production has and CI does not. Three of them—a cron scheduled \"during low traffic\" that is actually peak local traffic, a `date_trunc` that disagrees with the user's \"today\", and an appointments table that quietly accepts non-existent DST-gap times—are common enough that satus's default profiles bias toward producing the input that reveals them. The catalog has enough signal to know which columns need the special treatment; the application has to do the rest.\n\n## References\n\n- PostgreSQL documentation, [Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html) and [Date/Time Functions](https://www.postgresql.org/docs/current/functions-datetime.html), especially [`date_trunc`](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-TRUNC) and [`AT TIME ZONE`](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-ZONECONVERT).\n- PostgreSQL documentation, [`pg_timezone_names`](https://www.postgresql.org/docs/current/view-pg-timezone-names.html).\n- PostgreSQL wiki, [Don't Do This—timestamp without time zone](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_timestamp_.28without_time_zone.29).\n- IANA, [Time Zone Database](https://www.iana.org/time-zones), the source Postgres ships its zone rules from.\n- `pg_cron`, [README](https://github.com/citusdata/pg_cron), for the cron-window scheduling semantics referenced in bug 1.\n- Earlier in this log: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [The CITEXT trap](/blog/the-citext-trap).\n- The corpus underlying satus's structural detectors: [`corpus/audit-2026-06-01.json`](https://satus.sh/corpus/audit-2026-06-01.json) (5 schemas, 151 tables, 1,095 columns, 227 FKs, Postgres 17).\n- See also: [satus profiles](/profiles), [quickstart](/quickstart).\n\n—the satus.sh team\n";
const __vite_glob_0_9 = "---\nslug: ecommerce-profile\ntitle: \"Inside the e-commerce profile: SKUs, carts, and the long tail of returns\"\ndescription: Catalog distributions, basket sizes, return rates, and seasonality the satus e-commerce profile encodes, what it leaves to the user, and why we do not ship a fashion-vs-electronics switch.\ndate: 2026-06-15\nauthor: satus.sh\ntags: [profile, ecommerce, distributions, postgres, seeding]\ndraft: false\n---\n\n> **Editor's note (2026-07-16):** This post describes profile-system design intent from mid-2026. The shipped CLI (v0.3.5) uses prompt-based profiles — `saas`, `ecommerce`, `b2b` — with no YAML profile files or per-profile invariant enforcement beyond the user's Postgres constraints. See [/profiles](/profiles) for the current behavior. The post is preserved for its distribution-modeling arguments.\n\n\n\nA consumer e-commerce schema is mostly three tables wearing trench coats: a catalog, a basket, and an order log. Each of those tables is dominated by a distribution that almost no uniformly random seeder reproduces. Catalogs are long-tailed: a small minority of SKUs absorb most of the traffic. Baskets are power-law-ish: most are one item, a few are five, and one in a thousand looks like somebody refreshing the page after the holiday email landed. Returns concentrate around a small set of categories and a small set of weeks. If your tests, dashboards, or planner statistics depend on those shapes, the default uniform fixture is silently wrong, and the wrongness only becomes visible once you have shipped. The `ecommerce` profile in [satus](/) is the choices we made about which of those shapes to encode by default and which to leave to you. This post is the inventory.\n\nThe shape of this post mirrors the [medical-booking deep-dive](/blog/medical-booking-profile): the distributions baked in, the constraints we lean on, and the things we deliberately decline to ship. The constraints discussion assumes you have read [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild). The seasonality section builds on [Three timezone bugs we found by seeding production-shaped data](/blog/timezone-bugs-found-by-seed-data); if you have not read that one, the short version is that ecommerce traffic has the same hour-of-day curve as appointments and the same need to respect the customer's local time, not the server's.\n\n## Why a uniform fixture is the wrong fixture\n\nA uniformly random ecommerce fixture has every column populated, every foreign key resolved, and no row that would offend a CHECK constraint. It also has a catalog where every SKU has identical traffic, baskets that are normally distributed around three items, and returns scattered evenly across the year. Three things break the moment you point a real query plan at it.\n\nFirst, the query planner. Postgres's planner statistics live in `pg_statistic` and are summarised in `pg_stats`; the planner uses them to estimate selectivity for every WHERE clause involving an indexed column ([PostgreSQL documentation: Statistics Used by the Planner](https://www.postgresql.org/docs/current/planner-stats.html)). A flat catalog produces flat statistics, and flat statistics produce plans that are wrong in exactly the cases where production hurts: the popular SKU, the popular country, the popular size.\n\nSecond, the application's own caching and fan-out logic. Code paths that assume a 90/10 split between hot and cold SKUs are never exercised by a fixture without a hot/cold split. Code paths that assume bulk baskets are rare are never exercised by a fixture where baskets are normally distributed. Bugs in those code paths surface in production at exactly the rate the fixture failed to model them.\n\nThird, the back-office and finance integrations. Returns, refunds, chargebacks, and tax adjustments are correlated with each other in time, with promotional events, and with category. A fixture that scatters them uniformly produces a reconciliation report that looks healthy and is, in a structural sense, fiction.\n\n## What the profile encodes\n\nThe profile is a YAML document the CLI reads at planning time. It is intentionally coarse: the goal is one defensible curve per shape, not a dial-rich configuration surface that the user has to tune before the first run. Distributions can be overridden per column or per table; the defaults below are what you get if you do nothing.\n\n| Shape | Encoded as | Default | Notes |\n| --- | --- | --- | --- |\n| SKU popularity | Zipf over catalog rows | exponent s ≈ 0.8 | over 10k SKUs: top 5% carry ≈ 48% of orders, bottom 50% carry ≈ 15% |\n| Catalog size growth | log-normal over `created_at` | median age ≈ 9 months | new SKUs are rarer than old ones, with a recent-launch bump |\n| Price | log-normal in currency minor units | median ≈ 24.00, p95 ≈ 199.00 | snapped to .99 / .49 / .00 endings, clamped to schema CHECK if present |\n| Basket size | shifted-Zipf in items per order | mode = 1, p95 = 5, p99.9 ≈ 22 | the long right tail is the point |\n| Hour-of-day | bimodal triangular in local time | peaks 12:00 and 20:00, floor 06:00, ceiling 24:00 | local to the customer's billing-address country, not UTC |\n| Day-of-week | weighted per-day multiplier | Mon–Thu 1.0, Fri 1.15, Sat 1.20, Sun 1.10 | not a hard rule, easy to override per profile |\n| Seasonality | per-month multiplier | Nov 1.45, Dec 1.55, Jan 0.85, Feb 0.80 | calendar-driven, no specific event named |\n| Order status | weighted categorical | placed 0.04, paid 0.78, fulfilled 0.10, refunded 0.05, cancelled 0.03 | terminal states only; mid-flight rows clipped at sample window |\n| Return rate | per-category override | apparel 0.20, electronics 0.08, home 0.05, other 0.07 | applied as a post-pass over fulfilled rows |\n| Country | weighted categorical | US 0.42, GB 0.11, DE 0.09, FR 0.06, JP 0.05, other 0.27 | matches the spoken locales in the prompt |\n\nThe Zipf distribution for SKU popularity is the load-bearing choice in this profile, and it is the one that most often surprises users coming from uniform fixtures. Zipf is a discrete power law in which the frequency of the k-th most popular item is proportional to 1/k^s, and it appears in catalog telemetry across consumer commerce, content recommendation, and search ([Wikipedia: Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law), with the canonical reference being Newman's review of power laws in empirical data, [arXiv:cond-mat/0412004](https://arxiv.org/abs/cond-mat/0412004)). The \"long tail\" framing from Anderson's 2004 essay in *Wired* is downstream of the same shape ([Anderson, \"The Long Tail\", *Wired* 12.10, October 2004](https://www.wired.com/2004/10/tail/)). We do not claim s ≈ 0.8 is the right exponent for your catalog; we claim it is closer than s = 0 (uniform) for almost any catalog.\n\nA quick visualisation of the default SKU popularity curve over a 10,000-SKU catalog, bucketed by decile of rank:\n\n```text\nshare of orders by SKU popularity decile (Zipf s=0.8, 10k SKUs)\ntop 0–10%   ████████████████████████████  57%\n10–20%      █████                         11%\n20–30%      ████                           7%\n30–40%      ███                            5%\n40–50%      ██                             4%\n50–60%      ██                             4%\n60–70%      ██                             3%\n70–80%      █                              3%\n80–90%      █                              3%\n90–100%     █                              2%\n```\n\nThe top decile carries roughly 57% of the volume. The bottom 50% of the catalog together carry roughly 15%. A uniform fixture flattens this into ten 10% bars; the planner sees a different table.\n\n## Basket size, which is where most schemas hide their bugs\n\nBasket size in real stores is a power-law-ish discrete distribution. The mode is one item. Two-item baskets are common. Three-, four-, and five-item baskets exist and get rarer fast. Beyond ten items the distribution does not go to zero; it goes to a thin long tail of baskets in the dozens that are typically a B2B account stocking up, a wedding registry checkout, or somebody refreshing the page after a marketing email lands and pricing changes mid-session.\n\nThe profile samples basket size from a shifted Zipf with a small additive constant so the mode lands cleanly at 1:\n\n```text\nitems per order, default profile (illustrative shape, not a measurement)\n 1 item   ████████████████████████████████████████  62%\n 2        ██████████████████                        22%\n 3        █████████                                  9%\n 4        ████                                       4%\n 5        ██                                         2%\n 6        █                                          0.6%\n 7–10     █                                          0.3%\n 11–25                                               <0.1%\n 26+                                                 <0.01% (rare, not zero)\n```\n\nThe \"rare, not zero\" row in the long tail is the row that catches code paths the team forgot existed. We have watched the same bug get reported twice: a checkout endpoint that builds a single SQL statement per line item, hits the prepared-statement parameter limit somewhere north of 65 thousand placeholders ([PostgreSQL documentation: Frontend/Backend Protocol — Bind](https://www.postgresql.org/docs/current/protocol-message-formats.html)), and 500s on a basket that production has actually seen. Uniform fixtures never produced the row that reproduces the bug.\n\n## Returns and the long tail of categories\n\nReturn rates are heterogeneous in a way that matters more than the headline number. Apparel returns at multiples of the rate of electronics, which returns at multiples of the rate of consumables. Within apparel, footwear and outerwear sit above the category mean; within electronics, accessories sit below the mean. We encode this as a per-category rate, not a single store-wide rate, because the difference between \"5% returns across the store\" and \"20% returns concentrated in one category\" is the difference between a finance dashboard that is broadly right and one that is broadly wrong.\n\nWe do not embed specific industry numbers as defaults. Published trade-association estimates of overall retail return rates exist, but the methodology varies across studies and across years, so the per-category defaults the profile ships are deliberately our own opinion calibrated to land inside the published ranges. The values you should care about are the relative magnitudes, not the absolute percentages; the rates are easy to override.\n\nReturns also cluster in time. The seasonality multipliers above push orders into November and December; the profile then concentrates the corresponding returns into the following four to six weeks. This is the single most useful thing a fixture can do for a Q1 finance team: produce a January in which the refund table is busy and the order table is not, because that is what their reconciliation actually looks like.\n\n## Constraints we recommend, and sometimes generate\n\nThe profile is more useful when the schema has constraints that match its shape. Two we lean on in almost every ecommerce schema we see:\n\n```sql\n-- 1. Money never goes negative; line totals add up.\nALTER TABLE order_items\n  ADD CONSTRAINT order_item_amounts_nonneg\n  CHECK (quantity > 0 AND unit_price_cents >= 0 AND line_total_cents >= 0);\n\n-- 2. line_total is derived; make it a generated column so the seeder\n--    cannot disagree with the application.\nALTER TABLE order_items\n  ADD COLUMN line_total_cents bigint\n  GENERATED ALWAYS AS (quantity * unit_price_cents) STORED;\n```\n\nThe first is a plain `CHECK` and we always honour it. The second is a `GENERATED ALWAYS AS ... STORED` column, which Postgres has shipped since version 12 ([PostgreSQL documentation: Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html)). When a generated column is present, `satus` never writes to it; the database computes it and the fixture and the application agree by construction. When it is absent, we write a value that satisfies the obvious arithmetic, and we print a planner-time warning that this is the kind of column you almost certainly want generated.\n\nFor currency, we store integer minor units (`bigint`, cents) rather than `numeric(10,2)` by default, because integer arithmetic does not lose pennies under aggregation and because that is what a long line of payment-processing literature recommends. The Postgres-side argument is that `numeric` is exact but slow and that floating-point money is a known antipattern ([PostgreSQL Wiki: Don't Do This — Don't use money](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_money)). If your schema uses `numeric(10,2)` we respect it; if it uses `money` we sample it and we warn.\n\n## Multi-currency, which the profile mostly avoids\n\nA real international store has prices in multiple currencies, exchange rates that drift, and order totals that should be stored in the currency the customer paid in plus a rate snapshot. The profile expresses this only weakly: it samples a `currency` column from a weighted categorical (USD 0.55, EUR 0.20, GBP 0.10, JPY 0.05, other 0.10), uses ISO 4217 alphabetic codes ([ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)), and clamps prices to a sensible per-currency range. It does not generate a rate table, does not vary rates over time, and does not attempt to reconcile a total across currencies. We have been asked to ship a full multi-currency model and have, so far, declined. The reason is that the right model depends on whether your store charges in the customer's currency, settles in a base currency, or both; encoding one of those three opinions as a default would be wrong for the other two.\n\n## What the profile deliberately does not encode\n\nWe get asked for each of these regularly. The reasons matter more than the list.\n\n- **Fashion-vs-electronics-vs-grocery switch.** Every category has its own price distribution, return rate, basket size, and seasonality, and we have customers asking for each. We do not ship a category switch because the value of the profile is in the cross-cutting shapes (Zipf catalog, power-law baskets, holiday peaks, category-weighted returns) and the category-specific shapes belong in user overrides where they can be tuned without us shipping a release. A built-in `fashion` profile would be wrong for the next user who asked for `streetwear`.\n- **Real product catalogs.** We seed product names from a generic descriptor-and-noun pool and do not reproduce a real retailer's SKU list. Real catalogs are trademarked and frequently licensed; using them by default produces fixtures that look like a particular real store, which is the opposite of what synthetic data should do.\n- **Real customer PII.** Names, emails, addresses, and phone numbers are generated from neutral pools and explicitly do not match real records. Addresses are syntactically valid for their country but do not correspond to occupied buildings.\n- **Payment instrument data.** We never generate card numbers, even test ones, and we never generate anything that resembles a real bank account, IBAN, or routing number. If a column is named like a card number we fill it with the all-zeros placeholder and warn at plan time. Test card numbers are a payment-processor concern, not a seeder concern, and the safest thing we can ship is nothing at all.\n- **Tax tables.** We will populate a `tax_cents` column with a plausible value relative to the line total, but we do not attempt to compute jurisdiction-correct tax. A fixture that gets California sales tax structurally right is one bad rounding rule away from a fixture that gets it confidently wrong, and the right place to test tax is against a real tax service in a staging environment.\n- **Inventory and stock movements.** Out of scope for v1. Plausibly a future `inventory` profile if enough users ask for it.\n\nA user who needs any of these can override the relevant column in their own profile file. We will help. We will not ship them on by default.\n\n## State-flag columns, briefly\n\nThe `ecommerce` profile, like the others, leans on the heuristic introduced in [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question) for filling timestamp-shaped state-flag columns. Restating the table from that post for ease of reference:\n\n| Profile | State-flag columns hit | Median `frac_null` | Range |\n| --- | --- | --- | --- |\n| saas-subscriptions | 12 | 0.97 | 0.90 – 0.995 |\n| medical-booking | 7 | 0.94 | 0.85 – 0.99 |\n| ecommerce | 9 | 0.96 | 0.88 – 0.99 |\n\nNine columns is the typical ecommerce schema's set of `paid_at`, `fulfilled_at`, `shipped_at`, `delivered_at`, `cancelled_at`, `refund_requested_at`, `refunded_at`, `chargeback_at`, and `dispute_resolved_at`. Most of them are NULL for most rows because most rows do not reach the terminal state that fills them, which is exactly the point of the heuristic.\n\n## How to inspect what you are getting\n\nTwo commands cover most questions.\n\n```bash\n# Dump the resolved profile (defaults + your overrides) as JSON.\nsatus profile show ecommerce --resolved\n\n# Plan a run without writing rows; prints the distribution\n# satus will sample from for every column it touches.\nsatus plan --profile ecommerce --schema shop\n```\n\n`satus plan` annotates each column with the distribution name, the parameters, and the source: default, profile override, or schema-derived. If a number in your fixture looks wrong, the plan output is where to look first. The hour-of-day and seasonality samplers are on by default for every built-in profile, so you can verify before any row is written that the planner is going to do what you expect.\n\n## The shorter version\n\nAn ecommerce profile is mostly a list of opinions about distribution shape. The opinions are: catalogs are long-tailed; baskets are mostly one item with a heavy right tail; orders cluster in the customer's evening hours and in the back half of the calendar year; returns concentrate by category and by week; and money is an integer. Encoding those opinions turns out to be much more of the value than any single curve, because the planner, the application code, and the finance dashboards all behave qualitatively differently against power-law data than against uniform data.\n\nIf you are seeding an ecommerce-shaped schema and the default profile is wrong for your category, override the bits that matter and leave the rest. If you want a profile we do not yet ship, the [/profiles](/profiles) page lists the three built-ins, the [/quickstart](/quickstart) shows how to point the CLI at your schema, and the [/recipes](/recipes) page has a worked example of a profile override.\n\n## References\n\n- PostgreSQL documentation, [Statistics Used by the Planner](https://www.postgresql.org/docs/current/planner-stats.html).\n- PostgreSQL documentation, [Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html).\n- PostgreSQL documentation, [Frontend/Backend Protocol — Message Formats](https://www.postgresql.org/docs/current/protocol-message-formats.html).\n- PostgreSQL Wiki, [Don't Do This — Don't use money](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_money).\n- ISO, [4217 Currency codes](https://www.iso.org/iso-4217-currency-codes.html).\n- Newman, M. E. J. (2005), \"Power laws, Pareto distributions and Zipf's law\", *Contemporary Physics* 46(5):323–351. [arXiv:cond-mat/0412004](https://arxiv.org/abs/cond-mat/0412004).\n- Anderson, C. (2004), \"The Long Tail\", *Wired* 12.10. [Original article](https://www.wired.com/2004/10/tail/).\n- Wikipedia, [Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law).\n- Earlier in this log: [Inside the medical-booking profile](/blog/medical-booking-profile), [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [Three timezone bugs we found by seeding production-shaped data](/blog/timezone-bugs-found-by-seed-data), [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n\n—the satus.sh team\n";
const __vite_glob_0_10 = '---\nslug: check-constraints-that-lie\ntitle: "Check constraints that lie"\ndescription: Postgres CHECK constraints look like rules but often encode wishes. Where they leak (NULL, non-immutable expressions, NOT VALID, domains), why satus has to detect it, and what to write instead.\ndate: 2026-06-17\nauthor: satus.sh\ntags: [postgres, constraints, schema, seeding]\ndraft: false\n---\n\nA `CHECK` constraint in Postgres looks like a rule. Half the time it is a rule. The other half it is a wish the schema author wrote down once and that the database has been quietly not enforcing ever since. For a tool like [satus](/) that has to generate rows the schema will accept on the first try, the difference matters: a constraint that the database treats as advisory is one the seeder can ignore, and a constraint that the database enforces is one the seeder has to plan around. This post is the field guide to the four ways a `CHECK` lies, the one way it cannot, and how the CLI sorts them at planning time.\n\nThe behaviours below are all documented in [PostgreSQL\'s CREATE TABLE reference](https://www.postgresql.org/docs/current/sql-createtable.html) and the [CHECK constraint section of "Data Definition"](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS); none of this is a Postgres bug. The bug, when it exists, is the gap between what the author thought they had written and what Postgres agreed to enforce.\n\n## The short version, for the planner-stats reader\n\nPostgres evaluates a `CHECK` expression per row at INSERT or UPDATE time and rejects the row if the result is `FALSE`. It accepts the row if the result is `TRUE` or `NULL`. It does not re-evaluate the expression later, it does not run the expression against existing rows when a `NOT VALID` constraint is added, and it does not stop you from putting a function in there that returns a different answer the next time you call it. Each of those choices is reasonable in isolation. Together they make `CHECK` the constraint most likely to silently disagree with the application that depends on it.\n\n## Lie #1: the constraint that ignores NULL\n\n`CHECK (x > 0)` does not reject rows where `x` is `NULL`. It evaluates to `NULL`, and Postgres treats a `NULL` result as "not false", which is "accept". This is the documented behaviour of SQL three-valued logic; it is also the single most common way a `CHECK` constraint encodes a rule the database is not enforcing.\n\nA concrete example from the wild. In the schemas we audit for our corpus (see [Inside the e-commerce profile](/blog/ecommerce-profile) for the methodology), the only schema that ships more than one `CHECK` is PowerDNS\'s gpgsqlbackend, which puts a [`c_lowercase_name CHECK ((name)::TEXT = LOWER((name)::TEXT))`](https://github.com/PowerDNS/pdns/blob/auth-4.9.3/modules/gpgsqlbackend/schema.pgsql.sql) on four tables. Two of those tables declare `name VARCHAR(255) NOT NULL`; the CHECK is real on those rows. The other two declare `name VARCHAR(255)` or `name VARCHAR(255) DEFAULT NULL`; the CHECK passes silently whenever `name` is `NULL`, which is exactly when the lowercase rule cannot apply. The constraint is correct as written and almost certainly does what the author intended. It is also a useful demonstration that the same one-line `CHECK`, copy-pasted across four tables, is enforced on two of them and advisory on the other two.\n\nFor seed-data generation the rule is mechanical. If a column is nullable and the `CHECK` would be `NULL`-tolerant, `satus` is free to emit `NULL`; the constraint contributes nothing to the value space and the planner stats will reflect whatever `frac_null` the column profile dictates ([NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question) is the longer treatment of how we pick that fraction). If the column is `NOT NULL`, the `CHECK` becomes load-bearing and we have to solve for it.\n\nIf you want the rule "name must be lowercase, and must also be present", the correct form is two constraints, not one:\n\n```sql\nALTER TABLE domains\n  ALTER COLUMN name SET NOT NULL,\n  ADD CONSTRAINT name_lowercase\n    CHECK (name = LOWER(name));\n```\n\nOr, if you prefer a single expression, write the `NULL` case explicitly:\n\n```sql\nCHECK (name IS NOT NULL AND name = LOWER(name))\n```\n\nThe two forms are equivalent at the row level. The first is easier to introspect; tools like `satus` can read the `NOT NULL` bit and the `CHECK` bit independently and reason about them separately, which is the same reason `\\d` prints them separately.\n\n## Lie #2: the constraint with a non-immutable expression\n\nPostgres lets you put a non-immutable function inside a `CHECK`. It will warn about volatile functions in some contexts and silently accept stable ones, but the underlying property is that the constraint is evaluated once at INSERT or UPDATE time and never again. That is fine for `CHECK (created_at <= now())`, where the constraint is a sanity check at write time and any later drift is harmless. It is a serious problem for `CHECK (expires_at > now())`, which an author writes meaning "this row must always be in the future" and which the database enforces meaning "this row must have been in the future at the moment it was written".\n\nThe damage shows up in three places. Reports built on `WHERE expires_at > now()` and a separately-maintained `WHERE NOT expired` flag disagree, because the flag updates on a job and the CHECK does not. Materialised views or partial indexes built on the same expression are correct on insert and drift afterwards. A `pg_dump` and restore can fail when the dump reloads rows that were valid when written but whose `expires_at` has since passed; in older Postgres versions and in some failure modes this still surfaces as a confusing restore error. The PostgreSQL manual is unambiguous about the cause: "PostgreSQL does not support CHECK constraints that reference table data other than the new or updated row being checked" ([CHECK Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS)), and `now()` is read-table data in disguise.\n\nFor seeding, satus treats any `CHECK` whose expression references `now()`, `current_date`, `current_timestamp`, `clock_timestamp()`, `transaction_timestamp()`, `statement_timestamp()`, `random()`, or a `VOLATILE` user-defined function as satisfiable-at-write-time and nothing more. We produce a row that will pass the CHECK at the moment of insertion; we also emit a planner-time warning that the constraint is not a long-term invariant. The warning is the point. A user who sees `expires_at > now()` and wants a rule that holds forever needs either an application-side enforcement, a trigger that recomputes on read, or an explicit `EXCLUDE` constraint on a time range, none of which a `CHECK` will give them.\n\n## Lie #3: the NOT VALID constraint\n\n`ALTER TABLE ... ADD CONSTRAINT ... CHECK (...) NOT VALID` adds a constraint without scanning existing rows ([ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)). New writes are checked; old rows are grandfathered in until somebody runs `ALTER TABLE ... VALIDATE CONSTRAINT`. This is a deliberately useful feature: large tables can adopt a new rule without a long, locking scan, and the validate step can be run later in a smaller, off-peak window.\n\nThe lie is in what people forget to run the validate step. We have seen production schemas where a constraint has been `NOT VALID` for years, the team has long since stopped thinking of it as conditional, and a quarter of the rows in the table do not satisfy it. Application code that assumes the constraint holds runs into the unvalidated rows the first time somebody widens a query. Seed-data tools that try to reproduce production land in the same trap: if you generate rows that look like the average of production, half of them will satisfy a constraint that half of production does not.\n\n`satus` reads the `convalidated` column of `pg_constraint` and treats `NOT VALID` constraints as live for the rows we generate; we obey them. We also surface them in the plan output as a separate category, because a constraint that production does not yet satisfy is a constraint the user should know about before they ask why their fixture is "cleaner" than their database. The relevant `pg_catalog` field is documented in the [system catalogs reference](https://www.postgresql.org/docs/current/catalog-pg-constraint.html); we do not infer it, we read it.\n\n## Lie #4: the domain constraint that disappears\n\nPostgres lets you define a `DOMAIN` with its own `CHECK`, then use that domain as a column type. The constraint moves from `pg_constraint` (where most tools look) to `pg_type` / `pg_constraint` linked through `pg_constraint.contypid`. Tools that introspect a table by scanning `pg_constraint WHERE conrelid = <table>` miss it entirely. The constraint is fully enforced; it just is not where most introspection code looks for it.\n\nPagila\'s schema is a small but clean example. It declares [`CREATE DOMAIN public.year AS integer CONSTRAINT year_check CHECK (VALUE >= 1901 AND VALUE <= 2155)`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql) and uses `year` as the type of `film.release_year`. A naive introspector reports zero CHECK constraints on `film`. A correct one reports one, sourced from the domain, with `VALUE` as the placeholder for the column.\n\n`satus` handles domains by walking the type chain at planning time: for every column, we resolve the base type, collect any `CHECK` defined on intermediate domains, and treat them as if they were defined inline on the column. The behaviour is described in [PostgreSQL\'s CREATE DOMAIN reference](https://www.postgresql.org/docs/current/sql-createdomain.html). For Pagila\'s `release_year` we sample uniformly in `[1901, 2155]` and warn the user that their year column has a hard upper bound just over a century out, which is one of those facts that is fine until 2156.\n\n## The one CHECK that cannot lie: arithmetic on the new row\n\nThe reason `CHECK` exists in the first place is the case where it cannot lie. An expression that references only the row being written, uses only immutable operators and functions, and is not `NULL`-tolerant in a way the author did not intend, is a proper constraint. Postgres enforces it on every write, the planner can use it to prove things about the column (`CHECK (x > 0)` lets the planner avoid scanning negative-x partitions), and `pg_dump` round-trips it without surprises. The canonical examples are the boring ones:\n\n```sql\n-- arithmetic invariants\nCHECK (quantity > 0)\nCHECK (start_at < end_at)\nCHECK (line_total_cents = quantity * unit_price_cents)\n\n-- enum-shaped TEXT columns\nCHECK (status IN (\'placed\',\'paid\',\'fulfilled\',\'refunded\',\'cancelled\'))\n\n-- format invariants (immutable, NULL-tolerant in a deliberate way)\nCHECK (email IS NULL OR email ~ \'^[^@]+@[^@]+\\.[^@]+$\')\n```\n\nThese satus enforces by construction: we sample inside the allowed value space rather than rejecting outside it, so the seeder never produces a row that violates them. The plan output lists each one under "honoured by sampling" so the user can see at a glance which constraints are doing work in the fixture.\n\n## How the planner sorts CHECKs\n\nConcretely, for every `CHECK` we find on a target table, the planner classifies it into one of four buckets:\n\n| Bucket | Detection | What satus does |\n| --- | --- | --- |\n| Honoured by sampling | Immutable expression over the new row, not `NULL`-tolerant in a way that matters for this column | Constrain the sampler so generated values satisfy the predicate |\n| `NULL`-tolerant on a nullable column | Expression evaluates to `NULL` whenever the column is `NULL`, and the column is nullable | Ignore the CHECK; sample the column independently from its profile |\n| Satisfiable-at-write-time only | Expression references `now()`, `random()`, a volatile UDF, or any non-immutable function | Generate a row that passes at insertion; warn that the CHECK is not a long-term invariant |\n| `NOT VALID` | `pg_constraint.convalidated = false` | Honour the CHECK for generated rows; surface separately in plan output |\n\nThe `NULL`-tolerant case is the one most often miscategorised by hand-rolled tooling. The cleanest rule is the one Postgres itself uses: if every column referenced in the CHECK is `NULL` for the candidate row and the expression returns `NULL`, the row passes. We test this at planning time by substituting `NULL` for each referenced column in turn and inspecting the result via `EXPLAIN` of a one-row SELECT; that gives us a deterministic classification without a custom expression evaluator.\n\n## What this looks like in practice\n\nA short worked example. Suppose your schema has:\n\n```sql\nCREATE TABLE coupons (\n  id          bigserial PRIMARY KEY,\n  code        text,\n  discount    numeric(5,2),\n  expires_at  timestamptz,\n  CHECK (code = LOWER(code)),\n  CHECK (discount > 0),\n  CHECK (expires_at > now())\n);\n```\n\n`satus plan --schema public` prints:\n\n```text\ntable public.coupons\n  CHECK (code = LOWER(code))           [NULL-tolerant; code is nullable]\n  CHECK (discount > 0)                 [NULL-tolerant; discount is nullable]\n  CHECK (expires_at > now())           [satisfiable-at-write-time only]\n\nwarnings:\n  coupons.expires_at: CHECK references now(); generated rows will be in\n    the future at insertion time but the constraint is not a long-term\n    invariant. Consider an application-side check or a partial index.\n```\n\nNone of the three constraints constrain the sampler. The first two are advisory because the columns are nullable; the third is advisory because the expression is non-immutable. The generated fixture is valid Postgres rows that pass every constraint at insert time, and the warnings tell the user that two of those three constraints are not buying them what the source code reads as if they were.\n\nIf the same table were declared with the columns `NOT NULL` and the third constraint replaced with a partial index `WHERE expires_at > now()` on the relevant query, the plan output would shrink to one bucket (honoured by sampling) and zero warnings, which is the desired end state.\n\n## The shorter version\n\nCHECK constraints in Postgres are evaluated per row, at write time, against `TRUE`-or-not-`FALSE` semantics. Most of the time that matches what the author meant. Some of the time it does not, and the constraint silently accepts rows that violate the stated rule because the column is `NULL`, the expression depends on the current time, the constraint was added `NOT VALID` and never validated, or the constraint lives on a domain and the introspector never looked. A seed-data tool that wants to produce rows the database will accept on the first try has to read each of those cases out of the catalogs explicitly, classify the constraint, and tell the user when a constraint they wrote is not being enforced.\n\nIf you have not looked at the `CHECK` constraints in your own schema for a while, `satus plan` is a fast way to find out which of them are actually doing work and which are decoration. The [/quickstart](/quickstart) covers pointing it at your database; the [/profiles](/profiles) page lists what each built-in profile already knows about CHECK-heavy domains.\n\n## References\n\n- PostgreSQL documentation, [CHECK Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS).\n- PostgreSQL documentation, [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html).\n- PostgreSQL documentation, [ALTER TABLE — `NOT VALID` and `VALIDATE CONSTRAINT`](https://www.postgresql.org/docs/current/sql-altertable.html).\n- PostgreSQL documentation, [CREATE DOMAIN](https://www.postgresql.org/docs/current/sql-createdomain.html).\n- PostgreSQL documentation, [`pg_constraint`](https://www.postgresql.org/docs/current/catalog-pg-constraint.html).\n- PowerDNS gpgsqlbackend schema, [`schema.pgsql.sql` at `auth-4.9.3`](https://github.com/PowerDNS/pdns/blob/auth-4.9.3/modules/gpgsqlbackend/schema.pgsql.sql).\n- Pagila sample database, [`pagila-schema.sql`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql).\n';
const __vite_glob_0_11 = '---\nslug: when-faker-is-the-wrong-answer\ntitle: "When faker.js is exactly the wrong answer"\ndescription: faker.js generates 10,000 plausible names. It does not generate 10,000 names whose foreign keys resolve. A field note on the gap between fake values and seed data.\ndate: 2026-06-18\nauthor: satus.sh\ntags: [tooling, faker, postgres, seeding, philosophy]\ndraft: false\n---\n\n[faker.js](https://fakerjs.dev/) is a good library. It is also the wrong tool for most of the work people reach for it to do. The community-maintained fork at [@faker-js/faker](https://github.com/faker-js/faker) (currently 10.5.0) is excellent at the thing it advertises: producing realistic-looking values, one at a time, with locale awareness and a wide vocabulary. It is not, and has never tried to be, a tool that understands a database schema. The mismatch between what faker does and what "seed data" usually means is the reason a function call that returns a perfectly good string can still land you in a `ForeignKeyViolation` on the next line.\n\nThis post is the long version of a sentence we keep writing on support tickets: faker generates *values*; seed data is about *rows that satisfy a schema*. Both are useful. They are not interchangeable.\n\n## What faker actually is\n\nfaker is a value generator. You ask it for a first name, you get back a first name. You ask for a hundred email addresses, you get back a hundred email addresses, each one independently sampled from a vocabulary and a template. The API surface is organised by category, well documented, and impressively localised: [`faker.person.firstName()`](https://fakerjs.dev/api/person.html#firstname), [`faker.location.city()`](https://fakerjs.dev/api/location.html#city), [`faker.commerce.product()`](https://fakerjs.dev/api/commerce.html), and so on. There are 70+ locales. The randomness is seedable. The bundle is small enough to drop into a frontend test.\n\nWhat faker explicitly does *not* model:\n\n- which table a value belongs to,\n- which column of that table it should satisfy,\n- whether it is unique within that column,\n- whether it is consistent with other values in the same row,\n- whether it resolves to a row in some other table.\n\nNone of that is a bug. The library\'s stated purpose, repeated in its own docs, is "generate massive amounts of fake (but reasonable) data for testing and development." It delivers exactly that.\n\n## Where faker stops being enough\n\nThe mismatch shows up the moment you move from "fake value" to "row a real database will accept". Five places, in roughly increasing order of pain.\n\n### 1. Foreign keys\n\nfaker has no notion of a foreign key, because faker has no notion of another table. If your `orders` table has a `customer_id` column that references `customers.id`, no `faker.string.uuid()` call will produce an ID that exists in `customers`. The standard workaround is to insert customers first, hold their IDs in an array, and pick from that array when generating orders. This works for two tables. It does not scale to a real schema, where the FK graph is a DAG (and sometimes a [cyclic one](/blog/cyclic-fks-in-the-wild)), and the right order to insert tables is something you have to compute, not guess.\n\nThe corpus we audit for our test fixtures (described in [Inside the e-commerce profile](/blog/ecommerce-profile)) currently has 5 schemas, 151 tables, and 227 foreign keys across them. A hand-rolled faker script that has to keep ID arrays for each parent table, in topological order, is implementing a topological sort and a referential-integrity layer in user code. That is the job, not a detail.\n\n### 2. Uniqueness\n\nfaker.js used to ship a `faker.helpers.unique()` wrapper. It was deprecated in [issue #1785](https://github.com/faker-js/faker/issues/1785) and [removed in v8.0.0](https://github.com/faker-js/faker/releases/tag/v8.0.0) for reasons the maintainers spelled out clearly: it could not promise uniqueness across processes, it leaked memory because it had to remember every prior call, and it would silently fall back to throwing or to long retry loops as the value space ran out. The replacement guidance is "use `faker.helpers.uniqueArray()` if you need a batch, or roll your own set". Both are correct, neither is the same as "generate 100,000 rows whose `email` column will satisfy a unique constraint and whose `(tenant_id, slug)` composite will too".\n\nA `UNIQUE` constraint is a schema-level fact. Enforcing it requires the generator to know the column exists, know what other values it has already produced, and either reject duplicates or sample without replacement. faker does not see the column.\n\n### 3. Within-row correlations\n\nThe most quietly broken faker output is a row where each cell is individually plausible and the row as a whole is impossible. The textbook case is an address:\n\n```ts\n{\n  street:   faker.location.streetAddress(),  // "412 Oak Lane"\n  city:     faker.location.city(),           // "Springfield"\n  state:    faker.location.state(),          // "Oregon"\n  postcode: faker.location.zipCode(),        // "30318"\n  country:  faker.location.country(),        // "Norway"\n}\n```\n\nEvery field is a real value. The row is geographic nonsense: a Norwegian country code, an Oregonian state, and an Atlanta ZIP. If your application validates the address on read, the test fails. If it doesn\'t, you ship a feature with quietly broken addresses in dev and discover the validation gap in production.\n\nThe same issue recurs everywhere. `first_name = "Yuki"` with `email = "john@example.com"`. `birth_date = 1947-03-12` with `age = 24`. `currency = "JPY"` with `amount = 12.99`. faker has no row-level context, so it cannot keep the cells consistent. The fix in faker user code is to pass correlating options where the API supports them (`faker.location.zipCode({ state })` is one of the few), then build the rest of the address by hand. Done table by table, this is the bulk of the code in a real faker-based seeder.\n\n### 4. Distributions across rows\n\n`faker.commerce.price({ min: 1, max: 1000 })` samples uniformly. Real prices are not uniform; they cluster, they have modes at .99 and .95, and they have a long tail. `faker.date.between({ from, to })` samples uniformly. Real timestamps cluster around business hours, drop on weekends, and respect holidays ([the long version](/blog/timezone-bugs-found-by-seed-data)). `faker.number.int({ min: 0, max: 100 })` for an order\'s line count produces a flat histogram; real basket sizes are roughly geometric with a heavy peak at 1.\n\nA test fixture sampled uniformly will exercise the equally-likely paths through the application equally often. A production-shaped fixture will exercise the paths that exist in production. The performance regression that only shows up when 70% of rows hit one partition does not show up in a uniform fixture. Neither does the off-by-one in the "first order discount" code path, because in a uniform fixture half of all customers have placed exactly fifty orders.\n\n### 5. Constraints the database actually enforces\n\n`NOT NULL`, `CHECK`, `EXCLUDE`, partial indexes, generated columns, domain constraints. None of these are visible to faker, because faker is not looking at the schema. We covered the CHECK case at length in [Check constraints that lie](/blog/check-constraints-that-lie); the short version is that a generator that does not read `pg_constraint` will produce rows the database rejects, and a generator that reads `pg_constraint` is no longer faker.\n\nThe nullable-vs-not-nullable case is its own essay: see [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question). The partitioning case is in [Partitioned tables meet RLS](/blog/partitioned-tables-meet-rls). Each one is a place where a faker user ends up writing schema-aware code around a schema-unaware library.\n\n## Two problems, not one\n\nThe cleanest way to think about it is that there are two distinct problems hiding under the phrase "test data".\n\n| Problem | Right tool | Wrong tool |\n| --- | --- | --- |\n| "I need a plausible string for this one field in this one form" | faker (or a one-line literal) | a schema-aware seeder |\n| "I need N rows that satisfy a schema, with FKs, uniques, distributions, and constraints" | a schema-aware seeder | faker plus 2,000 lines of glue |\n\nBoth problems are legitimate. The first is faker\'s home turf and it is excellent there. The second is what `satus` is for and what people are doing, painfully, when they reach for faker and end up reimplementing topological sort, unique-set tracking, distribution sampling, and constraint introspection on top of it.\n\nA useful sanity check: if your faker code imports `pg`, parses `information_schema`, or maintains a `Map<tableName, Set<id>>`, you have stopped using a value generator and started writing a seeder. That is the moment to either commit to the seeder (and accept that you will own a small framework) or to use a tool whose first-class object is a schema.\n\n## What this means for satus\n\nWe use faker internally, in exactly one place: as a fallback dictionary for value categories the LLM does not need to think about. `first_name` for a US-locale person column is faker; the LLM never sees it, because there is nothing interesting to decide. The interesting decisions, the ones that make a fixture look like production rather than like a synthetic-data demo, happen above faker:\n\n- which tables to fill first, derived from the FK graph,\n- how many rows per table, derived from row-count hints and the profile\'s parent/child ratios,\n- which values must be unique and which can repeat, derived from the index definitions,\n- which distributions to draw from, derived from the profile,\n- which constraints constrain the sampler vs which are advisory, derived from `pg_constraint` and the rules in [Check constraints that lie](/blog/check-constraints-that-lie),\n- which rows must be consistent with which other cells in the same row, derived from the profile\'s correlation hints.\n\nfaker provides one of those: dictionaries. Everything else is the actual product. We are happy to recommend faker for the cases where dictionaries are all you need, and equally happy to point out that almost no production-shaped fixture is one of those cases.\n\n## When faker is the right answer\n\nTo keep this from reading as a takedown, the cases where faker is the right answer and nothing else is needed:\n\n- A single Storybook story that needs one realistic user object.\n- A frontend unit test that needs a list of fake comments and does not care whether they reference a real post ID.\n- A demo screenshot generator that writes a JSON file, not a database.\n- A property-based test that needs varied strings as inputs to a pure function.\n- A locale-aware placeholder generator for an empty-state UI.\n\nIn each case the problem is "give me a plausible value", not "give me a row that satisfies a schema". faker is well-engineered for the first; it has never claimed to be for the second.\n\n## The shorter version\n\nfaker generates values; databases enforce schemas. The work of going from "values" to "rows a schema accepts" is not a thin wrapper; it is most of the code in any seeder that handles a non-trivial schema. If you reach for faker and find yourself writing a referential-integrity layer, a uniqueness tracker, a distribution sampler, and a constraint introspector around it, the library is not failing you. You have outgrown the problem it solves.\n\n`satus generate --schema public` against your real database is the fastest way to see the difference: faker would need 200 lines of glue to insert the first 100 rows; the seeder writes them in one command because the schema is its input, not an afterthought. The [/quickstart](/quickstart) walks through it; the [/profiles](/profiles) page lists the built-in distribution profiles for verticals where uniform sampling is most obviously wrong.\n\n## References\n\n- [@faker-js/faker on GitHub](https://github.com/faker-js/faker) and [docs](https://fakerjs.dev/), maintained fork of the original `faker.js`.\n- faker.js issue [#1785](https://github.com/faker-js/faker/issues/1785), "Deprecate helpers.unique for removal".\n- faker.js release [v8.0.0](https://github.com/faker-js/faker/releases/tag/v8.0.0), notes removing `helpers.unique`.\n- PostgreSQL documentation, [INSERT](https://www.postgresql.org/docs/current/sql-insert.html), [COPY](https://www.postgresql.org/docs/current/sql-copy.html), [CHECK constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).\n';
const __vite_glob_0_12 = '---\nslug: dry-run-validation\ntitle: A $0 dry-run that catches FK and constraint bugs before the LLM call\ndescription: satus 0.3 ships an offline --dry-run that simulates LLM output and validates against your live Postgres metadata. No API key, no writes, no spend.\ndate: 2026-06-20\nauthor: satus.sh\ntags: [postgres, seeding, validation, ci]\ndraft: false\n---\n\nThe most expensive bug in an LLM-backed seed run is the one you only discover after the LLM call. You pay for the tokens, you pay for the wall-clock wait, and then the planner trips on a NOT NULL column or a foreign key that points at a row the simulator never produced. The fix is small. The feedback loop is not.\n\n`satus generate --dry-run` in 0.3 turns that loop into a free, deterministic check. It introspects the live schema, swaps the real LLM provider for an offline simulator, generates synthetic rows that conform to the JSON schema the planner already builds, and runs the same validator the live path uses. No API key required. No rows inserted. Exit code 0 if the plan is sound, 2 if the validator finds something.\n\n## What it actually does\n\nThe end-to-end smoke run on a three-table schema with a foreign-key cycle, captured verbatim from the terminal:\n\n```text\n$ satus generate --dsn "$PG" --schema preflight \\\n    --profile saas --rows 10 --dry-run --verbose\n\nsatus generate\n  schema:   preflight\n  profile:  saas\n  provider: openai\n  model:    gpt-4o-mini\n  rows:     10 per table\n  tables:   orgs -> projects -> users\n  cycles:   orgs.primary_user_id -> users (deferred)\n\n  orgs                             10 rows  ~$0.0011\n  projects                         10 rows  ~$0.0014\n  users                            10 rows  ~$0.0014\n\n  estimated cost: $0.0040\n\n  simulating + validating...\n  orgs . (dry-run)\n  projects . (dry-run)\n  users . (dry-run)\n\n  ✓ no validation findings across 3 tables\n```\n\nFive things happened in that run, in order, and none of them touched the network or the database beyond reading the catalog:\n\n1. **Introspection.** `pg_constraint` walked, columns read, types resolved.\n2. **Cycle detection.** `orgs.primary_user_id` → `users.id` was identified as a back-edge and marked deferred. The mechanics of that pass are covered in [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n3. **Topological sort.** `orgs → projects → users`, with the deferred edge filled in pass 2.\n4. **Cost estimate.** Computed from the real provider\'s published per-token pricing, then printed. No tokens are actually sent.\n5. **Simulate + validate.** Each batch is synthesized by a deterministic provider, foreign keys are back-patched across the deferred edge against synthesized primary keys, and the validator checks the combined rows against the live catalog.\n\n## What the validator catches\n\nFive finding classes, each grounded in metadata the live planner already has:\n\n- **NOT NULL violations.** Any nullable=false column whose generated value is null.\n- **Type and range mismatches.** Integers outside int2/int4/int8 bounds, malformed UUIDs, JSON that does not parse.\n- **`varchar(n)` overflow.** Values whose length exceeds the declared limit.\n- **Foreign keys with no parent.** Generated FK values that do not match any primary key in the synthesized pool, including across deferred back-edges.\n- **Single-column uniqueness collisions inside a batch.** Duplicate values on a `UNIQUE` column from one generate call.\n\nWhat it does **not** catch, and the honest reason why:\n\n- **Semantic nonsense.** `budget = -47000` passes a CHECK-less integer column. The simulator does not know that budgets are positive; only the LLM does.\n- **Cross-batch uniqueness across multiple generate calls.** The dry-run validates one run at a time.\n- **Triggers and CHECK constraints.** These are evaluated by Postgres during the real insert. The dry-run does not execute them.\n\nIf your goal is "did I configure satus correctly for this schema?", the dry-run is a complete answer. If your goal is "is the data realistic?", you still need the live run.\n\n## Why it is worth shipping\n\nThe cost of a missed configuration bug used to be one full LLM round-trip per iteration. Now it is zero. That changes who runs satus and when. A reviewer on a pull request can run the dry-run against a feature-branch schema without an API key. CI can gate every migration on `satus generate --dry-run`, exit non-zero on findings, and never spend a token. The 7-test unit suite in `validate.test.ts` keeps the finding classes themselves honest across releases.\n\nFor schemas where the dry-run reports zero findings, the next live run will not fail for any of the reasons the dry-run knows how to check. That is a narrower guarantee than "the seed will succeed", but it is the largest guarantee any offline tool can honestly make.\n\n## References\n\n- Source: [`packages/cli/src/generate/validate.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/validate.ts) and [`simulate.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/simulate.ts).\n- Cycle handling, in depth: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n- The 0.3 release notes: [v0.3.0 — Anthropic and machine-readable output](/blog/v0-3-0-anthropic-and-machine-readable-output).\n- PostgreSQL documentation, [pg_catalog.pg_constraint](https://www.postgresql.org/docs/current/catalog-pg-constraint.html).\n\n—the satus.sh team\n';
const __vite_glob_0_13 = '---\nslug: v0-3-0-anthropic-and-machine-readable-output\ntitle: "v0.3.0: Anthropic as a first-class provider, and machine-readable output"\ndescription: Anthropic joins OpenAI as a peer provider via tool-use forcing. A new --json flag emits a single snake_case object on stdout so CI can parse it. Token counts are now persisted alongside cost.\ndate: 2026-06-20\nauthor: satus.sh\ntags: [postgres, satus, release, anthropic, openai, cli]\ndraft: false\n---\n\n`@passkeybridge/satus@0.3.0` is on npm. Three changes worth writing up: Anthropic\'s Messages API is now a peer to OpenAI behind a single `Provider` interface, a new `--json` flag makes the run output safe to pipe into `jq`, and the success summary (and the telemetry row) now carries input/output token counts in addition to the dollar estimate. None of this changes how rows are generated. It changes who can generate them and what a CI script can do with the result.\n\n## Two providers, one interface\n\nv0.2.x assumed OpenAI. The HTTP call lived in `generate/llm.ts` and the runner imported `chatJson` directly. v0.3.0 deletes that file and introduces `src/generate/providers/`, with three small modules:\n\n```text\nproviders/types.ts      Provider interface + request/response shapes + CostBudget\nproviders/openai.ts     existing OpenAI call, unchanged on the wire\nproviders/anthropic.ts  Messages API, tool-use forcing\nproviders/index.ts      barrel: createOpenAiProvider / createAnthropicProvider\n```\n\nThe runner no longer knows which vendor is on the other end of the socket. It calls `provider.generate(req)` and reads back `{ data, usage: { inputTokens, outputTokens, usd } }`. The OpenAI path is byte-identical to v0.2.x; the test suite that covered it before still covers it now.\n\n## Structured output without `response_format`\n\nAnthropic\'s Messages API does not support OpenAI-style `response_format: json_schema`. The model will happily return JSON if you ask politely, but "ask politely" is exactly the failure mode satus is designed to avoid. We use tool-use forcing instead:\n\n1. Register a single tool named `emit_rows` whose `input_schema` is the row schema satus already built for OpenAI\'s strict mode.\n2. Set `tool_choice: { type: \'tool\', name: \'emit_rows\' }`, which tells the model it is not allowed to reply with prose. Its first content block must be a `tool_use` invoking that tool.\n3. Read the `tool_use` block\'s `input` directly. It is already a parsed object. No `JSON.parse`, no regex extraction, no "the model wrapped it in a code fence" branch.\n\nThe pinned API version is `2023-06-01`, the long-stable Messages surface that carried Claude 3 through 4.5 without breaking changes. Pinning rather than floating means an unannounced default flip on Anthropic\'s side cannot break a satus run mid-flight.\n\nDefault model is `claude-haiku-4-5`. Override with `--model` if you want Sonnet or a future Opus. We do not validate model names client-side; if you pass `gpt-4o-mini` with `--provider anthropic`, the upstream 400 is surfaced verbatim with the request id, because guessing for the user would be worse than the upstream error message.\n\n## Provider selection: flag, config, or auto-detect\n\nPrecedence is `--provider` > `provider` field in `satus.config.json` > env-var auto-detect. The auto-detect rule is one paragraph of logic, written down here so it is not a surprise:\n\n```text\nANTHROPIC_API_KEY set, OPENAI_API_KEY unset   -> anthropic\nOPENAI_API_KEY set, ANTHROPIC_API_KEY unset   -> openai\nboth set, no flag, no config                  -> error, exit 1\nneither set                                   -> defaults to openai, then\n                                                 exits 1 with\n                                                 "OPENAI_API_KEY is not set."\n```\n\nThe "both set" case used to silently pick OpenAI in early development drafts. We pulled that. Silent provider selection is the kind of behavior that makes an unbudgeted run land on the wrong invoice.\n\n## `--json` and `-v`\n\nTwo new flags. Default output is unchanged, so existing scripts keep working.\n\n`-v` / `--verbose` prints a one-line per-batch breakdown so you can see which tables are expensive before the bill arrives. The line shape is stable and parseable:\n\n```text\n· <table>                       batch=<n> rows=<r> in=<tok> out=<tok> $0.XXXX\n```\n\n`--json` emits a single newline-terminated object on stdout at completion and routes all human output to stderr. Keys are snake_case so they match the Postgres column names in `public.satus_runs` and the telemetry payload the CLI already sends. Three response shapes, distinguished by the `status` field. Field schema (illustrative values omitted):\n\n```text\nsuccess:\n  { run_id, status: "success", provider, model, profile, target_schema,\n    tables: [{ name, rows_generated }, ...],\n    total_rows, total_cost_usd, input_tokens, output_tokens, duration_ms }\n\nfailed:\n  { run_id, status: "failed", provider, model, profile, target_schema,\n    duration_ms, error_message }\n\ndry_run:\n  { status: "dry_run", provider, model, profile, target_schema,\n    tables: [{ name, will_insert, estimated_cost_usd }, ...],\n    estimated_total_cost_usd, max_cost_usd }\n```\n\nA workflow step can now run `satus generate --json | jq -e \'.status == "success"\'` and fail the build on a non-zero exit without scraping log output. This is the foundation for the GitHub Action surface in the roadmap.\n\n## Token counts in telemetry\n\nThe success summary used to print only a dollar estimate. It now prints both:\n\n```text\n✓ inserted <N> rows across <T> tables\n  tokens: <input> in / <output> out   spent: $X.XXXX\n```\n\nThe same two numbers land in `public.satus_runs` as new nullable columns (`input_tokens`, `output_tokens`, plus `provider`). The migration is additive, so v0.2.x clients posting telemetry without those fields still ingest without an error. The Zod validator on the ingest route marks all three `.optional()`.\n\nThis matters because the dollar figure is exactly that, an estimate against a built-in price table. Token counts are the thing the vendor actually bills. When the two diverge enough to matter, we want to see the divergence in our own data instead of finding out from a support ticket.\n\n## Backward compatibility\n\n- v0.2.x telemetry payloads continue to ingest unchanged.\n- Existing `satus.config.json` files work as-is. `provider` and `model` are both optional.\n- Exit codes are unchanged.\n- The OpenAI request body, response handling, and pricing map are byte-identical to v0.2.0. Diffing a v0.2.x and v0.3.0 OpenAI run against a recorded fixture produces identical inserts.\n\n## Release size\n\nThe published tarball metadata, from `npm view @passkeybridge/satus`:\n\n```text\nversion   files   unpackedSize\n0.2.0     4       29.4 kB\n0.3.0     4       36.2 kB\n```\n\nThe +6.8 kB is the Anthropic provider, the provider abstraction, and the `--json` / `--verbose` plumbing. No new runtime dependencies; both providers still call the upstream API with plain `fetch`.\n\n## Upgrade\n\n```bash\nnpm i -g @passkeybridge/satus@0.3.0\nsatus --version          # 0.3.0\nexport ANTHROPIC_API_KEY=sk-ant-...\nsatus generate --provider anthropic --rows 100\n```\n\nIf you want to keep using OpenAI, no change is required; auto-detect will pick it as long as `OPENAI_API_KEY` is the only key in your environment. Full release notes are in [CHANGELOG.md](https://github.com/passkeybridge/satus/blob/main/CHANGELOG.md). The provider abstraction is in [`packages/cli/src/generate/providers/`](https://github.com/passkeybridge/satus/tree/main/packages/cli/src/generate/providers).\n\n## What\'s next\n\nTwo questions we want the v0.3.0 telemetry to answer over the next 90 days:\n\n1. **Provider split.** What fraction of runs land on Anthropic vs OpenAI? If it\'s lopsided either way, the cheaper provider\'s pricing map gets first-class treatment.\n2. **Token-to-dollar drift.** How often does our estimate diverge from the invoice the user actually pays? If the answer is "often," the per-model entries in both pricing maps get last-verified comments and a quarterly refresh job.\n\nTell us at <support@satus.sh> if either lands badly on a real schema. Schema reproductions are the #1 maintenance task, and the test corpus in `corpus/` already covers five public OSS schemas — adding a sixth is cheap if we can see the `CREATE TABLE`.\n';
const __vite_glob_0_14 = "---\nslug: enum-types-that-grew-up\ntitle: \"Enum types that grew up\"\ndescription: How Postgres enum types evolve in real schemas, why ALTER TYPE ADD VALUE is harder than it reads, and how satus picks realistic distributions over them.\ndate: 2026-06-22\nauthor: satus.sh\ntags: [postgres, enums, schema, seeding]\ndraft: false\n---\n\nEvery enum starts with three values. `'draft'`, `'published'`, `'archived'`, written in the first migration, and for a while the schema looks tidy. Then product asks for a `'scheduled'` state, then legal asks for `'withdrawn'`, then somebody adds `'pending_review'` next to `'in_review'` instead of reusing it, and three years later the enum has fourteen values, two of which nobody is allowed to write anymore and one of which is a typo that shipped. For a tool like [satus](/) that has to generate rows the schema will accept on the first try, an enum is the easiest constraint in the catalog to honour and the hardest one to honour *realistically*. This post is about both halves: what Postgres actually lets you do to an enum after it ships, and what a seeder should sample once it knows.\n\n## What an enum is, in the catalog\n\n`CREATE TYPE status AS ENUM ('draft','published','archived')` registers a new type in `pg_type` and one row per label in `pg_enum`. Each label gets an `oid` and an `enumsortorder` (a `float4`) that defines comparison order ([pg_enum reference](https://www.postgresql.org/docs/current/catalog-pg-enum.html)). The values are stored on the heap as 4-byte oids, not as text; comparison and ordering go through the catalog's sort key, not through string comparison. This is why `'b' < 'a'` is perfectly legal for an enum if `'b'` was declared first, and why an enum column does not behave like a `TEXT CHECK (col IN (...))` for anything other than equality on the labels you spelled at `CREATE TYPE` time.\n\nFor seeding, the practical consequence is that the value space is fully discoverable from `pg_enum` joined to `pg_type`, deterministic, and tiny. `satus introspect` reads the labels in `enumsortorder` and treats the column's domain as that ordered set. The interesting question is not \"what are the legal values\"; it is \"what fraction of rows should land on each\".\n\n## ALTER TYPE ADD VALUE, in five footnotes\n\nThe migration most teams want, eventually, is \"add a new value to an existing enum without rewriting the table\". Postgres supports it, with five constraints that are individually documented and collectively load-bearing for anybody planning a deploy.\n\n1. **One value per statement.** `ALTER TYPE status ADD VALUE 'scheduled'` adds exactly one label. There is no `ADD VALUES` plural form. Migrations that need three new values are three statements ([ALTER TYPE](https://www.postgresql.org/docs/current/sql-altertype.html)).\n2. **Order is not alphabetical.** Without `BEFORE` or `AFTER`, the new label is appended to the end of the sort order. With `BEFORE 'archived'`, Postgres assigns an `enumsortorder` between the neighbours. The placement matters for any query that does `ORDER BY status`, for partitioning bounds, and for the readability of an `enum_range()` call against the type.\n3. **Transactions are allowed since PostgreSQL 12, with one rule.** Before PG12, `ALTER TYPE ... ADD VALUE` could not run inside a transaction block at all. From PG12 onward it can, but the new value cannot be referenced in the same transaction that added it ([PG12 release notes, item 4](https://www.postgresql.org/docs/release/12.0/)). A migration that adds a value and then inserts a row using it must split across two transactions, or accept the error.\n4. **`IF NOT EXISTS` makes the statement idempotent, not free.** `ALTER TYPE ... ADD VALUE IF NOT EXISTS 'scheduled'` is safe to run twice. It does not, however, deduplicate against case variants; `'Scheduled'` and `'scheduled'` are distinct labels and Postgres will happily add both.\n5. **There is no `ALTER TYPE ... DROP VALUE`.** Postgres has never supported removing a label from an enum. The supported path is `CREATE TYPE status_new AS ENUM (...)`, `ALTER TABLE ... ALTER COLUMN status TYPE status_new USING status::text::status_new`, `DROP TYPE status`, `ALTER TYPE status_new RENAME TO status`. The rewrite takes an ACCESS EXCLUSIVE lock on every table that uses the type. This is the single reason most production enums accumulate deprecated values: removing one is more expensive than living with it.\n\nRenaming a value (`ALTER TYPE ... RENAME VALUE 'old' TO 'new'`) has been supported since PostgreSQL 10 and is cheap, because the underlying oid does not change ([PG10 release notes](https://www.postgresql.org/docs/release/10.0/)). Most teams discover this two years after they wanted it.\n\n## What an enum looks like after three years\n\nA short tour from public schemas. listmonk's [`schema.sql` at v3.0.0](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql) declares nine enum types in the first migration: `list_type`, `list_optin`, `subscriber_status`, `subscription_status`, `campaign_status`, `campaign_type`, `content_type`, `bounce_type`, and `template_type`. The largest, `campaign_status`, has six labels: `'draft'`, `'running'`, `'scheduled'`, `'paused'`, `'cancelled'`, `'finished'`. The order is meaningful, since it follows the lifecycle of a campaign and not the alphabet, and the values are short, lowercase, and unsuffixed. That is the shape of an enum that was designed once, by one person, with the whole state machine in mind. Most enums in production do not look like that.\n\nThe other end of the spectrum is the enum that grew. Pagila ships a small, deliberate one: [`mpaa_rating AS ENUM ('G','PG','PG-13','R','NC-17')`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql), in MPAA order, used on `film.rating`. It has not changed in years because the underlying domain has not changed in years. An MPAA rating is a fact about the world; a `campaign_status` is a fact about your product, and your product changes.\n\nThe pattern we see most often in customer schemas (not in our public corpus, which is too small to make a statistic out of) is the third shape: an enum that started at five values, has eleven now, and three of them are commented `-- deprecated, do not use in new rows` next to the `ADD VALUE` migration. The deprecated values are still in the type because dropping them requires the rewrite above, and the team has never had the maintenance window. The application code maintains a `Set<Status>` of \"writable statuses\" in parallel with the database; new code reads from that set, old rows in the database do not.\n\nFor a seeder this matters because \"sample uniformly from `enum_range(NULL::status)`\" produces a fixture full of values that no living code path emits. The fixture compiles, the foreign keys resolve, the rows insert, and the application's first query against the fixture returns rows in states it does not know how to render.\n\n## How satus picks a distribution\n\n`satus` reads the enum labels from `pg_enum` and, when a profile applies, attaches a weight to each. The default rule, for an unrecognised enum, is to bias toward the first few labels in `enumsortorder` on the assumption that the original author put the common cases first. The rule is wrong often enough that we treat it as a fallback, not a model.\n\nWhen a profile applies, for instance a subscription-billing profile for a column called `subscription.status` with labels that look like Stripe's, we use a hand-tuned distribution: most rows in `'active'`, a long tail in `'past_due'` and `'canceled'`, a small sliver in `'incomplete_expired'`, near zero in `'paused'` unless the user opts in. The distributions live in the profile, not in the engine, because they are facts about a product domain, not about Postgres. The built-in set is listed on [/profiles](/profiles).\n\nFor columns satus cannot recognise, the CLI prints the enum labels in the plan output and asks for a weight vector, with the fallback distribution as the default. The interactive prompt looks like this:\n\n```text\ntable public.campaigns column status (enum public.campaign_status)\n  labels: draft, running, scheduled, paused, cancelled, finished\n  default weights: 0.50, 0.20, 0.10, 0.05, 0.05, 0.10\n  accept defaults? [Y/n/edit]\n```\n\nIf the user accepts, satus writes the weights to the run's lockfile so the same fixture re-generates deterministically. If the user edits, the new weights are saved against the schema fingerprint for next time. The lockfile and weight storage are covered in the [v0.3.0 release notes](/blog/v0-3-0-anthropic-and-machine-readable-output).\n\n## What the dry-run catches, and what it doesn't\n\nEnum validation in the [satus dry-run](/blog/dry-run-validation) is the easy half of this post. For every column typed as an enum, the simulator confirms that the sampled value is one of the labels returned by `pg_enum`; an unknown label is a finding of class `EnumOutOfDomain`, refused before any LLM call. The check is mechanical because the domain is finite.\n\nWhat the dry-run does *not* catch is the realism gap. A fixture full of `'finished'` campaigns is valid Postgres rows; it is also a useless fixture for testing the running-campaign dashboard. We treat the distribution as a product choice, not a correctness one, and surface it as a warning when the chosen weights skew more than 90% to a single label, on the theory that a fixture that almost never exercises the rare states is a fixture that hides the bugs in the rare states. The warning is dismissable; the validation is not.\n\n## A short worked example\n\nSuppose your schema has:\n\n```sql\nCREATE TYPE order_status AS ENUM (\n  'cart', 'placed', 'paid', 'fulfilled', 'refunded', 'cancelled'\n);\n\nCREATE TABLE orders (\n  id           bigserial PRIMARY KEY,\n  customer_id  bigint NOT NULL REFERENCES customers(id),\n  status       order_status NOT NULL,\n  total_cents  integer NOT NULL CHECK (total_cents >= 0)\n);\n```\n\n`satus plan --schema public --rows orders=1000` prints:\n\n```text\ntable public.orders\n  column status (enum public.order_status)\n    labels: cart, placed, paid, fulfilled, refunded, cancelled\n    profile: ecommerce → weights 0.05, 0.10, 0.15, 0.65, 0.03, 0.02\n    expected counts (1000 rows): 50 / 100 / 150 / 650 / 30 / 20\n```\n\nThe numbers are not a guess; they come from the [ecommerce profile](/blog/ecommerce-profile), where the dominant steady-state of an `orders` table is `'fulfilled'` and the rare states are kept rare. If your business is not e-commerce, the defaults will be wrong and the prompt above lets you edit them once. If it is, the fixture has the right rows to exercise the fulfilment-heavy parts of the code and just enough refund and cancellation rows to make those code paths real.\n\n## The shorter version\n\nA Postgres enum is small, ordered, oid-backed, and easy to introspect. It is also a one-way ratchet: values are easy to add, expensive to remove, easy to rename, impossible to ignore once they are in the type. The interesting question for a seeder is not \"is this value legal\"; it is \"is this distribution one the application has ever actually seen\". satus answers the first with the catalog and the second with a profile, and prints both in the plan so you can argue with the second before the LLM bills you for it.\n\nIf your own enums have grown past the shape you remember, `satus plan` is a fast way to see what is actually in `pg_enum` versus what the application still writes. The [/quickstart](/quickstart) covers pointing it at your database; the [/profiles](/profiles) page lists which built-in profiles already know about the common enum-heavy domains.\n\n## References\n\n- PostgreSQL documentation, [Enumerated Types](https://www.postgresql.org/docs/current/datatype-enum.html).\n- PostgreSQL documentation, [`pg_enum`](https://www.postgresql.org/docs/current/catalog-pg-enum.html).\n- PostgreSQL documentation, [`ALTER TYPE`](https://www.postgresql.org/docs/current/sql-altertype.html).\n- PostgreSQL 10 release notes, [`ALTER TYPE ... RENAME VALUE`](https://www.postgresql.org/docs/release/10.0/).\n- PostgreSQL 12 release notes, [`ALTER TYPE ... ADD VALUE` inside a transaction](https://www.postgresql.org/docs/release/12.0/).\n- listmonk schema, [`schema.sql` at v3.0.0](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql).\n- Pagila sample database, [`pagila-schema.sql`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql).\n";
const __vite_glob_0_15 = '---\nslug: agent-mode-postponed\ntitle: "Agent mode, postponed to v0.5"\ndescription: Why satus is shipping an opt-in agent mode in v0.5 instead of v0.3, what it will and will not do, and how the 90-day evidence window between now and then shapes the design.\ndate: 2026-06-23\nauthor: satus.sh\ntags: [roadmap, agents, design, postgres]\ndraft: false\n---\n\n> **Editor\'s note (2026-07-16):** The version-line dates below (v0.4 mid-July, v0.5 late September, v0.6 open) reflect the June 2026 plan and have shifted. Post-2026-07-03 renumber: v0.3.3 = GitHub Action, v0.4.0 = agent mode. Anthropic support shipped in v0.3.0. Gemini is still not supported. See the [v0.3.5 release notes](/blog/v0-3-5-release-notes) for current status.\n\n\n\nThe most common feature request we get, after "support my schema", is some version of "can it just figure it out?". The user runs `satus seed`, the [dry-run validator](/blog/dry-run-validation) flags an enum mismatch or a foreign key pointing at a row the planner never produced, and instead of reading the error and editing a YAML profile, they would like the tool to read its own output and propose the fix. That is a reasonable thing to want. It is also a category of feature that, done badly, would undermine the one thing satus is currently good at: producing the same rows on the same schema on every run, with no surprises.\n\nSo we are committing to it, and we are committing to not shipping it yet. `satus agent` lands in v0.5, after 90 days of telemetry on v0.3 and v0.4. This post explains the shape of the feature, why the delay is the point rather than a concession, and what the deterministic CLI will and will not stop being.\n\n## What agent mode is\n\n`satus agent` is an opt-in subcommand. It opens an interactive session in the terminal, reads the same schema your `satus seed` invocation would read, and runs a bounded tool-using loop on top of the primitives the CLI already exposes: introspection, topological sort, the offline dry-run validator, error-context retrieval, profile patching, and seeding. The model never writes arbitrary SQL. It calls functions that already exist in the codebase, with the same zod-validated inputs the CLI uses today.\n\nThe tool surface is small on purpose:\n\n```text\nread-only (auto-run):\n  introspect_schema     read tables, columns, FKs, constraints, enums\n  topo_sort             return insert order + cycle list\n  dry_run               run the offline validator against the current profile\n  read_error_context    fetch the last validation failure with row samples\n  propose_profile_patch return a YAML diff (no write)\n\nside-effectful (require approval):\n  apply_profile_patch   write the patch to disk\n  seed                  generate rows and COPY into the target database\n```\n\nRead-only tools execute without prompting. Anything that touches the filesystem or the database shows a diff or a row-count summary and waits for `y/n`. There is no "auto-apply" flag. A non-interactive `--policy` file exists for scripted use, but `seed` defaults to require an explicit acknowledgement even there.\n\nThe loop itself is the [AI SDK](https://ai-sdk.dev/docs/agents/building-agents.md) `generateText` plus `tool()` plus `stopWhen: stepCountIs(50)` shape, with a small system prompt (~1.5K tokens) that points at the existing reference material on [cycle resolution](/blog/cyclic-fks-in-the-wild), [the dry-run validator](/blog/dry-run-validation), and [enum distributions](/blog/enum-types-that-grew-up). No hidden skill loader. No implicit state. Every model decision is in a transcript at `.satus/agent/<run-id>.jsonl` that you can grep, replay, or paste into a bug report.\n\n## Where it earns its keep\n\nThe deterministic CLI is already fast at the mechanical work. An agent does not make `COPY` faster or `topo_sort` cheaper. It earns its keep at exactly four places, all of which today land in support tickets as "it failed on my schema":\n\n1. **Validation repair.** Dry-run throws `EnumOutOfDomain` on `order_status`. The agent reads the error, proposes a profile patch that adds the missing label with a sensible weight, re-runs `--dry-run`, shows the diff, asks to apply.\n2. **Profile authoring from a cold schema.** Point at a database with 80 tables it has never seen. It introspects, clusters tables by FK neighbourhood, proposes a profile, and dry-runs until the validator is clean.\n3. **Cycle resolution.** When the topo sort surfaces a cycle, the agent picks a deferral strategy (nullable insert plus UPDATE pass, or batched two-phase), explains the trade-off in plain text, and writes it into the profile. The decision tree is bounded; LLMs handle it well.\n4. **Intent translation.** "Seed me a six-month e-commerce dataset with weekend traffic spikes and a Black Friday burst" is a prompt, not a config file. The agent translates it into row counts and timestamp distributions over the existing primitives.\n\nThe connecting thread is that every one of these is a place where today\'s user has to context-switch out of the CLI, read docs, edit YAML, re-run. The agent collapses the loop. It does not replace the loop.\n\n## Where it explicitly does not help\n\nThis is the part that decides whether the feature is worth shipping at all.\n\n`satus seed` in CI, against PR-preview databases, must remain a deterministic command with no LLM in the hot path. That is most of what people actually do with satus. The dry-run is part of the same promise: zero spend, zero writes, exit code 0 or not. An agent that silently rewrote a profile, or that inserted an LLM call into a CI run that used to be free, would be a regression dressed as a feature.\n\nSo `satus agent` is the authoring and repair surface. `satus seed`, `satus dry-run`, and the existing flags are the production surface. We will reinforce that separation in docs, in the launch post, and in the binary itself: the agent subcommand prints a one-line reminder on first run that it is not the CI tool.\n\n## Why the 90-day wait\n\nThe honest reason is that we do not yet know the failure modes we should be designing the agent to handle. We know the categories from inbound tickets, but the long tail (which constraint patterns, which schema shapes, which provider conventions) is the work. Building the loop now means writing prompts against our guesses. Building it in 90 days means writing prompts against an anonymised eval set drawn from real `satus generate --dry-run` failures, with user consent, with row data stripped at the source.\n\nThe instrumentation lands in v0.4 in the next two weeks: SHA-256 fingerprints of normalised DDL, the validator class that fired, the sequence of CLI invocations leading to it. No row contents. Off by default. The opt-in prompt is the same one that already gates the existing telemetry. We will publish the eval-set summary statistics in a v0.4 follow-up post.\n\nThe other half of the wait is unglamorous. Versioned prompts in the repo, an A/B harness that diffs a prompt change against the fixture set, transcripts that survive a `git bisect`. Without that scaffolding, every prompt edit is a regression risk and there is no way to tell whether the model got worse or the schema fixture got harder. Agent maintenance is mostly this scaffolding; the loop itself is two weeks of work.\n\n## What this commits us to\n\nConcretely:\n\n- v0.4 (mid-July): telemetry hooks for failure-mode collection, opt-in, no row data.\n- v0.5 (late September target): `satus agent`, BYO-key for OpenAI, Anthropic, and Gemini, interactive REPL, approval gates, transcripts, non-interactive policy file.\n- v0.6 (open): hosted-key tier at the previously discussed +$10/mo, which is what makes agent mode usable for people who do not want to manage a third-party API key.\n\nWhat we are not committing to in v0.5: a chat UI on the marketing site, planner/executor splits, RAG over user docs, auto-apply without approval, or a GitHub Action variant. Those are real ideas. They are not the v1 of this feature.\n\n## Where to push back\n\nThe two assumptions most likely to be wrong are the surface and the wait. If the right surface is a GitHub Action that runs on every preview deploy rather than a CLI subcommand, we want to know before we build the wrong thing. If the 90-day evidence window is overcautious and we are leaving repair-loop value on the floor in the meantime, we want to know that too.\n\nBoth questions get easier to answer with telemetry. If you run satus and would let us see anonymised failure classes from your dry-runs, the opt-in flag lands in v0.4. If you have an opinion on the surface, the [GitHub issue tracker](https://github.com/passkeybridge/satus) is the right place; we read everything there.\n\nThe deterministic CLI is the product. The agent is a layer on top of it. v0.5 is when that layer ships.\n\n## References\n\n- [satus dry-run validator (v0.3)](/blog/dry-run-validation)\n- [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild)\n- [Enum types that grew up](/blog/enum-types-that-grew-up)\n- [v0.3.0 release notes](/blog/v0-3-0-anthropic-and-machine-readable-output)\n- [AI SDK · Building Agents](https://ai-sdk.dev/docs/agents/building-agents.md)\n- [AI SDK · Loop control and `stopWhen`](https://ai-sdk.dev/docs/agents/loop-control.md)\n- [satus on GitHub](https://github.com/passkeybridge/satus)\n';
const __vite_glob_0_16 = "---\nslug: seeding-into-a-multi-tenant-schema\ntitle: \"Seeding into a multi-tenant schema without leaking tenants\"\ndescription: Multi-tenant schemas leak in seed data through shared lookup tables, FK chains that drop tenant_id, and RLS bypassed by a superuser connection. Here is the discipline satus follows.\ndate: 2026-06-24\nauthor: satus.sh\ntags: [postgres, multi-tenant, rls, seeding, security]\ndraft: false\n---\n\nA multi-tenant schema is one that stores data for more than one customer in the same set of tables, distinguished by a `tenant_id` column (or `org_id`, `workspace_id`, the name does not matter). The contract every such schema makes with its users is the same: a query issued on behalf of tenant A returns only tenant A's rows, and a write on behalf of tenant A cannot land in tenant B's space. Seed data, generated for development or staging, is supposed to honour the same contract. It very often does not, because the failure modes that leak tenants at seed time are different from the ones that leak tenants at runtime, and none of them are visible until somebody looks for them.\n\nThis post is the field guide. Three shapes of seed-time leak, what each one looks like in `pg_catalog`, and the discipline `satus` applies to avoid producing rows that cross the boundary. None of it requires a new schema feature; most of it requires the schema to be precise about what \"tenant-scoped\" means.\n\n## The shape of the bug\n\nA minimal example, stripped to the parts that matter:\n\n```sql\nCREATE TABLE tenants (\n  id   uuid PRIMARY KEY,\n  name text NOT NULL\n);\n\nCREATE TABLE categories (\n  id   uuid PRIMARY KEY,\n  name text NOT NULL\n);\n\nCREATE TABLE products (\n  id          uuid PRIMARY KEY,\n  tenant_id   uuid NOT NULL REFERENCES tenants(id),\n  category_id uuid NOT NULL REFERENCES categories(id),\n  name        text NOT NULL\n);\n```\n\n`products` is tenant-scoped. `categories` is a shared lookup. Nothing in the schema says a category is global, and nothing in the schema says a product's category must belong to the same tenant as the product. A generator that reads `pg_constraint` and follows the foreign keys sees three tables, two FKs, and no cycles. It will happily place a product for tenant A pointing at a category that, when an application developer later adds `tenant_id` to `categories`, will turn out to belong to tenant B.\n\nThe same shape, rendered as a graph:\n\n```text\ntenants ───────────────┐\n                       │ (tenant_id)\n                       ▼\n                   products ◀──── categories\n                       (category_id; no tenant predicate)\n```\n\nThe FK arrow from `products.category_id` to `categories.id` carries no tenant information, because `categories` has no tenant column. The constraint is satisfied for every category in the table. The constraint that the application *meant* to enforce, \"category belongs to the same tenant as the product, or is explicitly global\", is not in the schema and therefore not in the catalog and therefore not visible to a generator that only reads the catalog.\n\n## Leak #1: the shared lookup table\n\nThe example above is the most common case. A lookup table (`categories`, `tags`, `currencies`, `roles`, `plans`) is referenced by tenant-scoped rows and is itself untagged. There are two intentions hiding under the same DDL.\n\n**The lookup is meant to be global.** Currencies, ISO country codes, payment-method types: these exist once for the whole installation. The fix is to say so in the schema. A `is_global boolean NOT NULL DEFAULT true` column, or a separate `global_categories` table, makes the intent legible. `satus` then knows the row pool for `category_id` is shared, and any tenant may reference any row.\n\n**The lookup is meant to be per-tenant.** Order statuses customized per workspace, custom fields, user-defined categories: these are tenant-scoped in spirit and untagged in DDL. The fix is to add the column the schema is missing:\n\n```sql\nALTER TABLE categories\n  ADD COLUMN tenant_id uuid NOT NULL REFERENCES tenants(id);\n\nALTER TABLE products\n  DROP CONSTRAINT products_category_id_fkey,\n  ADD CONSTRAINT products_category_same_tenant\n    FOREIGN KEY (tenant_id, category_id)\n    REFERENCES categories(tenant_id, id);\n```\n\nThe composite FK is the load-bearing change. Once `categories` has its own `tenant_id` and `products.category_id` is part of a composite FK that also includes `tenant_id`, the database itself rejects cross-tenant references. A generator no longer has to be clever, and an attacker who finds a SQL injection that mutates `category_id` cannot use it to traverse out of their tenant either. PostgreSQL's treatment of multi-column foreign keys is in [Foreign Keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK).\n\nThe cost is one extra column on every lookup table and one composite unique index per parent. The benefit is that \"tenant\" becomes a property of the FK graph, not a convention enforced in application code.\n\n## Leak #2: the FK chain that drops tenant_id\n\nThe second shape is subtler. Every table has a `tenant_id`, every table is RLS-protected, and yet a generator still produces rows that cross. The mechanism:\n\n```sql\nCREATE TABLE orders (\n  id        uuid PRIMARY KEY,\n  tenant_id uuid NOT NULL REFERENCES tenants(id),\n  customer  uuid NOT NULL  -- nominally references customers(id)\n);\n\nCREATE TABLE order_lines (\n  id        uuid PRIMARY KEY,\n  tenant_id uuid NOT NULL REFERENCES tenants(id),\n  order_id  uuid NOT NULL REFERENCES orders(id),\n  sku       text NOT NULL\n);\n```\n\n`orders` and `order_lines` are both tenant-scoped. The FK from `order_lines.order_id` to `orders.id` is single-column. A generator that picks a `tenant_id` independently for each table, then picks an `order_id` from the pool of all orders, will sometimes pick an order that belongs to tenant B while the line itself is tagged tenant A. The row inserts fine. The constraint is satisfied. The data is wrong.\n\nAny seeder that wants to avoid this has to walk the catalog twice. First pass: identify every column whose name and type match the project's tenant key, and mark them as a *tenant axis*. Second pass: for every FK that points at a table on the tenant axis, derive the child's `tenant_id` from the parent's `tenant_id` rather than sampling it independently. The mechanics are the same topological sort the planner already runs (described in [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild)), with one extra rule layered on top: a column on the tenant axis is computed from its parent, not sampled.\n\nThe schema-side fix is the same as in leak #1: make the FK composite.\n\n```sql\nALTER TABLE order_lines\n  DROP CONSTRAINT order_lines_order_id_fkey,\n  ADD CONSTRAINT order_lines_order_same_tenant\n    FOREIGN KEY (tenant_id, order_id)\n    REFERENCES orders(tenant_id, id);\n```\n\nAfter this change, the catalog itself rejects a cross-tenant order line, every generator (including `satus`) sees it through `pg_constraint`, and the rule survives application refactors. Until then, the seeder has to enforce the convention out-of-band because the catalog is silent.\n\n## Leak #3: RLS that the seeder bypasses\n\nThe third shape is the one Postgres makes easiest to get wrong. The schema uses Row Level Security:\n\n```sql\nALTER TABLE products ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY tenant_isolation ON products\n  USING (tenant_id = current_setting('app.tenant_id')::uuid)\n  WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);\n```\n\nThis works for the application, which connects as a role that has RLS enforced and sets `app.tenant_id` per request. It does not work for a seeder that connects as the schema owner. RLS does not apply to table owners or to superusers by default; the policy is silently bypassed and the seeder can write any `tenant_id` into any row. `pg_dump`, `pg_restore`, and ad-hoc psql sessions running as the owner all have the same exemption. The behavior is documented in [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html): \"Superusers and roles with the BYPASSRLS attribute always bypass the row security system… Table owners normally bypass row security as well, though a table owner can choose to be subject to row security with ALTER TABLE … FORCE ROW LEVEL SECURITY.\"\n\nThere are three honest ways to seed an RLS-protected schema without leaking tenants. They have different cost profiles, and the table is the short version.\n\n| Approach | Tenant isolation | Cost | When it fits |\n| --- | --- | --- | --- |\n| Connect as a non-owner role with RLS enforced; `SET LOCAL app.tenant_id` per batch | Enforced by the database for every write | One transaction per tenant; one extra GRANT block | Default. The pattern we recommend whenever an RLS policy is present. |\n| `ALTER TABLE … FORCE ROW LEVEL SECURITY` and connect as the owner | Enforced even for the owner | One DDL per table; affects every other tool too | When the same owner role is used for both application and maintenance |\n| Connect as superuser, derive `tenant_id` from the FK chain in user code | Enforced only by the seeder | Zero schema change; full trust in the generator | Quick local fixtures only; not for shared staging |\n\nThe first row is the one to reach for. Connect as a role that has neither `BYPASSRLS` nor table ownership, open one transaction per tenant, issue `SET LOCAL app.tenant_id = '<uuid>'` (or whatever per-session GUC the policy reads), and write that tenant's rows inside that transaction. The pattern of one-transaction-per-tenant is also what the application does at runtime; the closer the seed path is to the request path, the fewer surprises move from one to the other.\n\nThe longer treatment of why RLS on a partitioned parent does not propagate to children, and why that matters for seed jobs, is in [Partitioned tables meet RLS, and nobody wins](/blog/partitioned-tables-meet-rls).\n\n## The checklist for a multi-tenant seed run\n\nThe discipline above maps onto five questions to answer before a single row is generated. They apply to any seeder; today, `satus` answers them through a combination of catalog reads (composite FKs and topo order, already shipped via [the planner](/blog/cyclic-fks-in-the-wild)) and the profile config that names the tenant key. The questions are the contract; the implementation will harden over future releases.\n\n1. **What is the tenant axis?** The column name (`tenant_id`, `org_id`, `workspace_id`) and the type that identifies a tenant across the schema. Pick one, write it down, and check that every table that should be tenant-scoped has it.\n2. **Which tables are lookups, and which of those are global vs per-tenant?** Lookups have no tenant column today. For each one, decide whether it is meant to be shared across the installation or scoped per tenant, then either add an `is_global` flag or add a `tenant_id` and convert the inbound FKs to composite.\n3. **Does every FK between two tenant-scoped tables carry the tenant axis?** A single-column FK between tenant-scoped tables is the second leak by construction. Make it composite or accept that the seeder is enforcing tenancy in user code.\n4. **Does any target table have an RLS policy, and which per-session GUC does it read?** If the answer is yes, the seed run needs one transaction per tenant with `SET LOCAL` of that GUC, run as a role that has neither `BYPASSRLS` nor table ownership.\n5. **Is every transaction single-tenant?** Every batch carries one `tenant_id`, every transaction carries one batch, every commit is auditable as \"this transaction wrote rows for tenant X and only tenant X\". This is a property of how the seed run is structured, not of the schema; the seeder has to opt in.\n\nWhat no seeder can do, and the honest reason why:\n\n- Decide whether a lookup is global or per-tenant. The schema is silent on intent; a human has to answer once.\n- Detect tenant leaks that have nothing to do with foreign keys. A `jsonb` column with a tenant ID embedded in it ([as described in JSONB that is secretly relational](/blog/jsonb-that-is-secretly-relational)) is opaque to any tool that reads the catalog and not the data.\n- Defend against the seeder being run by a superuser against an RLS-protected schema with no warning visible. The warning has to be acted on; reading it is on the operator.\n\n## The shorter version\n\nA multi-tenant Postgres schema leaks at seed time in three places. A shared lookup table without a tenant column is referenced by tenant-scoped rows and the FK is satisfied for any row in the lookup. A single-column FK between two tenant-scoped tables drops the tenant axis and the generator picks an order from the wrong tenant. An RLS policy is silently bypassed when the seeder connects as the owner or a superuser. In every case the catalog is honest about what it enforces; the gap is between what the schema says and what the application meant.\n\nThe fix is mostly schema-side: composite FKs that include the tenant axis, a `is_global` flag on lookups that are meant to be shared, and a non-owner role for the seeder. Until those changes land, `satus` enforces the discipline in the planner. The catalog is the contract; the contract should say what it means.\n\nIf you want to see the rules in action, point [`satus generate --dry-run`](/blog/dry-run-validation) at a multi-tenant schema and read the plan output before any rows are written. The [/quickstart](/quickstart) covers the connection setup; the [/profiles](/profiles) page lists the per-project tenant key conventions the bundled profiles know about.\n\n## References\n\n- PostgreSQL documentation, [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).\n- PostgreSQL documentation, [Foreign Keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK).\n- PostgreSQL documentation, [`SET` and `current_setting`](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-SET).\n- PostgreSQL documentation, [`pg_catalog.pg_policy`](https://www.postgresql.org/docs/current/catalog-pg-policy.html).\n- Prior on this blog: [Partitioned tables meet RLS, and nobody wins](/blog/partitioned-tables-meet-rls), [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [A $0 dry-run that catches FK and constraint bugs before the LLM call](/blog/dry-run-validation).\n";
const __vite_glob_0_17 = "---\nslug: saas-subscriptions-profile\ntitle: \"Inside the saas-subscriptions profile: MRR, churn, and the dunning death spiral\"\ndescription: Subscription lifecycles, plan changes, failed payments, and the states no one documents. What the satus saas-subscriptions profile recommends, and what it leaves to you.\ndate: 2026-06-26\nauthor: satus.sh\ntags: [profile, saas, billing, postgres, seeding]\ndraft: false\n---\n\n> **Editor's note (2026-07-16):** This post describes profile-system design intent from mid-2026. The shipped CLI (v0.3.5) uses prompt-based profiles — `saas`, `ecommerce`, `b2b` — with no YAML profile files or per-profile invariant enforcement beyond the user's Postgres constraints. See [/profiles](/profiles) for the current behavior. The post is preserved for its subscription-lifecycle modeling arguments.\n\n\n\nA SaaS billing schema looks like four tables and is, in practice, a small distributed system with a clock, a state machine, and a ledger. Subscriptions move through a fixed set of statuses on a fixed set of triggers. Invoices are arithmetic over a plan price and a usage stream, not free-form numbers. Failed payments are a retry schedule that ends in either recovery or cancellation, never in silence. A uniformly random fixture satisfies the schema and reproduces none of these dynamics, which is why dashboards built on uniform data look healthy until a real customer's card declines. The `saas-subscriptions` profile in [satus](/) is our spec for those dynamics: the rules we want the LLM to follow when it fills your rows, and the schema-side guard rails we recommend so the database catches what the model misses. This post is the inventory.\n\nA note on what \"the profile\" is, today and on the roadmap. In v0.3 the profile is a single high-signal prompt block ([packages/cli/src/generate/profiles.ts](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/profiles.ts)) that steers the LLM toward the distributions, status mix, and language described below; satus then runs the offline validator on what comes back. The status-machine enforcement, the canonical MRR/churn views, the dunning sampler, and the Poisson usage generator described in this post are the profile's specification, not yet shipped modules. They are the next milestone for `saas-subscriptions` and the reason this post reads like a spec; treat it as the contract the v0.4 profile will honour and as a checklist you can apply today if you wire the recommended constraints into your own schema. Sections below say explicitly where the line sits.\n\nThe shape of this post mirrors the [medical-booking deep-dive](/blog/medical-booking-profile) and the [e-commerce deep-dive](/blog/ecommerce-profile): the distributions we steer toward, the constraints we lean on, and the things we deliberately decline to ship. It assumes you have read [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), because `orgs ↔ users` is the canonical small cycle and this profile is the one we built to exercise it, and [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), because subscription rows carry more state-flag timestamps than any other table in a typical SaaS schema.\n\n## Why a uniform fixture is the wrong fixture\n\nA uniform fixture for a SaaS schema gives every customer the same probability of churning this month, every invoice a value drawn from a flat distribution, and every subscription an equal probability of sitting in every status. None of those shapes exist in production. Real subscription bases concentrate cancellations in the first two billing cycles and again at annual-renewal anniversaries. Real invoice amounts cluster sharply around plan prices with a long right tail from usage. Real subscription rows are dominated by `active`, with `trialing` a small recent slice and `past_due` a smaller chronic slice that drains slowly into `canceled` or `active` again. A planner that has only seen flat statistics will pick the wrong index every time you query `WHERE status = 'past_due'`, and a dunning job tested against a fixture without `past_due` rows has never run its actual code path.\n\n## The status machine, which is most of the value\n\nThe Stripe API documents eight subscription statuses on the canonical `Subscription` object: `incomplete`, `incomplete_expired`, `trialing`, `active`, `past_due`, `canceled`, `unpaid`, and `paused` ([Stripe API: The Subscription object](https://docs.stripe.com/api/subscriptions/object)). Almost no internal SaaS schema we have read documents all eight. The profile encodes seven of them by default and treats `paused` as opt-in, because pause behaviour varies enough across products that a default would be wrong more often than right.\n\n| Status | Meaning | Default share | Reachable from |\n| --- | --- | --- | --- |\n| `incomplete` | First invoice has not been paid within 23 hours of creation | 0.01 | (initial) |\n| `incomplete_expired` | First invoice was never paid and the subscription was abandoned | 0.01 | `incomplete` |\n| `trialing` | Inside a free-trial window, no payment attempted yet | 0.06 | (initial) |\n| `active` | Latest invoice paid, in good standing | 0.78 | `trialing`, `past_due`, `incomplete` |\n| `past_due` | Latest invoice failed, retries in flight | 0.05 | `active` |\n| `unpaid` | Retries exhausted, access policy is product-specific | 0.02 | `past_due` |\n| `canceled` | Terminal | 0.07 | any non-terminal |\n\nThe shares are a default that we know will be wrong for any specific product. They sit in the range that a generic mid-funnel SaaS in steady state could plausibly produce, and they are explicitly overridable. The point of shipping a default is not that 78% `active` is right for your company; it is that 12.5% per status (a flat uniform) is wrong for every company.\n\nThe legal transitions are the more important half. `canceled` is terminal; no production billing system flips a canceled row back to `active` without creating a new subscription row. `unpaid` is reachable only from `past_due`. `trialing` is reachable only as an initial state. Today the profile communicates these rules to the LLM in prose and the validator catches the gross violations (unknown statuses, type mismatches, FK breaks); the v0.4 state-machine module will enforce the full transition graph at plan time and reject any sampled history that violates it. Either way, the section below is the SQL we recommend so the database enforces the same rules independently of the seeder.\n\n## Constraints we recommend (you write these, today)\n\nThe profile is more useful when the schema has the constraints below, because they catch the cases the LLM and the validator alone cannot. These are recommendations for your migrations; satus does not alter your schema.\n\n```sql\n-- 1. Status is a small closed set. Use an enum or a CHECK; both work.\nALTER TABLE subscriptions\n  ADD CONSTRAINT subscriptions_status_known\n  CHECK (status IN (\n    'incomplete', 'incomplete_expired', 'trialing',\n    'active', 'past_due', 'unpaid', 'canceled', 'paused'\n  ));\n\n-- 2. Exactly one owner per org. Partial unique index, not a trigger.\nCREATE UNIQUE INDEX memberships_one_owner_per_org\n  ON memberships (org_id)\n  WHERE role = 'owner';\n\n-- 3. Money is integer minor units. Cents, not numeric.\nALTER TABLE invoices\n  ALTER COLUMN amount_cents TYPE bigint;\n\n-- 4. Invoice total is derived; let the database compute it where possible.\nALTER TABLE invoices\n  ADD COLUMN total_cents bigint\n  GENERATED ALWAYS AS (subtotal_cents + tax_cents - discount_cents) STORED;\n\n-- 5. A subscription cannot end before it starts.\nALTER TABLE subscriptions\n  ADD CONSTRAINT subscriptions_period_ordered\n  CHECK (current_period_end > current_period_start);\n```\n\nTwo of these matter more than the others. The partial unique index on `memberships` is the canonical Postgres pattern for \"at most one row in this set matches this predicate\"; it is enforced by the index itself, with no trigger and no race window ([PostgreSQL documentation: Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html)). The generated column on `invoices` is enforced by the database every write, which means the fixture and the application cannot disagree about the total ([PostgreSQL documentation: Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html), shipped since PostgreSQL 12). The other three are good hygiene; satus's validator will flag rows that violate any of them once you add them.\n\nFor status, an enum and a `CHECK` are both reasonable, with different ergonomics for adding a new value later. We covered the trade-off in [Enum types that grew up](/blog/enum-types-that-grew-up); the short version is that since PostgreSQL 12 `ALTER TYPE ... ADD VALUE` no longer requires a separate transaction, and the historical reason for preferring `CHECK` has largely been retired.\n\n## MRR, which is a definition more than a measurement\n\nMonthly recurring revenue is the sum of normalised subscription values that are currently in a recurring-billing state. The profile's recommended shape exposes it as a view, not a column, so it stays in sync with whatever the underlying rows say. The view below is the spec we propose for your schema (and the one the v0.4 reporting helpers will emit on request); copy it into a migration if you want it today:\n\n```sql\nCREATE VIEW mrr_components AS\nSELECT\n  s.id AS subscription_id,\n  s.org_id,\n  s.currency,\n  CASE p.interval\n    WHEN 'month'   THEN p.base_cents\n    WHEN 'year'    THEN p.base_cents / 12\n    WHEN 'quarter' THEN p.base_cents / 3\n    WHEN 'week'    THEN (p.base_cents * 52) / 12\n  END AS mrr_cents\nFROM subscriptions s\nJOIN plans p ON p.id = s.plan_id\nWHERE s.status IN ('trialing', 'active', 'past_due');\n```\n\nThree decisions are visible in that view and are worth naming. We recommend including `trialing` in MRR by default, which is the looser convention; the stricter convention excludes it and produces a smaller, lagged number. We recommend including `past_due` because cancelling a subscription on the first failed payment overstates churn; this is the same convention the SaaS finance literature follows. We exclude `unpaid` and `canceled` because access has stopped. The spec defines both views (`mrr_strict` and `mrr_loose`); v0.4 will emit them on opt-in, today you copy whichever you want into a migration.\n\nWe deliberately do not recommend a benchmark for \"good\" MRR growth, a \"typical\" net revenue retention, or any other industry number. Public benchmarks vary by stage, segment, and methodology, and citing one as a default would mislead more often than it would help. The profile steers the fixture; the interpretation is yours.\n\n## Churn, which is at least three different metrics\n\nThe word \"churn\" is overloaded. The three metrics that show up in real dashboards are not interchangeable, and a fixture that confuses them will produce reports that disagree with each other.\n\n| Metric | Numerator | Denominator | What it measures |\n| --- | --- | --- | --- |\n| Logo churn | Subscriptions canceled in period | Subscriptions active at start of period | Customer count attrition |\n| Gross revenue churn | MRR lost from cancels + downgrades | MRR at start of period | Worst-case revenue erosion, before expansion |\n| Net revenue churn | (MRR lost) − (MRR gained from expansion) | MRR at start of period | True revenue movement, can go negative |\n\nThe spec says: generate the events that all three metrics derive from (cancellations, plan changes, quantity changes, downgrades) and join them in a `churn_events` view. Do not put a \"churn rate\" column on `orgs`, because that number is a window function over the events, not a property of the row. Today the LLM is prompted to produce those event rows; the named view and the joiner module are part of the v0.4 build.\n\nA plausible distribution of cancel reasons, illustrative only, drawn from the profile's recommended defaults:\n\n```text\ncancel reason mix, default profile (illustrative shape, not a measurement)\nvoluntary_no_reason       ████████████  27%\nvoluntary_too_expensive   ████████      18%\nvoluntary_missing_feature ██████        14%\nvoluntary_switching       █████         12%\ninvoluntary_payment_fail  ████████      19%\ninvoluntary_fraud_block   █              2%\nother / unknown           ████           8%\n```\n\nThe \"involuntary\" rows are the dunning bucket. In most SaaS reports we have seen, involuntary churn is one of the largest single drivers of attrition and almost the only one a billing engineer can fix without a product change. The next section is how the profile specifies it.\n\n## The dunning death spiral\n\nDunning is the polite name for \"what happens after the card declines.\" A real billing system tries the payment again, then again, then again, on a schedule, and if every retry fails the subscription transitions out of `past_due` into a terminal state. Stripe's default policy retries failed invoices for up to a configurable window before marking the subscription `canceled` or `unpaid`, and exposes the retry schedule as a tunable policy ([Stripe: Smart retries and failed payments](https://docs.stripe.com/billing/revenue-recovery/smart-retries)). Other billing platforms ship similar policies under different names; the shape is industry-standard.\n\nThe profile specifies the shape, not any one vendor's exact schedule: one `invoice` row per attempt with the status appropriate to the outcome, on a curve like the one below. Today the LLM is prompted to produce attempts in this shape and the validator confirms the rows are well-formed; the deterministic per-invoice sampler (`dunning-sampler`) is part of the v0.4 module list, and will replace the LLM's freehand sampling for this slice.\n\n```text\ndefault dunning attempt schedule, sampled per failed invoice\nattempt 1   day 0           (initial charge fails)\nattempt 2   day 3\nattempt 3   day 5\nattempt 4   day 7\nattempt 5   day 14\nattempt 6   day 21\nterminal    day 28          (canceled or unpaid, per org policy)\n```\n\nThe terminal transition is the death spiral, and it is shaped like an exponential decay over the customer base: a sizeable fraction of failed payments recover on attempt 2 or 3, a smaller fraction recover later, and an irreducible tail never recovers and transitions out. The spec calls for sampling a recovery probability per attempt with the curve highest early and flattening fast, so the resulting fixture has a mix of recovered and abandoned subscriptions that exercises both code paths.\n\nWhat this gives you in practice, once you have the recommended constraints in place and the v0.4 sampler enabled (or the LLM is on a good day), is a fixture in which the dunning job has actual work to do: real `past_due` rows with real attempt histories, real terminal transitions on the correct day, real invoice rows whose `attempt_count` field is more than 1, and a reconciliation between `mrr_loose` at the start of the period and `mrr_loose` at the end that closes when you account for new subscriptions, cancellations, plan changes, and the dunning tail.\n\n## Usage events, on a Poisson curve\n\nUsage-based billing is the part of a SaaS schema that uniform fixtures hurt the most. Real usage is bursty: most accounts emit few events most of the time, a small minority emit many, and within a single account usage clusters by hour-of-day in the customer's local time. The spec calls for sampling arrival times for `usage_events` from a Poisson process per account, with the rate drawn from a log-normal across accounts and modulated by an hour-of-day curve borrowed from the appointments profile. Today the prompt asks the LLM to honour this shape and the validator checks the rows fit the schema; the deterministic `poisson-usage` sampler is on the v0.4 list and will take this over from the model.\n\nThe arithmetic the fixture has to honour is then:\n\n```text\ninvoices.amount_cents\n  = plan.base_cents\n  + sum(usage_events.quantity × plan.unit_price_cents)\n    over (usage_events.occurred_at in [period_start, period_end))\n```\n\nIf you have followed the recommendation above and made `invoices.total_cents` a generated column, the database enforces a stricter version of the same statement on every write, the application cannot drift from it, and the finance dashboard you build on top reports numbers that close. Until the v0.4 reconciler ships, the generated column is the single most important guard rail for this profile.\n\n## State-flag columns, briefly\n\nSubscriptions carry the longest list of timestamp-shaped state-flag columns of any table in a typical SaaS schema. Restating the table from [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question) for ease of reference:\n\n| Profile | State-flag columns hit | Median `frac_null` | Range |\n| --- | --- | --- | --- |\n| saas-subscriptions | 12 | 0.97 | 0.90 – 0.995 |\n| medical-booking | 7 | 0.94 | 0.85 – 0.99 |\n| ecommerce | 9 | 0.96 | 0.88 – 0.99 |\n\nTwelve columns is the typical SaaS subscription table's `trial_started_at`, `trial_ended_at`, `activated_at`, `current_period_start`, `current_period_end`, `cancel_at`, `canceled_at`, `ended_at`, `pause_collection_at`, `pause_collection_resumes_at`, `latest_invoice_paid_at`, and `latest_invoice_attempted_at`. Most of them are NULL for most rows because most subscriptions are in `active` and have not yet reached the terminal states that fill them. The 0.97 median is the heuristic talking, not a measurement of your schema.\n\n## What the profile deliberately does not encode\n\nWe get asked for each of these regularly. The reasons matter more than the list.\n\n- **Pricing.** We do not generate plan prices, ladder breakpoints, or unit prices. Pricing is the most product-specific decision in a SaaS schema and the one least useful to default. The profile expects you to populate the `plans` table yourself (a one-time `psql -f plans.sql` against the target database before `satus generate` runs), and it generates everything downstream from your real prices.\n- **Tax.** We will populate a `tax_cents` column with a plausible value relative to the subtotal, but we do not compute jurisdiction-correct tax. A fixture that gets US sales tax structurally right is one bad rounding rule away from a fixture that gets it confidently wrong; the right place to test tax is against a real tax service in a staging environment.\n- **Card data.** We never generate card numbers, even test ones. If a column is named like a card number we fill it with the all-zeros placeholder and warn at plan time. Test card numbers are a payment-processor concern, not a seeder concern.\n- **Cohort retention curves.** We generate the events from which a cohort report can be built and we do not ship a cohort table; that is a reporting concern, not a schema concern.\n- **Multi-currency settlement.** We sample a `currency` column from a weighted categorical using ISO 4217 alphabetic codes ([ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)) and we do not generate exchange-rate tables, settlement ledgers, or base-currency conversions. The right model depends on whether you settle in the customer's currency or your own.\n- **Webhook event streams.** Out of scope for v1. Plausibly a future opt-in for users testing webhook-handler pipelines.\n\nA user who needs any of these can override the relevant column or supply the relevant input. We will help. We will not ship them on by default.\n\n## How to inspect what you are getting\n\nOne command covers most questions.\n\n```bash\n# Plan a run without writing rows; walks the schema, simulates the rows\n# the live planner would produce, and validates them against every\n# NOT NULL, type, range, length, and FK constraint.\nsatus generate --profile saas --schema public --dry-run\n```\n\n`satus generate --dry-run` runs the full plan offline without spending a token on the LLM. The transcript and what it catches is the subject of [an offline dry-run that catches FK and constraint bugs before spending on an LLM](/blog/dry-run-validation).\n\n## The shorter version\n\nA SaaS-subscriptions profile is mostly a state machine, an arithmetic identity, and a retry schedule. The state machine is `trialing → active → past_due → unpaid/canceled` with the legal back-edges and no others. The arithmetic identity is `invoice.total = plan.base + sum(usage × unit_price)`, enforced by a generated column where the schema allows. The retry schedule is the dunning curve, sampled per failed invoice, terminating in either recovery or cancellation. Encode those three correctly and the rest of the profile (Poisson usage, Zipf-ish account sizes, log-normal trial lengths) is parameter-fitting. Encode them as uniform random and the planner, the dashboards, and the dunning job will all behave qualitatively differently in production than they did in test.\n\nIn v0.3 those three are LLM-guided and validator-checked; in v0.4 the state-machine enforcer, the dunning sampler, the Poisson usage generator, and the canonical MRR/churn views move into the CLI as deterministic modules. This post is the contract that build will honour.\n\nIf you are seeding a SaaS-shaped schema and the recommended defaults are wrong for your stage, override the bits that matter (the status mix, the dunning curve, the usage rate) and leave the rest. The [/profiles](/profiles#saas-subscriptions) page lists the three built-ins, the [/quickstart](/quickstart) shows how to point the CLI at your schema, and the [/recipes](/recipes) page has a worked example of a profile override.\n\n## References\n\n- Stripe, [The Subscription object](https://docs.stripe.com/api/subscriptions/object).\n- Stripe, [Smart retries and failed payments](https://docs.stripe.com/billing/revenue-recovery/smart-retries).\n- PostgreSQL documentation, [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html).\n- PostgreSQL documentation, [Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html).\n- PostgreSQL documentation, [CHECK Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).\n- ISO, [4217 Currency codes](https://www.iso.org/iso-4217-currency-codes.html).\n- Earlier in this log: [Inside the medical-booking profile](/blog/medical-booking-profile), [Inside the e-commerce profile](/blog/ecommerce-profile), [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question), [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [Enum types that grew up](/blog/enum-types-that-grew-up), [An offline --dry-run that catches FK and constraint bugs before spending on an LLM](/blog/dry-run-validation).\n\n—the satus.sh team\n";
const __vite_glob_0_18 = '---\nslug: arrays-vs-junction-tables\ntitle: "Arrays vs junction tables: when Postgres arrays are a smell"\ndescription: Postgres array columns are tempting, occasionally correct, and usually a junction table waiting to happen. A field guide to the three cases where arrays win and the four where they don\'t.\ndate: 2026-06-29\nauthor: satus.sh\ntags: [postgres, modeling, seeding]\ndraft: false\n---\n\nPostgres ships native array types, GIN indexes on those arrays, and a polished operator vocabulary (`@>`, `&&`, `ANY`, `unnest`). It is one of the things Postgres does that almost no other production relational engine does at this level of polish. So engineers reach for `text[]` for tags, `uuid[]` for member lists, `int[]` for role bitmaps, and the column ships before anyone has asked the question the column should have answered first: *is this set ever joined against another table?*\n\nThat question is the whole post. If the answer is no, an array is often the right call. If the answer is yes, you have written a foreign key with no constraint, no index that the planner will use the way you think it will, and no `ON DELETE` behavior. You have, in the language we used in [JSONB columns that are secretly relational](/blog/jsonb-that-is-secretly-relational), built a relation the catalog cannot see.\n\n## Three cases where the array is actually right\n\nA `text[]` (or `int[]`, or domain enum array) earns its place when **all three** of the following hold:\n\n1. The element values are scalar and self-contained. Nothing inside the array references a row in another table.\n2. The set is small and bounded, or grows only with the parent row\'s natural lifecycle. You are not going to want a histogram of element frequency across the whole table.\n3. You read the whole array every time you read the row, and you mutate it through the parent (`UPDATE parent SET tags = ...`), not through child-level operations.\n\nThe cleanest live example we have in the corpus is pagila\'s `film.special_features text[]` ([`pagila-schema.sql`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql)). The column holds a handful of category strings ("Trailers", "Commentaries", "Deleted Scenes", "Behind the Scenes") per film. The values are not rows in another table, the set never grows beyond a fistful of entries, and the query pattern is "load a film, read its features." A junction table here would be five rows of overhead per film for no analytical or integrity benefit.\n\nTwo other shapes that legitimately want an array:\n\n- **Ordered, opaque sequences.** Vector embeddings (`vector(1536)`, which is array-shaped internally), per-row event timestamps, ordered preference lists. Order matters, the elements are not entities elsewhere, and decomposing into a child table forces you to invent a `position` column you will then have to keep contiguous.\n- **Small, write-rare label sets that you query with set operators.** Things you\'d cover with a partial GIN index and `WHERE tags @> ARRAY[\'archived\']`. The set fits in a page, the table is read-heavy, and you never join the tag back to anything.\n\nThat\'s the honest list. Everything else gets harder than it needs to be.\n\n## Four smells that mean it should have been a junction table\n\nThe smells below are not theoretical. We see them every week, in every flavor of "we\'ll fix the data model later." They share a pattern: someone wanted set membership without writing two extra tables, and the convenience of `tags text[]` outran the question of what queries the application would eventually run against it.\n\n### Smell 1: the elements are foreign keys in disguise\n\n```sql\nCREATE TABLE comment_thread (\n  id           uuid PRIMARY KEY,\n  participants uuid[]  -- every UUID is supposed to exist in profile.id\n);\n```\n\nThere is no constraint that says so. Delete a profile and the array silently keeps a dangling reference. Add a profile and there is no way to ask "which threads include this profile" without `WHERE participants @> ARRAY[$1]::uuid[]` and a GIN index—which works, but does not give you a foreign key, does not give you `ON DELETE CASCADE`, and does not let `EXPLAIN` show you a clean join plan. We covered the JSONB equivalent of this in [JSONB columns that are secretly relational](/blog/jsonb-that-is-secretly-relational); the array version has exactly the same problem with slightly better ergonomics.\n\nIf the elements name rows in another table, write the junction. The two extra tables pay for themselves the first time someone asks "list every thread that includes profile X" or, worse, "delete profile X cleanly."\n\n### Smell 2: you need per-element metadata\n\nThe day someone asks "when was this tag added?" or "who added this member?" or "is this role currently active, or expired?" the array is over. You cannot attach a timestamp, an actor, or a status to a `text[]` element without serializing structure into the string (`"role:admin:added=2025-01-04"`), which is the worst of all worlds.\n\nA junction table makes this trivial:\n\n```sql\nCREATE TABLE thread_participant (\n  thread_id  uuid    NOT NULL REFERENCES comment_thread(id) ON DELETE CASCADE,\n  profile_id uuid    NOT NULL REFERENCES profile(id)        ON DELETE CASCADE,\n  added_at   timestamptz NOT NULL DEFAULT now(),\n  added_by   uuid    REFERENCES profile(id),\n  PRIMARY KEY (thread_id, profile_id)\n);\n```\n\nIf you suspect within a year you will want any per-element metadata, do not start with an array. Migrating later is not free: you have to keep the array and the table in sync during the cutover or accept a window where the new metadata does not exist for old rows.\n\n### Smell 3: you need to query across rows by element\n\n"How many films have \'Trailers\'" is fine against `film.special_features` because there are 1,000 films. "How many users have the `beta-pricing-v2` feature flag" against `users.feature_flags text[]` on a million-row table is fine for one query and miserable for the dashboard that wants to break it down by signup cohort, plan, and country.\n\nThe moment you want `GROUP BY element`, you are calling `unnest(arr)` on every row in the table. With a junction table, `feature_flags(user_id, flag)` gives you a real B-tree index on `flag`, real cardinality statistics, real partial indexes per flag, and a query plan the planner can actually optimize. GIN on the array can answer membership questions; it cannot turn the array into a column the planner reasons about as a relation.\n\nThe asymmetric workload—write rarely, read in many ways—is exactly what relational decomposition was invented for. Arrays serve the opposite workload: read whole, write whole, never aggregated.\n\n### Smell 4: you need uniqueness, ordering, or referential integrity inside the set\n\nPostgres arrays do not enforce element uniqueness. `tags text[] = ARRAY[\'x\', \'x\']` is a valid value. If your application contract says "each tag appears at most once," the database does not know that, and you will at some point ship a bug that puts a duplicate in. The standard workaround—`CHECK (cardinality(tags) = cardinality(ARRAY(SELECT DISTINCT unnest(tags))))`—works and is the kind of constraint nobody remembers to write at table-creation time.\n\nJunction tables enforce uniqueness for free via the composite primary key. They enforce referential integrity for free via the foreign keys. They enforce ordering, if you need it, via an explicit `position int NOT NULL` column with a unique constraint per parent. Every one of those guarantees you have to bolt onto an array column with a `CHECK` that is brittle, slow, or both.\n\n## The borderline case: tags\n\nThe single most common array column we see is some variant of `tags text[]` or `tags varchar[]`. listmonk uses it on both [`lists.tags`](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql) and [`campaigns.tags`](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql), with no related `tag` table and no junction. For an operator-facing newsletter tool where tags are free-form strings, never aggregated across the whole table, and only ever read together with the parent list or campaign, this is a defensible choice. Three things to ask before you accept it on your own schema:\n\n- **Are tags ever first-class entities?** Do you want a tag detail page, a rename operation that updates every reference, a tag-level permission? If yes, write a `tag` table and a junction.\n- **Are tags queried across rows by tag value?** "Show me all campaigns tagged `q3-launch`" against an array column works via GIN, but "give me the top 20 tags by campaign count" is a full-table `unnest` aggregation. If that is a real product requirement, the junction wins on day one.\n- **Are tags shared with another system?** If the same tag taxonomy lives in your CRM, your analytics pipeline, and a half-finished tagging UI, the array column will drift from each of them. The junction is the synchronization point.\n\nIf all three answers are no—operator types in free-form strings, never aggregated, never shared—the array is fine. We are not recommending you migrate listmonk. We are recommending you ask the three questions before you copy the pattern into a schema where the answers are different.\n\n## What this means for seed data\n\nTwo practical observations from our side of the fence.\n\nFirst, every seed tool we have looked at, including satus today, treats array-typed columns shallowly. In [`packages/cli/src/generate/schema.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/schema.ts), the JSON-schema mapping switches on `udtName` and does not branch on Postgres\'s array convention (the `_text`, `_varchar`, `_uuid` udt names that mark an array). Array columns fall through to the default `string` mapping and the model emits a single string instead of a JSON array. The insert path then either fails on type mismatch or coerces a one-element array depending on the driver. We are tracking this under the v0.4 introspection pass; until it ships, the honest workaround for a schema with array columns is a per-column override in `satus.config.json` (the same escape hatch documented in the JSONB post).\n\nSecond, if you have already written the junction table, seeding is straightforward. Generate the parents, generate the children, generate the junction rows by sampling pairs with whatever cardinality distribution your domain wants. Every step is a row insert against a table the catalog describes. If you have written the array, the seed tool has to invent both the array length distribution and the element values, with no schema-level hint about which is correct. Junction tables are not just easier to query; they are easier to populate honestly.\n\n## Decision checklist\n\nUse this before merging the column.\n\n```text\nQuestion                                                      Array OK?   Junction\n────────────────────────────────────────────────────────────  ──────────  ──────────\nDo elements reference rows in another table?                  no          yes\nWill you ever attach metadata to an element?                  no          yes\nWill you ever GROUP BY element across many rows?              no          yes\nDo you need element-level uniqueness or ordering enforced?    no          yes\nIs the set bounded, scalar, and read-whole?                   yes         no\nIs order intrinsic to the value (vectors, sequences)?         yes         no\n```\n\nThree "no"s on the bottom two rows, or one "yes" on the top four, is your signal. Arrays are not wrong; they are narrow. The narrowness is the whole feature.\n\n## References\n\n- pagila, `film.special_features`—[`pagila-schema.sql`](https://github.com/devrimgunduz/pagila/blob/master/pagila-schema.sql)\n- listmonk, `lists.tags` and `campaigns.tags`—[`schema.sql`](https://github.com/knadh/listmonk/blob/v3.0.0/schema.sql)\n- Postgres arrays, language reference—[Postgres 17 §8.15](https://www.postgresql.org/docs/17/arrays.html)\n- GIN indexes on arrays—[Postgres 17 §70](https://www.postgresql.org/docs/17/gin.html)\n- satus column-type mapping (today)—[`packages/cli/src/generate/schema.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/schema.ts)\n- Companion post on the JSONB version of the same anti-pattern—[JSONB columns that are secretly relational](/blog/jsonb-that-is-secretly-relational)\n';
const __vite_glob_0_19 = "---\nslug: the-1am-deploy-that-only-failed-in-prod\ntitle: The 1am deploy that only failed in prod\ndescription: A field note on why a query that ran in 4ms on a seeded dev database stalled the moment it hit real cardinality, and what the planner was actually looking at.\ndate: 2026-07-01\nauthor: satus.sh\ntags: [postgres, planner, performance, seeding]\ndraft: false\n---\n\nThis is a field note from a satus user, anonymized with their permission. The details that matter (schema shape, planner behavior, resolution) are intact. The names and column identifiers are not.\n\nThe deploy went out at 1:07am on a Tuesday. It was a two-line change: a new `WHERE tenant_id = $1 AND status = 'active'` clause on an existing endpoint, plus a composite index to support it. Local ran in 4ms. Staging ran in 6ms. The migration applied in prod in 800ms. The endpoint p99 went from 90ms to 41 seconds within four minutes and the on-call got paged.\n\nThe rollback was clean. The interesting part is why every pre-prod signal was green.\n\n## What dev looked like\n\nDev had roughly 1,000 rows in the affected table, generated by a fixture script that predated satus. `tenant_id` was drawn uniformly at random from 20 tenants. `status` was drawn uniformly from four values. On that distribution, the new index had ~12 rows per `(tenant_id, status)` pair. The planner picked an index scan, returned 12 rows in a nested loop against a small parent table, and everything was fast because everything was small.\n\nStaging was a nightly restore of a scrubbed prod snapshot from *six months earlier*, back when the table had 400k rows. The composite index was still narrow enough on that snapshot that an index scan was cheap. Also fast.\n\nProd had 51.2M rows. One tenant owned 78% of them. `status = 'active'` covered 94% of that tenant's rows. The `(tenant_id, status)` pair the endpoint was called with matched roughly 37 million rows.\n\n## What the planner was actually doing\n\nPostgres estimates row counts from `pg_statistic`, populated by `ANALYZE` and controlled by `default_statistics_target` (default 100). For a composite predicate like `WHERE a = $1 AND b = $2`, the planner multiplies per-column selectivities unless extended statistics tell it the columns are correlated. See the row-estimation walkthrough in the [Postgres docs](https://www.postgresql.org/docs/current/row-estimation-examples.html) and the [planner statistics chapter](https://www.postgresql.org/docs/current/planner-stats.html) for the mechanics.\n\nIn dev, the estimate and the reality were both \"about a dozen rows\". Nested loop, index scan, done.\n\nIn prod, the estimate was still low (per-column selectivities multiplied to something like 0.05 * 0.25 = 1.25%, which on 51.2M rows is ~640k), but the *actual* matching set was ~37M. The planner committed to the nested-loop plan the estimate justified, then had to drive 37M outer-loop iterations against the parent table's index. That is the 41-second p99. A hash join over a sequential scan would have finished in under two seconds; the planner never considered it because the estimate said it did not need to.\n\nThe abbreviated shape, with representative numbers rounded from the incident's actual `EXPLAIN (ANALYZE, BUFFERS)`:\n\n```text\nNested Loop  (cost=0.86..48210.44 rows=640123 width=84)\n             (actual time=0.42..41210.88 rows=37118442 loops=1)\n  ->  Index Scan using events_tenant_status_idx on events\n        Index Cond: (tenant_id = $1 AND status = 'active')\n        rows=640000 (estimate)  vs  rows=37118442 (actual)\n  ->  Index Scan using parents_pkey on parents\n        Index Cond: (id = events.parent_id)\n```\n\nThe `rows=` estimate being off by ~58× is the whole bug. Once the estimate is wrong by that much, every downstream join method choice is wrong too.\n\n## Why seeded dev data hid it\n\nThree separate properties of the fixture worked together to hide the problem:\n\n1. **Uniform distributions.** Real tenant data is almost never uniform. One tenant is usually an order of magnitude larger than the median. Uniformly-distributed seed data makes selectivity estimates look accurate on dev because they *are* accurate on dev.\n2. **Small absolute row counts.** At 1,000 rows, every plan is fast. Sequential scan, index scan, nested loop, hash join—the wall-clock differences are noise.\n3. **No cross-column correlation.** In prod, `tenant_id` and `status` were correlated: the largest tenant also had the highest active-row ratio. In dev they were independent by construction, which is exactly the assumption the planner already makes without extended statistics. The dev data confirmed the planner's default assumption instead of stress-testing it.\n\nNone of these are bugs in the fixture. They are the default behavior of every \"generate N rows of random data\" script we have ever seen, including the ones satus generated in v0.1. The realism gap is not about volume alone—it is about *shape*.\n\n## What the fix looked like\n\nTwo changes shipped the same week:\n\n- `CREATE STATISTICS events_tenant_status (dependencies, ndistinct) ON tenant_id, status FROM events;` followed by `ANALYZE events;`. Extended statistics let the planner see the correlation and produced a hash-join plan on the same query in ~1.4s. The [CREATE STATISTICS docs](https://www.postgresql.org/docs/current/sql-createstatistics.html) describe the two flavors that matter here.\n- A staging environment restored from a *current* prod snapshot, not a six-month-old one. This is the change that actually catches the next incident.\n\nThe satus-side change was the one that took the rest of the week to design honestly. A profile that generates a heavy-tailed tenant distribution and a correlated `status` field is not hard to write; the hard part is picking distributions that generalize across schemas without becoming a lie of a different shape. The `saas-subscriptions` profile, [written up here](/blog/saas-subscriptions-profile), is the first one to encode heavy-tailed tenant sizes as guidance. It is a specification, not enforcement—the LLM plans against it and the [`--dry-run` validator](/blog/dry-run-validation) checks structural conformance, but neither one can guarantee your dev database will trip the same planner branch as prod. What they can do is stop your dev database from *confirming* a wrong assumption.\n\n## The one-line takeaway\n\nUniformly-distributed seed data is a hypothesis test the planner is guaranteed to pass. If you want to catch the 1am deploy in dev, seed a distribution that could plausibly disagree with the planner's defaults, then run `EXPLAIN (ANALYZE, BUFFERS)` on the query paths you actually ship.\n\n## References\n\n- [Row estimation examples](https://www.postgresql.org/docs/current/row-estimation-examples.html), PostgreSQL docs.\n- [Planner statistics](https://www.postgresql.org/docs/current/planner-stats.html), PostgreSQL docs.\n- [CREATE STATISTICS](https://www.postgresql.org/docs/current/sql-createstatistics.html), PostgreSQL docs.\n- Prior posts: [Inside the saas-subscriptions profile](/blog/saas-subscriptions-profile), [A $0 dry-run that catches FK and constraint bugs](/blog/dry-run-validation).\n\n—the satus.sh team\n";
const __vite_glob_0_20 = '---\nslug: v0-3-3-github-action\ntitle: "Roadmap: v0.3.3 ships the GitHub Action, and v0.5 becomes v0.4"\ndescription: What the next satus release will and will not do, why the GitHub Action is a 0.3.x patch and not a 0.4 line item, and how the version numbers shift.\ndate: 2026-07-03\nauthor: satus.sh\ntags: [roadmap, ci, github, release]\ndraft: false\n---\n\n> **Editor\'s note (2026-08-05):** This post references `passkeybridge/satus-action@v1` on the GitHub Marketplace. The Action was never published as a standalone Marketplace repo; it lives in the main repo and is referenced as `passkeybridge/satus/packages/action@main`. YAML snippets below have been updated to the working reference.\n**Update 2026-07-15: superseded by the [v0.3.3 release notes](/blog/v0-3-3-release-notes).** The Action shipped as designed; this post stays as the pre-release design record.\n\nThis is a roadmap post, not a release announcement. The GitHub Action described below has not shipped yet. The current published CLI is `@passkeybridge/satus@0.3.2`. When v0.3.3 lands on npm, a proper changelog post replaces this one at a different slug; this post stays as the design record.\n\nThe short version: the next satus release is **v0.3.3**, and it ships an official GitHub Action that runs `satus generate` inside a PR-preview workflow. It is deliberately a 0.3.x patch, not a 0.4 line item, because it wraps the existing CLI rather than changing what the CLI does. As a consequence, the release we previously labeled **v0.5 (agent mode)** in [Agent mode, postponed to v0.5](/blog/agent-mode-postponed) is renumbered to **v0.4.0**. Same feature, same 90-day evidence window, one fewer digit.\n\n## Why an Action, and why now\n\nThe most common inbound request that is not "support my schema" is some variant of "how do I run this on every PR". Preview databases are already the default in a good chunk of the TanStack / Vercel / Supabase / Neon / Turso preview-branch world. The friction today is that `satus generate` requires a shell, a `DATABASE_URL`, and a provider key sitting in the right environment. That is fine on a laptop and awkward in CI.\n\nWe are being careful not to overstate this signal. We do not yet have telemetry that tells us what fraction of installs are trying to wire satus into GitHub Actions on their own; the copy in our own content plan claimed "60% of early users" and we are retiring that number because we cannot cite it. What we can cite is the shape of the questions in our inbox and the shape of the failure modes when people try to script the CLI with `run: npx satus generate` and no timeout, no cache, no key redaction. The Action exists to make the common case boring.\n\n## What v0.3.3 will contain\n\nThe release is deliberately narrow. Everything below is scoped, not shipped:\n\n- `packages/action/`—a composite GitHub Action published to the Marketplace as `passkeybridge/satus/packages/action@main`. Composite means no Docker image, no container startup cost, no root filesystem writes; it is three shell steps that install Node, run `npx @passkeybridge/satus@<pinned-version> generate`, and upload the run manifest as a workflow artifact.\n- `action.yml`—inputs for `database-url` (required, always passed as a secret), `rows`, `profile`, `provider`, `model`, `max-cost`, `dry-run`, `working-directory`, and `satus-version` (defaults to the latest 0.3.x). Outputs the `run-id`, `tables-seeded`, `rows-inserted`, `tokens-in`, `tokens-out`, and `spent-usd` fields so downstream steps can gate on cost.\n- One integration test in `.github/workflows/action-selftest.yml` that stands up an ephemeral Postgres service container, runs the Action against the `pagila` fixture from our [corpus audit](/blog/introducing-the-log), and asserts a clean `--dry-run` followed by a non-empty insert.\n- Docs at `/docs/github-action` on the marketing site, with a full example workflow and the security notes below.\n- A `CHANGELOG.md` entry and a matching post at `/blog/v0-3-3-release-notes` on the day of the npm publish.\n\nNothing about the CLI\'s semantics changes. The Action calls the same binary you already run locally with the same flags. If it works on your laptop, it works in the Action; if it fails in the Action, it fails on your laptop.\n\n## The intended workflow shape\n\nThe point of a composite action is that the caller writes a small amount of YAML and gets a lot of behaviour. This is the shape we are targeting for the launch example:\n\n```yaml\nname: Seed preview database\non:\n  pull_request:\n    types: [opened, synchronize, reopened]\n\njobs:\n  seed:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: passkeybridge/satus/packages/action@main\n        with:\n          database-url: ${{ secrets.PREVIEW_DATABASE_URL }}\n          rows: 250\n          profile: saas\n          max-cost: \'0.50\'\n        env:\n          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}\n```\n\nThree semantically-load-bearing choices in that block are worth spelling out:\n\n1. **`database-url` is an input, not an env var.** GitHub redacts inputs in logs the same way it redacts env vars, but making it an input means it is visible in the Action\'s own schema and shows up as a required field in the Marketplace UI. Someone copying the snippet is less likely to leave it empty by accident.\n2. **`max-cost` is required to be a string.** YAML parses `0.5` as a float, and the CLI\'s zod validator expects a `string` for the `--max-cost` flag so it can normalize the format itself. The Action forwards it verbatim.\n3. **The provider key stays in `env:`, not `with:`.** The CLI reads `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` from the environment already ([v0.3.0 shipped that in June](/blog/v0-3-0-anthropic-and-machine-readable-output)); the Action does not touch the key. That keeps the key off the Action\'s public input schema and means a compromised Action version cannot exfiltrate it through the input surface.\n\n## What we are choosing not to build\n\nThis is where a small release stays small.\n\n- **No hosted-key mode.** If you want satus in CI without a BYO API key, that is the tier we described in the [agent-mode roadmap](/blog/agent-mode-postponed) and it does not land with v0.3.3.\n- **No auto-commit of generated data.** The Action does not open a follow-up PR with a SQL dump. Seed data belongs in the ephemeral preview database, not in the git history.\n- **No cache of previously-generated rows.** Every invocation regenerates. Caching row content in Actions cache would leak whatever distribution the LLM produced, and the cache-key correctness problem (schema hash + profile hash + provider version) is not worth solving for a first release.\n- **No matrix examples over multiple providers.** The docs will show one OpenAI and one Anthropic example. If you want both in one workflow, the CLI has always let you set `--provider` per invocation; that predates the Action.\n- **No GitLab CI, no CircleCI, no Buildkite equivalent.** The CLI already runs anywhere Node runs; the Action is a convenience layer for the single largest CI host, not a portability layer.\n\n## The renumbering, briefly\n\n`agent-mode-postponed` committed to three future releases: v0.4 (telemetry hooks), v0.5 (agent mode), v0.6 (hosted keys). That numbering was written before the Action was on the table. Under the new plan:\n\n```text\nold            new           contents\n────           ────          ────────\nv0.3.3         v0.3.3        GitHub Action (this post)\nv0.4           (folded)      telemetry hooks land inside v0.3.3\nv0.5           v0.4.0        satus agent, opt-in, interactive\nv0.6           v0.5.0        hosted-key tier\n```\n\nTelemetry-hook collection (SHA-256 fingerprints of normalized DDL, validator class, invocation sequence; no row contents; opt-in) is small enough to land inside v0.3.3 alongside the Action. That is the only substantive change to the previously-published plan. The 90-day evidence window for the agent, the tool surface, the approval gates, and everything else in the earlier post stand.\n\n## Timeline and honesty\n\nTarget for v0.3.3 on npm: **2026-07-10 to 2026-07-11**. That is the week after next, not next week; the intervening week is reserved for the telemetry-hook work that lands in the same release. If it slips, this post gets a dated update; it does not get quietly rewritten. When the release lands, `/blog/v0-3-3-release-notes` will link back here, and the changelog on this page will read `Superseded by v0.3.3 release notes` with a link.\n\nIf you have a preview-database workflow that satus should behave well inside and does not today, the [GitHub issue tracker](https://github.com/passkeybridge/satus) is the right place. We read everything there.\n\n## References\n\n- [Agent mode, postponed to v0.5](/blog/agent-mode-postponed)—original roadmap; version numbers now shift by one minor as described above\n- [v0.3.0 release notes](/blog/v0-3-0-anthropic-and-machine-readable-output)—provider auto-detect and env-var conventions the Action inherits\n- [Introducing the log](/blog/introducing-the-log)—corpus audit fixtures used in the Action self-test\n- [GitHub Actions · Creating a composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)\n- [GitHub Actions · Security guides for actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)\n- [satus on GitHub](https://github.com/passkeybridge/satus)\n';
const __vite_glob_0_21 = '---\nslug: picking-distributions-not-values\ntitle: "Profile design 101: pick distributions, not values"\ndescription: The heuristic we use when adding a new vertical to satus. Name the distributions and the correlations first, then, and only then, sample values. An internal design doc, published.\ndate: 2026-07-10\nauthor: satus.sh\ntags: [profile, methodology, distributions, postgres, seeding]\ndraft: false\n---\n\n> **Editor\'s note (2026-07-16):** References to a `medical-booking` profile and to profiles that "carry conditioners" describe design intent from mid-2026. The shipped CLI (v0.3.5) uses simpler prompt-based profiles — `saas`, `ecommerce`, `b2b` — see [/profiles](/profiles). The distribution-modeling argument (correlate, don\'t sample independently) is the durable point.\n\n\n\nWhen we design a new profile for [satus](/), we do not start with sample rows. We start with a list of column shapes, a distribution family for each shape, and a shorter list of correlations between them. Values are the last thing we write, because values without a distribution behind them are trivia, and trivia is what generic fakers already ship. This post is the internal design doc we hand a new contributor on their first day, made public without much editing.\n\nThe doc leans on three earlier posts. The critique of value-first fakers lives in [When faker is the wrong answer](/blog/when-faker-is-the-wrong-answer). The reason a fixture has to match Postgres\'s planner statistics, not just its constraints, is in the [ecommerce profile deep-dive](/blog/ecommerce-profile). The state-flag heuristic that lets us fill most timestamp columns with NULL without lying is in [NULL vs NOT NULL is not the question](/blog/null-vs-not-null-is-not-the-question). If you have read those three, the rest of this post is the workflow that ties them together.\n\n## The heuristic in one sentence\n\nA profile is a list of opinions about distribution shape, ranked by how badly a wrong opinion breaks the downstream code. Everything else, including the pool of fake company names and the choice of `.99` versus `.49` for price endings, is downstream of that list.\n\nWe enforce this by writing the profile in a fixed order:\n\n1. Enumerate the shapes the schema contains.\n2. Pick a distribution family per shape.\n3. Name the correlations between shapes.\n4. Name the things you refuse to encode.\n5. Only then, choose the sampling pools that produce the values.\n\nSteps 1 through 4 are where a profile earns its keep. Step 5 is where a profile looks like a faker to somebody skimming the YAML, which is why the discipline of doing 1 through 4 first has to be written down.\n\n## Step 1: enumerate the shapes\n\nA "shape" is a distribution family that recurs across schemas, not a specific column. Every profile we have shipped is built out of the same short list. We keep the list short on purpose, because a longer list produces a knob-heavy configuration surface that new users cannot reason about.\n\n| Shape family | Where it shows up | Wrong default that hurts |\n| --- | --- | --- |\n| Popularity over a set | catalogs, providers, tenants, tags | uniform (every SKU equally popular) |\n| Count per parent | items per order, appointments per patient, seats per account | normal around a small mean |\n| Duration | appointment length, session length, invoice age | uniform over a range |\n| Time-of-day | order placement, login, message send | uniform over 24 hours |\n| Day-of-week and seasonality | orders, appointments, signups | flat calendar |\n| Terminal-state mix | order status, subscription status, ticket state | equal-weight categorical |\n| Monetary value | price, invoice total, contract value | uniform in cents |\n| Rare-event rate | no-shows, chargebacks, refunds, churn | too rare to appear at fixture size |\n| Geographic mix | country, currency, locale | US-only, or perfectly even |\n\nNine families, three of which (popularity, count per parent, rare-event rate) do most of the damage when they are wrong. If a new vertical has a shape that does not fit into this list, the first question is not "what distribution should we add", it is "are we sure this is a shape, or is it a value pool wearing a shape\'s clothes". More often than not, a proposed new shape collapses into one of the nine above once you write out how you would sample from it.\n\n## Step 2: pick a distribution family per shape\n\nFor each shape we default to one distribution family, parameterised as coarsely as we can get away with. The defaults matter because most users never override them.\n\n| Shape family | Default family | Why this one |\n| --- | --- | --- |\n| Popularity | Zipf (discrete power law) | appears across catalogs, content, and search ([Wikipedia: Zipf\'s law](https://en.wikipedia.org/wiki/Zipf%27s_law); Newman\'s review, [arXiv:cond-mat/0412004](https://arxiv.org/abs/cond-mat/0412004)) |\n| Count per parent | shifted Zipf or geometric | mode at 1, thin right tail, matches basket-size and appointments-per-patient telemetry |\n| Duration | log-normal | positive, skewed, one shape parameter ([Wikipedia: Log-normal](https://en.wikipedia.org/wiki/Log-normal_distribution)) |\n| Time-of-day | bimodal triangular in local time | cheap to sample, correct on the qualitative shape, no seasonal hyperparameters |\n| Day-of-week | per-day multiplier over a base rate | one number per day, trivially overrideable |\n| Seasonality | per-month multiplier | same reason as day-of-week; explicit, not learned |\n| Terminal-state mix | weighted categorical | the only shape a categorical is honest for |\n| Monetary value | log-normal in minor units | matches price distributions across every catalog we have looked at |\n| Rare-event rate | Bernoulli per row, per category if needed | one probability per category, easy to tune |\n| Geographic mix | weighted categorical | reflect where the traffic actually is, not where the map is symmetric |\n\nThe rule for choosing between two candidate families is: pick the one with fewer parameters that reproduces the qualitative shape. A Zipf with one exponent beats a fitted mixture of two normals every time, because the exponent survives being overridden by a user who has never opened a stats textbook. The moment a distribution needs three parameters to be useful, we have almost certainly picked the wrong family.\n\n## Step 3: name the correlations\n\nDistributions in isolation are the easy half. The hard half is that shapes in a real system correlate with each other, and a profile that samples each column independently produces rows that are individually plausible and jointly ridiculous. A few we always ask about when scoping a new vertical:\n\n- Time-of-day correlates with day-of-week. Weekend traffic has a different intra-day curve than weekday traffic. In the medical profile, Saturday\'s peak is earlier than a weekday\'s; in ecommerce, the evening peak is later on Friday and Saturday than mid-week.\n- Seasonality correlates with rare-event rate. Holiday-season orders return at a higher rate than the annual mean; Q4-signed SaaS contracts churn at a different rate than Q2-signed ones.\n- Popularity correlates with category. In ecommerce, the top decile of SKUs is not evenly spread across categories; in SaaS, the top decile of tenants is not evenly spread across plans.\n- Count per parent correlates with popularity. Heavy accounts have more of everything: more users, more sessions, more invoices, more support tickets. A fixture that samples these independently produces a distribution of "how much does the top tenant use us" that is much narrower than reality.\n\nWe write the correlations down as a small block at the top of the profile, and the runner enforces them by conditioning later samples on earlier ones. The three shipped profiles, [ecommerce](/blog/ecommerce-profile), [medical-booking](/blog/medical-booking-profile), and [SaaS-subscriptions](/blog/saas-subscriptions-profile), each carry a handful of these conditioners. Every one of them was added because a user reported a fixture that was individually correct and jointly wrong.\n\n## Step 4: name what you refuse to encode\n\nEvery profile ships with a short section headed "does not encode". This is not a disclaimer; it is a design decision. Anything on that list is something a user can override in their own profile file, but that we refuse to make the default because the right default depends on facts we do not have.\n\nRecurring entries on the "does not encode" list:\n\n- Real proper nouns. No real customer names, real product SKUs, real clinic names, real domains. Synthetic pools only. This is [also our stance on PII](/blog/when-faker-is-the-wrong-answer) and it does not change per vertical.\n- Payment instrument data. No card numbers, no IBANs, no routing numbers, ever. If a column is named like one of these we fill zeros and warn at plan time.\n- Category-specific overrides where the categories are user-defined. A `fashion` sub-profile inside `ecommerce` would be wrong for the user who asked for `streetwear`; a `dermatology` sub-profile inside `medical-booking` would be wrong for the user who asked for `teledermatology`. Categories belong in user overrides.\n- Numbers we cannot cite. If the honest citation would be "a vendor blog post from 2019", we do not embed the number. We embed a shape and hedge the magnitude.\n\nWriting this section forces the profile author to be explicit about the difference between "we have not shipped this yet" and "we have decided not to ship this". The two are treated very differently in issue triage.\n\n## Step 5: choose the value pools last\n\nOnly after steps 1 through 4 are on paper do we open a fake-data library and pick pools for names, cities, product descriptors, and so on. The pools are the least load-bearing choice in the profile and by far the most visible, which is the reason a value-first design keeps producing profiles that look plausible on the surface and behave wrong under load. A weighted-categorical over `["US", "GB", "DE", "FR", "JP", "other"]` is a shape decision; the specific city names that go with each country are a pool decision. Getting the shape wrong makes the planner statistics wrong. Getting the pool wrong makes a screenshot look slightly less impressive.\n\nThe distinction shows up cleanly in what fails a code review. We reject a PR that sets `US 0.25, GB 0.25, DE 0.25, FR 0.25` as the country weights, because that is a shape decision made without reference to any traffic we have ever seen. We do not reject a PR that swaps one plausible city list for another.\n\n## A worked micro-example: a logistics profile in one page\n\nTo make the process concrete, here is what we would sketch on a whiteboard if a user asked us to add a `logistics` profile tomorrow. This is not a shipped profile and the numbers are illustrative.\n\n**Shapes present:** popularity (lanes, carriers), count per parent (shipments per customer), duration (transit time), time-of-day (pickup, delivery), day-of-week and seasonality (peak season), terminal-state mix (delivered, delayed, lost, returned), monetary value (shipment cost), rare-event rate (loss, damage), geographic mix (origin and destination country pairs).\n\n**Distribution families:**\n\n```text\nlane popularity         Zipf, s ≈ 0.9\ncarrier popularity      Zipf, s ≈ 0.6\nshipments per customer  shifted Zipf, mode 1, p99 ≈ 40\ntransit time (days)     log-normal, median 3, p95 ≈ 12\npickup time-of-day      bimodal triangular in local, peaks 09:00 / 15:00\nday-of-week             Mon 1.05, Tue-Thu 1.10, Fri 1.15, Sat 0.60, Sun 0.15\nseasonality             Nov 1.35, Dec 1.40, Jan 0.80, others 1.00\nstatus mix              in_transit 0.15, delivered 0.78, delayed 0.04,\n                         lost 0.005, returned 0.025\nshipment cost           log-normal in cents, median 42.00, p95 ≈ 480.00\nloss rate               Bernoulli, 0.005 baseline, 3x on lanes flagged fragile\ncountry-pair mix        weighted categorical over top ~30 lanes\n```\n\n**Correlations to enforce:**\n\n```text\ntransit time            conditioned on origin-destination pair\nstatus mix              conditioned on transit-time percentile (a shipment\n                         at the 99th percentile of transit time has a higher\n                         P(delayed) and P(lost))\nseasonality             pushes both order count AND transit time upward\n                         (peak season is slower per shipment, not just busier)\n```\n\n**Does not encode:** real carrier names, real tracking-number formats, real airport codes as anything other than a neutral three-letter pool, harmonised tariff codes, customs paperwork, insurance riders.\n\nThat whiteboard sketch, plus a day of writing tests against a real customer\'s shipments schema, is the whole design phase. The code to sample from those distributions is standard library. The reason we can ship a plausible profile in a week rather than a quarter is that most of the work happens before any code is written.\n\n## The anti-patterns we have learned to avoid\n\nThree anti-patterns keep showing up in profile PRs, ours and contributors\', and all three are variations on skipping step 1.\n\nThe first is the "sample rows" PR. Somebody opens the file, sees a section of YAML, and adds ten literal example rows to it. Ten rows do not constitute a distribution; they constitute a very small pool. If we merged the PR the fixture would be indistinguishable from the input rows at scale, and the planner would learn statistics from a ten-row multiset. We reject these and ask for a distribution family instead.\n\nThe second is the "one big categorical" PR. Somebody replaces a Zipf or log-normal with a weighted categorical over twenty buckets, on the grounds that categoricals are easier to reason about. The categorical is easier to reason about, and it is also flat inside each bucket, and inside-bucket flatness is exactly the failure mode a Zipf was chosen to avoid.\n\nThe third is the "make it configurable" PR. Somebody adds three new knobs to a distribution because their specific use case wants them. Every knob is a knob a future user will have to reason about and get wrong, and knobs multiply. We ship the coarsest parameterisation we can defend and push per-use-case tuning into user override files, which do not need a satus release to change.\n\n## The checklist\n\nBefore merging a new profile, a contributor confirms all of the following, in this order:\n\n- The nine (or so) shape families are enumerated, and any shape not on the standard list is justified in the PR description.\n- Each shape has a distribution family with one or two parameters, defended in a comment above it.\n- Correlations are named and enforced in the runner, not left to the reader to notice.\n- The "does not encode" section is present and specific.\n- Value pools are last in the file and short.\n- The corpus-style structural claims (schema counts, table counts, and so on) in the accompanying blog post cite our own [corpus](https://github.com/passkeybridge/satus/tree/main/corpus) or a named public source, never a vendor blog.\n\nIf any of those is missing, the profile is not ready. The runner will accept it, the tests will pass, and it will silently be another value-first faker with slightly better packaging. Nobody needs another one of those.\n\n## The shorter version\n\nValues are the noise. Distributions are the signal. Correlations are the difference between rows that are individually plausible and a fixture that is jointly plausible. Refusals are the difference between a design decision and a backlog item.\n\nIf you want to see the process applied to real schemas, the [profiles page](/profiles) lists the three profiles we ship today, and the [quickstart](/quickstart) walks through pointing satus at your own schema. If you are building a profile for a vertical we do not ship yet, this post is the workflow. Send us the sketch; we will read it.\n\n## References\n\n- PostgreSQL documentation, [Statistics Used by the Planner](https://www.postgresql.org/docs/current/planner-stats.html).\n- Wikipedia, [Zipf\'s law](https://en.wikipedia.org/wiki/Zipf%27s_law).\n- M. E. J. Newman, "Power laws, Pareto distributions and Zipf\'s law", 2004, [arXiv:cond-mat/0412004](https://arxiv.org/abs/cond-mat/0412004).\n- Wikipedia, [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).\n- PostgreSQL documentation, [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).\n';
const __vite_glob_0_22 = "---\nslug: generated-columns-are-load-bearing-now\ntitle: \"Generated columns are load-bearing now\"\ndescription: Postgres GENERATED columns moved from novelty to infrastructure once PG12 shipped STORED and PG18 shipped VIRTUAL. What that means for introspection, INSERT ordering, and seeders.\ndate: 2026-07-13\nauthor: satus.sh\ntags: [postgres, generated-columns, schema, seeding]\ndraft: false\n---\n\nA `GENERATED` column in Postgres is a column whose value is not written by the client but computed from other columns in the same row by an expression the database enforces. Since [PostgreSQL 12](https://www.postgresql.org/docs/12/ddl-generated-columns.html) the `STORED` variant has been in the core; since [PostgreSQL 18](https://www.postgresql.org/docs/18/ddl-generated-columns.html) the `VIRTUAL` variant is in the core too, and the default. For a tool like [satus](/) that has to produce rows the database will accept on the first try, that is a category change: the column looks like every other column to a `SELECT`, but any `INSERT` that names it in the column list is a hard error, and any `INSERT` that omits it still has to satisfy every downstream constraint, index, and foreign key that references the value the database is about to compute. This post is the field guide to reading them out of the catalog, planning around them, and two anti-patterns worth naming in schemas that adopted them recently.\n\n## The short version\n\nPostgres computes the value of a generated column from an immutable expression over the row being written; the client cannot supply the value and can only write `DEFAULT` (or leave the column out entirely). A `STORED` generated column is materialised on disk at write time and behaves, for storage and index purposes, like a regular column. A `VIRTUAL` generated column is computed on read and stores nothing. Both kinds appear in `pg_attribute` with `attgenerated` set to `'s'` or `'v'`; a naive introspector that ignores `attgenerated` will try to `INSERT` into them and Postgres returns `ERROR: cannot insert a non-DEFAULT value into column \"…\"` with `DETAIL: Column \"…\" is a generated column.` on the first row. That is the observable symptom; the underlying rule is the [restriction list in the DDL chapter](https://www.postgresql.org/docs/current/ddl-generated-columns.html).\n\n## Stored vs virtual, at the level a seeder cares about\n\n| Property | `STORED` (PG12+) | `VIRTUAL` (PG18+) |\n| --- | --- | --- |\n| Value materialised on disk | Yes | No, computed on read |\n| Can be indexed | Yes | No; PG18.0 rejects with `indexes on virtual generated columns are not supported` |\n| `UNIQUE` or `PRIMARY KEY` on the column | Yes | No; same rejection path as index |\n| `FOREIGN KEY` constraint on the column | Yes | No; PG18.0 rejects with `foreign key constraints on virtual generated columns are not supported` |\n| `CHECK` constraint on the column | Yes | Yes; the executor evaluates the CHECK against the read-time value |\n| Expression can use a user-defined function or type | Yes | No; built-ins only, including transitively via operators and casts |\n| Written to `pg_attribute.attgenerated` | `'s'` | `'v'` |\n| Backfilled by an `ALTER TABLE ADD COLUMN` rewrite | Yes | No; there is nothing to store |\n| Consequence for `satus` sampling | Compute and check against downstream indexes and FKs the same as any other column | Compute the value client-side to reason about downstream CHECKs; the column itself cannot be indexed or referenced |\n\nThe user-defined-type and built-in-only restrictions are in the [PostgreSQL 18 DDL reference](https://www.postgresql.org/docs/18/ddl-generated-columns.html). The rejection messages for indexes, unique constraints, primary keys, and foreign keys on virtual generated columns are enforced by the Postgres source (`src/backend/commands/indexcmds.c` and `src/backend/commands/tablecmds.c`) in the initial PG18 release. That means a schema that wants \"join on the computed value\" needs either a `STORED` generated column, or an expression index and a shadow column that a `FOREIGN KEY` can point at; the two options are schema decisions, not seeder decisions. The point of naming them here is that a schema which was `GENERATED ALWAYS AS (…) STORED` under PG12–17 and re-declared without the keyword under PG18 will look different in the catalog and will fail differently at DDL time.\n\n## Why \"load-bearing now\"\n\nThree shifts pushed generated columns from a curiosity into infrastructure between PG12 and PG18:\n\n1. **Full-text search vectors moved out of triggers.** The pattern `tsv tsvector GENERATED ALWAYS AS (to_tsvector('simple', title || ' ' || body)) STORED` replaced the classic before-insert trigger that maintained a `tsvector` column by hand. The replacement is smaller, correct across `UPDATE`s without a second trigger, and indexable by GIN in the same statement.\n2. **Money and quantity totals moved out of the application.** `line_total_cents integer GENERATED ALWAYS AS (quantity * unit_price_cents) STORED`, with a `CHECK (line_total_cents >= 0)` alongside, encodes \"the total is the product\" as a schema invariant instead of a convention the ORM has to remember. See [Check constraints that lie](/blog/check-constraints-that-lie) for how those CHECKs interact with the generated value.\n3. **Normalized keys stopped needing a maintenance job.** `email_lower citext GENERATED ALWAYS AS (lower(email)) STORED` with a `UNIQUE (email_lower)` gives you a case-insensitive uniqueness constraint that never drifts. [The citext trap](/blog/the-citext-trap) is the longer treatment of why teams prefer this to `citext` on the raw column.\n\nEach of those idioms is documented in the PostgreSQL manual and in shipping application schemas. Our own [audit corpus](/blog/ecommerce-profile), which pins five open-source schemas to mature releases from before those idioms were widespread, currently records zero generated columns across 1,095 columns; that count will move as we add newer schemas to `corpus/sources.json`. The point of naming the number is honesty about scope: this post describes the mechanics the catalog encodes, not a survey of adoption rates.\n\n## Reading them out of the catalog\n\nThe one field that matters is `pg_attribute.attgenerated`. It is `''` (empty) for a regular column, `'s'` for a stored generated column, and `'v'` for a virtual generated column. The expression itself is not stored in `pg_attribute`; it lives in `pg_attrdef.adbin` and is resolved to text with `pg_get_expr(adbin, adrelid)`. The idiomatic query, and the one satus runs at planning time:\n\n```sql\nSELECT\n  a.attname,\n  format_type(a.atttypid, a.atttypmod) AS type,\n  a.attgenerated,                                      -- '' | 's' | 'v'\n  pg_get_expr(ad.adbin, ad.adrelid) AS generation_expr\nFROM pg_attribute a\nLEFT JOIN pg_attrdef ad\n  ON ad.adrelid = a.attrelid AND ad.adnum = a.attnum\nWHERE a.attrelid = $1::regclass\n  AND a.attnum > 0\n  AND NOT a.attisdropped\nORDER BY a.attnum;\n```\n\nTwo properties fall out of this that a tool needs to respect:\n\n- **`INSERT` never mentions the column.** [`INSERT`](https://www.postgresql.org/docs/current/sql-insert.html) rejects any non-`DEFAULT` value in the column list for a generated column. The seeder therefore either omits the column entirely from the `INSERT` (preferred, since it also survives future changes to the column list) or writes `DEFAULT`. `COPY` obeys the same rule.\n- **The expression may only reference the current row.** The [restriction list](https://www.postgresql.org/docs/current/ddl-generated-columns.html) is unambiguous: no subqueries, no other tables, no other generated columns, no system columns except `tableoid`, immutable functions only, and, for virtual columns, built-in functions and types only. That means the value can always be computed by the client from the values the client already generated for the underlying columns, without a round-trip. `satus` does exactly that so it can reason about any downstream constraint the generated value participates in.\n\n## The three places a naive seeder gets it wrong\n\nEven after you skip the column at `INSERT` time, three downstream cases stay live:\n\n1. **A `UNIQUE` on the generated column.** If `email_lower GENERATED ALWAYS AS (lower(email)) STORED` is `UNIQUE`, the seeder cannot pick two `email` values that collapse to the same lowercase form. The uniqueness constraint is on the computed value, not on `email`, so a corpus that samples `Alice@x.com` and `alice@X.com` will fail on the second insert with a duplicate-key error that mentions a column the seeder never wrote to. Detection is mechanical: any `UNIQUE` whose column list contains a generated column becomes a uniqueness constraint over the composition of the generation expression and the underlying column profile.\n2. **A `CHECK` that references the generated column.** `CHECK (line_total_cents >= 0)` on a table with `line_total_cents GENERATED ALWAYS AS (quantity * unit_price_cents) STORED` is really a constraint on `quantity * unit_price_cents`, not on a column the client picks. If the seeder samples `quantity < 0` because the underlying `CHECK` says so and separately samples `unit_price_cents < 0` because pricing looks free-form, the product can be positive and the constraint passes for reasons the schema author did not intend. Reading the generation expression back through the constraint expression is how you find the joint constraint that actually applies. This is the same class of problem covered in the fourth section of [Check constraints that lie](/blog/check-constraints-that-lie), applied to a computed column instead of a stored one.\n3. **A foreign key that points at (or from) a generated column.** For `STORED` generated columns, `FOREIGN KEY` is permitted, and the child column has to end up equal to a value the parent's generation expression can produce. That is a strictly harder sampling problem than an FK on a regular column, because the child's value space is defined by an expression, not by the set of `INSERT`s. `satus` handles it by generating the parent first (the normal FK order) and then sampling child values from the observed parent computed values, or, if the parent is empty, sampling underlying parent columns such that the computed value is drawn from the intended distribution. On PG18, `FOREIGN KEY` constraints on virtual generated columns are rejected at DDL time, so any schema that needs an FK on a computed value keeps it stored.\n\n## A worked example\n\nConsider a small `orders` table that uses one generated column of each shape you actually see in the wild:\n\n```sql\nCREATE TABLE orders (\n  id                bigserial PRIMARY KEY,\n  customer_id       bigint NOT NULL REFERENCES customers(id),\n  quantity          integer NOT NULL CHECK (quantity > 0),\n  unit_price_cents  integer NOT NULL CHECK (unit_price_cents >= 0),\n  line_total_cents  integer GENERATED ALWAYS AS\n                      (quantity * unit_price_cents) STORED,\n  email             text   NOT NULL,\n  email_lower       text   GENERATED ALWAYS AS (lower(email)) STORED,\n  UNIQUE (email_lower),\n  CHECK (line_total_cents >= 0)\n);\n```\n\n`satus plan --schema public` for this table prints, in the same format used elsewhere in the CLI:\n\n```text\ntable public.orders\n  columns:\n    id                 bigint         [pk, serial]\n    customer_id        bigint         [fk -> customers.id]\n    quantity           integer        [check: quantity > 0]\n    unit_price_cents   integer        [check: unit_price_cents >= 0]\n    line_total_cents   integer        [GENERATED STORED: quantity *\n                                       unit_price_cents]\n    email              text\n    email_lower        text           [GENERATED STORED: lower(email)]\n                                      [unique]\n\n  sampling plan:\n    line_total_cents   computed from quantity and unit_price_cents;\n                       downstream CHECK (line_total_cents >= 0) is\n                       satisfied by the underlying column constraints.\n    email_lower        computed from email; UNIQUE (email_lower)\n                       enforced by sampling email from a case-folded\n                       pool so no two rows collide after lower().\n\n  INSERT plan:\n    columns written: (customer_id, quantity, unit_price_cents, email)\n    line_total_cents and email_lower are omitted; Postgres will\n    compute them.\n```\n\nTwo things about this output are worth naming. The `INSERT` column list is a strict subset of `pg_attribute`, and that subset is a function of `attgenerated`, not of the profile. And the `UNIQUE (email_lower)` line is what stops the seeder from picking `Alice@x.com` and `alice@X.com` as two different rows; without it, the fixture would insert cleanly against a schema that had never seen the constraint and fail against the real one on the first duplicate.\n\n## Two anti-patterns we see recently\n\nThe support tickets that involve generated columns cluster into two shapes.\n\n**\"The column disappeared after we upgraded to PG18.\"** It didn't. What happened is that the team wrote `GENERATED ALWAYS AS (…)` without the `STORED` keyword, which was a parse error under PG12–17 (where `STORED` was mandatory) and now defaults to `VIRTUAL`. Column reads still work; a `FOREIGN KEY`, `UNIQUE`, or index on that column is rejected at DDL time under the messages quoted in the table above. The fix is to write the keyword out: `GENERATED ALWAYS AS (…) STORED` if you meant stored, `GENERATED ALWAYS AS (…) VIRTUAL` if you meant virtual. The [PG18 release notes](https://www.postgresql.org/docs/release/18.0/) describe the change under Utility Commands; the fix is a schema decision, not a tooling one.\n\n**\"Our seed data is wrong and we can't find where.\"** This one is almost always a stored generated column that participates in a constraint the seeder is ignoring. The symptom is that the row inserts but a downstream query is off by a factor: `SUM(line_total_cents)` matches production, `AVG(quantity * unit_price_cents)` does not, because the underlying `quantity` distribution the seeder chose has a different shape than production even though it satisfies every constraint it can see. The fix is not the seeder; the fix is a [distribution](/blog/picking-distributions-not-values) for the underlying column that reproduces the computed distribution the reports depend on. Generated columns make the \"sample the shape, not the value\" argument concrete: if the schema computes the total from the parts, the parts are the thing you have to profile.\n\n## The shorter version\n\nGenerated columns in Postgres are computed by the database from the row you write, not by the client. The observable rule is that `INSERT` cannot supply a value; the deeper rule is that the value participates in every downstream `UNIQUE`, `CHECK`, index, and (for stored columns) foreign key exactly as if the client had computed and written it. A seeder that reads `pg_attribute.attgenerated` and reasons about the composed constraints produces rows the database accepts on the first try. A seeder that treats the column as ordinary produces the error that reads, out of context, like a Postgres bug: a duplicate-key on a column nobody wrote, a check-constraint failure on a column nobody chose. Neither is a bug. The catalog told you the answer; the seeder had to read it.\n\nIf you have not looked at `attgenerated` in your own schema recently, [`satus plan`](/quickstart) will surface every generated column, its expression, and every downstream constraint whose value space now depends on that expression. The [/profiles](/profiles) page lists which built-in profiles already know about the common shapes (`tsvector` search columns, computed totals, case-folded uniqueness).\n\n## References\n\n- PostgreSQL documentation, [Generated Columns (current)](https://www.postgresql.org/docs/current/ddl-generated-columns.html).\n- PostgreSQL documentation, [Generated Columns in 12](https://www.postgresql.org/docs/12/ddl-generated-columns.html) and [in 18](https://www.postgresql.org/docs/18/ddl-generated-columns.html).\n- PostgreSQL documentation, [`INSERT`](https://www.postgresql.org/docs/current/sql-insert.html).\n- PostgreSQL documentation, [`pg_attribute`](https://www.postgresql.org/docs/current/catalog-pg-attribute.html) and [`pg_attrdef`](https://www.postgresql.org/docs/current/catalog-pg-attrdef.html).\n- PostgreSQL release notes, [18.0](https://www.postgresql.org/docs/release/18.0/).\n";
const __vite_glob_0_23 = '---\nslug: v0-3-3-release-notes\ntitle: "v0.3.3: the GitHub Action, and opt-in failure fingerprints"\ndescription: satus 0.3.3 ships passkeybridge/satus/packages/action@main, a composite Action wrapping the CLI for PR-preview databases, plus opt-in schema-shape fingerprints for the v0.4.0 agent eval set.\ndate: 2026-07-15\nauthor: satus.sh\ntags: [release, ci, github, telemetry]\ndraft: false\n---\n\n> **Editor\'s note (2026-08-05):** This post references `passkeybridge/satus-action@v1` on the GitHub Marketplace. The Action was never published as a standalone Marketplace repo; it lives in the main repo and is referenced as `passkeybridge/satus/packages/action@main`. YAML snippets below have been updated to the working reference.\n`@passkeybridge/satus@0.3.3` is on npm, and `passkeybridge/satus/packages/action@main` is on the GitHub Marketplace. Two changes, both scoped: a composite Action that lets you drop `satus generate` into a PR-preview workflow with about ten lines of YAML, and an opt-in telemetry field that records an anonymised fingerprint of the schemas the CLI failed on. Neither changes what the CLI does when you run it locally. If v0.3.2 works for you today, v0.3.3 works the same way.\n\nThis post supersedes the [v0.3.3 roadmap post](/blog/v0-3-3-github-action) from 2026-07-03. The design is unchanged; a few dates and numbers are updated for reality.\n\n## The Action\n\nThe full reference lives at [`/docs/github-action`](/docs/github-action). The example workflow is the one we\'ve been circulating for the last two weeks:\n\n```yaml\nname: Seed preview database\non:\n  pull_request:\n    types: [opened, synchronize, reopened]\n\njobs:\n  seed:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: passkeybridge/satus/packages/action@main\n        with:\n          database-url: ${{ secrets.PREVIEW_DATABASE_URL }}\n          rows: 250\n          profile: saas\n          max-cost: \'0.50\'\n        env:\n          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}\n```\n\nThree choices in that block are load-bearing and deliberate. They read the same way in the roadmap post, and they read the same way in the docs, because none of them are things you want to discover after a compromised release tag or a silently-empty preview database.\n\n1. **`database-url` is an input, not an env var.** GitHub redacts inputs in logs the same way it redacts env vars. Making it an input means it appears in the Marketplace UI as a required field, so a caller cannot leave it empty by accident. That is the entire justification; there is no clever plumbing underneath.\n2. **`max-cost` is a string.** YAML parses `0.5` as a float, and the CLI\'s zod validator expects a string for `--max-cost` so it can normalise the format itself. The Action forwards it verbatim. Quote it in your workflow.\n3. **The provider key stays in `env:`, not `with:`.** The Action never touches your OpenAI or Anthropic key; the CLI reads it directly from the environment, [as it has since v0.3.0](/blog/v0-3-0-anthropic-and-machine-readable-output). That keeps the key off the Action\'s public input schema and out of anything a compromised Action version could exfiltrate through inputs.\n\nThe Action is a [composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action), not a Docker container. Three shell steps: install Node 20, run `npx --yes @passkeybridge/satus@0.3.3 generate --json`, upload the JSON manifest as a workflow artifact. That is the whole implementation. If a run works on your laptop it works here, with the same flags and the same exit codes.\n\n## Telemetry hooks: what we collect and what we don\'t\n\nThe other change in v0.3.3 is a new opt-in field in the CLI\'s run telemetry: an anonymised fingerprint of the target schema\'s *shape*, plus the name of the first validator rule that failed on a dry-run. The point is to build an evaluation fixture set for the [v0.4.0 agent](/blog/agent-mode-postponed): a corpus of real failure modes we can regression-test prompt changes against, without ever needing to know which schema was which.\n\n**What we collect, when the knob is on:**\n\n- `schema_fingerprint`: a 64-character lowercase hex SHA-256 of the normalised schema. Normalisation sorts tables and columns, drops actual identifiers, and preserves the set of column types and foreign-key edges. Two structurally identical schemas produce the same hash regardless of naming, ordering, or casing. See [`packages/cli/src/generate/fingerprint.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/fingerprint.ts).\n- `validator_class`: the name of the first `error`-severity finding on a dry-run failure (e.g. `fk_missing_parent`, `unique_duplicate`). Bounded to 64 characters at the ingest.\n- `invocation_sequence`: the subcommand and flag *names* from the CLI invocation, never flag values. Example: `["generate", "--dry-run", "--rows"]`. Bounded to 16 entries.\n\n**What we never collect, whether the knob is on or off:**\n\n- Row contents. Ever. The CLI has no code path that reads generated rows into the telemetry payload.\n- DDL text, table names, column names, enum labels, check-constraint expressions, or default expressions.\n- Your database URL, provider key, or any environment variable.\n\n**How to opt in:**\n\nRun `satus init` and answer `y` at the new prompt, or add the following block to `satus.config.json` by hand:\n\n```json\n{\n  "telemetry": {\n    "share_failure_fingerprints": true\n  }\n}\n```\n\nThe default is `false`. Existing configs keep working; the new field is optional at every layer (config, CLI, ingest zod).\n\n## Not in this release\n\nRepeating the list from the [roadmap post](/blog/v0-3-3-github-action) because the boundary is worth being public about.\n\n- **No hosted-key mode.** BYO OpenAI or Anthropic key, in CI and on your laptop. A managed-key tier is v0.5.0 in the [renumbered roadmap](/blog/agent-mode-postponed).\n- **No auto-commit of generated data.** Seed data belongs in the ephemeral preview database, not in git history.\n- **No cache of previously-generated rows.** Every invocation regenerates. The correctness problem for a cache key (schema hash + profile hash + provider version) is not worth solving for a first release.\n- **No matrix examples over multiple providers.** The docs show one OpenAI and one Anthropic example. The CLI has always let you set `--provider` per invocation; that predates the Action.\n- **No GitLab CI, no CircleCI, no Buildkite variant.** The CLI runs anywhere Node runs. This Action is a convenience layer for the single largest CI host, not a portability layer.\n\nThe rest of the [agent-mode roadmap](/blog/agent-mode-postponed) still stands, with the numbers shifted by one minor version. What was v0.5 (`satus agent`) is now v0.4.0 and still targeted at late September 2026 after the 90-day telemetry-evidence window. What was v0.6 (hosted keys) is now v0.5.0. The renumber is the only substantive change to the previously-published plan.\n\n## What\'s next\n\n`satus agent` is the next release ([v0.4.0](/blog/agent-mode-postponed)). The evidence window for it starts now: the fingerprint field lands in the CLI today, and the eval-set summary statistics will be published in a follow-up post once we have three-figure sample counts across at least ten distinct schema shapes. If you run satus in a workflow where dry-runs occasionally fail on an unfamiliar schema, the opt-in knob above is where that evidence comes from.\n\n## References\n\n- [GitHub Action reference](/docs/github-action) — canonical inputs, outputs, and security notes\n- [v0.3.3 roadmap](/blog/v0-3-3-github-action) — original design record (superseded by this post)\n- [Agent mode, postponed to v0.5](/blog/agent-mode-postponed) — the v0.4.0 plan the fingerprint field is built for\n- [v0.3.0 release notes](/blog/v0-3-0-anthropic-and-machine-readable-output) — provider auto-detect and env-var conventions the Action inherits\n- [Introducing the log](/blog/introducing-the-log) — corpus audit fixtures used in the Action self-test\n- [`@passkeybridge/satus` on npm](https://www.npmjs.com/package/@passkeybridge/satus)\n- [GitHub Actions: composite action docs](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)\n- [GitHub Actions: security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)\n- [satus on GitHub](https://github.com/passkeybridge/satus)\n';
const __vite_glob_0_24 = "---\nslug: v0-3-5-release-notes\ntitle: \"v0.3.5: automated npm publishing, two correctness fixes\"\ndescription: satus 0.3.5 adds tag-triggered npm publishing with provenance, restores deferrable-FK detection in introspection, and fixes the Action selftest to validate the in-repo CLI.\ndate: 2026-07-16\nauthor: satus.sh\ntags: [release, ci, github, npm]\ndraft: false\n---\n\n`@passkeybridge/satus@0.3.5` is on npm. Three changes: a new publish pipeline, one correctness fix in the introspection reader, and one CI fix in the Action selftest. No CLI flags, config, or telemetry-schema changes. If v0.3.4 worked for you, v0.3.5 works the same way from the outside.\n\nThe release itself is the first one cut by the new tag-triggered workflow.\n\n## Automated publishing\n\nPushing a `v*.*.*` tag on `main` now triggers a GitHub Actions workflow that builds and publishes the CLI to npm. The workflow lives at [`.github/workflows/cli-publish.yml`](https://github.com/passkeybridge/satus/blob/main/.github/workflows/cli-publish.yml) and does four things worth naming:\n\n1. **Verifies the tag matches `packages/cli/package.json`.** If the tag and the package version disagree, the guard step fails before anything reaches npm.\n2. **Runs `npm ci` and `npm run build`** in `packages/cli/`. The package's `prepublishOnly` also runs `tsc --noEmit`, so a type error blocks publish regardless of what the tag says.\n3. **Publishes with `--provenance`.** The workflow requests `id-token: write` and passes `--provenance` to `npm publish`, which attaches a signed [npm provenance statement](https://docs.npmjs.com/generating-provenance-statements) linking the tarball to the exact Actions run and source commit. Consumers can verify the chain with `npm audit signatures`.\n4. **Uses a scoped `NPM_PUBLISH_TOKEN` secret** with publish rights limited to `@passkeybridge/satus`. `workflow_dispatch` with `dry_run: true` exercises the pipeline without cutting a release.\n\nNothing about installing or running the CLI changes. `npm i -g @passkeybridge/satus` still works the same way; the tarball on npm is now produced by a reproducible pipeline on tag push.\n\n## Fix: deferrable FK detection in the introspection reader\n\nThe single-CTE catalog introspection query (introduced in [v0.2.0](/blog/v0-2-0-deferred-constraints-faster-planning-smaller-binary)) aliases its foreign-key deferrability columns as `is_deferrable` and `is_initially_deferred`, matching `information_schema` naming. The TypeScript reader was reading `deferrable` and `initially_deferred` off each row, so both fields resolved to `undefined` and every FK was recorded as non-deferrable regardless of its actual schema.\n\nPractical impact: the cyclic-FK path shipped in v0.2.0, which depends on knowing which constraints are `DEFERRABLE INITIALLY DEFERRED`, could quietly fall back to non-deferred handling on schemas that actually had the right constraints in place. The fix aligns the reader with the query's own aliases. No config or CLI change is required; re-running `satus generate` picks up the corrected metadata.\n\n## Fix: Action selftest validates the in-repo CLI\n\n[`.github/workflows/action-selftest.yml`](https://github.com/passkeybridge/satus/blob/main/.github/workflows/action-selftest.yml) loads the [pagila](https://github.com/devrimgunduz/pagila) schema and runs the composite Action end-to-end on every push under `packages/action/`. The Action itself invokes the CLI with `npx --yes @passkeybridge/satus@<pinned>`, which pulled whatever was on npm rather than the code in the tree. On a version bump, the selftest could pass against the previously published CLI while the in-repo code was broken.\n\nv0.3.5 changes this so the selftest is meaningful:\n\n- The workflow now runs `npm ci && npm run build && npm pack && npm install -g` inside `packages/cli/` before invoking the action, so a `satus` binary built from the current tree is on `PATH`.\n- The composite Action prefers a `satus` binary already on `PATH` and falls back to the pinned `npx` install for normal consumers. Real users see no behavior change; the selftest now validates the code that's actually about to ship.\n\nThe default `satus-version` in [`packages/action/action.yml`](https://github.com/passkeybridge/satus/blob/main/packages/action/action.yml) is bumped from `0.3.4` to `0.3.5` in the same release.\n\n## Backward compatibility\n\nNo CLI flags added, removed, or renamed. No telemetry-schema changes. No changes to `satus.config.json` semantics. Configs that worked with v0.3.x continue to work unchanged.\n\n## References\n\n- [`@passkeybridge/satus` on npm](https://www.npmjs.com/package/@passkeybridge/satus)\n- [`cli-publish.yml` workflow source](https://github.com/passkeybridge/satus/blob/main/.github/workflows/cli-publish.yml)\n- [`action-selftest.yml` workflow source](https://github.com/passkeybridge/satus/blob/main/.github/workflows/action-selftest.yml)\n- [npm provenance statements](https://docs.npmjs.com/generating-provenance-statements)\n- [v0.3.3 release notes](/blog/v0-3-3-release-notes) — the GitHub Action and opt-in failure fingerprints\n- [v0.2.0 release notes](/blog/v0-2-0-deferred-constraints-faster-planning-smaller-binary) — original single-CTE introspection and deferrable-constraint handling\n- [satus on GitHub](https://github.com/passkeybridge/satus)\n";
const __vite_glob_0_25 = "---\nslug: what-pg-dump-doesnt-tell-you\ntitle: \"What pg_dump doesn't tell you about your own schema\"\ndescription: pg_dump is a backup tool, not a schema description. Three things it omits or reorders, and why a seeder should read pg_catalog directly instead.\ndate: 2026-07-17\nauthor: satus.sh\ntags: [postgres, introspection, pg_dump]\ndraft: false\n---\n\n`pg_dump` is the canonical way to serialise a Postgres database to a file, and for restoring a database that is precisely what it should do. It is not, and does not claim to be, a faithful description of your schema as the server sees it. Early in [satus](/) we treated the output of `pg_dump --schema-only` as ground truth for what a seeder needed to know about a table. We were wrong three times in a row, in three different ways, and each of the three is documented behaviour rather than a bug. This post names them, points at the [`pg_dump` reference](https://www.postgresql.org/docs/current/app-pgdump.html) for each, and describes what we read out of [`pg_catalog`](https://www.postgresql.org/docs/current/catalogs.html) instead.\n\n## The short version\n\n`pg_dump` produces a file that, when replayed, reconstructs the objects in one database. To do that reliably across major versions and across cyclic dependencies, it normalises what it emits. It omits planner statistics by default, it emits `CREATE EXTENSION` in place of the tables, types, and functions that the extension actually installed, and it hoists constraints and indexes into a post-data section so the DDL order in the file is not the DDL order you wrote. A schema-understanding tool has to look past the file at the catalogs, because the file is the restore plan, not the schema.\n\n## What pg_dump is for, and what it isn't for\n\n`pg_dump` reads a live server and writes a script (or a custom-format archive) that will recreate the same database elsewhere. The reference is explicit about scope: it dumps \"a single database\", it \"does not dump roles or other database objects including tablespaces that are only present at the cluster level\", and the emitted script is meant to be reloaded by `psql` or `pg_restore`. Everything the tool does is optimised for that. When we borrowed it as an introspection source, we were asking a restore tool to describe a schema, and it answered honestly, in the vocabulary of a restore.\n\nThe tool we actually want is the catalog. `pg_class`, `pg_attribute`, `pg_attrdef`, `pg_constraint`, `pg_index`, `pg_depend`, `pg_statistic`: every fact `pg_dump` had to normalise is available there, unnormalised, in the form the planner and the executor themselves use. The three sections below walk through the specific facts we lost by reading the dump instead of the catalog, in the order we lost them.\n\n## 1. Planner statistics are omitted by default\n\nThe first surprise is the loudest. A seeder that wants to reproduce the shape of a production dataset needs to know, for each column, roughly what the distribution looks like: the most common values, the number of distinct values, the null fraction, a histogram. Postgres already computes all of that, stores it in `pg_statistic`, and exposes it through the `pg_stats` view. `ANALYZE` maintains it and the autovacuum daemon keeps it fresh; see [Updating Planner Statistics](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-STATISTICS) in the manual.\n\n`pg_dump` does not include any of it by default. The `--statistics` and `--no-statistics` flags exist, and the default is `--no-statistics`. The reference is unambiguous:\n\n> Do not dump statistics. This is the default.\n\nFor a dump-and-restore workflow the default is correct, because `ANALYZE` on the restored database will produce fresher and more accurate statistics than the ones frozen into the dump would have been. For a workflow that wants to look at the shape of the data without pulling the data, the default is a wall.\n\nEven with `--statistics` set, the reference names three categories the flag does not cover: user-defined `CREATE STATISTICS` objects that are extended-statistics rather than per-column, statistics added by extensions, and everything in the [cumulative statistics system](https://www.postgresql.org/docs/current/monitoring-stats.html) (`pg_stat_user_tables`, `pg_stat_all_indexes`, and the family). The `pg_dump` reference calls this out explicitly and recommends running `ANALYZE` after restore.\n\nWhat we do instead. `satus` reads `pg_stats` directly for every non-system table it is planning against, keyed on `schemaname` and `tablename`. The columns we care about are `null_frac`, `n_distinct`, `most_common_vals`, `most_common_freqs`, and `histogram_bounds`; a nullable text column with `n_distinct = -0.6` and a histogram_bounds array that skews toward short strings is a very different sampling problem from one with `n_distinct = 40` and a most-common list that covers most of the mass. We wrote about the sampling side of this decision in [Picking distributions, not values](/blog/picking-distributions-not-values); the point here is that the input to any of it is a catalog read, not a dump parse. If we had shipped v0.1 on top of `pg_dump` we would have shipped v0.1 blind.\n\n## 2. Extension member objects are hidden behind CREATE EXTENSION\n\nThe second surprise is quieter and took us longer to notice. When a database uses [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html) to install a package like `citext`, `pg_trgm`, `postgis`, or `pgcrypto`, Postgres records every object the extension creates in `pg_depend` with a `deptype` of `'e'` (extension member). The extension owns those objects; a `DROP EXTENSION` removes them all together, and `pg_dump` respects that ownership.\n\nThe consequence is that `pg_dump` emits one line, `CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;`, in place of the several tables, types, operators, casts, and functions that `citext` actually installed. The extension's own SQL script, installed under `share/extension/`, is the source of truth for those objects; the dump does not repeat it. This is correct behaviour for a restore, because replaying `CREATE EXTENSION` on the target server will reproduce exactly the same objects at whatever version of the extension the target has installed. It is very wrong behaviour for an introspector, because a schema that uses `citext` for its case-insensitive columns, or `postgis` for its geometry columns, or `pg_trgm` for its trigram indexes, looks in the dump as if those columns and indexes are of types that the server has never heard of.\n\nThe related trap is version drift. A schema that was designed against `postgis` 3.3 can be replayed on a server that has `postgis` 3.5 installed, and the geometry types will resolve, but the exact set of operators and functions available will differ. `pg_dump` does not pin the extension version by default; the header records the extension name and the schema it lives in, and that is all. The [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html) documentation covers the `VERSION` clause and its restore-time behaviour.\n\nWhat we do instead. During introspection `satus` queries `pg_extension` for the installed extensions and their versions, then joins `pg_depend` on `refclassid = 'pg_extension'::regclass` to enumerate every object that belongs to each one. Types like `citext` and `geometry` are recognised by their `pg_type.typname` in the extension member set, not by textual matching in a `CREATE TABLE`. The [`citext` field guide](/blog/the-citext-trap) is the longer version of why this matters for a seeder specifically; the general point is that any schema that uses extensions has meaningful surface area that a `pg_dump` script cannot describe on its own.\n\n## 3. Constraints and indexes are hoisted to a post-data section\n\nThe third surprise is a reordering, not an omission. `pg_dump` (and `pg_restore`) organise the output into three sections named `pre-data`, `data`, and `post-data`. The reference describes the split under the [`--section`](https://www.postgresql.org/docs/current/app-pgdump.html) flag: `pre-data` holds the object definitions \"other than indexes, triggers, rules, and constraints other than validated check constraints\", `data` holds the table contents, and `post-data` holds everything the split moved out of `pre-data`. This is what lets `pg_restore` load the data with indexes and triggers absent, then build the indexes and enable the triggers afterwards, which is much faster than loading into a fully-constrained schema.\n\nFor introspection this reordering means the `CREATE TABLE` you read in the dump is not the full definition of the table. Non-validated `CHECK` constraints, unique constraints backed by indexes, foreign keys, primary keys defined via an index, exclusion constraints, triggers, and rules are all in the post-data section, well below the `CREATE TABLE` they belong to, in `ALTER TABLE ... ADD CONSTRAINT` form. A regex over `CREATE TABLE` blocks will miss most of the relational structure of the schema. Foreign keys in particular are always hoisted, because they cannot be added until the referenced table exists, and cycles among referencing tables force the constraint to be added after all the tables are in place. We wrote about the cycle case specifically in [Cyclic FKs in the wild](/blog/cyclic-fks-in-the-wild); the reordering in the dump is a direct consequence.\n\nA worked example makes the split obvious. This schema, written the way an engineer would type it:\n\n```sql\nCREATE TABLE customers (\n  id    bigserial PRIMARY KEY,\n  email text NOT NULL,\n  CONSTRAINT customers_email_lower_unique UNIQUE (lower(email))\n);\n\nCREATE TABLE orders (\n  id          bigserial PRIMARY KEY,\n  customer_id bigint NOT NULL REFERENCES customers(id),\n  total_cents integer NOT NULL CHECK (total_cents >= 0)\n);\n\nCREATE INDEX orders_customer_id_idx ON orders (customer_id);\n```\n\ncomes back out of `pg_dump --schema-only` in roughly this shape (irrelevant boilerplate removed):\n\n```text\n-- pre-data\nCREATE TABLE public.customers (\n    id bigint NOT NULL,\n    email text NOT NULL\n);\nCREATE TABLE public.orders (\n    id bigint NOT NULL,\n    customer_id bigint NOT NULL,\n    total_cents integer NOT NULL,\n    CONSTRAINT orders_total_cents_check CHECK (total_cents >= 0)\n);\n-- (sequences, defaults, etc.)\n\n-- post-data\nALTER TABLE ONLY public.customers\n    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);\nALTER TABLE ONLY public.customers\n    ADD CONSTRAINT customers_email_lower_unique UNIQUE (lower(email));\nALTER TABLE ONLY public.orders\n    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);\nCREATE INDEX orders_customer_id_idx ON public.orders USING btree (customer_id);\nALTER TABLE ONLY public.orders\n    ADD CONSTRAINT orders_customer_id_fkey\n    FOREIGN KEY (customer_id) REFERENCES public.customers(id);\n```\n\nNeither `CREATE TABLE` block, on its own, tells you that `customers.id` is a primary key, that `customers.email` participates in a case-insensitive uniqueness constraint, that `orders.customer_id` has an index, or that it points at `customers.id`. All of that arrives later, in `ALTER TABLE` form, in the post-data section. The validated `CHECK` on `total_cents` is the only structural fact the pre-data section keeps inline, and that only because Postgres and `pg_dump` treat validated `CHECK` constraints specially.\n\nWhat we do instead. `satus` builds the dependency graph from `pg_constraint` joined against `pg_attribute` and `pg_class`, and reads indexes from `pg_index`. The queries are boring and the results are exact: primary keys have `contype = 'p'`, unique constraints have `contype = 'u'`, foreign keys have `contype = 'f'` plus `confrelid` and `confkey` for the target, `CHECK` constraints have `contype = 'c'` and the expression is recovered with `pg_get_constraintdef(oid)`. The topological order our DAG produces is derived from `confrelid` edges, not from the position of `ALTER TABLE ADD CONSTRAINT` statements in a file.\n\n## What we read out of pg_catalog instead\n\nFor anyone starting from scratch, the smallest set of catalogs that gives you back what `pg_dump` normalised away is short:\n\n| What you want                            | Where it actually lives                                                              |\n| ---------------------------------------- | ------------------------------------------------------------------------------------ |\n| Tables and their storage flags           | `pg_class` (`relkind`, `relpersistence`, `relispartition`)                           |\n| Columns, types, nullability, defaults    | `pg_attribute` joined to `pg_type`; defaults in `pg_attrdef` via `pg_get_expr`       |\n| Primary keys, unique, FK, CHECK, exclusion | `pg_constraint` filtered by `contype`; text via `pg_get_constraintdef`             |\n| Indexes and their expressions            | `pg_index` joined to `pg_class`; `pg_get_indexdef` for the text                      |\n| Partitions and partition keys            | `pg_inherits`, `pg_partitioned_table`                                                |\n| Extension-owned objects                  | `pg_extension` joined to `pg_depend` on `deptype = 'e'`                              |\n| Planner statistics                       | `pg_stats` (view over `pg_statistic`); `pg_stats_ext` for `CREATE STATISTICS`        |\n| Object dependencies (for DAG order)      | `pg_depend`, `pg_constraint.confrelid`                                               |\n| Row-level security                       | `pg_policy`; `pg_class.relrowsecurity` and `relforcerowsecurity`                     |\n\nThese are all documented in the [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html) chapter, they are versioned with the server rather than with any client tool, and they answer the questions a seeder needs to ask about a table in one round trip per table. The [`pg_stats`](https://www.postgresql.org/docs/current/view-pg-stats.html) view is worth calling out specifically, because it is the one that closes the loop on the first section: it is how a tool that never touches production data can still reason about the shape of production data.\n\n## Where this leaves pg_dump\n\nWe use `pg_dump` daily, for exactly what it was written for: capturing a database so it can be restored. Backups against production, seed captures for a staging environment that already has representative data, migrations across major Postgres versions, cluster moves. The three limitations above are the price of the guarantees the tool provides. It is a restore plan first, and a restore plan is not the same object as a schema description.\n\nIf you have been treating a `pg_dump --schema-only` file as the schema for tooling you are writing, [`satus plan`](/quickstart) reads the same catalogs described in the table above and prints the composed view the dump can't. If the tooling you are writing is more general than a seeder, the sections here are the ones we would spend our own time re-reading; the catalog is small, well-named, and stable across releases in a way very little else in this ecosystem is.\n\n## References\n\n- PostgreSQL documentation, [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html).\n- PostgreSQL documentation, [`CREATE EXTENSION`](https://www.postgresql.org/docs/current/sql-createextension.html).\n- PostgreSQL documentation, [Updating Planner Statistics](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-STATISTICS).\n- PostgreSQL documentation, [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html), including [`pg_class`](https://www.postgresql.org/docs/current/catalog-pg-class.html), [`pg_attribute`](https://www.postgresql.org/docs/current/catalog-pg-attribute.html), [`pg_constraint`](https://www.postgresql.org/docs/current/catalog-pg-constraint.html), [`pg_index`](https://www.postgresql.org/docs/current/catalog-pg-index.html), [`pg_depend`](https://www.postgresql.org/docs/current/catalog-pg-depend.html), and [`pg_extension`](https://www.postgresql.org/docs/current/catalog-pg-extension.html).\n- PostgreSQL documentation, [`pg_stats`](https://www.postgresql.org/docs/current/view-pg-stats.html) and [Cumulative Statistics System](https://www.postgresql.org/docs/current/monitoring-stats.html).\n";
const __vite_glob_0_26 = '---\nslug: when-uuids-arent-the-answer\ntitle: "When UUIDs aren\'t the answer"\ndescription: UUIDv7 made the primary-key debate interesting again. What v7 fixes, what it doesn\'t, and when bigserial or a composite key is still the honest choice for a Postgres schema.\ndate: 2026-07-20\nauthor: satus.sh\ntags: [postgres, primary-keys]\ndraft: false\n---\n\nThe default answer to "what should the primary key be?" has drifted, in the last two years, from `bigserial` to `uuid`, and then, since [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) shipped in May 2024 and PostgreSQL 18 added a built-in [`uuidv7()`](https://www.postgresql.org/docs/18/functions-uuid.html) function, from `uuid` to `uuid v7`. The migration is often justified in a single sentence: "v7 is time-ordered, so it fixes the index locality problem." That is true, and it is also not the whole picture. This post walks through what a UUID actually costs a Postgres schema, what v7 does and does not fix, and the two situations where `bigserial` or a composite key remains the honest choice.\n\n## The short version\n\nUUIDv4 is 16 bytes of random data, which doubles the on-disk size of every primary key and every foreign key relative to a `bigint`, and scatters btree inserts across the leaf pages of every index the key participates in. UUIDv7 keeps the 16 bytes but restores insert locality by placing a Unix-millisecond timestamp in the high-order bits, so it eliminates most of the write-amplification argument against random UUIDs. It does not eliminate the storage argument, it does not eliminate the human-legibility argument, and it does not make composite keys obsolete. Choose the key that reflects what the row actually is, then use `bigint` when the row is naturally sequential and internal, `uuidv7` when it needs to be globally unique or externally shareable, and a composite when the row\'s identity is a pair.\n\n## What a UUID costs, in bytes and pages\n\nA `bigint` is 8 bytes. A `uuid` is 16 bytes. In isolation the extra 8 bytes are unremarkable, but a primary key is never in isolation. Every foreign key that references it stores the full value, every btree index on the key or on any composite that includes it stores the value in every leaf and every internal page, and every row version that Postgres keeps around because of MVCC stores it again. On a schema of any size the primary-key type is a multiplier on total index size, not an additive cost.\n\nThe [PostgreSQL data-types reference](https://www.postgresql.org/docs/current/datatype-uuid.html) gives the storage for `uuid` as 16 bytes and the [numeric-types page](https://www.postgresql.org/docs/current/datatype-numeric.html) gives `bigint` as 8. A btree page is 8 kB. Doubling the key width roughly halves the fan-out of internal pages and adds a proportional amount to every leaf entry\'s key portion, so an index with a UUID key is measurably larger and slightly deeper than the equivalent `bigint` index. That is the storage tax, and it applies to v4 and v7 equally.\n\n## The insert-locality problem, and what v7 fixes\n\nThe second cost of a UUID primary key, historically the more expensive one, is a runtime tax rather than a storage one. A btree stores keys in sorted order. When new rows arrive with keys drawn uniformly at random, as v4 UUIDs are, each insert lands on a different leaf page. On a busy table that means the working set of "recently written leaf pages" is not a hot handful at the right edge of the index (as it is for `bigserial`), but effectively the whole index. Shared buffers churn, WAL traffic rises, and vacuum has more work per row.\n\nUUIDv7 changes exactly this. [RFC 9562 §5.7](https://www.rfc-editor.org/rfc/rfc9562#section-5.7) defines the layout: 48 bits of Unix millisecond timestamp in the high-order position, then 4 bits of version, 12 bits of pseudorandom data, 2 bits of variant, and 62 more bits of random. Sort order tracks generation time, so a v7-keyed btree behaves like a `bigserial` btree from the buffer-pool\'s point of view: new inserts concentrate on the right edge, old pages stay quiet.\n\nThat is the entire fix. It is a real fix, and it is worth taking. It does not change the storage numbers, it does not make the key smaller, and it does not make the key more meaningful to a human reading a log line.\n\n## Where bigserial still wins\n\nThere are two situations where a schema is honestly better served by `bigserial` (or `bigint generated always as identity`, which is the modern equivalent, see [`CREATE TABLE`](https://www.postgresql.org/docs/current/sql-createtable.html)):\n\nThe row is internal and never leaves the database. Enum-like lookup tables, join tables that no client ever references directly, materialised aggregates. Nothing outside Postgres needs to name these rows, so the "globally unique across systems" property of a UUID pays for nothing. The 8-byte key and the smaller indexes are a straight win.\n\nOrdering matters and is part of the contract. `serial` and `bigserial` are strictly monotonic within a session, and near-monotonic across a cluster. Applications that want to page through rows in insertion order, or that use the primary key as a tie-breaker in a "latest N" query, get that behaviour for free. UUIDv7 is approximately time-ordered, not strictly, because two v7 values generated in the same millisecond by the same or different processes can sort in either order. The RFC is explicit that clients that need a total order must add their own sub-millisecond tiebreaker; see [§6.2 "Monotonicity and Counters"](https://www.rfc-editor.org/rfc/rfc9562#section-6.2).\n\nIf either of those applies, "we use v7 for everything" is a policy that costs storage and complexity for no gain on that table.\n\n## Where a composite key is still the honest answer\n\nThe other case a "UUID everywhere" policy hides is the row whose identity is genuinely a pair. Junction tables between two entities (a `team_members(team_id, user_id)` row is the pair, not a synthetic id), append-only period tables keyed on `(entity_id, valid_from)`, multi-tenant tables where every row is scoped by `tenant_id` and the natural key is `(tenant_id, external_id)`. Adding a surrogate `id uuid` column to these tables does not remove the composite, it just moves it: the `UNIQUE (team_id, user_id)` constraint has to exist anyway, so the surrogate is a second index that carries no information the first index does not already carry.\n\nThe Postgres manual has been consistent on this for a long time. The [`CREATE TABLE` reference](https://www.postgresql.org/docs/current/sql-createtable.html) allows table-level `PRIMARY KEY (a, b)` because that is often the right shape. A composite primary key on a junction table is one row of DDL and it makes the intent of the table legible to any future reader.\n\n## Quick decision table\n\n| Row shape                                                | Recommended key                                    |\n| -------------------------------------------------------- | -------------------------------------------------- |\n| Internal lookup, join, or aggregate (never leaves the DB) | `bigint generated always as identity`              |\n| User-facing, externally shared, or federated across systems | `uuid` with `uuidv7()` default                     |\n| Insertion order is part of the contract                  | `bigint` identity, or `(uuidv7, bigint tiebreak)`  |\n| Junction of two entities                                 | Composite `PRIMARY KEY (a_id, b_id)`               |\n| Bitemporal / append-only history                         | Composite `PRIMARY KEY (entity_id, valid_from)`    |\n\n## What this means for seeding\n\nA seeder has to pick primary-key values that respect whatever the schema chose. If the column is `bigint identity`, the right thing is to let the sequence assign; if the column is `uuid default uuidv7()`, the right thing is to let the default fire; if the column is `uuid` with no default, the seeder has to generate values in the same format the application would. Substituting a v4 into a table the application populates with v7 is a subtle wrong answer: the seed rows will sort to the left of every subsequently inserted row, which can cause a "latest N" query in a dev environment to return the seeded rows first for the wrong reason.\n\nsatus reads the column default (through [`pg_attrdef`](https://www.postgresql.org/docs/current/catalog-pg-attrdef.html), see the earlier post on [what pg_dump doesn\'t tell you](/blog/what-pg-dump-doesnt-tell-you)) and honours it: if the column defaults to `uuidv7()`, the seeder emits `DEFAULT` and lets the server fill the value in, so the ordering property of the production key is preserved in the seed set. When there is no default and the column type is `uuid`, satus generates v7 values by default rather than v4, on the same reasoning. The three [built-in profiles](/profiles) all follow this rule.\n\n## Summary\n\nUUIDv7 removes the argument that was doing most of the work against random UUIDs: insert locality is back. It does not remove the storage cost, it does not remove the readability cost, and it does not make `bigint` obsolete for internal rows or composite keys obsolete for pair-shaped rows. Choose the key that describes the row. Then, if you have chosen a UUID, choose v7.\n\n## References\n\n- IETF, [RFC 9562: Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562), including [§5.7 UUID Version 7](https://www.rfc-editor.org/rfc/rfc9562#section-5.7) and [§6.2 Monotonicity and Counters](https://www.rfc-editor.org/rfc/rfc9562#section-6.2).\n- PostgreSQL 18 documentation, [UUID Functions](https://www.postgresql.org/docs/18/functions-uuid.html) (`uuidv4()`, `uuidv7()`).\n- PostgreSQL documentation, [UUID Type](https://www.postgresql.org/docs/current/datatype-uuid.html) and [Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html).\n- PostgreSQL documentation, [`CREATE TABLE`](https://www.postgresql.org/docs/current/sql-createtable.html) (identity columns, composite primary keys).\n- PostgreSQL documentation, [`pg_attrdef`](https://www.postgresql.org/docs/current/catalog-pg-attrdef.html) catalog.\n';
const __vite_glob_0_27 = "---\nslug: seeding-stripe-shaped-data-without-stripe\ntitle: \"Seeding Stripe-shaped data without Stripe\"\ndescription: How to fill a billing schema with realistic Customer, Subscription, Invoice, and Charge rows locally, so dashboards render without touching test-mode Stripe.\ndate: 2026-07-23\nauthor: satus.sh\ntags: [billing, stripe, patterns]\ndraft: false\n---\n\nA user asked, last week, how to seed a billing schema that mirrors Stripe's object model without actually calling Stripe. Their app stores a local copy of the Stripe [Customer](https://docs.stripe.com/api/customers/object), [Subscription](https://docs.stripe.com/api/subscriptions/object), [Invoice](https://docs.stripe.com/api/invoices/object), and [Charge](https://docs.stripe.com/api/charges/object) objects, the way most billing-adjacent applications end up doing after a few months in production, and the dashboards they were trying to demo needed those tables populated with something that looked like real revenue. They did not want to spin up ten thousand test-mode customers in the Stripe dashboard to get there. Neither would we.\n\nThis post walks through the shape of the problem, the properties a \"Stripe-shaped\" fixture has to preserve if the app is going to render honestly on top of it, and the specific columns satus fills in for a table that stores a mirror of a Stripe object.\n\n## What \"Stripe-shaped\" actually means\n\nThe Stripe object model is small and stable. A `Customer` (`cus_…`) owns zero or more `Subscription` (`sub_…`) rows, each of which has one or more `Price` (`price_…`) items on it and produces an `Invoice` (`in_…`) at every billing period, which is paid by a `PaymentIntent` (`pi_…`) that resolves to a `Charge` (`ch_…`). The identifiers all use a documented prefix and the same base32-ish suffix shape, which is what code that indexes by `stripe_id` is usually matching on.\n\nAn application that mirrors these into Postgres typically has a `customers` table with a `stripe_customer_id` column, a `subscriptions` table with `stripe_subscription_id`, `status`, `current_period_end`, and `cancel_at_period_end`, and an `invoices` table with `stripe_invoice_id`, `amount_paid`, `currency`, and `status`. That is the surface we have to populate. The Stripe API reference is the source of truth for every field; the [Subscription object](https://docs.stripe.com/api/subscriptions/object) and the [Invoice line item](https://docs.stripe.com/api/invoice-line-item/object) references list what each column can hold.\n\n## The four properties a fixture has to preserve\n\nA random-looking pile of rows will pass a `SELECT COUNT(*)` and fail every dashboard that reads the data. The four properties worth preserving, in decreasing order of how often we see them broken, are:\n\nReferential closure. Every `subscriptions.customer_id` has to point to a real `customers.id`, every `invoices.subscription_id` to a real `subscriptions.id`, and every `charges.invoice_id` to a real `invoices.id`. This is table-stakes for any FK-aware seeder and is the reason satus insists on topologically sorting the graph before generating a single row; the earlier post on [cyclic foreign keys](/blog/cyclic-fks-in-the-wild) covers the mechanics.\n\nStatus legality. The Stripe [subscription lifecycle](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses) defines exactly eight states: `trialing`, `active`, `past_due`, `canceled`, `unpaid`, `incomplete`, `incomplete_expired`, and `paused`. A distribution over those states that puts, say, half the rows in `incomplete` is legal but wrong; production subscription tables are dominated by `active`, with a long tail of `canceled` and a thin band of `past_due`. Any dashboard that filters by status will look broken until the mix is right.\n\nMonetary consistency. `invoice.amount_paid` is denominated in the smallest currency unit; for USD that is cents, for JPY it is yen, and the full list of [zero-decimal currencies](https://docs.stripe.com/currencies#zero-decimal) is worth reading before you generate anything. If your seeder writes `19.99` into `amount_paid` because it thinks in dollars, every MRR chart is off by two orders of magnitude. If it writes `1999` for JPY, it is off by the same amount in the other direction.\n\nTemporal shape. `current_period_end` on an `active` subscription has to be in the future; on a `canceled` subscription it can be in the past. `invoice.created` for the current period has to precede `subscription.current_period_end`, not follow it. A row where `cancel_at_period_end = true` but `current_period_end` has already passed is a subscription the app should treat as `canceled`, and any dashboard that groups by \"canceling this month\" will double-count it.\n\n## The distributions worth encoding\n\nThe Stripe reference does not tell you how many `canceled` rows to write, because that is a business question rather than an API question. From talking to a handful of subscription-app builders, the useful rough shape for a mature-ish B2B SaaS book of business is roughly:\n\n```text\nactive               ~ 70–85 %\ntrialing             ~  3–10 %\npast_due             ~  1–3  %\ncanceled             ~ 10–20 %\npaused               ~  0–2  %\nincomplete + expired ~  1–3  % (mostly noise)\nunpaid               ~  0–1  %\n```\n\nThe numbers are directional, and a satus seed should never present them as measured. What matters is the ordering: `active` dominates, `canceled` is the second-largest bucket because it is cumulative, `trialing` is small because trials are short, and everything else is thin. A seeder that produces this shape will make a \"subscriptions by status\" bar chart look like a real product's chart at a glance; a seeder that samples the eight states uniformly will not.\n\nInvoice amounts follow the price rows, not a distribution. If the schema has a `prices` table, the honest thing is to draw amounts from it and multiply by whatever quantity the seeded subscription has; if there is no `prices` table, pick a small handful of plausible plan prices (say, `$9`, `$29`, `$99`, `$299` per month) and stick with them for the whole seed, because a real book of business has a small number of prices with a lot of customers on each, not a smooth curve of unique amounts.\n\nFailed payments follow [Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries): a `past_due` subscription has typically had one or two failed charges, not fifteen, because the retry schedule gives up. A seeder that generates twenty failed charges against a single subscription is describing a Stripe account that would already be closed.\n\n## What satus fills in for a mirrored Stripe table\n\nWhen satus sees a table whose columns match one of Stripe's canonical shapes (customer, subscription, invoice, charge), the CLI takes the following stance:\n\nIdentifier columns named `stripe_*_id` or ending in `_id` with a `text` type and a check constraint like `starts_with(value, 'cus_')` are treated as Stripe IDs. satus emits values with the correct prefix and a random alphanumeric suffix, mirroring the shape of Stripe's documented IDs (Stripe does not fix a suffix length, so the seeder picks one that matches the width already present in the target column). It does not attempt to make them resolvable against the Stripe API, because that is not the point of a local seed.\n\nMonetary columns (`integer` or `bigint` named `amount*`, `total*`, `subtotal*`, or `unit_amount*`) are treated as minor-unit amounts if a sibling `currency` column exists, and satus picks values that respect the [zero-decimal currency list](https://docs.stripe.com/currencies#zero-decimal). For USD-denominated `amount_paid` on `invoice`, values come from the plan-price set described above, not from a uniform range.\n\nEnum-like status columns are drawn from the documented Stripe state set, in the rough proportions above. For subscriptions, the [status enum](https://docs.stripe.com/api/subscriptions/object#subscription_object-status) is authoritative; for invoices, satus draws from `draft`, `open`, `paid`, `uncollectible`, `void` in a mix that reflects the parent subscription's state (a `canceled` subscription's last invoice is typically `void` or `paid`, not `open`).\n\nTimestamp columns are anchored to the row's parent. A subscription's `current_period_end` is drawn from `created + billing_interval + jitter`; an invoice's `created` is drawn from `subscription.current_period_start`; a charge's `created` follows its invoice by a small positive offset. This is the same principle behind the earlier post on [timezone bugs](/blog/timezone-bugs-found-by-seed-data): plausible timestamps surface bugs that uniform ones hide.\n\nBoolean flags like `cancel_at_period_end` are correlated with `status`. A row with `status = 'canceled'` and `cancel_at_period_end = false` and `canceled_at IS NULL` is a schema error; satus refuses to emit it.\n\n## Why not just use Stripe's test mode\n\nStripe's [test mode](https://docs.stripe.com/testing) is excellent for verifying an integration end-to-end. It is a poor fit for filling a dashboard because every object you create has to round-trip through Stripe's API, which is rate-limited, and because ten thousand test customers are ten thousand rows in the shared test-mode dashboard that everyone on the team will scroll past forever. Seed data is a database concern; test mode is an integration concern. Both are useful, and they answer different questions.\n\nThe exact rule we recommend to satus users: use test mode when you are verifying that your [webhook handlers](https://docs.stripe.com/api/webhook_endpoints) parse a real Stripe event, and use satus when you are populating tables that a dashboard reads.\n\n## Summary\n\nA \"Stripe-shaped\" fixture is not a copy of Stripe's storage. It is a set of rows in your own tables that respect the four properties above: referential closure, status legality, monetary units, and temporal ordering. Get those right and every chart, every filter, and every \"recent invoices\" list on top of the mirror will render honestly. satus encodes the properties, leaves the plan prices and the tenant mix to you, and does not talk to Stripe.\n\n## References\n\n- Stripe API reference: [Customers](https://docs.stripe.com/api/customers/object), [Subscriptions](https://docs.stripe.com/api/subscriptions/object), [Invoices](https://docs.stripe.com/api/invoices/object), [Invoice line items](https://docs.stripe.com/api/invoice-line-item/object), [Charges](https://docs.stripe.com/api/charges/object), [Prices](https://docs.stripe.com/api/prices/object), [Products](https://docs.stripe.com/api/products/object), [Webhook endpoints](https://docs.stripe.com/api/webhook_endpoints).\n- Stripe Billing: [Subscription lifecycle and statuses](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses), [Prorations](https://docs.stripe.com/billing/subscriptions/prorations), [Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries).\n- Stripe: [Currencies and zero-decimal currencies](https://docs.stripe.com/currencies#zero-decimal), [Testing](https://docs.stripe.com/testing).\n";
const __vite_glob_0_28 = '---\nslug: what-a-bad-profile-looks-like\ntitle: "What a bad profile looks like"\ndescription: Three profile drafts we threw away before shipping saas, ecommerce, and b2b. Too many knobs, distributions that did not compose, vertical leaks.\ndate: 2026-07-24\nauthor: satus.sh\ntags: [profile, methodology, anti-pattern]\ndraft: false\n---\n\nThe [three profiles](/profiles) satus ships today, `saas`, `ecommerce`, and `b2b`, are the survivors of a longer list. Before them we drafted profiles for medical booking, marketplace logistics, and a "generic" catch-all, and threw all three away. This post is a retrospective on why. If you are designing your own profile abstraction, for seed data or for any generator that has to sound like a domain, these are the shapes to avoid.\n\nReference material: the current profiles live as short prose blocks in `packages/cli/src/generate/profiles.ts` and are documented at [/profiles](/profiles). Two earlier posts, [When Faker is the wrong answer](/blog/when-faker-is-the-wrong-answer) and [Designing the medical booking profile](/blog/medical-booking-profile), cover the case for prose-shaped profiles and the design-phase sketch we did not ship. This post is the counterpart: what the discarded drafts got wrong.\n\n## Anti-pattern 1: too many knobs\n\nThe first draft of the medical-booking profile had a configuration object. It let the user pass a locale, a specialty mix, an appointment-density curve, a no-show rate, and a payer mix. The intent was flexibility. The effect was that no one could pick a set of values that composed into a coherent clinic.\n\nThe problem is that these knobs are not independent. A US-based dermatology practice has a different payer mix from a UK NHS clinic, which has a different appointment-density curve from a mental-health telehealth startup. Exposing them as orthogonal parameters implied a product surface that would silently generate incoherent data whenever the user\'s picks disagreed with each other. And the failure mode was invisible: the generated rows still satisfied every foreign key and check constraint the user\'s schema declared. They just described a clinic that could not exist.\n\nThe fix, and the shape of every profile we shipped, is that a profile is a single opinionated prose block. It picks one internally consistent world and describes it. If the user wants a different world, that is a different profile, not a different flag on the same profile. `saas`, `ecommerce`, and `b2b` are three worlds, not one profile with three modes.\n\n## Anti-pattern 2: distributions that do not compose\n\nThe second draft, an early marketplace-logistics profile, sampled fields independently. Order status was drawn from a categorical distribution (`pending`, `in_transit`, `delivered`, `cancelled`). `created_at` was drawn from a uniform distribution over the last 12 months. `delivered_at` was drawn from a uniform distribution over the last 6 months. Each column, in isolation, looked plausible.\n\nThe composite rows did not. Around a quarter of the `delivered` rows had `delivered_at` timestamps earlier than their `created_at`. Around a fifth of the `cancelled` rows had a non-null `delivered_at`. `in_transit` rows aged three hundred days sat next to `pending` rows created two hours ago. Nothing was type-invalid. Nothing violated a foreign key. The rows were still nonsense, because status, creation time, and delivery time are not independent columns; they are a joint state machine, and drawing from their marginals throws the joint away.\n\nThe lesson is that a profile\'s distributions have to be phrased at the row level, not the column level. The [saas subscriptions profile](/blog/saas-subscriptions-profile) writeup goes into detail on how status legality is enforced for billing rows; the same principle applies to any timeline-shaped table. When you sketch a profile, describe the row, not the columns.\n\n## Anti-pattern 3: vertical assumptions in shared utilities\n\nThe third failure was structural, not statistical. The "generic" profile we sketched relied on shared helpers for names, addresses, prices, and dates. Those helpers, written for the first ecommerce sketch, quietly assumed English names, US addresses, and USD prices with two-decimal cents. When we tried to pull them into the medical-booking draft and then again into the marketplace draft, every profile started to sound like a slightly reskinned US ecommerce store.\n\nThe vertical assumptions had not been declared as assumptions; they were hard-coded into utilities that presented themselves as neutral. A profile can only be as domain-specific as its lowest-level helpers allow it to be, and a helper that only knows how to produce `$19.99` will drag every profile that touches it toward the same tone.\n\nThe fix was to move the value-choice logic into the profile prose itself, and let the LLM handle locale, currency, and naming conventions per profile. The [ecommerce profile](/blog/ecommerce-profile) post shows the current shape: the profile block explicitly enumerates the countries, price ranges, and cent-suffix conventions it wants, so nothing has to be assumed by a shared utility further down the stack. There are still shared helpers, but they are strictly structural (topological sort, FK closure, batch inserts) and know nothing about domains.\n\n## What survived\n\nThe three shipped profiles are the ones that passed all three tests:\n\n- Each is a single opinionated prose block, not a config object with modes.\n- Each describes distributions at the row level, so composite rows stay coherent even under random sampling within each profile\'s stated ranges.\n- Each carries its own vocabulary of names, prices, and dates in the prose, so shared code stays strictly structural.\n\nIf you are adding a fourth, the same three checks apply. If a candidate profile wants a config object, splits its distributions across columns, or leans on a shared helper to pick a name or a price, it is going to compose badly with the schema the user hands it. Cut it back to a single prose block that describes one internally consistent world, or split it into two profiles that each describe one.\n\n## References\n\n- [/profiles](/profiles)—the three shipped profiles, verbatim from `packages/cli/src/generate/profiles.ts`.\n- [When Faker is the wrong answer](/blog/when-faker-is-the-wrong-answer)—why prose-shaped profiles beat column-by-column value generators.\n- [Designing the medical booking profile](/blog/medical-booking-profile)—the design-phase sketch referenced above; not shipped in the current CLI.\n- [Designing the ecommerce profile](/blog/ecommerce-profile)—the shipped `ecommerce` profile design writeup.\n- [Designing the SaaS subscriptions profile](/blog/saas-subscriptions-profile)—row-level status legality for billing tables.\n';
const __vite_glob_0_29 = '---\nslug: postgres-extensions-that-trip-up-seeders\ntitle: "Postgres extensions that trip up seeders"\ndescription: PostGIS wants valid geometries. pgvector wants meaningful embeddings. pgcrypto wants real ciphertext. None of the three accept random bytes.\ndate: 2026-07-27\nauthor: satus.sh\ntags: [postgres, extensions]\ndraft: false\n---\n\nMost Postgres columns will accept a syntactically-valid value and stop asking questions. A `text` column accepts any string. An `integer` column accepts any int in range. A `jsonb` column accepts any parseable JSON. This is why generic seeders, and generic type-driven fuzzers, look like they work on most schemas.\n\nThen the schema loads a Postgres extension, and the shape of "valid" gets narrower. This post is about three extensions that show up regularly in the schemas we introspect—[PostGIS](https://postgis.net/), [pgvector](https://github.com/pgvector/pgvector), and [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)—and what breaks when a seeder treats their columns like ordinary `bytea` or `text`.\n\n## PostGIS: valid geometries, not just bytes\n\nPostGIS adds `geometry` and `geography` types that store spatial data in EWKB (extended well-known binary). The column definition can also carry a typmod that pins the geometry type and [SRID](https://postgis.net/docs/using_postgis_dbmanagement.html#spatial_ref_sys), for example `geometry(Point, 4326)`. A row that satisfies the column type still has to satisfy geometric validity: rings closed, no self-intersections for polygons, coordinates inside the declared SRID\'s usable range.\n\nThree failure modes we see when a seeder drops random bytes into a PostGIS column:\n\n- **Bytea passed as geometry** rejected at parse time. The column expects EWKB, not arbitrary bytes; the insert fails before any spatial check runs.\n- **Wrong typmod.** The column is `geometry(Point, 4326)` and the seeder inserts a `LINESTRING`, or a `Point` in SRID 3857. Postgres raises "Geometry type does not match column type" or "Geometry SRID does not match column SRID."\n- **Invalid geometry that parses.** A self-intersecting polygon or a ring that doesn\'t close will load, but downstream code that calls [`ST_IsValid`](https://postgis.net/docs/ST_IsValid.html) or any operator that assumes validity (area, contains, intersection) starts returning nonsense or throwing.\n\nThe right shape for a PostGIS seed row is: emit EWKT (well-known text with SRID prefix, e.g. `SRID=4326;POINT(-73.98 40.75)`) via [`ST_GeomFromEWKT`](https://postgis.net/docs/ST_GeomFromEWKT.html), match the column\'s declared geometry subtype and SRID exactly, and, for polygons, generate through a helper that closes rings and rejects self-intersections. satus reads the typmod during introspection and constrains generation accordingly; the extension is not treated as opaque bytes.\n\n## pgvector: fixed dimension, and "valid" depends on what the column is for\n\npgvector adds a `vector(n)` type where `n` is a required, fixed dimension declared at column definition time. The [pgvector README](https://github.com/pgvector/pgvector#vector-type) is explicit that dimension is part of the type, and inserting a vector of a different length is a hard error. This is the first thing a naive seeder gets wrong: it emits `vector[384]` into a `vector(1536)` column and the insert rejects every row.\n\nThe second, subtler failure is that "valid" for a pgvector column depends on what the application does with it. Two cases we see:\n\n- **Random vectors, ANN index present.** A random `vector(1536)` satisfies the type and inserts fine. Building an [HNSW or IVFFlat index](https://github.com/pgvector/pgvector#indexing) on top of random vectors also succeeds. Nearest-neighbor queries then return technically-correct but semantically-meaningless results, because random points in a 1536-dimensional space have effectively uniform pairwise distances. Recall metrics computed against this seed data are noise. If the seed is only there to make the dashboard render row counts, this is fine. If the seed is there to test the search feature, it is worse than empty.\n- **Random vectors, cosine-distance operator (`<=>`) in a query.** Cosine distance is undefined for zero vectors and pgvector [returns NaN](https://github.com/pgvector/pgvector#querying) for that case. A seeder that produces all-zero vectors, or normalizes without checking for the zero case, will cause queries to sort NaN rows in ways the application did not plan for.\n\nThe right shape depends on the test. For "does the schema load and do rows exist" seeds, satus emits random unit vectors matching the column\'s declared dimension, and skips the zero vector. For "does the search feature return sensible results" seeds, random vectors are not the right tool at all; embed a small corpus with the same model the application uses in production, and seed the resulting real embeddings.\n\n## pgcrypto: ciphertext has to be ciphertext\n\npgcrypto adds functions like [`pgp_sym_encrypt` and `pgp_sym_decrypt`](https://www.postgresql.org/docs/current/pgcrypto.html#PGCRYPTO-PGP-ENC-FUNCS) that store OpenPGP-framed ciphertext in `bytea` columns. The column type itself is just `bytea`, which is what fools generic seeders: random bytes satisfy the type, and inserts succeed silently. The failure lands in the application, on the first `pgp_sym_decrypt` call, with "Wrong key or corrupt data."\n\nThe same trap applies to schemas that store `digest(x, \'sha256\')` outputs or [`crypt`](https://www.postgresql.org/docs/current/pgcrypto.html#PGCRYPTO-PASSWORD-HASHING-FUNCS) hashes. A random 32-byte value in a "sha256 of email" column will not match anything the application looks up by hash, and lookups start returning zero rows for every user. The schema does not complain; the feature does.\n\nThe right shape for a pgcrypto column is to generate through the extension\'s own functions. If the column is `pgp_sym_encrypt(plaintext, key)`, the seeder needs the key (or a stand-in key it also stores in the test environment) and has to call `pgp_sym_encrypt` inside the insert—not produce ciphertext offline. For hash columns, generate the plaintext, then insert `digest(plaintext, \'sha256\')` (or `crypt(plaintext, gen_salt(\'bf\'))`) so hash lookups against known plaintexts actually resolve.\n\n## The common shape\n\nExtensions move the definition of "valid" out of the column type and into the extension\'s semantics. A type-driven seeder, one that inspects `information_schema.columns` and dispatches on `data_type`, cannot see this. It will produce rows that Postgres accepts and that the application cannot use. That gap—accepted by the database, rejected by the feature—is the class of failure these three extensions produce, and it is why satus treats a schema that uses an extension differently from a schema that does not.\n\nThe [profiles](/profiles) satus ships today (`saas`, `ecommerce`, `b2b`) don\'t hardcode PostGIS or pgvector or pgcrypto expectations, because the extension surface a user\'s schema pulls in is orthogonal to the profile choice. Extension handling lives in introspection instead: satus reads `pg_extension`, respects declared typmods, and routes columns owned by these extensions through generators that produce values the extension will actually accept.\n\nIf you are writing your own seeder and your users have started reporting "the data is there but the feature doesn\'t work," check whether one of these three extensions is involved. It usually is.\n\n## Reproduce it yourself\n\nThe three failure modes above are packaged as runnable SQL in [`examples/extension-pitfalls`](https://github.com/passkeybridge/satus/tree/main/examples/extension-pitfalls) in the satus repository. Each script creates a small schema, runs the seed a type-driven generator would produce (catching and printing the errors so the script continues), then runs the seed that respects the extension\'s semantics. `./run.sh` executes all three in throwaway Docker containers; a copy-paste GitHub Actions job is in the README.\n\n## References\n\n- [Runnable examples for this post](https://github.com/passkeybridge/satus/tree/main/examples/extension-pitfalls)—PostGIS, pgvector, and pgcrypto seed scripts with the failure cases included.\n- [PostGIS documentation](https://postgis.net/documentation/)—geometry types, SRID handling, validity predicates.\n- [PostGIS `ST_IsValid`](https://postgis.net/docs/ST_IsValid.html) and [`ST_GeomFromEWKT`](https://postgis.net/docs/ST_GeomFromEWKT.html)—validity check and text-to-geometry constructor.\n- [pgvector README](https://github.com/pgvector/pgvector)—`vector(n)` type, distance operators, ANN index types.\n- [Postgres pgcrypto docs](https://www.postgresql.org/docs/current/pgcrypto.html)—symmetric encryption and password-hashing functions.\n- [Designing the SaaS subscriptions profile](/blog/saas-subscriptions-profile)—a schema-first counterpart to this post: valid rows the extension does not touch still need row-level composition to be useful.\n- [When Faker is the wrong answer](/blog/when-faker-is-the-wrong-answer)—why column-type-driven generation misses domain semantics; extensions make the same point in stronger form.\n';
const __vite_glob_0_30 = '---\nslug: the-schema-i-couldnt-reproduce\ntitle: "The schema I couldn\'t reproduce"\ndescription: Schema reproduction is the hardest maintenance task we have. A field note on the two bugs that took longest to reproduce, and the four artifacts we now use to shorten the loop.\ndate: 2026-07-31\nauthor: satus.sh\ntags: [support, tooling, postgres]\ndraft: false\n---\n\nThe hardest part of maintaining a schema-aware tool is not fixing bugs. It is reproducing them. A bug report on satus arrives as a stack trace plus a sentence, and the thing that actually caused it is a `CREATE TABLE` we have never seen, on a Postgres version we are not running, in a schema the reporter usually cannot share. Every hour spent on such a ticket before the first local reproduction is an hour of guessing. This is a field note on the two reproductions that cost us the most, and on the four artifacts we now reach for first.\n\nWe do not have a `satus repro` command, and this post is not announcing one. What we have is a workflow assembled from pieces that already exist in the repo, and being explicit about that workflow is more useful than shipping a subcommand that only wraps it.\n\n## Why schema bugs resist reproduction\n\nA crash in a general-purpose CLI usually depends on the arguments. A crash in satus depends on the catalog. The input is not a string the reporter can paste; it is the transitive closure of every table, type, constraint, partition, and extension in their target schema, on their server version, with their identifier quoting conventions.\n\nThree properties make that hard to transport:\n\n| Property | Why it blocks reproduction |\n| --- | --- |\n| The schema is often confidential | Table and column names leak product roadmap; the reporter cannot attach the DDL |\n| `pg_dump` is lossy for our purposes | Planner statistics, extension-owned objects, and constraint placement do not survive round-tripping the way you expect ([earlier post](/blog/what-pg-dump-doesnt-tell-you)) |\n| The trigger is a feature *combination* | Any one of partitioning, quoted mixed-case identifiers, deferrable FKs, or a third-party extension is easy. The interaction of two is not |\n\nThe third property is the expensive one. Our test corpus covers each feature in isolation, so a report that lands on a pair we never combined reads, at first, as an impossible failure.\n\n## Reproduction one: a partitioned table with per-partition foreign keys\n\nThe longest reproduction we have had was not a customer schema at all. It was [pagila](https://github.com/devrimgunduz/pagila), which sits in our [audit corpus](https://github.com/passkeybridge/satus/blob/main/corpus/sources.json) and started failing our self-test after we widened the free-tier table cap.\n\nTwo facts had to be true simultaneously for the failure to appear. Pagila\'s `payment` table is declared as a partitioned parent, and its foreign keys are declared on the partition children rather than on the parent. In `pg_catalog`, the parent carries `relkind = \'p\'` and each child carries `relispartition = true`, and the same logical constraint appears once per child under a distinct `conname`. Our introspection walked `pg_constraint` without accounting for either, so a single logical FK edge arrived at the planner as N duplicated edges pointing at tables the planner had also enumerated as insert targets. Postgres routes an `INSERT` on the parent to the correct partition, so inserting into the children directly is both unnecessary and wrong.\n\nWhat made the reproduction slow was that neither fact is visible in a stack trace, and neither is unusual on its own. The fix, once we could see it, is small and lives in `packages/cli/src/generate/introspect.ts`: exclude partition children from the table list, re-attribute any FK declared on a child back to the topmost ancestor via [`pg_partition_root()`](https://www.postgresql.org/docs/current/functions-info.html), and aggregate the duplicated constraint rows with `bool_or` so the deferrability flags survive the collapse.\n\nThe free-tier table cap interacts with the same code path, and the interaction is worth stating precisely: the cap slices the *topologically ordered* table list, not the catalog order, so the retained prefix always contains a table\'s parents before the table itself. Deferred back-edges are then filtered down to the retained set, so the runner never tries to patch a table it never wrote. Cap a schema on any other ordering and you can seed a child whose parents were trimmed, which produces an unsatisfiable plan that looks, from the outside, exactly like an introspection bug.\n\n## Reproduction two: quoted mixed-case identifiers\n\nThe 0.3.5 fix was a single column alias in the catalog introspection query. Schemas containing quoted identifiers with mixed case failed; schemas without them worked. Every schema in our corpus is lower-snake-case, which is idiomatic Postgres and also, in this instance, a blind spot: an entire class of real-world schema, the ones generated by ORMs that preserve camelCase, was structurally absent from everything we tested against.\n\nThe lesson we took from it is not "add a camelCase fixture", though we did. It is that a corpus assembled from open-source projects inherits those projects\' conventions, and the conventions are correlated. Five well-run OSS Postgres schemas agree with each other about quoting, naming, and constraint style far more than five randomly drawn production schemas would.\n\n## The four artifacts\n\nNone of these are new, and none of them are a subcommand. They are the things we actually open, in this order, when a report arrives.\n\n### 1. `--dry-run`, for a reporter who cannot share DDL\n\n`satus generate --dry-run` introspects the live catalog, substitutes a deterministic offline provider for the LLM, and runs the real validator. It needs no API key, sends no tokens, and writes no rows. That means we can ask a reporter to run it against their own confidential schema and send us the output, which is the cheapest way to get a signal off a database we will never see. The mechanics are covered in [A $0 dry-run](/blog/dry-run-validation).\n\n### 2. `--json`, for a machine-readable failure envelope\n\n`--json` puts exactly one JSON object on stdout and pushes human output to stderr. A pasted terminal screenshot loses the parts we need; a JSON object does not.\n\n### 3. Opt-in schema fingerprints, for clustering\n\nSince 0.3.3, `telemetry.share_failure_fingerprints` (default `false`, and `satus init` defaults the prompt to no) reports a SHA-256 of the *normalised shape* of a schema alongside the validator rule that fired first. The normalisation deliberately drops table names, column names, and default expressions, and preserves the sorted multiset of column types per table, the FK edge list by position, primary-key arity, and single-column unique arity. See `packages/cli/src/generate/fingerprint.ts`.\n\nThe point is not to identify a schema. It is that two reports carrying the same fingerprint and the same `validator_class` are the same bug, and reproducing one reproduces both. The point is also that the fingerprint alone will never let us reconstruct the schema, which is why the knob can honestly default to off.\n\n### 4. A runnable failure fixture, for anything extension-shaped\n\nWhen the trigger is an extension, prose is not enough. [`examples/extension-pitfalls/`](https://github.com/passkeybridge/satus/tree/main/examples/extension-pitfalls) contains three idempotent SQL scripts that provoke and then correct the PostGIS, pgvector, and pgcrypto failure modes described in [Postgres extensions that trip up seeders](/blog/postgres-extensions-that-trip-up-seeders), plus a Docker runner. Handing a reporter a script that fails identically on their machine and ours converts an argument about behaviour into a diff.\n\n## The minimal repro we ask for\n\nIf you are filing an issue, this is the shortest path to a fix. Everything here is redactable, and none of it requires sharing your real schema.\n\n```bash\n# 1. Version and server, verbatim.\nsatus --version\npsql "$DSN" -c \'select version()\'\n\n# 2. Machine-readable failure envelope.\nsatus generate --dsn "$DSN" --schema <your_schema> \\\n  --profile saas --rows 5 --dry-run --json > satus-failure.json\n\n# 3. Structural shape only. No data, no grants, no owners.\n#    Redact identifiers freely; keep types, constraints, and partitioning.\npg_dump --schema-only --no-owner --no-privileges \\\n  --schema=<your_schema> "$DSN" > schema.sql\n```\n\nStep 3 is the one people skip, and it is the one that decides whether a ticket takes an hour or a week. A schema-only dump with every identifier renamed to `t1`, `c1`, `c2` is still a perfect reproduction for us, because the bugs above were never about the names. They were about `relkind`, `relispartition`, `condeferrable`, and quoting. All of those survive redaction intact.\n\n## What we are not claiming\n\nWe have not eliminated the slow ticket. A feature combination we have never seen will land again, and the first hours will still be guesswork. What the four artifacts change is the *shape* of the guesswork: we now start from a validator class, a structural fingerprint, and a schema-only dump instead of a sentence and a stack trace. That is a real reduction, and it is a smaller claim than a subcommand named `repro` would have implied.\n\n## References\n\n- PostgreSQL documentation, [System Information Functions](https://www.postgresql.org/docs/current/functions-info.html), for `pg_partition_root()`.\n- PostgreSQL documentation, [`pg_constraint`](https://www.postgresql.org/docs/current/catalog-pg-constraint.html) and [`pg_class`](https://www.postgresql.org/docs/current/catalog-pg-class.html), for `relkind`, `relispartition`, and `condeferrable`.\n- PostgreSQL documentation, [Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html), on routing inserts through the parent.\n- PostgreSQL documentation, [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html), for `--schema-only`, `--no-owner`, `--no-privileges`.\n- [pagila](https://github.com/devrimgunduz/pagila)—the partitioned schema in our audit corpus.\n- [`examples/extension-pitfalls/`](https://github.com/passkeybridge/satus/tree/main/examples/extension-pitfalls)—runnable PostGIS, pgvector, and pgcrypto fixtures.\n- [What pg_dump doesn\'t tell you about your own schema](/blog/what-pg-dump-doesnt-tell-you).\n- [A $0 dry-run that catches FK and constraint bugs before the LLM call](/blog/dry-run-validation).\n- [Postgres extensions that trip up seeders](/blog/postgres-extensions-that-trip-up-seeders).\n\n—the satus.sh team\n';
const __vite_glob_0_31 = "---\nslug: triggers-i-have-loved-and-hated\ntitle: Triggers I have loved and hated\ndescription: Audit, denormalization, and validation triggers each break a Postgres seed run differently. What actually happens, measured on PostgreSQL 17.9.\ndate: 2026-08-05\nauthor: satus.sh\ntags: [postgres, triggers]\ndraft: false\n---\n\nEvery other constraint in Postgres is declarative. A `NOT NULL` tells you what it will reject. A `CHECK` tells you the predicate. A foreign key tells you the parent. A trigger tells you nothing: it is arbitrary code attached to a write, and the only way to know what it does is to read the function body.\n\nThat is a problem for a seeding tool. satus introspects `pg_catalog` for tables, columns, keys, and constraints, then asks a model for rows that fit. It does **not** introspect `pg_trigger`, and it does not attempt to predict what a trigger function will do. So the honest question is not \"how does satus handle triggers\" but \"what happens to a seed run when triggers are present, and what can you do about it\".\n\nEverything below was measured on PostgreSQL 17.9 with a three-table schema, not reasoned about from the docs.\n\n## The four categories\n\n### 1. BEFORE row triggers that rewrite the row\n\nThe one I have loved. A `BEFORE INSERT ... FOR EACH ROW` trigger that returns a modified `NEW` changes the row before it lands.\n\n```sql\ncreate function f_slug() returns trigger language plpgsql as $$\nbegin\n  NEW.slug := lower(replace(NEW.name, ' ', '-'));\n  return NEW;\nend $$;\ncreate trigger tg_slug before insert on projects\n  for each row execute function f_slug();\n```\n\nsatus's writer uses parameterized multi-row `INSERT ... RETURNING` and chains the returned primary keys into the next table's foreign keys. The question that matters is whether `RETURNING` reflects the trigger's edit or the value satus sent. It reflects the trigger:\n\n```text\ninsert into projects(org_id, name) values (1,'Apollo Two'),(2,'Zeus One')\n  returning id, slug;\n\n id |    slug\n----+------------\n  1 | apollo-two\n  2 | zeus-one\n```\n\nThis is the good case, and it holds for surrogate keys too. If a `BEFORE INSERT` trigger overwrites the primary key, satus's downstream foreign keys still point at real parents, because they are built from `RETURNING` output rather than from what the model produced.\n\n### 2. Audit triggers\n\nThe category that is harmless per run and annoying across runs. An `AFTER INSERT OR UPDATE` trigger writing to a log table produces one audit row per seeded row:\n\n```text\n2 projects inserted        -> audit_rows = 2\n1 broken-edge UPDATE       -> audit_rows = 3\ntruncate projects cascade  -> audit_rows = 3\n```\n\nTwo things to notice.\n\nThe `UPDATE` is satus's own. When a foreign-key cycle is broken, the child row lands with `NULL` in the back-edge column and is patched afterward with one `UPDATE` per row, which is exactly why the third audit row exists. If your audit trigger fires on `UPDATE`, a cyclic schema produces more audit rows than seeded rows. The cycle mechanics are in [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild).\n\nThe `TRUNCATE` fired nothing. Row-level triggers do not fire on `TRUNCATE`; only `FOR EACH STATEMENT ... ON TRUNCATE` triggers do. satus truncates the tables in the run set with `TRUNCATE ... RESTART IDENTITY`, so an audit table outside the run set is untouched. Re-run the seed ten times and you have ten generations of audit rows describing tables whose rows no longer exist.\n\nThe fix is boring and it works: put the audit table in `exclude` in `satus.config.json` so satus never seeds it directly, and truncate it yourself in the same script that calls satus if you want a clean slate.\n\n> **Update, 2026-08-10.** As published, this section said satus truncates with `TRUNCATE ... RESTART IDENTITY CASCADE` and explained that an audit table with no foreign key back to the audited table falls outside the cascade graph and therefore survives. That was accurate for v0.3.6 and earlier, and the advice above was correct — but it only held because the audit table in this example has no FK. Give it one (`audit_rows.project_id references projects(id)`, a perfectly ordinary design) and `CASCADE` would have emptied it, with nothing louder than a `NOTICE`. [v0.3.7](/blog/v0-3-7-release-notes) drops `CASCADE`: satus now refuses to truncate rather than reach outside the run set. The paragraph has been corrected to describe current behaviour.\n\n### 3. Denormalization triggers\n\nThe category I have hated, because it fails silently and it fails on a column that looks fine.\n\n```sql\ncreate function f() returns trigger language plpgsql as $$\nbegin\n  update orgs set project_count = project_count + 1 where id = NEW.org_id;\n  return null;\nend $$;\n```\n\nWhether this hurts depends entirely on whether the counter column has a default.\n\nIf `project_count` is declared `int not null default 0`, satus never generates a value for it. The schema builder skips every column with a default, on the grounds that the database will fill it. The trigger then owns the column outright and the count is correct.\n\nIf it is declared `int not null` with no default, satus must supply a value, the model supplies a plausible one, and the trigger adds to it:\n\n```text\norgs seeded with project_count = 7\n2 projects inserted, trigger increments twice\n\n id | stored | actual\n----+--------+--------\n  1 |      9 |      2\n```\n\nNine stored, two actual. Nothing errored. No constraint was violated. Every dashboard reading that counter is now wrong, and the only signal is that the number looks slightly off. Add the counter column to a `CHECK` if you can, or accept that denormalized counters need a reconciliation pass after seeding: `update orgs set project_count = (select count(*) from projects p where p.org_id = orgs.id)`.\n\nThis is the same failure shape as the one in [CHECK constraints that lie](/blog/check-constraints-that-lie): the database accepted the row, so the tool believes it succeeded.\n\n### 4. Validation triggers\n\nThe category that is loud, and therefore fine. A `BEFORE INSERT` trigger that raises aborts the statement, and because satus wraps the entire run in one `BEGIN`/`COMMIT`, it aborts everything:\n\n```text\nBEGIN\nERROR:  name must be capitalized: bad one\nCONTEXT:  PL/pgSQL function f_validate() line 2 at RAISE\nROLLBACK\n\n projects_after_failed_batch\n-----------------------------\n                           0\n```\n\nZero rows. Not a partial seed, not a half-populated parent table with orphaned children waiting on it. The transactional writer means a trigger rejection costs you the run and nothing else, which is the correct trade for a tool that people point at development databases.\n\nThe practical consequence is that a validation trigger encoding a business rule the model cannot infer (a naming convention, a tenant-prefix format, a checksum) will fail the run every time. satus builds its prompt from column names, types, and declared constraints; a rule that exists only inside a PL/pgSQL body is invisible to it. Move the rule into a `CHECK` constraint where you can, or `exclude` the table and seed it yourself.\n\n### The fifth category: triggers that leave the database\n\nExtensions such as [pg_net](https://github.com/supabase/pg_net) make it possible for a trigger to issue an HTTP request on write. Nothing in Postgres stops you from attaching that to a table a seeding tool is about to write two hundred rows into.\n\nsatus has no way to detect this. It sees a table and a set of columns. If a webhook fires two hundred times against a staging endpoint, that is a property of your schema, not of the seed. Before pointing any seeding tool at an unfamiliar database, this query is worth thirty seconds:\n\n```sql\nselect tgrelid::regclass as table, tgname, pg_get_triggerdef(oid)\nfrom pg_trigger\nwhere not tgisinternal\norder by 1;\n```\n\n`tgisinternal` filters out the system triggers Postgres creates to enforce foreign keys, which would otherwise dominate the output.\n\n## What the dry run does and does not tell you\n\n`satus generate --dry-run` validates generated rows against live catalog metadata without inserting anything: null checks, type and range checks, `varchar(n)` overflow, foreign-key targets, and single-column uniqueness within a batch. It cannot evaluate a trigger, because evaluating a trigger means executing it, and executing it means writing. That limit was stated when the dry run shipped in [A $0 dry-run that catches FK and constraint bugs before the LLM call](/blog/dry-run-validation) and it has not moved.\n\nSo the split is clean. Everything declarative is checkable offline. Everything procedural is only knowable at insert time, and the transaction is what protects you.\n\n## The short version\n\n| Trigger kind | Effect on a satus run | What to do |\n| --- | --- | --- |\n| `BEFORE` row, rewrites `NEW` | Safe. `RETURNING` reflects the edit, so FK chaining stays correct | Nothing |\n| Audit / history | Extra rows per insert, plus one per cycle back-patch `UPDATE`; survives `--truncate` | `exclude` the log table, truncate it yourself |\n| Denormalization counter | Silent drift when the counter column has no default | Give the column a default, or reconcile after seeding |\n| Validation, raises | Whole run rolls back, zero rows written | Encode the rule in a `CHECK`, or `exclude` the table |\n| HTTP / side-effecting | Fires per row, invisible to satus | Audit `pg_trigger` before seeding an unfamiliar database |\n\nTriggers are the part of a schema that a catalog read cannot summarize. satus will not pretend otherwise, and the two defenses it does offer, one transaction and an `exclude` list, are the ones that hold.\n\n## References\n\n- Measured on PostgreSQL 17.9, three-table schema, `pg_ctl`-managed local cluster. All output in this post is verbatim `psql` output.\n- PostgreSQL documentation: [Trigger behavior overview](https://www.postgresql.org/docs/current/trigger-definition.html), [`CREATE TRIGGER`](https://www.postgresql.org/docs/current/sql-createtrigger.html), [`pg_trigger`](https://www.postgresql.org/docs/current/catalog-pg-trigger.html), [`TRUNCATE`](https://www.postgresql.org/docs/current/sql-truncate.html).\n- Source: [`writer.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/writer.ts) for the transactional insert path, [`schema.ts`](https://github.com/passkeybridge/satus/blob/main/packages/cli/src/generate/schema.ts) for the defaulted-column skip rule.\n- Related: [Cyclic foreign keys in the wild](/blog/cyclic-fks-in-the-wild), [CHECK constraints that lie](/blog/check-constraints-that-lie), [Generated columns are load-bearing now](/blog/generated-columns-are-load-bearing-now), [What pg_dump doesn't tell you about your own schema](/blog/what-pg-dump-doesnt-tell-you).\n\n—the satus.sh team\n";
const __vite_glob_0_32 = '---\nslug: v0-3-6-release-notes\ntitle: "v0.3.6: one fix, for a footgun we stepped on ourselves"\ndescription: satus 0.3.6 normalizes ANTHROPIC_BASE_URL so both the SDK convention (no /v1) and the previous satus convention (with /v1) work. No other changes.\ndate: 2026-08-06\nauthor: satus.sh\ntags: [release, anthropic, cli]\ndraft: false\n---\n\n`@passkeybridge/satus@0.3.6` is on npm. One fix. No flag, config, or telemetry changes. If v0.3.5 worked for you, v0.3.6 works the same way — unless you had `ANTHROPIC_BASE_URL` exported, in which case v0.3.6 works and v0.3.5 may not have.\n\n## The bug\n\nThe Anthropic provider builds its endpoint as `${ANTHROPIC_BASE_URL}/messages` and defaulted the base to `https://api.anthropic.com/v1` — so a custom base was expected to *include* the `/v1` suffix. Anthropic\'s official SDKs expect the opposite: their `ANTHROPIC_BASE_URL` convention is the bare host, and the SDK appends the versioned path itself.\n\nThe failure mode is what makes this worth a patch release on its own. If you had `ANTHROPIC_BASE_URL=https://api.anthropic.com` exported — increasingly common, since agent tooling and proxies set it for their own use — satus called `https://api.anthropic.com/messages`, which returns a `404` with an empty body. The CLI surfaced that as:\n\n```\ncategories error: Anthropic 404:\n```\n\nNothing about that message says "your base URL is missing `/v1`". We know because we hit it ourselves: during an end-to-end audit run this week, the CLI failed with exactly that error inside a sandbox that exports `ANTHROPIC_BASE_URL` for unrelated tooling. It cost us a diagnosis round-trip with full access to the source. A user in the same spot has no chance.\n\n## The fix\n\nThe base URL is now normalized: trailing slashes are stripped, and `/v1` is appended unless the value already ends in a version segment. Both conventions work:\n\n```bash\n# Anthropic SDK convention — now works\nexport ANTHROPIC_BASE_URL=https://api.anthropic.com\n\n# Previous satus convention — still works\nexport ANTHROPIC_BASE_URL=https://api.anthropic.com/v1\n```\n\nVerified with live `claude-haiku-4-5` generation runs in both forms before tagging. `OPENAI_BASE_URL` is unchanged: OpenAI\'s own convention already includes `/v1`, and satus matched it correctly.\n\nOne housekeeping note for anyone building from source: `packages/cli/package-lock.json` is regenerated against the public npm registry. The old lockfile pinned a private mirror from the project\'s original build environment, which made `npm ci` fail everywhere else. The published tarball was never affected — it has been byte-identical to the repo build, which you can check yourself now that releases carry [npm provenance](https://docs.npmjs.com/generating-provenance-statements).\n';
const __vite_glob_0_33 = '---\nslug: v0-3-7-release-notes\ntitle: "v0.3.7: five bugs, four of them silent"\ndescription: satus 0.3.7 fixes identity columns, foreign keys to non-primary-key columns, a TRUNCATE that reached outside the run set, two cost numbers that disagreed, and telemetry that contradicted our own privacy promise.\ndate: 2026-08-10\nauthor: satus.sh\ntags: [release, cli, postgres, privacy]\ndraft: false\n---\n\n`@passkeybridge/satus@0.3.7` is on npm. Five fixes. Four of the five failed silently — the run printed `✓ inserted N rows` and the damage surfaced later, somewhere else, usually in your application rather than in ours.\n\nThat is the part worth dwelling on. A seeder that crashes is annoying. A seeder that reports success and leaves your sequences broken or your foreign keys unlinked is worse, because you find out days later and the first suspect is your own code.\n\n## Identity columns were handed to the model\n\nPostgres reports a `GENERATED ... AS IDENTITY` column oddly. Its `column_default` is `NULL` and its `is_generated` is `\'NEVER\'` — because `is_generated` refers to `GENERATED ALWAYS AS (expr) STORED`, which is a different feature. Identity lives in `is_identity`, a column we were not reading.\n\nSo satus saw a plain `NOT NULL integer` with no default and asked the model to invent one. Two outcomes, depending on which flavour you declared:\n\n```sql\ncreate table a (id int generated always as identity primary key);\n-- ERROR: cannot insert a non-DEFAULT value into column "id"\n-- DETAIL: Column "id" is an identity column defined as GENERATED ALWAYS.\n```\n\nThe whole run is one transaction, so this rolls back everything. A schema using `GENERATED ALWAYS AS IDENTITY` — the form Postgres\'s own docs recommend — could not be seeded by satus at all.\n\nThe `BY DEFAULT` flavour is the one that scared us:\n\n```sql\ncreate table b (id int generated by default as identity primary key);\ninsert into b (id) values (1);   -- accepted; sequence still at 1\ninsert into b (id) values (2);   -- accepted; sequence still at 1\ninsert into b default values;    -- id = 1 → duplicate key\n```\n\nPostgres takes the value you give it and does not advance the sequence. satus reported success. Your application\'s next insert collided with a seeded row, and the stack trace pointed at your code.\n\nIntrospection now reads `is_identity`, and identity columns are omitted from both the JSON schema the model fills and the `INSERT` column list, so the sequence allocates normally. Verified against PostgreSQL 16.13 in both flavours.\n\n## Foreign keys to non-primary-key columns became NULL\n\n`INSERT ... RETURNING` named only primary-key columns. That is fine when every foreign key points at a primary key, which is the textbook case and the case our fixtures covered.\n\nIt is not the only case. `orders.user_email -> users.email`, with a `UNIQUE` constraint on `users.email`, is ordinary. For that shape the pooled parent row had no `email` key at all. Reading it gave `undefined`; the writer\'s `serialize()` mapped `undefined` to `null`; and because the child column was nullable, Postgres accepted the row. Every subscription inserted with `user_email = NULL` and nothing anywhere raised.\n\nThe writer now returns every column that some foreign key in the run set references, not just primary keys. And if a reference still cannot be resolved, satus raises with the table, column, and what it did find, rather than falling through to `NULL`. A crash you can debug beats a `NULL` you never notice.\n\n## `--truncate` emptied tables outside the run set\n\n`--truncate` issued `TRUNCATE ... RESTART IDENTITY CASCADE`. `CASCADE` follows foreign keys wherever they go — including into tables you deliberately put in `exclude`.\n\n```text\nNOTICE:  truncate cascades to table "audit_log"\n```\n\nA `NOTICE`. That is the entire warning you got before your audit table was emptied.\n\n`CASCADE` is gone. Every table in the run set is named in one statement, which satisfies Postgres whenever the foreign-key graph is closed over that set — the ordinary case, and the one where `--truncate` did what you wanted anyway. When it is not closed, satus now stops:\n\n```text\nerror: --truncate cannot run: a table outside the run set has a foreign key into it.\nTable "audit_log" references "tenants".\n  satus will not TRUNCATE ... CASCADE, because that would also empty a table you did not ask it to seed.\n  Either bring the referencing table into the run set (remove it from "exclude" in satus.config.json), or truncate it yourself first.\n```\n\nExit code 1, nothing deleted. **This is a behaviour change**: a run that previously succeeded by cascading now fails. That is the point. If you were relying on the cascade, widen the run set or truncate those tables yourself.\n\nWe have also corrected [an earlier post](/blog/triggers-i-have-loved-and-hated) that described the old cascade behaviour approvingly.\n\n## The two cost numbers never agreed\n\n`satus generate --dry-run` prints an estimate. A real run prints what it spent. They came from different price tables.\n\nThe estimator hardcoded gpt-4o-mini\'s $0.15/$0.60 per million tokens and never looked at `--provider`. So an Anthropic run was estimated at OpenAI\'s cheapest rate and metered at Anthropic\'s, and no amount of arithmetic reconciled the two figures.\n\nUnderneath that, the Anthropic price table had been shipped empty since v0.3.0 with a `// populate in Pass 4` comment that never got its Pass 4. Every Anthropic run fell through to a fallback of $3/$15 — exactly 3x the real rate for the default model, `claude-haiku-4-5`, at $1/$5. Anthropic runs over-reported spend threefold, which meant `--max-cost` aborted runs that were nowhere near the cap.\n\nRates now live on the provider object, so the estimator and the live meter read the same numbers by construction rather than by anyone remembering to keep two files in sync. The Anthropic table is populated and dated.\n\nBoth fallbacks are now the most expensive entry in their own table. An unpriced model can therefore only make `--max-cost` abort early, never overshoot silently. OpenAI\'s old fallback of $1/$3 sat *below* three of its four priced models, which is under-billing — the wrong direction for something whose job is to stop you spending money.\n\n## Telemetry contradicted our own privacy promise\n\nThis one is on us in a different way, because we had written the rule down and then not followed it.\n\nThe CLI README and [our privacy policy](/privacy) both say satus sends "no table or column names, no row data". The run telemetry payload carried:\n\n- `tables` — every table name in the run\n- `target_schema` — the schema name, which in a multi-tenant setup is itself a customer identifier\n- `error_message` — the raw error text\n\nThe third is the serious one. Postgres unique-violation messages embed the offending value:\n\n```text\nduplicate key value violates unique constraint "users_email_key"\nKey (email)=(ada@example.com) already exists.\n```\n\nA column name and a row value, posted to us, in a payload documented as containing neither.\n\nWe had a choice: amend the policy to describe what we actually collected, or change the code to match what we had promised. We changed the code. The promise is a better product than the data.\n\n`tables` is replaced by `table_count`. `target_schema` is gone. `error_message` is replaced by `error_class`, a fixed vocabulary — `pg_23505`, `provider_http_429`, `budget_exceeded`, `no_parent_rows` — computed from SQLSTATE codes and HTTP statuses, never from message text. Anything unrecognised classifies as `unknown` rather than a truncated string, because a truncated Postgres error is exactly where a row value survives.\n\nHere is the entire payload for a successful run now:\n\n```json\n{"id":"7526b01a-…","cli_version":"0.3.7","environment":"dev","profile":"saas",\n "provider":"anthropic","model":"claude-haiku-4-5","table_count":4,"status":"success",\n "total_rows":8,"total_cost_usd":0.0112,"input_tokens":3200,"output_tokens":1600,\n "duration_ms":102}\n```\n\nAnd for a run that failed on a check constraint: the same fields, plus `"error_class":"pg_23514"`.\n\nOlder CLIs are already installed and will keep sending the old fields for as long as people run them. So `/api/public/cli/run` now accepts those three keys — rejecting them would break clients built against a contract we published — and discards them before the insert. The promise holds regardless of which version you have installed, not just for people who upgrade.\n\nFor the record: the only runs ever recorded under the old behaviour were our own release tests. No customer data was collected. That is luck of timing, not design, and it is not a reason the bug mattered less.\n\n## Tests\n\nEach fix ships with a regression test that names the bug, and each test was mutation-checked — we reverted the fix and confirmed the suite went red. A test that passes against the broken code is not a regression test, it is a comment.\n\n`satus.config.json` from 0.3.x works unchanged. No flags added, removed, or renamed.\n';
const __vite_glob_0_34 = '# Blog content\n\nEach post is a single `.md` file in this directory. Filename does not affect\nthe URL; the slug comes from frontmatter.\n\n## Frontmatter contract\n\n```yaml\n---\nslug: my-post                       # required, kebab-case, becomes /blog/<slug>\ntitle: Title of the post            # required\ndescription: One-sentence dek.      # required, 140–160 chars for SEO\ndate: 2026-05-26                    # required, ISO 8601\nauthor: satus.sh                    # optional, defaults to "satus.sh"\ntags: [postgres, seeding]           # optional\ndraft: false                        # optional, true hides post from index, RSS, sitemap\nogImage: /og-image.png              # optional, defaults to site og\n---\n```\n\nThe body is standard CommonMark, parsed by `marked`. Inline code uses\nbackticks; fenced code blocks render in JetBrains Mono.\n\nPosts are bundled into the Worker at build time via `import.meta.glob`.\nNo filesystem reads at runtime, Cloudflare Workers safe.\n';
f.setOptions({ gfm: true, breaks: false });
const FrontmatterSchema = objectType({
  slug: stringType().min(1).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: stringType().min(1).max(140),
  description: stringType().min(20).max(200),
  date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO YYYY-MM-DD"),
  author: stringType().min(1).max(80).default("satus.sh"),
  tags: arrayType(stringType().min(1).max(40)).max(8).default([]),
  draft: booleanType().default(false),
  ogImage: stringType().min(1).max(200).optional()
});
const modules = /* @__PURE__ */ Object.assign({
  "/src/content/blog/2026-05-26-cyclic-fks-in-the-wild.md": __vite_glob_0_0,
  "/src/content/blog/2026-05-26-introducing-the-log.md": __vite_glob_0_1,
  "/src/content/blog/2026-05-27-null-vs-not-null-is-not-the-question.md": __vite_glob_0_2,
  "/src/content/blog/2026-05-28-medical-booking-profile.md": __vite_glob_0_3,
  "/src/content/blog/2026-06-01-partitioned-tables-meet-rls.md": __vite_glob_0_4,
  "/src/content/blog/2026-06-03-the-citext-trap.md": __vite_glob_0_5,
  "/src/content/blog/2026-06-04-v0-2-0-deferred-constraints-faster-planning-smaller-binary.md": __vite_glob_0_6,
  "/src/content/blog/2026-06-08-jsonb-that-is-secretly-relational.md": __vite_glob_0_7,
  "/src/content/blog/2026-06-12-timezone-bugs-found-by-seed-data.md": __vite_glob_0_8,
  "/src/content/blog/2026-06-15-ecommerce-profile.md": __vite_glob_0_9,
  "/src/content/blog/2026-06-17-check-constraints-that-lie.md": __vite_glob_0_10,
  "/src/content/blog/2026-06-18-when-faker-is-the-wrong-answer.md": __vite_glob_0_11,
  "/src/content/blog/2026-06-20-dry-run-validation.md": __vite_glob_0_12,
  "/src/content/blog/2026-06-20-v0-3-0-anthropic-and-machine-readable-output.md": __vite_glob_0_13,
  "/src/content/blog/2026-06-22-enum-types-that-grew-up.md": __vite_glob_0_14,
  "/src/content/blog/2026-06-23-agent-mode-postponed.md": __vite_glob_0_15,
  "/src/content/blog/2026-06-24-seeding-into-a-multi-tenant-schema.md": __vite_glob_0_16,
  "/src/content/blog/2026-06-26-saas-subscriptions-profile.md": __vite_glob_0_17,
  "/src/content/blog/2026-06-29-arrays-vs-junction-tables.md": __vite_glob_0_18,
  "/src/content/blog/2026-07-01-the-1am-deploy-that-only-failed-in-prod.md": __vite_glob_0_19,
  "/src/content/blog/2026-07-03-v0-3-3-github-action.md": __vite_glob_0_20,
  "/src/content/blog/2026-07-10-picking-distributions-not-values.md": __vite_glob_0_21,
  "/src/content/blog/2026-07-13-generated-columns-are-load-bearing-now.md": __vite_glob_0_22,
  "/src/content/blog/2026-07-15-v0-3-3-release-notes.md": __vite_glob_0_23,
  "/src/content/blog/2026-07-16-v0-3-5-release-notes.md": __vite_glob_0_24,
  "/src/content/blog/2026-07-17-what-pg-dump-doesnt-tell-you.md": __vite_glob_0_25,
  "/src/content/blog/2026-07-20-when-uuids-arent-the-answer.md": __vite_glob_0_26,
  "/src/content/blog/2026-07-23-seeding-stripe-shaped-data-without-stripe.md": __vite_glob_0_27,
  "/src/content/blog/2026-07-24-what-a-bad-profile-looks-like.md": __vite_glob_0_28,
  "/src/content/blog/2026-07-27-postgres-extensions-that-trip-up-seeders.md": __vite_glob_0_29,
  "/src/content/blog/2026-07-31-the-schema-i-couldnt-reproduce.md": __vite_glob_0_30,
  "/src/content/blog/2026-08-05-triggers-i-have-loved-and-hated.md": __vite_glob_0_31,
  "/src/content/blog/2026-08-06-v0-3-6-release-notes.md": __vite_glob_0_32,
  "/src/content/blog/2026-08-10-v0-3-7-release-notes.md": __vite_glob_0_33,
  "/src/content/blog/README.md": __vite_glob_0_34
});
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: raw };
  const [, fm, body] = match;
  const data = {};
  for (const line of fm.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    const value = trimmed.slice(colon + 1).trim();
    data[key] = parseScalar(value);
  }
  return { data, body };
}
function parseScalar(value) {
  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((s) => stripQuotes(s.trim()));
  }
  return stripQuotes(value);
}
function stripQuotes(s) {
  if (s.startsWith('"') && s.endsWith('"') || s.startsWith("'") && s.endsWith("'")) {
    return s.slice(1, -1);
  }
  return s;
}
function parsePost(rawPath, raw) {
  const { data, body } = parseFrontmatter(raw);
  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `[blog] invalid frontmatter in ${rawPath}: ${result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`
    );
  }
  const fm = result.data;
  const html = f.parse(body, { async: false });
  const plain = body.replace(/```[\s\S]*?```/g, " ").replace(/[#*_`>\-[\]()!]/g, " ").replace(/\s+/g, " ").trim();
  const words = plain.split(/\s+/).filter(Boolean).length;
  return {
    ...fm,
    html,
    excerpt: plain.slice(0, 280),
    readingMinutes: Math.max(1, Math.ceil(words / 220))
  };
}
const POSTS = Object.entries(modules).filter(([path]) => !path.endsWith("/README.md")).map(([path, raw]) => parsePost(path, raw)).sort((a, b) => a.date < b.date ? 1 : -1);
const PUBLIC_POSTS = POSTS.filter((p) => !p.draft);
function getAllPosts() {
  return PUBLIC_POSTS;
}
function getPostBySlug(slug) {
  return PUBLIC_POSTS.find((p) => p.slug === slug) ?? null;
}
function getLatestDate() {
  return PUBLIC_POSTS[0]?.date;
}
const BASE_URL = "https://satus.sh";
const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/demo", changefreq: "monthly", priority: "0.9" },
  { path: "/profiles", changefreq: "monthly", priority: "0.8" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/docs", changefreq: "monthly", priority: "0.9" },
  { path: "/docs/how-it-works", changefreq: "monthly", priority: "0.8" },
  { path: "/docs/github-action", changefreq: "monthly", priority: "0.8" },
  { path: "/docs/troubleshooting", changefreq: "monthly", priority: "0.8" },
  { path: "/quickstart", changefreq: "monthly", priority: "0.9" },
  { path: "/cli", changefreq: "monthly", priority: "0.8" },
  { path: "/recipes", changefreq: "monthly", priority: "0.7" },
  { path: "/compare", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/security", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" }
];
const Route$w = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const blogLastmod = getLatestDate();
        const entries = [
          ...STATIC_ROUTES.map(
            (r) => r.path === "/blog" && blogLastmod ? { ...r, lastmod: blogLastmod } : r
          ),
          ...posts.map((p) => ({
            path: `/blog/${p.slug}`,
            lastmod: p.date,
            changefreq: "yearly",
            priority: "0.6"
          }))
        ];
        const urls = entries.map(
          (e) => [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            "  </url>"
          ].filter(Boolean).join("\n")
        ).join("\n");
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urls,
          "</urlset>"
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$i = () => import("./security-CNaKDJeU.mjs");
const SITE_URL$j = "https://satus.sh";
const Route$v = createFileRoute("/security")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component"),
  head: () => ({
    meta: [{
      title: "Security—satus"
    }, {
      name: "description",
      content: "Coordinated vulnerability disclosure policy for satus.sh and the satus CLI: how to report, response timeline, scope, and safe harbor."
    }, {
      property: "og:title",
      content: "Security—satus"
    }, {
      property: "og:description",
      content: "Report a vulnerability to support@satus.sh. 2-day acknowledgement, 7-day triage, 90-day default embargo."
    }, {
      property: "og:url",
      content: SITE_URL$j + "/security"
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: SITE_URL$j + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$j + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$j + "/security"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "satus security policy",
        url: SITE_URL$j + "/security",
        inLanguage: "en",
        dateModified: "2026-05-26",
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        mainEntity: {
          "@type": "CreativeWork",
          name: "Coordinated vulnerability disclosure policy",
          url: SITE_URL$j + "/security"
        }
      })
    }]
  })
});
const SECTIONS = [{
  id: "preview-branch",
  n: "01",
  label: "Preview branches"
}, {
  id: "github-actions",
  n: "02",
  label: "GitHub Actions"
}, {
  id: "e2e-reset",
  n: "03",
  label: "E2E reset"
}, {
  id: "neon-branch",
  n: "04",
  label: "Neon branching"
}];
const $$splitComponentImporter$h = () => import("./recipes-ChCPAhM9.mjs");
const SITE_URL$i = "https://satus.sh";
const Route$u = createFileRoute("/recipes")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component"),
  head: () => ({
    meta: [{
      title: "Recipes—satus"
    }, {
      name: "description",
      content: "Copy-paste recipes for satus: seed a preview branch, wire into GitHub Actions, reset a Cypress database between tests, seed a fresh Neon branch."
    }, {
      property: "og:title",
      content: "Recipes—satus"
    }, {
      property: "og:description",
      content: "Four short, copy-paste recipes covering the most common satus integrations."
    }, {
      property: "og:url",
      content: SITE_URL$i + "/recipes"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$i + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$i + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$i + "/recipes"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "satus recipes",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: SECTIONS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: SITE_URL$i + "/recipes#" + s.id,
          name: s.label
        }))
      })
    }]
  })
});
const $$splitComponentImporter$g = () => import("./quickstart-BEA1gn0N.mjs");
const SITE_URL$h = "https://satus.sh";
const Route$t = createFileRoute("/quickstart")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  head: () => ({
    meta: [{
      title: "Quickstart—satus"
    }, {
      name: "description",
      content: "Zero to a seeded Postgres database in under a minute. Install satus, point at Supabase / Neon / Railway / RDS / local, pick a profile, ship."
    }, {
      property: "og:title",
      content: "Quickstart—satus"
    }, {
      property: "og:description",
      content: "Install, point at any Postgres, pick a profile, ship. Zero to seeded database in under a minute."
    }, {
      property: "og:url",
      content: SITE_URL$h + "/quickstart"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$h + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$h + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$h + "/quickstart"
    }],
    scripts: [{
      // GEO: HowTo schema so generative search engines can quote the steps
      // verbatim. The `url` field on each step deep-links to the page anchor
      // so an AI answer can cite the exact section.
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Seed a Postgres database with satus",
        totalTime: "PT1M",
        step: [{
          "@type": "HowToStep",
          name: "Install",
          text: "Install the satus CLI globally via npm.",
          url: SITE_URL$h + "/quickstart#install"
        }, {
          "@type": "HowToStep",
          name: "Configure",
          text: "Set DATABASE_URL and run satus init to scaffold satus.config.json.",
          url: SITE_URL$h + "/quickstart#configure"
        }, {
          "@type": "HowToStep",
          name: "Preview",
          text: "Dry-run to validate the plan offline before anything touches your database.",
          url: SITE_URL$h + "/quickstart#preview"
        }, {
          "@type": "HowToStep",
          name: "Ship",
          text: "Run satus generate to write rows in a single transaction.",
          url: SITE_URL$h + "/quickstart#ship"
        }]
      })
    }, {
      /* BreadcrumbList: Home › Quickstart. Helps Google render the
       * trail in the SERP and gives AI crawlers explicit ancestry. */
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL$h + "/"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Quickstart",
          item: SITE_URL$h + "/quickstart"
        }]
      })
    }]
  })
});
const $$splitComponentImporter$f = () => import("./profiles-DGNDTkNe.mjs");
const SITE_URL$g = "https://satus.sh";
const Route$s = createFileRoute("/profiles")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component"),
  head: () => ({
    meta: [{
      title: "Reference profiles—satus"
    }, {
      name: "description",
      content: "Three reference profiles for satus—saas, ecommerce, b2b—each a prose hint that biases generated values toward a domain. Documented alongside the CLI source."
    }, {
      property: "og:title",
      content: "Reference profiles—satus"
    }, {
      property: "og:description",
      content: "Three domain hints: saas, ecommerce, b2b. Documented biases + sample values, kept in sync with the CLI source."
    }, {
      property: "og:url",
      content: SITE_URL$g + "/profiles"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$g + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$g + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$g + "/profiles"
    }]
  })
});
const $$splitComponentImporter$e = () => import("./privacy-BidEJUcc.mjs");
const SITE_URL$f = "https://satus.sh";
const Route$r = createFileRoute("/privacy")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component"),
  head: () => ({
    meta: [{
      title: "Privacy Policy—satus"
    }, {
      name: "description",
      content: "Privacy policy for satus.sh. The CLI runs on your machine; we never see your schemas, your data, or your LLM prompts. Effective May 26, 2026."
    }, {
      property: "og:title",
      content: "Privacy Policy—satus"
    }, {
      property: "og:description",
      content: "satus is a CLI: it runs on your machine, against your databases, with your LLM key. We never see your schemas, rows, or prompts."
    }, {
      property: "og:url",
      content: SITE_URL$f + "/privacy"
    }, {
      property: "og:type",
      content: "article"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$f + "/privacy"
    }]
  })
});
const FAQ = [{
  q: "Why bring-your-own LLM key?",
  a: "Token costs are the dominant variable in this tool. Reselling them means we mark up your usage; BYO means you pay your provider directly, see the bill on their dashboard, and we charge a flat fee for the software. It also keeps your schema out of any vendor we don't control."
}, {
  q: "Which LLM providers are supported?",
  a: "OpenAI and Anthropic are supported today. The CLI auto-detects which key is present (OPENAI_API_KEY or ANTHROPIC_API_KEY) and uses structured outputs against the corresponding provider. Google Gemini is not yet supported. Email support@satus.sh if your stack needs another provider."
}, {
  q: "Is there a free trial on Pro?",
  a: "No. The Free tier is the trial: the same CLI binary, capped at 25 rows per table across 5 tables, with no time limit. All three built-in profiles (saas, ecommerce, b2b) are available on every tier. Pro lifts the row and table caps and adds priority triage and a 14-day offline license grace. If those don't earn $19 a month, you should stay on Free. The source is published for inspection under a proprietary license; commercial use is governed by the license you activate."
}, {
  q: "What's the refund policy?",
  a: "Full refund within 14 days of initial purchase, no questions asked. Email support@satus.sh with your order ID. After 14 days the current period is non-refundable, but you can cancel future renewals any time and keep using the CLI until the period ends."
}, {
  q: "Does it work offline?",
  a: "Pro and Team licenses include a 14-day offline grace period—the CLI keeps generating against your local LLM provider even if it can't reach our license server. Free is fully offline forever."
}, {
  q: "When does the Team tier launch?",
  a: "When we have ten teams on the waitlist asking for the same three features. Joining the waitlist is the vote."
}];
const $$splitComponentImporter$d = () => import("./pricing-CzYtjNiT.mjs");
const SITE_URL$e = "https://satus.sh";
const Route$q = createFileRoute("/pricing")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component"),
  head: () => ({
    meta: [{
      title: "Pricing—satus"
    }, {
      name: "description",
      content: "satus pricing: Free tier (25 rows × 5 tables), Pro at $19/mo, Team at $49/seat. Bring-your-own LLM key on every tier. We don't resell tokens."
    }, {
      property: "og:title",
      content: "Pricing—satus"
    }, {
      property: "og:description",
      content: "Free, Pro $19/mo, Team $49/seat. Bring-your-own LLM key on every tier. No token reselling."
    }, {
      property: "og:url",
      content: SITE_URL$e + "/pricing"
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: SITE_URL$e + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$e + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$e + "/pricing"
    }],
    scripts: [{
      // GEO: FAQPage schema mirrors the visible Q&A list verbatim so AI
      // search can answer common questions about pricing without scraping
      // the marketing prose around them.
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(({
          q,
          a
        }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a
          }
        }))
      })
    }]
  })
});
const $$splitComponentImporter$c = () => import("./demo-BBb2xCJ0.mjs");
const SITE_URL$d = "https://satus.sh";
const Route$p = createFileRoute("/demo")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "satus demo—generate seed data in your browser"
    }, {
      name: "description",
      content: "Paste a Postgres schema and watch satus generate FK-safe, realistic seed data — running real Postgres (WASM) in your browser. No install, no signup."
    }, {
      property: "og:title",
      content: "satus demo—seed data in your browser"
    }, {
      property: "og:description",
      content: "Paste CREATE TABLE statements, get realistic rows that respect your foreign keys. Real Postgres in the browser."
    }, {
      property: "og:url",
      content: SITE_URL$d + "/demo"
    }]
  })
});
const LAST_REVIEWED = "2026-05-26";
const $$splitComponentImporter$b = () => import("./compare-CYV2ERrp.mjs");
const SITE_URL$c = "https://satus.sh";
const Route$o = createFileRoute("/compare")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  head: () => ({
    meta: [{
      title: "satus vs Snaplet, Tonic, faker—comparison"
    }, {
      name: "description",
      content: "Honest, category-by-category comparison of satus against Snaplet Seed, Tonic.ai, and faker.js. When each is the right tool, and when satus is the better fit."
    }, {
      property: "og:title",
      content: "satus vs Snaplet, Tonic, faker"
    }, {
      property: "og:description",
      content: "Where Snaplet, Tonic, and faker each shine, and where satus is the better fit."
    }, {
      property: "og:url",
      content: SITE_URL$c + "/compare"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$c + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$c + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$c + "/compare"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "satus vs Snaplet, Tonic.ai, and faker.js",
        description: "Category-by-category positioning of satus against the most common alternatives.",
        url: SITE_URL$c + "/compare",
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: "satus.sh"
        },
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        dateModified: LAST_REVIEWED
      })
    }]
  })
});
const SATUS_VERSION = "0.3.7";
const SATUS_VERSION_TAG = `v${SATUS_VERSION}`;
const SATUS_SPEC = "satus/0.3";
const SATUS_RELEASED_AT = "2026-08-10";
const $$splitComponentImporter$a = () => import("./cli-DCREauWw.mjs");
const SITE_URL$b = "https://satus.sh";
const Route$n = createFileRoute("/cli")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  head: () => ({
    meta: [{
      title: "CLI reference—satus"
    }, {
      name: "description",
      content: `Complete reference for the satus CLI ${SATUS_VERSION_TAG}: init, generate, activate, whoami. Every flag, every environment variable, taken directly from the published binary.`
    }, {
      property: "og:title",
      content: "CLI reference—satus"
    }, {
      property: "og:description",
      content: "Every subcommand and every flag in the satus CLI, matched against the published binary. One page."
    }, {
      property: "og:url",
      content: SITE_URL$b + "/cli"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$b + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$b + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$b + "/cli"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "satus CLI reference",
        description: "Complete command-line reference for the satus seeding CLI.",
        url: SITE_URL$b + "/cli",
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: "satus.sh"
        },
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        dateModified: SATUS_RELEASED_AT,
        proficiencyLevel: "Beginner",
        dependencies: "Node.js 20+; PostgreSQL 14+"
      })
    }]
  })
});
const $$splitComponentImporter$9 = () => import("./index-BZBcmYLA.mjs");
const SITE_URL$a = "https://satus.sh";
const Route$m = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  head: () => ({
    meta: [
      {
        title: "satus—relationally-coherent seed data for Postgres"
      },
      {
        name: "description",
        content: "Reads your Postgres schema and writes realistic seed data that respects every foreign key, constraint, and business rule. Built for demos and QA."
      },
      {
        property: "og:title",
        content: "satus—relationally-coherent seed data for Postgres"
      },
      {
        property: "og:description",
        content: "Reads your Postgres schema and writes realistic seed data that respects every foreign key, constraint, and business rule. Built for demos and QA."
      },
      {
        property: "og:url",
        content: SITE_URL$a + "/"
      },
      {
        property: "og:type",
        content: "website"
      },
      // 1200×630 Swiss-Red spec-sheet OG card. Per project rule (and TanStack
      // meta-dedupe behavior), og:image lives ONLY on leaf routes so the root
      // never overrides a per-page image. Same image is reused across leaves
      // for now since the visual identity is page-agnostic.
      {
        property: "og:image",
        content: SITE_URL$a + "/og-image.png"
      },
      {
        property: "og:image:width",
        content: "1200"
      },
      {
        property: "og:image:height",
        content: "630"
      },
      {
        name: "twitter:image",
        content: SITE_URL$a + "/og-image.png"
      }
    ],
    links: [{
      rel: "canonical",
      href: SITE_URL$a + "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "satus",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux",
        description: "CLI that generates relationally-coherent seed data for Postgres databases.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        url: SITE_URL$a
      })
    }]
  })
});
const $$splitComponentImporter$8 = () => import("./docs.index-B6x7K8AS.mjs");
const SITE_URL$9 = "https://satus.sh";
const Route$l = createFileRoute("/docs/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Docs—satus"
    }, {
      name: "description",
      content: "Documentation hub for satus: quickstart, CLI reference, profile catalogue, and conceptual guides for the seeding CLI that respects every foreign key."
    }, {
      property: "og:title",
      content: "Docs—satus"
    }, {
      property: "og:description",
      content: "Quickstart, CLI reference, profile catalogue, concepts. Everything in one place."
    }, {
      property: "og:url",
      content: SITE_URL$9 + "/docs"
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: SITE_URL$9 + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$9 + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$9 + "/docs"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "satus documentation",
        url: SITE_URL$9 + "/docs",
        inLanguage: "en",
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        hasPart: [{
          "@type": "WebPage",
          name: "Quickstart",
          url: SITE_URL$9 + "/quickstart"
        }, {
          "@type": "TechArticle",
          name: "CLI reference",
          url: SITE_URL$9 + "/cli"
        }, {
          "@type": "WebPage",
          name: "Profiles",
          url: SITE_URL$9 + "/profiles"
        }, {
          "@type": "Blog",
          name: "Engineering blog",
          url: SITE_URL$9 + "/blog"
        }]
      })
    }]
  })
});
const SITE_URL$8 = "https://satus.sh";
const $$splitComponentImporter$7 = () => import("./checkout.index-TOLze1di.mjs");
const Route$k = createFileRoute("/checkout/")({
  validateSearch: (search) => ({
    price: typeof search.price === "string" ? search.price : void 0,
    qty: typeof search.qty === "number" && Number.isFinite(search.qty) ? search.qty : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [
      {
        title: "Checkout—satus.sh"
      },
      {
        name: "description",
        content: "Complete your satus.sh purchase."
      },
      // Checkout is a transactional surface, not an SEO target.
      {
        name: "robots",
        content: "noindex,nofollow"
      }
    ],
    links: [{
      rel: "canonical",
      href: SITE_URL$8 + "/checkout"
    }]
  })
});
const PATH = "/blog";
const $$splitComponentImporter$6 = () => import("./blog.index-BPij3qT7.mjs");
const SITE_URL$7 = "https://satus.sh";
const Route$j = createFileRoute("/blog/")({
  /* Loader is synchronous because all posts are bundled. ensureQueryData is
   * unnecessary; the parsed POSTS array is in module scope. */
  loader: () => ({
    posts: getAllPosts()
  }),
  head: () => ({
    meta: [{
      title: "Blog—satus.sh"
    }, {
      name: "description",
      content: "Field notes on Postgres schemas, satus CLI changelogs, and post-mortems on seed-data edge cases. Written for engineers who ship."
    }, {
      property: "og:title",
      content: "Blog—satus.sh"
    }, {
      property: "og:description",
      content: "Field notes on Postgres schemas, satus CLI changelogs, and post-mortems on seed-data edge cases."
    }, {
      property: "og:url",
      content: SITE_URL$7 + PATH
    }, {
      property: "og:image",
      content: SITE_URL$7 + "/og-image.png"
    }, {
      name: "twitter:title",
      content: "Blog—satus.sh"
    }, {
      name: "twitter:description",
      content: "Field notes on Postgres schemas, satus CLI changelogs, and seed-data post-mortems."
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$7 + PATH
    }, {
      rel: "alternate",
      type: "application/rss+xml",
      title: "satus.sh blog",
      href: SITE_URL$7 + "/blog/rss.xml"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function redactEmail$2(email) {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
const Route$i = createFileRoute("/email/unsubscribe")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const supabaseUrl = "https://xbnrjwzryuonuinzuomk.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!token) {
          return Response.json({ error: "Token is required" }, { status: 400 });
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: tokenRecord, error: lookupError } = await supabase.from("email_unsubscribe_tokens").select("*").eq("token", token).maybeSingle();
        if (lookupError || !tokenRecord) {
          return Response.json({ error: "Invalid or expired token" }, { status: 404 });
        }
        if (tokenRecord.used_at) {
          return Response.json({ valid: false, reason: "already_unsubscribed" });
        }
        return Response.json({ valid: true });
      },
      POST: async ({ request }) => {
        const supabaseUrl = "https://xbnrjwzryuonuinzuomk.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const url = new URL(request.url);
        let token = url.searchParams.get("token");
        const contentType = request.headers.get("content-type") ?? "";
        if (contentType.includes("application/x-www-form-urlencoded")) {
          const formText = await request.text();
          const params = new URLSearchParams(formText);
          if (!params.get("List-Unsubscribe")) {
            const formToken = params.get("token");
            if (formToken) {
              token = formToken;
            }
          }
        } else {
          try {
            const body = await request.json();
            if (body.token) {
              token = body.token;
            }
          } catch {
          }
        }
        if (!token) {
          return Response.json({ error: "Token is required" }, { status: 400 });
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: tokenRecord, error: lookupError } = await supabase.from("email_unsubscribe_tokens").select("*").eq("token", token).maybeSingle();
        if (lookupError || !tokenRecord) {
          return Response.json({ error: "Invalid or expired token" }, { status: 404 });
        }
        if (tokenRecord.used_at) {
          return Response.json({ success: false, reason: "already_unsubscribed" });
        }
        const { data: updated, error: updateError } = await supabase.from("email_unsubscribe_tokens").update({ used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("token", token).is("used_at", null).select().maybeSingle();
        if (updateError) {
          console.error("Failed to mark token as used", { error: updateError, token_prefix: token.slice(0, 8) });
          return Response.json({ error: "Failed to process unsubscribe" }, { status: 500 });
        }
        if (!updated) {
          return Response.json({ success: false, reason: "already_unsubscribed" });
        }
        const { error: suppressError } = await supabase.from("suppressed_emails").upsert(
          { email: tokenRecord.email.toLowerCase(), reason: "unsubscribe" },
          { onConflict: "email" }
        );
        if (suppressError) {
          console.error("Failed to suppress email", {
            error: suppressError,
            email_redacted: redactEmail$2(tokenRecord.email)
          });
          return Response.json({ error: "Failed to process unsubscribe" }, { status: 500 });
        }
        console.log("Email unsubscribed", {
          email_redacted: redactEmail$2(tokenRecord.email)
        });
        return Response.json({ success: true });
      }
    }
  }
});
const FAQS = [
  // -------- Install & setup --------
  {
    q: "satus: command not found",
    a: "The CLI was installed to a directory not on your PATH. Run `npm prefix -g` to find npm's global bin directory and add it to your shell's PATH, or reinstall with `npm i -g @passkeybridge/satus` after fixing your npm prefix."
  },
  {
    q: "Which Node versions are supported?",
    a: "Node 20 and 22 on macOS and Linux (the package declares engines >=20). Windows is supported via WSL2. Older Node versions are not tested and will likely fail at install or first run."
  },
  {
    q: "Do I need any environment variables to run `satus init`?",
    a: "No. `init` only writes files into ./satus/ and needs neither DATABASE_URL nor OPENAI_API_KEY. The two variables become required at `satus plan` and `satus generate`."
  },
  // -------- Schema errors --------
  {
    q: "E_FK_CYCLE: foreign-key cycle could not be broken automatically",
    a: "Your schema has a cycle in its foreign keys, and every column on the cycle is NOT NULL with no DEFAULT and is not declared DEFERRABLE. satus refuses to guess which constraint to violate. Fix one of three ways: mark one side of the cycle nullable, add a column DEFAULT, or declare the constraint DEFERRABLE INITIALLY DEFERRED. The /docs/how-it-works page explains why each option works."
  },
  {
    q: "E_DB_NOT_EMPTY: database has more than 10,000 user rows",
    a: "Safety guard. satus refuses to write into a database that already holds more than 10,000 user-table rows, because that's almost always a sign DATABASE_URL points at production by accident. If you really do mean to append seed data, re-run with --force. Better: point at a fresh Supabase/Neon branch or a Docker container."
  },
  {
    q: "E_PROFILE_NOT_FOUND: profile name doesn't match",
    a: "The --profile value must be one of the three bundled profiles: saas, ecommerce, or b2b. There are no hyphens in the names, and custom profile files are not supported yet—`satus init` writes the chosen profile into satus.config.json, which `satus generate` reads when the flag is omitted."
  },
  {
    q: "satus generated rows that violate a CHECK constraint I didn't think to declare in the profile",
    a: "The whole transaction will have rolled back, so your database is fine. File an issue with the CREATE TABLE statement and the CHECK constraint—the planner reads NOT NULL, FK, and unique constraints from pg_catalog, but CHECK predicates are out of scope for the 0.1.x line."
  },
  // -------- LLM provider --------
  {
    q: "E_LLM_AUTH: provider key missing, malformed, or rejected",
    a: "Either the variable for the selected provider isn't set (OPENAI_API_KEY or ANTHROPIC_API_KEY), the key has the wrong shape, or the provider rejected it (revoked, billing problem, wrong organisation). Check `echo $OPENAI_API_KEY` (or `$ANTHROPIC_API_KEY`) returns a value, and verify the key in the provider's dashboard. satus never proxies your key—the call goes from your machine directly to the provider."
  },
  {
    q: "E_LLM_RATE_LIMIT: provider rate-limited the run",
    a: "satus retries with exponential backoff up to 5 attempts before giving up. If you hit a hard tier ceiling, drop --batch-size below the default of 25 (try 10), wait a minute, switch to a different provider with --provider, or upgrade your account tier. We never resell tokens—the bill is on your provider's dashboard."
  },
  {
    q: "The run cost more than I expected.",
    a: "Use --max-cost <usd> to cap the spend; by default the planner refuses to proceed if the estimated cost exceeds $1.00. Always preview with `satus generate --profile <name> --dry-run` first—the planner prints `estimated cost · $X.XX` before any LLM calls actually fire. For per-batch detail, add `-v` / `--verbose`; for machine-readable summaries pipe `--json` into jq."
  },
  {
    q: "Can I use Anthropic or Gemini instead of OpenAI?",
    a: "Anthropic, yes — as of v0.3.0. Set ANTHROPIC_API_KEY and the CLI picks it up; the default model is claude-haiku-4-5. If both OPENAI_API_KEY and ANTHROPIC_API_KEY are exported, pass --provider openai|anthropic (or set the provider field in satus.config.json) so we know which one to use. Gemini is not supported yet; see the changelog for the active roadmap."
  },
  // -------- Runtime & rollback --------
  {
    q: "satus generate failed halfway. Is my database half-seeded?",
    a: "No. The entire run executes inside a single Postgres transaction. A failure—any failure, including Ctrl-C—rolls back to the state your database was in before you ran the command. There is nothing to clean up."
  },
  {
    q: "Can I run satus generate twice in a row?",
    a: "Yes. Each run inserts on top of whatever is there—satus never deletes data unless you ask. Pass --truncate to clear the target tables (TRUNCATE ... RESTART IDENTITY, no CASCADE) inside the same transaction before re-seeding. Since 0.3.7 there is deliberately no CASCADE: if a table outside the run set has a foreign key into one inside it, satus errors out instead of emptying a table you never asked it to touch. For CI loops, point at a database branch and reset between runs."
  },
  {
    q: "How do I produce the same data twice for snapshot tests?",
    a: "You can't—LLM output is non-deterministic and satus has no --seed flag, on purpose: we won't promise reproducibility the model providers don't offer. For snapshot tests, seed once and capture the state with pg_dump (or a database branch snapshot), then restore that fixture between runs."
  },
  {
    q: "Does satus need superuser access on Postgres?",
    a: "No. It needs SELECT on the catalog (pg_catalog, information_schema—both world-readable by default) and INSERT/UPDATE on the user tables you're seeding. A standard application role is enough."
  },
  // -------- License & billing --------
  {
    q: "I bought Pro. How do I activate it on the CLI?",
    a: "Run `satus activate` and paste the license key from your purchase email. The CLI verifies the key against satus.sh once, caches the result for 24 hours, and works fully offline within that window."
  },
  {
    q: "How do I check what tier I'm on?",
    a: "Run `satus whoami`. It prints the current license tier, the verification cache expiry, and the email the key is registered to."
  },
  {
    q: "My team needs more than one seat.",
    a: "Team tier is on the waitlist—email support@satus.sh with how many seats you need and we'll prioritise. In the meantime, every developer can self-serve a Pro seat."
  },
  {
    q: "Can I get a refund?",
    a: "Yes—within 14 days of purchase, no questions. Email support@satus.sh from the address on the order."
  }
];
const $$splitComponentImporter$5 = () => import("./docs.troubleshooting-BjW20UvR.mjs");
const SITE_URL$6 = "https://satus.sh";
const Route$h = createFileRoute("/docs/troubleshooting")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Troubleshooting—satus"
    }, {
      name: "description",
      content: "Every known satus failure mode with the fix. Install errors, schema errors (E_FK_CYCLE, E_DB_NOT_EMPTY), LLM rate limits, license activation, recovery."
    }, {
      property: "og:title",
      content: "Troubleshooting—satus"
    }, {
      property: "og:description",
      content: "Symptom-first guide to every documented satus failure. Read it before you file an issue."
    }, {
      property: "og:url",
      content: SITE_URL$6 + "/docs/troubleshooting"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$6 + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$6 + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$6 + "/docs/troubleshooting"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: SITE_URL$6 + "/docs/troubleshooting",
        mainEntity: FAQS.map(({
          q,
          a
        }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a
          }
        }))
      })
    }, {
      /* BreadcrumbList: Home › Docs › Troubleshooting. */
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL$6 + "/"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Docs",
          item: SITE_URL$6 + "/docs"
        }, {
          "@type": "ListItem",
          position: 3,
          name: "Troubleshooting",
          item: SITE_URL$6 + "/docs/troubleshooting"
        }]
      })
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./docs.how-it-works-C46i4FG1.mjs");
const SITE_URL$5 = "https://satus.sh";
const Route$g = createFileRoute("/docs/how-it-works")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "How it works—satus"
    }, {
      name: "description",
      content: "The three guarantees satus makes: the FK-cycle planner, the 10,000-row safety guard, and the single-transaction write that is all-or-nothing."
    }, {
      property: "og:title",
      content: "How it works—satus"
    }, {
      property: "og:description",
      content: "FK-cycle planning, the 10,000-row safety guard, and the one-transaction write—explained end to end."
    }, {
      property: "og:url",
      content: SITE_URL$5 + "/docs/how-it-works"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$5 + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$5 + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$5 + "/docs/how-it-works"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "How satus works",
        description: "Concept guide to the three guarantees satus makes when seeding a Postgres database.",
        url: SITE_URL$5 + "/docs/how-it-works",
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: "satus.sh"
        },
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        dateModified: "2026-05-27",
        proficiencyLevel: "Intermediate",
        about: [{
          "@type": "Thing",
          name: "PostgreSQL foreign keys"
        }, {
          "@type": "Thing",
          name: "Database seeding"
        }, {
          "@type": "Thing",
          name: "ACID transactions"
        }]
      })
    }, {
      /* BreadcrumbList: Home › Docs › How it works. Gives Google the
       * route ancestry explicitly so the SERP can render the trail. */
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL$5 + "/"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Docs",
          item: SITE_URL$5 + "/docs"
        }, {
          "@type": "ListItem",
          position: 3,
          name: "How it works",
          item: SITE_URL$5 + "/docs/how-it-works"
        }]
      })
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./docs.github-action-MnSePQRL.mjs");
const SITE_URL$4 = "https://satus.sh";
const Route$f = createFileRoute("/docs/github-action")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "GitHub Action—satus"
    }, {
      name: "description",
      content: "passkeybridge/satus/packages/action@main: a composite GitHub Action that runs `satus generate` against your PR-preview Postgres database. Inputs, outputs, security notes."
    }, {
      property: "og:title",
      content: "GitHub Action—satus"
    }, {
      property: "og:description",
      content: "Run satus against your PR-preview Postgres from GitHub Actions. Composite action, no Docker, BYO provider key."
    }, {
      property: "og:url",
      content: SITE_URL$4 + "/docs/github-action"
    }, {
      property: "og:type",
      content: "article"
    }, {
      property: "og:image",
      content: SITE_URL$4 + "/og-image.png"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:image",
      content: SITE_URL$4 + "/og-image.png"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$4 + "/docs/github-action"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "satus GitHub Action reference",
        description: "Reference for the passkeybridge/satus/packages/action@main composite GitHub Action.",
        url: SITE_URL$4 + "/docs/github-action",
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: "satus.sh"
        },
        publisher: {
          "@type": "Organization",
          name: "PasskeyBridge LLC",
          url: "https://passkeybridge.io"
        },
        dateModified: "2026-07-15",
        proficiencyLevel: "Intermediate",
        about: [{
          "@type": "Thing",
          name: "GitHub Actions"
        }, {
          "@type": "Thing",
          name: "PostgreSQL seeding"
        }, {
          "@type": "Thing",
          name: "PR preview environments"
        }]
      })
    }, {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL$4 + "/"
        }, {
          "@type": "ListItem",
          position: 2,
          name: "Docs",
          item: SITE_URL$4 + "/docs"
        }, {
          "@type": "ListItem",
          position: 3,
          name: "GitHub Action",
          item: SITE_URL$4 + "/docs/github-action"
        }]
      })
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./checkout.success-D6AHUel8.mjs");
const SITE_URL$3 = "https://satus.sh";
const Route$e = createFileRoute("/checkout/success")({
  validateSearch: (search) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Payment received—satus.sh"
    }, {
      name: "description",
      content: "Your satus.sh subscription is active."
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$3 + "/checkout/success"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./checkout.cancel-BaA2QG7P.mjs");
const SITE_URL$2 = "https://satus.sh";
const Route$d = createFileRoute("/checkout/cancel")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Checkout canceled—satus.sh"
    }, {
      name: "description",
      content: "No charge was made. You can restart checkout anytime."
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }],
    links: [{
      rel: "canonical",
      href: SITE_URL$2 + "/checkout/cancel"
    }]
  })
});
const SITE_URL$1 = "https://satus.sh";
const FEED_URL = SITE_URL$1 + "/blog/rss.xml";
function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function toRfc822(isoDate) {
  return (/* @__PURE__ */ new Date(`${isoDate}T12:00:00Z`)).toUTCString();
}
const Route$c = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const lastBuildDate = posts[0] ? toRfc822(posts[0].date) : (/* @__PURE__ */ new Date()).toUTCString();
        const items = posts.map((p) => {
          const url = `${SITE_URL$1}/blog/${p.slug}`;
          return [
            "    <item>",
            `      <title>${xmlEscape(p.title)}</title>`,
            `      <link>${url}</link>`,
            `      <guid isPermaLink="true">${url}</guid>`,
            `      <pubDate>${toRfc822(p.date)}</pubDate>`,
            `      <description>${xmlEscape(p.description)}</description>`,
            `      <content:encoded><![CDATA[${p.html}]]></content:encoded>`,
            ...p.tags.map((t) => `      <category>${xmlEscape(t)}</category>`),
            "    </item>"
          ].join("\n");
        }).join("\n");
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
          "  <channel>",
          "    <title>satus.sh blog</title>",
          `    <link>${SITE_URL$1}/blog</link>`,
          `    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>`,
          "    <description>Field notes on Postgres schemas, satus CLI changelogs, and seed-data post-mortems.</description>",
          "    <language>en-us</language>",
          `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
          "    <generator>satus.sh</generator>",
          items,
          "  </channel>",
          "</rss>"
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitNotFoundComponentImporter = () => import("./blog._slug-TQvyKPfS.mjs");
const $$splitComponentImporter = () => import("./blog._slug-BTXbWtqY.mjs");
const SITE_URL = "https://satus.sh";
const Route$b = createFileRoute("/blog/$slug")({
  loader: ({
    params
  }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return {
      post
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const {
      post
    } = loaderData;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const ogImage = post.ogImage ? post.ogImage.startsWith("http") ? post.ogImage : SITE_URL + post.ogImage : SITE_URL + "/og-image.png";
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Organization",
        name: post.author
      },
      publisher: {
        "@type": "Organization",
        name: "satus.sh",
        url: SITE_URL
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url
      },
      image: ogImage,
      keywords: post.tags.join(", ") || void 0
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL + "/"
      }, {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: SITE_URL + "/blog"
      }, {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url
      }]
    };
    return {
      meta: [{
        title: `${post.title}—satus.sh blog`
      }, {
        name: "description",
        content: post.description
      }, {
        name: "author",
        content: post.author
      }, {
        property: "article:published_time",
        content: post.date
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:title",
        content: post.title
      }, {
        property: "og:description",
        content: post.description
      }, {
        property: "og:url",
        content: url
      }, {
        property: "og:image",
        content: ogImage
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: post.title
      }, {
        name: "twitter:description",
        content: post.description
      }, {
        name: "twitter:image",
        content: ogImage
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        /* TanStack head() accepts `children` for raw script bodies. */
        children: JSON.stringify(articleLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd)
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60;
function redactEmail$1(email) {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function bytesToBase64(bytes) {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function verifySvixSignature(request, body, secret) {
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return { ok: false, status: 401, error: "Missing svix headers" };
  }
  const timestamp = Number.parseInt(svixTimestamp, 10);
  if (!Number.isFinite(timestamp)) {
    return { ok: false, status: 401, error: "Invalid timestamp" };
  }
  const skew = Math.abs(Date.now() / 1e3 - timestamp);
  if (skew > TIMESTAMP_TOLERANCE_SECONDS) {
    return { ok: false, status: 401, error: "Stale timestamp" };
  }
  const secretB64 = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  let keyBytes;
  try {
    keyBytes = base64ToBytes(secretB64);
  } catch {
    return { ok: false, status: 500, error: "Malformed webhook secret" };
  }
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signedContent = `${svixId}.${svixTimestamp}.${body}`;
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedContent));
  const expected = bytesToBase64(new Uint8Array(mac));
  for (const part of svixSignature.split(" ")) {
    const [version, sig] = part.split(",", 2);
    if (version === "v1" && sig && constantTimeEqual(sig, expected)) {
      return { ok: true };
    }
  }
  return { ok: false, status: 401, error: "Invalid signature" };
}
function mapEventToReason(eventType) {
  switch (eventType) {
    case "email.bounced":
      return "bounce";
    case "email.complained":
      return "complaint";
    default:
      return null;
  }
}
function mapReasonToStatus(reason) {
  return reason === "bounce" ? "bounced" : "complained";
}
function mapReasonToMessage(reason) {
  return reason === "bounce" ? "Permanent bounce—email address is invalid or rejected" : "Spam complaint—recipient marked email as spam";
}
const Route$a = createFileRoute("/lovable/email/suppression")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
        const supabaseUrl = "https://xbnrjwzryuonuinzuomk.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!webhookSecret || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const body = await request.text();
        const verification = await verifySvixSignature(request, body, webhookSecret);
        if (!verification.ok) {
          console.error("Webhook verification failed", { error: verification.error });
          return Response.json({ error: verification.error }, { status: verification.status });
        }
        let event;
        try {
          event = JSON.parse(body);
          if (!event || typeof event.type !== "string" || typeof event.data !== "object") {
            throw new Error("Malformed event");
          }
        } catch {
          return Response.json({ error: "Invalid payload" }, { status: 400 });
        }
        const reason = mapEventToReason(event.type);
        if (!reason) {
          return Response.json({ success: true, ignored: event.type });
        }
        const to = Array.isArray(event.data.to) ? event.data.to[0] : event.data.to;
        if (!to || typeof to !== "string" || !to.includes("@")) {
          return Response.json({ error: "Missing recipient in event" }, { status: 400 });
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const normalizedEmail = to.toLowerCase();
        const { error: suppressError } = await supabase.from("suppressed_emails").upsert(
          {
            email: normalizedEmail,
            reason,
            metadata: { source: "resend", event_type: event.type, email_id: event.data.email_id ?? null }
          },
          { onConflict: "email" }
        );
        if (suppressError) {
          console.error("Failed to upsert suppressed email", {
            error: suppressError,
            email_redacted: redactEmail$1(normalizedEmail)
          });
          return Response.json({ error: "Failed to write suppression" }, { status: 500 });
        }
        const { error: insertError } = await supabase.from("email_send_log").insert({
          message_id: event.data.email_id ?? null,
          template_name: "system",
          recipient_email: normalizedEmail,
          status: mapReasonToStatus(reason),
          error_message: mapReasonToMessage(reason),
          metadata: { source: "resend", event_type: event.type }
        });
        if (insertError) {
          console.warn("Failed to insert email_send_log", { error: insertError });
        }
        console.log("Suppression processed", {
          email_redacted: redactEmail$1(normalizedEmail),
          reason,
          event_type: event.type
        });
        return Response.json({ success: true });
      }
    }
  }
});
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL || "https://xbnrjwzryuonuinzuomk.supabase.co";
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...[],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const CORS$3 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
const json$3 = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", ...CORS$3 }
});
const Payload$2 = objectType({
  email: stringType().trim().toLowerCase().min(5).max(254).email(),
  tier: enumType(["pro", "team"]),
  note: stringType().trim().max(500).optional(),
  source: stringType().trim().max(64).optional()
});
const RATE_BUCKET$2 = "waitlist_signup";
const RATE_WINDOW_SECONDS$2 = 600;
const RATE_LIMIT$2 = 5;
async function rateLimited$2(key) {
  const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
    p_bucket: RATE_BUCKET$2,
    p_key: key,
    p_window_seconds: RATE_WINDOW_SECONDS$2
  });
  if (error) {
    console.error("[waitlist] rate-limit counter failed", error);
    return false;
  }
  return typeof data === "number" && data > RATE_LIMIT$2;
}
function hashIp$2(ip) {
  if (!ip) return null;
  return crypto$1.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
const Route$9 = createFileRoute("/api/public/waitlist")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$3 }),
      GET: async () => new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "POST, OPTIONS", ...CORS$3 }
      }),
      POST: async ({ request }) => {
        let raw;
        try {
          raw = await request.json();
        } catch {
          return json$3(400, { error: "invalid_json" });
        }
        const parsed = Payload$2.safeParse(raw);
        if (!parsed.success) {
          return json$3(400, {
            error: "invalid_payload",
            issues: parsed.error.flatten().fieldErrors
          });
        }
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
        const ipHash = hashIp$2(ip);
        if (ipHash && await rateLimited$2(ipHash)) {
          return json$3(429, { error: "rate_limited" });
        }
        const ua = request.headers.get("user-agent")?.slice(0, 512) ?? null;
        const { email, tier, note, source } = parsed.data;
        const { error } = await supabaseAdmin.from("waitlist_signups").insert({
          email,
          tier,
          note: note ?? null,
          source: source ?? null,
          user_agent: ua,
          ip_hash: ipHash
        });
        if (error && error.code !== "23505") {
          console.error("[waitlist] insert failed", error);
          return json$3(500, { error: "server_error" });
        }
        return json$3(200, { ok: true, tier });
      }
    }
  }
});
const SITE_NAME$3 = "satus.sh";
const LicenseDeliveryEmail = ({
  licenseKey = "satus_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  planLabel: planLabel2 = "Pro · monthly",
  renewsOn,
  manageUrl: manageUrl2
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { lang: "en", dir: "ltr", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
    "Your ",
    SITE_NAME$3,
    " license key."
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: main$2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: container$2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: brandRow$2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: wordmark$2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "satus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: wordmarkDot$2, children: "." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: label$2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: signal$2, children: "§OK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: pipe$2, children: " | " }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "License issued" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h1", style: h1$2, children: "your subscription is active." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr$2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: paragraph$2, children: "Thank you for subscribing. Below is the license key required to activate the satus CLI. Keep it private; one key, one workstation." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: keyBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: keyLabel, children: "LICENSE KEY" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: keyValue, children: licenseKey })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: metaTable$2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow$2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey$2, children: "plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue$2, children: planLabel2 })
      ] }),
      renewsOn && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow$2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey$2, children: "renews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue$2, children: renewsOn })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h2", style: h2$2, children: "activate the CLI" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: paragraph$2, children: "Install the binary, then export the key as an environment variable:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: codeBlock, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: codeLine, children: "npm i -g @passkeybridge/satus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: codeLine, children: [
        "export SATUS_LICENSE_KEY=",
        '"',
        licenseKey,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: codeLine, children: "satus init" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h2", style: h2$2, children: "manage billing" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: paragraph$2, children: "To change your payment method, download invoices, switch plan, or cancel, open the secure Stripe billing portal for this subscription:" }),
    manageUrl2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: { margin: "4px 0 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: manageUrl2, style: linkStyle$2, children: "→ manage subscription" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph$2, children: [
      "Or reply to this email or write to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "mailto:support@satus.sh", style: linkStyle$2, children: "support@satus.sh" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr$2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: footer$2, children: [
      SITE_NAME$3,
      " · A",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "https://passkeybridge.io", style: footerLink$2, children: "PasskeyBridge LLC" }),
      " ",
      "service ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: `mailto:support@satus.sh`, style: footerLink$2, children: "support@satus.sh" })
    ] })
  ] }) })
] });
const template$2 = {
  component: LicenseDeliveryEmail,
  subject: "Your satus.sh license key",
  displayName: "License delivery",
  previewData: {
    licenseKey: "satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3",
    planLabel: "Pro · monthly",
    renewsOn: "2026-06-26",
    manageUrl: "https://satus.sh/api/public/billing/portal?key=satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3"
  }
};
const monoStack$2 = '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const sansStack$2 = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
const main$2 = {
  backgroundColor: "#ffffff",
  fontFamily: sansStack$2,
  padding: "24px 0"
};
const container$2 = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "32px 28px",
  backgroundColor: "#fafaf7",
  border: "1px solid #e5e5e0"
};
const brandRow$2 = {
  margin: "0 0 28px",
  paddingBottom: "20px",
  borderBottom: "1px solid #e5e5e0"
};
const wordmark$2 = {
  fontFamily: monoStack$2,
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "#0a0a0a",
  margin: 0,
  lineHeight: 1
};
const wordmarkDot$2 = {
  color: "#dc2626"
};
const label$2 = {
  fontFamily: monoStack$2,
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#525252",
  margin: "0 0 20px"
};
const signal$2 = { color: "#dc2626" };
const pipe$2 = { color: "#e5e5e0", margin: "0 8px" };
const h1$2 = {
  fontFamily: monoStack$2,
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const h2$2 = {
  fontFamily: monoStack$2,
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "lowercase",
  color: "#0a0a0a",
  margin: "32px 0 12px"
};
const hr$2 = {
  border: "none",
  borderTop: "1px solid #0a0a0a",
  margin: "20px 0"
};
const paragraph$2 = {
  fontFamily: sansStack$2,
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const keyBox = {
  backgroundColor: "#0a0a0a",
  color: "#fafaf7",
  padding: "16px 18px",
  margin: "20px 0",
  border: "1px solid #0a0a0a"
};
const keyLabel = {
  fontFamily: monoStack$2,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#dc2626",
  margin: "0 0 6px"
};
const keyValue = {
  fontFamily: monoStack$2,
  fontSize: "14px",
  color: "#fafaf7",
  wordBreak: "break-all",
  margin: 0
};
const metaTable$2 = {
  borderTop: "1px solid #e5e5e0",
  borderBottom: "1px solid #e5e5e0",
  padding: "12px 0",
  margin: "20px 0 28px"
};
const metaRow$2 = {
  fontFamily: monoStack$2,
  fontSize: "12px",
  color: "#0a0a0a",
  margin: "4px 0",
  display: "flex",
  justifyContent: "space-between"
};
const metaKey$2 = { color: "#525252" };
const metaValue$2 = { color: "#0a0a0a" };
const codeBlock = {
  backgroundColor: "#0a0a0a",
  color: "#fafaf7",
  padding: "14px 16px",
  margin: "12px 0 20px"
};
const codeLine = {
  fontFamily: monoStack$2,
  fontSize: "12.5px",
  color: "#fafaf7",
  margin: "2px 0",
  wordBreak: "break-all"
};
const linkStyle$2 = {
  color: "#dc2626",
  fontFamily: monoStack$2,
  fontSize: "13px",
  textDecoration: "none"
};
const footer$2 = {
  fontFamily: monoStack$2,
  fontSize: "11px",
  color: "#525252",
  margin: "24px 0 0"
};
const footerLink$2 = { color: "#525252", textDecoration: "underline" };
const SITE_NAME$2 = "satus.sh";
const SubscriptionCanceledEmail = ({
  planLabel: planLabel2 = "Pro · monthly",
  accessEndsOn,
  manageUrl: manageUrl2
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { lang: "en", dir: "ltr", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
    "Your ",
    SITE_NAME$2,
    " subscription has been canceled."
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: main$1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: container$1, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: brandRow$1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: wordmark$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "satus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: wordmarkDot$1, children: "." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: label$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: signal$1, children: "§CANCELED" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: pipe$1, children: " | " }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subscription canceled" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h1", style: h1$1, children: "your subscription is canceled." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr$1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: paragraph$1, children: "We have processed your cancellation. Your license key will continue to work until the end of the current billing period; you will not be charged again." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: metaTable$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow$1, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey$1, children: "plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue$1, children: planLabel2 })
      ] }),
      accessEndsOn && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow$1, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey$1, children: "access ends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue$1, children: accessEndsOn })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h2", style: h2$1, children: "manage subscription" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph$1, children: [
      "You can reactivate, change plan, or update payment details in the Stripe billing portal for this subscription",
      accessEndsOn ? ` before ${accessEndsOn}` : "",
      ":"
    ] }),
    manageUrl2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: { margin: "4px 0 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: manageUrl2, style: linkStyle$1, children: "→ manage subscription" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph$1, children: [
      "Or reply to this email or write to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "mailto:support@satus.sh", style: linkStyle$1, children: "support@satus.sh" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr$1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: footer$1, children: [
      SITE_NAME$2,
      " · A",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "https://passkeybridge.io", style: footerLink$1, children: "PasskeyBridge LLC" }),
      " ",
      "service ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: `mailto:support@satus.sh`, style: footerLink$1, children: "support@satus.sh" })
    ] })
  ] }) })
] });
const template$1 = {
  component: SubscriptionCanceledEmail,
  subject: "Your satus.sh subscription has been canceled",
  displayName: "Subscription canceled",
  previewData: {
    planLabel: "Pro · monthly",
    accessEndsOn: "2026-06-26",
    manageUrl: "https://satus.sh/api/public/billing/portal?key=satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3"
  }
};
const monoStack$1 = '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const sansStack$1 = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
const main$1 = { backgroundColor: "#ffffff", fontFamily: sansStack$1, padding: "24px 0" };
const container$1 = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "32px 28px",
  backgroundColor: "#fafaf7",
  border: "1px solid #e5e5e0"
};
const brandRow$1 = { margin: "0 0 28px", paddingBottom: "20px", borderBottom: "1px solid #e5e5e0" };
const wordmark$1 = {
  fontFamily: monoStack$1,
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "#0a0a0a",
  margin: 0,
  lineHeight: 1
};
const wordmarkDot$1 = { color: "#dc2626" };
const label$1 = {
  fontFamily: monoStack$1,
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#525252",
  margin: "0 0 20px"
};
const signal$1 = { color: "#dc2626" };
const pipe$1 = { color: "#e5e5e0", margin: "0 8px" };
const h1$1 = {
  fontFamily: monoStack$1,
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const h2$1 = {
  fontFamily: monoStack$1,
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "lowercase",
  color: "#0a0a0a",
  margin: "32px 0 12px"
};
const hr$1 = { border: "none", borderTop: "1px solid #0a0a0a", margin: "20px 0" };
const paragraph$1 = {
  fontFamily: sansStack$1,
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const metaTable$1 = {
  borderTop: "1px solid #e5e5e0",
  borderBottom: "1px solid #e5e5e0",
  padding: "12px 0",
  margin: "20px 0 28px"
};
const metaRow$1 = {
  fontFamily: monoStack$1,
  fontSize: "12px",
  color: "#0a0a0a",
  margin: "4px 0",
  display: "flex",
  justifyContent: "space-between"
};
const metaKey$1 = { color: "#525252" };
const metaValue$1 = { color: "#0a0a0a" };
const linkStyle$1 = {
  color: "#dc2626",
  fontFamily: monoStack$1,
  fontSize: "13px",
  textDecoration: "none"
};
const footer$1 = { fontFamily: monoStack$1, fontSize: "11px", color: "#525252", margin: "24px 0 0" };
const footerLink$1 = { color: "#525252", textDecoration: "underline" };
const SITE_NAME$1 = "satus.sh";
const SubscriptionExpiredEmail = ({
  planLabel: planLabel2 = "Pro · monthly",
  manageUrl: manageUrl2
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { lang: "en", dir: "ltr", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
    "Your ",
    SITE_NAME$1,
    " subscription has ended."
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: main, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: brandRow, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: wordmark, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "satus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: wordmarkDot, children: "." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: label, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: signal, children: "§EXPIRED" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: pipe, children: " | " }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Access ended" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h1", style: h1, children: "your access has ended." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph, children: [
      "Your ",
      SITE_NAME$1,
      " subscription has reached the end of its paid period. The satus CLI will report your license as invalid on its next verification and any cached verdict will expire within 24 hours."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: metaTable, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey, children: "previous plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue, children: planLabel2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: metaRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaKey, children: "status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: metaValue, children: "expired" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h2", style: h2, children: "resubscribe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph, children: [
      "You can start a new subscription at any time at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "https://satus.sh/pricing", style: linkStyle, children: "satus.sh/pricing" }),
      "."
    ] }),
    manageUrl2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: paragraph, children: "To view past invoices or manage payment details on the previous subscription, open the Stripe billing portal:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: { margin: "4px 0 16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: manageUrl2, style: linkStyle, children: "→ manage subscription" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: paragraph, children: [
      "If you believe this is an error, reply to this email or write to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "mailto:support@satus.sh", style: linkStyle, children: "support@satus.sh" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: footer, children: [
      SITE_NAME$1,
      " · A",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: "https://passkeybridge.io", style: footerLink, children: "PasskeyBridge LLC" }),
      " ",
      "service ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { href: `mailto:support@satus.sh`, style: footerLink, children: "support@satus.sh" })
    ] })
  ] }) })
] });
const template = {
  component: SubscriptionExpiredEmail,
  subject: "Your satus.sh subscription has ended",
  displayName: "Subscription expired",
  previewData: {
    planLabel: "Pro · monthly",
    manageUrl: "https://satus.sh/api/public/billing/portal?key=satus_live_a3f9b8c1d2e3f4a5b6c7d8e9f0a1b2c3"
  }
};
const monoStack = '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const sansStack = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
const main = { backgroundColor: "#ffffff", fontFamily: sansStack, padding: "24px 0" };
const container = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "32px 28px",
  backgroundColor: "#fafaf7",
  border: "1px solid #e5e5e0"
};
const brandRow = { margin: "0 0 28px", paddingBottom: "20px", borderBottom: "1px solid #e5e5e0" };
const wordmark = {
  fontFamily: monoStack,
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "#0a0a0a",
  margin: 0,
  lineHeight: 1
};
const wordmarkDot = { color: "#dc2626" };
const label = {
  fontFamily: monoStack,
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#525252",
  margin: "0 0 20px"
};
const signal = { color: "#dc2626" };
const pipe = { color: "#e5e5e0", margin: "0 8px" };
const h1 = {
  fontFamily: monoStack,
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const h2 = {
  fontFamily: monoStack,
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "lowercase",
  color: "#0a0a0a",
  margin: "32px 0 12px"
};
const hr = { border: "none", borderTop: "1px solid #0a0a0a", margin: "20px 0" };
const paragraph = {
  fontFamily: sansStack,
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#0a0a0a",
  margin: "0 0 16px"
};
const metaTable = {
  borderTop: "1px solid #e5e5e0",
  borderBottom: "1px solid #e5e5e0",
  padding: "12px 0",
  margin: "20px 0 28px"
};
const metaRow = {
  fontFamily: monoStack,
  fontSize: "12px",
  color: "#0a0a0a",
  margin: "4px 0",
  display: "flex",
  justifyContent: "space-between"
};
const metaKey = { color: "#525252" };
const metaValue = { color: "#0a0a0a" };
const linkStyle = {
  color: "#dc2626",
  fontFamily: monoStack,
  fontSize: "13px",
  textDecoration: "none"
};
const footer = { fontFamily: monoStack, fontSize: "11px", color: "#525252", margin: "24px 0 0" };
const footerLink = { color: "#525252", textDecoration: "underline" };
const TEMPLATES = {
  "license-delivery": template$2,
  "subscription-canceled": template$1,
  "subscription-expired": template
};
const SITE_NAME = "satus";
const SENDER_DOMAIN = "mail.satus.sh";
const FROM_DOMAIN = "mail.satus.sh";
function redactEmail(email) {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const Route$8 = createFileRoute("/lovable/email/transactional/send")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = "https://xbnrjwzryuonuinzuomk.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        if (token !== supabaseServiceKey) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        let templateName;
        let recipientEmail;
        let idempotencyKey;
        let messageId;
        let templateData = {};
        try {
          const body = await request.json();
          templateName = body.templateName || body.template_name;
          recipientEmail = body.recipientEmail || body.recipient_email;
          messageId = crypto.randomUUID();
          idempotencyKey = body.idempotencyKey || body.idempotency_key || messageId;
          if (body.templateData && typeof body.templateData === "object") {
            templateData = body.templateData;
          }
        } catch {
          return Response.json(
            { error: "Invalid JSON in request body" },
            { status: 400 }
          );
        }
        if (!templateName) {
          return Response.json(
            { error: "templateName is required" },
            { status: 400 }
          );
        }
        const template2 = TEMPLATES[templateName];
        if (!template2) {
          console.error("Template not found in registry", { templateName });
          return Response.json(
            {
              error: `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(", ")}`
            },
            { status: 404 }
          );
        }
        const effectiveRecipient = template2.to || recipientEmail;
        if (!effectiveRecipient) {
          return Response.json(
            {
              error: "recipientEmail is required (unless the template defines a fixed recipient)"
            },
            { status: 400 }
          );
        }
        const { data: suppressed, error: suppressionError } = await supabase.from("suppressed_emails").select("id").eq("email", effectiveRecipient.toLowerCase()).maybeSingle();
        if (suppressionError) {
          console.error("Suppression check failed—refusing to send", {
            error: suppressionError,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          return Response.json(
            { error: "Failed to verify suppression status" },
            { status: 500 }
          );
        }
        if (suppressed) {
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "suppressed"
          });
          console.log("Email suppressed", {
            templateName,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          return Response.json({ success: false, reason: "email_suppressed" });
        }
        const normalizedEmail = effectiveRecipient.toLowerCase();
        let unsubscribeToken;
        const { data: existingToken, error: tokenLookupError } = await supabase.from("email_unsubscribe_tokens").select("token, used_at").eq("email", normalizedEmail).maybeSingle();
        if (tokenLookupError) {
          console.error("Token lookup failed", {
            error: tokenLookupError,
            email_redacted: redactEmail(normalizedEmail)
          });
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "failed",
            error_message: "Failed to look up unsubscribe token"
          });
          return Response.json(
            { error: "Failed to prepare email" },
            { status: 500 }
          );
        }
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token;
        } else if (!existingToken) {
          unsubscribeToken = generateToken();
          const { error: tokenError } = await supabase.from("email_unsubscribe_tokens").upsert(
            { token: unsubscribeToken, email: normalizedEmail },
            { onConflict: "email", ignoreDuplicates: true }
          );
          if (tokenError) {
            console.error("Failed to create unsubscribe token", {
              error: tokenError
            });
            await supabase.from("email_send_log").insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: effectiveRecipient,
              status: "failed",
              error_message: "Failed to create unsubscribe token"
            });
            return Response.json(
              { error: "Failed to prepare email" },
              { status: 500 }
            );
          }
          const { data: storedToken, error: reReadError } = await supabase.from("email_unsubscribe_tokens").select("token").eq("email", normalizedEmail).maybeSingle();
          if (reReadError || !storedToken) {
            console.error("Failed to read back unsubscribe token after upsert", {
              error: reReadError,
              email_redacted: redactEmail(normalizedEmail)
            });
            await supabase.from("email_send_log").insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: effectiveRecipient,
              status: "failed",
              error_message: "Failed to confirm unsubscribe token storage"
            });
            return Response.json(
              { error: "Failed to prepare email" },
              { status: 500 }
            );
          }
          unsubscribeToken = storedToken.token;
        } else {
          console.warn("Unsubscribe token already used but email not suppressed", {
            email_redacted: redactEmail(normalizedEmail)
          });
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "suppressed",
            error_message: "Unsubscribe token used but email missing from suppressed list"
          });
          return Response.json({ success: false, reason: "email_suppressed" });
        }
        const element = reactExports.createElement(template2.component, templateData);
        const html = await render(element);
        const plainText = await render(element, { plainText: true });
        const resolvedSubject = typeof template2.subject === "function" ? template2.subject(templateData) : template2.subject;
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: templateName,
          recipient_email: effectiveRecipient,
          status: "pending"
        });
        const { error: enqueueError } = await supabase.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: effectiveRecipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: resolvedSubject,
            html,
            text: plainText,
            purpose: "transactional",
            label: templateName,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
        if (enqueueError) {
          console.error("Failed to enqueue email", {
            error: enqueueError,
            templateName,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "failed",
            error_message: "Failed to enqueue email"
          });
          return Response.json(
            { error: "Failed to enqueue email" },
            { status: 500 }
          );
        }
        console.log("Transactional email enqueued", {
          templateName,
          recipient_redacted: redactEmail(effectiveRecipient)
        });
        return Response.json({ success: true, queued: true });
      }
    }
  }
});
const Route$7 = createFileRoute("/lovable/email/transactional/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace(/^Bearer\s+/i, "");
        if (token !== apiKey) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const templateNames = Object.keys(TEMPLATES);
        const results = [];
        for (const name of templateNames) {
          const entry = TEMPLATES[name];
          const displayName = entry.displayName || name;
          if (!entry.previewData) {
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "preview_data_required"
            });
            continue;
          }
          try {
            const html = await render(
              reactExports.createElement(entry.component, entry.previewData)
            );
            const resolvedSubject = typeof entry.subject === "function" ? entry.subject(entry.previewData) : entry.subject;
            results.push({
              templateName: name,
              displayName,
              subject: resolvedSubject,
              html,
              status: "ready"
            });
          } catch (err) {
            console.error("Failed to render template for preview", {
              template: name,
              error: err
            });
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "render_failed",
              errorMessage: err instanceof Error ? err.message : String(err)
            });
          }
        }
        return Response.json({ templates: results });
      }
    }
  }
});
const RESEND_API_URL$1 = "https://api.resend.com/emails";
class ResendAPIError extends Error {
  status;
  retryAfterSeconds;
  constructor(status, message, retryAfterSeconds = null) {
    super(`Resend API error ${status}: ${message}`);
    this.name = "ResendAPIError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
async function sendResendEmail(args) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };
  if (args.idempotencyKey) headers["Idempotency-Key"] = args.idempotencyKey;
  const res = await fetch(RESEND_API_URL$1, {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: args.from,
      to: Array.isArray(args.to) ? args.to : [args.to],
      subject: args.subject,
      ...args.html ? { html: args.html } : {},
      ...args.text ? { text: args.text } : {},
      ...args.headers ? { headers: args.headers } : {}
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const retryAfterHeader = res.headers.get("retry-after");
    const retryAfterSeconds = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) || null : null;
    throw new ResendAPIError(res.status, body.slice(0, 500), retryAfterSeconds);
  }
  return await res.json();
}
const MAX_RETRIES = 5;
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_SEND_DELAY_MS = 200;
const DEFAULT_AUTH_TTL_MINUTES = 15;
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60;
function isRateLimited(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 429;
  }
  return error instanceof Error && error.message.includes("429");
}
function isForbidden(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 403;
  }
  return error instanceof Error && error.message.includes("403");
}
function getRetryAfterSeconds(error) {
  if (error && typeof error === "object" && "retryAfterSeconds" in error) {
    return error.retryAfterSeconds ?? 60;
  }
  return 60;
}
async function moveToDlq(supabase, queue, msg, reason) {
  const payload = msg.message;
  await supabase.from("email_send_log").insert({
    message_id: payload.message_id,
    template_name: payload.label || queue,
    recipient_email: payload.to,
    status: "dlq",
    error_message: reason
  });
  const { error } = await supabase.rpc("move_to_dlq", {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload
  });
  if (error) {
    console.error("Failed to move message to DLQ", { queue, msg_id: msg.msg_id, reason, error });
  }
}
const Route$6 = createFileRoute("/lovable/email/queue/process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const resendKey = process.env.RESEND_API_KEY;
        const supabaseUrl = "https://xbnrjwzryuonuinzuomk.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!resendKey || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        if (token !== supabaseServiceKey) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: state } = await supabase.from("email_send_state").select("retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes").single();
        if (state?.retry_after_until && new Date(state.retry_after_until) > /* @__PURE__ */ new Date()) {
          return Response.json({ skipped: true, reason: "rate_limited" });
        }
        const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE;
        const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS;
        const ttlMinutes = {
          auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
          transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES
        };
        let totalProcessed = 0;
        for (const queue of ["auth_emails", "transactional_emails"]) {
          const { data: messages, error: readError } = await supabase.rpc("read_email_batch", {
            queue_name: queue,
            batch_size: batchSize,
            vt: 30
          });
          if (readError) {
            console.error("Failed to read email batch", { queue, error: readError });
            continue;
          }
          if (!messages?.length) continue;
          const messageIds = Array.from(
            new Set(
              messages.map(
                (msg) => msg?.message?.message_id && typeof msg.message.message_id === "string" ? msg.message.message_id : null
              ).filter((id) => Boolean(id))
            )
          );
          const failedAttemptsByMessageId = /* @__PURE__ */ new Map();
          if (messageIds.length > 0) {
            const { data: failedRows, error: failedRowsError } = await supabase.from("email_send_log").select("message_id").in("message_id", messageIds).eq("status", "failed");
            if (failedRowsError) {
              console.error("Failed to load failed-attempt counters", {
                queue,
                error: failedRowsError
              });
            } else {
              for (const row of failedRows ?? []) {
                const messageId = row?.message_id;
                if (typeof messageId !== "string" || !messageId) continue;
                failedAttemptsByMessageId.set(
                  messageId,
                  (failedAttemptsByMessageId.get(messageId) ?? 0) + 1
                );
              }
            }
          }
          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const payload = msg.message;
            const failedAttempts = payload?.message_id && typeof payload.message_id === "string" ? failedAttemptsByMessageId.get(payload.message_id) ?? 0 : msg.read_ct ?? 0;
            const queuedAt = payload.queued_at ?? msg.enqueued_at;
            if (queuedAt) {
              const ageMs = Date.now() - new Date(queuedAt).getTime();
              const maxAgeMs = ttlMinutes[queue] * 60 * 1e3;
              if (ageMs > maxAgeMs) {
                console.warn("Email expired (TTL exceeded)", {
                  queue,
                  msg_id: msg.msg_id,
                  queued_at: queuedAt,
                  ttl_minutes: ttlMinutes[queue]
                });
                await moveToDlq(supabase, queue, msg, `TTL exceeded (${ttlMinutes[queue]} minutes)`);
                continue;
              }
            }
            if (failedAttempts >= MAX_RETRIES) {
              await moveToDlq(supabase, queue, msg, `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`);
              continue;
            }
            if (payload.message_id) {
              const { data: alreadySent } = await supabase.from("email_send_log").select("id").eq("message_id", payload.message_id).eq("status", "sent").maybeSingle();
              if (alreadySent) {
                console.warn("Skipping duplicate send (already sent)", {
                  queue,
                  msg_id: msg.msg_id,
                  message_id: payload.message_id
                });
                const { error: dupDelError } = await supabase.rpc("delete_email", {
                  queue_name: queue,
                  message_id: msg.msg_id
                });
                if (dupDelError) {
                  console.error("Failed to delete duplicate message from queue", { queue, msg_id: msg.msg_id, error: dupDelError });
                }
                continue;
              }
            }
            try {
              const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://satus.sh";
              const unsubscribeHeaders = payload.unsubscribe_token ? {
                "List-Unsubscribe": `<${siteUrl}/email/unsubscribe?token=${payload.unsubscribe_token}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
              } : {};
              await sendResendEmail({
                to: payload.to,
                from: payload.from,
                subject: payload.subject,
                html: payload.html,
                text: payload.text,
                headers: unsubscribeHeaders,
                idempotencyKey: payload.idempotency_key || payload.message_id
              });
              await supabase.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "sent"
              });
              const { error: delError } = await supabase.rpc("delete_email", {
                queue_name: queue,
                message_id: msg.msg_id
              });
              if (delError) {
                console.error("Failed to delete sent message from queue", { queue, msg_id: msg.msg_id, error: delError });
              }
              totalProcessed++;
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              console.error("Email send failed", {
                queue,
                msg_id: msg.msg_id,
                read_ct: msg.read_ct,
                failed_attempts: failedAttempts,
                error: errorMsg
              });
              if (isRateLimited(error)) {
                await supabase.from("email_send_log").insert({
                  message_id: payload.message_id,
                  template_name: payload.label || queue,
                  recipient_email: payload.to,
                  status: "failed",
                  error_message: errorMsg.slice(0, 1e3)
                });
                const retryAfterSecs = getRetryAfterSeconds(error);
                await supabase.from("email_send_state").update({
                  retry_after_until: new Date(
                    Date.now() + retryAfterSecs * 1e3
                  ).toISOString(),
                  updated_at: (/* @__PURE__ */ new Date()).toISOString()
                }).eq("id", 1);
                return Response.json({ processed: totalProcessed, stopped: "rate_limited" });
              }
              if (isForbidden(error)) {
                await moveToDlq(supabase, queue, msg, errorMsg.slice(0, 1e3));
                return Response.json({ processed: totalProcessed, stopped: "forbidden" });
              }
              await supabase.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "failed",
                error_message: errorMsg.slice(0, 1e3)
              });
              if (payload?.message_id && typeof payload.message_id === "string") {
                failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1);
              }
            }
            if (i < messages.length - 1) {
              await new Promise((r) => setTimeout(r, sendDelayMs));
            }
          }
        }
        return Response.json({ processed: totalProcessed });
      }
    }
  }
});
const RESEND_API_URL = "https://api.resend.com";
const FROM = process.env.ALERTS_FROM_EMAIL ?? "satus alerts <alerts@mail.satus.sh>";
const TO = process.env.ALERTS_TO_EMAIL ?? "support@satus.sh";
async function claimDedupKey(args) {
  try {
    const { error } = await supabaseAdmin.from("webhook_alerts_sent").insert({
      event_id: args.eventId,
      event_type: args.eventType,
      environment: args.environment,
      error_message: args.errorMessage
    });
    if (!error) return true;
    const code = error.code;
    if (code === "23505") return false;
    console.error("[webhook-alerts] dedup insert failed, will alert anyway", error);
    return true;
  } catch (err) {
    console.error("[webhook-alerts] dedup threw, will alert anyway", err);
    return true;
  }
}
function toMessage(err) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
function toStack(err) {
  if (err instanceof Error && err.stack) return err.stack;
  return null;
}
function renderEmail(args) {
  const subject = `[satus][${args.environment}] Stripe webhook failed: ${args.eventType}`;
  const message = toMessage(args.error);
  const stack = toStack(args.error);
  const lines = [
    `Stripe webhook handler returned an error.`,
    ``,
    `event id     : ${args.eventId ?? "(pre-verify, none)"}`,
    `event type   : ${args.eventType}`,
    `environment  : ${args.environment}`,
    `dedup key    : ${args.dedupKey}`,
    `occurred at  : ${(/* @__PURE__ */ new Date()).toISOString()}`,
    ``,
    `error message:`,
    message,
    ``
  ];
  if (stack) {
    lines.push("stack trace:", stack, "");
  }
  lines.push(
    `What to check:`,
    `  - Stripe dashboard -> Developers -> Events -> ${args.eventId ?? "(n/a)"}`,
    `  - public.licenses for the affected subscription`,
    `  - Recent migrations / deploys that might have broken the handler`,
    ``,
    `Stripe will keep retrying 5xx responses for up to 3 days. A retry-storm`,
    `for this same event will NOT trigger a second email — dedup key above`,
    `was claimed in public.webhook_alerts_sent.`
  );
  return { subject, text: lines.join("\n") };
}
async function notifyWebhookFailure(args) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[webhook-alerts] missing RESEND_API_KEY; skipping alert");
      return;
    }
    const dedupKey = args.eventId ?? `prelim-${args.environment}-${args.eventType}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
    const errorMessage = toMessage(args.error).slice(0, 1900);
    const owned = await claimDedupKey({
      eventId: dedupKey,
      eventType: args.eventType,
      environment: args.environment,
      errorMessage
    });
    if (!owned) return;
    const { subject, text } = renderEmail({ ...args, dedupKey });
    const res = await fetch(`${RESEND_API_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        text
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[webhook-alerts] resend non-2xx", res.status, body.slice(0, 500));
    }
  } catch (err) {
    console.error("[webhook-alerts] unexpected failure", err);
  }
}
const PLAN_LABELS = {
  satus_pro_monthly: "Pro · monthly",
  satus_pro_yearly: "Pro · yearly",
  satus_team_seat_monthly: "Team seat · monthly"
};
function generateLicenseKey(env) {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  const prefix = env === "live" ? "satus_live_" : "satus_test_";
  return prefix + hex;
}
function planLabel(plan) {
  if (!plan) return "satus.sh subscription";
  return PLAN_LABELS[plan] ?? plan;
}
function isoDateOnly(ts) {
  if (!ts) return null;
  const d = typeof ts === "number" ? new Date(ts * 1e3) : new Date(ts);
  return d.toISOString().slice(0, 10);
}
function manageUrl(licenseKey) {
  return `https://satus.sh/api/public/billing/portal?key=${encodeURIComponent(licenseKey)}`;
}
async function enqueueTransactionalEmail(args) {
  const origin = process.env.PUBLIC_SITE_URL ?? "https://satus.sh";
  const res = await fetch(`${origin}/lovable/email/transactional/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      templateName: args.templateName,
      recipientEmail: args.recipientEmail,
      idempotencyKey: args.idempotencyKey,
      templateData: args.templateData
    })
  }).catch((err) => {
    console.error("[payments-webhook] email enqueue failed", args.templateName, err);
    return null;
  });
  if (res && !res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[payments-webhook] email enqueue non-2xx", args.templateName, res.status, body);
  }
}
async function handleCheckoutCompleted(session, env) {
  if (session.mode !== "subscription") return;
  const subscriptionId = session.subscription;
  if (!subscriptionId) return;
  const email = session.customer_details?.email ?? session.customer_email ?? void 0;
  if (!email) {
    console.error("[payments-webhook] no email on session", session.id);
    return;
  }
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
  if (!customerId) return;
  const stripe = createStripeClient(env);
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const item = sub.items?.data?.[0];
  const price = item?.price;
  const plan = price?.lookup_key ?? price?.id ?? "unknown";
  const periodEnd = item?.current_period_end ?? sub.current_period_end ?? null;
  const { data: existing } = await supabaseAdmin.from("licenses").select("license_key").eq("stripe_subscription_id", subscriptionId).maybeSingle();
  const licenseKey = existing?.license_key ?? generateLicenseKey(env);
  const { error } = await supabaseAdmin.from("licenses").upsert(
    {
      license_key: licenseKey,
      email: email.toLowerCase(),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      plan,
      status: sub.status,
      environment: env,
      current_period_end: periodEnd ? new Date(periodEnd * 1e3).toISOString() : null,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      revoked_at: null
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (error) {
    console.error("[payments-webhook] license upsert failed", error);
    return;
  }
  await enqueueTransactionalEmail({
    templateName: "license-delivery",
    recipientEmail: email,
    idempotencyKey: `license-${subscriptionId}`,
    templateData: {
      licenseKey,
      planLabel: planLabel(plan),
      renewsOn: isoDateOnly(periodEnd),
      manageUrl: manageUrl(licenseKey)
    }
  });
}
async function handleSubscriptionUpdated(subscription, env) {
  const item = subscription.items?.data?.[0];
  const plan = item?.price?.lookup_key ?? item?.price?.id ?? "unknown";
  const periodEnd = item?.current_period_end ?? subscription.current_period_end ?? null;
  const cancelAtPeriodEnd = subscription.cancel_at_period_end ?? false;
  const { data: existing } = await supabaseAdmin.from("licenses").select("email, cancel_at_period_end, license_key").eq("stripe_subscription_id", subscription.id).eq("environment", env).maybeSingle();
  const { error: updateErr } = await supabaseAdmin.from("licenses").update({
    status: subscription.status,
    plan,
    current_period_end: periodEnd ? new Date(periodEnd * 1e3).toISOString() : null,
    cancel_at_period_end: cancelAtPeriodEnd
  }).eq("stripe_subscription_id", subscription.id).eq("environment", env);
  if (updateErr) {
    throw new Error(`license update failed: ${updateErr.message}`);
  }
  if (existing?.email && cancelAtPeriodEnd && !existing.cancel_at_period_end) {
    await enqueueTransactionalEmail({
      templateName: "subscription-canceled",
      recipientEmail: existing.email,
      idempotencyKey: `cancel-${subscription.id}`,
      templateData: {
        planLabel: planLabel(plan),
        accessEndsOn: isoDateOnly(periodEnd),
        manageUrl: existing.license_key ? manageUrl(existing.license_key) : void 0
      }
    });
  }
}
async function handleSubscriptionDeleted(subscription, env) {
  const { data: existing } = await supabaseAdmin.from("licenses").select("email, plan, license_key, cancel_at_period_end").eq("stripe_subscription_id", subscription.id).eq("environment", env).maybeSingle();
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const { error: revokeErr } = await supabaseAdmin.from("licenses").update({
    status: "canceled",
    revoked_at: nowIso
  }).eq("stripe_subscription_id", subscription.id).eq("environment", env);
  if (revokeErr) {
    throw new Error(`license revoke failed: ${revokeErr.message}`);
  }
  if (!existing?.email) return;
  const scheduledCancel = existing.cancel_at_period_end === true;
  const licenseKey = existing.license_key ?? null;
  if (scheduledCancel) {
    await enqueueTransactionalEmail({
      templateName: "subscription-expired",
      recipientEmail: existing.email,
      idempotencyKey: `expired-${subscription.id}`,
      templateData: {
        planLabel: planLabel(existing.plan),
        manageUrl: licenseKey ? manageUrl(licenseKey) : void 0
      }
    });
  } else {
    await enqueueTransactionalEmail({
      templateName: "subscription-canceled",
      recipientEmail: existing.email,
      idempotencyKey: `cancel-immediate-${subscription.id}`,
      templateData: {
        planLabel: planLabel(existing.plan),
        accessEndsOn: nowIso.slice(0, 10),
        manageUrl: licenseKey ? manageUrl(licenseKey) : void 0
      }
    });
  }
}
async function subscriptionIdFromCharge(charge, env) {
  const invoiceField = charge?.invoice;
  if (!invoiceField) return null;
  if (typeof invoiceField === "object") {
    const sub2 = invoiceField.subscription;
    return typeof sub2 === "string" ? sub2 : sub2?.id ?? null;
  }
  const stripe = createStripeClient(env);
  const invoice = await stripe.invoices.retrieve(invoiceField);
  const sub = invoice.subscription;
  return typeof sub === "string" ? sub : sub?.id ?? null;
}
async function handleChargeRefunded(charge, env) {
  const subscriptionId = await subscriptionIdFromCharge(charge, env);
  if (!subscriptionId) {
    console.log("[payments-webhook] charge.refunded with no subscription", charge.id);
    return;
  }
  const { data: existing } = await supabaseAdmin.from("licenses").select("email, plan, revoked_at").eq("stripe_subscription_id", subscriptionId).eq("environment", env).maybeSingle();
  if (!existing) {
    console.log("[payments-webhook] charge.refunded: no license for", subscriptionId);
    return;
  }
  if (existing.revoked_at) return;
  const { error } = await supabaseAdmin.from("licenses").update({
    status: "refunded",
    revoked_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("stripe_subscription_id", subscriptionId).eq("environment", env);
  if (error) {
    console.error("[payments-webhook] refund revoke failed", error);
    return;
  }
  if (existing.email) {
    await enqueueTransactionalEmail({
      templateName: "subscription-expired",
      recipientEmail: existing.email,
      idempotencyKey: `refunded-${subscriptionId}`,
      templateData: {
        planLabel: planLabel(existing.plan)
      }
    });
  }
}
const Route$5 = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("[payments-webhook] invalid env query", rawEnv);
          await notifyWebhookFailure({
            eventId: null,
            eventType: "env-query-invalid",
            environment: "unknown",
            error: new Error(
              `Webhook called with invalid env query parameter: ${JSON.stringify(rawEnv)}. Expected 'sandbox' or 'live'. Check the Stripe webhook endpoint URL.`
            )
          });
          return new Response("Missing or invalid env query parameter", { status: 400 });
        }
        const env = rawEnv;
        let event;
        try {
          event = await verifyWebhook(request, env);
        } catch (err) {
          console.error("[payments-webhook] signature verification failed", err);
          return new Response("Invalid signature", { status: 400 });
        }
        try {
          switch (event.type) {
            case "checkout.session.completed":
              await handleCheckoutCompleted(event.data.object, env);
              break;
            case "customer.subscription.updated":
              await handleSubscriptionUpdated(event.data.object, env);
              break;
            case "customer.subscription.deleted":
              await handleSubscriptionDeleted(event.data.object, env);
              break;
            case "charge.refunded":
              await handleChargeRefunded(event.data.object, env);
              break;
            default:
              break;
          }
          return Response.json({ received: true });
        } catch (err) {
          console.error("[payments-webhook] handler error", event.type, err);
          await notifyWebhookFailure({
            eventId: event.id ?? null,
            eventType: event.type,
            environment: env,
            error: err
          });
          return new Response("Handler error", { status: 500 });
        }
      }
    }
  }
});
const CORS$2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
const json$2 = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", ...CORS$2 }
});
const RATE_BUCKET$1 = "license_verify";
const RATE_WINDOW_SECONDS$1 = 600;
const RATE_LIMIT$1 = 60;
async function rateLimited$1(key) {
  const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
    p_bucket: RATE_BUCKET$1,
    p_key: key,
    p_window_seconds: RATE_WINDOW_SECONDS$1
  });
  if (error) {
    console.error("[license/verify] rate-limit counter failed", error);
    return false;
  }
  return typeof data === "number" && data > RATE_LIMIT$1;
}
function hashIp$1(ip) {
  if (!ip) return null;
  return crypto$1.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
function normalizePlan(raw) {
  if (!raw) return null;
  if (raw.includes("team")) return "team";
  if (raw.includes("pro")) return "pro";
  return raw;
}
const Payload$1 = objectType({
  key: stringType().min(20).max(80).regex(/^satus_(live|test)_[a-f0-9]{32}$/)
});
const Route$4 = createFileRoute("/api/public/license/verify")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$2 }),
      POST: async ({ request }) => {
        let raw;
        try {
          raw = await request.json();
        } catch {
          return json$2(400, { valid: false, reason: "invalid_json" });
        }
        const parsed = Payload$1.safeParse(raw);
        if (!parsed.success) {
          return json$2(400, { valid: false, reason: "invalid_key_format" });
        }
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
        const ipHash = hashIp$1(ip);
        if (ipHash && await rateLimited$1(ipHash)) {
          return json$2(429, { valid: false, reason: "rate_limited" });
        }
        const { data, error } = await supabaseAdmin.from("licenses").select("plan, status, current_period_end, revoked_at").eq("license_key", parsed.data.key).maybeSingle();
        if (error) {
          console.error("[license/verify] lookup failed", error);
          return json$2(500, { valid: false, reason: "server_error" });
        }
        if (!data) {
          return json$2(200, { valid: false, reason: "unknown_key" });
        }
        if (data.revoked_at) {
          return json$2(200, { valid: false, reason: "revoked" });
        }
        const now = Date.now();
        const periodEnd = data.current_period_end ? new Date(data.current_period_end).getTime() : null;
        if (periodEnd !== null && periodEnd <= now) {
          return json$2(200, { valid: false, reason: "expired" });
        }
        const goodStatus = ["active", "trialing", "past_due"].includes(
          data.status
        );
        const canceledButInPeriod = data.status === "canceled" && periodEnd !== null && periodEnd > now;
        if (!(goodStatus || canceledButInPeriod)) {
          return json$2(200, { valid: false, reason: "inactive" });
        }
        return json$2(200, {
          valid: true,
          plan: normalizePlan(data.plan),
          expires_at: data.current_period_end
        });
      }
    }
  }
});
const ORIGIN = "https://satus.sh";
const TEST_KEY = "satus_test_e2e0e2e0e2e0e2e0e2e0e2e0e2e0e2e0";
const ALERT_TO = "support@satus.sh";
const ALERT_FROM = "satus.sh alerts <alerts@mail.satus.sh>";
async function timed(name, fn) {
  const start = Date.now();
  try {
    const r = await fn();
    return { name, ok: r.ok, duration_ms: Date.now() - start, detail: r.detail, error: r.error };
  } catch (e) {
    return {
      name,
      ok: false,
      duration_ms: Date.now() - start,
      error: e instanceof Error ? e.message : String(e)
    };
  }
}
async function checkLicenseVerify() {
  return timed("license_verify", async () => {
    const res = await fetch(`${ORIGIN}/api/public/license/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: TEST_KEY })
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const body = await res.json();
    if (body.valid !== true) return { ok: false, detail: body, error: "not_valid" };
    return { ok: true, detail: { plan: body.plan } };
  });
}
async function checkWebhookSignature() {
  return timed("webhook_signature", async () => {
    const res = await fetch(`${ORIGIN}/api/public/payments/webhook?env=sandbox`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    if (res.status >= 400 && res.status < 500) {
      return { ok: true, detail: { status: res.status } };
    }
    return { ok: false, error: `unexpected_status_${res.status}` };
  });
}
async function checkAuthMagicLink() {
  return timed("auth_magiclink", async () => {
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: "e2e+monitor@satus.sh"
    });
    if (error) return { ok: false, error: error.message };
    const link = data?.properties?.action_link;
    if (!link || typeof link !== "string") return { ok: false, error: "no_action_link" };
    return { ok: true, detail: { has_link: true } };
  });
}
async function checkEmailQueue() {
  return timed("email_queue", async () => {
    const { data: state, error: stateErr } = await supabaseAdmin.from("email_send_state").select("retry_after_until").eq("id", 1).maybeSingle();
    if (stateErr) return { ok: false, error: `state: ${stateErr.message}` };
    if (state?.retry_after_until && new Date(state.retry_after_until) > /* @__PURE__ */ new Date()) {
      return { ok: false, error: `rate_limited_until_${state.retry_after_until}` };
    }
    const { error: supErr } = await supabaseAdmin.from("suppressed_emails").select("email", { count: "exact", head: true });
    if (supErr) return { ok: false, error: `suppressed_emails: ${supErr.message}` };
    return { ok: true, detail: { rate_limited: false, suppressed_reachable: true } };
  });
}
async function sendFailureAlert(checks) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error("[e2e] cannot send alert, missing RESEND_API_KEY");
    return;
  }
  const failed = checks.filter((c) => !c.ok);
  const lines = checks.map(
    (c) => `${c.ok ? "PASS" : "FAIL"}  ${c.name.padEnd(20)}  ${c.duration_ms}ms` + (c.error ? `  ${c.error}` : "")
  );
  const subject = `[satus.sh] E2E FAIL—${failed.map((c) => c.name).join(", ")}`;
  const text = [
    `Daily E2E health check failed at ${(/* @__PURE__ */ new Date()).toISOString()}.`,
    "",
    "Results:",
    ...lines,
    "",
    "Failure detail:",
    JSON.stringify(failed, null, 2),
    "",
    "Site:    https://satus.sh",
    "Runbook: tail e2e_health_log, then re-run /api/public/hooks/e2e-health"
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [ALERT_TO],
      subject,
      text
    })
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`[e2e] Resend alert failed [${res.status}]: ${body}`);
  }
}
async function runE2E(triggeredBy) {
  const start = Date.now();
  const checks = await Promise.all([
    checkLicenseVerify(),
    checkWebhookSignature(),
    checkAuthMagicLink(),
    checkEmailQueue()
  ]);
  const duration_ms = Date.now() - start;
  const failed = checks.filter((c) => !c.ok);
  const status = failed.length === 0 ? "pass" : "fail";
  await supabaseAdmin.from("e2e_health_log").insert({
    status,
    duration_ms,
    checks: JSON.parse(JSON.stringify(checks)),
    error_message: failed.length === 0 ? null : failed.map((c) => `${c.name}: ${c.error ?? "failed"}`).join("; "),
    triggered_by: triggeredBy
  });
  if (status === "fail") {
    await sendFailureAlert(checks);
  }
  return { status, duration_ms, checks };
}
function publicSafe(result) {
  return {
    status: result.status,
    duration_ms: result.duration_ms,
    checks: result.checks.map((c) => ({
      name: c.name,
      ok: c.ok,
      duration_ms: c.duration_ms,
      ...c.ok ? {} : { error: "internal_error" }
    }))
  };
}
function sanitizeBy(raw) {
  if (!raw) return "manual";
  const cleaned = raw.replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 64);
  return cleaned.length > 0 ? cleaned : "manual";
}
const Route$3 = createFileRoute("/api/public/hooks/e2e-health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const result = await runE2E(sanitizeBy(url.searchParams.get("by")));
        return new Response(JSON.stringify(publicSafe(result), null, 2), {
          status: result.status === "pass" ? 200 : 500,
          headers: { "Content-Type": "application/json" }
        });
      },
      POST: async () => {
        const result = await runE2E("cron");
        return new Response(JSON.stringify(publicSafe(result)), {
          status: result.status === "pass" ? 200 : 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
const CORS$1 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
const json$1 = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", ...CORS$1 }
});
const ident = stringType().min(1).max(63).regex(/^[a-zA-Z_][a-zA-Z0-9_$]*$/);
const Column = objectType({
  name: ident,
  /** information_schema.data_type, e.g. "text", "integer", "numeric". */
  dataType: stringType().min(1).max(40),
  /** pg udt name, e.g. "int4", "uuid", or the enum type name. */
  udtName: stringType().min(1).max(63),
  nullable: booleanType(),
  maxLength: numberType().int().positive().max(1e4).nullable(),
  /** Present when the column is a Postgres enum. */
  enumValues: arrayType(stringType().min(1).max(64)).max(24).optional()
});
const Table = objectType({
  name: ident,
  /** Columns the model should fill (no PKs-with-defaults, no FKs, no generated). */
  columns: arrayType(Column).min(1).max(14)
});
const Payload = objectType({
  profile: enumType(["saas", "ecommerce", "b2b"]),
  rows: numberType().int().min(1).max(5),
  tables: arrayType(Table).min(1).max(6)
});
const RATE_BUCKET_IP = "demo_generate_ip";
const RATE_LIMIT_IP = 10;
const RATE_BUCKET_GLOBAL = "demo_generate_global";
const RATE_LIMIT_GLOBAL = 300;
async function overLimit(bucket, key, windowSeconds, limit) {
  const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
    p_bucket: bucket,
    p_key: key,
    p_window_seconds: windowSeconds
  });
  if (error) {
    console.error("[demo] rate-limit counter failed", error);
    return true;
  }
  return typeof data === "number" && data > limit;
}
function hashIp(ip) {
  if (!ip) return "unknown";
  return crypto$1.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
const PROFILE_HINTS = {
  saas: "B2B SaaS: startup company names, workplace emails, job titles, plan-style enums, dates in the last 18 months.",
  ecommerce: "Consumer e-commerce: real-sounding product names, prices ending .99/.49/.00 between 9.99 and 299.99, US/UK/DE/FR/JP customer names, statuses biased toward fulfilled.",
  b2b: "B2B services: mid-market company names, contract values $5k–$250k, PO numbers, NET-30 terms. No consumer language."
};
const ANTHROPIC_MODEL = "claude-haiku-4-5";
function anthropicBase() {
  const raw = process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com/v1";
  const trimmed = raw.replace(/\/+$/, "");
  return /\/v\d+$/.test(trimmed) ? trimmed : `${trimmed}/v1`;
}
function buildToolSchema(tables, rows) {
  const properties = {};
  for (const t of tables) {
    const colProps = {};
    for (const c of t.columns) {
      if (c.enumValues && c.enumValues.length > 0) {
        colProps[c.name] = { enum: c.enumValues };
      } else if (/int|numeric|float|double|real|decimal/i.test(c.dataType)) {
        colProps[c.name] = { type: c.nullable ? ["number", "null"] : "number" };
      } else if (/bool/i.test(c.dataType)) {
        colProps[c.name] = { type: c.nullable ? ["boolean", "null"] : "boolean" };
      } else {
        colProps[c.name] = {
          type: c.nullable ? ["string", "null"] : "string",
          ...c.maxLength ? { maxLength: c.maxLength } : {}
        };
      }
    }
    properties[t.name] = {
      type: "array",
      minItems: rows,
      maxItems: rows,
      items: {
        type: "object",
        properties: colProps,
        required: t.columns.map((c) => c.name),
        additionalProperties: false
      }
    };
  }
  return {
    type: "object",
    properties,
    required: tables.map((t) => t.name),
    additionalProperties: false
  };
}
const Route$2 = createFileRoute("/api/public/demo/generate")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$1 }),
      POST: async ({ request }) => {
        const apiKey = process.env.DEMO_ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return json$1(503, { error: "demo_unavailable" });
        }
        let raw;
        try {
          raw = await request.json();
        } catch {
          return json$1(400, { error: "invalid_json" });
        }
        const parsed = Payload.safeParse(raw);
        if (!parsed.success) {
          return json$1(400, { error: "invalid_payload" });
        }
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
        if (await overLimit(RATE_BUCKET_IP, hashIp(ip), 3600, RATE_LIMIT_IP)) {
          return json$1(429, { error: "rate_limited", scope: "ip" });
        }
        if (await overLimit(RATE_BUCKET_GLOBAL, "all", 86400, RATE_LIMIT_GLOBAL)) {
          return json$1(429, { error: "rate_limited", scope: "global" });
        }
        const { tables, rows, profile } = parsed.data;
        const toolSchema = buildToolSchema(tables, rows);
        const system = `You generate realistic seed data. ${PROFILE_HINTS[profile]} Return ONLY data conforming to the provided JSON schema. Vary values; never repeat row 1 for row N. Unique-looking columns (emails, skus, names) must be distinct within each table.`;
        const user = `Generate exactly ${rows} rows for each of these Postgres tables: ` + tables.map((t) => t.name).join(", ") + `. Column names, types, and allowed enum values are encoded in the tool schema.`;
        const res = await fetch(`${anthropicBase()}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: ANTHROPIC_MODEL,
            max_tokens: 4096,
            system,
            messages: [{ role: "user", content: user }],
            tools: [
              {
                name: "emit_rows",
                description: "Emit the requested structured rows.",
                input_schema: toolSchema
              }
            ],
            tool_choice: { type: "tool", name: "emit_rows" }
          })
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("[demo] anthropic error", res.status, text.slice(0, 300));
          return json$1(502, { error: "generation_failed" });
        }
        const payload = await res.json();
        const toolUse = payload.content?.find(
          (b) => b.type === "tool_use" && b.name === "emit_rows"
        );
        if (!toolUse?.input) {
          return json$1(502, { error: "generation_failed" });
        }
        return json$1(200, {
          tables: toolUse.input,
          usage: {
            input_tokens: payload.usage?.input_tokens ?? 0,
            output_tokens: payload.usage?.output_tokens ?? 0
          }
        });
      }
    }
  }
});
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", ...CORS }
});
const TableReport = objectType({
  name: stringType().min(1).max(128).regex(/^[a-zA-Z0-9_]+$/),
  rows_generated: numberType().int().min(0).max(1e6)
});
const LEGACY_DROPPED_KEYS = ["tables", "target_schema", "error_message", "license_key"];
const RunSchema = objectType({
  id: stringType().uuid().optional(),
  status: enumType(["running", "success", "failed"]),
  profile: stringType().min(1).max(32).optional(),
  // v0.3.0 (optional, backward-compatible with v0.2.x clients which omit it).
  provider: enumType(["openai", "anthropic"]).optional(),
  model: stringType().min(1).max(64).optional(),
  // v0.3.7: replaces the per-table `tables` array.
  table_count: numberType().int().min(0).max(1e4).optional(),
  total_rows: numberType().int().min(0).max(1e7).optional(),
  total_cost_usd: numberType().min(0).max(1e4).optional(),
  // v0.3.0 token counts (optional). Bounded to prevent abuse but generous.
  input_tokens: numberType().int().min(0).max(1e9).optional(),
  output_tokens: numberType().int().min(0).max(1e9).optional(),
  duration_ms: numberType().int().min(0).max(24 * 60 * 60 * 1e3).optional(),
  // v0.3.7: fixed-vocabulary failure class; replaces free-text error_message.
  error_class: stringType().min(1).max(64).regex(/^[a-zA-Z0-9_]+$/).optional(),
  cli_version: stringType().min(1).max(32).optional(),
  environment: enumType(["dev", "live"]).default("dev"),
  // --- Legacy, accepted then discarded. See the header. ---
  license_key: stringType().min(8).max(128).optional(),
  target_schema: stringType().min(1).max(64).optional(),
  tables: arrayType(TableReport).max(200).optional(),
  error_message: stringType().max(2e3).optional(),
  // v0.3.3 opt-in telemetry (all optional; older CLIs never send these).
  // Fingerprint is a 64-char lowercase hex SHA-256; anything else is
  // rejected before it lands in the DB.
  schema_fingerprint: stringType().regex(/^[0-9a-f]{64}$/).optional(),
  validator_class: stringType().min(1).max(64).optional(),
  invocation_sequence: arrayType(stringType().min(1).max(32)).max(16).optional()
});
function toRow(data) {
  const row = { ...data };
  for (const key of LEGACY_DROPPED_KEYS) delete row[key];
  row.finished_at = data.status === "running" ? null : (/* @__PURE__ */ new Date()).toISOString();
  return row;
}
const Route$1 = createFileRoute("/api/public/cli/run")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let body;
        try {
          body = await request.json();
        } catch {
          return json(400, { ok: false, reason: "invalid_json" });
        }
        const parsed = RunSchema.safeParse(body);
        if (!parsed.success) {
          return json(400, { ok: false, reason: "invalid_payload", issues: parsed.error.issues });
        }
        const row = toRow(parsed.data);
        if (parsed.data.id) {
          const { error: error2 } = await supabaseAdmin.from("satus_runs").upsert(row, { onConflict: "id" });
          if (error2) return json(500, { ok: false, reason: "db_error", detail: error2.message });
          return json(200, { ok: true, id: parsed.data.id });
        }
        const { data, error } = await supabaseAdmin.from("satus_runs").insert(row).select("id").single();
        if (error) return json(500, { ok: false, reason: "db_error", detail: error.message });
        return json(200, { ok: true, id: data.id });
      }
    }
  }
});
const RATE_BUCKET = "billing_portal";
const RATE_WINDOW_SECONDS = 3600;
const RATE_LIMIT = 10;
const KEY_RE = /^satus_(live|test)_[a-f0-9]{32}$/;
const QuerySchema = objectType({
  key: stringType().min(20).max(80).regex(KEY_RE)
});
async function rateLimited(key) {
  const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
    p_bucket: RATE_BUCKET,
    p_key: key,
    p_window_seconds: RATE_WINDOW_SECONDS
  });
  if (error) {
    console.error("[billing/portal] rate-limit counter failed", error);
    return false;
  }
  return typeof data === "number" && data > RATE_LIMIT;
}
function plainError(status, message) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
const Route = createFileRoute("/api/public/billing/portal")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = QuerySchema.safeParse({ key: url.searchParams.get("key") });
        if (!parsed.success) {
          return plainError(400, "Missing or malformed license key.");
        }
        const licenseKey = parsed.data.key;
        const env = licenseKey.startsWith("satus_live_") ? "live" : "sandbox";
        if (await rateLimited(licenseKey)) {
          return plainError(429, "Too many portal requests. Try again shortly.");
        }
        const { data: license, error: lookupErr } = await supabaseAdmin.from("licenses").select("stripe_customer_id, environment").eq("license_key", licenseKey).maybeSingle();
        if (lookupErr) {
          console.error("[billing/portal] lookup failed", lookupErr);
          return plainError(500, "Server error.");
        }
        if (!license || !license.stripe_customer_id) {
          return plainError(404, "License not found.");
        }
        if (license.environment !== env) {
          console.error("[billing/portal] env mismatch for key", {
            keyEnv: env,
            rowEnv: license.environment
          });
          return plainError(404, "License not found.");
        }
        try {
          const stripe = createStripeClient(env);
          const session = await stripe.billingPortal.sessions.create({
            customer: license.stripe_customer_id,
            return_url: "https://satus.sh/"
          });
          return Response.redirect(session.url, 302);
        } catch (err) {
          console.error("[billing/portal] session create failed", err);
          return plainError(502, "Could not open the billing portal. Email support@satus.sh.");
        }
      }
    }
  }
});
const UnsubscribeRoute = Route$y.update({
  id: "/unsubscribe",
  path: "/unsubscribe",
  getParentRoute: () => Route$z
});
const TermsRoute = Route$x.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$z
});
const SitemapDotxmlRoute = Route$w.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$z
});
const SecurityRoute = Route$v.update({
  id: "/security",
  path: "/security",
  getParentRoute: () => Route$z
});
const RecipesRoute = Route$u.update({
  id: "/recipes",
  path: "/recipes",
  getParentRoute: () => Route$z
});
const QuickstartRoute = Route$t.update({
  id: "/quickstart",
  path: "/quickstart",
  getParentRoute: () => Route$z
});
const ProfilesRoute = Route$s.update({
  id: "/profiles",
  path: "/profiles",
  getParentRoute: () => Route$z
});
const PrivacyRoute = Route$r.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$z
});
const PricingRoute = Route$q.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$z
});
const DemoRoute = Route$p.update({
  id: "/demo",
  path: "/demo",
  getParentRoute: () => Route$z
});
const CompareRoute = Route$o.update({
  id: "/compare",
  path: "/compare",
  getParentRoute: () => Route$z
});
const CliRoute = Route$n.update({
  id: "/cli",
  path: "/cli",
  getParentRoute: () => Route$z
});
const IndexRoute = Route$m.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$z
});
const DocsIndexRoute = Route$l.update({
  id: "/docs/",
  path: "/docs/",
  getParentRoute: () => Route$z
});
const CheckoutIndexRoute = Route$k.update({
  id: "/checkout/",
  path: "/checkout/",
  getParentRoute: () => Route$z
});
const BlogIndexRoute = Route$j.update({
  id: "/blog/",
  path: "/blog/",
  getParentRoute: () => Route$z
});
const EmailUnsubscribeRoute = Route$i.update({
  id: "/email/unsubscribe",
  path: "/email/unsubscribe",
  getParentRoute: () => Route$z
});
const DocsTroubleshootingRoute = Route$h.update({
  id: "/docs/troubleshooting",
  path: "/docs/troubleshooting",
  getParentRoute: () => Route$z
});
const DocsHowItWorksRoute = Route$g.update({
  id: "/docs/how-it-works",
  path: "/docs/how-it-works",
  getParentRoute: () => Route$z
});
const DocsGithubActionRoute = Route$f.update({
  id: "/docs/github-action",
  path: "/docs/github-action",
  getParentRoute: () => Route$z
});
const CheckoutSuccessRoute = Route$e.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$z
});
const CheckoutCancelRoute = Route$d.update({
  id: "/checkout/cancel",
  path: "/checkout/cancel",
  getParentRoute: () => Route$z
});
const BlogRssDotxmlRoute = Route$c.update({
  id: "/blog/rss.xml",
  path: "/blog/rss.xml",
  getParentRoute: () => Route$z
});
const BlogSlugRoute = Route$b.update({
  id: "/blog/$slug",
  path: "/blog/$slug",
  getParentRoute: () => Route$z
});
const LovableEmailSuppressionRoute = Route$a.update({
  id: "/lovable/email/suppression",
  path: "/lovable/email/suppression",
  getParentRoute: () => Route$z
});
const ApiPublicWaitlistRoute = Route$9.update({
  id: "/api/public/waitlist",
  path: "/api/public/waitlist",
  getParentRoute: () => Route$z
});
const LovableEmailTransactionalSendRoute = Route$8.update({
  id: "/lovable/email/transactional/send",
  path: "/lovable/email/transactional/send",
  getParentRoute: () => Route$z
});
const LovableEmailTransactionalPreviewRoute = Route$7.update({
  id: "/lovable/email/transactional/preview",
  path: "/lovable/email/transactional/preview",
  getParentRoute: () => Route$z
});
const LovableEmailQueueProcessRoute = Route$6.update({
  id: "/lovable/email/queue/process",
  path: "/lovable/email/queue/process",
  getParentRoute: () => Route$z
});
const ApiPublicPaymentsWebhookRoute = Route$5.update({
  id: "/api/public/payments/webhook",
  path: "/api/public/payments/webhook",
  getParentRoute: () => Route$z
});
const ApiPublicLicenseVerifyRoute = Route$4.update({
  id: "/api/public/license/verify",
  path: "/api/public/license/verify",
  getParentRoute: () => Route$z
});
const ApiPublicHooksE2eHealthRoute = Route$3.update({
  id: "/api/public/hooks/e2e-health",
  path: "/api/public/hooks/e2e-health",
  getParentRoute: () => Route$z
});
const ApiPublicDemoGenerateRoute = Route$2.update({
  id: "/api/public/demo/generate",
  path: "/api/public/demo/generate",
  getParentRoute: () => Route$z
});
const ApiPublicCliRunRoute = Route$1.update({
  id: "/api/public/cli/run",
  path: "/api/public/cli/run",
  getParentRoute: () => Route$z
});
const ApiPublicBillingPortalRoute = Route.update({
  id: "/api/public/billing/portal",
  path: "/api/public/billing/portal",
  getParentRoute: () => Route$z
});
const rootRouteChildren = {
  IndexRoute,
  CliRoute,
  CompareRoute,
  DemoRoute,
  PricingRoute,
  PrivacyRoute,
  ProfilesRoute,
  QuickstartRoute,
  RecipesRoute,
  SecurityRoute,
  SitemapDotxmlRoute,
  TermsRoute,
  UnsubscribeRoute,
  BlogSlugRoute,
  BlogRssDotxmlRoute,
  CheckoutCancelRoute,
  CheckoutSuccessRoute,
  DocsGithubActionRoute,
  DocsHowItWorksRoute,
  DocsTroubleshootingRoute,
  EmailUnsubscribeRoute,
  BlogIndexRoute,
  CheckoutIndexRoute,
  DocsIndexRoute,
  ApiPublicWaitlistRoute,
  LovableEmailSuppressionRoute,
  ApiPublicBillingPortalRoute,
  ApiPublicCliRunRoute,
  ApiPublicDemoGenerateRoute,
  ApiPublicHooksE2eHealthRoute,
  ApiPublicLicenseVerifyRoute,
  ApiPublicPaymentsWebhookRoute,
  LovableEmailQueueProcessRoute,
  LovableEmailTransactionalPreviewRoute,
  LovableEmailTransactionalSendRoute
};
const routeTree = Route$z._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  FAQ as F,
  LAST_REVIEWED as L,
  PATH as P,
  Route$y as R,
  SECTIONS as S,
  SATUS_VERSION as a,
  SATUS_VERSION_TAG as b,
  SATUS_RELEASED_AT as c,
  Route$k as d,
  SITE_URL$8 as e,
  Route$j as f,
  FAQS as g,
  Route$e as h,
  Route$b as i,
  SATUS_SPEC as j,
  router as r
};
