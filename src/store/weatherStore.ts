import { makeAutoObservable } from "mobx";
import { getWeather } from "../api/getWeather";
import { UnitsType, WeatherDataType } from "../types/types";
import { getCityByIP } from "../api/getPosition";

class WeatherStore {
  city: string = "";
  prevCity: string = "";
  weather: WeatherDataType | null = null;
  weatherIcon: string = "";
  units: UnitsType = (localStorage.getItem("units") as UnitsType) ?? "metric";
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: string) {
    this.city = city;
  }

  setPrevCity(prevCity: string) {
    this.prevCity = prevCity;
  }

  setWeather(weather: WeatherDataType | null) {
    this.weather = weather;
  }

  setWeatherIcon(weatherIcon: string) {
    this.weatherIcon = weatherIcon;
  }

  setUnits(units: UnitsType) {
    this.units = units;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  async fetchWeatherData(currentCity?: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      if (currentCity) {
        this.setPrevCity(this.city);
        this.setCity(currentCity);
      } else {
        const city = await getCityByIP();
        if (!city) {
          console.error("Не удалось получить город");
          return;
        }
        this.setCity(city);
      }
      const weather = await getWeather(currentCity ? currentCity : this.city);
      if (!weather) {
        console.error("Не удалось получить данные о погоде");
        return { error: true, message: "Не удалось получить данные о погоде" };
      }
      this.setWeather(weather);
      const { icon: iconId } = weather.weather[0];
      const weatherIcon = iconId
        ? `https://openweathermap.org/img/wn/${iconId}@4x.png`
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
