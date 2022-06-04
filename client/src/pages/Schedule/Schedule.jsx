import React from "react";
import RecurringScheduler from "../../components/RecurringScheduler/RecurringScheduler";
import TaskScheduler from "../../components/TaskScheduler/TaskScheduler";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";
const Schedule = () => {
  const navigate = useNavigate();
  return (
    <div className="scheduleContainer">
      <ArrowBackIcon
        onClick={() => navigate("/")}
        className="scheduleArrowBackIcon"
      />
      <RecurringScheduler />
      <TaskScheduler />
    </div>
  );
};

export default Schedule;
