"use client";

import { useMemo, useState } from "react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

const JOBS = [
  {
    title: "Frontend Developer",
    location: "Kuwait / Remote",
    type: "Full-time",
    category: "Development",
    description: "Build polished, responsive web experiences with React, Next.js, and modern frontend tooling.",
  },
  {
    title: "Backend Developer",
    location: "Kuwait / Remote",
    type: "Full-time",
    category: "Development",
    description: "Design APIs, integrations, and database workflows that power reliable digital products.",
  },
  {
    title: "UI/UX Designer",
    location: "Kuwait",
    type: "Full-time",
    category: "Design",
    description: "Create user-centered interfaces, wireframes, prototypes, and design systems for client projects.",
  },
  {
    title: "Digital Marketing Specialist",
    location: "Kuwait / Hybrid",
    type: "Full-time",
    category: "Marketing",
    description: "Plan campaigns, manage channels, and translate brand strategy into measurable growth.",
  },
  {
    title: "Sales Executive",
    location: "Kuwait",
    type: "Full-time",
    category: "Sales",
    description: "Build client relationships, qualify opportunities, and help businesses discover the right digital solutions.",
  },
];

const BENEFITS = [
  "Growth-focused projects",
  "Collaborative creative team",
  "Modern tools and workflows",
  "Flexible work culture",
  "Learning and mentorship",
  "Performance recognition",
];

const WHY_ITEMS = [
  {
    title: "Work That Ships",
    text: "Join a team building websites, campaigns, products, and brand systems for real businesses.",
  },
  {
    title: "Creative Ownership",
    text: "We value sharp ideas, thoughtful execution, and people who care about the details.",
  },
  {
    title: "Room To Grow",
    text: "You will work across disciplines and keep developing your craft with each client challenge.",
  },
];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  coverLetter: "",
  website: "",
};

type FormState = typeof EMPTY_FORM;
type Status = "idle" | "loading" | "success" | "error";

