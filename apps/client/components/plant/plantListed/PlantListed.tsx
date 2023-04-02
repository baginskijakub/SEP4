import React from 'react'
import { ActionButton } from "../../buttons/actionButton/ActionButton";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import styles from './PlantListed.module.css'

interface Props{
  name: string;
  latinName: string;
  id: number;
  url: string;
}

export const PlantListed:React.FC<Props> = ({name, latinName, url, id}) => {

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
        <ActionButton onClick={() => console.log("xdddd")}>
            <MdDeleteOutline size={20}/>
        </ActionButton>
      </div>
    </div>
  )
}
