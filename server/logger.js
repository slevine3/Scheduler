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
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "app.log", level: "info" }),

    winston.add(
      new winston.transports.MongoDB({
        level: "debug",
        db: process.env.MONGO_URL,
        options: { useUnifiedTopology: true },
      })
    ),
  ],
});

logger.error("error");
logger.warn("warn");
logger.info("info");
logger.verbose("verbose");
logger.debug("debug");
logger.silly("silly");

module.exports = logger;
