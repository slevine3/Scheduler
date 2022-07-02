# Scheduler

## Front End: React with Material UI
### Log Rocket for client side logging


## Back End: NodeJS, Express.js, MongoDB
## Winston and Winston-MongoDB for server side logging and connection to database

## Scheduling and Graphing System: Node Cron, Moment.js, Moment-timezone, Nodemailer, Quickchart.js

## Cron Job and Nodemailer

```js
cron.schedule("* * * * *", function () {
  const RunTask = require("./modules/RunTask");
});

const Mailer = async (message, item) => {
  //MESSAGE OPTIONS

  let mailOptions = {
    from: "task_scheduler@yahoo.com",
    to: item.email,
    subject: item.subject,
    text:
      item.body +de
      " AUTOMATED MESSAGE: Please see the attachment for yesterday's 24 hour weather temperatures",
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


    //DELIVERY OF CURRENT TIMESTAMP EMAIL

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ProductionLogger.error(error);
      } else {
        ProductionLogger.info("Email sent: " + info.response);
      }
    });



```



## Development Logger 
``` js 
const { createLogger, transports, format } = require("winston");
require("winston-mongodb");
const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const moment = require("moment");
const formatTimezone = moment().format();

const customFormat = format.combine(
  format.printf((info) => {
    return `${formatTimezone} - [${info.level.toUpperCase().padEnd(7)}] - ${
      info.message
    }`;
  })
);
const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "app.log", level: "info" }),

    winston.add(
      new winston.transports.MongoDB({
        level: "info",
        db: process.env.MONGO_URL,
        options: { useUnifiedTopology: true },
      })
    ),
  ],
});

module.exports = logger;
```


## Production Logger

``` js 
const { createLogger, transports, format } = require("winston");
const { json } = format;

require("winston-mongodb");
const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const moment = require("moment");
const formatTimezone = moment().format();

const ProductionLogger = () => {
  return createLogger({
    format: json(),
    transports: [
      new transports.Console({ level: "info" }),
      winston.add(
        new winston.transports.MongoDB({
          level: "info",
          db: process.env.MONGO_URL,
          options: { useUnifiedTopology: true },
        })
      ),
    ],
  });
};
module.exports = ProductionLogger();
```
