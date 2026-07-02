"use client";

import { Reveal } from "./reveal";

const ACCENT = "#2A4A38";

/**
 * Tagline / brand statement (ground truth: INOR Security.dc.html).
 * Near-black section with the control-room photo at 55% under a top/bottom
 * gradient scrim, centered eyebrow + large italic Playfair line. Scroll-reveals.
 */
export function CinematicTagline() {
  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ minHeight: "60vh", background: "#0a120d" }}
    >
      <img
        src="/assets/photo-control-room.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: "center 30%",
          opacity: 0.55,
          filter: "saturate(0.8) brightness(0.85)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,18,13,0.8) 0%, rgba(10,18,13,0.35) 45%, rgba(10,18,13,0.88) 100%)",
        }}
      />
      <Reveal
        className="relative z-10 max-w-[900px] text-center"
        style={{ padding: "100px 24px" }}
      >
        <span
          className="mb-7 block font-mono text-xs uppercase"
          style={{ letterSpacing: "0.2em", color: ACCENT }}
        >
          Our Standard
        </span>
        <h2
          className="m-0 font-drama italic text-[#F5F2EE]"
          style={{ fontSize: "clamp(34px,6.4vw,84px)", lineHeight: 1.15 }}
        >
          Security without compromise.
        </h2>
      </Reveal>
    </section>
  );
}
