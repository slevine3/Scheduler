const ProductionLogger = require("../ProductionLogger");
const nodemailer = require("nodemailer");

  // const cron = require("node-cron");
  // const Bree = require("bree");




const Mailer = (message, item) => {

  //MESSAGE OPTIONS

  let mailOptions = {
    from: "sasa_software_demo@yahoo.com",
    to: item.email,
    subject: item.subject,
    text:
      "MESSAGE: " +
      item.body +
      "Please see the attachment for yesterday's 24 hour weather temperatures",
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

  //LOGIC TO DETERMINE IF RECURRING IS TRUE/FALSE

  if (item.recurring === false) {
    //DELIVERY and SCHEDULING
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ProductionLogger.error(error);
      } else {
        ProductionLogger.info("Email sent: " + info.response);
      }
    });
  }

  // if (item.recurring === true) {
  //   //1. Send out initial transport email - First Cron Job doesn't register; ie Hour 0 doesn't count. Every hour happens after the first hour.
  //   //2. Need to identify cron jobs by names and interval from stored mongoDB file

  //   recurringJobs(item);

  //   bree.add({ name: item.name, interval: item.interval });
  // }
};

module.exports = Mailer;
