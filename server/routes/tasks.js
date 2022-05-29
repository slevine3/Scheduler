const router = require("express").Router();
const Task = require("../models/Task");
const moment = require("moment");

//CREATE
router.post("/", async (req, res) => {
  const wrongValue = req.body.value;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.body;

  //CORRECT NODE TIMESTAMP ISSUE +3hrs
  let israelTimezone = moment.tz(wrongValue, "Asia/Jerusalem");
  let value = israelTimezone.format();

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

//UPDATE

router.put("/update", async (req, res) => {
  const id = req.body.id;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/delete", async (req, res) => {
  const id = req.body.id;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json("Task has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
