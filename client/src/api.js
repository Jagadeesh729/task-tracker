import axios from "axios";

const API = axios.create({
baseURL: "https://task-tracker-xi-jade.vercel.app/api/tasks"
});

export default API;
