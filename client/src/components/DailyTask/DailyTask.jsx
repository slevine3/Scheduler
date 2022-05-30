import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyTask.css";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const DailyTask = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const now = new Date();
  const pattern = date.compile("ddd, MMM DD YYYY");

  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/tasks/delete",
        {
          data: {
            id: id,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    navigate("/edit", { state: { item } });
  };
  return (
    <div className="dailyTaskContainer">
      <div>
        <h1 className="dailyTaskTitle">
          Daily Tasks: {date.format(now, pattern)}{" "}
        </h1>
      </div>
      <div className="emailContainer">
        <ul>
          {dailyTasks.length > 0 ? (
            dailyTasks.map((item) => (
              <div key={item._id}>
                <li className="emailTime">
                  <span className="emailItemTitle">Time: </span>
                  {moment(item.value).format("LT")}
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
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                color: "#1976d2",
              }}
            >
              No Daily Tasks For Today
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DailyTask;
