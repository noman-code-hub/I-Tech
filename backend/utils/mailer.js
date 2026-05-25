const nodemailer = require("nodemailer");

const stripTags = (value) => String(value || "").replace(/<[^>]*>/g, "").trim();

const escapeHtml = (value) =>
  stripTags(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const emailLink = (email) => {
  const cleanEmail = stripTags(email).toLowerCase();
  return `<a href="mailto:${cleanEmail}" style="color:#ff6b35;">${escapeHtml(cleanEmail)}</a>`;
};

function parseAddress(value) {
  const raw = String(value || "");
  const bracketMatch = raw.match(/^(?:"?([^"]*)"?\s*)?<([^>]+)>$/);
  if (bracketMatch) {
    return {
      name: stripTags(bracketMatch[1] || "i-TECH Digitals") || "i-TECH Digitals",
      email: stripTags(bracketMatch[2]),
    };
  }

  return { name: "i-TECH Digitals", email: stripTags(raw) };
}

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

  const smtpUser = process.env.SMTP_USER.trim();
  const smtpPass = process.env.SMTP_PASS.trim();
  const isGmail = !process.env.SMTP_HOST && (smtpUser.endsWith("@gmail.com") || process.env.SMTP_SERVICE === "gmail");
  const password = isGmail ? smtpPass.replace(/\s/g, "") : smtpPass;

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: smtpUser,
        pass: password,
      },
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpUser,
      pass: password,
    },
  });
}

function getSenderAddress() {
  return process.env.SMTP_FROM || process.env.COMPANY_EMAIL || process.env.SMTP_USER;
}

function getCompanyEmail() {
  return process.env.COMPANY_EMAIL || process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
}

async function sendEmail(message) {
  const transporter = createTransporter();

  if (transporter) {
    try {
      return await transporter.sendMail(message);
    } catch (error) {
      if (!process.env.BREVO_API_KEY) throw error;
      console.warn("SMTP send failed; trying Brevo API fallback:", error.code || error.message);
    }
  }

  if (!process.env.BREVO_API_KEY) {
    throw new Error("Email is not configured. Set SMTP credentials or BREVO_API_KEY.");
  }

  const from = parseAddress(message.from || getSenderAddress());
  const attachments = await Promise.all(
    (message.attachments || []).map(async (attachment) => {
      const content = attachment.content
        ? Buffer.from(attachment.content).toString("base64")
        : (await require("fs/promises").readFile(attachment.path)).toString("base64");

      return {
        name: attachment.filename,
        content,
      };
    })
  );

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: from,
      to: String(message.to)
        .split(",")
        .map((email) => ({ email: stripTags(email) }))
        .filter((item) => item.email),
      replyTo: message.replyTo ? { email: stripTags(message.replyTo) } : undefined,
      subject: message.subject,
      htmlContent: message.html,
      attachment: attachments.length ? attachments : undefined,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Brevo API send failed with status ${response.status}`);
  }

  return data;
}

function brandedWrapper(bodyHtml, footerNote = "") {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f0f2f5;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 20px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
          <tr>
            <td style="background:linear-gradient(135deg,#ff6b35 0%,#e64a19 50%,#1a237e 100%);padding:36px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                i-TECH <span style="color:#ffcc80;">Digitals</span>
              </div>
              <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:6px;letter-spacing:1px;text-transform:uppercase;">
                Creative Digital Agency - Kuwait
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #f0f0f0;margin:0;"></td></tr>
          <tr>
            <td style="padding:24px 40px;text-align:center;background:#fafafa;">
              <p style="color:#999;font-size:12px;margin:0 0 8px;">
                ${footerNote || "This email was sent automatically from the i-TECH Digitals website."}
              </p>
              <p style="margin:0;">
                <a href="https://itech-digitals.com" style="color:#ff6b35;text-decoration:none;font-size:12px;">itech-digitals.com</a>
                &nbsp;-&nbsp;
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

function infoRow(label, value, isLast = false) {
  return `
  <tr>
    <td style="padding:12px 0;font-weight:600;color:#ff6b35;width:140px;font-size:14px;border-bottom:${isLast ? "none" : "1px solid #f5f5f5"};">
      ${escapeHtml(label)}
    </td>
    <td style="padding:12px 0;color:#333;font-size:14px;border-bottom:${isLast ? "none" : "1px solid #f5f5f5"};">
      ${value || "-"}
    </td>
  </tr>`;
}

module.exports = {
  createTransporter,
  brandedWrapper,
  infoRow,
  escapeHtml,
  emailLink,
  stripTags,
  getCompanyEmail,
  getSenderAddress,
  sendEmail,
};
