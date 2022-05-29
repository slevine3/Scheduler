const moment = require("moment");
const Task = require("../models/Task");
const graph = require("./graph");

//CHECK FOR TASKS

const RunTask = async () => {
  const now = moment().format();

  try {
    const data = await Task.find({
      value: {
        $eq: now,
      },
    });
    if (data.length > 0) {
      console.log(data);
      data.map((item) => graph(item));

      setTimeout(() => {
        RunTask();
      }, 5000);
    } else {
      RunTask();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = RunTask;
