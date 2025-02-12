import axios from "axios";

export const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

export default apiConfig;
