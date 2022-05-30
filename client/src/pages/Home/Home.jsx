import React from "react";
import DailyTask from "../../components/DailyTask/DailyTask";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./Home.css";
const Home = () => {
  return (
    <div className="homeContainer">
      <DatePicker />
      <DailyTask />
    </div>
  );
};

export default Home;
