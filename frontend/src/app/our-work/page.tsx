"use client";
import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Branding", "Web Development", "App Development", "Social Media", "Photography", "Videography", "Animations"];

const projects = [
  { title: "Alnouri Group", cat: "Social Media", desc: "Complete social media strategy, content creation, and community management for a leading Kuwait group.", color: "#ff5722", year: "2024" },
  { title: "Afreya Website", cat: "Web Development", desc: "Modern corporate website with CMS, multilingual support, and booking integration for Afreya Kuwait.", color: "#0a1128", year: "2023" },
  { title: "Mandarin Gourmet", cat: "Social Media", desc: "Food photography direction, social content, and campaign management for a premium restaurant brand.", color: "#ff5722", year: "2024" },
  { title: "Qirdala Jewelry", cat: "Videography", desc: "Cinematic brand video and product showcases for a luxury jewelry brand in Kuwait.", color: "#0a1128", year: "2023" },
  { title: "JWood", cat: "Branding", desc: "Complete brand identity including logo, packaging design, and brand guidelines for a custom woodwork brand.", color: "#ff5722", year: "2023" },
  { title: "Carly Vehicle Rental App", cat: "App Development", desc: "End-to-end mobile app design and development for a Kuwait-based vehicle rental platform.", color: "#0a1128", year: "2024" },
  { title: "Ambrose Abayas", cat: "Photography", desc: "Premium fashion photography campaign showcasing an abaya collection with editorial-style visuals.", color: "#ff5722", year: "2023" },
  { title: "Afreya Kuwait", cat: "Animations", desc: "Explainer animation and motion graphics for social media campaigns and digital advertising.", color: "#0a1128", year: "2023" },
  { title: "Out Of Blue", cat: "Branding", desc: "Full brand identity creation — logo, color palette, typography system, and stationery design.", color: "#ff5722", year: "2022" },
  { title: "Promise Portraits", cat: "Photography", desc: "Portrait and lifestyle photography for a professional photography studio based in Islamabad.", color: "#0a1128", year: "2022" },
  { title: "Tubee", cat: "Videography", desc: "Brand launch video and social media content for a consumer product brand entering the Kuwait market.", color: "#ff5722", year: "2024" },
  { title: "Ojairy & Zain Calendar", cat: "Web Development", desc: "Interactive web-based calendar application with events, reminders, and Arabic/English UI support.", color: "#0a1128", year: "2023" },
];

const catIcons: Record<string, string> = {
  "Branding": "✦", "Web Development": "⌨", "App Development": "📱",
  "Social Media": "📲", "Photography": "📷", "Videography": "🎬", "Animations": "✨",
};

export default function OurWorkPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div style={{ 
        background: "linear-gradient(rgba(10,17,40,0.82), rgba(10,17,40,0.95)), url('/images/about1.png')",
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
              — Portfolio
            </span>
          </div>
          <h1 className="section-title" style={{ color: "#fff" }}>Our <span style={{ color: "var(--primary)" }}>Creative Work</span></h1>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "#e5e7eb" }}>
            A curated showcase of projects we&apos;re proud of — from brand identities to apps, campaigns, and visual stories.
          </p>
        </div>
      </div>

      {/* Filter + Grid */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 52 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: "9px 22px", borderRadius: 50,
                  border: `1.5px solid ${active === cat ? "var(--primary)" : "var(--border)"}`,
                  background: active === cat ? "var(--gradient-primary)" : "#fff",
                  color: active === cat ? "#fff" : "var(--text-muted)",
                  fontSize: "0.83rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.25s ease",
                  fontFamily: "'Roboto',sans-serif",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {cat !== "All" && <span>{catIcons[cat]}</span>}
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 36 }}>
            Showing <strong style={{ color: "var(--primary)" }}>{filtered.length}</strong> {filtered.length === 1 ? "project" : "projects"}
            {active !== "All" && <> in <strong style={{ color: "var(--primary)" }}>{active}</strong></>}
          </p>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
            {filtered.map((p, i) => (
              <div key={p.title}
                onMouseEnter={() => setHovered(p.title)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "#fff", borderRadius: 20, overflow: "hidden",
                  border: "1px solid var(--border)",
                  boxShadow: hovered === p.title ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  transform: hovered === p.title ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.35s ease",
                  cursor: "pointer",
                  animation: `fadeInUp 0.5s ease ${i * 0.05}s both`,
                }}
              >
                {/* Visual */}
                <div style={{
                  height: 220, position: "relative", overflow: "hidden",
                  background: `linear-gradient(135deg,${p.color}15 0%,${p.color}30 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: 90, height: 90,
                    background: `${p.color}22`,
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2.8rem",
                    transition: "transform 0.3s ease",
                    transform: hovered === p.title ? "scale(1.12)" : "scale(1)",
                  }}>
                    {catIcons[p.cat] ?? "◈"}
                  </div>

                  {/* Overlay on hover */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg,${p.color}cc,${p.color}99)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: hovered === p.title ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}>
                    <div style={{ color: "#fff", textAlign: "center", padding: "0 24px" }}>
                      <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>View Project</div>
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>

                  {/* Badge */}
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.95)", borderRadius: 50, padding: "5px 14px", fontSize: "0.72rem", fontWeight: 600, color: p.color }}>{p.cat}</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.95)", borderRadius: 50, padding: "5px 14px", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)" }}>{p.year}</div>
                </div>

                {/* Info */}
                <div style={{ padding: "22px 26px" }}>
                  <h3 style={{ fontFamily: "'Baskervville',serif", fontSize: "1.15rem", color: "var(--text-dark)", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#fff1ed 0%,#f8f9fa 100%)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <div className="section-tag" style={{ margin: "0 auto 16px" }}>Let&apos;s Collaborate</div>
          <h2 className="section-title">Your Project Could Be <span className="gradient-text">Next</span></h2>
          <p className="section-subtitle" style={{ margin: "0 auto 36px" }}>
            We take on select projects that align with our passion for quality. Let&apos;s talk about yours.
          </p>
          <Link href="/contact" className="btn-primary" id="work-cta">
            Start a Project
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
