const nodeMailer = require("nodemailer");
const { SECURE_MAIL, MAIL_EMAIL, MAIL_PASSWORD } = process.env;

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: SECURE_MAIL === "true" ? 465 : 587,
    secure: SECURE_MAIL === "true",
    requireTLS: true,
    auth: {
      user: MAIL_EMAIL,
      pass: MAIL_PASSWORD,
    },
});

module.exports = transporter