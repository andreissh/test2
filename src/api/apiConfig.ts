import axios from "axios";
import weatherStore from "../store/weatherStore";

export const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

apiConfig.interceptors.request.use(
  (config) => {
    weatherStore.setLoading(true);
    weatherStore.setError(null);
    return config;
  },
  (error) => {
    weatherStore.setLoading(false);
    return Promise.reject(error);
  }
);

apiConfig.interceptors.response.use(
  (response) => {
    weatherStore.setLoading(false);
    return response;
  },
  (error) => {
    weatherStore.setLoading(false);
    weatherStore.setError(error.response?.data?.message || "Ошибка сети");
    return Promise.reject(error);
  }
);

export default apiConfig;