export default function CareersPageClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const categories = ["All", ...Array.from(new Set(JOBS.map((job) => job.category)))];

  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      const categoryMatch = category === "All" || job.category === category;
      const searchMatch =
        !search ||
        [job.title, job.location, job.type, job.description, job.category]
          .join(" ")
          .toLowerCase()
          .includes(search);

      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const choosePosition = (position: string) => {
    setForm((current) => ({ ...current, position }));
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!resume) {
      setStatus("error");
      setMessage("Please upload your resume/CV.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    payload.append("resume", resume);

    try {
      const response = await fetch(`${API_BASE}/api/careers`, {
        method: "POST",
        body: payload,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Application could not be submitted.");
      }

      setStatus("success");
      setMessage(data.message || "Application submitted successfully.");
      setForm(EMPTY_FORM);
      setResume(null);
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Application could not be submitted.");
    }
  };

  return (
    <main style={{ background: "#ffffff", paddingTop: 72 }}>
      <section
        style={{
          minHeight: "min(720px, 92vh)",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(110deg, rgba(10,17,40,0.94) 0%, rgba(10,17,40,0.82) 52%, rgba(10,17,40,0.50) 100%), url('/images/about2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 760, padding: "80px 0 96px" }}>
            <div style={eyebrowStyle}>Careers at i-TECH Digitals</div>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(2.7rem, 7vw, 5.8rem)",
                lineHeight: 0.98,
                letterSpacing: 0,
                margin: "0 0 24px",
                fontWeight: 800,
              }}
            >
              Join Our Team & <span style={{ color: "var(--primary)" }}>Grow With Us</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.12rem", lineHeight: 1.8, maxWidth: 620 }}>
              We are always looking for passionate, creative, and driven individuals to join our team and help us build impactful digital solutions.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
              <a href="#open-positions" className="btn-primary">View Open Roles</a>
              <a href="#application-form" style={heroSecondaryButtonStyle}>Apply Now</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py" style={{ background: "#fff" }}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <div className="section-tag">Why Work With Us</div>
            <h2 className="section-title">A place for builders, designers, and growth-minded people.</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We keep the team practical, curious, and close to the work. You will have space to contribute, learn, and make visible impact.
            </p>
          </div>
          <div style={threeColumnGridStyle}>
            {WHY_ITEMS.map((item, index) => (
              <article key={item.title} style={{ ...featureCardStyle, animationDelay: `${index * 80}ms` }}>
                <div style={numberBadgeStyle}>{String(index + 1).padStart(2, "0")}</div>
                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={cardTextStyle}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="open-positions" className="section-py" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div style={{ ...sectionHeaderStyle, marginBottom: 34 }}>
            <div className="section-tag">Open Positions</div>
            <h2 className="section-title">Find your next role.</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Search current openings and apply with your CV. We review every application carefully.
            </p>
          </div>

          <div className="careers-filter-bar" style={filterBarStyle}>
            <input
              type="search"
              placeholder="Search jobs..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              style={lightInputStyle}
            />
            <select value={category} onChange={(event) => setCategory(event.target.value)} style={lightInputStyle}>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div style={jobsGridStyle}>
            {filteredJobs.map((job) => (
              <article key={job.title} style={jobCardStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                  <span style={jobTagStyle}>{job.category}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>{job.type}</span>
                </div>
                <h3 style={{ ...cardTitleStyle, fontSize: "1.35rem" }}>{job.title}</h3>
                <div style={{ color: "var(--primary)", fontWeight: 700, margin: "10px 0 14px" }}>{job.location}</div>
                <p style={{ ...cardTextStyle, minHeight: 78 }}>{job.description}</p>
                <button type="button" className="btn-primary" onClick={() => choosePosition(job.title)} style={{ marginTop: 18 }}>
                  Apply
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="application-form" className="section-py" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="careers-application-layout" style={applicationLayoutStyle}>
            <div>
              <div className="section-tag">Application Form</div>
              <h2 className="section-title">Tell us where you can make an impact.</h2>
              <p className="section-subtitle">
                Upload your CV and share a short note about your experience. Accepted formats: PDF, DOC, DOCX up to 5 MB.
              </p>
              <div style={contactPanelStyle}>
                <h3 style={{ color: "#fff", fontSize: "1.1rem", margin: "0 0 14px" }}>Contact Information</h3>
                <p style={contactTextStyle}>Email: business.itechdigitals@gmail.com</p>
                <p style={contactTextStyle}>Phone: +965 9090 9075</p>
                <p style={contactTextStyle}>Location: Kuwait, serving clients worldwide</p>
              </div>
            </div>

            <form onSubmit={submitApplication} style={formCardStyle}>
              <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
              {status !== "idle" && message && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 8,
                    background: status === "success" ? "#f0fdf4" : "#fef2f2",
                    border: `1px solid ${status === "success" ? "#bbf7d0" : "#fecaca"}`,
                    color: status === "success" ? "#166534" : "#991b1b",
                    fontWeight: 600,
                  }}
                >
                  {message}
                </div>
              )}

              <div className="careers-form-grid" style={formGridStyle}>
                <label style={labelStyle}>Full Name
                  <input name="fullName" required value={form.fullName} onChange={updateField} placeholder="Your full name" style={lightInputStyle} />
                </label>
                <label style={labelStyle}>Email
                  <input name="email" type="email" required value={form.email} onChange={updateField} placeholder="you@example.com" style={lightInputStyle} />
                </label>
                <label style={labelStyle}>Phone Number
                  <input name="phone" type="tel" required value={form.phone} onChange={updateField} placeholder="+965 XXXX XXXX" style={lightInputStyle} />
                </label>
                <label style={labelStyle}>Position Applying For
                  <select name="position" required value={form.position} onChange={updateField} style={lightInputStyle}>
                    <option value="">Select a role</option>
                    {JOBS.map((job) => (
                      <option key={job.title} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label style={labelStyle}>Experience
                <select name="experience" required value={form.experience} onChange={updateField} style={lightInputStyle}>
                  <option value="">Select experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </label>

              <label style={labelStyle}>Cover Letter
                <textarea name="coverLetter" required value={form.coverLetter} onChange={updateField} rows={6} placeholder="Tell us about your work, strengths, and why this role fits you." style={{ ...lightInputStyle, resize: "vertical", lineHeight: 1.6 }} />
              </label>

              <label style={labelStyle}>Resume/CV Upload
                <input
                  name="resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => setResume(event.target.files?.[0] || null)}
                  style={fileInputStyle}
                />
              </label>

              <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ alignSelf: "flex-start", opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-py" style={{ background: "#0a1128" }}>
        <div className="container">
          <div style={{ ...sectionHeaderStyle, marginBottom: 34 }}>
            <div style={{ ...eyebrowStyle, margin: "0 auto 16px" }}>Company Benefits</div>
            <h2 className="section-title" style={{ color: "#fff" }}>What you can expect here.</h2>
          </div>
          <div style={benefitsGridStyle}>
            {BENEFITS.map((benefit) => (
              <div key={benefit} style={benefitItemStyle}>{benefit}</div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        article,
        form {
          animation: careerFade 520ms ease both;
        }

        @keyframes careerFade {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 860px) {
          .container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .careers-filter-bar,
          .careers-application-layout,
          .careers-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

const eyebrowStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  color: "#ffcc80",
  fontSize: "0.78rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 20,
};

const heroSecondaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 30px",
  borderRadius: 50,
  border: "1px solid rgba(255,255,255,0.45)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 700,
};

const sectionHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  maxWidth: 720,
  margin: "0 auto 48px",
};

const threeColumnGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const featureCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: 28,
  boxShadow: "var(--shadow-md)",
};

const numberBadgeStyle: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "rgba(255,87,34,0.1)",
  color: "var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  marginBottom: 22,
};

const cardTitleStyle: React.CSSProperties = {
  color: "var(--secondary)",
  fontSize: "1.15rem",
  margin: "0 0 10px",
};

const cardTextStyle: React.CSSProperties = {
  color: "var(--text-muted)",
  lineHeight: 1.7,
  margin: 0,
};

const filterBarStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 220px",
  gap: 16,
  marginBottom: 28,
};

const jobsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const jobCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: 26,
  boxShadow: "var(--shadow-sm)",
};

const jobTagStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "#fff3e0",
  color: "var(--primary-dark)",
  borderRadius: 999,
  padding: "6px 12px",
  fontSize: "0.78rem",
  fontWeight: 800,
};

const applicationLayoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 0.8fr) minmax(320px, 1.2fr)",
  gap: 46,
  alignItems: "start",
};

const contactPanelStyle: React.CSSProperties = {
  marginTop: 28,
  background: "var(--secondary)",
  borderRadius: 8,
  padding: 26,
  boxShadow: "var(--shadow-lg)",
};

const contactTextStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  margin: "0 0 10px",
};

const formCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  background: "#ffffff",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "clamp(24px, 4vw, 38px)",
  boxShadow: "var(--shadow-lg)",
};

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 18,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  color: "var(--secondary)",
  fontWeight: 700,
  fontSize: "0.9rem",
};

const lightInputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "14px 16px",
  color: "var(--text-dark)",
  background: "#fff",
  fontSize: "0.95rem",
  fontFamily: "inherit",
  outline: "none",
};

const fileInputStyle: React.CSSProperties = {
  ...lightInputStyle,
  padding: "12px 14px",
};

const benefitsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const benefitItemStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  padding: "18px 20px",
  color: "#fff",
  fontWeight: 700,
};
