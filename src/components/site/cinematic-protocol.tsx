"use client";

import { useEffect, useRef } from "react";
import { useMotionEnabled } from "@/lib/use-motion";

const ACCENT = "#2A4A38";
const RED = "oklch(0.577 0.245 27.325)";

type Step = {
  id: string;
  title: string;
  desc: string;
  bg: string;
  ink: string;
  sub: string;
  idColor: string;
  badge: string;
  hi: string;
  stickyTop: string;
  graphic: "radar" | "bio" | "aperture";
};

const PROTOCOL_STEPS: Step[] = [
  {
    id: "01",
    title: "Reconnaissance",
    desc: "Pre-assignment threat profiling and detailed route surveys. We map the environment, the risks, and the contingencies before a principal ever moves.",
    bg: "#E8E4DC",
    ink: "#102018",
    sub: "#2A4A38",
    idColor: ACCENT,
    badge: "rgba(16,32,24,0.35)",
    hi: ACCENT,
    stickyTop: "24px",
    graphic: "radar",
  },
  {
    id: "02",
    title: "Implementation",
    desc: "Vetted operators deployed with military discipline. Plain clothes, low profile, single-point command. Protection that stays invisible until the moment it is needed.",
    bg: ACCENT,
    ink: "#F5F2EE",
    sub: "rgba(245,242,238,0.75)",
    idColor: "rgba(245,242,238,0.9)",
    badge: "rgba(245,242,238,0.4)",
    hi: "#F5F2EE",
    stickyTop: "44px",
    graphic: "bio",
  },
  {
    id: "03",
    title: "Constant Watch",
    desc: "Continuous assessment and real-time adaptation, held to the standard that protected principals in conflict zones, for the full duration of the engagement.",
    bg: "#DCD8D0",
    ink: "#102018",
    sub: "#2A4A38",
    idColor: ACCENT,
    badge: "rgba(16,32,24,0.35)",
    hi: ACCENT,
    stickyTop: "64px",
    graphic: "aperture",
  },
];

/**
 * Protocol (ground truth: INOR Security.dc.html).
 * Celtic-knot band header above three full-width "sticky stacking" cards with
 * increasing top offsets (24/44/64px). On scroll each card recedes (scale→0.9,
 * translateY -26px, brightness/saturate dim) as the next approaches the top,
 * and incoming cards tilt in up to 2deg. All gated behind reduced-motion.
 */
