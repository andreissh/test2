import React from "react";
import SunIcon from "./icons/SunIcon";
import styles from "../styles/Display.module.scss";

const Display: React.FC = () => {
  return (
    <div className={styles.displayBlock}>
      <div className={styles.temperatureBlock}>
        <SunIcon />
        <span className={styles.temperature}>19</span>
      </div>
      <span className={styles.info}>Преимущественно солнечно</span>
    </div>
  );
};

export default Display;
