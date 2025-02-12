import React from "react";
import WeatherConditions from "./WeatherConditions";
import styles from "../styles/Info.module.scss";

const Info: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <WeatherConditions condition="Ветер" value="5 м/c, западный" />
      <WeatherConditions condition="Давление" value="752 мм рт. ст." />
      <WeatherConditions condition="Влажность" value="60%" />
      <WeatherConditions condition="Вероятность дождя" value="10%" />
    </div>
  );
};

export default Info;
