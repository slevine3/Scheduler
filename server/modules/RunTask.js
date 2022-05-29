const Mailer = require("./Mailer");
const moment = require("moment");


//Check FOR TASKS
//Need to figure out how to run on correct time
const RunTask = async () => {
  const time = "2022-05-28T20:44:00+03:00";
  if (time === 1) {
    console.log("WTF");
  } else {
    const now = moment().format();

    try {
      const data = await Task.find({
        value: {
          $eq: now,
        },
      });
      Mailer();
      console.log("data is called: ", data);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = RunTask;