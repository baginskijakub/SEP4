import React, { useEffect, useState } from 'react'
import { IPlant, ITask } from '@sep4/types'
import { getPlantById } from '../../../services/PlantService'
import { ActionButton } from '../../buttons/actionButton/ActionButton'
import { MdClose } from 'react-icons/md'
import styles from './Task.module.css'

interface Props {
  task: ITask
  controlls?: boolean
}
export const Task: React.FC<Props> = ({ task , controlls}) => {
  const [plant, setPlant] = useState<IPlant>()

  useEffect(() => {
    getPlantById(task.plantId).then((res) => {
      setPlant(res)
    })
  }, [])

  const onClose = () => {
    console.log('close')
  }

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
              <button className={task.status === 'past' ? styles.buttonPast : styles.button} onClick={onClose}>Complete</button>
            </div>
          </div>
          { controlls && <div className={styles.controls}>
            <ActionButton onClick={onClose}>
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
