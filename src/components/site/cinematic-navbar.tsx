"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Fixed floating navbar (ground truth: INOR Security.dc.html).
 * Transparent with white text over the hero; on scroll past 40px it crossfades
 * (400ms ease) to a frosted light pill - rgba(220,216,208,0.85) + blur(20px) -
 * with dark text. The logo filter swaps brightness(0) invert(1) → none; the
 * "Initiate" CTA inverts dark/light.
 */
export function CinematicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6">
      <nav
        className="pointer-events-auto flex w-full max-w-[900px] items-center justify-between gap-6 rounded-[2rem] px-6 py-3"
        style={{
          transition: "all 400ms ease",
          ...(scrolled
            ? {
                background: "rgba(220,216,208,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(16,32,24,0.1)",
                color: "#102018",
                boxShadow: "0 8px 24px rgba(16,32,24,0.12)",
              }
            : {
                background: "transparent",
                border: "1px solid transparent",
                color: "#F5F2EE",
              }),
        }}
      >
        <a href="#" className="flex items-center no-underline">
          <img
            src="/assets/INOR_logo_transparent-with%20slogan.svg"
            alt="INOR Security. Security without compromise."
            className="h-[58px] w-auto object-contain"
            style={{
              transition: "filter 400ms ease",
              filter: scrolled ? "none" : "brightness(0) invert(1)",
            }}
          />
        </a>

        <div
          className="hidden items-center gap-8 font-mono text-xs uppercase md:flex"
          style={{ letterSpacing: "0.14em" }}
        >
          {["Services", "Protocol", "Careers", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="no-underline transition-opacity duration-[250ms] hover:opacity-[0.55]"
              style={{ color: "inherit" }}
            >
              {item}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto rounded-full px-[22px] py-2.5 font-mono text-xs font-semibold uppercase no-underline"
          style={{
            letterSpacing: "0.12em",
            ...(scrolled
              ? { background: "#102018", color: "#F5F2EE" }
              : { background: "#F5F2EE", color: "#102018" }),
          }}
        >
          Initiate
        </motion.a>
      </nav>
    </header>
  );
}
