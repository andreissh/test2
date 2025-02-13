import { makeAutoObservable } from "mobx";
import { getWeather } from "../api/getWeather";
import { getCityByIP } from "../api/getPosition";
import { WeatherDataType } from "../types/types";

class WeatherStore {
  city: string = "";
  weather: WeatherDataType | null = null;
  weatherIcon: string = "";
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: string) {
    this.city = city;
  }

  setWeather(weather: WeatherDataType | null) {
    this.weather = weather;
  }

  setWeatherIcon(weatherIcon: string) {
    this.weatherIcon = weatherIcon;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  async fetchWeatherData() {
    this.setLoading(true);
    this.setError(null);

    try {
      const city = await getCityByIP();
      if (!city) {
        console.error("Не удалось получить город");
        return;
      }
      this.setCity(city);
      const weather = await getWeather(city);
      if (!weather) {
        console.error("Не удалось получить данные о погоде");
        return;
      }
      this.setWeather(weather);
      const weatherIcon = weather.weather?.[0]?.icon
        ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
        : "";
      this.setWeatherIcon(weatherIcon);
    } catch (error) {
      if (error instanceof Error) {
        this.setError(error.message);
      } else {
        this.setError("Произошла ошибка");
      }
    } finally {
      this.setLoading(false);
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
