"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const ACCENT = "#2A4A38";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Careers (cream band, sits between the tagline and contact).
 * Invites experienced operators to apply; the CTA opens a pre-addressed email
 * so a CV can be sent straight to the operations inbox.
 */
export function CinematicCareers() {
  const reduce = useReducedMotion();

  return (
    <section
      id="careers"
      className="relative w-full overflow-hidden"
      style={{
        background: "#DCD8D0",
        color: "#102018",
        padding: "clamp(88px,11vw,128px) 24px",
      }}
    >
      <Reveal className="mx-auto flex max-w-[900px] flex-col items-center gap-7 text-center">
        <span
          className="font-mono text-xs font-semibold uppercase"
          style={{ letterSpacing: "0.2em", color: ACCENT }}
        >
          Careers
        </span>

        <h2
          className="m-0 font-sans font-bold"
          style={{ fontSize: "clamp(32px,5.4vw,60px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          Built by operators.
        </h2>

        <div className="flex max-w-[560px] flex-col gap-5">
          <p
            className="m-0 font-mono text-sm"
            style={{ color: "rgba(16,32,24,0.6)", lineHeight: 1.7 }}
          >
            We would like to hear from experienced operators with relevant
            experience, who wish to join a professional and motivated team of
            highly disciplined operators.
          </p>
          <p
            className="m-0 font-mono text-sm"
            style={{ color: "rgba(16,32,24,0.6)", lineHeight: 1.7 }}
          >
            A military or policing background is absolutely essential. Please
            submit your CV for consideration. A member of our team will respond.
          </p>
        </div>

        <motion.a
          href="mailto:inorsecurity@gmail.com?subject=Careers%20Application"
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="group mt-1 inline-flex items-center gap-3 rounded-full font-mono text-sm font-semibold uppercase text-[#F5F2EE] no-underline"
          style={{
            background: ACCENT,
            padding: "16px 30px",
            letterSpacing: "0.1em",
            boxShadow: "0 12px 30px rgba(16,32,24,0.2)",
          }}
        >
          <span>Submit your CV to inorsecurity@gmail.com</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.a>
      </Reveal>
    </section>
  );
}
