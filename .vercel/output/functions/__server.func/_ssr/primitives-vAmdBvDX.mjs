import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function Mono({ children, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono ${className}`, children });
}
function Prose({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[62ch] text-[15.5px] leading-[1.7] text-[var(--ink)]/85 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-[var(--ink)] [&_em]:not-italic [&_em]:text-[var(--ink)] [&_strong]:font-medium [&_strong]:text-[var(--ink)] [&_p]:mb-4 last:[&_p]:mb-0", children });
}
function Section({
  id,
  n,
  label,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id,
      className: "scroll-mt-20 border-t border-[var(--hairline)] py-16 first:border-t-0 first:pt-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--signal)]", children: [
            "§",
            n
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-3 text-[var(--hairline)]", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 font-mono text-[26px] font-medium leading-[1.2] tracking-tight text-[var(--ink)] md:text-[32px]", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children })
      ]
    }
  );
}
export {
  Mono as M,
  Prose as P,
  Section as S
};
