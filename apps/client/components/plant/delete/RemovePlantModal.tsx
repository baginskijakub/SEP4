import React, { useEffect } from "react";
import styles from './RemovePlantModal.module.css'
import { useState } from 'react'
import { IPlant } from '@sep4/types'
import { deletePlant, getPlantById} from '../../../services/PlantService'

interface Props {
    onClose: () => void
    plantId: number
  }

export const RemovePlant: React.FC <Props> = ({ onClose, plantId }) => {
    const [plant, setPlant] = useState<IPlant>()

  useEffect(() => {
    getPlantById(plantId).then((res)=>{
        console.log(res)
        setPlant(res)
    })
      .catch((e) => {
        console.log(e)
      })
  }, [plantId])

    const deleteBtnClick = () => {deletePlant(plantId)}

  if(plant){
    return (
      <div className={styles.modalWrapperOuter}>
        <div className={styles.modalWrapper}>
          <p>Are you sure you want to delete <label className={styles.plantName}>{plant.nickName}</label> from your plants?</p>
          <div className={styles.plantWrapper}>
            <img src={plant.image} alt=""/>
            <div className={styles.plantInner}>
              <h3>{plant.nickName}</h3>
              <p>{plant.latinName}</p>
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={deleteBtnClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  else{
    return <></>
  }
  };
