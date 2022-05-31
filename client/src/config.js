import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://daily-task-scheduler.herokuapp.com/api",
});
