import React from "react";
import RecurringScheduler from "../../components/RecurringScheduler/RecurringScheduler";
import TaskScheduler from "../../components/TaskScheduler/TaskScheduler";

import "./Schedule.css";
const Schedule = () => {
  return (
    <div className="scheduleContainer">
      <RecurringScheduler />
      <TaskScheduler />
    </div>
  );
};

export default Schedule;
