import React, { useEffect, useState } from "react";
import { PlantListed } from "../plantListed/PlantListed";
import styles from "./PlantList.module.css";
import { IPlant } from "@sep4/types";
import { CreatePlant } from "../createPlant/CreatePlant";

interface Props{
  plants: IPlant[]
  changeSelectedPlant: (id: number) => void
}
export const PlantList:React.FC<Props> = ({plants, changeSelectedPlant}) => {
  const [displayCreateModal, setDisplayCreateModal] = useState(false)

  useEffect(() => {
    console.log(displayCreateModal)
  }, [displayCreateModal])

  return (
    <div className={styles.wrapper}>
      <h3>Plants</h3>
      <div className={styles.container}>
        {plants.map((plant, index) => {
          return(
            <PlantListed onClick={() => changeSelectedPlant(index)} name={plant.name} latinName={plant.latinName} id={plant.id} key={plant.id} url={plant.image} />
          )
        })}
        <div className={styles.addPlantButton} onClick={() => setDisplayCreateModal(true)}>Add plant</div>
      </div>
      {displayCreateModal && <CreatePlant onClose={() => setDisplayCreateModal(false)} mode={'create'} />}
    </div>
  );
};
