"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";
import { useMotionEnabled } from "@/lib/use-motion";

const SAGE = "#8AA592";
const CREAM = "#F5F2EE";
const RED = "oklch(0.577 0.245 27.325)";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Global operations map (equirectangular dotted world + op markers) ── */
const MAP_W = 1000;
const MAP_H = 460;
const LAT_TOP = 78;
const LAT_BOTTOM = -56;
const projX = (lon: number) => ((lon + 180) / 360) * MAP_W;
const projY = (lat: number) =>
  ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * MAP_H;

function isLand(lon: number, lat: number): boolean {
  const b = (v: number, a: number, c: number) => v >= a && v <= c;
  // Greenland
  if (b(lon, -55, -18) && b(lat, 60, 82)) return true;
  // North America
  if (b(lat, 48, 72) && b(lon, -168, -52)) return true; // Canada
  if (b(lat, 30, 49) && b(lon, -125, -70)) return true; // USA
  if (b(lat, 15, 30) && b(lon, -112, -83)) return true; // Mexico
  if (b(lat, 7, 17) && b(lon, -92, -77)) return true; // Central America
  // South America (tapers south)
  if (b(lat, -56, 12)) {
    const t = (12 - lat) / 68;
    if (b(lon, -81 + t * 30, -35 - t * 18)) return true;
  }
  // Europe
  if (b(lat, 36, 71) && b(lon, -10, 42)) return true;
  if (b(lat, 50, 60) && b(lon, -8, 2)) return true; // UK
  // Africa (tapers south)
  if (b(lat, -35, 37)) {
    const t = (37 - lat) / 72;
    if (b(lon, -17 + t * 14, 52 - t * 14)) return true;
  }
  // Middle East
  if (b(lat, 12, 42) && b(lon, 34, 60)) return true;
  // Russia / Siberia
  if (b(lat, 48, 75) && b(lon, 30, 180)) return true;
  // Central Asia / China
  if (b(lat, 28, 55) && b(lon, 45, 135)) return true;
  // India (triangle)
  if (b(lat, 8, 30) && b(lon, 68, 90)) {
    const t = (30 - lat) / 22;
    if (b(lon, 68 + t * 6, 90 - t * 8)) return true;
  }
  // SE Asia + Indonesia
  if (b(lat, -10, 28) && b(lon, 95, 130)) return true;
  if (b(lat, -10, 5) && b(lon, 95, 141)) return true;
  // Australia
  if (b(lat, -39, -11) && b(lon, 113, 154)) return true;
  // Japan
  if (b(lat, 32, 45) && b(lon, 130, 143)) return true;
  return false;
}

const LAND_DOTS: [number, number][] = [];
for (let lat = LAT_TOP; lat >= LAT_BOTTOM; lat -= 3.1) {
  for (let lon = -180; lon <= 180; lon += 3.1) {
    if (isLand(lon, lat)) LAND_DOTS.push([projX(lon), projY(lat)]);
  }
}

// Faint tactical graticule (every 30°).
const GRID_MERIDIANS: number[] = [];
for (let lon = -150; lon <= 150; lon += 30) GRID_MERIDIANS.push(projX(lon));
const GRID_PARALLELS: number[] = [];
for (let lat = 60; lat >= -30; lat -= 30) GRID_PARALLELS.push(projY(lat));

const OP_MARKERS = [
  { label: "UK", lat: 54, lon: -2, lx: 452, ly: 48, anchor: "end" as const },
  { label: "Europe", lat: 50, lon: 16, lx: 636, ly: 66, anchor: "start" as const },
  { label: "Middle East", lat: 29, lon: 45, lx: 712, ly: 150, anchor: "start" as const },
  { label: "North Africa", lat: 26, lon: 15, lx: 452, ly: 214, anchor: "end" as const },
  { label: "East Africa", lat: 2, lon: 40, lx: 712, ly: 268, anchor: "start" as const },
  { label: "South America", lat: -15, lon: -60, lx: 236, ly: 344, anchor: "end" as const },
];

const STATS = [
  {
    to: 20,
    suffix: "+",
    label: "Years in military, counterterrorism and hostile close protection",
  },
];

const PILLARS = [
  {
    title: "Operator-led",
    body: "Every element of our service is shaped by direct experience in military, counterterrorism and close protection operations.",
  },
  {
    title: "Proven under threat",
    body: "Our leadership has delivered close protection under genuine threat, in some of the world's most demanding environments.",
  },
  {
    title: "Disciplined delivery",
    body: "The same planning and judgement that protected principals in conflict zones, applied to every assignment we accept.",
  },
];

/**
 * Our Standard: the founders' pedigree and what it means for the client.
 * Pedigree stats count up when the block scrolls into view. Intentionally
 * text-forward (no map) so nothing implies a current geographic footprint.
 * Static, fully-shown under prefers-reduced-motion.
 */
