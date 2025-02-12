import apiConfig from "./apiConfig";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeather = async (city: string) => {
  const { data } = await apiConfig.get("/weather", {
    params: { appid: API_KEY, q: city },
  });
  return data;
};
