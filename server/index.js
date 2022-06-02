const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const ProductionLogger = require("./ProductionLogger");
dotenv.config();
app.use(cors());
app.use(express.json());

const RunTask = require("./modules/RunTask");


const taskRoute = require("./routes/tasks");

app.use("/api/tasks", taskRoute);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 5000, () => {
  ProductionLogger.info("Server is running on port 5000");
});
