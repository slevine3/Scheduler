const Mailer = () => {
  const nodemailer = require("nodemailer");
  let cron = require("node-cron");
  const moment = require("moment");

  //TASK NOW

  const checkTaskNow = async () => {
    const now = moment().format();
    console.log("now: ", now);
    try {
      const data = await Task.find({
        value: {
          $eq: now,
        },
      });
      console.log('data is called: ', data)
   
    } catch (error) {

    }
  };
  checkTaskNow();

  //MESSAGE OPTIONS

  let mailOptions = {
    from: "levinesam3@gmail.com",
    to: "levinesam3@gmail.com",
    subject: "Email from Node-App: A Test Message!",
    text: "Some content to send",
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

  cron.schedule("5 20 * * *", () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
module.exports = Mailer;
