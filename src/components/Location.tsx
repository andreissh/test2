import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Location.module.scss";
import weatherStore from "../store/weatherStore";
import LocationIcon from "./icons/LocationIcon";
import searchCityStore from "../store/searchCityStore";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { reaction } from "mobx";
import { UnitsType } from "../types/types";

enum Units {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

const Location: React.FC = observer(() => {
  const [searchText, setSearchText] = useState<string>("");
  const searchBlockRef = useRef<HTMLDivElement | null>(null);

  const toggleUnits = async (units: UnitsType) => {
    localStorage.setItem("units", units);
    weatherStore.setUnits(units);
    weatherStore.fetchWeatherData(weatherStore.city);
  };

  const handleChangeCityClick = () => {
    searchCityStore.toggleCityChange(true);
  };

  const handleFetchWeatherByCity = async () => {
    searchCityStore.toggleCityChange(false);

    if (!searchText) return;

    const data = await weatherStore.fetchWeatherData(searchText);
    if (data && data.error) {
      console.error("Не удалось получить данные о погоде");
      toast.error("Город не найден. Проверьте правильность ввода.", {
        position: "bottom-right",
        style: { width: "500px" },
      });
      weatherStore.setCity(weatherStore.prevCity);
      return;
    }
  };

  const handleMyLocation = async () => {
    weatherStore.fetchWeatherData();
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBlockRef.current &&
      !searchBlockRef.current.contains(event.target as Node)
    ) {
      searchCityStore.toggleCityChange(false);
    }
  };

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      searchCityStore.toggleCityChange(false);
    }
  };

  useEffect(() => {
    const disposer = reaction(
      () => searchCityStore.isCityChangeActive,
      (isActive) => {
        if (isActive) {
          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("keydown", handleEscapePress);

          requestAnimationFrame(() => {
            if (searchBlockRef.current) {
              const input = searchBlockRef.current.querySelector("input");
              if (input) input.focus();
            }
          });
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscapePress);
        }
      },
      { fireImmediately: true }
    );

    return () => {
      disposer();
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  if (!weatherStore.weather) return null;

  return (
    <div className={styles.wrapper}>
      {searchCityStore.isCityChangeActive ? (
        <div className={styles.searchBlock} ref={searchBlockRef}>
          <input
            className={styles.search}
            type="text"
            placeholder="Введите название"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button
            className={styles.searchBtn}
            onClick={handleFetchWeatherByCity}
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
              onClick={handleChangeCityClick}
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
            weatherStore.units === Units.METRIC ? styles.active : ""
          }`}
          onClick={() => toggleUnits(Units.METRIC)}
        >
          C
        </button>
        <button
          className={`${styles.fahrenheit} ${
            weatherStore.units === Units.IMPERIAL ? styles.active : ""
          }`}
          onClick={() => toggleUnits(Units.IMPERIAL)}
        >
          F
        </button>
      </div>
    </div>
  );
});

export default Location;
