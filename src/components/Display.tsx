import React from "react";
import styles from "../styles/Display.module.scss";
import weatherStore from "../store/weatherStore";

const Display: React.FC = () => {
  if (!weatherStore.weather) return null;

  const { description } = weatherStore.weather.weather[0];
  const { temp } = weatherStore.weather.main;

  const getCapitalizedDescription = (description: string) => {
    return description[0].toUpperCase() + description.slice(1);
  };

  return (
    <div className={styles.displayBlock}>
      <div className={styles.temperatureBlock}>
        <img src={weatherStore.weatherIcon} alt="Weather icon" />
        <span className={styles.temperature}>{Math.round(temp)}°</span>
      </div>
      <span className={styles.info}>
        {getCapitalizedDescription(description)}
      </span>
    </div>
  );
};

export default Display;
