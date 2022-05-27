const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
app.use(cors());
app.use(express.json());

const Mailer = require("./modules/Mailer");
Mailer();

const taskRoute = require("./routes/tasks");

app.use("/api/tasks", taskRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
