"use client";
import Link from "next/link";

const services = [
  { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Web Development", desc: "High-performance, scalable websites and applications.", active: false },
  { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title: "Branding", desc: "Crafting memorable identities and marketing collateral.", active: false },
  { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title: "Digital Marketing", desc: "Data-driven strategies and social media campaigns.", active: true },
  { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>, title: "Photography & Video", desc: "Cinematic storytelling and professional brand photography.", active: false },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-py" style={{ background: "#ffffff" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-tag">Our Services</div>
          <h2 className="section-title" style={{ maxWidth: 600, margin: "0 auto" }}>
            How Professional IT Services Can Drive <span>Success.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 30 }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: s.active ? "var(--primary)" : "#f8f9fa",
              color: s.active ? "#fff" : "var(--text-dark)",
              padding: "40px 30px",
              borderRadius: 16,
              border: s.active ? "none" : "1px solid var(--border)",
              boxShadow: s.active ? "var(--shadow-primary)" : "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 24, color: s.active ? "#fff" : "var(--primary)" }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 16, color: s.active ? "#fff" : "var(--secondary)" }}>
                {s.title}
              </h3>
              <p style={{ color: s.active ? "rgba(255,255,255,0.85)" : "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24 }}>
                {s.desc}
              </p>
              <Link href="/services" style={{ 
                color: s.active ? "#fff" : "var(--primary)", 
                textDecoration: "none", 
                fontWeight: 600, 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8 
              }}>
                Read More
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
