"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const ACCENT = "#2A4A38";
const CREAM = "#F5F2EE";
const RED = "oklch(0.577 0.245 27.325)";
const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { to: 20, suffix: "+", label: "Years in military and counterterrorism" },
  { to: 8, suffix: "", label: "Years of hostile-environment close protection" },
  { to: 4, suffix: "", label: "Regions across Africa and the Middle East" },
];

const REGIONS = [
  { name: "North Africa", x: 165, y: 96 },
  { name: "West Africa", x: 96, y: 150 },
  { name: "East Africa", x: 246, y: 196 },
  { name: "Middle East", x: 286, y: 104 },
];

/**
 * Our Standard: brand statement plus an operator credibility panel.
 * When the block scrolls into view the headline stats count up from zero and
 * the regional map reveals its markers in sequence. Everything collapses to a
 * static, fully-shown state under prefers-reduced-motion.
 */
export function CinematicTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const active = inView || !!reduce;

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
          opacity: 0.4,
          filter: "saturate(0.8) brightness(0.8)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,18,13,0.82) 0%, rgba(10,18,13,0.55) 45%, rgba(10,18,13,0.92) 100%)",
        }}
      />

      <div
        className="relative z-10 mx-auto w-full max-w-[1120px]"
        style={{ padding: "clamp(88px,11vw,128px) 24px" }}
      >
        <Reveal className="text-center">
          <span
            className="mb-6 block font-mono text-xs uppercase"
            style={{ letterSpacing: "0.2em", color: ACCENT }}
          >
            Our Standard
          </span>
          <h2
            className="m-0 font-drama italic text-[#F5F2EE]"
            style={{ fontSize: "clamp(34px,6.4vw,84px)", lineHeight: 1.12 }}
          >
            Security without compromise.
          </h2>
          <p
            className="mx-auto mt-8 max-w-[640px] font-mono text-sm"
            style={{
              color: "rgba(245,242,238,0.62)",
              lineHeight: 1.75,
              letterSpacing: "0.02em",
            }}
          >
            Founded by operators with over two decades in military and
            counterterrorism policing, and eight years of close protection in
            hostile environments across Africa and the Middle East.
          </p>
        </Reveal>

        {/* Credibility panel: count-up stats + operations map */}
        <div
          ref={ref}
          className="mt-16 grid items-center gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2"
        >
          {/* Stats */}
          <div className="flex flex-col gap-9">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                animate={active ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
                className="flex items-baseline gap-5 border-b pb-6"
                style={{ borderColor: "rgba(245,242,238,0.12)" }}
              >
                <span
                  className="font-sans font-bold tabular-nums text-[#F5F2EE]"
                  style={{ fontSize: "clamp(48px,7vw,76px)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  <CountUp to={s.to} suffix={s.suffix} run={active} reduce={!!reduce} />
                </span>
                <span
                  className="font-mono text-[13px] uppercase"
                  style={{ color: "rgba(245,242,238,0.6)", letterSpacing: "0.1em", lineHeight: 1.5 }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Operations map */}
          <OperationsMap active={active} reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

/* ── Count-up number, eased, triggered on scroll ─────────────────── */
function CountUp({
  to,
  suffix,
  run,
  reduce,
}: {
  to: number;
  suffix: string;
  run: boolean;
  reduce: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1500;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(Math.round(easeOut(p) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to, reduce]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

/* ── Areas of operation: stylised region map with pulsing markers ── */
function OperationsMap({ active, reduce }: { active: boolean; reduce: boolean }) {
  const motionOn = !reduce;

  return (
    <div className="flex flex-col gap-6">
      <span
        className="font-mono text-[11px] font-semibold uppercase"
        style={{ letterSpacing: "0.2em", color: "rgba(245,242,238,0.5)" }}
      >
        Areas of Operation
      </span>

      <div className="relative w-full">
        <svg viewBox="0 0 360 380" className="h-auto w-full max-w-[420px]" role="img" aria-label="Regions of operation: North Africa, West Africa, East Africa and the Middle East">
          {/* Graticule backdrop */}
          <g stroke={CREAM} strokeWidth="0.5" opacity="0.08" fill="none">
            {[60, 120, 180, 240, 300].map((y) => (
              <line key={`h${y}`} x1="20" y1={y} x2="340" y2={y} />
            ))}
            {[60, 120, 180, 240, 300].map((x) => (
              <line key={`v${x}`} x1={x} y1="30" x2={x} y2="350" />
            ))}
          </g>

          {/* Africa silhouette */}
          <motion.path
            d="M96 58 L150 52 L206 54 L224 84 L246 108 L300 150 L286 168 L256 168 L252 210 L236 250 L210 322 L184 300 L168 262 L150 246 L132 214 L118 176 L96 176 L74 150 L58 120 L60 92 L78 66 Z"
            fill={ACCENT}
            fillOpacity="0.28"
            stroke={ACCENT}
            strokeWidth="1"
            strokeOpacity="0.6"
            initial={reduce ? false : { opacity: 0 }}
            animate={active ? { opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {/* Arabian peninsula (Middle East) */}
          <motion.path
            d="M262 74 L306 78 L326 104 L318 132 L286 138 L268 116 L260 92 Z"
            fill={ACCENT}
            fillOpacity="0.28"
            stroke={ACCENT}
            strokeWidth="1"
            strokeOpacity="0.6"
            initial={reduce ? false : { opacity: 0 }}
            animate={active ? { opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />

          {/* Region markers */}
          {REGIONS.map((r, i) => (
            <motion.g
              key={r.name}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={active ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.18 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx={r.x} cy={r.y} r="9" fill="none" stroke={CREAM} strokeOpacity="0.35" strokeWidth="0.75" />
              <circle
                cx={r.x}
                cy={r.y}
                r="9"
                fill="none"
                stroke={RED}
                strokeWidth="1"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation:
                    motionOn && active
                      ? `pulseBlip 2.6s ease-out infinite ${i * 0.5}s`
                      : "none",
                }}
              />
              <circle cx={r.x} cy={r.y} r="3.2" fill={RED} />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {REGIONS.map((r, i) => (
          <motion.span
            key={r.name}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: 0.6 + i * 0.18 }}
            className="flex items-center gap-2 font-mono text-[11px] uppercase"
            style={{ color: "rgba(245,242,238,0.6)", letterSpacing: "0.08em" }}
          >
            <span className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: RED }} />
            {r.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
