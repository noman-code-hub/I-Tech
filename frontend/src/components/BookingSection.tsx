"use client";
import { useState } from "react";
import { postJson } from "@/lib/api";

const SERVICES = [
  "Web & App Development",
  "Branding",
  "Social Media Management",
  "Photography & Videography",
  "Animations",
  "Interior Design",
  "Printing",
  "Studio Rental",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not Sure",
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
  message: string;
}

const EMPTY: FormData = {
  name: "", email: "", phone: "", service: "",
  preferredDate: "", preferredTime: "", budget: "", message: "",
};

// Get today's date in YYYY-MM-DD for min date attribute
const today = new Date().toISOString().split("T")[0];

export default function BookingSection() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailSent, setEmailSent] = useState(true);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const result = await postJson<{ success: boolean; message: string; bookingId: string; emailSent?: boolean }>(
      "/api/booking",
      form
    );

    if (!result.ok) {
      setErrorMsg(result.error);
      setStatus("error");
      return;
    }

    setSubmittedEmail(form.email);
    setSuccessMessage(result.data.message);
    setEmailSent(result.data.emailSent !== false);
    setStatus("success");
    setForm(EMPTY);
  };

  return (
    <section
      id="booking"
      style={{
        background: "linear-gradient(160deg, #0d1b4b 0%, #1a237e 50%, #0d1b4b 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: -100, right: -100, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 350, height: 350,
        background: "radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            display: "inline-block", background: "rgba(255,107,53,0.15)",
            border: "1px solid rgba(255,107,53,0.4)", borderRadius: 50,
            padding: "6px 18px", fontSize: "0.8rem", fontWeight: 600,
            color: "#ff6b35", letterSpacing: "1.5px", textTransform: "uppercase",
            marginBottom: 20,
          }}>
            Book a Consultation
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800,
            color: "#ffffff", margin: "0 0 16px", lineHeight: 1.15,
          }}>
            Schedule Your Free{" "}
            <span style={{
              background: "linear-gradient(90deg, #ff6b35, #ffcc80)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Discovery Call
            </span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.65)", fontSize: "1.05rem",
            maxWidth: 580, margin: "0 auto", lineHeight: 1.7,
          }}>
            Pick a date and time that works for you. We&apos;ll send a confirmation email instantly - no waiting.
          </p>
        </div>

        {/* Main Card */}
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {status === "success" ? (
            <SuccessCard
              onReset={() => setStatus("idle")}
              email={submittedEmail}
              emailSent={emailSent}
              message={successMessage}
            />
          ) : (
            <div style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 24, padding: "clamp(28px, 5vw, 52px)",
            }}>
              {status === "error" && (
                <div style={{
                  background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 10, padding: "14px 20px", marginBottom: 28,
                  color: "#fca5a5", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                  {errorMsg || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Row 1 — Name & Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <FormField label="Full Name *">
                    <input
                      name="name" type="text" placeholder="John Doe"
                      required value={form.name} onChange={handle}
                      style={inputStyle}
                    />
                  </FormField>
                  <FormField label="Email Address *">
                    <input
                      name="email" type="email" placeholder="john@example.com"
                      required value={form.email} onChange={handle}
                      style={inputStyle}
                    />
                  </FormField>
                </div>

                {/* Row 2 — Phone & Service */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <FormField label="Phone Number">
                    <input
                      name="phone" type="tel" placeholder="+965 XXXX XXXX"
                      value={form.phone} onChange={handle}
                      style={inputStyle}
                    />
                  </FormField>
                  <FormField label="Service Required *">
                    <select
                      name="service" required value={form.service} onChange={handle}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Row 3 — Date & Time */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <FormField label="Preferred Date *">
                    <input
                      name="preferredDate" type="date"
                      min={today} required value={form.preferredDate} onChange={handle}
                      style={inputStyle}
                    />
                  </FormField>
                  <FormField label="Preferred Time *">
                    <select
                      name="preferredTime" required value={form.preferredTime} onChange={handle}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Select a time slot...</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Row 4 — Budget */}
                <FormField label="Estimated Budget">
                  <select
                    name="budget" value={form.budget} onChange={handle}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Select budget range (optional)...</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </FormField>

                {/* Row 5 — Message */}
                <FormField label="Tell Us About Your Project">
                  <textarea
                    name="message" placeholder="Describe what you're looking to achieve..."
                    rows={4} value={form.message} onChange={handle}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  />
                </FormField>

                {/* Submit */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      background: status === "loading"
                        ? "rgba(255,107,53,0.5)"
                        : "linear-gradient(135deg, #ff6b35, #e64a19)",
                      color: "#fff", border: "none", padding: "16px 40px",
                      borderRadius: 50, fontSize: "1rem", fontWeight: 700,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                      boxShadow: status === "loading" ? "none" : "0 8px 30px rgba(255,107,53,0.4)",
                      transition: "all 0.3s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner /> Sending Booking...
                      </>
                    ) : (
                      <>
                        📅 Book My Consultation
                      </>
                    )}
                  </button>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", margin: 0 }}>
                    🔒 Your info is safe. We never spam.
                  </p>
                </div>

              </form>
            </div>
          )}
        </div>

        {/* Info Cards Below Form */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
          maxWidth: 820, margin: "32px auto 0",
        }}>
          {[
            { icon: "⚡", title: "Instant Confirmation", desc: "Get a confirmation email the moment you book." },
            { icon: "🎯", title: "No Commitment", desc: "A free discovery call — no pressure, no obligation." },
            { icon: "🌍", title: "We're Available Online", desc: "Remote & in-person consultations available." },
          ].map((card) => (
            <div key={card.title} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "20px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.5 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.3px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SuccessCard({
  onReset,
  email,
  emailSent,
  message,
}: {
  onReset: () => void;
  email: string;
  emailSent: boolean;
  message: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 24, padding: "60px 40px", textAlign: "center",
    }}>
      <div style={{ fontSize: "4rem", marginBottom: 20 }}>🎉</div>
      <h3 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px" }}>
        Booking Confirmed!
      </h3>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 12px" }}>
        {emailSent ? (
          <>
            We&apos;ve sent a confirmation email to{" "}
            <strong style={{ color: "#ffcc80" }}>{email}</strong>.
          </>
        ) : (
          message || "Your booking was received, but email confirmation could not be sent."
        )}
      </p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", margin: "0 0 36px" }}>
        Our team will be in touch within 24 hours to finalize your appointment.
      </p>
      <button
        onClick={onReset}
        style={{
          background: "linear-gradient(135deg, #ff6b35, #e64a19)",
          color: "#fff", border: "none", padding: "14px 36px",
          borderRadius: 50, fontSize: "0.95rem", fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 8px 30px rgba(255,107,53,0.4)",
        }}
      >
        Book Another Consultation
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 10,
  color: "#ffffff",
  fontSize: "0.92rem",
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, background 0.2s ease",
};
