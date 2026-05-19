"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 8, suffix: "+", label: "Years of Experience", icon: "⭐" },
  { number: 670, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { number: 99, suffix: "%", label: "Client Success Rate", icon: "✅" },
  { number: 2, suffix: "", label: "Global Offices", icon: "🌍" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let current = 0;
    const duration = 1600;
    const steps = 60;
    const increment = target / steps;
    const intervalMs = duration / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" style={{
      background: "var(--gradient-primary)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="blob" style={{ width: 400, height: 400, background: "#fff", top: -100, right: -50, opacity: 0.05 }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
        backgroundSize: "50px 50px",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.6s ease ${i * 0.12}s`,
            }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Baskervville',serif",
                fontSize: "clamp(2.5rem,5vw,3.8rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                marginBottom: 10,
              }}>
                <CountUp target={s.number} suffix={s.suffix} active={visible} />
              </div>
              <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, letterSpacing: "0.04em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
