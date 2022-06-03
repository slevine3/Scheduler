import React, { useState } from "react";
import "./DatePicker.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";
let validator = require("email-validator");

const DatePicker = () => {
  const [recurring, setRecurring] = useState(false);
  const [value, setValue] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);
  const [name, setName] = useState(null);
  const [interval, setInterval] = useState("hourly");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = async (newValue) => {
    setValue(newValue);
  };
  let timeNow = moment().format();
  let timeComparison = new Date(timeNow) > new Date(value);
  let emailValidation = validator.validate(email);

  const handleClick = async () => {
    if (timeComparison === true) {
      setError("Please provide a future date/time");
    } else if (!name) {
      setError("Please provide a schedule name");
    } else if (emailValidation === false) {
      setError("Please provide a valid email address");
    } else if (!subject) {
      setError("Please provide a subject");
    } else if (!body) {
      setError("Please provide body content");
    } else if (recurring === true && !interval) {
      setError("Please provide a time interval");
    } else {
      try {
        const response = await axiosInstance.post("/tasks", {
          recurring,
          value,
          email,
          subject,
          body,
          name,
          interval,
        });

        navigate("/schedule");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSwitchChange = (e) => {
    setRecurring(e.target.checked);
  };

  return (
    <>
      <div className="datePickerContainer">
        <div className="datePickerInputs">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label="Date & Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="datePickerInputs">
          <TextField
            id="standard-basic"
            label="Schedule Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="datePickerSubject"
            InputProps={{ style: { fontSize: 15 } }}
            required
          />
        </div>
        <div className="datePickerInputs">
          <TextField
            InputProps={{ style: { fontSize: 15 } }}
            placeholder="Separate emails with comma"
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="datePickerEmail"
            required
          />{" "}
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
            required
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={recurring} onChange={handleSwitchChange} />
              }
              label="Recurring"
              style={{ margin: "0px 0px 20px 0px", textAlign: "center" }}
            />
          </FormGroup>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="hourly"
            onChange={(e) => setInterval(e.target.value)}
            style={{ marginBottom: "30px" }}
          >
            <FormControlLabel
              disabled={recurring ? false : true}
              value="hourly"
              control={<Radio />}
              label="Hourly"
            />
            <FormControlLabel
              disabled={recurring ? false : true}
              value="daily"
              control={<Radio />}
              label="Daily"
            />
            <FormControlLabel
              disabled={recurring ? false : true}
              value="monthly"
              control={<Radio />}
              label="Monthly"
            />
          </RadioGroup>
        </div>
        <div className="datePickerButtonContainer">
          <Button
            onClick={handleClick}
            variant="contained"
            style={{ marginBottom: "20px" }}
          >
            Schedule Task
          </Button>

          <Button onClick={() => navigate("/schedule")} variant="outlined">
            View Schedule
          </Button>
        </div>
        {<h4 style={{ color: "red", textAlign: "center" }}>{error}</h4>}
        {<h4 style={{ color: "green", textAlign: "center" }}>{success}</h4>}
      </div>
    </>
  );
};

export default DatePicker;
