"use client";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="section-py" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="about-grid">

          {/* Left - Visual */}
          <div style={{ position: "relative" }}>
            <div className="about-images-grid">
              {/* Image 1 */}
              <div className="about-img-1" style={{ borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "var(--shadow-lg)" }}>
                <img src="/images/about1.png" alt="Team Collaboration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--primary)", width: "80%", padding: "16px", borderTopLeftRadius: 24, color: "#fff", fontWeight: 700, zIndex: 2 }}>
                  8+ Years Exp.
                </div>
              </div>
              {/* Image 2 */}
              <div className="about-img-2" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
                <img src="/images/about2.png" alt="IT Professional" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>

            {/* Orange decorative dot pattern */}
            <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, backgroundImage: "radial-gradient(var(--primary) 2px, transparent 2px)", backgroundSize: "16px 16px", zIndex: -1 }} />
          </div>

          {/* Right - Text */}
          <div>
            <div className="section-tag">About Us</div>
            <h2 className="section-title">
              Essential IT Solutions For Modern <span>Businesses.</span>
            </h2>
            <p className="section-subtitle">
              i-TECH Digitals is a leading tech & design agency. We blend technical expertise with creative artistry to craft experiences that captivate, convert, and endure across Kuwait and Pakistan.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {[
                { title: "Innovation", desc: "Pushing boundaries with cutting-edge solutions." },
                { title: "Precision", desc: "Meticulous attention to quality and pixel-perfect work." }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(101,80,161,0.1)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
