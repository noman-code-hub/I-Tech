import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us – ITech Digitals",
  description: "Learn about ITech Digitals — a leading tech and design agency with offices in Kuwait and Pakistan, delivering creative excellence since 2016.",
};

const team = [
  { name: "Creative Director", role: "Brand & Visual Strategy", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
  { name: "Lead Developer", role: "Web & App Engineering", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  { name: "Motion Designer", role: "2D / 3D Animation", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg> },
  { name: "Social Strategist", role: "Digital Marketing", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
  { name: "Photographer", role: "Brand Photography", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg> },
  { name: "Videographer", role: "Cinematic Production", icon: <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg> },
];

const milestones = [
  { year: "2016", event: "Founded in Kuwait with a small team of 3 passionate creatives." },
  { year: "2018", event: "Expanded services to include full web development and mobile apps." },
  { year: "2020", event: "Opened Pakistan office in Islamabad to serve a growing South Asian market." },
  { year: "2022", event: "Launched professional photography & videography studio in Kuwait." },
  { year: "2024", event: "Crossed 670+ completed projects and 100+ active brand partnerships." },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div style={{ 
        background: "linear-gradient(rgba(10,17,40,0.85), rgba(10,17,40,0.95)), url('/images/about1.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        padding: "120px 0 100px", 
        textAlign: "center", 
        position: "relative", 
        overflow: "hidden" 
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ color: "#fff" }}>Our Story</div>
          <h1 className="section-title" style={{ color: "#fff" }}>About <span style={{ color: "#fff" }}>i-TECH Digitals</span></h1>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "#e5e7eb" }}>
            We are a passionate team of designers, developers, and storytellers — united by a love for creating exceptional digital experiences.
          </p>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30, marginBottom: 80 }}>
            {[
              { icon: "🎯", title: "Our Mission", text: "To empower businesses with world-class creative and technological solutions that drive measurable growth, foster brand loyalty, and establish lasting digital presence." },
              { icon: "🔭", title: "Our Vision", text: "To be the most trusted creative partner in the MENA and South Asia region — known for innovation, reliability, and transformative outcomes for every client we serve." },
              { icon: "💎", title: "Our Values", text: "We believe in absolute transparency, relentless innovation, and a customer-first approach. Excellence is not just our goal—it is our standard in every single project." },
            ].map(item => (
              <div key={item.title} className="card" style={{ padding: "40px 44px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{item.icon}</div>
                <h2 style={{ fontFamily: "'Baskervville',serif", fontSize: "1.7rem", color: "var(--text-dark)", marginBottom: 14 }}>{item.title}</h2>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.85 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Stats banner */}
          <div style={{ background: "var(--gradient-primary)", borderRadius: 24, padding: "50px 60px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
            {[["8+", "Years"], ["670+", "Projects"], ["99%", "Success"], ["2", "Offices"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Baskervville',serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py" style={{ background: "linear-gradient(135deg,#f3f0fa 0%,#f8f9fa 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">Milestones That <span className="gradient-text">Define Us</span></h2>
          </div>
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,var(--primary),var(--secondary))", transform: "translateX(-50%)" }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: 32, marginBottom: 36, flexDirection: i % 2 === 0 ? "row" : "row-reverse", position: "relative" }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
                  <div style={{ background: "#fff", borderRadius: 14, padding: "18px 24px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)", display: "inline-block", maxWidth: 280 }}>
                    <div style={{ fontFamily: "'Baskervville',serif", fontSize: "1.3rem", color: "var(--primary)", fontWeight: 700, marginBottom: 6 }}>{m.year}</div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{m.event}</p>
                  </div>
                </div>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 16, height: 16, background: "var(--gradient-primary)", borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 0 0 3px rgba(101,80,161,0.2)", zIndex: 1 }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-tag">The People</div>
            <h2 className="section-title">Meet the <span className="gradient-text">Dream Team</span></h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>A multidisciplinary crew of passionate creators who love what they do.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, maxWidth: 1000, margin: "0 auto" }}>
            {team.map(m => (
              <div key={m.name} className="card" style={{ padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 80, height: 80, background: "linear-gradient(145deg,#f3f0fa,#e9e4f5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{m.icon}</div>
                <h3 style={{ fontFamily: "'Baskervville',serif", fontSize: "1.1rem", color: "var(--text-dark)", marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gradient-primary)", padding: "70px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Baskervville',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", marginBottom: 14 }}>Ready to Work With Us?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32 }}>Let&apos;s create something extraordinary together.</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "var(--primary)", padding: "14px 32px", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>
            Start a Conversation
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
