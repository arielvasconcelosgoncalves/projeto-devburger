import axios from "axios";

const api = axios.create({
  baseURL: process.env.ASAAS_API_URL,
  headers: {
    access_token: process.env.ASAAS_API_KEY,
    "Content-Type": "application/json",
  },
});

export default api;
