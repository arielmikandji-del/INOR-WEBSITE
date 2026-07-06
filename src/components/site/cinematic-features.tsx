"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";
import { useMotionEnabled } from "@/lib/use-motion";

const ACCENT = "#2A4A38";
const RED = "oklch(0.577 0.245 27.325)";
const EASE = [0.22, 1, 0.36, 1] as const;
/** Quiet, confident hover lift for cards - no bounce. */
const cardHover = { y: -6, transition: { duration: 0.4, ease: EASE } };

/**
 * Core Capabilities / Services (ground truth: INOR Security.dc.html).
 * Light-stone section, 3-card auto-fit grid. Cards reveal with 0/130/260ms
 * stagger. Each card carries a bespoke animated SVG (radar/orbit, live-feed
 * aerial, dashed route) - all decorative motion gated behind reduced-motion.
 */
export function CinematicFeatures() {
  const reduce = useReducedMotion();
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "#DCD8D0", padding: "96px 24px" }}
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 rounded-full"
        style={{
          width: "800px",
          height: "800px",
          background: "#2A4A380d",
          filter: "blur(90px)",
          transform: "translate(33%, -50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mb-[72px] flex flex-col items-start gap-4">
          <span
            className="font-mono text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.2em", color: ACCENT }}
          >
            Core Capabilities
          </span>
          <h2
            className="m-0 max-w-[640px] font-sans font-bold text-[#102018]"
            style={{
              fontSize: "clamp(32px,5vw,56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Precision-engineered
            <br />
            <span
              className="font-drama italic"
              style={{ color: "rgba(16,32,24,0.55)", fontSize: "1.1em" }}
            >
              risk mitigation.
            </span>
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
            gap: "32px",
          }}
        >
          {/* Card 1: Executive Protection */}
          <Reveal delay={0}>
            <motion.article
              whileHover={reduce ? undefined : cardHover}
              className="relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[32px] p-8"
              style={{
                background: "rgba(232,226,220,0.5)",
                border: "1px solid rgba(16,32,24,0.08)",
                boxShadow: "0 2px 12px rgba(16,32,24,0.05)",
              }}
            >
              <div className="relative z-10">
                <h3 className="m-0 mb-2 font-sans text-xl font-bold text-[#102018]">
                  Close Protection
                </h3>
                <p
                  className="m-0 font-sans text-sm"
                  style={{ color: "#2A4A38", lineHeight: 1.6 }}
                >
                  Vetted officers for principals in elevated-risk environments,
                  at home, in transit, or overseas.
                </p>
              </div>
              <div
                className="mt-8 flex h-[190px] w-full items-center justify-center rounded-[20px]"
                style={{ background: "#102018" }}
              >
                <PerimeterGraphic />
              </div>
              <div className="mt-2 text-center">
                <span
                  className="font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.14em", color: "rgba(16,32,24,0.35)" }}
                >
                  Perimeter control
                </span>
              </div>
            </motion.article>
          </Reveal>

          {/* Card 2: Risk Assessment */}
          <Reveal delay={130}>
            <motion.article
              whileHover={reduce ? undefined : cardHover}
              className="relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[32px] p-8"
              style={{ background: "#102018", boxShadow: "0 8px 30px rgba(16,32,24,0.2)" }}
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="m-0 mb-2 font-sans text-xl font-bold text-[#DCD8D0]">
                    Surveillance
                  </h3>
                  <p
                    className="m-0 font-sans text-sm"
                    style={{ color: "rgba(220,216,208,0.7)", lineHeight: 1.6 }}
                  >
                    Discreet observation and monitoring to identify threats,
                    verify intelligence, and analyse operational decisions.
                  </p>
                </div>
                <LiveFeedBadge />
              </div>
              <div className="absolute bottom-0 right-0 h-[60%] w-full overflow-hidden">
                <img
                  src="/assets/photo-aerial-city.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity: 0.4, filter: "saturate(0.8)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(200deg, rgba(16,32,24,0) 30%, #102018 90%)",
                  }}
                />
                <RiskBlips />
              </div>
            </motion.article>
          </Reveal>

          {/* Card 3: Secure Transport */}
          <Reveal delay={260}>
            <motion.article
              whileHover={reduce ? undefined : cardHover}
              className="relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[32px] p-8"
              style={{
                background: "rgba(232,226,220,0.5)",
                border: "1px solid rgba(16,32,24,0.08)",
                boxShadow: "0 2px 12px rgba(16,32,24,0.05)",
              }}
            >
              <div className="relative z-10">
                <h3 className="m-0 mb-2 font-sans text-xl font-bold text-[#102018]">
                  Secure Transport
                </h3>
                <p
                  className="m-0 font-sans text-sm"
                  style={{ color: "#2A4A38", lineHeight: 1.6 }}
                >
                  Surveyed routes, discreet vehicles and airport meet-and-greet
                  for secure movement to and from venues, functions and terminals.
                </p>
              </div>
              <div
                className="mt-8 flex h-[190px] w-full items-center justify-center rounded-[20px]"
                style={{ background: "#102018" }}
              >
                <RouteGraphic />
              </div>
              <div className="mt-2 text-center">
                <span
                  className="font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.14em", color: "rgba(16,32,24,0.35)" }}
                >
                  Route integrity
                </span>
              </div>
            </motion.article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PerimeterGraphic() {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full max-w-[200px]">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#DCD8D0" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="#DCD8D0" strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="20" cy="50" r="3" fill={RED} />
      <circle cx="20" cy="50" r="3" fill="none" stroke={RED} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 2s ease-out infinite" : "none" }} />
      <circle cx="170" cy="160" r="3" fill={RED} />
      <circle cx="170" cy="160" r="3" fill="none" stroke={RED} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 2s ease-out infinite 0.6s" : "none" }} />
      <g style={{ transformOrigin: "100px 100px", animation: motion ? "spin360 16s linear infinite" : "none" }}>
        <circle cx="100" cy="20" r="6" fill={ACCENT} />
        <line x1="100" y1="20" x2="100" y2="90" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
        <circle cx="30.7" cy="140" r="6" fill={ACCENT} />
        <line x1="30.7" y1="140" x2="90" y2="105" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
        <circle cx="169.3" cy="140" r="6" fill={ACCENT} />
        <line x1="169.3" y1="140" x2="110" y2="105" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
      </g>
      <circle cx="100" cy="100" r="10" fill="#DCD8D0" />
    </svg>
  );
}

