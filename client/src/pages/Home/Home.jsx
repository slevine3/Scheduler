import React from "react";
import DailyTask from "../../components/TaskScheduler/TaskScheduler";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <DatePicker />
    </div>
  );
};

export default Home;
