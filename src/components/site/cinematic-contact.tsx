"use client";

import { Reveal } from "./reveal";

const ACCENT = "#2A4A38";

const CONTACT_METHODS = [
  { icon: "☎", label: "Secure Line", value: "+44 (0) 20 7123 4567" },
  { icon: "✉", label: "Encrypted Comms", value: "operations@inorsecurity.com" },
  { icon: "⌖", label: "Headquarters", value: "Mayfair, London, UK" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(245,242,238,0.05)",
  border: "1px solid rgba(245,242,238,0.1)",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#F5F2EE",
};

const labelStyle: React.CSSProperties = {
  letterSpacing: "0.12em",
  color: "rgba(245,242,238,0.5)",
  paddingLeft: "8px",
};

/**
 * Contact (ground truth: INOR Security.dc.html).
 * Two columns — info + glass form panel — on a dark ground. Left reveals at 0ms,
 * right column delayed 150ms.
 */
export function CinematicContact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "#102018", color: "#F5F2EE", padding: "96px 24px" }}
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px,1fr))",
            gap: "64px",
          }}
        >
          {/* Left column */}
          <Reveal className="flex flex-col">
            <span
              className="mb-6 font-mono text-xs font-semibold uppercase"
              style={{ letterSpacing: "0.2em", color: ACCENT }}
            >
              Initiate Contact
            </span>
            <h2
              className="m-0 mb-7 font-sans font-bold"
              style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}
            >
              Confidentiality
              <br />
              <span
                className="font-drama italic"
                style={{ color: "rgba(245,242,238,0.55)", fontSize: "1.1em" }}
              >
                from the first word.
              </span>
            </h2>
            <p
              className="m-0 mb-12 max-w-[440px] font-mono text-sm"
              style={{ color: "rgba(245,242,238,0.7)", lineHeight: 1.7 }}
            >
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>

            <div className="mt-auto flex flex-col gap-7">
              {CONTACT_METHODS.map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{
                      border: "1px solid rgba(245,242,238,0.2)",
                      background: "rgba(245,242,238,0.05)",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{m.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="mb-1 font-mono text-[11px] uppercase"
                      style={{ color: "rgba(245,242,238,0.5)", letterSpacing: "0.12em" }}
                    >
                      {m.label}
                    </span>
                    <span className="font-sans text-lg font-medium">{m.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right column — form */}
          <Reveal
            delay={150}
            className="relative overflow-hidden"
            style={{
              background: "rgba(245,242,238,0.04)",
              border: "1px solid rgba(245,242,238,0.1)",
              padding: "40px",
              borderRadius: "32px",
            }}
          >
            <form
              className="relative z-10 flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Identifier
                </label>
                <input
                  type="text"
                  placeholder="Name or Callsign"
                  className="font-sans outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Comms Relay
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="font-sans outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Nature of Request
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide minimal necessary details..."
                  className="font-sans outline-none"
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>
              <button
                type="submit"
                className="mt-2 flex cursor-pointer items-center justify-between rounded-full font-mono text-xs uppercase text-[#F5F2EE]"
                style={{
                  border: "none",
                  background: ACCENT,
                  padding: "16px 32px",
                  letterSpacing: "0.12em",
                  gap: "12px",
                }}
              >
                <span>Transmit Request</span>
                <span aria-hidden>→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
