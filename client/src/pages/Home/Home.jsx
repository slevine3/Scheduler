import React from "react";
import DailyTask from "../../components/DailyTask/DailyTask";
import DatePicker from "../../components/DatePicker/DatePicker";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly",  }}>
      <DatePicker />
      <DailyTask />
    </div>
  );
};

export default Home;
