import React, { useState } from "react";
import "./RescheduleDatePicker.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
const RescheduleDatePicker = (id) => {
  const [value, setValue] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);
  const navigate = useNavigate();
  let taskId = id.id;

  const handleChange = async (newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    try {
      const response = await axiosInstance.put("/tasks/update", {
        id: taskId,
        value,
        email,
        subject,
        body,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rescheduleDatePickerContainer">
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

      <div className="datePickerInputs">
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="datePickerEmail"
        ></input>
      </div>

      <div>
        <input
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          className="datePickerSubject"
        ></input>
      </div>
      <div>
        <textarea
          style={{ maxWidth: "100%" }}
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          className="datePickerBody"
        ></textarea>
      </div>
      <div>
        <Button onClick={handleClick} variant="contained">
          ReSchedule Task
        </Button>
      </div>
    </div>
  );
};

export default RescheduleDatePicker;
