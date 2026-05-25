"use client";

import { useState, useRef } from "react";

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
    icon: (
      <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 8.41a14.97 14.97 0 0 0-6.16 12.12c2.44-.06 4.7-.88 6.54-2.28m5.58-3.88c-.62-.62-1.5-.62-2.12 0l-5.36 5.36M15 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </svg>
    ),
  },
  {
    title: "Creative Ownership",
    text: "We value sharp ideas, thoughtful execution, and people who care about the details.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-3h.01M9 9a3 3 0 1 1 6 0c0 .997-.4 1.83-1.042 2.458C13.344 12.062 13 12.72 13 13.5v.5h-2v-.5c0-.78-.344-1.438-.958-2.042A3.978 3.978 0 0 1 9 9Zm-1 12h8v-2H8v2Z" />
      </svg>
    ),
  },
  {
    title: "Room To Grow",
    text: "You will work across disciplines and keep developing your craft with each client challenge.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 8c2-3 5-3 5-3v4c0 3-5 5-5 5M12 12c-2-2.5-5-2.5-5-2.5v3.5c0 2.5 5 4 5 4" />
      </svg>
    ),
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
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<{ fullName: string; position: string; email: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
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

      setSubmittedDetails({
        fullName: form.fullName,
        position: form.position,
        email: form.email,
      });
      setStatus("success");
      setMessage(data.message || "Application submitted successfully.");
      setForm(EMPTY_FORM);
      setResume(null);
      formEl?.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Application could not be submitted.");
    }
  };

  return (
    <main style={{ background: "#ffffff", paddingTop: 72 }}>
      <section
        style={{
          background: "linear-gradient(rgba(10,17,40,0.82), rgba(10,17,40,0.95)), url('/images/about2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 0 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 50,
              padding: "6px 20px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Careers
            </span>
          </div>
          <h1 className="section-title" style={{ color: "#fff" }}>
            Join Our Team & <span style={{ color: "#fff" }}>Grow With Us</span>
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "#e5e7eb" }}>
            We are always looking for passionate, creative, and driven individuals to join our team and help us build impactful digital solutions.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 34 }}>
            <a href="#application-form" className="btn-primary">Apply Now</a>
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
                <div style={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(145deg, #f3f0fa, #e9e4f5)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 22px",
                }}>
                  {item.icon}
                </div>
                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={cardTextStyle}>{item.text}</p>
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
                <h3 style={{ fontFamily: "'Baskervville', serif", color: "#fff", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 24px" }}>
                  Contact Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={contactIconContainerStyle}>
                      <svg width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <div style={contactLabelStyle}>Email Address</div>
                      <div style={contactValueStyle}>business.itechdigitals@gmail.com</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={contactIconContainerStyle}>
                      <svg width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.631-5.187-3.995-6.818-6.82l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <div style={contactLabelStyle}>Phone Number</div>
                      <div style={contactValueStyle}>+965 9090 9075</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={contactIconContainerStyle}>
                      <svg width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <div style={contactLabelStyle}>Office Location</div>
                      <div style={contactValueStyle}>Kuwait & Islamabad, serving worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={submitApplication} style={formCardStyle}>
              <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
              {status === "error" && message && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 8,
                    background: "#fef2f2",
                    border: `1px solid #fecaca`,
                    color: "#991b1b",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    animation: "careerFade 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
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

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={labelStyle}>Resume/CV Upload</span>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                      if ([".pdf", ".doc", ".docx"].includes(ext)) {
                        setResume(file);
                      } else {
                        setStatus("error");
                        setMessage("Invalid file format. Please upload a PDF, DOC, or DOCX file.");
                      }
                    }
                  }}
                  style={{
                    border: isDragging
                      ? "2px dashed var(--primary)"
                      : resume
                      ? "2px solid #22c55e"
                      : "2px dashed #d1d5db",
                    borderRadius: 12,
                    padding: "24px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragging
                      ? "rgba(101, 80, 161, 0.04)"
                      : resume
                      ? "rgba(34, 197, 94, 0.02)"
                      : "#fafafa",
                    transition: "all 0.2s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    position: "relative",
                  }}
                  className="file-upload-zone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setResume(file);
                    }}
                    style={{ display: "none" }}
                  />

                  {resume ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          backgroundColor: "rgba(34, 197, 94, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#166534",
                        }}>
                          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ color: "#1f2937", fontWeight: 600, fontSize: "0.9rem", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {resume.name}
                          </div>
                          <div style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                            {(resume.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResume(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "none",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#dc2626",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        className="file-remove-btn"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        backgroundColor: "rgba(101, 80, 161, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)",
                        marginBottom: 4,
                      }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: "#4b5563", fontSize: "0.92rem", display: "block" }}>
                          Drag & drop your resume, or <span style={{ color: "var(--primary)", textDecoration: "underline" }}>browse</span>
                        </span>
                        <span style={{ color: "#9ca3af", fontSize: "0.78rem", marginTop: 4, display: "block" }}>
                          Supports PDF, DOC, DOCX up to 5 MB
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={status === "loading"}
                style={{
                  alignSelf: "flex-start",
                  opacity: status === "loading" ? 0.8 : 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.3s ease",
                }}
              >
                {status === "loading" ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spinner-anim">
                      <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
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

      {/* Success Popup Modal */}
      {status === "success" && submittedDetails && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 17, 40, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          animation: "modalFadeIn 0.3s ease forwards",
        }}>
          <div style={{
            width: "90%",
            maxWidth: "540px",
            backgroundColor: "#ffffff",
            borderRadius: 24,
            padding: "44px 36px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            animation: "modalScaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}>
            {/* Close button (top right) */}
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setSubmittedDetails(null);
                setMessage("");
              }}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(0,0,0,0.04)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              className="modal-close-btn"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Beautiful Checkmark Animation */}
            <div className="checkmark-wrapper" style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              color: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              animation: "pulseShadow 2s infinite",
            }}>
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ transform: "scale(1.2)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" className="checkmark-path" />
              </svg>
            </div>

            <h3 style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--secondary)",
              margin: "0 0 10px",
              fontFamily: "'Baskervville', serif",
            }}>
              Application Received!
            </h3>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "0.98rem",
              lineHeight: 1.6,
              margin: "0 auto 24px",
              maxWidth: "400px",
            }}>
              Thank you, <strong style={{ color: "var(--secondary)" }}>{submittedDetails.fullName}</strong>. Your career application has been successfully submitted to our team.
            </p>

            {/* Summary of Details */}
            <div style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: "20px 24px",
              width: "100%",
              marginBottom: 28,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)" }}>
                Submission Details
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: 8 }}>
                <span style={{ color: "#6b7280", fontSize: "0.88rem" }}>Role Applied</span>
                <strong style={{ color: "var(--secondary)", fontSize: "0.88rem" }}>{submittedDetails.position}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: 8 }}>
                <span style={{ color: "#6b7280", fontSize: "0.88rem" }}>Email</span>
                <strong style={{ color: "var(--secondary)", fontSize: "0.88rem" }}>{submittedDetails.email}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.88rem" }}>Status</span>
                <strong style={{ color: "#166534", backgroundColor: "#dcfce7", padding: "2px 8px", borderRadius: 4, fontSize: "0.78rem" }}>Received</strong>
              </div>
            </div>

            <p style={{
              color: "#6b7280",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              margin: "0 0 32px",
            }}>
              We have sent a confirmation email to <strong style={{ color: "var(--secondary)" }}>{submittedDetails.email}</strong>. Our recruiting team will review your application and contact you if there is a match.
            </p>

            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setSubmittedDetails(null);
                setMessage("");
              }}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                boxShadow: "0 10px 25px -5px rgba(101, 80, 161, 0.4)",
              }}
            >
              Close & Go Back
            </button>
          </div>
        </div>
      )}

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

        .spinner-anim {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheckmark 0.6s 0.2s ease forwards;
        }

        @keyframes drawCheckmark {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulseShadow {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.2);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        .file-upload-zone:hover {
          border-color: var(--primary) !important;
          background-color: rgba(101, 80, 161, 0.02) !important;
        }

        .file-remove-btn:hover {
          background-color: rgba(239, 68, 68, 0.2) !important;
        }

        .modal-close-btn:hover {
          background-color: rgba(0, 0, 0, 0.08) !important;
        }

        input, select, textarea {
          transition: all 0.2s ease-in-out !important;
        }
        input:hover, select:hover, textarea:hover {
          border-color: #cbd5e1 !important;
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
  color: "#d2c6ff",
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
  borderRadius: 16,
  padding: "40px 36px",
  boxShadow: "var(--shadow-md)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "'Baskervville', serif",
  fontSize: "1.4rem",
  color: "var(--text-dark)",
  margin: "0 0 12px",
  fontWeight: 700,
};

const cardTextStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "var(--text-muted)",
  lineHeight: 1.85,
  margin: 0,
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
  borderRadius: 16,
  padding: "36px 32px",
  boxShadow: "var(--shadow-lg)",
};

const contactIconContainerStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "rgba(101,80,161,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const contactLabelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "rgba(255,255,255,0.45)",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 2,
};

const contactValueStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "0.95rem",
  fontWeight: 500,
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
