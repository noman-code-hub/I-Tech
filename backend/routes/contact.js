const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const {
  brandedWrapper,
  infoRow,
  escapeHtml,
  emailLink,
  stripTags,
  getCompanyEmail,
  getSenderAddress,
  sendEmail,
} = require("../utils/mailer");
const { saveFallbackSubmission } = require("../utils/submissionStore");

const sanitize = stripTags;

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const sName = escapeHtml(name);
    const sEmail = sanitize(email).toLowerCase();
    const sPhone = escapeHtml(phone || "");
    const sService = escapeHtml(service || "General Inquiry");
    const sMessage = escapeHtml(message);

    let lead = null;
    let fallbackId = null;
    try {
      lead = await Lead.create({
        name: sanitize(name),
        email: sEmail,
        phone: sanitize(phone || ""),
        service: sanitize(service || ""),
        message: sanitize(message),
        ip: req.ip,
      });
    } catch (dbErr) {
      console.warn("Contact DB save failed; continuing with email:", dbErr.message);
      fallbackId = await saveFallbackSubmission("leads", {
        name: sanitize(name),
        email: sEmail,
        phone: sanitize(phone || ""),
        service: sanitize(service || ""),
        message: sanitize(message),
        ip: req.ip,
      });
    }

    const adminBody = `
      <h2 style="color:#1a237e;font-size:20px;margin:0 0 6px;">New Contact Form Submission</h2>
      <p style="color:#666;font-size:14px;margin:0 0 24px;">Someone filled out the contact form on the website.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${infoRow("Name", sName)}
        ${infoRow("Email", emailLink(sEmail))}
        ${infoRow("Phone", sPhone)}
        ${infoRow("Service", sService, true)}
      </table>

      <div style="margin-top:20px;padding:20px;background:#fff3e0;border-radius:10px;border-left:4px solid #ff6b35;">
        <div style="font-weight:600;color:#ff6b35;margin-bottom:8px;font-size:14px;">Message</div>
        <p style="color:#444;line-height:1.7;margin:0;font-size:14px;">${sMessage}</p>
      </div>

      <p style="color:#999;font-size:12px;margin-top:20px;">
        Submitted: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuwait" })} (Kuwait Time) - Lead ID: ${lead?._id || "not saved"}
      </p>`;

    const userBody = `
      <h2 style="color:#1a237e;font-size:22px;margin:0 0 8px;">We got your message, ${sName}!</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px;">
        Thank you for contacting <strong>i-TECH Digitals</strong>. We have received your message and our team will get back to you within <strong>24 hours</strong>.
      </p>

      <div style="background:#f9f9f9;border-radius:12px;padding:24px;margin-bottom:28px;">
        <h3 style="color:#ff6b35;font-size:14px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.5px;">Your Message Summary</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${infoRow("Service", sService)}
          ${infoRow("Message", sMessage, true)}
        </table>
      </div>

      <div style="background:#fff8f5;border-radius:12px;padding:24px;margin-bottom:28px;border:1px solid #ffe0cc;">
        <h3 style="color:#e64a19;font-size:14px;margin:0 0 10px;">Need to reach us directly?</h3>
        <p style="color:#555;font-size:14px;margin:0;line-height:1.7;">
          <a href="mailto:itechkw.business@gmail.com" style="color:#ff6b35;font-weight:600;">itechkw.business@gmail.com</a>
        </p>
      </div>

      <p style="color:#888;font-size:13px;line-height:1.7;margin:0;">
        We look forward to working with you!<br>
        <strong style="color:#1a237e;">- The i-TECH Digitals Team</strong>
      </p>`;

    try {
      await Promise.all([
        sendEmail({
          from: `"i-TECH Digitals Website" <${getSenderAddress()}>`,
          to: getCompanyEmail(),
          replyTo: sEmail,
          subject: `New Lead: ${sanitize(name)} - ${sanitize(service || "General Inquiry")}`,
          html: brandedWrapper(adminBody),
        }),
        sendEmail({
          from: `"i-TECH Digitals" <${getSenderAddress()}>`,
          to: sEmail,
          subject: "We received your message - i-TECH Digitals",
          html: brandedWrapper(userBody, "You're receiving this because you contacted us on our website."),
        }),
      ]);
      console.log(`Contact emails sent for: ${sEmail}`);
    } catch (mailErr) {
      console.warn("Email notification failed:", mailErr.message);
      return res.status(201).json({
        success: true,
        emailSent: false,
        message: "Message received. Email confirmation could not be sent, but our team has your request.",
        leadId: lead?._id || fallbackId,
      });
    }

    res.status(201).json({
      success: true,
      emailSent: true,
      message: "Thank you! Your message has been received. Check your email for confirmation.",
      leadId: lead?._id || fallbackId,
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
