import React from "react";
import styles from "../styles/Location.module.scss";

const Location: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.city}>
        <h2 className={styles.cityName}>Омск</h2>
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
