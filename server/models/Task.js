const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
 
    value: { type: String, required: true },
    name: { type: String, require: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    recurring: { type: Boolean, required: true },
    interval: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
