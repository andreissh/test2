import React from "react";
import WeatherConditions from "./WeatherConditions";
import styles from "../styles/Info.module.scss";
import weatherStore from "../store/weatherStore";
import getWindDirection from "../utils/utils";

const Info: React.FC = () => {
  if (!weatherStore.weather) return <></>;

  return (
    <div className={styles.wrapper}>
      <WeatherConditions
        condition="Ветер"
        value={`${Math.round(
          weatherStore.weather.wind.speed
        )} м/c, ${getWindDirection(weatherStore.weather.wind.deg)}`}
      />
      <WeatherConditions
        condition="Давление"
        value={`${weatherStore.weather?.main.pressure} мм рт. ст.`}
      />
      <WeatherConditions
        condition="Влажность"
        value={`${weatherStore.weather?.main.humidity}%`}
      />
      <WeatherConditions
        condition="Вероятность дождя"
        value={`${
          weatherStore.weather?.pop
            ? weatherStore.weather?.pop * 100 + "%"
            : "-"
        }`}
      />
    </div>
  );
};

export default Info;
