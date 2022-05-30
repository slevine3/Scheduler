import React from "react";
import "./RescheduleTask.css";

import { useLocation, useNavigate } from "react-router-dom";

import EventIcon from "@mui/icons-material/Event";
import TitleIcon from "@mui/icons-material/Title";
import EmailIcon from "@mui/icons-material/Email";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import moment from "moment";
import RescheduleDatePicker from "../../components/RescheduleDatePicker/RescheduleDatePicker";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RescheduleTask = (item) => {
  const location = useLocation();
  const navigate = useNavigate();
  const formatValue = moment(location.state.item.value).format("LLLL");
  return (
    <div>
      <div className="editNavBar">
        <ArrowBackIcon onClick={() => navigate("/")} className="editBackIcon" />
        <h1 className="editTitle">Edit Task</h1>
      </div>

      <div className="editContainer">
        <div className="editCurrentTask">
          <h3>Current Task Details</h3>
          <div className="editTaskDetail">
            <EventIcon className="editTaskIcon" /> <span>{formatValue}</span>
          </div>
          <div className="editTaskDetail">
            <EmailIcon className="editTaskIcon" />
            {location.state.item.email}
          </div>
          <div className="editTaskDetail">
            {" "}
            <TitleIcon /> {location.state.item.subject}
          </div>
          <div className="editTaskDetail">
            {" "}
            <TextSnippetIcon /> {location.state.item.body}
          </div>
        </div>
        <div className="editPortion">
          <RescheduleDatePicker id={location.state.item._id} />
        </div>
      </div>
    </div>
  );
};

export default RescheduleTask;
