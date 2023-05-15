import React, { useState, useEffect} from 'react'
import styles from './TaskModal.module.css'
import { ITask, IPlant } from '@sep4/types'
import { SecondaryButtonSmall } from 'apps/client/components/buttons/secondaryButtonSmall/secondaryButtonSmall'
import { PrimaryButtonSmall } from 'apps/client/components/buttons/primaryButtonSmall/primaryButtonSmall'
import { createTask, getTaskById } from 'apps/client/services/TaskService'
import { AutoComplete } from 'apps/client/components/utils/autoComplete/AutoComplete'
import { getAllPlants, getPlantById } from 'apps/client/services/PlantService'
import { PlantHead } from 'apps/client/components/plant/plantHead/PlantHead'
import { DateSelector } from 'apps/client/components/utils/datePicker/DateSelector'

interface Props {
    onClose: () => void
    taskId?: number
}


export const TaskModal: React.FC<Props> = ({onClose,taskId}) => {
  
    const [selectedPlant, setSelectedPlant] = useState<IPlant>();
    const [selectedPlantName, setSelectedPlantName] = useState<string>()

    const [task, setTask] = useState<ITask>({
        id: 0,
        plantId: 1,
        type: 'water',
        status: 'current',
        date: ""
    })

    const handlePlantSelection = (value: string) => {
        setSelectedPlantName(value)
        console.log(value)
    }

    const [taskType, setTaskType] = useState<string>('water')

    //created task is saved in database
    const onSubmit = () => 
    {
        createTask(task)
        .then(()=>{
            setTask(task);
            onClose();
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
       if(taskId || taskId == 0) {
            getTaskById(taskId).then((res) => {
                setTask(res)
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
       }

    })

    const onDateChange = () => {

    }

    return (
    <div className={styles.taskWrapperOuter}>
      <div className={styles.taskWrapper}>
            <h2>Create task</h2>
        <div className={styles.taskContainer}>
            <div className={styles.plantInfoContainer}>
                <div className={styles.plantDropdownContainer}>
                    <h5>Select plant related to the task</h5>
                    <AutoComplete options={['Daisy', 'Plantera', 'Cactus']} onChange={handlePlantSelection} />
                </div> 
                <div className={styles.plantComponentContainer}>

                    
                    {/* <PlantHead plant={plant} key={plant.id}/> */}
                    
    
                </div>
            </div>
            <div className={styles.selectionsContainer}>
                <div className={styles.dateSelectorContainer}>
                    <h5>Date</h5>
                    <DateSelector onChange={onDateChange}/>
                </div>
                <div className={styles.typeSelectorContainer}>
                    <h5>Task type</h5>
                    <AutoComplete options={['water', 'fertilize', 'repot']} onChange={(value:string) => setTaskType(value)}/>
                </div>
            </div>
        </div>
            <div className={styles.buttonsWrapper}>
                <SecondaryButtonSmall onClick={onClose}>Cancel</SecondaryButtonSmall>
                <PrimaryButtonSmall onClick={() => onSubmit()}>Create task</PrimaryButtonSmall>
            </div>
      </div>
    </div>
  )
}
