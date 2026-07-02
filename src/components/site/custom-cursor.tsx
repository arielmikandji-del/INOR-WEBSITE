"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor (ground truth: INOR Security.dc.html).
 * An 8px solid dot tracks the pointer 1:1; a 36px ring trails it with
 * exponential smoothing (lerp 0.16/frame) via requestAnimationFrame. Both use
 * mix-blend-mode: difference so they invert against any background. The ring
 * scales to 1.7x (smoothed 0.2) over a/button/input/textarea.
 *
 * Skipped entirely under prefers-reduced-motion and on coarse pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      rs = 1,
      hover = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      hover = !!(t && t.closest && t.closest("a,button,input,textarea"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const targetScale = hover ? 1.7 : 1;
      rs += (targetScale - rs) * 0.2;
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px) scale(${rs.toFixed(3)})`;
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid #F5F2EE",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F5F2EE",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-100px,-100px)",
        }}
      />
    </>
  );
}
