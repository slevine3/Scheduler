import React, { useState } from "react";
import "./DatePicker.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import axios from "axios";
const DatePicker = () => {
  let currentDateTime = Date.now();
  const latitude = 32.0853;
  const longitude = 34.7818;

  const [value, setValue] = useState(new Date(currentDateTime));
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);

  const handleChange = async (newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        value,
        email,
        subject,
        body,
      });
      console.log(response);
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
        <button onClick={handleClick}>Schedule This Task</button>
      </div>
    </div>
  );
};

export default DatePicker;
