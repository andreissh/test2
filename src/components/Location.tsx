import React, { useEffect, useState } from "react";
import styles from "../styles/Location.module.scss";
import weatherStore from "../store/weatherStore";
import LocationIcon from "./icons/LocationIcon";
import searchCityStore from "../store/searchCityStore";
import { observer } from "mobx-react-lite";
import { getWeather } from "../api/getWeather";
import { toast } from "react-toastify";
import { getCityByIP } from "../api/getPosition";

const Location: React.FC = observer(() => {
  const [units, setUnits] = useState<"metric" | "imperial">(
    () => (localStorage.getItem("units") as "metric" | "imperial") || "metric"
  );
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  const toggleUnits = async (unit: "metric" | "imperial") => {
    setUnits(unit);
    const weather = await getWeather(weatherStore.city, unit);
    if (!weather) {
      console.error("Не удалось получить данные о погоде");
      return;
    }
    weatherStore.setWeather(weather);
  };

  const handleChangeCityClick = (status: boolean) => {
    searchCityStore.toggleCityChange(status);
  };

  const handleChangeCityInputClick = async (status: boolean) => {
    searchCityStore.toggleCityChange(status);

    if (!searchText) return;

    const weather = await getWeather(searchText, units);
    if (!weather) {
      console.error("Не удалось получить данные о погоде");
      toast.error("Город не найден. Проверьте правильность ввода.", {
        position: "bottom-right",
        style: { width: "500px" },
      });
      return;
    }
    weatherStore.setCity(searchText);
    weatherStore.setWeather(weather);
  };

  const handleMyLocation = async () => {
    const city = await getCityByIP();
    weatherStore.setCity(city);
    const weather = await getWeather(weatherStore.city, units);
    weatherStore.setWeather(weather);
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (!weatherStore.weather) return <></>;

  return (
    <div className={`${styles.wrapper}`}>
      {searchCityStore.isCityChangeActive ? (
        <div className={styles.searchBlock}>
          <input
            className={styles.search}
            type="text"
            placeholder="Введите название"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button
            className={styles.searchBtn}
            onClick={() => handleChangeCityInputClick(false)}
          >
            ОК
          </button>
        </div>
      ) : (
        <div className={styles.city}>
          <h2 className={styles.cityName}>{weatherStore.weather.name}</h2>
          <div className={styles.locationWrapper}>
            <button
              className={styles.changeCity}
              onClick={() => handleChangeCityClick(true)}
            >
              Сменить город
            </button>
            <div className={styles.locationBlock}>
              <span>
                <LocationIcon />
              </span>
              <button className={styles.location} onClick={handleMyLocation}>
                Мое местоположение
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.temperature}>
        <span>°</span>
        <button
          className={`${styles.celsius} ${
            units === "metric" ? styles.active : ""
          }`}
          onClick={() => toggleUnits("metric")}
        >
          C
        </button>
        <button
          className={`${styles.fahrenheit} ${
            units === "imperial" ? styles.active : ""
          }`}
          onClick={() => toggleUnits("imperial")}
        >
          F
        </button>
      </div>
    </div>
  );
});

export default Location;
