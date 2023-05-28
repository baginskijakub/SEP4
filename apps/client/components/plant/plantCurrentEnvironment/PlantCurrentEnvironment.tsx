import React, { useEffect, useState } from 'react'
import styles from './PlantCurrentEnvironment.module.css'
import { IPlant, IPlantCurrentEnvironment } from '@sep4/types'
import { io } from 'socket.io-client'
import { SecondaryButtonSmall } from '../../buttons/secondaryButtonSmall/secondaryButtonSmall'
import { AdjustCurrentEnvironment } from '../adjustCurrentEnvironment/AdjustCurrentEnvironment'
import { SERVER_URL } from '../../../config'

interface Props {
  plant: IPlant
}

export const PlantCurrentEnvironment: React.FC<Props> = ({ plant }) => {
  const [environment, setEnvironment] = useState<IPlantCurrentEnvironment>({ ...plant.currentEnvironment })
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const serverUrl = SERVER_URL

  if(serverUrl){
    SERVER_URL.replace('/api/v1', '')
  }

  useEffect(() => {
    // we might need 'api' added to the url
    const socket = io(serverUrl)
    socket.emit('connectInit', plant.id)
    socket.on(`update-${plant.id}`, (data) => {
      setEnvironment(data)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h4>Current Environment</h4>
        <SecondaryButtonSmall onClick={() => setDisplayModal(true)}>
          <p className={'body-small'}>Adjust</p>
        </SecondaryButtonSmall>
      </div>

      <div className={styles.container}>
        <div className={styles.node}>
          <p className={'body-small'}>Temperature</p>
          <p className={styles.highlight + ' body-small'}>{environment.temperature}°C</p>
        </div>
        <div className={styles.node}>
          <p className={'body-small'}>Humidity</p>
          <p className={styles.highlight + ' body-small'}>{environment.humidity}</p>
        </div>
        <div className={styles.node}>
          <p className={'body-small'}>Environment</p>
          <p className={styles.highlight + ' body-small'}>{environment.co2}</p>
        </div>
      </div>
      {displayModal && (
        <AdjustCurrentEnvironment
          currentEnvironment={environment}
          idealEnvironment={plant.idealEnvironment}
          plantId={plant.id}
          onClose={() => setDisplayModal(false)}
        />
      )}
    </div>
  )
}
