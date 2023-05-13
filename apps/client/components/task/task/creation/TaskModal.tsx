import React, { useState, useEffect} from 'react'
import styles from './TaskModal.module.css'
import { ITask, IPlant } from '@sep4/types'
import { SecondaryButtonSmall } from 'apps/client/components/buttons/secondaryButtonSmall/secondaryButtonSmall'
import { PrimaryButtonSmall } from 'apps/client/components/buttons/primaryButtonSmall/primaryButtonSmall'
import { createTask } from 'apps/client/services/TaskService'
import { AutoComplete } from 'apps/client/components/utils/autoComplete/AutoComplete'

interface Props {
    onClose: () => void
    plant: IPlant
}

interface DisplayPlantInfo {
    name: string;
    latinName: string;
}


export const TaskModal: React.FC<Props> = ({onClose, plant}) => {
  
    const [selectedPlant, setSelectedPlant] = useState<DisplayPlantInfo>({
        name: plant.nickName,
        latinName: plant.latinName
    })

    const [task, setTask] = useState<ITask>({
        id: 0,
        plantId: plant.id,
        type: 'water',
        status: 'current',
        date: ""
    })

    const [taskType, setTaskType] = useState<string>('water')

    const [date, setDate] = useState("")
    

    return (
    <div>
      
    </div>
  )
}
