/**
 * Hero divider mark (ground truth: INOR Security.dc.html).
 * A thin horizontal rule flanked left/right by gradient-fade lines, centered on
 * a plain circle-with-crosshair glyph (one circle, one horizontal, one vertical
 * line) - intentionally simple, NOT the shield logo. Positioned near the bottom
 * of the hero, over the photo.
 */
export function CelticDivider() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-24 left-0 z-20 w-full"
    >
      <div className="mx-auto flex max-w-[1152px] items-center gap-6 px-6">
        <span
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(220,216,208,0.25))",
          }}
        />
        <svg
          viewBox="0 0 80 56"
          className="h-11 w-auto shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="28"
            r="22"
            fill="none"
            stroke="rgba(245,242,238,0.85)"
            strokeWidth="1.5"
          />
          <line
            x1="18"
            y1="28"
            x2="62"
            y2="28"
            stroke="rgba(245,242,238,0.85)"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="6"
            x2="40"
            y2="50"
            stroke="rgba(245,242,238,0.85)"
            strokeWidth="1"
          />
        </svg>
        <span
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(270deg, transparent, rgba(220,216,208,0.25))",
          }}
        />
      </div>
    </div>
  );
}
