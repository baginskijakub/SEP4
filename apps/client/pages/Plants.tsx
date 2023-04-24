import React, { useEffect, useState } from "react";
import styles from "./styles/Plants.module.css";
import { PlantList } from "../components/plant/plantList/PlantList";
import { PlantWrapper } from "../components/plant/plantWrapper/PlantWrapper";
import { IPlant } from "@sep4/types";
import { useUserContext } from "../context/UserContext";
import { getAllPlants } from "../services/PlantService";

export const Plants:React.FC = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<number>()
  const {user} = useUserContext()

  useEffect(() => {
    getAllPlants().then((res) => {
      setPlants(res)
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
    if(plants.length > 0){
      setSelectedPlant(0)
    }

  }, [plants]);

  const changeSelectedPlant = (index: number) => {
      setSelectedPlant(index)
  }

  return (
    <div className={styles.pageWrapper}>
      {user && <PlantList plants={plants} changeSelectedPlant={changeSelectedPlant} selectedIndex={selectedPlant}/>}
      {(user && (selectedPlant || selectedPlant === 0)) && <PlantWrapper plant={plants[selectedPlant]}/>}
    </div>
  );
};

export default Plants;
