//CHECK FOR TASKS

const RunTask = async () => {
  const moment = require("moment-timezone");
  const Task = require("../models/Task");
  const graph = require("./graph");
  const ProductionLogger = require("../ProductionLogger");

  const now = new Date();

  let israelTimezone = moment.tz(now, "Asia/Jerusalem");
  const formattedTimezone = israelTimezone.format();

  try {
    const data = await Task.find({
      value: {
        $eq: formattedTimezone,
      },
    });

    if (data.length > 0) {
      data.map((item) => graph(item));

      setTimeout(() => {
        RunTask();
      }, 5000);
    } else {
      RunTask();
    }
  } catch (error) {
    ProductionLogger.error(error);
  }
};

module.exports = RunTask();
