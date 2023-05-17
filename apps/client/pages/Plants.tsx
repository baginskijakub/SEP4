import React, { useEffect, useState } from "react";
import styles from "./styles/Plants.module.css";
import { PlantList } from "../components/plant/plantList/PlantList";
import { PlantWrapper } from "../components/plant/plantWrapper/PlantWrapper";
import { IPlant } from "@sep4/types";
import { useUserContext } from "../context/UserContext";
import { getAllPlants } from "../services/PlantService";
import { PhonePlantList } from "../components/plant/phonePlantList/PhonePlantList";

export const Plants:React.FC = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<number>()
  const [isDesktop, setIsDesktop] = useState(true)
  const {user} = useUserContext()
  
  React.useEffect(() => {
      window.innerWidth>1150 ? setIsDesktop(true) : setIsDesktop(false)
      window.addEventListener("resize", () => {
      window.innerWidth>1150 ? setIsDesktop(true) : setIsDesktop(false)
           
    });
  }, []);

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

  const fetchData = () => {
    setSelectedPlant(0)
    getAllPlants().then((res) => {
      setPlants(res)
    }).catch((e) => {
      console.log(e)
    })
  }
if(isDesktop){
  return (
    <div className={styles.pageWrapper}>
      {user && <PlantList plants={plants} changeSelectedPlant={changeSelectedPlant} selectedIndex={selectedPlant} fetchAgain={fetchData}/>}
      {(user && (selectedPlant || selectedPlant === 0)) && <PlantWrapper plantId={plants[selectedPlant].id}/>}
    </div>
  );}
  else 
  {return (
    <div className={styles.phoneWrapper}>
       {user && <PhonePlantList plants={plants} changeSelectedPlant={changeSelectedPlant} selectedIndex={selectedPlant} fetchAgain={fetchData}/>}
       {(user && (selectedPlant || selectedPlant === 0)) && <PlantWrapper plantId={plants[selectedPlant].id}/>}
  </div>
  );}}


export default Plants;
