"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/our-work" },
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

  useEffect(() => setMenuOpen(false), [pathname]);

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
          <img src="/images/Logo.png" alt="i-TECH Digitals" style={{ height: 40, objectFit: "contain", transform: "scale(2.5)", transformOrigin: "left center", filter: isDarkBg ? "brightness(0) invert(1)" : "none", transition: "all 0.3s ease" }} />
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
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,87,34,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: isDarkBg ? "#94a3b8" : "var(--text-muted)", fontWeight: 500 }}>Call Anytime</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isDarkBg ? "#fff" : "var(--secondary)" }}>+965 9090 9075</div>
            </div>
          </div>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: isDarkBg ? "#fff" : "var(--secondary)", transition: "all 0.3s" }} />
          ))}
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
