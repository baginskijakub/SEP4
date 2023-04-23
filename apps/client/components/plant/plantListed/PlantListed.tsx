import React from 'react'
import { useState } from 'react'
import { ActionButton } from "../../buttons/actionButton/ActionButton";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import styles from './PlantListed.module.css'
import { RemovePlant } from '../delete/RemovePlantModal';

interface Props{
  name: string;
  latinName: string;
  id: number;
  url: string;
}

export const PlantListed:React.FC<Props> = ({name, latinName, url, id}) => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false)

  return (
    <div className={styles.plantWrapper}>
      <img src={url} alt={name}/>
      <div className={styles.plantInner}>
        <h3>{name}</h3>
        <p>{latinName}</p>
      </div>
      <div className={styles.plantControls}>
        <ActionButton onClick={() => console.log("xdddd")}>
          <MdOutlineEdit size={20}/>
        </ActionButton>
        <ActionButton onClick={() => setDisplayDeleteModal(true)}>
            <MdDeleteOutline size={20}/>
        </ActionButton>
      </div>
      {displayDeleteModal && <RemovePlant onClose={() => setDisplayDeleteModal(false)} plantId={id} />}
    </div>
  )
}
