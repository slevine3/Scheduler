import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RescheduleRecurring.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RescheduleDatePicker from "../../components/RescheduleDatePicker/RescheduleDatePicker";
const RescheduleRecurring = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="editNavBar">
        <ArrowBackIcon
          onClick={() => navigate("/schedule")}
          className="editBackIcon"
        />
        <h1 className="editTitle">Edit Task</h1>
      </div>
      <div className="rescheduleTaskContainer">
        <RescheduleDatePicker id={location.state.item._id} />
      </div>
    </div>
  );
};

export default RescheduleRecurring;
