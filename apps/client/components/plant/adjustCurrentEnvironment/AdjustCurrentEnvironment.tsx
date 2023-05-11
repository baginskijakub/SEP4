import React, { useState } from "react";
import styles from "./AdjustCurrentEnvironment.module.css";
import { Slider } from "../../utils/slider/Slider";
import { IPlantCurrentEnvironment, IPlantIdealEnvironment } from "@sep4/types";
import { PrimaryButtonSmall } from "../../buttons/primaryButtonSmall/primaryButtonSmall";
import { adjustEnvironment } from "../../../services/PlantService";
import { SecondaryButtonSmall } from "../../buttons/secondaryButtonSmall/secondaryButtonSmall";
import { MdOutlineClose } from "react-icons/md";

interface Props {
  currentEnvironment: IPlantCurrentEnvironment,
  idealEnvironment: IPlantIdealEnvironment,
  plantId: number
  onClose: () => void
}
export const AdjustCurrentEnvironment:React.FC<Props> = ({currentEnvironment, idealEnvironment, plantId, onClose}) => {
  const [currentEnvironmentState, setCurrentEnvironmentState] = useState<IPlantCurrentEnvironment>(currentEnvironment);

  const updateLocalEnvironment = (type: string, value: number) => {
    switch (type){
      case 'temperature':
        setCurrentEnvironmentState({...currentEnvironment, temperature: value})
        break;
      case 'co2':
        setCurrentEnvironmentState({...currentEnvironment, co2: value})
        break;
      case 'humidity':
        setCurrentEnvironmentState({...currentEnvironment, humidity: value})
    }
  }

  const onAdjust = () => {
    adjustEnvironment(plantId, currentEnvironmentState).then(() => {
      onClose()
    }).catch((e) => {
      console.log(e)
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.closeBtn} onClick={onClose}>
          <MdOutlineClose size={20} />
        </div>
        <div>
          <h1>Adjust environment</h1>
        </div>
        <div className={styles.inner}>
          <h4>Temperature</h4>
          <Slider
            ariaLabel={'Temperature'}
            minValue={idealEnvironment.minTemperature}
            maxValue={idealEnvironment.maxTemperature}
            defaultValue={currentEnvironment.temperature}
            unit={'°C'}
            onChange={(value) => updateLocalEnvironment('temperature', value)}
          />
        </div>
        <div className={styles.inner}>
          <h4>Humidity</h4>
          <Slider
            ariaLabel={'Humidity'}
            minValue={idealEnvironment.minHumidity}
            maxValue={idealEnvironment.maxHumidity}
            defaultValue={currentEnvironment.humidity}
            unit={'%'}
            onChange={(value) => updateLocalEnvironment('humidity', value)}
          />
        </div>
        <div className={styles.inner}>
          <h4>CO2</h4>
          <Slider
            ariaLabel={'CO2'}
            minValue={idealEnvironment.minCo2}
            maxValue={idealEnvironment.maxCo2}
            defaultValue={currentEnvironment.co2}
            unit={'ppm'}
            onChange={(value) => updateLocalEnvironment('co2', value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <SecondaryButtonSmall onClick={onClose}>Discard changes</SecondaryButtonSmall>
          <PrimaryButtonSmall onClick={onAdjust}>
            Adjust
          </PrimaryButtonSmall>
        </div>
      </div>
    </div>
  );
};
