"use client";

import { useEffect, useRef } from "react";
import { useMotionEnabled } from "@/lib/use-motion";

const ACCENT = "#2A4A38";
const CREAM = "#F5F2EE";
const RED = "oklch(0.577 0.245 27.325)";

type GraphicProps = { ink: string; hi: string };

type Slide = {
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
  Graphic: (p: GraphicProps) => React.JSX.Element;
};

/* Each discipline gets its own animation, built to echo what the service
   actually does - a protective bubble, a patrolled home, a watching eye,
   a surveyed route, an arriving flight, a swept venue, a tracked package,
   a probed lock. All motion is gated behind reduced-motion. */
const RAW: { title: string; desc: string; Graphic: (p: GraphicProps) => React.JSX.Element }[] = [
  {
    title: "Close Protection Services",
    desc: "Vetted officers for principals in elevated-risk environments, at home, in transit, or overseas.",
    Graphic: CloseProtectionGraphic,
  },
  {
    title: "Residential Security Teams",
    desc: "Dedicated personnel, patrols and access control for the principal's home and family.",
    Graphic: ResidentialGraphic,
  },
  {
    title: "Surveillance",
    desc: "Discreet observation and monitoring to identify threats, verify intelligence and analyse operational decisions.",
    Graphic: SurveillanceGraphic,
  },
  {
    title: "Secure Transport",
    desc: "Surveyed routes and discreet vehicles for movement to and from venues, functions and hotels.",
    Graphic: SecureTransportGraphic,
  },
  {
    title: "Airport Meet & Greet",
    desc: "A trusted face at the terminal, with fast-tracking, baggage handling and onward secure transport.",
    Graphic: AirportGraphic,
  },
  {
    title: "Venue Security",
    desc: "Venue risk assessment and security analysis provided. Fully vetted personnel with essential experience and capabilities available for all functions and venues.",
    Graphic: VenueGraphic,
  },
  {
    title: "Transit of Documents & Goods",
    desc: "Confidential, tracked movement of sensitive items with full chain-of-custody discipline.",
    Graphic: TransitGraphic,
  },
  {
    title: "Penetration Testing",
    desc: "Controlled, ethical testing of physical, personal and procedural security to expose vulnerabilities and potential security breaches.",
    Graphic: PenTestGraphic,
  },
];

const LIGHT = {
  bg: "#E8E4DC",
  ink: "#102018",
  sub: "#2A4A38",
  idColor: ACCENT,
  badge: "rgba(16,32,24,0.35)",
  hi: ACCENT,
};
const GREEN = {
  bg: ACCENT,
  ink: CREAM,
  sub: "rgba(245,242,238,0.75)",
  idColor: "rgba(245,242,238,0.9)",
  badge: "rgba(245,242,238,0.4)",
  hi: CREAM,
};

const SERVICE_SLIDES: Slide[] = RAW.map((s, i) => {
  const palette = i % 2 === 0 ? LIGHT : GREEN;
  return {
    id: String(i + 1).padStart(2, "0"),
    title: s.title,
    desc: s.desc,
    Graphic: s.Graphic,
    stickyTop: `${20 + i * 8}px`,
    ...palette,
  };
});

const TOTAL = String(SERVICE_SLIDES.length).padStart(2, "0");

/**
 * Our Services.
 * Celtic-knot band header above eight full-width sticky stacking cards - one
 * per discipline - with increasing top offsets. On scroll each card recedes
 * (scale, translateY, brightness/saturate dim) as the next approaches the top,
 * and incoming cards tilt in up to 2deg. Each card carries a bespoke, on-theme
 * animation. All motion is gated behind reduced-motion.
 */
