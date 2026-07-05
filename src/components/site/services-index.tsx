"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ACCENT = "#2A4A38";
const INK = "#102018";
const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    title: "Close Protection Services",
    desc: "Vetted officers for principals in elevated-risk environments, at home, in transit, or overseas.",
  },
  {
    title: "Residential Security Teams",
    desc: "Dedicated personnel, patrols and access control for the principal's home and family.",
  },
  {
    title: "Surveillance",
    desc: "Discreet observation and monitoring to identify threats, verify intelligence and analyse operational decisions.",
  },
  {
    title: "Secure Transport",
    desc: "Surveyed routes and discreet vehicles for movement to and from venues, functions and hotels.",
  },
  {
    title: "Airport Meet & Greet",
    desc: "A trusted face at the terminal, with fast-tracking, baggage handling and onward secure transport.",
  },
  {
    title: "Venue Security",
    desc: "Venue risk assessment and security analysis provided. Fully vetted personnel with essential experience and capabilities available for all functions and venues.",
  },
  {
    title: "Transit of Documents & Goods",
    desc: "Confidential, tracked movement of sensitive items with full chain-of-custody discipline.",
  },
  {
    title: "Penetration Testing",
    desc: "Controlled, ethical testing of physical, personal and procedural security to expose vulnerabilities and potential security breaches.",
  },
];

/**
 * Full scope of services, presented as an interactive "capabilities index".
 * One row is always active (hover on pointer devices, tap on touch); the active
 * row grows an accent bar, shifts its title, and expands to reveal its detail.
 * Under reduced-motion every row is shown open with no transitions.
 */
export function ServicesIndex() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Section header */}
      <div className="mb-2 flex items-end justify-between gap-6 border-b border-[rgba(16,32,24,0.16)] pb-5">
        <span
          className="font-mono text-xs font-semibold uppercase"
          style={{ letterSpacing: "0.2em", color: ACCENT }}
        >
          Full Scope of Services
        </span>
        <span
          className="hidden font-mono text-[11px] uppercase sm:block"
          style={{ letterSpacing: "0.14em", color: "rgba(16,32,24,0.4)" }}
        >
          Eight disciplines
        </span>
      </div>

      <div>
        {SERVICES.map((s, i) => {
          const open = reduce || i === active;
          return (
            <div
              key={s.title}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(i);
              }}
              className="group relative cursor-pointer border-b border-[rgba(16,32,24,0.16)] outline-none"
            >
              {/* Growing accent bar on the active row */}
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: ACCENT, transformOrigin: "top" }}
                initial={false}
                animate={{ scaleY: open ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              />

              {/* Subtle active tint */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(42,74,56,0.05)" }}
                initial={false}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              />

              <div className="relative flex items-center gap-5 py-6 pl-6 pr-3 sm:gap-7 sm:pl-8">
                <span
                  className="font-mono text-sm font-semibold tabular-nums"
                  style={{
                    letterSpacing: "0.1em",
                    color: open ? ACCENT : "rgba(16,32,24,0.38)",
                    transition: reduce ? "none" : "color 0.35s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.h4
                  className="m-0 flex-1 font-sans font-bold text-[#102018]"
                  style={{ fontSize: "clamp(19px,2.4vw,26px)", letterSpacing: "-0.01em" }}
                  initial={false}
                  animate={{ x: open && !reduce ? 8 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {s.title}
                </motion.h4>

                <motion.span
                  aria-hidden
                  className="shrink-0 font-mono text-lg"
                  style={{ color: open ? ACCENT : "rgba(16,32,24,0.3)" }}
                  initial={false}
                  animate={{ rotate: open && !reduce ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  ↗
                </motion.span>
              </div>

              {/* Expanding detail */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="detail"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="m-0 max-w-[620px] pb-7 pl-[52px] pr-8 font-sans text-[15px] sm:pl-[68px]"
                      style={{ color: "rgba(16,32,24,0.66)", lineHeight: 1.65 }}
                    >
                      {s.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
