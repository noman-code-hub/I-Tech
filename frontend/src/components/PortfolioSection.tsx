"use client";
import Link from "next/link";

const projects = [
  { title: "Alnouri Group", cat: "Social Media", img: "/images/portfolio/Alnouri Group Social Media Management.png" },
  { title: "Afreya Website", cat: "Web Development", img: "/images/portfolio/Afreya Website Development.png" },
  { title: "Mandarin Gourmet", cat: "Social Media", img: "/images/portfolio/Mandarin Gourmet Social Media Management.png" },
  { title: "Carly Vehicle Rental App", cat: "App Development", img: "/images/portfolio/Carly Vehicle Rental App Development.png" },
  { title: "Ambrose Abayas", cat: "Photography", img: "/images/portfolio/Ambrose Abayas Photography.png" },
  { title: "JWood Branding", cat: "Branding", img: "/images/portfolio/JWood Branding.png" },
];

export default function PortfolioSection() {
  return (
    <>
      <section id="portfolio" className="bg-navy-pattern section-py" style={{ paddingBottom: 60 }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="section-tag" style={{ color: "#fff" }}>Our Portfolio</div>
              <h2 className="section-title" style={{ color: "#fff", margin: 0 }}>
                Explore Our Recent <span style={{ color: "#fff" }}>Projects</span>
              </h2>
            </div>
            <Link href="/our-work" className="btn-primary">
              View All Projects
            </Link>
          </div>

          <div className="portfolio-grid">
            {projects.map((p, i) => (
              <div key={i} style={{ 
                borderRadius: 16, 
                overflow: "hidden", 
                background: "linear-gradient(145deg, #151c35, #0d142a)", 
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
              }}
              >
                {/* Image */}
                <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
                   <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} 
                   onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                   onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                   />
                </div>
                
                {/* Info Box */}
                <div style={{ padding: "28px 20px", textAlign: "center" }}>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.02em", marginBottom: 10 }}>{p.title}</h3>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {p.cat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orange Stats Band */}
      <div style={{ background: "var(--primary)", padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 30, textAlign: "center", color: "#fff" }}>
            {[
              { num: "670+", label: "Projects Completed" },
              { num: "99%", label: "Success Rate" },
              { num: "8+", label: "Years Experience" },
              { num: "100+", label: "Happy Clients" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ fontSize: "2rem", fontWeight: 800 }}>{s.num}</div>
                <div style={{ fontSize: "0.9rem", textAlign: "left", opacity: 0.9, lineHeight: 1.3, maxWidth: 100 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
