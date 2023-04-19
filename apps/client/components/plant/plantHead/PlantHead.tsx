import React from "react";
import { IPlant } from "@sep4/types";
import styles from "./PlantHead.module.css";

interface Props{
  plant: IPlant
}
export const PlantHead:React.FC<Props> = ({plant}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerLeft}>
        <h2>{plant.nickName}</h2>
        <h4>{plant.name}</h4>
        <p>{plant.latinName}</p>
      </div>
      <img src={plant.image} alt={plant.name} className={styles.img} />
    </div>
  );
};
