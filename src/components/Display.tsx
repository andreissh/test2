import React from "react";
import styles from "../styles/Display.module.scss";
import weatherStore from "../store/weatherStore";

const Display: React.FC = () => {
  if (!weatherStore.weather) return <></>;

  const description = weatherStore.weather.weather[0].description;
  const temperature = weatherStore.weather?.main.temp;

  return (
    <div className={styles.displayBlock}>
      <div className={styles.temperatureBlock}>
        <img src={weatherStore.weatherIcon} alt="Weather icon" />
        <span className={styles.temperature}>{Math.round(temperature)}°</span>
      </div>
      <span className={styles.info}>
        {description[0].toUpperCase() + description.slice(1)}
      </span>
    </div>
  );
};

export default Display;
