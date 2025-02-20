import weatherStore from "../store/weatherStore";
import apiConfig, { API_KEY } from "./apiConfig";

export const getWeather = async (city: string) => {
  try {
    const response = await apiConfig.get("/weather", {
      params: {
        appid: API_KEY,
        q: city,
        units: weatherStore.units,
        lang: "ru",
      },
    });
    return response.data;
  } catch (err) {
    console.error("При загрузке данных о погоде произошла ошибка:", err);
    return null;
  }
};
