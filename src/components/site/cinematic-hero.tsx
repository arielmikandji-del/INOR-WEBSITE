"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { CelticDivider } from "./celtic-divider";
import { useMotionEnabled } from "@/lib/use-motion";

const ACCENT = "#2A4A38";
const EASE = [0.22, 1, 0.36, 1] as const;

/* Restrained, sequential entrance - reads as "systems coming online",
   not decorative flourish. */
const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

// Exact shield paths from the prototype (INOR Security.dc.html).
const SHIELD_PATHS = [
  "M 304.882812 209.484375 C 304.882812 209.585938 304.847656 209.671875 304.777344 209.742188 C 304.707031 209.8125 304.625 209.847656 304.523438 209.847656 L 174.820312 209.847656 C 174.730469 209.847656 174.65625 209.8125 174.59375 209.75 C 174.53125 209.6875 174.5 209.613281 174.5 209.523438 C 174.519531 207.855469 174.582031 206.589844 174.691406 205.726562 C 178.371094 176.601562 191.808594 149.574219 212.265625 128.996094 C 232.769531 108.367188 260.648438 94.675781 289.863281 92.203125 C 290.074219 92.1875 290.253906 92.25 290.40625 92.394531 C 290.558594 92.535156 290.636719 92.710938 290.636719 92.921875 L 290.636719 175.6875 C 290.636719 175.808594 290.59375 175.914062 290.507812 176 C 290.421875 176.085938 290.316406 176.128906 290.195312 176.128906 L 265.667969 176.128906 C 265.539062 176.128906 265.425781 176.082031 265.335938 175.992188 C 265.242188 175.898438 265.195312 175.789062 265.195312 175.65625 L 265.195312 125.296875 C 265.195312 125.214844 265.175781 125.136719 265.136719 125.066406 C 265.097656 124.992188 265.046875 124.933594 264.976562 124.886719 C 264.910156 124.839844 264.835938 124.8125 264.753906 124.800781 C 264.671875 124.792969 264.59375 124.804688 264.515625 124.832031 C 236.800781 136.003906 217.691406 155.605469 207.195312 183.636719 C 207.160156 183.730469 207.164062 183.824219 207.214844 183.914062 C 207.261719 184.003906 207.335938 184.0625 207.433594 184.085938 C 208.484375 184.34375 209.648438 184.46875 210.925781 184.453125 C 223.804688 184.308594 242.246094 184.292969 266.246094 184.414062 C 278.664062 184.472656 291.128906 184.25 304.660156 184.398438 C 304.808594 184.398438 304.882812 184.472656 304.882812 184.625 Z M 304.882812 209.484375 ",
  "M 313.722656 92.261719 C 317.144531 92.382812 319.691406 92.554688 321.363281 92.78125 C 332.878906 94.296875 344.023438 97.519531 354.792969 102.449219 C 392.976562 119.925781 420.1875 154.144531 428.40625 195.644531 C 429.371094 200.488281 429.917969 204.925781 430.046875 208.960938 C 430.054688 209.207031 429.976562 209.414062 429.808594 209.589844 C 429.640625 209.765625 429.433594 209.855469 429.195312 209.851562 L 347.371094 209.851562 C 347.234375 209.851562 347.117188 209.804688 347.023438 209.707031 C 346.925781 209.609375 346.875 209.488281 346.875 209.351562 L 346.875 184.902344 C 346.875 184.761719 346.925781 184.640625 347.027344 184.542969 C 347.125 184.441406 347.246094 184.390625 347.386719 184.390625 L 396.992188 184.390625 C 397.109375 184.394531 397.21875 184.367188 397.320312 184.3125 C 397.425781 184.257812 397.511719 184.183594 397.582031 184.089844 C 397.648438 183.996094 397.691406 183.886719 397.707031 183.773438 C 397.722656 183.65625 397.710938 183.542969 397.671875 183.433594 C 394.324219 174.015625 389.585938 165.175781 383.453125 156.914062 C 372.160156 141.699219 357.578125 130.824219 339.714844 124.292969 C 339.46875 124.199219 339.25 124.246094 339.0625 124.433594 C 338.875 124.621094 338.824219 124.839844 338.914062 125.085938 C 339.25 126.039062 339.011719 127.207031 339.011719 128.519531 C 339.007812 145.414062 338.992188 162.5625 338.964844 179.964844 C 338.953125 190.460938 338.996094 198.394531 339.101562 203.761719 C 339.28125 213.011719 339.222656 220.96875 338.921875 227.636719 C 338.910156 227.898438 338.808594 228.121094 338.617188 228.300781 C 338.425781 228.484375 338.199219 228.574219 337.933594 228.574219 L 313.421875 228.574219 C 313.339844 228.574219 313.269531 228.542969 313.210938 228.484375 C 313.152344 228.425781 313.125 228.355469 313.125 228.273438 L 313.125 92.839844 C 313.125 92.675781 313.183594 92.535156 313.300781 92.421875 C 313.417969 92.308594 313.558594 92.257812 313.722656 92.261719 Z M 313.722656 92.261719 ",
  "M 290.644531 219.328125 L 290.644531 352.425781 C 290.644531 352.550781 290.59375 352.65625 290.496094 352.734375 C 290.398438 352.816406 290.289062 352.839844 290.164062 352.816406 C 286.628906 352.117188 282.6875 351.9375 278.753906 351.144531 C 261.585938 347.695312 245.734375 341.144531 231.203125 331.496094 C 216.65625 321.839844 204.632812 309.644531 195.128906 294.910156 C 184.105469 277.824219 177.265625 258.867188 174.601562 238.046875 C 174.578125 237.851562 174.632812 237.675781 174.765625 237.527344 C 174.894531 237.375 175.0625 237.300781 175.261719 237.300781 L 256.148438 237.300781 C 256.363281 237.300781 256.546875 237.375 256.699219 237.527344 C 256.851562 237.679688 256.925781 237.863281 256.925781 238.078125 L 256.925781 261.882812 C 256.925781 262.09375 256.851562 262.273438 256.707031 262.417969 C 256.558594 262.566406 256.378906 262.640625 256.171875 262.640625 L 207.996094 262.640625 C 207.726562 262.644531 207.550781 262.773438 207.46875 263.03125 C 207.386719 263.289062 207.457031 263.496094 207.683594 263.644531 C 208.28125 264.058594 208.132812 264.429688 208.3125 264.867188 C 216.03125 283.472656 228.121094 298.527344 244.574219 310.027344 C 251.007812 314.523438 257.6875 318.203125 264.613281 321.070312 C 264.679688 321.097656 264.746094 321.109375 264.816406 321.101562 C 264.886719 321.09375 264.953125 321.070312 265.011719 321.03125 C 265.070312 320.992188 265.117188 320.941406 265.148438 320.878906 C 265.179688 320.816406 265.199219 320.75 265.195312 320.679688 L 265.195312 219.335938 C 265.195312 219.195312 265.246094 219.074219 265.347656 218.976562 C 265.445312 218.878906 265.566406 218.828125 265.707031 218.828125 L 290.132812 218.828125 C 290.273438 218.828125 290.394531 218.875 290.496094 218.972656 C 290.59375 219.074219 290.644531 219.191406 290.644531 219.328125 Z M 290.644531 219.328125 ",
  "M 339.125 271.742188 L 339.125 321.070312 C 339.125 321.175781 339.167969 321.261719 339.257812 321.320312 C 339.34375 321.382812 339.4375 321.394531 339.535156 321.355469 C 345.5 319.035156 351.242188 316.074219 356.765625 312.46875 C 374.636719 300.792969 387.730469 285.101562 396.046875 265.398438 C 396.359375 264.632812 396.234375 264.132812 396.796875 263.511719 C 396.953125 263.339844 396.984375 263.148438 396.890625 262.933594 C 396.792969 262.722656 396.632812 262.617188 396.398438 262.617188 L 299.453125 262.617188 C 299.296875 262.617188 299.160156 262.5625 299.050781 262.449219 C 298.9375 262.335938 298.882812 262.199219 298.882812 262.042969 L 298.882812 237.996094 C 298.882812 237.8125 298.949219 237.660156 299.078125 237.53125 C 299.207031 237.402344 299.367188 237.335938 299.550781 237.335938 L 429.089844 237.335938 C 429.214844 237.335938 429.335938 237.363281 429.453125 237.414062 C 429.566406 237.46875 429.667969 237.539062 429.75 237.636719 C 429.835938 237.730469 429.894531 237.835938 429.933594 237.957031 C 429.96875 238.078125 429.980469 238.199219 429.964844 238.324219 C 428.757812 247.640625 426.472656 257.136719 423.109375 266.820312 C 411.523438 300.207031 386.996094 326.941406 355.167969 341.96875 C 343.789062 347.34375 331.007812 350.878906 316.832031 352.574219 C 315.753906 352.703125 314.652344 352.957031 313.574219 352.835938 C 313.441406 352.824219 313.335938 352.765625 313.246094 352.667969 C 313.160156 352.570312 313.117188 352.453125 313.117188 352.320312 L 313.117188 271.539062 C 313.117188 271.464844 313.140625 271.402344 313.195312 271.347656 C 313.246094 271.296875 313.3125 271.269531 313.386719 271.269531 L 338.652344 271.269531 C 338.78125 271.269531 338.894531 271.316406 338.984375 271.410156 C 339.078125 271.5 339.125 271.613281 339.125 271.742188 Z M 339.125 271.742188 ",
];