export function CinematicServicesSlides() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const wraps = Array.from(
      section.querySelectorAll<HTMLElement>("[data-service-wrap]")
    );
    // Cache card refs and last-applied styles once (no per-frame querySelector,
    // no redundant style writes).
    const cards = wraps.map((w) =>
      w.querySelector<HTMLElement>("[data-service-card]")
    );
    const lastT = new Array<string>(wraps.length).fill("");
    const lastF = new Array<string>(wraps.length).fill("");
    const tops = new Array<number>(wraps.length);
    let raf = 0;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // Read pass: gather all layout reads first to avoid read/write thrashing.
      for (let i = 0; i < wraps.length; i++) {
        tops[i] = wraps[i].getBoundingClientRect().top;
      }
      // Write pass: only touch the DOM when a value actually changed.
      for (let i = 0; i < wraps.length; i++) {
        const card = cards[i];
        if (!card) continue;
        let scale = 1,
          ty = 0,
          dim = 0;
        if (i + 1 < wraps.length) {
          const p = clamp01(1 - tops[i + 1] / vh);
          scale = 1 - p * 0.1;
          ty = -p * 26;
          dim = p;
        }
        const rot = i > 0 ? clamp01(tops[i] / vh) * 2 : 0;
        const t = `scale(${scale.toFixed(4)}) translateY(${ty.toFixed(
          1
        )}px) rotate(${rot.toFixed(2)}deg)`;
        if (t !== lastT[i]) {
          card.style.transform = t;
          lastT[i] = t;
        }
        const f =
          dim > 0.001
            ? `brightness(${(1 - dim * 0.35).toFixed(3)}) saturate(${(
                1 -
                dim * 0.3
              ).toFixed(3)})`
            : "";
        if (f !== lastF[i]) {
          card.style.filter = f;
          lastF[i] = f;
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Pause a card's SVG animations while it is well outside the viewport so the
    // compositor isn't ticking eight animated cards at once during scroll.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const card = (e.target as HTMLElement).querySelector<HTMLElement>(
            "[data-service-card]"
          );
          card?.classList.toggle("is-idle", !e.isIntersecting);
        }
      },
      { rootMargin: "300px 0px" }
    );
    wraps.forEach((w) => io.observe(w));

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="services-detail"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#DCD8D0", color: "#102018" }}
    >
      {/* Header - celtic-knot line (recoloured to the button green) + bold title */}
      <div
        className="flex flex-col items-center gap-7 text-center"
        style={{ padding: "clamp(18px,6vw,96px) 24px 8px" }}
      >
        <img
          src="/assets/celtic-knot-green.png"
          alt=""
          aria-hidden
          className="object-contain"
          style={{
            width: "min(94%, 900px)",
            height: "auto",
            opacity: 0.9,
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <span
            className="font-mono text-[11px] font-semibold uppercase"
            style={{ letterSpacing: "0.28em", color: "rgba(16,32,24,0.45)" }}
          >
            Full scope of services
          </span>
          <h2
            className="m-0 font-sans font-bold text-[#102018]"
            style={{
              fontSize: "clamp(44px,8vw,88px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
            }}
          >
            Our Services
          </h2>
          <p
            className="m-0 mt-1 max-w-[560px] font-mono text-sm"
            style={{ color: "rgba(16,32,24,0.55)", lineHeight: 1.7 }}
          >
            Eight disciplines, one standard. The full scope of protection we
            deliver, from close protection to penetration testing.
          </p>
        </div>
      </div>

      {SERVICE_SLIDES.map((step) => (
        <div
          key={step.id}
          data-service-wrap
          className="flex w-full items-start justify-center"
          style={{
            position: "sticky",
            top: step.stickyTop,
            // Content-driven height (below the ~80-85dvh cards) so there is no
            // "dead" scroll where a pinned card just sits before the next one —
            // that dead zone read as lag while scrolling.
            minHeight: "80dvh",
            padding: "clamp(16px,3vw,40px)",
          }}
        >
          <div
            data-service-card
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
              {step.id} / {TOTAL}
            </span>

            <div
              className="flex flex-col"
              style={{ flex: "1 1 380px", gap: "20px", maxWidth: "520px" }}
            >
              <span
                className="font-mono text-[22px] font-bold"
                style={{ color: step.idColor }}
              >
                {step.id}
              </span>
              <h3
                className="m-0 font-sans font-bold"
                style={{ fontSize: "clamp(30px,5vw,52px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
              >
                {step.title}
              </h3>
              <p
                className="m-0 font-mono text-[15px]"
                style={{ color: step.sub, lineHeight: 1.7, maxWidth: "440px" }}
              >
                {step.desc}
              </p>
            </div>

            <div
              className="flex items-center justify-center"
              style={{ flex: "1 1 320px", minHeight: "320px" }}
            >
              <step.Graphic ink={step.ink} hi={step.hi} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* Shared SVG shell so every graphic sits on the same stage. */
function Stage({ children, opacity = 0.85 }: { children: React.ReactNode; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 200" style={{ width: "320px", height: "320px", opacity }}>
      {children}
    </svg>
  );
}

/* ── 01 Close Protection: a protective detail orbiting the principal ── */
function CloseProtectionGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  return (
    <Stage>
      {/* faint outer perimeter */}
      <circle cx="100" cy="100" r="88" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" />
      {/* breathing protective bubble */}
      <circle
        cx="100" cy="100" r="56" fill="none" stroke={hi} strokeWidth="1.2" opacity="0.5"
        style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("breathe 4s ease-in-out infinite") }}
      />
      {/* rotating close-protection detail (three officers) */}
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("spin360 11s linear infinite") }}>
        {[0, 120, 240].map((deg) => {
          const r = (deg * Math.PI) / 180;
          // Round to keep server/client SSR output byte-identical (no hydration mismatch)
          const x = (100 + 42 * Math.cos(r)).toFixed(2);
          const y = (100 + 42 * Math.sin(r)).toFixed(2);
          return (
            <g key={deg}>
              <line x1="100" y1="100" x2={x} y2={y} stroke={ink} strokeWidth="0.75" opacity="0.3" strokeDasharray="2 3" />
              <circle cx={x} cy={y} r="5.5" fill={ink} opacity="0.85" />
            </g>
          );
        })}
      </g>
      {/* principal */}
      <circle cx="100" cy="100" r="9" fill={hi} />
      <circle cx="100" cy="100" r="3.5" fill={ink} opacity="0.55" />
      {/* a threat, watched and held at distance */}
      <g>
        <circle cx="168" cy="52" r="3" fill={RED} />
        <circle cx="168" cy="52" r="3" fill="none" stroke={RED} strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim("pulseBlip 2.6s ease-out infinite") }} />
      </g>
    </Stage>
  );
}

