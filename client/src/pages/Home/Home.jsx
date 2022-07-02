import React from "react";
import DailyTask from "../../components/TaskScheduler/TaskScheduler";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
<div className="homeTitle"><h1>Task Scheduler</h1></div>
      <DatePicker />


      <div className="footer"><span>This is a task scheduler that will send you an email at a specified date/time. You can set this email to be recurring at an hourly, daily, or monthly cadence. The sent email will contain your inputs, along with a graph of the previous day's weather in Tel Aviv.</span></div>
    </div>
  );
};

export default Home;