/**
 * Hero (ground truth: INOR Security.dc.html).
 * Full-bleed photo-suv-dusk.jpg + diagonal scrim, left-aligned copy block that
 * fades/slides up on load, and a large accent shield "island" on the right with
 * two pulsing heartbeat rings and a subtle scale-pulse. Bottom crosshair divider
 * sits over the photo.
 */
export function CinematicHero() {
  const motionOn = useMotionEnabled();
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100dvh] w-full items-center justify-between overflow-hidden px-6"
      style={{ background: "#102018" }}
    >
      {/* Background photo + diagonal scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/photo-suv-dusk.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 30%",
            filter: "saturate(0.8) brightness(0.9)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,32,24,0.95) 0%, rgba(16,32,24,0.82) 45%, rgba(16,32,24,0.45) 100%)",
          }}
        />
      </div>

      {/* Left content */}
      <motion.div
        className="relative z-30 flex w-full max-w-[720px] flex-col items-start"
        style={{ paddingTop: "120px" }}
        variants={heroStagger}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <h1 className="m-0 flex flex-col gap-2.5">
          <motion.span
            variants={heroItem}
            className="font-sans font-bold uppercase text-[#F5F2EE]"
            style={{ fontSize: "clamp(20px,3vw,30px)", letterSpacing: "-0.01em" }}
          >
            Executive protection meets
          </motion.span>
          <motion.span
            variants={heroItem}
            className="font-sans font-bold uppercase text-[#F5F2EE]"
            style={{ fontSize: "clamp(20px,3vw,30px)", letterSpacing: "-0.01em" }}
          >
            Absolute discretion.
          </motion.span>
        </h1>

        <motion.p
          variants={heroItem}
          className="mt-9 max-w-[440px] font-mono text-sm uppercase"
          style={{
            color: "rgba(245,242,238,0.7)",
            letterSpacing: "0.08em",
            lineHeight: 1.7,
          }}
        >
          Fully vetted operators with essential police and military experience.
          Single point command structure. Security packages designed to be
          specific to the principal.
        </motion.p>

        <motion.a
          href="#contact"
          variants={heroItem}
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-11 inline-flex w-fit items-center justify-center rounded-full font-mono text-sm font-semibold uppercase text-[#F5F2EE] no-underline"
          style={{
            background: ACCENT,
            padding: "16px 34px",
            letterSpacing: "0.14em",
            boxShadow: "0 10px 30px rgba(16,32,24,0.35)",
          }}
        >
          <span>Request Consultation</span>
        </motion.a>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-wrap items-center gap-3.5"
        >
          {["Military & counterterrorism background", "SIA-licensed operators", "24/7 tasking"].map(
            (label, i) => (
              <span key={label} className="flex items-center gap-3.5">
                {i > 0 && (
                  <span
                    className="h-[3px] w-[3px] rounded-full"
                    style={{ background: "rgba(245,242,238,0.3)" }}
                    aria-hidden
                  />
                )}
                <span
                  className="font-mono text-[11px] uppercase"
                  style={{ color: "rgba(245,242,238,0.5)", letterSpacing: "0.12em" }}
                >
                  {label}
                </span>
              </span>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Right brand-mark island - bold on desktop, faint watermark on mobile */}
      <div
        className="pointer-events-none absolute top-1/2 z-[4] flex items-center justify-center right-[-24%] opacity-[0.14] md:right-[6%] md:z-[6] md:opacity-100"
        style={{
          transform: "translateY(-50%)",
          width: "clamp(340px, 58vw, 560px)",
          height: "clamp(340px, 58vw, 560px)",
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 h-[94%] w-[94%] rounded-full"
          style={{
            border: "1px solid rgba(245,242,238,0.45)",
            transform: "translate(-50%,-50%)",
            opacity: 0,
            animation: motionOn ? "heartbeatRing 6.5s ease-out infinite" : "none",
          }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-[94%] w-[94%] rounded-full"
          style={{
            border: "1px solid rgba(245,242,238,0.45)",
            transform: "translate(-50%,-50%)",
            opacity: 0,
            animation: motionOn
              ? "heartbeatRing 6.5s ease-out infinite 3.25s"
              : "none",
          }}
        />
        <svg
          viewBox="0 0 611.25 453.749987"
          role="img"
          aria-label="INOR Security"
          className="relative z-[1] shrink-0"
          style={{
            width: "128%",
            height: "auto",
            filter: "drop-shadow(0 10px 26px rgba(0,0,0,0.5))",
            animation: motionOn ? "heartbeatPulse 3.6s ease-in-out infinite" : "none",
          }}
        >
          {SHIELD_PATHS.map((d, i) => (
            <path key={i} fill={ACCENT} fillRule="nonzero" d={d} />
          ))}
        </svg>
      </div>

      {/* Bottom crosshair divider (over the photo) */}
      <CelticDivider />
    </section>
  );
}
