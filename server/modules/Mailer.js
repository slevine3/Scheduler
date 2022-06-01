const ProductionLogger = require("../ProductionLogger");

const Mailer = (message, item) => {
  const nodemailer = require("nodemailer");

  //MESSAGE OPTIONS

  let mailOptions = {
    from: "sasa_software_demo@yahoo.com",
    to: item.email,
    subject: item.subject,
    text:
      item.body +
      ". Additionally, please see the attachment for yesterday's 24 hour weather temperatures",
    attachments: [
      {
        filename: "weather.jpg",
        path: message,
      },
    ],
  };

  //TRANSPORT MECHANISM AND CONFIG - DEFAULT SMTP
  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  //DELIVERY and SCHEDULING

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      ProductionLogger.error(error);
    } else {
      ProductionLogger.info("Email sent: " + info.response);
    }
  });
};

module.exports = Mailer;
