import logo from "./logo.svg";
import "./App.css";
import DatePicker from "./components/DatePicker/DatePicker";
import DailyTask from "./components/DailyTask/DailyTask";

function App() {
  return (
    <div>
      <DatePicker />
      <DailyTask />
    </div>
  );
}

export default App;
