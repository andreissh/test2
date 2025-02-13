import axios from "axios";

export const getCityByIP = async () => {
  try {
    const response = await axios.get("https://get.geojs.io/v1/ip/country.json");
    return response.data.name;
  } catch (err) {
    console.error("Ошибка при получении города по IP:", err);
    return null;
  }
};
