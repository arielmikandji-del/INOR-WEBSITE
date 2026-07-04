/**
 * Footer (ground truth: INOR Security.dc.html).
 * Near-black band with a top hairline. Left: the full footer lockup
 * (shield-and-name-footer.svg - already recolored warm white for the dark
 * ground, so no filter) + copyright. Right: legal links.
 */
export function CinematicFooter() {
  return (
    <footer
      className="relative z-10 w-full"
      style={{
        background: "#0a120d",
        color: "#F5F2EE",
        borderTop: "1px solid rgba(245,242,238,0.1)",
        padding: "48px 24px",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
        <div className="flex flex-col items-start gap-4">
          <img
            src="/assets/shield-and-name-footer.svg"
            alt="INOR Security"
            className="h-[72px] w-auto object-contain"
          />
          <p
            className="m-0 font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.12em", color: "rgba(245,242,238,0.4)" }}
          >
            © {new Date().getFullYear()} INOR Security. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="font-mono text-[10px] uppercase no-underline"
            style={{ letterSpacing: "0.12em", color: "rgba(245,242,238,0.6)" }}
          >
            Privacy Protocol
          </a>
          <a
            href="#"
            className="font-mono text-[10px] uppercase no-underline"
            style={{ letterSpacing: "0.12em", color: "rgba(245,242,238,0.6)" }}
          >
            Terms of Engagement
          </a>
        </div>
      </div>
    </footer>
  );
}
