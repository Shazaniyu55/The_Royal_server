const nodemailer = require("nodemailer");
require('dotenv').config();
const APP_NAME = "Royale Cleaners";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com", // SMTP host for Namecheap email
  port: 587, // Use 465 for SSL or 587 for TLS
  secure: false, // true for port 465, false for port 587
  auth: {
    user: "info@royalecleaners.co.uk", // your business email
    pass: "Rexroy2025#", // password from Namecheap email account
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("Mailing failed to to to verify.", err);
  } else {
    console.log("Mailing verified", success);
  }
});

/**
 * Send Email
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"${APP_NAME}" <info@royalecleaners.co.uk>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
