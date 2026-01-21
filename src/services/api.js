import axios from "axios";

export const api = axios.create({
  baseURL: "https://lms-backend-ztnc.onrender.com/api"
});


