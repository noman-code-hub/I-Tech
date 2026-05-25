const nodemailer = require("nodemailer");

/**
 * Creates and returns a nodemailer transporter using Gmail SMTP.
 * Returns null if SMTP credentials are not configured.
 */
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** Branded email wrapper HTML */
function brandedWrapper(bodyHtml, footerNote = "") {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f0f2f5;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 20px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff6b35 0%,#e64a19 50%,#1a237e 100%);padding:36px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                i-TECH <span style="color:#ffcc80;">Digitals</span>
              </div>
              <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:6px;letter-spacing:1px;text-transform:uppercase;">
                Creative Digital Agency · Kuwait
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #f0f0f0;margin:0;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;background:#fafafa;">
              <p style="color:#999;font-size:12px;margin:0 0 8px;">
                ${footerNote || "This email was sent automatically from the i-TECH Digitals website."}
              </p>
              <p style="margin:0;">
                <a href="https://itech-digitals.com" style="color:#ff6b35;text-decoration:none;font-size:12px;">itech-digitals.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:itechkw.business@gmail.com" style="color:#ff6b35;text-decoration:none;font-size:12px;">itechkw.business@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/** Info row for detail tables */
function infoRow(label, value, isLast = false) {
  return `
  <tr>
    <td style="padding:12px 0;font-weight:600;color:#ff6b35;width:140px;font-size:14px;border-bottom:${isLast ? "none" : "1px solid #f5f5f5"};">
      ${label}
    </td>
    <td style="padding:12px 0;color:#333;font-size:14px;border-bottom:${isLast ? "none" : "1px solid #f5f5f5"};">
      ${value || "—"}
    </td>
  </tr>`;
}

module.exports = { createTransporter, brandedWrapper, infoRow };
