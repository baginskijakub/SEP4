import React, { useEffect, useState } from "react";
import { IPlant } from "@sep4/types";
import { MdChevronRight } from "react-icons/all";
import styles from "./PlantsWatering.module.css";
import { adjustWatering } from "../../../services/PlantService";

interface Props{
  plant: IPlant
}
export const AdjustWatering:React.FC<Props> = ({plant}) => {

  const [interval, setInterval] = useState(plant.wateringInterval);

  useEffect(() => {
    adjustWatering(plant.id, interval).then(() => {
      console.log("Watering interval adjusted");
    }).catch((err) => {
      console.log(err);
    })
  }, [interval, plant.id]);

  return (
    <div className={styles.adjustWrapper}>
      <div className={styles.adjustLeft}>
        <img src={plant.image} alt={plant.name}/>
        <h3>{plant.nickName}</h3>
      </div>
      <div className={styles.adjustRight}>
        <h4>Watered every</h4>
        <div className={styles.toggle}>
          <MdChevronRight size={32} style = {{transform: 'rotate(-90deg)' }} className={styles.toggleChevron} onClick={() => setInterval(interval+1)}/>
          <h4 className={styles.toggleButton}>{interval}</h4>
          <MdChevronRight size={32} style = {{transform: 'rotate(90deg)' }} className={styles.toggleChevron} onClick={() => setInterval(interval-1)}/>
        </div>
        <h4>days</h4>
      </div>
    </div>
  );
};