/* ── 02 Residential Security: a patrolled home with access control ── */
function ResidentialGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  // rounded-rect perimeter the patrol unit walks
  const patrol = "M 44 44 H 156 A 8 8 0 0 1 164 52 V 148 A 8 8 0 0 1 156 156 H 44 A 8 8 0 0 1 36 148 V 52 A 8 8 0 0 1 44 44 Z";
  return (
    <Stage>
      {/* patrolled perimeter */}
      <path d={patrol} fill="none" stroke={ink} strokeWidth="0.75" strokeDasharray="4 6" opacity="0.3" />
      {/* the residence */}
      <path d="M 68 96 L 100 70 L 132 96" fill="none" stroke={hi} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="76" y="96" width="48" height="40" fill="none" stroke={ink} strokeWidth="1.5" />
      {/* access-controlled door, pulsing */}
      <rect x="93" y="114" width="14" height="22" fill={hi} opacity="0.85"
        style={{ animation: anim("liveDot 2.2s ease-in-out infinite") }} />
      {/* patrol unit walking the perimeter */}
      <circle r="4.5" fill={RED}>
        {motion && <animateMotion dur="7s" repeatCount="indefinite" path={patrol} rotate="0" />}
      </circle>
      {/* gate / entry checkpoint */}
      <g>
        <circle cx="100" cy="156" r="3" fill={hi} />
        <circle cx="100" cy="156" r="3" fill="none" stroke={hi} strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim("pulseBlip 3s ease-out infinite") }} />
      </g>
    </Stage>
  );
}

