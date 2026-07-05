"use client";

import { Reveal } from "./reveal";
import { useMotionEnabled } from "@/lib/use-motion";

const ACCENT = "#2A4A38";
const RED = "oklch(0.577 0.245 27.325)";

/* The single discipline we run, broken into the phases that make up the
   reconnaissance protocol - reads as "a few blocks of things together". */
const PHASES = [
  {
    title: "Threat Profiling",
    desc: "Pre-mission threat profiling of the principal, the environment and known adversaries.",
  },
  {
    title: "Intelligence Gathering",
    desc: "Current and historical threats and incidents are gathered and analysed in detail.",
  },
  {
    title: "Route & Waypoint Assessment",
    desc: "Findings are incorporated into route and waypoint assessment, prior to any principal move.",
  },
];

/**
 * Protocol.
 * Celtic-knot band header (unchanged) above a single, centred discipline -
 * Reconnaissance - expressed as three phase blocks so the section still reads
 * as a protocol now that the other steps have been removed.
 */
export function CinematicProtocol() {
  return (
    <section
      id="protocol"
      className="relative w-full"
      style={{ background: "#DCD8D0", color: "#102018" }}
    >
      {/* Header - celtic-knot line + bold title (unchanged) */}
      <div
        className="flex flex-col items-center gap-7 text-center"
        style={{ padding: "clamp(80px,12vw,120px) 24px 8px" }}
      >
        <img
          src="/assets/celtic-knot.png"
          alt=""
          aria-hidden
          className="object-contain"
          style={{
            width: "min(94%, 900px)",
            height: "auto",
            mixBlendMode: "multiply",
            opacity: 0.6,
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <h2
            className="m-0 font-sans font-bold text-[#102018]"
            style={{
              fontSize: "clamp(44px,8vw,88px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
            }}
          >
            The Protocol
          </h2>
          <p
            className="m-0 mt-1 max-w-[540px] font-mono text-sm"
            style={{ color: "rgba(16,32,24,0.55)", lineHeight: 1.7 }}
          >
            One global standard. An uncompromising standard forged during
            hostile close protection deployments is applied to every engagement.
          </p>
        </div>
      </div>

      {/* Reconnaissance - centred, with radar visual and phase blocks */}
      <div
        className="mx-auto flex w-full max-w-[1100px] flex-col items-center text-center"
        style={{ padding: "clamp(40px,6vw,72px) 24px clamp(88px,11vw,128px)" }}
      >
        <Reveal className="flex flex-col items-center">
          <RadarGraphic ink="#102018" hi={ACCENT} />
          <span
            className="mt-6 font-mono text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.24em", color: ACCENT }}
          >
            The Discipline
          </span>
          <h3
            className="m-0 mt-3 font-sans font-bold text-[#102018]"
            style={{ fontSize: "clamp(30px,5vw,52px)", letterSpacing: "-0.02em" }}
          >
            Reconnaissance
          </h3>
          <p
            className="m-0 mt-5 max-w-[620px] font-mono text-[15px]"
            style={{ color: "rgba(16,32,24,0.62)", lineHeight: 1.7 }}
          >
            Pre-mission threat profiling and intelligence gathering, incorporated
            into every route and waypoint assessment before a principal moves.
          </p>
        </Reveal>

        <div className="mt-14 grid w-full gap-6 md:mt-16 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div
                className="flex h-full flex-col items-center gap-4 rounded-[28px] px-8 py-10 text-center"
                style={{
                  background: "rgba(232,226,220,0.6)",
                  border: "1px solid rgba(16,32,24,0.1)",
                  boxShadow: "0 2px 12px rgba(16,32,24,0.05)",
                }}
              >
                <span
                  className="block h-[3px] w-9 rounded-full"
                  style={{ background: ACCENT }}
                  aria-hidden
                />
                <h4 className="m-0 font-sans text-lg font-bold text-[#102018]">
                  {p.title}
                </h4>
                <p
                  className="m-0 max-w-[280px] font-mono text-[13px]"
                  style={{ color: "rgba(16,32,24,0.6)", lineHeight: 1.7 }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reconnaissance: radar sweep ────────────────────────────────── */
function RadarGraphic({ ink, hi }: { ink: string; hi: string }) {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" style={{ width: "240px", height: "240px", opacity: 0.9 }}>
      <circle cx="100" cy="100" r="90" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="64" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
      <circle cx="100" cy="100" r="38" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="10" x2="100" y2="190" stroke={ink} strokeWidth="0.5" opacity="0.15" />
      <line x1="10" y1="100" x2="190" y2="100" stroke={ink} strokeWidth="0.5" opacity="0.15" />
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: motion ? "spin360 4.5s linear infinite" : "none" }}>
        <path d="M 100 100 L 100 10 A 90 90 0 0 1 163.6 36.4 Z" fill={hi} opacity="0.18" />
        <line x1="100" y1="100" x2="163.6" y2="36.4" stroke={hi} strokeWidth="1.5" />
      </g>
      <circle cx="138" cy="64" r="3" fill={RED} />
      <circle cx="138" cy="64" r="3" fill="none" stroke={RED} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 3s ease-out infinite" : "none" }} />
      <circle cx="62" cy="132" r="3" fill={hi} />
      <circle cx="62" cy="132" r="3" fill="none" stroke={hi} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "pulseBlip 3s ease-out infinite 1.5s" : "none" }} />
      <circle cx="100" cy="100" r="5" fill={ink} />
    </svg>
  );
}
