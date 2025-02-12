import React from "react";
import styles from "../styles/Weather.module.scss";
import Location from "./Location";
import Display from "./Display";
import Info from "./Info";

const Weather: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Location />
        <Display />
        <Info />
      </div>
    </div>
  );
};

export default Weather;
