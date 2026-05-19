import type { Metadata } from "next";
import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services – ITech Digitals",
  description: "Explore ITech Digitals full range of services: web development, branding, animations, social media, photography, videography, printing, and studio rental.",
};

const serviceDetails = [
  {
    num: "01", title: "Web & App Development", color: "#ff5722",
    icon: "⌨️",
    description: "We craft high-performance websites and mobile applications tailored to your business goals. From landing pages to complex enterprise platforms, we deliver pixel-perfect, scalable solutions using the latest technologies.",
    features: ["Custom Website Design & Development", "Mobile App Development (iOS & Android)", "E-Commerce Platforms", "CMS Integration", "API Development & Integration", "Performance Optimization & SEO"],
  },
  {
    num: "02", title: "Interior Design", color: "#0a1128",
    icon: "🏠",
    description: "We create stunning, functional environments that reflect your brand identity. Our interior design team blends aesthetics with practicality to transform any space into an inspiring experience.",
    features: ["Commercial Space Design", "Office & Retail Design", "3D Visualization & Rendering", "Space Planning", "Material & Furniture Selection", "Project Management"],
  },
  {
    num: "03", title: "Animations", color: "#ff5722",
    icon: "✨",
    description: "From explainer videos to full brand motion campaigns, our animation team produces visually stunning 2D and 3D animations that engage your audience and communicate your message powerfully.",
    features: ["2D & 3D Animation", "Motion Graphics", "Explainer Videos", "Product Animations", "Logo Animations", "Social Media Reels & Stories"],
  },
  {
    num: "04", title: "Social Media Management", color: "#0a1128",
    icon: "📱",
    description: "We manage your brand's entire social media presence — from content creation and scheduling to community engagement and paid advertising — so you can focus on running your business.",
    features: ["Content Strategy & Planning", "Graphic Design & Copywriting", "Community Management", "Paid Advertising Campaigns", "Analytics & Reporting", "Influencer Collaboration"],
  },
  {
    num: "05", title: "Photography & Videography", color: "#ff5722",
    icon: "📷",
    description: "Our professional visual team captures your brand story through stunning photography and cinematic videography. We handle everything from product shoots to full corporate video productions.",
    features: ["Product & Commercial Photography", "Brand Storytelling Videos", "Event Coverage", "Corporate Headshots", "Real Estate Photography", "Drone Aerial Footage"],
  },
  {
    num: "06", title: "Printing", color: "#0a1128",
    icon: "🖨️",
    description: "We deliver high-quality print materials that make lasting impressions. From business cards to large-format banners, our printing services ensure your physical touchpoints match your digital brand.",
    features: ["Business Cards & Stationery", "Brochures & Flyers", "Banners & Signage", "Packaging Design & Print", "Branded Merchandise", "Large Format Printing"],
  },
  {
    num: "07", title: "Branding", color: "#ff5722",
    icon: "✦",
    description: "We build complete brand identities from scratch — logo design, color systems, typography, and comprehensive brand guidelines — ensuring your brand communicates the right message at every touchpoint.",
    features: ["Logo Design & Identity", "Brand Strategy & Positioning", "Brand Guidelines Manual", "Marketing Collateral Design", "Brand Refresh & Rebranding", "Packaging & Label Design"],
  },
  {
    num: "08", title: "Studio Rental", color: "#0a1128",
    icon: "🎬",
    description: "Access our state-of-the-art production studio equipped with professional lighting, backdrops, and equipment for photography, videography, and content creation sessions.",
    features: ["Professional Lighting Setup", "Multiple Backdrop Options", "Photography Equipment", "Videography Rigs & Monitors", "Podcast & Interview Setup", "Flexible Half/Full Day Bookings"],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div style={{ 
        background: "linear-gradient(rgba(10,17,40,0.85), rgba(10,17,40,0.95)), url('/images/about2.png')", 
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
              — What We Offer
            </span>
          </div>
          <h1 className="section-title" style={{ color: "#fff" }}>Our <span style={{ color: "var(--primary)" }}>Services</span></h1>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "#e5e7eb" }}>
            End-to-end digital and creative services — from strategy to execution — all under one roof.
          </p>
        </div>
      </div>

      {/* Detailed service cards */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {serviceDetails.map((s, i) => (
              <div key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1.6fr" : "1.6fr 1fr",
                  gap: 48, alignItems: "center",
                  background: i % 2 === 0 ? "#fff" : "linear-gradient(135deg,#fff1ed 0%,#f8f9fa 100%)",
                  borderRadius: 24, padding: "40px 48px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Visual (order flips on even/odd) */}
                {i % 2 !== 0 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", order: 1 }}>
                    <div style={{ width: 180, height: 180, background: `linear-gradient(145deg,${s.color}18,${s.color}35)`, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", boxShadow: `0 20px 50px ${s.color}25` }}>
                      {s.icon}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div style={{ order: i % 2 !== 0 ? 2 : undefined }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: s.color, letterSpacing: "0.1em", marginBottom: 6 }}>{s.num}</div>
                  <h2 style={{ fontFamily: "'Baskervville',serif", fontSize: "1.9rem", color: "var(--text-dark)", marginBottom: 16 }}>{s.title}</h2>
                  <p style={{ fontSize: "0.93rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 24 }}>{s.description}</p>
                  <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", listStyle: "none" }}>
                    {s.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-dark)" }}>
                        <span style={{ width: 18, height: 18, background: `${s.color}20`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" fill={s.color} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke={s.color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary" style={{ marginTop: 28, display: "inline-flex" }}>
                    Get a Quote
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>

                {i % 2 === 0 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 180, height: 180, background: `linear-gradient(145deg,${s.color}18,${s.color}35)`, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", boxShadow: `0 20px 50px ${s.color}25` }}>
                      {s.icon}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gradient-primary)", padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Baskervville',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", marginBottom: 16 }}>Not Sure Which Service You Need?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: "1.05rem" }}>Let&apos;s have a conversation. We&apos;ll help you find the best solution for your goals.</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "var(--primary)", padding: "14px 32px", borderRadius: 50, fontWeight: 600, textDecoration: "none", fontSize: "0.9rem", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
            Talk to an Expert
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
