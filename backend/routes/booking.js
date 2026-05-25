const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
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

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, preferredDate, preferredTime, budget, message } = req.body;

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

    const sName = escapeHtml(name);
    const sEmail = sanitize(email).toLowerCase();
    const sPhone = escapeHtml(phone || "");
    const sService = escapeHtml(cleanService);
    const sDate = escapeHtml(cleanDate);
    const sTime = escapeHtml(cleanTime);
    const sBudget = escapeHtml(budget || "Not specified");
    const sMessage = escapeHtml(message || "");

    let booking = null;
    let fallbackId = null;
    try {
      booking = await Booking.create({
        name: sanitize(name),
        email: sEmail,
        phone: sanitize(phone || ""),
        service: cleanService,
        preferredDate: cleanDate,
        preferredTime: cleanTime,
        budget: sanitize(budget || ""),
        message: sanitize(message || ""),
        ip: req.ip,
      });
    } catch (dbErr) {
      console.warn("Booking DB save failed; continuing with email:", dbErr.message);
      fallbackId = await saveFallbackSubmission("bookings", {
        name: sanitize(name),
        email: sEmail,
        phone: sanitize(phone || ""),
        service: cleanService,
        preferredDate: cleanDate,
        preferredTime: cleanTime,
        budget: sanitize(budget || ""),
        message: sanitize(message || ""),
        ip: req.ip,
      });
    }

    const adminBody = `
      <h2 style="color:#1a237e;font-size:20px;margin:0 0 6px;">New Booking Request</h2>
      <p style="color:#666;font-size:14px;margin:0 0 24px;">A new consultation booking was submitted on the website.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${infoRow("Name", sName)}
        ${infoRow("Email", emailLink(sEmail))}
        ${infoRow("Phone", sPhone)}
        ${infoRow("Service", sService)}
        ${infoRow("Date", sDate)}
        ${infoRow("Time", sTime)}
        ${infoRow("Budget", sBudget, !sMessage)}
        ${sMessage ? infoRow("Notes", sMessage, true) : ""}
      </table>

      <div style="margin-top:28px;padding:16px 20px;background:#fff3e0;border-radius:10px;border-left:4px solid #ff6b35;">
        <p style="margin:0;color:#e65100;font-size:13px;font-weight:600;">
          Booking ID: ${booking?._id || "not saved"}
        </p>
        <p style="margin:6px 0 0;color:#bf360c;font-size:12px;">
          Submitted: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuwait" })} (Kuwait Time)
        </p>
      </div>`;

    const userBody = `
      <h2 style="color:#1a237e;font-size:22px;margin:0 0 8px;">Hi ${sName}, your booking request was received.</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 28px;">
        Thank you for reaching out to <strong>i-TECH Digitals</strong>. Our team will contact you within <strong>24 hours</strong> to confirm your appointment.
      </p>

      <div style="background:#f9f9f9;border-radius:12px;padding:24px;margin-bottom:28px;">
        <h3 style="color:#ff6b35;font-size:15px;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.5px;">Your Booking Summary</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${infoRow("Service", sService)}
          ${infoRow("Date", sDate)}
          ${infoRow("Time", sTime)}
          ${infoRow("Budget", sBudget, true)}
        </table>
      </div>

      <div style="background:#fff8f5;border-radius:12px;padding:24px;margin-bottom:28px;border:1px solid #ffe0cc;">
        <h3 style="color:#e64a19;font-size:14px;margin:0 0 12px;">Need to reach us sooner?</h3>
        <p style="color:#555;font-size:14px;margin:0;line-height:1.7;">
          Email us at <a href="mailto:itechkw.business@gmail.com" style="color:#ff6b35;font-weight:600;">itechkw.business@gmail.com</a>
        </p>
      </div>

      <p style="color:#888;font-size:13px;line-height:1.7;margin:0;">
        We look forward to working with you and helping bring your vision to life!<br>
        <strong style="color:#1a237e;">- The i-TECH Digitals Team</strong>
      </p>`;

    try {
      await Promise.all([
        sendEmail({
          from: `"i-TECH Digitals Website" <${getSenderAddress()}>`,
          to: getCompanyEmail(),
          replyTo: sEmail,
          subject: `New Booking: ${sanitize(name)} - ${cleanService} on ${cleanDate}`,
          html: brandedWrapper(adminBody, `Booking ID: ${booking?._id || "not saved"}`),
        }),
        sendEmail({
          from: `"i-TECH Digitals" <${getSenderAddress()}>`,
          to: sEmail,
          subject: "Booking request received - i-TECH Digitals",
          html: brandedWrapper(userBody, "You're receiving this because you submitted a booking on our website."),
        }),
      ]);
      console.log(`Booking emails sent for: ${sEmail}`);
    } catch (mailErr) {
      console.warn("Booking email notification failed:", mailErr.message);
      return res.status(201).json({
        success: true,
        emailSent: false,
        message: "Booking received. Email confirmation could not be sent, but our team has your request.",
        bookingId: booking?._id || fallbackId,
      });
    }

    res.status(201).json({
      success: true,
      emailSent: true,
      message: "Booking received! Check your email for a confirmation.",
      bookingId: booking?._id || fallbackId,
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
