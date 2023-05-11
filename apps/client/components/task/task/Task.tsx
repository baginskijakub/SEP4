import React, { useEffect, useState } from 'react'
import { IPlant, ITask } from '@sep4/types'
import { getPlantById } from '../../../services/PlantService'
import { ActionButton } from '../../buttons/actionButton/ActionButton'
import { MdClose } from 'react-icons/md'
import styles from './Task.module.css'
import { completeTask } from "../../../services/TaskService";

interface Props {
  task: ITask
  controlls?: boolean
}
export const Task: React.FC<Props> = ({ task , controlls}) => {
  const [plant, setPlant] = useState<IPlant>()
  const [display, setDisplay] = useState<boolean>(true)

  useEffect(() => {
    getPlantById(task.plantId).then((res) => {
      setPlant(res)
    })
  }, [])
  const onComplete = () => {
    completeTask(task.id).then(() => {
      console.log('completed')
    })
  }

  if (!display) return <></>

  return (
    <>
      {plant !== undefined ? (
        <div className={styles.wrapper + " " + styles[task.status]}>
          <img src={plant.image} alt={plant.name} />
          <div className={styles.container}>
            <div className={styles.inner}>
              <h4>
                {task.type[0].toUpperCase().concat(task.type.slice(1))} {plant.nickName}
              </h4>
              <p className={'body'}>{plant.name}</p>
            </div>
            <div className={styles.bottom}>
              <p>{task.date}</p>
              {task.status !== 'future' && <button className={task.status === 'past' ? styles.buttonPast : styles.button} onClick={onComplete}>Complete</button>}
            </div>
          </div>
          { controlls && <div className={styles.controls}>
            <ActionButton onClick={() => setDisplay(false)} danger={task.status === "past"}>
              <MdClose size={20} />
            </ActionButton>
          </div>}
        </div>
      ) : (
        <div className={styles.wrapper}>Loading</div>
      )}
    </>
  )
}