/* ── 03 Surveillance: a control-room feed tracking a subject on screen ── */
function SurveillanceGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  const track = "M 66 122 Q 100 78 138 110";
  const scanlines: number[] = [];
  for (let y = 56; y <= 140; y += 12) scanlines.push(y);
  return (
    <Stage opacity={0.85}>
      <defs>
        <clipPath id="surveilFeedClip">
          <rect x="30" y="44" width="140" height="104" rx="8" />
        </clipPath>
      </defs>
      {/* monitor stand */}
      <line x1="100" y1="148" x2="100" y2="162" stroke={ink} strokeWidth="2" />
      <line x1="82" y1="162" x2="118" y2="162" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      {/* live feed (clipped to the screen) */}
      <g clipPath="url(#surveilFeedClip)">
        {/* scanlines */}
        <g stroke={ink} strokeWidth="0.5" opacity="0.08">
          {scanlines.map((y, i) => (
            <line key={i} x1="30" y1={y} x2="170" y2={y} />
          ))}
        </g>
        {/* refresh sweep */}
        <g style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("scanBar 4s ease-in-out infinite") }}>
          <rect x="30" y="94" width="140" height="3" fill={hi} opacity="0.22" />
        </g>
        {/* other objects on the feed */}
        <circle cx="80" cy="128" r="2.5" fill={ink} opacity="0.3" />
        <circle cx="150" cy="92" r="2.5" fill={ink} opacity="0.3" />
        {/* tracked subject, reticle follows */}
        <g>
          {motion && <animateMotion dur="6s" repeatCount="indefinite" path={track} rotate="0" />}
          <path d="M -9 -3 V -9 H -3 M 3 -9 H 9 V -3 M 9 3 V 9 H 3 M -3 9 H -9 V 3" fill="none" stroke={hi} strokeWidth="1.25" />
          <circle cx="0" cy="0" r="2.5" fill={RED} />
        </g>
      </g>
      {/* monitor bezel */}
      <rect x="30" y="44" width="140" height="104" rx="8" fill="none" stroke={ink} strokeWidth="2" />
      {/* REC indicator */}
      <circle cx="46" cy="58" r="2.4" fill={RED} style={{ animation: anim("liveDot 1.6s ease-in-out infinite") }} />
      <text x="53" y="61" fill={ink} opacity="0.55" fontSize="8" fontFamily="var(--font-geist-mono, monospace)" letterSpacing="0.1em">
        REC
      </text>
      {/* HUD corner brackets */}
      <g stroke={hi} strokeWidth="1.25" opacity="0.55" fill="none">
        <path d="M 40 54 H 34 V 60" />
        <path d="M 160 54 H 166 V 60" />
        <path d="M 40 138 H 34 V 132" />
        <path d="M 160 138 H 166 V 132" />
      </g>
    </Stage>
  );
}

