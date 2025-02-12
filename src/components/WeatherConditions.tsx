import React from "react";
import styles from "../styles/WeatherConditions.module.scss";

type WeatherConditionType = {
  condition: string;
  value: string;
};

const WeatherConditions: React.FC<WeatherConditionType> = ({
  condition,
  value,
}) => {
  return (
    <div className={styles.info}>
      <span className={styles.conditions}>{condition}</span>
      <span className={styles.conditionsValue}>{value}</span>
    </div>
  );
};

export default WeatherConditions;
