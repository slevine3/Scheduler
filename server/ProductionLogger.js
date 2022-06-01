const { createLogger, transports, format } = require("winston");
const { timestamp, json } = format;

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
