"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when decorative motion is allowed — i.e. the user has NOT
 * requested reduced motion. Mirrors the prototype's `motionEnabled` flag but
 * wires it to the OS `prefers-reduced-motion` preference (as the handoff notes
 * should be done in production). Starts `false` on the server / first paint so
 * SSR markup is the static, motion-off variant, then upgrades on the client.
 */
export function useMotionEnabled(): boolean {
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOK(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return motionOK;
}
