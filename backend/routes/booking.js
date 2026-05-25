const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { createTransporter, brandedWrapper, infoRow } = require("../utils/mailer");

const sanitize = (str) =>
  typeof str === "string" ? str.replace(/<[^>]*>/g, "").trim() : "";

const SERVICES = [
  "Web & App Development",
  "Branding",
  "Social Media Management",
  "Photography & Videography",
  "Animations",
  "Interior Design",
  "Printing",
  "Studio Rental",
  "Other",
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// ─── POST /api/booking ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, preferredDate, preferredTime, budget, message } = req.body;

    // Validation
    if (!name || !email || !service || !preferredDate || !preferredTime) {
      return res.status(400).json({
        error: "Name, email, service, preferred date, and time are required.",
      });
    }

    const cleanService = sanitize(service);
    const cleanTime = sanitize(preferredTime);
    const cleanDate = sanitize(preferredDate);

    if (!SERVICES.includes(cleanService)) {
      return res.status(400).json({ error: "Please select a valid service." });
    }

    if (!TIME_SLOTS.includes(cleanTime)) {
      return res.status(400).json({ error: "Please select a valid time slot." });
    }

    const selectedDate = new Date(`${cleanDate}T00:00:00.000Z`);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      return res.status(400).json({ error: "Please select today or a future date." });
    }

    // Save to DB
    const booking = await Booking.create({
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || ""),
      service: cleanService,
      preferredDate: cleanDate,
      preferredTime: cleanTime,
      budget: sanitize(budget || ""),
      message: sanitize(message || ""),
      ip: req.ip,
    });

    // ── Send Emails ───────────────────────────────────────────────────────────
    const transporter = createTransporter();
    if (transporter) {
      const sName = sanitize(name);
      const sEmail = sanitize(email);
      const sService = sanitize(service);
      const sDate = sanitize(preferredDate);
      const sTime = sanitize(preferredTime);
      const sBudget = sanitize(budget || "Not specified");
      const sMessage = sanitize(message || "");

      // 1️⃣ Admin notification email
      const adminBody = `
        <h2 style="color:#1a237e;font-size:20px;margin:0 0 6px;">📅 New Booking Request</h2>
        <p style="color:#666;font-size:14px;margin:0 0 24px;">A new consultation booking was just submitted on the website.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${infoRow("Name", sName)}
          ${infoRow("Email", `<a href="mailto:${sEmail}" style="color:#ff6b35;">${sEmail}</a>`)}
          ${infoRow("Phone", sanitize(phone || ""))}
          ${infoRow("Service", sService)}
          ${infoRow("Date", sDate)}
          ${infoRow("Time", sTime)}
          ${infoRow("Budget", sBudget, !sMessage)}
          ${sMessage ? infoRow("Notes", sMessage, true) : ""}
        </table>

        <div style="margin-top:28px;padding:16px 20px;background:#fff3e0;border-radius:10px;border-left:4px solid #ff6b35;">
          <p style="margin:0;color:#e65100;font-size:13px;font-weight:600;">
            ⚡ Booking ID: ${booking._id}
          </p>
          <p style="margin:6px 0 0;color:#bf360c;font-size:12px;">
            Submitted: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuwait" })} (Kuwait Time)
          </p>
        </div>`;

      // 2️⃣ User confirmation email (auto-reply)
      const userBody = `
        <h2 style="color:#1a237e;font-size:22px;margin:0 0 8px;">Hi ${sName}, your booking is confirmed! 🎉</h2>
        <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 28px;">
          Thank you for reaching out to <strong>i-TECH Digitals</strong>. We have received your booking request and our team will get in touch with you within <strong>24 hours</strong> to confirm your appointment.
        </p>

        <div style="background:#f9f9f9;border-radius:12px;padding:24px;margin-bottom:28px;">
          <h3 style="color:#ff6b35;font-size:15px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.5px;">📋 Your Booking Summary</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${infoRow("Service", sService)}
            ${infoRow("Date", sDate)}
            ${infoRow("Time", sTime)}
            ${infoRow("Budget", sBudget, true)}
          </table>
        </div>

        <div style="background:linear-gradient(135deg,#fff8f5,#fff3e0);border-radius:12px;padding:24px;margin-bottom:28px;border:1px solid #ffe0cc;">
          <h3 style="color:#e64a19;font-size:14px;margin:0 0 12px;">📞 Need to reach us sooner?</h3>
          <p style="color:#555;font-size:14px;margin:0;line-height:1.7;">
            Email us at <a href="mailto:itechkw.business@gmail.com" style="color:#ff6b35;font-weight:600;">itechkw.business@gmail.com</a><br>
            We're here to help with any questions about your upcoming consultation.
          </p>
        </div>

        <p style="color:#888;font-size:13px;line-height:1.7;margin:0;">
          We look forward to working with you and helping bring your vision to life!<br>
          <strong style="color:#1a237e;">— The i-TECH Digitals Team</strong>
        </p>`;

      try {
        await Promise.all([
          // To admin
          transporter.sendMail({
            from: `"i-TECH Digitals Website" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
            subject: `📅 New Booking: ${sName} → ${sService} on ${sDate}`,
            html: brandedWrapper(adminBody, `Booking ID: ${booking._id}`),
          }),
          // To user (auto-reply)
          transporter.sendMail({
            from: `"i-TECH Digitals" <${process.env.SMTP_USER}>`,
            to: sEmail,
            subject: `✅ Booking Confirmed — i-TECH Digitals`,
            html: brandedWrapper(
              userBody,
              "You're receiving this because you submitted a booking on our website."
            ),
          }),
        ]);
        console.log(`✅ Booking emails sent for: ${sEmail}`);
      } catch (mailErr) {
        console.warn("⚠️  Booking email notification failed:", mailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Booking received! Check your email for a confirmation.",
      bookingId: booking._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(". ") });
    }
    console.error("Booking route error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ─── GET /api/booking — Admin only ───────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    res.json({ total: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
