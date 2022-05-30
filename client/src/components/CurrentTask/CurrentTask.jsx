import React from "react";
import "./CurrentTask.css";
import { useLocation, useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import TitleIcon from "@mui/icons-material/Title";
import EmailIcon from "@mui/icons-material/Email";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import moment from "moment";

const CurrentTask = () => {
  const location = useLocation();
  const formatValue = moment(location.state.item.value).format("LLLL");
  return (
    <div className="currentTaskContainer">
      <h3 style={{ textAlign: "center" }}>Current Task Details</h3>
      <div className="currentTaskDetail">
        <EventIcon className="currentTaskIcon" /> <span>{formatValue}</span>
      </div>
      <div className="currentTaskDetail">
        <EmailIcon className="currentTaskIcon" />
        {location.state.item.email}
      </div>
      <div className="currentTaskDetail">
        {" "}
        <TitleIcon className="currentTaskIcon" /> {location.state.item.subject}
      </div>
      <div className="currentTaskDetail">
        {" "}
        <TextSnippetIcon className="currentTaskIcon" />{" "}
        {location.state.item.body}
      </div>
    </div>
  );
};

export default CurrentTask;
