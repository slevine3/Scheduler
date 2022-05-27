const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    error: { type: String, required: true },
    reason: { type: String, required: true },
    clicked: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogFile", LogSchema);