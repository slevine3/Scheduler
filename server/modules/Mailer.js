const ProductionLogger = require("../ProductionLogger");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
const Task = require("../models/Task");

const Mailer = async (message, item) => {
  //MESSAGE OPTIONS

  let mailOptions = {
    from: "task_scheduler@outlook.com",
    to: item.email,
    subject: item.subject,
    text:
      item.body +
      " AUTOMATED MESSAGE: Please see the attachment for today's 24 hour weather temperatures",
    attachments: [
      {
        filename: "weather.jpg",
        path: message,
      },
    ],
  };

  //TRANSPORT MECHANISM AND CONFIG - DEFAULT SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  //LOGIC TO DETERMINE IF RECURRING IS TRUE/FALSE

  if (item.recurring === false) {
    //DELIVERY EMAIL

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ProductionLogger.error(error);
      } else {
        ProductionLogger.info("Email sent: " + info.response);
      }
    });
  }

  if (item.recurring === true) {
    //FIRST DELIVER CURRENT TIMESTAMP EMAIL

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ProductionLogger.error(error);
      } else {
        ProductionLogger.info("Email sent: " + info.response);
      }
    });

    const id = item._id;
    let value = item.value;
    const email = item.email;
    const subject = item.subject;
    const body = item.body;
    const name = item.name;
    const interval = item.interval;

    let israelTimezone;

    //ADJUST TIMESTAMP TO REFLECT THE NEXT OCCURRENCE

    if (interval === "hourly") {
      israelTimezone = moment.tz(value, "Asia/Jerusalem").add(1, "hours");
      value = israelTimezone.format();
    } else if (interval === "daily") {
      israelTimezone = moment.tz(value, "Asia/Jerusalem").add(1, "days");
      value = israelTimezone.format();
    } else if (interval === "monthly") {
      israelTimezone = moment.tz(value, "Asia/Jerusalem").add(1, "months");
      value = israelTimezone.format();
    }

    //UPDATE DATABASE TO REFLECT THE NEXT TIMESTAMP VALUE

    try {
      const updateValue = await Task.findByIdAndUpdate(
        id,
        {
          $set: { value, email, subject, body, name, interval },
        },
        { new: true }
      );

      ProductionLogger.info(updateValue);
    } catch (error) {
      ProductionLogger.error(error);
    }
  }
};

module.exports = Mailer;
