const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.TRANSMITTER, // dans .env
      pass: process.env.NODE_MAILER_KEY, // dans .env
    },
  });

  const mailOptions = {
    from: process.env.TRANSMITTER, // email de l'emetteur a mettre dans .env
    to: email, // email du destinataire
    subject: subject, // titre du mail
    text: text, // message du mail
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error");
    } else {
      console.log("Email-envoyé " + info.response);
    }
  });
};
module.exports = sendEmail;