export function CinematicProtocol() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const wraps = Array.from(
      section.querySelectorAll<HTMLElement>("[data-protocol-wrap]")
    );
    let raf = 0;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      wraps.forEach((wrap, i) => {
        const card = wrap.querySelector<HTMLElement>("[data-protocol-card]");
        if (!card) return;
        let scale = 1,
          ty = 0,
          dim = 0;
        const next = wraps[i + 1];
        if (next) {
          const p = clamp01(1 - next.getBoundingClientRect().top / vh);
          scale = 1 - p * 0.1;
          ty = -p * 26;
          dim = p;
        }
        let rot = 0;
        if (i > 0) {
          const q = clamp01(wrap.getBoundingClientRect().top / vh);
          rot = q * 2;
        }
        card.style.transform = `scale(${scale.toFixed(4)}) translateY(${ty.toFixed(
          1
        )}px) rotate(${rot.toFixed(2)}deg)`;
        card.style.filter = dim
          ? `brightness(${(1 - dim * 0.35).toFixed(3)}) saturate(${(
              1 -
              dim * 0.3
            ).toFixed(3)})`
          : "";
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#DCD8D0", color: "#102018" }}
    >
      {/* Header - celtic-knot line + bold title */}
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
          <span
            className="font-mono text-[11px] font-semibold uppercase"
            style={{ letterSpacing: "0.28em", color: "rgba(16,32,24,0.45)" }}
          >
            How we operate
          </span>
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
            Three phases, one standard. The discipline that protected principals
            in hostile environments, applied to every engagement.
          </p>
        </div>
      </div>

      {PROTOCOL_STEPS.map((step) => (
        <div
          key={step.id}
          data-protocol-wrap
          className="flex w-full items-start justify-center"
          style={{
            position: "sticky",
            top: step.stickyTop,
            minHeight: "100dvh",
            padding: "clamp(16px,3vw,40px)",
          }}
        >
          <div
            data-protocol-card
            className="relative flex w-full max-w-[1200px] flex-wrap items-center justify-between overflow-hidden"
            style={{
              minHeight: "78dvh",
              background: step.bg,
              color: step.ink,
              borderRadius: "40px",
              border: "1px solid rgba(16,32,24,0.12)",
              boxShadow: "0 24px 60px rgba(16,32,24,0.28)",
              gap: "48px",
              padding: "clamp(32px,5vw,80px)",
              transformOrigin: "center top",
              willChange: "transform",
            }}
          >
            <span
              className="absolute font-mono text-[11px]"
              style={{ top: "36px", right: "44px", letterSpacing: "0.16em", color: step.badge }}
            >
              {step.id} / 03
            </span>

            <div
              className="flex flex-col"
              style={{ flex: "1 1 380px", gap: "20px", maxWidth: "480px" }}
            >
              <span
                className="font-mono text-[22px] font-bold"
                style={{ color: step.idColor }}
              >
                {step.id}
              </span>
              <h2
                className="m-0 font-sans font-bold"
                style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h2>
              <p
                className="m-0 font-mono text-[15px]"
                style={{ color: step.sub, lineHeight: 1.7, maxWidth: "420px" }}
              >
                {step.desc}
              </p>
            </div>

            <div
              className="flex items-center justify-center"
              style={{ flex: "1 1 320px", minHeight: "320px" }}
            >
              {step.graphic === "radar" && <RadarGraphic ink={step.ink} hi={step.hi} />}
              {step.graphic === "bio" && <FingerprintGraphic ink={step.ink} hi={step.hi} />}
              {step.graphic === "aperture" && (
                <ApertureGraphic ink={step.ink} hi={step.hi} />
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 01 Reconnaissance: radar sweep ─────────────────────────────── */
function RadarGraphic({ ink, hi }: { ink: string; hi: string }) {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" style={{ width: "320px", height: "320px", opacity: 0.85 }}>
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

/* ── 02 Implementation: fingerprint scan ────────────────────────── */
function FingerprintGraphic({ ink, hi }: { ink: string; hi: string }) {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" style={{ width: "320px", height: "320px", opacity: 0.75 }}>
      <defs>
        <linearGradient id="fpScanGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hi} stopOpacity="0" />
          <stop offset="50%" stopColor={hi} stopOpacity="0.55" />
          <stop offset="100%" stopColor={hi} stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="72" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.25" />
      <g
        fill="none"
        stroke={ink}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={
          {
            "--fp-base": ink,
            "--flash-color": hi,
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: motion ? "fpFlash 3.2s ease-in-out infinite" : "none",
          } as React.CSSProperties
        }
      >
        <path d="M 85 60 C 95 55 105 55 115 60" />
        <path d="M 73 75 C 88 63 112 63 127 75" />
        <path d="M 65 92 C 82 75 118 75 135 92" />
        <path d="M 60 110 C 78 88 122 88 140 110" />
        <path d="M 65 128 C 82 105 118 105 135 128" />
        <path d="M 73 143 C 88 125 112 125 127 143" />
        <path d="M 85 155 C 95 140 105 140 115 155" />
      </g>
      <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "fpScan 3.2s ease-in-out infinite" : "none" }}>
        <rect x="58" y="88" width="84" height="24" fill="url(#fpScanGlow)" />
        <line x1="58" y1="100" x2="142" y2="100" stroke={hi} strokeWidth="2" />
      </g>
      <circle cx="100" cy="100" r="3" fill={hi} opacity="0.85" />
    </svg>
  );
}

/* ── 03 Constant Watch: aperture / lens ─────────────────────────── */
function ApertureGraphic({ ink, hi }: { ink: string; hi: string }) {
  const motion = useMotionEnabled();
  return (
    <svg viewBox="0 0 200 200" style={{ width: "320px", height: "320px", opacity: 0.8 }}>
      <circle cx="100" cy="100" r="95" fill="none" stroke={ink} strokeWidth="1" opacity="0.2" />
      <line x1="100" y1="10" x2="100" y2="40" stroke={ink} strokeWidth="1" opacity="0.45" />
      <line x1="100" y1="160" x2="100" y2="190" stroke={ink} strokeWidth="1" opacity="0.45" />
      <line x1="10" y1="100" x2="40" y2="100" stroke={ink} strokeWidth="1" opacity="0.45" />
      <line x1="160" y1="100" x2="190" y2="100" stroke={ink} strokeWidth="1" opacity="0.45" />
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: motion ? "spin360 16s linear infinite" : "none" }}>
        <circle cx="100" cy="100" r="70" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="10 5 2 5" />
      </g>
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: motion ? "spinRev360 13s linear infinite" : "none" }}>
        <circle cx="100" cy="100" r="60" fill="none" stroke={ink} strokeWidth="1" strokeDasharray="30 10" opacity="0.6" />
      </g>
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: motion ? "breathe 3s ease-in-out infinite" : "none" }}>
        <circle cx="100" cy="100" r="45" fill="none" stroke={hi} strokeWidth="2" opacity="0.85" />
        <path d="M 100 55 L 120 70 L 100 100 Z" fill={ink} opacity="0.1" />
        <path d="M 145 100 L 120 120 L 100 100 Z" fill={ink} opacity="0.1" />
        <path d="M 100 145 L 80 120 L 100 100 Z" fill={ink} opacity="0.1" />
        <path d="M 55 100 L 80 70 L 100 100 Z" fill={ink} opacity="0.1" />
      </g>
      <circle cx="100" cy="100" r="3" fill={RED} style={{ transformBox: "fill-box", transformOrigin: "center", animation: motion ? "trackJitter 2.4s ease-in-out infinite" : "none" }} />
    </svg>
  );
}
