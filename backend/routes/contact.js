const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const nodemailer = require("nodemailer");

// Sanitize helper
const sanitize = (str) =>
  typeof str === "string" ? str.replace(/<[^>]*>/g, "").trim() : "";

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Save lead to DB
    const lead = await Lead.create({
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || ""),
      service: sanitize(service || ""),
      message: sanitize(message),
      ip: req.ip,
    });

    // Send email notification (if SMTP configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"ITech Digitals Website" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL || "itechkw.business@gmail.com",
          subject: `🔔 New Lead: ${sanitize(name)} — ${sanitize(service) || "General Inquiry"}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
              <div style="background:linear-gradient(135deg,#ff5722,#e64a19);padding:28px 32px;">
                <h2 style="color:#fff;margin:0;font-size:1.4rem;">New Contact Form Submission</h2>
                <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:0.9rem;">i-TECH Digitals Website</p>
              </div>
              <div style="padding:28px 32px;background:#fff;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:10px 0;font-weight:600;color:#ff5722;width:120px;">Name</td><td style="padding:10px 0;color:#333;">${sanitize(name)}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:600;color:#ff5722;">Email</td><td style="padding:10px 0;color:#333;">${sanitize(email)}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:600;color:#ff5722;">Phone</td><td style="padding:10px 0;color:#333;">${sanitize(phone) || "—"}</td></tr>
                  <tr><td style="padding:10px 0;font-weight:600;color:#ff5722;">Service</td><td style="padding:10px 0;color:#333;">${sanitize(service) || "—"}</td></tr>
                </table>
                <div style="margin-top:20px;padding:20px;background:#fff1ed;border-radius:10px;border-left:4px solid #ff5722;">
                  <div style="font-weight:600;color:#ff5722;margin-bottom:8px;">Message</div>
                  <p style="color:#444;line-height:1.7;margin:0;">${sanitize(message)}</p>
                </div>
                <p style="color:#999;font-size:0.8rem;margin-top:24px;">Submitted on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuwait" })} (Kuwait Time)</p>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("⚠️  Email notification failed:", mailErr.message);
        // Don't block the response — lead is already saved
      }
    }

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. We will be in touch within 24 hours.",
      leadId: lead._id,
    });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(". ") });
    }
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Please try again or email us directly." });
  }
});

// GET /api/contact — Admin: list leads (basic)
router.get("/", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    res.json({ total: leads.length, leads });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
