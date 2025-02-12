import { makeAutoObservable } from "mobx";
import { getWeather } from "../api/getWeather";
import { getCityByIP } from "../api/getPosition";
import { WeatherDataType } from "../types/types";

class WeatherStore {
  city: string = "";
  weather: WeatherDataType | null = null;
  weatherIcon: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: string) {
    this.city = city;
  }

  setWeather(weather: WeatherDataType) {
    this.weather = weather;
  }

  setWeatherIcon(weatherIcon: string) {
    this.weatherIcon = weatherIcon;
  }

  async fetchWeatherData() {
    const city = await getCityByIP();
    this.setCity(city);
    const weather = await getWeather(city);
    this.setWeather(weather);
    const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    this.setWeatherIcon(weatherIcon);
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
