import React, { useState } from "react";
import styles from "../styles/Location.module.scss";
import weatherStore from "../store/weatherStore";
import LocationIcon from "./icons/LocationIcon";

const Location: React.FC = () => {
  const [units, setUnits] = useState<string>("celsius");

  const toggleUnits = (unit: string) => {
    setUnits(unit);
  };

  if (!weatherStore.weather) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.city}>
        <h2 className={styles.cityName}>{weatherStore.weather.name}</h2>
        <div className={styles.locationWrapper}>
          <button className={styles.changeCity}>Сменить город</button>
          <div className={styles.locationBlock}>
            <span>
              <LocationIcon />
            </span>
            <button className={styles.location}>Мое местоположение</button>
          </div>
        </div>
      </div>
      <div className={styles.temperature}>
        <span>°</span>
        <button
          className={`${styles.celsius} ${
            units === "celsius" ? styles.active : ""
          }`}
          onClick={() => toggleUnits("celsius")}
        >
          C
        </button>
        <button
          className={`${styles.fahrenheit} ${
            units === "fahrenheit" ? styles.active : ""
          }`}
          onClick={() => toggleUnits("fahrenheit")}
        >
          F
        </button>
      </div>
    </div>
  );
};

export default Location;
