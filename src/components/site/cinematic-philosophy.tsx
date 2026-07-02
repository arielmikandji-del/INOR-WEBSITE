"use client";

import { Reveal } from "./reveal";

const ACCENT = "#2A4A38";

/**
 * Philosophy (ground truth: INOR Security.dc.html).
 * Dark section with a concrete-texture overlay at 22%. A muted lead-in line
 * above a large italic Playfair statement; both scroll-reveal with a slight
 * stagger (0 / 180ms).
 */
export function CinematicPhilosophy() {
  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ padding: "140px 24px", background: "#102018", color: "#DCD8D0" }}
    >
      <img
        src="/assets/photo-concrete-texture.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.22, filter: "saturate(0.6)" }}
      />
      <div className="relative z-10 flex w-full max-w-[1024px] flex-col items-start gap-8">
        <Reveal>
          <h2
            className="m-0 font-sans font-medium"
            style={{
              fontSize: "clamp(18px,2.4vw,26px)",
              color: "rgba(220,216,208,0.6)",
              letterSpacing: "0.01em",
            }}
          >
            Most security focuses on: standardized visible presence.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <h3
            className="m-0 font-drama italic"
            style={{ fontSize: "clamp(40px,8vw,112px)", lineHeight: 1.1 }}
          >
            We focus on: <span style={{ color: ACCENT }}>absolute discretion.</span>
          </h3>
        </Reveal>
      </div>
    </section>
  );
}
