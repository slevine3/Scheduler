import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskScheduler.css";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { axiosInstance } from "../../config";

const TaskScheduler = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  // const now = new Date();
  // const pattern = date.compile("ddd, MMM DD YYYY");

  dailyTasks.sort((a, b) => new Date(a.value) - new Date(b.value));

  const navigate = useNavigate();

  useEffect(() => {
    const getDailyTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks/once");

        setDailyTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDailyTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete("/tasks/delete", {
        data: {
          id: id,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    navigate("/edit", { state: { item } });
  };

  const handleArrowForward = () => {};
  return (
    <div className="dailyTaskContainer">
      <div>
        <div className="dailyTaskTitleContainer">
          <h1 className="dailyTaskTitle">Non-Recurring Schedule</h1>
        </div>
      </div>
      <div>
        <ul>
          {dailyTasks.length > 0 ? (
            dailyTasks.map((item) => (
              <div key={item._id} className="emailContainer">
                <li className="emailTime">
                  <span className="emailItemTitle">Time: </span>
                  {moment(item.value).format("LLLL")}
                </li>
                <li className="emailRecipients">
                  <span className="emailItemTitle">Schedule Name:</span>{" "}
                  {item.name}
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
                  <span className="emailItemTitle">Body:</span> {item.body}
                </li>
                <div className="taskIcons">
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    style={{ marginRight: "30px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="contained"
                    endIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                color: "#1976d2",
                margin: 0,
              }}
            >
              No Tasks Scheduled
            </h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskScheduler;
