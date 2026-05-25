const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { createTransporter, brandedWrapper, infoRow } = require("../utils/mailer");

const sanitize = (str) =>
  typeof str === "string" ? str.replace(/<[^>]*>/g, "").trim() : "";

// ─── POST /api/contact ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

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

    // ── Send Emails ───────────────────────────────────────────────────────────
    const transporter = createTransporter();
    if (transporter) {
      const sName = sanitize(name);
      const sEmail = sanitize(email);
      const sService = sanitize(service || "General Inquiry");
      const sMessage = sanitize(message);

      // 1️⃣ Admin notification
      const adminBody = `
        <h2 style="color:#1a237e;font-size:20px;margin:0 0 6px;">🔔 New Contact Form Submission</h2>
        <p style="color:#666;font-size:14px;margin:0 0 24px;">Someone just filled out the contact form on the website.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${infoRow("Name", sName)}
          ${infoRow("Email", `<a href="mailto:${sEmail}" style="color:#ff6b35;">${sEmail}</a>`)}
          ${infoRow("Phone", sanitize(phone || ""))}
          ${infoRow("Service", sService, true)}
        </table>

        <div style="margin-top:20px;padding:20px;background:#fff3e0;border-radius:10px;border-left:4px solid #ff6b35;">
          <div style="font-weight:600;color:#ff6b35;margin-bottom:8px;font-size:14px;">Message</div>
          <p style="color:#444;line-height:1.7;margin:0;font-size:14px;">${sMessage}</p>
        </div>

        <p style="color:#999;font-size:12px;margin-top:20px;">
          Submitted: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuwait" })} (Kuwait Time) · Lead ID: ${lead._id}
        </p>`;

      // 2️⃣ User auto-reply
      const userBody = `
        <h2 style="color:#1a237e;font-size:22px;margin:0 0 8px;">We got your message, ${sName}! ✨</h2>
        <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px;">
          Thank you for contacting <strong>i-TECH Digitals</strong>. We have received your message and our team will get back to you within <strong>24 hours</strong>.
        </p>

        <div style="background:#f9f9f9;border-radius:12px;padding:24px;margin-bottom:28px;">
          <h3 style="color:#ff6b35;font-size:14px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.5px;">📋 Your Message Summary</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${infoRow("Service", sService)}
            ${infoRow("Message", sMessage, true)}
          </table>
        </div>

        <div style="background:linear-gradient(135deg,#fff8f5,#fff3e0);border-radius:12px;padding:24px;margin-bottom:28px;border:1px solid #ffe0cc;">
          <h3 style="color:#e64a19;font-size:14px;margin:0 0 10px;">📞 Can't wait? Reach us directly:</h3>
          <p style="color:#555;font-size:14px;margin:0;line-height:1.7;">
            <a href="mailto:itechkw.business@gmail.com" style="color:#ff6b35;font-weight:600;">itechkw.business@gmail.com</a>
          </p>
        </div>

        <p style="color:#888;font-size:13px;line-height:1.7;margin:0;">
          We look forward to working with you!<br>
          <strong style="color:#1a237e;">— The i-TECH Digitals Team</strong>
        </p>`;

      try {
        await Promise.all([
          transporter.sendMail({
            from: `"i-TECH Digitals Website" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
            subject: `🔔 New Lead: ${sName} — ${sService}`,
            html: brandedWrapper(adminBody),
          }),
          transporter.sendMail({
            from: `"i-TECH Digitals" <${process.env.SMTP_USER}>`,
            to: sEmail,
            subject: `✅ We received your message — i-TECH Digitals`,
            html: brandedWrapper(
              userBody,
              "You're receiving this because you contacted us on our website."
            ),
          }),
        ]);
        console.log(`✅ Contact emails sent for: ${sEmail}`);
      } catch (mailErr) {
        console.warn("⚠️  Email notification failed:", mailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. Check your email for confirmation.",
      leadId: lead._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(". ") });
    }
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Please try again or email us directly." });
  }
});

// ─── GET /api/contact — Admin only ───────────────────────────────────────────
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
