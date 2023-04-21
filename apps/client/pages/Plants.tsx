import React from "react";
import styles from "./styles/Plants.module.css";
import { PlantList } from "../components/plant/plantList/PlantList";
import { PlantWrapper } from "../components/plant/plantWrapper/PlantWrapper";
import { IPlant } from "@sep4/types";
import { useUser } from "../context/UserContext";

export const Plants:React.FC = () => {
  const user = useUser()
  const plant: IPlant = {
    id: 12,
    name: "Plant 1",
    nickName: "Plant 1",
    latinName: "Plant 1",
    image: "https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8=",
    currentEnvironment: {
      temperature: 12,
      humidity: 12,
      co2: 12
    },
    idealEnvironment: {
      minTemperature: 12,
      maxTemperature: 12,
      minHumidity: 12,
      maxHumidity: 12,
      minCo2: 12,
      maxCo2: 126
    }
  }
  return (
    <div className={styles.pageWrapper}>
      <PlantList/>
      {user && <PlantWrapper plant={plant}/>}
    </div>
  );
};

export default Plants;
