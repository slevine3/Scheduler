const moment = require("moment");
const Task = require("../models/Task");
const graph = require("./graph");

//CHECK FOR TASKS

const RunTask = async () => {
  const now = moment().format();

  try {
    const data = await Task.find({
      value: {
        $gte: now,
      },
    });
    if (data.length > 0) {
      graph() //This calls an api which generates a graph and then sends an email
      RunTask() //Recursive attempt to call the function for the next task
    } else {
      RunTask() // If data array is empty it will call the function until data has value
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = RunTask;
