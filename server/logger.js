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
