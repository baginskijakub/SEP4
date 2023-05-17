import React, { useState } from "react";
import { PlantListed } from "../plantListed/PlantListed";
import styles from "./PlantList.module.css";
import { IPlant } from "@sep4/types";
import { CreatePlant } from "../createPlant/CreatePlant";
import { MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'

interface Props{
  plants: IPlant[]
  changeSelectedPlant: (index: number) => void
  selectedIndex: number
  fetchAgain: () => void
}

export const PlantList:React.FC<Props> = ({plants, changeSelectedPlant, selectedIndex, fetchAgain}) => {
  const [displayCreateModal, setDisplayCreateModal] = useState(false)
  const [isFullList, setIsFullList] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<number>(selectedIndex)
  const [isDesktop, setIsDesktop] = useState(true)
  
  React.useEffect(() => {
    window.innerWidth>1150 ? setIsDesktop(true) : setIsDesktop(false)
    window.addEventListener("resize", () => {
    window.innerWidth>1150 ? setIsDesktop(true) : setIsDesktop(false)
         
  });
}, []);



  return (
    (isDesktop)?(<div className={styles.wrapper}>
      <h3>Plants</h3>
      <div className={styles.container}>
        {plants.map((plant, index) => {
          return(
            <PlantListed
              onClick={() => changeSelectedPlant(index)}
              name={plant.name}
              latinName={plant.latinName}
              id={plant.id}
              key={plant.id}
              url={plant.image}
              isSelected={index === selectedIndex}
              fetchAgain={fetchAgain}
            />
          )
        })}
        <div className={styles.addPlantButton} onClick={() => setDisplayCreateModal(true)}>Add plant</div>
      </div>
      {displayCreateModal && <CreatePlant onClose={() => setDisplayCreateModal(false)} mode={'create'} fetchAgain={fetchAgain}/>}
    </div>
  ):
(isFullList)?<div className={styles.wrapper}>
      <h3>Plants</h3>
      <div className={styles.fullContainer}>
        {plants.map((plant, index) => {
          return(
            <PlantListed
              onClick={() => {setSelectedPlant(index);changeSelectedPlant(index)}}
              name={plant.name}
              latinName={plant.latinName}
              id={plant.id}
              key={plant.id}
              url={plant.image}
              isSelected={index === selectedIndex}
              fetchAgain={fetchAgain}
            />
          )
        })}
        <div className={styles.addPlantButton} onClick={() => setDisplayCreateModal(true)}>Hola</div>
      </div>
      {displayCreateModal && <CreatePlant onClose={() => setDisplayCreateModal(false)} mode={'create'} fetchAgain={fetchAgain}/>}
      <div className={styles.arrowContainer}><MdKeyboardArrowUp size={40} onClick={()=>setIsFullList(false)}/></div>
      
    </div>
  :
    <div className={styles.wrapper}>
      <h3>Plants</h3>
      <div className={styles.container}>

  { plants[selectedPlant] ?
   <PlantListed
   onClick={() => changeSelectedPlant(selectedPlant)}
   name={plants[selectedPlant].name}
   latinName={plants[selectedPlant].latinName}
   id={plants[selectedPlant].id}
   key={plants[selectedPlant].id}
   url={plants[selectedPlant].image}
   isSelected={true}
   fetchAgain={fetchAgain}
   />  
   : 
  <h1>Select from list below</h1>
}        
        <div className={styles.addPlantButton} onClick={() => setDisplayCreateModal(true)}>Add plant</div>
        <div className={styles.arrowContainer}><MdKeyboardArrowDown size={40} onClick={()=>setIsFullList(true)}/></div>
      
      </div>
      {displayCreateModal && <CreatePlant onClose={() => setDisplayCreateModal(false)} mode={'create'} fetchAgain={fetchAgain}/>}
    </div>
  );}

