"use client";

const testimonials = [
  { 
    name: "Alberta Infantino", 
    company: "DEVELOPER", 
    quote: "paradigms. Monotonectally extend open-source mvia competitive methods of empowerment dri revolutionize stand- business", 
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    name: "Hosain Al-Amin", 
    company: "DEVELOPER", 
    quote: "paradigms. Monotonectally extend open-source mvia competitive methods of empowerment dri revolutionize stand- business", 
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  { 
    name: "M.Kamrul Islam", 
    company: "DEVELOPER", 
    quote: "paradigms. Monotonectally extend open-source mvia competitive methods of empowerment dri revolutionize stand- business", 
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "#060b19", position: "relative", overflow: "hidden", padding: "100px 0", fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Subtle dotted background overlay to simulate map */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.4 }} />
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ 
            display: "inline-block", 
            border: "1px solid rgba(255,255,255,0.2)", 
            borderRadius: 50, 
            padding: "6px 20px",
            marginBottom: 20 
          }}>
            <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>
              — TESTIMONIALS
            </span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 700 }}>
            What Our Customer <span style={{ color: "#fff" }}>Says</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30, maxWidth: 1050, margin: "0 auto" }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              
              {/* Card */}
              <div style={{
                background: "#121927", 
                borderRadius: 16,
                padding: "40px 30px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                minHeight: 260,
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
              }}>
                {/* Outline Quote Icon */}
                <div style={{ color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11h-4a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h4l-2 9zm11 0h-4a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h4l-2 9z" />
                  </svg>
                </div>
                
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 24, flex: 1 }}>
                  {t.quote}
                </p>

                {/* Stars */}
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" fill="#ffb400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>

                {/* Name & Role */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                  <h4 style={{ color: "#fff", fontSize: "0.95rem", margin: 0, fontWeight: 600 }}>{t.name}</h4>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{t.company}</span>
                </div>
              </div>

              {/* Line and Avatar Container */}
              <div style={{ position: "relative", width: "100%", height: 60, marginTop: 10 }}>
                {/* Fading horizontal red/orange line */}
                <div style={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: 0, 
                  right: 0, 
                  height: 1, 
                  background: "linear-gradient(90deg, transparent, rgba(101,80,161,0.4) 30%, rgba(101,80,161,0.4) 70%, transparent)" 
                }} />
                
                {/* Avatar cutting through the line */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "6px solid #060b19", /* matches section bg perfectly to simulate gap */
                  background: "#060b19",
                  zIndex: 2
                }}>
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
