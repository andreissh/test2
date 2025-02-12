import React from "react";
import styles from "../styles/Location.module.scss";
import weatherStore from "../store/weatherStore";

const Location: React.FC = () => {
  if (!weatherStore.weather) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.city}>
        <h2 className={styles.cityName}>{weatherStore.weather.name}</h2>
        <div className={styles.locationBlock}>
          <button className={styles.changeCity}>Сменить город</button>
          <button className={styles.location}>Мое местоположение</button>
        </div>
      </div>
      <div className={styles.temperature}>
        <button className={styles.celsius}>C</button>
        <button className={styles.fahrenheit}>F</button>
      </div>
    </div>
  );
};

export default Location;
