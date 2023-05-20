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
      user: "begaevents@outlook.fr", // dans .env
      pass: "JHm*g*$u&Nxrc8g6Wkvv", // dans .env
    },
  });

  const mailOptions = {
    from: "begaevents@outlook.fr", // email de l'emetteur a mettre dans .env
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
