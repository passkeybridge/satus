/**
 * Minimal Buffer shim for the browser bundle.
 *
 * gray-matter (used in src/lib/blog.ts) calls `Buffer.isBuffer(...)` during
 * module init. Node has Buffer; the Worker SSR runtime has Buffer via
 * nodejs_compat; the browser bundle does not. A 3-line shim satisfies the
 * check without dragging in a 50 KB polyfill.
 *
 * Imported as a side-effect module BEFORE gray-matter so ES-module import
 * hoisting still runs this first.
 */
if (
  typeof globalThis !== "undefined" &&
  typeof (globalThis as { Buffer?: unknown }).Buffer === "undefined"
) {
  (globalThis as { Buffer?: unknown }).Buffer = class {
    static isBuffer() {
      return false;
    }
  };
}

export {};
