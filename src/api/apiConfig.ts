import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

export default apiConfig;
