"use client";
import Link from "next/link";

const features = [
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: "Branding", desc: "Crafting unique identities." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: "App Development", desc: "Scalable mobile solutions." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: "Web Solutions", desc: "High-performance websites.", active: true },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>, title: "Animations", desc: "Engaging visual stories." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title: "Digital Marketing", desc: "Data-driven growth." },
];

export default function HeroSection() {
  return (
    <section id="hero" style={{ position: "relative" }}>
      {/* Dark Top Section */}
      <div className="bg-navy-pattern" style={{ padding: "180px 0 160px", position: "relative", overflow: "hidden" }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "var(--primary)", opacity: 0.1, filter: "blur(80px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 300, height: 300, background: "#fff", opacity: 0.05, filter: "blur(60px)", borderRadius: "50%" }} />
        
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* Left Content */}
          <div>
            <div className="section-tag" style={{ color: "var(--primary)" }}>LEADING TECH & DESIGN AGENCY</div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff", fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
              Itech Digitals: Pioneering Design Excellence for Your Success
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "1.1rem", marginBottom: 40, maxWidth: 500, lineHeight: 1.8 }}>
              We redefine design excellence, transforming your vision into captivating reality. Elevate your brand with our bespoke solutions crafted for success.
            </p>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <Link href="/contact" className="btn-primary">
                Learn More
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", border: "2px solid rgba(255,87,34,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                Watch Video
              </div>
            </div>
          </div>

          {/* Right Content (Image) */}
          <div style={{ position: "relative", height: 480 }}>
             <div style={{ position: "absolute", inset: 0, border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "50%", transform: "scale(0.95)" }} />
             <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,87,34,0.3)", borderRadius: "50%", transform: "scale(0.75)" }} />
             
             <img src="/images/hero.png" alt="IT Expert" style={{ position: "absolute", top: "-20%", bottom: "0%", left: "50%", transform: "translateX(-50%)", height: "150%", width: "150%", objectFit: "contain", objectPosition: "bottom center", zIndex: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }} />
             
             {/* Floating cards */}
             <div style={{ position: "absolute", top: "20%", right: "-12%", background: "var(--primary)", padding: "16px", borderRadius: 12, color: "#fff", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-primary)", animation: "float 4s ease-in-out infinite" }}>
                <div style={{ fontSize: "2rem" }}>🏆</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>670+</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>Projects Done</div>
                </div>
             </div>

             <div style={{ position: "absolute", bottom: "15%", left: "8%", background: "#fff", padding: "16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-lg)", animation: "float 4s ease-in-out infinite 2s" }}>
                <div style={{ width: 40, height: 40, background: "rgba(255,87,34,0.1)", color: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "var(--secondary)", fontSize: "1.2rem" }}>99%</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Success Rate</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Overlapping Cards Container */}
      <div className="container" style={{ marginTop: "-80px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: f.active ? "var(--primary)" : "#fff",
              color: f.active ? "#fff" : "var(--text-dark)",
              padding: "32px 20px",
              borderRadius: 16,
              textAlign: "center",
              boxShadow: "var(--shadow-lg)",
              transform: f.active ? "scale(1.05) translateY(-10px)" : "none",
              transition: "transform 0.3s ease",
            }}>
              <div style={{ 
                width: 56, height: 56, 
                margin: "0 auto 20px", 
                background: f.active ? "rgba(255,255,255,0.2)" : "rgba(255,87,34,0.1)", 
                borderRadius: "50%", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                fontSize: "1.5rem" 
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: f.active ? "#fff" : "var(--secondary)" }}>{f.title}</h3>
              <p style={{ fontSize: "0.85rem", color: f.active ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .container > div { grid-template-columns: 1fr !important; }
          .container > div:last-child { display: none !important; } /* Hide grid graphic on mobile */
        }
      `}</style>
    </section>
  );
}