function LiveFeedBadge() {
  const motion = useMotionEnabled();
  return (
    <div
      className="flex w-fit items-center gap-2 rounded-full"
      style={{
        padding: "5px 12px",
        background: "rgba(220,216,208,0.08)",
        border: "1px solid rgba(220,216,208,0.15)",
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: RED, animation: motion ? "liveDot 1.6s ease-in-out infinite" : "none" }}
      />
      <span
        className="font-mono text-[9px] uppercase text-[#DCD8D0]"
        style={{ letterSpacing: "0.12em" }}
      >
        Live Feed
      </span>
    </div>
  );
}

function RiskBlips() {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <circle cx="215" cy="75" r="3" fill={RED} />
      <circle cx="215" cy="75" r="4" fill="none" stroke={RED} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 2.4s ease-out infinite" : "none" }} />
      <circle cx="215" cy="75" r="4" fill="none" stroke={RED} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 2.4s ease-out infinite 1.2s" : "none" }} />
    </svg>
  );
}

function RouteGraphic() {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full max-w-[200px]">
      <circle cx="120" cy="80" r="25" fill={RED} opacity="0.1" />
      <circle cx="60" cy="140" r="20" fill={RED} opacity="0.1" />
      <path d="M 20 180 Q 60 140 80 160 T 140 100 T 180 40" fill="none" stroke="#DCD8D0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      <path d="M 20 180 Q 40 100 100 80 T 180 40" fill="none" stroke="#DCD8D0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      <path
        d="M 20 180 L 40 160 L 80 165 L 100 130 L 150 140 L 180 40"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="400"
        style={{ strokeDashoffset: motion ? 400 : 0, animation: motion ? "dashFlow 4s ease-in-out infinite alternate" : "none" }}
      />
      <circle cx="20" cy="180" r="4" fill="#DCD8D0" />
      <circle cx="180" cy="40" r="4" fill="#DCD8D0" />
    </svg>
  );
}
