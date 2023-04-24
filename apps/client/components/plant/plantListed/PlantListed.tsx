import React, { useEffect } from "react";
import { useState } from 'react'
import { ActionButton } from "../../buttons/actionButton/ActionButton";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import styles from './PlantListed.module.css'
import { RemovePlant } from '../delete/RemovePlantModal';
import { CreatePlant } from "../createPlant/CreatePlant";

interface Props{
  name: string;
  latinName: string;
  id: number;
  url: string;
  isSelected?: boolean;
  onClick?: () => void
}

export const PlantListed:React.FC<Props> = ({name, latinName, url, id, onClick, isSelected}) => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
  const [displayEditModal, setDisplayEditModal] = useState(false)

  useEffect(()=>{
    console.log(displayDeleteModal)
  }, [displayDeleteModal])

  return (
    <div className={isSelected ? styles.plantWrapperSelected : styles.plantWrapper } onClick={onClick}>
      <img src={url} alt={name}/>
      <div className={styles.plantInner}>
        <h3>{name}</h3>
        <p>{latinName}</p>
      </div>
      <div className={styles.plantControls}>
        <ActionButton onClick={() => setDisplayEditModal(true)}>
          <MdOutlineEdit size={20}/>
        </ActionButton>
        <ActionButton onClick={() => setDisplayDeleteModal(true)}>
            <MdDeleteOutline size={20}/>
        </ActionButton>
      </div>
      {displayEditModal && <CreatePlant onClose={() => setDisplayEditModal(false)} mode={'edit'}/>}
      {displayDeleteModal && <RemovePlant onClose={() => setDisplayDeleteModal(false)} plantId={id} />}
    </div>
  )
}
