import React from "react";
import styles from "./PlantCurrentEnvironment.module.css";
import { IPlantCurrentEnvironment } from "@sep4/types";

interface Props {
  environment: IPlantCurrentEnvironment
}
export const PlantCurrentEnvironment:React.FC<Props> = ({environment}) => {
  return (
    <div className={styles.wrapper}>
        <h4>Current Environment</h4>
        <div className={styles.container}>
          <div className={styles.node}>
            <p className={'body-small'}>Temperature</p>
            <p className={styles.highlight + ' body-small'}>{environment.temperature}°C</p>
          </div>
          <div className={styles.node}>
            <p className={'body-small'}>Humidity</p>
            <p className={styles.highlight + ' body-small'}>{environment.humidity}</p>
          </div>
          <div className={styles.node}>
            <p className={'body-small'}>Environment</p>
            <p className={styles.highlight + ' body-small'}>{environment.co2}</p>
          </div>
        </div>
    </div>
  );
};
