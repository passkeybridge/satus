#!/usr/bin/env node
/**
 * Refuse to build if a tracked .env file contains something secret.
 *
 * This repository is public, and `.env`, `.env.development` and
 * `.env.production` are tracked on purpose — they carry the Supabase project
 * URL and the *publishable* key, both of which are meant to sit in a browser
 * bundle. That is fine, and the commit that added them said so.
 *
 * The hazard is the next edit. `.env` is an obvious place to park a real
 * credential, nothing in git objects, and a secret pushed to a public repo
 * is public the moment it lands — rotating it afterwards is the only
 * remedy, and only if someone notices. `*.local` is gitignored, so the safe
 * home for a real secret already exists: put it in `.env.local`, and in the
 * deployment environment.
 *
 * Two ways a value gets caught: a key whose *name* says secret, or a value
 * whose *shape* says secret. Neither is exhaustive — this is a backstop for
 * an obvious slip, not a scanner. Do not treat a pass as proof a file is
 * safe to publish.
 */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Key names that are never public, whatever the value looks like. */
const SECRET_KEY = /SERVICE_ROLE|PRIVATE_KEY|_SECRET$|^SECRET_|PASSWORD|WEBHOOK_SECRET/i;

/** Value shapes that are unambiguously credentials. */
const SECRET_VALUE = [
  [/^sk_(live|test)_/, "Stripe secret key"],
  [/^rk_(live|test)_/, "Stripe restricted key"],
  [/^whsec_/, "webhook signing secret"],
  [/^sb_secret_/, "Supabase secret key"],
  [/^re_[A-Za-z0-9]{16,}/, "Resend API key"],
  [/^ghp_|^github_pat_/, "GitHub token"],
  [/^sk-ant-/, "Anthropic API key"],
  [/^sk-[A-Za-z0-9]{20,}/, "OpenAI API key"],
  [/^-----BEGIN [A-Z ]*PRIVATE KEY-----/, "PEM private key"],
];

/** A Supabase/PostgREST JWT carries its role in the payload. */
function jwtRole(value) {
  if (!/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\./.test(value)) return null;
  try {
    const payload = Buffer.from(value.split(".")[1], "base64url").toString("utf8");
    return JSON.parse(payload).role ?? null;
  } catch {
    return null;
  }
}

let tracked;
try {
  tracked = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" })
    .split("\n")
    .filter((f) => /(^|\/)\.env($|\.)/.test(f));
} catch {
  // No git (a tarball build, say). Nothing to check: this guards what is
  // committed, and if we cannot ask git what that is, we have no opinion.
  console.log("✓ env files not checked (no git metadata available)");
  process.exit(0);
}

const failures = [];

for (const file of tracked) {
  const path = join(ROOT, file);
  if (!existsSync(path)) continue;

  for (const [i, raw] of readFileSync(path, "utf8").split("\n").entries()) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    const value = line
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!value) continue;

    const where = `${file}:${i + 1} ${key}`;

    if (SECRET_KEY.test(key)) {
      failures.push(`${where} — key name says this is a credential`);
      continue;
    }
    const shape = SECRET_VALUE.find(([re]) => re.test(value));
    if (shape) {
      failures.push(`${where} — value looks like a ${shape[1]}`);
      continue;
    }
    const role = jwtRole(value);
    if (role && role !== "anon") {
      failures.push(`${where} — JWT carries role "${role}", not "anon"`);
    }
  }
}

if (failures.length > 0) {
  console.error(
    `\n✗ a tracked .env file holds a secret — refusing to build (${failures.length}):\n`,
  );
  for (const f of failures) console.error(`    ${f}`);
  console.error(
    "\n  This repository is public. Move the value to .env.local (already\n" +
      "  gitignored) and to the deployment environment. If it was ever\n" +
      "  committed, rotate it — removing the line does not unpublish it.\n",
  );
  process.exit(1);
}

console.log(`✓ tracked env files carry no secrets (${tracked.length} checked)`);
