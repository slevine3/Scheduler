const Mailer = (message, item) => {
  const nodemailer = require("nodemailer");

  //MESSAGE OPTIONS

  let mailOptions = {
    from: "levinesam3@gmail.com",
    to: item.email,
    subject: item.subject,
    text: item.body + ". Additionally, please see the attachment for yesterday's 24 hour weather temperatures",
    attachments: [
      {
        filename: "weather.jpg",
        path: message,
      },
    ],
  };

  //TRANSPORT MECHANISM AND CONFIG - DEFAULT SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  //DELIVERY and SCHEDULING

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = Mailer;
