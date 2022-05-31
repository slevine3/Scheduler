import React, { useState } from "react";
import "./DatePicker.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import axios from "axios";
import { Button } from "@mui/material";

const DatePicker = () => {
  const [value, setValue] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async (newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    if (!email) {
      setError("Please provide an email address");
    } else if (!subject) {
      setError("Please provide a subject");
    } else if (!body) {
      setError("Please provide body content");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/tasks", {
          value,
          email,
          subject,
          body,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
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

      <div className="datePickerInputs">
        <TextField
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

      <div>
        <TextField
          id="standard-basic"
          label="Subject"
          variant="standard"
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          className="datePickerSubject"
          required
        />
      </div>
      <div>
        <TextField
          id="standard-multiline-static"
          label="Body"
          multiline
          rows={4}
          onChange={(e) => setBody(e.target.value)}
          className="datePickerBody"
          variant="standard"
          required
        />
      </div>
      <div>
        <Button onClick={handleClick} variant="contained">
          Schedule Task
        </Button>
      </div>
      {<h4 style={{ color: "red", textAlign: "center" }}>{error}</h4>}
    </div>
  );
};

export default DatePicker;
