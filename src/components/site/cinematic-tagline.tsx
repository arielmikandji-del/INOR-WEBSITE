"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const SAGE = "#8AA592";
const CREAM = "#F5F2EE";
const EASE = [0.22, 1, 0.36, 1] as const;


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
            INOR Security was built on decades of real-world operational
            experience for clients who demand security without compromise.
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
        style={{ padding: "clamp(40px,6vw,72px) 24px clamp(64px,9vw,104px)" }}
      >
        {/* Global operations map */}
        <div>
          <span
            className="mb-5 block font-mono text-xs font-semibold uppercase"
            style={{ letterSpacing: "0.2em", color: SAGE }}
          >
            Global operations
          </span>
          <img
            src="/images/global-operations-map.webp"
            alt="INOR global areas of operation, with Europe, Africa and South America highlighted"
            className="h-auto w-full"
            style={{ maxWidth: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Differentiators: paints the fuller picture */}
        <div
          className="mt-8 grid gap-10 border-t pt-8 md:mt-10 md:grid-cols-3"
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
