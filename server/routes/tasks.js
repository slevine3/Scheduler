const router = require("express").Router();
const Task = require("../models/Task");
const moment = require("moment");

//CREATE
router.post("/", async (req, res) => {
  const value = req.body.value;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.body;

  //CORRECT NODE TIMESTAMP ISSUE +3hrs
  
  // const addHours = (numOfHours, date = wrongValue) => {
  //   date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  //   return date;
  // };

  // const value = addHours(3);
  // console.log("value", value);

  const newTask = new Task({ value, email, subject, body });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET DAILY TASKS

router.get("/daily", async (req, res) => {
  let start = moment()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .format();
  let end = moment()
    .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
    .format();

  try {
    const data = await Task.find({
      value: {
        $gte: start,
        $lt: end,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
