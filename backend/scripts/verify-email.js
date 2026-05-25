require("dotenv").config();

const { createTransporter } = require("../utils/mailer");

async function main() {
  const transporter = createTransporter();

  if (!transporter) {
    console.error("SMTP is not configured. Set SMTP_USER and SMTP_PASS in backend/.env.");
    process.exit(1);
  }

  try {
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("SMTP verification timed out after 20 seconds.")), 20000)
      ),
    ]);
    console.log("SMTP verified. Email sending is ready.");
  } catch (error) {
    console.error("SMTP verify failed:", error.code || error.message);
    if (error.code === "EAUTH") {
      console.error("SMTP rejected the credentials. Check SMTP_USER and SMTP_PASS for your SMTP provider.");
    }
    process.exit(1);
  }
}

main();
