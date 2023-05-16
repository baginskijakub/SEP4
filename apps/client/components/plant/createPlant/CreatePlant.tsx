import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import styles from './CreatePlant.module.css'
import {InputField} from '../../utils/inputField/InputField'
import { IPlant } from '@sep4/types'
import { SecondaryButtonSmall } from '../../buttons/secondaryButtonSmall/secondaryButtonSmall'
import { PrimaryButtonSmall } from '../../buttons/primaryButtonSmall/primaryButtonSmall'
import { addPlant, getPlantById, updatePlant } from '../../../services/PlantService'

interface Props {
    onClose: () => void
    mode: 'edit' | 'create'
    plantId?: number
    fetchAgain?: () => void
}

export const CreatePlant: React.FC<Props> = ({onClose, mode, plantId, fetchAgain}) => {

    const [plant, setPlant] = useState<IPlant>({
      name: "Plant name",
      nickName: "Nickname",
      latinName: "Latin name",
      id: 0,
      image: "https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8=",
      idealEnvironment: {
        minTemperature: 0,
        maxTemperature: 0,
        minCo2: 0,
        maxCo2: 0,
        minHumidity: 0,
        maxHumidity: 0
      }
    })

    const plantNickname = useRef<HTMLInputElement>()
    const plantName = useRef<HTMLInputElement>()
    const plantLatinName = useRef<HTMLInputElement>()
    const plantImage = useRef<HTMLInputElement>()
    const [errorLabel, setErrorLabel] = useState<string>('')

    const handleIdealEnvironment =(value: number, type: string)=>{
        setPlant({
            ...plant, idealEnvironment: {
                ...plant.idealEnvironment,
                [type]: value
            }
        })
    }

    useEffect(() => {
        console.log(plant)
    }, [plant])

    useEffect(() => {
        if(plantId || plantId == 0){
            getPlantById(plantId).then((res) => {
              setPlant(res)
              console.log(res)
              plantNickname.current.value = res.nickName
              plantName.current.value = res.name
              plantLatinName.current.value = res.latinName
              plantImage.current.value = res.image
            }).catch((e) => {
              console.log(e)
            })
        }
    })

    // onSubmit saves plant to the database
    const onSubmit = ( mode: 'edit' | 'create') => {

        if (!validateInputFields()) return

        if(mode === 'create'){
            addPlant({
                ...plant,
                nickName:plantNickname.current.value,
                name:plantName.current.value,
                latinName:plantLatinName.current.value,
                image: plantImage.current.value
            }).then(() => {
              fetchAgain();
              onClose();
            })
        }
        else {
            updatePlant({
                ...plant,
                nickName:plantNickname.current.value,
                name:plantName.current.value,
                latinName:plantLatinName.current.value,
                image: plantImage.current.value
            }).then(() => {
              fetchAgain()
              onClose();
            })
        }
    }

    const validateInputFields = () => {
        if (plantNickname.current.value === '' || plantNickname.current.value ===undefined||plantName.current.value === '' || plantName.current.value ===undefined||plantLatinName.current.value === '' || plantLatinName.current.value ===undefined||plantImage.current.value === '' || plantImage.current.value ===undefined)
        {
            setErrorLabel('Please fill in all the fields')
        }
        else
        {
            setErrorLabel('')
            return true;
        }
        return false;
    }

    return (
        <div className={styles.plantWrapperOuter}>
            <div className={styles.plantWrapper}>
                <div className={styles.plantContainerOuter}>
                    <div className={styles.plantContainer}>
                        <input className={styles.nicknameInput} ref={plantNickname} type="text" placeholder={plant.nickName} />

                        <input className={styles.secondaryInput} ref={plantName} type="text" placeholder={plant.name} />

                        <input className={styles.secondaryInput} ref={plantLatinName} type="text" placeholder={plant.latinName} />

                        <input className={styles.secondaryInput} ref={plantImage} type="text" placeholder={plant.image} />

                    </div>
                    <img
                        src={plant.image}
                        alt={plant.name}
                        width={100}
                        height={100}
                    />
                </div>
                <div className={styles.formWrapperOuter}>
                    <h5>Ideal environment</h5>
                    <div className={styles.formWrapper}>
                        <div className={styles.formRows}>
                            <div>
                                <InputField label={'Min temperature (°C)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'mintemp')}  placeholder={'50'}/>
                            </div>
                            <div>
                                 <InputField label={'Max temperature (°C)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'maxtemp')} placeholder={'200'}/>
                            </div>
                        </div>
                        <div className={styles.formRows}>
                             <div>
                                <InputField label={'Min humidity (%)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'minhum')} placeholder={'20'}/>
                            </div>
                            <div>
                                 <InputField label={'Max humidity (%)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'maxhum')} placeholder={'40'}/>
                            </div>
                        </div>
                        <div className={styles.formRows}>
                             <div>
                                <InputField label={'Min CO2 (g/m3)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'minco2')} placeholder={'10'}/>
                            </div>
                            <div>
                                 <InputField label={'Max CO2 (g/m3)'} type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'maxco2')} placeholder={'20'}/>
                            </div>
                        </div>
                    </div>
                </div>

                    <p className={styles.errorLabel}>{errorLabel}</p>

                <div className={styles.actionBtnContainer}>
                    <SecondaryButtonSmall onClick={onClose}><p>{mode === 'create' ? 'Cancel' : 'Discard changes'}</p></SecondaryButtonSmall>
                    <PrimaryButtonSmall onClick={() => onSubmit(mode)}><p>{mode === 'create' ? 'Add plant' : 'Apply changes'}</p></PrimaryButtonSmall>
                </div>
            </div>
        </div>
    )
}
