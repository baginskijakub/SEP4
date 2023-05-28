import React, { useEffect, useState } from 'react'
import styles from './PlantWrapper.module.css'
import { PlantHead } from '../plantHead/PlantHead'
import { PlantCurrentEnvironment } from '../plantCurrentEnvironment/PlantCurrentEnvironment'
import { PlantIdealEnvironment } from '../plantIdealEnvironment/PlantIdealEnvironment'
import { PlantPastEnvironment } from '../plantPastEnvironment/PlantPastEnvironment'
import { IPlant } from '@sep4/types'
import { getPlantById } from '../../../services/PlantService'
import { Loader } from "../../utils/loader/Loader";

interface Props {
  plantId: number
}

export const PlantWrapper: React.FC<Props> = ({ plantId }) => {
  const [plant, setPlant] = useState<IPlant>()

  useEffect(() => {
    getPlantById(plantId)
      .then((res) => {
        console.log('component', res)
        setPlant(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [plantId])

  return (
    <div className={styles.wrapper}>
      {plant ? (
        <>
          <PlantHead plant={plant} />
          <PlantCurrentEnvironment plant={plant} />
          <PlantIdealEnvironment environment={plant.idealEnvironment} />
          <PlantPastEnvironment id={plant.id} />
        </>
      ) : <Loader/>}
    </div>
  )
}
