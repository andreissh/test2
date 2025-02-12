import apiConfig, { API_KEY } from "./apiConfig";

export const getWeather = async (city: string) => {
  const { data } = await apiConfig.get("/weather", {
    params: { appid: API_KEY, q: city, units: "metric", lang: "ru" },
  });
  return data;
};
