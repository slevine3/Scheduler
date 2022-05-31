import React, { useState } from "react";
import "./EditTask.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


import axios from "axios";
import { axiosInstance } from "../../config";
const EditTask = () => {

  const latitude = 32.0853;
  const longitude = 34.7818;

  const [value, setValue] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);

  const handleChange = async (newValue) => {
    setValue(newValue);
  };

  
  console.log(value);
  const handleClick = async () => {
    try {
      const response = await axiosInstance.post("api/tasks", {
        value,
        email,
        subject,
        body,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="datePickerContainer">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DateTimePicker
            label="Date&Time picker"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <div>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
      </div>

      <div>
        <label>Subject</label>
        <input onChange={(e) => setSubject(e.target.value)} type="text"></input>
      </div>
      <div>
        <label>Body</label>
        <textarea onChange={(e) => setBody(e.target.value)}></textarea>
      </div>
      <div>
        <button onClick={handleClick}>Edit This Task</button>
      </div>
    </div>
  );
};

export default EditTask;
