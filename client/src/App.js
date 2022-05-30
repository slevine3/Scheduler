import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import RescheduleTask from "./pages/RescheduleTask/RescheduleTask";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/edit" element={<RescheduleTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
