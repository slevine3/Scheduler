import React from "react";
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
  const [value, setValue] = React.useState(new Date(currentDateTime));

  const handleChange = async (newValue) => {
    setValue(newValue);

    const options = {
      method: "GET",
      url: "https://meteostat.p.rapidapi.com/stations/hourly",
      params: {
        station: "10637",
        start: "2022-05-26",
        end: "2022-05-27",
        tz: "Europe/Berlin",
      },
      headers: {
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
        "X-RapidAPI-Key": "6f9c7db7afmsh9b80a62b2b1ab46p157678jsna766966166a2",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
    </div>
  );
};

export default DatePicker;
