const router = require("express").Router();
const Task = require("../models/Task");
const moment = require("moment-timezone");

//CREATE
router.post("/", async (req, res) => {
  const recurring = req.body.recurring;
  const wrongValue = req.body.value;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.body;
  const name = req.body.name;
  const interval = req.body.interval;
  //CORRECT NODEJS TIMESTAMP ISSUE +3hrs
  let israelTimezone = moment.tz(wrongValue, "Asia/Jerusalem");
  let value = israelTimezone.format();

  const newTask = new Task({
    recurring,
    value,
    email,
    subject,
    body,
    name,
    interval,
  });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET TASKS

router.get("/once", async (req, res) => {
  try {
    const data = await Task.find({
      recurring: {
        $eq: false,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RECURRING TASKS

router.get("/recurring", async (req, res) => {
  try {
    const data = await Task.find({
      recurring: {
        $eq: true,
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
  const name = req.body.name;
  const wrongValue = req.body.value;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.body;
  const interval = req.body.interval;
  console.log(interval)
  //CORRECT NODEJS TIMESTAMP ISSUE +3hrs
  let israelTimezone = moment.tz(wrongValue, "Asia/Jerusalem");
  let value = israelTimezone.format();

  try {
    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: { value, email, subject, body, name, interval },
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
