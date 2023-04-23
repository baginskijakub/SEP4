import React from "react";
import styles from "./PlantWrapper.module.css";
import { PlantHead } from "../plantHead/PlantHead";
import { PlantCurrentEnvironment } from "../plantCurrentEnvironment/PlantCurrentEnvironment";
import { PlantIdealEnvironment } from "../plantIdealEnvironment/PlantIdealEnvironment";
import { PlantPastEnvironment } from "../plantPastEnvironment/PlantPastEnvironment";
import { IPlant, IPlantCurrentEnvironment, IPlantIdealEnvironment } from "@sep4/types";

interface Props{
  plant: IPlant
}

export const PlantWrapper:React.FC<Props> = ({plant}) => {

  const mock: IPlantCurrentEnvironment = {
    temperature: 20,
    humidity: 50,
    co2: 1000
  }

  const mock2: IPlantIdealEnvironment = {
    minTemperature: 10,
    maxTemperature: 30,
    minHumidity: 0,
    maxHumidity: 100,
    minCo2: 0,
    maxCo2: 10
  }

  return (
    <div className={styles.wrapper}>
        <PlantHead plant={plant}/>
        <PlantCurrentEnvironment environment={mock}/>
        <PlantIdealEnvironment environment={mock2}/>
        <PlantPastEnvironment id={12}/>
    </div>
  );
};
