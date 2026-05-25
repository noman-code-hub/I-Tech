"use client";
import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Branding", "Web Development", "App Development", "Social Media", "Photography", "Animations"];

const projects = [
  { title: "Afreya Kuwait Branding", cat: "Branding", desc: "Luxurious brand identity design, logo mark, and typography system for a perfume brand.", img: "/images/portfolio/Afreya Kuwait Branding.png", color: "#0a1128", year: "2023" },
  { title: "Afreya Product Illustration", cat: "Animations", desc: "Creative illustrations and motion graphics showcasing perfume ingredients.", img: "/images/portfolio/Afreya Product Illustration.png", color: "#6550A1", year: "2023" },
  { title: "Afreya Product Photography", cat: "Photography", desc: "Elegant, minimalist product photography campaign for the premium fragrance line.", img: "/images/portfolio/Afreya Scented Product Photography.png", color: "#0a1128", year: "2023" },
  { title: "Afreya Social Media Management", cat: "Social Media", desc: "Curated content grids, copy design, and community management for the fragrance launch.", img: "/images/portfolio/Afreya Social Media Management.png", color: "#6550A1", year: "2024" },
  { title: "Afreya Website Development", cat: "Web Development", desc: "High-performance e-commerce storefront with custom checkout and localization support.", img: "/images/portfolio/Afreya Website Development.png", color: "#0a1128", year: "2023" },
  { title: "Alnouri Group Social Media", cat: "Social Media", desc: "Social strategy, content creation, and monthly campaign planning for a leading Kuwait business group.", img: "/images/portfolio/Alnouri Group Social Media Management.png", color: "#6550A1", year: "2024" },
  { title: "Ambrose Abayas Illustration", cat: "Animations", desc: "Artistic fashion illustrations and custom graphics for print and digital collections.", img: "/images/portfolio/Ambrose Abayas Illustration.png", color: "#0a1128", year: "2023" },
  { title: "Ambrose Abayas Photography", cat: "Photography", desc: "High-fashion editorial photoshoot showcasing seasonal designer abayas.", img: "/images/portfolio/Ambrose Abayas Photography.png", color: "#6550A1", year: "2023" },
  { title: "Ambrose Abayas Social Media", cat: "Social Media", desc: "Aesthetic grids, story designs, and customer interactions for a premium fashion house.", img: "/images/portfolio/Ambrose Abayas Social Media Management.png", color: "#0a1128", year: "2024" },
  { title: "Ambrose Abayas E-Commerce", cat: "Web Development", desc: "A fast, fully responsive shop with advanced filtering, lookbook, and cart workflows.", img: "/images/portfolio/Ambrose Abayas Website Development.png", color: "#6550A1", year: "2023" },
  { title: "Bavaria Group Social Media", cat: "Social Media", desc: "Corporate communications and social marketing strategy for Bavaria Group.", img: "/images/portfolio/Bavaria Group Social Media Management.png", color: "#0a1128", year: "2024" },
  { title: "Birthday Bliss Photography", cat: "Photography", desc: "Capturing candid family moments, joy, and custom details at a themed birthday celebration.", img: "/images/portfolio/Birthday Bliss Photography.png", color: "#6550A1", year: "2024" },
  { title: "Carly Vehicle Rental App", cat: "App Development", desc: "End-to-end design and cross-platform mobile app development for a smart car-rental service.", img: "/images/portfolio/Carly Vehicle Rental App Development.png", color: "#0a1128", year: "2024" },
  { title: "Challenge Sports Academy", cat: "Social Media", desc: "Dynamic sports action content, student highlights, and campaign management.", img: "/images/portfolio/Challenge Sports Academy Social Media Management.png", color: "#6550A1", year: "2024" },
  { title: "Cords CMS Development", cat: "Web Development", desc: "Custom-built headless content management system tailored for media publications.", img: "/images/portfolio/Cords CMS Development.png", color: "#0a1128", year: "2023" },
  { title: "Delisana Cookies Social Media", cat: "Social Media", desc: "Appealing food styling posts, interactive reels, and community growth campaigns.", img: "/images/portfolio/Delisana Cookies Social Media Management.png", color: "#6550A1", year: "2024" },
  { title: "Diana & Roma Illustration", cat: "Animations", desc: "Colorful custom storyboards and cartoon assets for children's digital content.", img: "/images/portfolio/Diana & Roma Illustration.png", color: "#0a1128", year: "2023" },
  { title: "Fajar Cattan Photography", cat: "Photography", desc: "Outdoor commercial photography session highlighting seasonal styles.", img: "/images/portfolio/Fajar Cattan Photography.png", color: "#6550A1", year: "2023" },
  { title: "Freaking Fried Ice Cream", cat: "Animations", desc: "Fun, vibrant food character illustrations and promotional graphics.", img: "/images/portfolio/Freaking Fried Ice Cream Illustration.jpg", color: "#0a1128", year: "2023" },
  { title: "Google Ads Campaign", cat: "Social Media", desc: "Structured search and display campaigns driving positive ROI for client services.", img: "/images/portfolio/Google Ads Campaign.avif", color: "#6550A1", year: "2024" },
  { title: "Hoodifit Kuwait Branding", cat: "Branding", desc: "Sporty, energetic brand identity, packaging, and digital assets design.", img: "/images/portfolio/Hoodifit Kuwait Branding.png", color: "#0a1128", year: "2023" },
  { title: "JWood Branding", cat: "Branding", desc: "Organic, premium brand mark and marketing collateral for a custom wood studio.", img: "/images/portfolio/JWood Branding.png", color: "#6550A1", year: "2023" },
  { title: "JY Restaurant Photography", cat: "Photography", desc: "High-contrast culinary photography showcasing signature dishes and ambiance.", img: "/images/portfolio/JY Restaurant Photography.png", color: "#0a1128", year: "2023" },
  { title: "JY Restaurant Social Media", cat: "Social Media", desc: "Mouth-watering content streams, dining promotions, and local influencer campaigns.", img: "/images/portfolio/JY Restaurant Social Media Management.png", color: "#6550A1", year: "2024" },
  { title: "Mama-to-Be Photography", cat: "Photography", desc: "Warm, emotional maternity portraits captured in natural light settings.", img: "/images/portfolio/Mama-to-Be Photography.png", color: "#0a1128", year: "2023" },
  { title: "Mandarin Gourmet Photography", cat: "Photography", desc: "Food styling and commercial menu photoshoots for a fine dining Asian kitchen.", img: "/images/portfolio/Mandarin Gourmet Photography.png", color: "#6550A1", year: "2023" },
  { title: "Mandarin Gourmet Social Media", cat: "Social Media", desc: "Premium content grids and brand representation for an upscale dining hotspot.", img: "/images/portfolio/Mandarin Gourmet Social Media Management.png", color: "#0a1128", year: "2024" },
  { title: "Mayatara Branding", cat: "Branding", desc: "Sleek, fashion-forward brand strategy, packaging, and custom labels.", img: "/images/portfolio/Mayatara Branding.png", color: "#6550A1", year: "2023" },
  { title: "Modest Kuwait Website", cat: "Web Development", desc: "Clean, editorial style fashion e-commerce website with fast loading performance.", img: "/images/portfolio/Modest Kuwait Website Development.png", color: "#0a1128", year: "2023" },
  { title: "My Simit CMS Development", cat: "Web Development", desc: "A custom blog, inventory manager, and landing page backend for a café chain.", img: "/images/portfolio/My Simit CMS Development.png", color: "#6550A1", year: "2023" },
  { title: "Newborn Memories Photography", cat: "Photography", desc: "Soft, adorable baby portrait photography done in a cozy home studio setting.", img: "/images/portfolio/Newborn Memories Photography.png", color: "#0a1128", year: "2023" },
  { title: "Ojairy and Zain Calendar", cat: "Web Development", desc: "Custom interactive web calendar with daily details and clean translations.", img: "/images/portfolio/Ojairy and Zain Calendar Design.png", color: "#6550A1", year: "2023" },
  { title: "Out Of Blue Branding", cat: "Branding", desc: "Bold branding style, featuring striking graphics, blue themes, and sleek print designs.", img: "/images/portfolio/Out Of Blue Branding.png", color: "#0a1128", year: "2022" },
  { title: "Promise Portraits", cat: "Photography", desc: "Beautiful outdoor family shoots and memorable anniversary event coverages.", img: "/images/portfolio/Promise Portraits Photography.png", color: "#6550A1", year: "2022" },
  { title: "Protect Me Illustration", cat: "Animations", desc: "Vibrant and engaging educational illustrations for a safety campaign.", img: "/images/portfolio/Protect Me Illustration Design.png", color: "#0a1128", year: "2023" },
  { title: "SEO & Growth Campaign", cat: "Web Development", desc: "Deep technical search engine optimization driving keywords to ranking spot #1.", img: "/images/portfolio/SEO Campaign.avif", color: "#6550A1", year: "2024" },
  { title: "Story Book Illustrations", cat: "Animations", desc: "Full book illustrations, cover art, and digital publishing format setup.", img: "/images/portfolio/Story Book Illustrations.png", color: "#0a1128", year: "2023" },
  { title: "Teni Time Branding", cat: "Branding", desc: "Vibrant visual identity, mascot concept design, and business branding package.", img: "/images/portfolio/Teni Time Branding.png", color: "#6550A1", year: "2023" },
  { title: "Timeless Engagements", cat: "Photography", desc: "Capturing love, joy, and delicate details of engagement ceremonies.", img: "/images/portfolio/Timeless Engagements Photography.png", color: "#0a1128", year: "2023" },
  { title: "Twins Birthday Photography", cat: "Photography", desc: "Fun-filled, colorful outdoor double birthday bash coverage.", img: "/images/portfolio/Twins Birthday Photography.png", color: "#6550A1", year: "2024" },
];


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
            border: "1px solid rgba(255,255,255,0.2)", 
            borderRadius: 50, 
            padding: "6px 20px",
            marginBottom: 20 
          }}>
            <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              — Portfolio
            </span>
          </div>
          <h1 className="section-title" style={{ color: "#fff" }}>Our <span style={{ color: "#fff" }}>Creative Work</span></h1>
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
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}
              >
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
                  height: 240, position: "relative", overflow: "hidden",
                  background: "#f3f4f6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform: hovered === p.title ? "scale(1.06)" : "scale(1)",
                    }}
                  />

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
      <section style={{ background: "linear-gradient(135deg,#f3f0fa 0%,#f8f9fa 100%)", padding: "80px 0", textAlign: "center" }}>
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