/* ── 04 Secure Transport: the chosen route highlighted across a street plan ── */
function SecureTransportGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  // the vehicle takes one highlighted route through a network of streets
  const route = "M 28 148 H 100 V 92 H 136 V 40";
  const vRoads = [64, 100, 136];
  const hRoads = [56, 92, 148];
  const blocks: [number, number, number, number][] = [
    [30, 30, 24, 16], [74, 30, 16, 16], [110, 30, 24, 16],
    [30, 64, 24, 20], [110, 64, 24, 20], [146, 30, 22, 54],
    [30, 100, 24, 40], [74, 100, 16, 40], [146, 100, 22, 40],
    [30, 156, 60, 12], [110, 156, 58, 12],
  ];
  return (
    <Stage>
      {/* map frame */}
      <rect x="22" y="22" width="156" height="156" rx="6" fill="none" stroke={ink} strokeWidth="0.75" opacity="0.25" />
      {/* city blocks */}
      {blocks.map((b, i) => (
        <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="2" fill={ink} opacity="0.06" />
      ))}
      {/* street network */}
      <g stroke={ink} strokeWidth="1" opacity="0.18">
        {vRoads.map((x) => <line key={`v${x}`} x1={x} y1="24" x2={x} y2="176" />)}
        {hRoads.map((y) => <line key={`h${y}`} x1="24" y1={y} x2="176" y2={y} />)}
      </g>
      {/* minor roads */}
      <g stroke={ink} strokeWidth="0.6" opacity="0.14" strokeDasharray="2 3">
        <line x1="82" y1="24" x2="82" y2="176" />
        <line x1="24" y1="120" x2="176" y2="120" />
      </g>
      {/* the surveyed route, highlighted */}
      <path d={route} fill="none" stroke={hi} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      <path
        d={route} fill="none" stroke={hi} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="10 180"
        style={{ animation: anim("dashFlow 3.2s linear infinite"), strokeDashoffset: 190 }}
      />
      {/* origin + destination */}
      <circle cx="28" cy="148" r="4.5" fill={ink} />
      <g>
        <path d="M 136 30 C 130 30 126 34 126 39 C 126 46 136 54 136 54 C 136 54 146 46 146 39 C 146 34 142 30 136 30 Z" fill={hi} />
        <circle cx="136" cy="39" r="3" fill={ink} opacity="0.55" />
      </g>
      {/* the vehicle taking the route */}
      <rect x="-5.5" y="-3.5" width="11" height="7" rx="2.5" fill={hi} stroke={ink} strokeWidth="0.75">
        {motion && <animateMotion dur="4.6s" repeatCount="indefinite" path={route} rotate="auto" />}
      </rect>
    </Stage>
  );
}

/* ── 05 Airport Meet & Greet: inbound flight, approach, runway and arrivals ── */
function AirportGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  const flight = "M 22 34 Q 96 44 108 96 T 148 150";
  return (
    <Stage>
      {/* holding pattern, faint */}
      <ellipse cx="46" cy="38" rx="20" ry="9" fill="none" stroke={ink} strokeWidth="0.75" strokeDasharray="3 4" opacity="0.22" />
      {/* approach corridor */}
      <path d={flight} fill="none" stroke={ink} strokeWidth="1" strokeDasharray="3 5" opacity="0.32" />
      {/* altitude ticks along the approach */}
      <g stroke={ink} strokeWidth="0.75" opacity="0.3">
        <line x1="70" y1="34" x2="74" y2="42" />
        <line x1="98" y1="58" x2="105" y2="63" />
        <line x1="110" y1="96" x2="118" y2="98" />
        <line x1="126" y1="122" x2="134" y2="122" />
      </g>
      {/* runway */}
      <path d="M 118 176 L 132 138 L 150 138 L 150 176 Z" fill={ink} opacity="0.08" />
      <line x1="134" y1="172" x2="141" y2="140" stroke={hi} strokeWidth="1" strokeDasharray="5 6"
        style={{ animation: anim("dashFlow 1.8s linear infinite"), strokeDashoffset: 22 }} />
      {/* control tower + radar rings */}
      <line x1="100" y1="152" x2="100" y2="132" stroke={ink} strokeWidth="1.5" />
      <rect x="95" y="123" width="10" height="10" rx="1.5" fill="none" stroke={ink} strokeWidth="1.25" />
      {[11, 18].map((r, i) => (
        <circle key={i} cx="100" cy="128" r={r} fill="none" stroke={hi} strokeWidth="0.75" opacity="0.38"
          style={{ transformBox: "view-box", transformOrigin: "100px 128px", animation: anim(`breathe ${3 + i}s ease-in-out infinite`) }} />
      ))}
      {/* the meet point at arrivals */}
      <circle cx="148" cy="150" r="4" fill={hi} />
      <circle cx="148" cy="150" r="4" fill="none" stroke={hi} strokeWidth="1"
        style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim("pulseBlip 2.6s ease-out infinite") }} />
      {/* the aircraft on approach */}
      <path d="M 11 0 L -8 6 L -3 0 L -8 -6 Z" fill={hi} stroke={ink} strokeWidth="0.5">
        {motion && <animateMotion dur="5.5s" repeatCount="indefinite" path={flight} rotate="auto" />}
      </path>
    </Stage>
  );
}

