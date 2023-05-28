import React, { useState, useEffect} from 'react'
import styles from './TaskModal.module.css'
import { ITask, IPlant } from '@sep4/types'
import { PrimaryButtonSmall } from "../../buttons/primaryButtonSmall/primaryButtonSmall"
import { SecondaryButtonSmall } from "../../buttons/secondaryButtonSmall/secondaryButtonSmall"
import { AutoComplete, SelectItem } from "../../utils/autoComplete/AutoComplete"
import { DateSelector } from "../../utils/datePicker/DateSelector"
import { createTask } from '../../../services/TaskService'
import { getAllPlants, getPlantById } from '../../../services/PlantService'
import { PlantHead } from '../../plant/plantHead/PlantHead'
import dayjs from 'dayjs'


interface Props {
    onClose: () => void
  fetchAgain: () => void
}


export const TaskModal: React.FC<Props> = ({onClose, fetchAgain}) => {

    const [selectedPlant, setSelectedPlant] = useState<IPlant>();
    const [selectedPlantId, setSelectedPlantId] = useState<number>()
    const [plants, setPlants] = useState<SelectItem[]>([]);
    const currentDate = dayjs()

    const [task, setTask] = useState<ITask>({
        id: 0,
        plantId: 0,
        type: 'water',
        status: 'current',
        date: currentDate.date() + '/' + (currentDate.month() + 1) + '/' + currentDate.year()
    })

    const handlePlantSelection = (value: number) => {
        setSelectedPlantId(value)
        setTask({...task, plantId: value})
    }

    //created task is saved in database
    const onSubmit = () =>
    {
        console.log(task)
        createTask(task)
        .then(()=>{
            setTask(task);
            onClose();
            fetchAgain();
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        if(selectedPlantId) {
            getPlantById(selectedPlantId).then((res) =>
            {
                setSelectedPlant(res)
            })
        }
    },[selectedPlantId])

    useEffect(() => {
        getAllPlants().then((res)=>
        {
            setPlants(res.map((plant) => {
                return {
                    label: plant.nickName,
                    value: plant.id
                }
            }))
        })
    })

    return (
    <div className={styles.taskWrapperOuter}>
      <div className={styles.taskWrapper}>
            <h2>Create task</h2>
        <div className={styles.taskContainer}>
            <div className={styles.plantInfoContainer}>
                <div className={styles.plantDropdownContainer}>
                    <h5>Select plant related to the task</h5>

                    {plants.length > 0 &&  <AutoComplete options={plants} onChange={handlePlantSelection} />}
                </div>
                <div className={styles.plantComponentContainer}>
                    {selectedPlant && <PlantHead plant={selectedPlant}/> }
                </div>
            </div>
            <div className={styles.selectionsContainer}>
                <div className={styles.dateSelectorContainer}>
                    <h5>Date</h5>
                    <DateSelector onChange={(value: string) => {
                        setTask({
                            ...task, date: value
                        })
                    }}/>
                </div>
                <div className={styles.typeSelectorContainer}>
                    <h5>Task type</h5>
                    <AutoComplete options={['water', 'fertilize', 'repot']} onChange={(value:"water" | "fertilize" | "repot") => setTask({...task, type: value})}/>
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
