import React, { useState } from 'react'
import { PlantListed } from '../plantListed/PlantListed'
import styles from './PlantList.module.css'
import { IPlant } from '@sep4/types'
import { CreatePlant } from '../createPlant/CreatePlant'
import { MdKeyboardArrowUp } from 'react-icons/md'

interface Props {
  plants: IPlant[]
  changeSelectedPlant: (index: number) => void
  selectedIndex: number
  fetchAgain: () => void
}

export const PlantList: React.FC<Props> = ({ plants, changeSelectedPlant, selectedIndex, fetchAgain }) => {
  const [displayCreateModal, setDisplayCreateModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>Plants</h3>
        {window.innerWidth < 1150 && (
          <div className={styles.arrowContainer}>
            <MdKeyboardArrowUp
              size={30}
              style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.2s linear' }}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        )}
      </div>
      {(isOpen || window.innerWidth > 1150) && (
        <div className={styles.container}>
          {plants.map((plant, index) => {
            return (
              <PlantListed
                onClick={() => {
                  changeSelectedPlant(index)
                }}
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
          <div className={styles.addPlantButton} onClick={() => setDisplayCreateModal(true)}>
            Add plant
          </div>
        </div>
      )}
      {displayCreateModal && (
        <CreatePlant onClose={() => setDisplayCreateModal(false)} mode={'create'} fetchAgain={fetchAgain} />
      )}
    </div>
  )
}
