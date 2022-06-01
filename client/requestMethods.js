import axios from "axios";

const BASE_URL = "https://daily-task-scheduler.herokuapp.com/api";

export const publicRequest = axios.create({ baseURL: BASE_URL });