/* ── 06 Venue Security: a venue assessed, covered and checkpointed ── */
function VenueGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  const checkpoints: [number, number][] = [
    [46, 58], [154, 58], [154, 142], [46, 142], [100, 40], [100, 160],
  ];
  const cams: [number, number, number][] = [
    [46, 58, 1], [154, 58, -1],
  ];
  const seats: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) seats.push([70 + c * 20, 98 + r * 14]);
  return (
    <Stage opacity={0.85}>
      {/* secured outer perimeter */}
      <rect x="22" y="30" width="156" height="140" rx="8" fill="none" stroke={ink} strokeWidth="0.75" strokeDasharray="4 6" opacity="0.28" />
      {/* venue shell with two entrances (gaps top + bottom) */}
      <path
        d="M 40 52 H 88 M 112 52 H 160 V 148 H 112 M 88 148 H 40 V 52"
        fill="none" stroke={ink} strokeWidth="1.75" strokeLinejoin="round"
      />
      {/* stage / dais */}
      <rect x="66" y="60" width="68" height="15" rx="2" fill={hi} opacity="0.16" stroke={hi} strokeWidth="0.75" />
      {/* seating blocks */}
      {seats.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="12" height="8" rx="1.5" fill={ink} opacity="0.12" />
      ))}
      {/* CCTV coverage sweeping from the entrance cameras */}
      {cams.map(([x, y, dir], i) => (
        <path
          key={i}
          d={`M ${x} ${y} L ${x + dir * 34} ${y + 22} L ${x + dir * 34} ${y - 2} Z`}
          fill={hi} opacity="0.09"
          style={{ transformBox: "view-box", transformOrigin: `${x}px ${y}px`, animation: anim(`camSweep ${4 + i * 0.7}s ease-in-out infinite`) }}
        />
      ))}
      {/* checkpoints lighting in sequence */}
      {checkpoints.map(([x, y], i) => (
        <circle
          key={i} cx={x} cy={y} r="4" fill={hi}
          style={{ animation: anim(`seqBlink 3s ease-in-out infinite ${i * 0.4}s`) }}
        />
      ))}
      {/* assessment sweep across the venue */}
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("scanBar 3.6s ease-in-out infinite") }}>
        <rect x="40" y="98" width="120" height="4" fill={hi} opacity="0.32" />
        <line x1="40" y1="100" x2="160" y2="100" stroke={hi} strokeWidth="1.25" />
      </g>
    </Stage>
  );
}

