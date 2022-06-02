import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import React, { Component } from "react";
import Home from "./pages/Home/Home";
import RescheduleTask from "./pages/RescheduleTask/RescheduleTask";
import LogRocket from "logrocket";
import Schedule from "./pages/Schedule/Schedule";

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
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
