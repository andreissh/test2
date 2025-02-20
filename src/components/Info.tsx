import React from "react";
import WeatherConditions from "./WeatherConditions";
import styles from "../styles/Info.module.scss";
import weatherStore from "../store/weatherStore";
import getWindDirection from "../utils/utils";

enum Conditions {
  WIND = "Ветер",
  PRESSURE = "Давление",
  HUMIDITY = "Влажность",
  RAIN = "Вероятность дождя",
}

const Info: React.FC = () => {
  if (!weatherStore.weather) return null;

  const { speed, deg: degrees } = weatherStore.weather.wind;
  const { pressure, humidity } = weatherStore.weather.main;
  const { pop: rain } = weatherStore.weather;

  return (
    <div className={styles.wrapper}>
      <WeatherConditions
        condition={Conditions.WIND}
        value={`${Math.round(speed)} м/с, ${getWindDirection(degrees)}`}
      />
      <WeatherConditions
        condition={Conditions.PRESSURE}
        value={`${pressure} мм рт. ст.`}
      />
      <WeatherConditions
        condition={Conditions.HUMIDITY}
        value={`${humidity}%`}
      />
      <WeatherConditions
        condition={Conditions.RAIN}
        value={`${rain ? rain * 100 + "%" : "-"}`}
      />
    </div>
  );
};

export default Info;
