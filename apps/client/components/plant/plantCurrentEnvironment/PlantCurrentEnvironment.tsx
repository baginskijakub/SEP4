import React, { useEffect, useState } from "react";
import styles from "./PlantCurrentEnvironment.module.css";
import { IPlantCurrentEnvironment } from "@sep4/types";
import { io } from "socket.io-client";

interface Props {
  id: number
}

export const PlantCurrentEnvironment:React.FC<Props> = ({id}) => 
{
  
  const [environment, setEnvironment] = useState<IPlantCurrentEnvironment>({temperature: 0, humidity: 0, co2: 0})

  useEffect(() => {
    // we might need 'api' added to the url
    const socket = io("http://localhost:3333/")
    socket.emit('connectInit', id)
    socket.on("update", (data) => {
      setEnvironment(data)
    })
  }, [])

  
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


