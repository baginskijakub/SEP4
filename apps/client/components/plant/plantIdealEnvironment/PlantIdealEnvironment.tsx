import React, { useEffect, useState } from "react";
import styles from "./PlantIdealEnvironment.module.css";
import { IPlantIdealEnvironment } from "@sep4/types";
import { AutoComplete } from "../../utils/autoComplete/AutoComplete";

interface DisplayEnvironment {
  min: string;
  max: string;
  displayMin: string;
  displayMax: string;
}

interface Props{
  environment: IPlantIdealEnvironment
}
export const PlantIdealEnvironment:React.FC<Props> = ({environment}) => {
  const [selectedType, setSelectedType] = useState<string>('temperature')
  const [currentEnvironment, setCurrentEnvironment] = useState<DisplayEnvironment>({
    min: environment.minTemperature.toString() + '°C',
    max: environment.maxTemperature.toString() + '°C',
    displayMin: '12°C',
    displayMax: '26°C'
  })

  useEffect(() => {
    if(selectedType === 'temperature'){
      setCurrentEnvironment({
        min: environment.minTemperature + '°C',
        max: environment.maxTemperature + '°C',
        displayMin: '12°C',
        displayMax: '26°C'
      })
    } else if(selectedType === 'humidity'){
      setCurrentEnvironment({
        min: environment.minHumidity.toString(),
        max: environment.maxHumidity.toString(),
        displayMin: '0',
        displayMax: '100'
      })
    } else if(selectedType === 'co2'){
        setCurrentEnvironment({
          min: environment.minCo2.toString(),
          max: environment.maxCo2.toString(),
          displayMin: '0',
          displayMax: '100'
        })
      }
  }, [selectedType])
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h4>Ideal environment</h4>
        <AutoComplete options={["humidity", "co2", "temperature"]} onChange={(value: string) => setSelectedType(value)}/>
      </div>
      <div className={styles.bar}>
        <p className={'body-small'}>{currentEnvironment.displayMin}</p>
        <div className={styles.barInner}>
            <p className={'body-small'}>{currentEnvironment.min}</p>
            <span className={styles.separator}/>
            <p className={'body-small'}>{currentEnvironment.max}</p>
        </div>
        <p className={'body-small'}>{currentEnvironment.displayMax}</p>
      </div>
    </div>
  );
};
