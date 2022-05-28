import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyTask.css";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";

const DailyTask = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const now = new Date();
  const pattern = date.compile("ddd, MMM DD YYYY");
  useEffect(() => {
    const getDailyTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks/daily"
        );

        setDailyTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDailyTasks();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/delete"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Daily Tasks: {date.format(now, pattern)} </h1>
      </div>
      <div>
        <ul>
          {dailyTasks.length > 0 ? (
            dailyTasks.map((item) => (
              <div key={item._id}>
                <li className="emailTime">
                  <span className="emailItemTitle">Time:</span>
                  {item.value}
                </li>
                <li className="emailRecipients">
                  <span className="emailItemTitle">Recipient(s):</span>{" "}
                  {item.email}
                </li>
                <li className="emailSubject">
                  <span className="emailItemTitle">Subject:</span>{" "}
                  {item.subject}
                </li>
                <li className="emailBody">
                  <span className="emailItemTitle">Body:</span>: {item.body}
                </li>
                <DeleteIcon className="deleteIcon" onclick={handleDelete} />
              </div>
            ))
          ) : (
            <h1>No Daily Tasks For Today</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DailyTask;
