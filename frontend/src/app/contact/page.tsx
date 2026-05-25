import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact i-TECH Digitals",
  description: "Send us a message. i-TECH Digitals responds within 24 hours. Based in Kuwait, serving clients worldwide.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Page Hero */}
      <div style={{
        background: "linear-gradient(rgba(10,17,40,0.82), rgba(10,17,40,0.95)), url('/images/about2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 0 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            border: "1px solid rgba(255,87,34,0.3)",
            borderRadius: 50,
            padding: "6px 20px",
            marginBottom: 20
          }}>
            <span style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Contact
            </span>
          </div>
          <h1 className="section-title" style={{ color: "#fff" }}>
            Let&apos;s <span style={{ color: "var(--primary)" }}>Work Together</span>
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "#e5e7eb" }}>
            Send us a message. We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact / Message Form */}
      <ContactSection />
    </div>
  );
}