export function CinematicTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const active = inView || !!reduce;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#16291e", color: CREAM }}
    >
      {/* Upper band: Our Standard over the control-room photo */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/photo-control-room.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.55, filter: "saturate(0.85) brightness(0.9)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(22,41,30,0.9) 0%, rgba(22,41,30,0.74) 45%, rgba(22,41,30,0.94) 100%)",
          }}
        />

        <div
          className="relative z-10 mx-auto w-full max-w-[1120px]"
          style={{ padding: "clamp(88px,11vw,128px) 24px clamp(72px,9vw,104px)" }}
        >
        <Reveal className="max-w-[760px] text-center md:text-left">
          <span
            className="mb-6 block font-mono text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.2em", color: SAGE }}
          >
            Our Standard
          </span>
          <h2
            className="m-0 font-drama italic"
            style={{ fontSize: "clamp(28px,4.4vw,52px)", lineHeight: 1.18, color: CREAM }}
          >
            Founded by operators with over two decades of military,
            counterterrorism policing and global hostile close protection
            experience.
          </h2>
          <p
            className="mt-7 font-mono text-sm"
            style={{
              color: "rgba(245,242,238,0.66)",
              lineHeight: 1.75,
              letterSpacing: "0.02em",
            }}
          >
            INOR was founded to deliver the standard our team has lived by on the
            ground: protection built on decades of real operational experience,
            for clients who demand security without compromise.
          </p>
        </Reveal>

        {/* Pedigree stat */}
        <div
          ref={ref}
          className="mt-14 flex flex-wrap justify-center gap-12 md:mt-16"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <span
                className="font-sans font-bold tabular-nums"
                style={{
                  fontSize: "clamp(64px,9vw,104px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: CREAM,
                }}
              >
                <CountUp to={s.to} suffix={s.suffix} run={active} reduce={!!reduce} />
              </span>
              <span
                className="mt-4 block h-[2px] w-12 rounded-full"
                style={{ background: SAGE }}
                aria-hidden
              />
              <span
                className="mt-5 max-w-[320px] font-mono text-sm uppercase"
                style={{
                  color: "rgba(245,242,238,0.85)",
                  letterSpacing: "0.14em",
                  lineHeight: 1.7,
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Lower band: global operations + differentiators on solid green */}
      <div
        className="relative mx-auto w-full max-w-[1120px]"
        style={{ padding: "clamp(64px,8vw,96px) 24px clamp(88px,11vw,128px)" }}
      >
        {/* Global operations map */}
        <div>
          <span
            className="mb-8 block font-mono text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.2em", color: SAGE }}
          >
            Global operations
          </span>
          <WorldMap active={active} />
        </div>

        {/* Differentiators: paints the fuller picture */}
        <div
          className="mt-14 grid gap-10 border-t pt-12 md:mt-16 md:grid-cols-3"
          style={{ borderColor: "rgba(245,242,238,0.14)" }}
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={active ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.14 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: SAGE, letterSpacing: "0.1em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 font-sans text-lg font-bold" style={{ color: CREAM }}>
                  {p.title}
                </h3>
              </div>
              <p
                className="m-0 font-sans text-sm"
                style={{ color: "rgba(245,242,238,0.62)", lineHeight: 1.65 }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Global operations world map ─────────────────────────────────── */
function WorldMap({ active }: { active: boolean }) {
  const motionOn = useMotionEnabled();
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-label="Map of INOR global areas of operation: UK, Europe, Middle East, North Africa, East Africa and South America"
      className="h-auto w-full"
      style={{ maxWidth: "100%" }}
    >
      <defs>
        <radialGradient id="opGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint tactical graticule */}
      <g stroke={CREAM} strokeWidth={0.5} opacity={0.06}>
        {GRID_MERIDIANS.map((x, i) => (
          <line key={`m${i}`} x1={x} y1={0} x2={x} y2={MAP_H} />
        ))}
        {GRID_PARALLELS.map((y, i) => (
          <line key={`p${i}`} x1={0} y1={y} x2={MAP_W} y2={y} />
        ))}
      </g>

      {/* Land */}
      {LAND_DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.9} fill={CREAM} opacity={0.34} />
      ))}

      {/* Operation markers */}
      {OP_MARKERS.map((m) => {
        const x = projX(m.lon);
        const y = projY(m.lat);
        return (
          <g key={m.label}>
            {/* Connector line to label */}
            <line
              x1={x}
              y1={y}
              x2={m.lx + (m.anchor === "end" ? 6 : -6)}
              y2={m.ly - 4}
              stroke={CREAM}
              strokeWidth={0.75}
              opacity={0.3}
            />
            {/* Soft glow */}
            <circle cx={x} cy={y} r={22} fill="url(#opGlow)" />
            {/* Pulse ring */}
            <circle
              cx={x}
              cy={y}
              r={8}
              fill="none"
              stroke={RED}
              strokeWidth={1.2}
              opacity={0.7}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation:
                  motionOn && active ? "pulseBlip 2.6s ease-out infinite" : "none",
              }}
            />
            {/* Core dot */}
            <circle cx={x} cy={y} r={4.5} fill={RED} />
            <circle cx={x} cy={y} r={1.8} fill="#F5F2EE" opacity={0.9} />
            {/* Label */}
            <text
              x={m.lx}
              y={m.ly}
              fill="#F5F2EE"
              fontSize="15"
              fontWeight={600}
              fontFamily="var(--font-geist-mono, monospace)"
              textAnchor={m.anchor}
              style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
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
