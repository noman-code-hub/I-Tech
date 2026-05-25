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

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const result = await postJson<{ success: boolean; message: string; leadId: string }>(
      "/api/contact",
      form
    );

    if (!result.ok) {
      setErrorMsg(result.error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px",
    border: "1px solid var(--border)", borderRadius: 8,
    fontFamily: "'Inter',sans-serif", fontSize: "0.95rem",
    color: "var(--text-dark)", background: "#fff",
    outline: "none", transition: "all 0.25s ease",
  };

  return (
    <section id="contact" className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          
          {/* Left Form */}
          <div>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">
              Ready to elevate your brand <span>with i-TECH?</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              Fill out the form and our team will get back to you within 24 hours to discuss your project.
            </p>

            {status === "success" ? (
              <div style={{ padding: "30px", background: "#f0fdf4", color: "#166534", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We will contact you soon.</p>
                <button onClick={() => setStatus("idle")} className="btn-primary" style={{ marginTop: 20 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {status === "error" && (
                  <div style={{ padding: "14px 18px", background: "#fef2f2", color: "#991b1b", borderRadius: 8, border: "1px solid #fecaca" }}>
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <input name="name" type="text" placeholder="Your Name" required value={form.name} onChange={handle} style={inputStyle} />
                  <input name="email" type="email" placeholder="Your Email" required value={form.email} onChange={handle} style={inputStyle} />
                </div>
                <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handle} style={inputStyle} />
                <select name="service" value={form.service} onChange={handle} style={inputStyle}>
                  <option value="">Select a service (optional)</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <textarea name="message" placeholder="Write your message here..." required rows={5} value={form.message} onChange={handle} style={{ ...inputStyle, resize: "vertical" }} />
                
                <div>
                  <button type="submit" className="btn-primary" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Image */}
          <div style={{ borderRadius: 24, height: 500, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
             <img src="/images/about1.png" alt="Contact Us" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             {/* Small accent circle */}
             <div style={{ position: "absolute", top: 30, left: 30, width: 60, height: 60, background: "var(--secondary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", boxShadow: "var(--shadow-lg)" }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
