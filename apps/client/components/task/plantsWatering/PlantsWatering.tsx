import React, { useEffect, useState } from "react";
import styles from "./PlantsWatering.module.css";
import { IPlant } from "@sep4/types";
import { AdjustWatering } from "./AdjustWatering";
import { getAllPlants } from "../../../services/PlantService";
import { Loader } from "../../utils/loader/Loader";

export const PlantsWatering:React.FC = () => {

  const [plants, setPlants] = useState<IPlant[]>([]);

  useEffect(() => {
    getAllPlants().then((res) => {
      setPlants(res);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3>Plants watering</h3>
      {plants.length > 0 ? <div className={styles.container}>
        {plants?.map((plant) => (
          <AdjustWatering plant={plant} key={plant.id} />
        ))}
      </div>  : <Loader/>}
    </div>
  );
};
