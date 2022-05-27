const router = require("express").Router();
const Task = require("../models/Task");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body)
  const newTask = new Task(req.body);

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;