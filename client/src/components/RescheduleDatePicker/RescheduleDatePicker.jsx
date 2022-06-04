import React, { useState } from "react";
import "./RescheduleDatePicker.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import axios from "axios";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
const RescheduleDatePicker = (id) => {
  const location = useLocation();
  const [value, setValue] = useState(new Date());
  const [name, setName] = useState(location.state.item.name);
  const [email, setEmail] = useState(location.state.item.email);
  const [subject, setSubject] = useState(location.state.item.subject);
  const [body, setBody] = useState(location.state.item.body);
  const [interval, setInterval] = useState("hourly");
  const [recurring, setRecurring] = useState(location.state.item.recurring);
  const navigate = useNavigate();
  let taskId = id.id;

  const handleChange = async (newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    try {
      const response = await axiosInstance.put("/tasks/update", {
        id: taskId,
        name,
        value,
        email,
        subject,
        body,
        interval,
      });
      navigate("/schedule");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rescheduleDatePickerContainer">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack
          spacing={3}
          className="datePickerMobile"
          style={{ marginBottom: "10px" }}
        >
          <DateTimePicker
            label="Date & Time picker"
            defaultValue={location.state.item.value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <div className="datePickerInputs">
        <TextField
          id="standard-basic"
          label="Schedule Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="datePickerSubject"
          InputProps={{ style: { fontSize: 15 } }}
          defaultValue={location.state.item.name}
          required
        />
      </div>
      <div className="datePickerInputs">
        <TextField
          InputProps={{ style: { fontSize: 15 } }}
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="datePickerEmail"
          defaultValue={location.state.item.email}
          required
        />
      </div>
      <div className="datePickerInputs">
        <TextField
          InputProps={{ style: { fontSize: 15 } }}
          id="standard-basic"
          label="Subject"
          variant="standard"
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          className="datePickerSubject"
          defaultValue={location.state.item.subject}
          required
        />
      </div>
      <div className="datePickerInputs">
        <TextField
          InputProps={{ style: { fontSize: 15 } }}
          id="standard-multiline-static"
          label="Body"
          multiline
          rows={4}
          onChange={(e) => setBody(e.target.value)}
          className="datePickerBody"
          variant="standard"
          defaultValue={location.state.item.body}
          style={{ marginBottom: "0px" }}
          required
        />
      </div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="hourly"
        onChange={(e) => setInterval(e.target.value)}
        style={{ display: recurring ? "flex" : "none", marginBottom: "30px" }}
      >
        <FormControlLabel
          disabled={recurring ? false : true}
          value="hourly"
          control={<Radio size="small" />}
          label={<Typography style={{ fontSize: "13px" }}>Hourly</Typography>}
        />
        <FormControlLabel
          disabled={recurring ? false : true}
          value="daily"
          control={<Radio size="small" />}
          label={<Typography style={{ fontSize: "13px" }}>Daily</Typography>}
        />
        <FormControlLabel
          disabled={recurring ? false : true}
          value="monthly"
          control={<Radio size="small" />}
          label={<Typography style={{ fontSize: "13px" }}>Monthly</Typography>}
        />
      </RadioGroup>
      <div>
        <Button onClick={handleClick} variant="contained">
          ReSchedule Task
        </Button>
      </div>
    </div>
  );
};

export default RescheduleDatePicker;
