/**
 * License TTL contract tests. The published promises these pin:
 *   - pricing FAQ: verdicts are cached 24h; past that window with no
 *     network, activation fails closed (Free caps).
 *   - subscription-expired email: "any cached verdict will expire within
 *     24 hours".
 * Before 0.3.10, `generate` read the cache with no TTL check and the key
 * was never persisted, so a canceled subscriber kept paid caps forever.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { LICENSE_CACHE_TTL_MS } from "./config.js";
import { currentLicense, verifyLicense, type LicenseResult } from "./license.js";

const DAY = LICENSE_CACHE_TTL_MS;

let home: string;
let realHome: string | undefined;

beforeEach(async () => {
  // os.homedir() reads $HOME on POSIX, so pointing it at a temp dir keeps
  // these tests off the real ~/.satus.
  home = await mkdtemp(join(tmpdir(), "satus-license-"));
  realHome = process.env.HOME;
  process.env.HOME = home;
});

afterEach(async () => {
  process.env.HOME = realHome;
  vi.unstubAllGlobals();
  await rm(home, { recursive: true, force: true });
});

async function writeCache(cache: Partial<LicenseResult>): Promise<void> {
  await mkdir(join(home, ".satus"), { recursive: true });
  await writeFile(join(home, ".satus", "license-cache.json"), JSON.stringify(cache), "utf8");
}

function stubFetch(handler: () => Promise<Response> | Response): void {
  vi.stubGlobal("fetch", vi.fn(handler));
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("currentLicense", () => {
  it("returns no license and no note when nothing was ever activated", async () => {
    const status = await currentLicense();
    expect(status.license).toBeNull();
    expect(status.note).toBeUndefined();
  });

  it("honors a fresh cache without touching the network", async () => {
    stubFetch(() => {
      throw new Error("network must not be touched for a fresh cache");
    });
    await writeCache({
      valid: true,
      plan: "pro",
      cachedAt: Date.now() - 1000,
      key: "satus_live_k",
    });
    const status = await currentLicense();
    expect(status.license?.plan).toBe("pro");
    expect(status.note).toBeUndefined();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("re-verifies a stale cache with the stored key and honors the fresh verdict", async () => {
    stubFetch(() => jsonResponse({ valid: true, plan: "pro" }));
    await writeCache({
      valid: true,
      plan: "pro",
      cachedAt: Date.now() - DAY - 1000,
      key: "satus_live_k",
    });
    const status = await currentLicense();
    expect(status.license?.valid).toBe(true);
    expect(status.note).toBeUndefined();
    expect(fetch).toHaveBeenCalledOnce();
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0]![1] as RequestInit).body as string);
    expect(body.key).toBe("satus_live_k");
  });

  it("drops to Free when the server says the license is no longer valid", async () => {
    stubFetch(() => jsonResponse({ valid: false, reason: "subscription_canceled" }, 403));
    await writeCache({
      valid: true,
      plan: "pro",
      cachedAt: Date.now() - DAY - 1000,
      key: "satus_live_k",
    });
    const status = await currentLicense();
    expect(status.license).toBeNull();
    expect(status.note).toContain("subscription_canceled");
  });

  it("fails closed past the 24h grace when the network is down", async () => {
    stubFetch(() => {
      throw new TypeError("fetch failed");
    });
    await writeCache({
      valid: true,
      plan: "pro",
      cachedAt: Date.now() - DAY - 1000,
      key: "satus_live_k",
    });
    const status = await currentLicense();
    expect(status.license).toBeNull();
    expect(status.note).toContain("24-hour offline grace");
  });

  it("fails closed past the 24h grace when the server 5xxes", async () => {
    stubFetch(() => jsonResponse({}, 503));
    await writeCache({
      valid: true,
      plan: "pro",
      cachedAt: Date.now() - DAY - 1000,
      key: "satus_live_k",
    });
    const status = await currentLicense();
    expect(status.license).toBeNull();
    expect(status.note).toContain("24-hour offline grace");
  });

  it("cannot re-verify a legacy cache with no stored key and says so", async () => {
    stubFetch(() => {
      throw new Error("no key to verify with — network must not be touched");
    });
    await writeCache({ valid: true, plan: "pro", cachedAt: Date.now() - DAY - 1000 });
    const status = await currentLicense();
    expect(status.license).toBeNull();
    expect(status.note).toContain("satus activate");
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("verifyLicense", () => {
  it("persists the key alongside a valid verdict so generate can re-verify later", async () => {
    stubFetch(() => jsonResponse({ valid: true, plan: "pro" }));
    const result = await verifyLicense("satus_live_k", { force: true });
    expect(result.valid).toBe(true);
    const raw = await readFile(join(home, ".satus", "license-cache.json"), "utf8");
    expect(JSON.parse(raw).key).toBe("satus_live_k");
  });

  it("does not cache an invalid verdict", async () => {
    stubFetch(() => jsonResponse({ valid: false, reason: "not_found" }, 404));
    const result = await verifyLicense("satus_live_bogus", { force: true });
    expect(result.valid).toBe(false);
    await expect(readFile(join(home, ".satus", "license-cache.json"), "utf8")).rejects.toThrow();
  });
});
