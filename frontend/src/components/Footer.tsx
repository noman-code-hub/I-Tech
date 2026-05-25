"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Orange Top Band CTA */}
      <div style={{ background: "var(--primary)", padding: "40px 0" }}>
        <div className="container footer-cta">
          <div className="footer-cta-info">
            <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", fontWeight: 500 }}>Call Us For Any Inquiry</div>
              <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>+965 9090 9075</div>
            </div>
          </div>
          <Link href="/contact" style={{ background: "var(--secondary)", color: "#fff", padding: "14px 32px", borderRadius: 50, fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease" }}>
            Get Free Consultation
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-navy-pattern" style={{ padding: "80px 0 40px", color: "#9ca3af" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 60, marginBottom: 30 }}>
            
            {/* Brand Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <img src="/images/Logo.png" alt="i-TECH Digitals" style={{ height: 40, objectFit: "contain", transform: "scale(var(--logo-scale))", transformOrigin: "left center", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24 }}>
                Envision. Execute. Elevate. Pioneering design excellence and transforming your vision into captivating reality across Kuwait and Pakistan.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { name: "LinkedIn", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, url: "#" },
                  { name: "Insta KW", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, url: "#" },
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, background: "rgba(255,255,255,0.05)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", transition: "all 0.3s ease", textDecoration: "none" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* IT Services */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: 20 }}>IT Services</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Web Development", "App Development", "Branding & Identity", "Digital Marketing", "Photography", "Animations"].map(item => (
                  <li key={item}>
                    <Link href="/services" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>›</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: 20 }}>Quick Links</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[["About Us", "/about"], ["Our Work", "/our-work"], ["Contact Us", "/contact"], ["Privacy Policy", "/"], ["Terms & Conditions", "/"]].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>›</span> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: 20 }}>Contact Info</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", marginTop: 4 }}>📍</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>Kuwait Office</div>
                    <div style={{ fontSize: "0.9rem" }}>Zawya Complex, Hawally</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", marginTop: 4 }}>📍</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>Pakistan Office</div>
                    <div style={{ fontSize: "0.9rem" }}>E-11/3, Islamabad</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", marginTop: 4 }}>✉️</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>Email Us</div>
                    <div style={{ fontSize: "0.9rem" }}>itechkw.business@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", flexWrap: "wrap", gap: 10 }}>
            <div>© {new Date().getFullYear()} i-TECH Digitals. All Rights Reserved.</div>
            <div>Powered by i-TECH Digitals</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