/* ── 07 Transit of Documents & Goods: sealed, tracked, chain of custody ── */
function TransitGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  const track = "M 44 110 H 156";
  const telemetry = "M 44 72 H 156";
  const nodes = [72, 100, 128];
  const Lock = ({ x }: { x: number }) => (
    <g>
      <rect x={x - 9} y="104" width="18" height="15" rx="2.5" fill="none" stroke={ink} strokeWidth="1.5" />
      <path d={`M ${x - 5} 104 V 99 A 5 5 0 0 1 ${x + 5} 99 V 104`} fill="none" stroke={ink} strokeWidth="1.5" />
    </g>
  );
  return (
    <Stage>
      {/* telemetry uplink line + a signal running in sync with the package */}
      <line x1="44" y1="72" x2="156" y2="72" stroke={ink} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.28" />
      <text x="44" y="62" fill={ink} opacity="0.35" fontSize="7" fontFamily="var(--font-geist-mono, monospace)" letterSpacing="0.1em">
        LIVE TRACK
      </text>
      <circle r="2.5" fill={RED}>
        {motion && <animateMotion dur="5s" repeatCount="indefinite" path={telemetry} rotate="0" />}
      </circle>
      {/* secured endpoints */}
      <Lock x={36} />
      <Lock x={164} />
      {/* chain-of-custody track */}
      <line x1="44" y1="110" x2="156" y2="110" stroke={ink} strokeWidth="1" opacity="0.3" />
      <line
        x1="44" y1="110" x2="156" y2="110" stroke={hi} strokeWidth="1.5"
        strokeDasharray="6 10" style={{ animation: anim("dashFlow 2.4s linear infinite"), strokeDashoffset: 16 }}
      />
      {/* custody checkpoints, verified in turn */}
      {nodes.map((x, i) => (
        <g key={i}>
          <line x1={x} y1="74" x2={x} y2="108" stroke={ink} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.22" />
          <path d={`M ${x - 4} 110 L ${x} 106 L ${x + 4} 110 L ${x} 114 Z`} fill="none" stroke={ink} strokeWidth="1" opacity="0.5" />
          <circle cx={x} cy="110" r="1.7" fill={hi} style={{ animation: anim(`seqBlink 2.4s ease-in-out infinite ${i * 0.5}s`) }} />
        </g>
      ))}
      {/* the sealed package in transit, beacon riding along */}
      <g>
        {motion && <animateMotion dur="5s" repeatCount="indefinite" path={track} rotate="0" />}
        <circle cx="0" cy="0" r="14" fill="none" stroke={RED} strokeWidth="0.75" opacity="0.55"
          style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim("pulseBlip 2s ease-out infinite") }} />
        <rect x="-11" y="-11" width="22" height="22" rx="3" fill={hi} stroke={ink} strokeWidth="1" />
        <path d="M 0 -11 V 11 M -11 0 H 11" stroke={ink} strokeWidth="0.75" opacity="0.5" />
        <circle cx="0" cy="0" r="3" fill={ink} opacity="0.65" />
      </g>
    </Stage>
  );
}

/* ── 08 Penetration Testing: a lock probed until the weakness shows ── */
function PenTestGraphic({ ink, hi }: GraphicProps) {
  const motion = useMotionEnabled();
  const anim = (a: string) => (motion ? a : "none");
  return (
    <Stage opacity={0.85}>
      {/* faint target field */}
      <circle cx="100" cy="100" r="84" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />
      {/* padlock shackle, testing/lifting */}
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("shackleLift 4s ease-in-out infinite") }}>
        <path d="M 78 92 V 74 A 22 22 0 0 1 122 74 V 92" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* padlock body */}
      <rect x="68" y="92" width="64" height="54" rx="9" fill="none" stroke={ink} strokeWidth="2.5" />
      <circle cx="100" cy="115" r="5" fill={ink} opacity="0.8" />
      <rect x="97.5" y="117" width="5" height="14" rx="2" fill={ink} opacity="0.8" />
      {/* the probe sweep across the lock */}
      <g style={{ transformBox: "view-box", transformOrigin: "center", animation: anim("scanBar 3.2s ease-in-out infinite") }}>
        <rect x="60" y="98" width="80" height="4" fill={hi} opacity="0.4" />
        <line x1="60" y1="100" x2="140" y2="100" stroke={hi} strokeWidth="1.25" />
      </g>
      {/* the exposed vulnerability */}
      <g>
        <circle cx="126" cy="138" r="3" fill={RED} />
        <circle cx="126" cy="138" r="3" fill="none" stroke={RED} strokeWidth="1"
          style={{ transformBox: "fill-box", transformOrigin: "center", animation: anim("pulseBlip 1.9s ease-out infinite") }} />
      </g>
    </Stage>
  );
}
