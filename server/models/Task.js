const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
