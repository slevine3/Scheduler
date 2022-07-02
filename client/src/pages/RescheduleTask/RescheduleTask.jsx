import React from "react";

import "./RescheduleTask.css";
import { useLocation, useNavigate } from "react-router-dom";
import RescheduleDatePicker from "../../components/RescheduleDatePicker/RescheduleDatePicker";
import CurrentTask from "../../components/CurrentTask/CurrentTask";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const RescheduleTask = (item) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="editNavBar">
        <div className="editBackIcon">
          <ArrowBackIcon onClick={() => navigate("/schedule")} />
        </div>
        <h1 className="editTitle">Edit Task</h1>
      </div>
      <div className="rescheduleTaskContainer">
        <RescheduleDatePicker id={location.state.item._id} />
      </div>
    </div>
  );
};

export default RescheduleTask;
