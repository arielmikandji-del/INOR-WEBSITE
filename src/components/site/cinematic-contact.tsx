"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const WEB3FORMS_KEY = "ba2937ea-88af-4f1a-8e4a-8ba306ab1f07";

const ACCENT = "#2A4A38";

const CONTACT_METHODS: {
  icon: string;
  label: string;
  value: string;
  href?: string;
  note?: string;
}[] = [
  {
    icon: "✉",
    label: "Enquiries",
    value: "operations@inor.uk",
    href: "mailto:operations@inor.uk",
  },
  {
    icon: "⚑",
    label: "Careers",
    value: "operations@inor.uk",
    href: "mailto:operations@inor.uk?subject=Careers%20Application",
    note: "Submit your CV",
  },
  { icon: "◷", label: "Response", value: "Within one business day" },
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
 * Two columns - info + glass form panel - on a dark ground. Left reveals at 0ms,
 * right column delayed 150ms.
 */
export function CinematicContact() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    // Build FormData synchronously before awaiting (the event is reused).
    const formData = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      setStatus(res.ok && data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px),1fr))",
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
                assured.
              </span>
            </h2>
            <p
              className="m-0 mb-12 max-w-[440px] font-mono text-sm"
              style={{ color: "rgba(245,242,238,0.7)", lineHeight: 1.7 }}
            >
              All enquiries reviewed in strict confidence. A member of our team
              will reply with professional discretion implemented.
            </p>

            <div className="mt-auto flex flex-col gap-7">
              {CONTACT_METHODS.map((m) => {
                const body = (
                  <>
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:border-[rgba(245,242,238,0.45)]"
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
                      <span className="font-sans text-lg font-medium transition-colors duration-300 group-hover:text-white">
                        {m.value}
                      </span>
                      {m.note && (
                        <span
                          className="font-mono text-[11px] uppercase"
                          style={{ color: ACCENT, letterSpacing: "0.1em" }}
                        >
                          {m.note}
                        </span>
                      )}
                    </div>
                  </>
                );
                return m.href ? (
                  <a
                    key={m.label}
                    href={m.href}
                    className="group flex items-center gap-4 no-underline"
                    style={{ color: "inherit" }}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={m.label} className="group flex items-center gap-4">
                    {body}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Right column - form */}
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
            {status === "success" ? (
              <div
                className="relative z-10 flex flex-col items-center justify-center gap-4 text-center"
                style={{ minHeight: "320px" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    border: "1px solid rgba(245,242,238,0.2)",
                    background: "rgba(245,242,238,0.05)",
                  }}
                >
                  <span style={{ fontSize: "24px", color: ACCENT }}>✓</span>
                </div>
                <p
                  className="m-0 max-w-[320px] font-mono text-sm"
                  style={{ color: "rgba(245,242,238,0.85)", lineHeight: 1.7 }}
                >
                  Thank you, we will be in touch shortly
                </p>
              </div>
            ) : (
            <form
              className="relative z-10 flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="New enquiry from the INOR Security website"
              />
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden
              />
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="font-sans outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="font-sans outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  className="font-sans outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase" style={labelStyle}>
                  Nature of Enquiry
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="font-sans outline-none"
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={
                  reduce || status === "submitting" ? undefined : { scale: 1.02 }
                }
                whileTap={
                  reduce || status === "submitting" ? undefined : { scale: 0.98 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group mt-2 flex cursor-pointer items-center justify-between rounded-full font-mono text-xs uppercase text-[#F5F2EE]"
                style={{
                  border: "none",
                  background: ACCENT,
                  padding: "16px 32px",
                  letterSpacing: "0.12em",
                  gap: "12px",
                  opacity: status === "submitting" ? 0.7 : 1,
                }}
              >
                <span>Send request</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </motion.button>
              {status === "error" && (
                <p
                  role="alert"
                  className="m-0 font-mono text-xs"
                  style={{ color: "#e2725b", letterSpacing: "0.04em" }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
