import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import React, { Component } from "react";
import Home from "./pages/Home/Home";
import RescheduleTask from "./pages/RescheduleTask/RescheduleTask";
import LogRocket from "logrocket";
import Schedule from "./pages/Schedule/Schedule";
import RescheduleRecurring from "./pages/RescheduleRecurring/RescheduleRecurring";

class App extends Component {
  componentWillMount() {
    LogRocket.init(process.env.REACT_APP_LOG_ROCKET);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/schedule" element={<Schedule />} />
            <Route path="/edit" element={<RescheduleTask />} />
            <Route path="/editRecurring" element={<RescheduleRecurring />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
