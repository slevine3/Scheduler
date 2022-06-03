import React from "react";
import DailyTask from "../../components/TaskScheduler/TaskScheduler";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
<div><h1>Task Scheduler</h1></div>
      <DatePicker />


      <div className="footer"><h4>*** This app is a task scheduler that will send you an email notification. You can set it to send recurring or non-recurring emails that will contain your inputs, along with a graph of the previous day's weather.</h4></div>
    </div>
  );
};

export default Home;
