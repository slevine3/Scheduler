const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    recurring: { type: Boolean, required: true },
    value: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    name: { type: String },
    interval: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
