import axios from "axios";

export const getCityByIP = async () => {
  const response = await axios.get("http://ip-api.com/json/");
  return response.data.city;
};
