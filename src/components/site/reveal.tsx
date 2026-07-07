"use client";

import { useEffect, useRef } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
// Opacity + transform only: both are GPU-composited and cheap. (A blur-filter
// reveal was repaint-heavy on every wrapped section and caused scroll jank.)
const HIDDEN = {
  opacity: "0",
  transform: "translateY(72px) scale(0.96)",
};

type Props = {
  children: React.ReactNode;
  /** Per-element stagger delay in ms (matches prototype data-reveal-delay). */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Scroll reveal (ground truth: INOR Security.dc.html).
 * Starts at opacity:0, translateY(72px) scale(0.96), blur(8px) and animates to
 * its natural state over 1.1s cubic-bezier(0.22,1,0.36,1) the first time it
 * crosses ~15% into the viewport (IntersectionObserver, threshold 0.15,
 * one-shot). No-op under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    Object.assign(el.style, HIDDEN);
    el.style.transition = `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`;
    el.style.transitionDelay = `${delay}ms`;
    el.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            io.unobserve(e.target);
            // Release the compositor layer once the reveal has finished.
            const clear = () => {
              el.style.willChange = "auto";
              el.removeEventListener("transitionend", clear);
            };
            el.addEventListener("transitionend", clear);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
