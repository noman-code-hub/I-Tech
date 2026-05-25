"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/our-work" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkBg = !scrolled && pathname === "/";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "#ffffff" : "transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        padding: scrolled ? "10px 0" : "20px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img src="/images/Logo.png" alt="i-TECH Digitals" style={{ height: 40, objectFit: "contain", transform: "scale(var(--logo-scale))", transformOrigin: "left center", filter: isDarkBg ? "brightness(0) invert(1)" : "none", transition: "all 0.3s ease" }} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: active ? "var(--primary)" : (isDarkBg ? "#e2e8f0" : "var(--text-dark)"),
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = isDarkBg ? "#e2e8f0" : "var(--text-dark)";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Info */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isDarkBg ? "#e2e8f0" : "var(--text-dark)" }}>+965 9090 9075</div>
          </div>

          {/* Book Now CTA */}
          <Link
            href="/contact#contact"
            style={{
              background: "linear-gradient(135deg, #6550A1, #543f8e)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: "0.88rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: "0 4px 18px rgba(101,80,161,0.35)",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(101,80,161,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(101,80,161,0.35)";
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Hamburger */}
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: isDarkBg ? "#fff" : "var(--secondary)", transition: "all 0.3s" }} />
          ))}
        </button>
      </div>


      {menuOpen && (
        <nav
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderTop: "1px solid var(--border)",
            boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
            padding: "16px 24px 22px",
            display: "grid",
            gap: 4,
          }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: active ? "var(--primary)" : "var(--secondary)",
                  textDecoration: "none",
                  fontWeight: 700,
                  padding: "12px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: 12, width: "100%" }}
          >
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
