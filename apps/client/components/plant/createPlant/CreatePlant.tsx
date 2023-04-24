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
}

export const CreatePlant: React.FC<Props> = ({onClose, mode, plantId}) => {

    const [plant, setPlant] = useState<IPlant>({
        id: 1,
        name: 'plant1',
        nickName: 'plant nickname',
        latinName: 'latin name',
        image: 'image',
        idealEnvironment: {
        minTemperature: 20,
        maxTemperature: 50,
        minHumidity: 50,
        maxHumidity: 100,
        minCo2: 50,
        maxCo2: 70
    }
    }) 

    const plantNickname = useRef<HTMLInputElement>()
    const plantName = useRef<HTMLInputElement>()
    const plantLatinName = useRef<HTMLInputElement>()

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
            getPlantById(plantId).then(plant=>setPlant(plant))
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
                latinName:plantLatinName.current.value
            })
        }
        else {
            updatePlant({
                ...plant, 
                nickName:plantNickname.current.value, 
                name:plantName.current.value, 
                latinName:plantLatinName.current.value
            })
        }

    }

    const validateInputFields = () => {
        if (plantNickname.current.value === '' || plantNickname.current.value ===undefined||plantName.current.value === '' || plantName.current.value ===undefined||plantLatinName.current.value === '' || plantLatinName.current.value ===undefined)
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
                        <input className={styles.nicknameInput} ref={plantNickname} type="text" placeholder='Plant nickname' />
                        
                        <input className={styles.secondaryInput} ref={plantName} type="text" placeholder='Plant name' />
                        
                        <input className={styles.secondaryInput} ref={plantLatinName} type="text" placeholder='Latin name' /> 
                    </div>
                    <img  
                        src="https://cdn-ailom.nitrocdn.com/opKfgPWIFCjrldmbrdKJvIDPqBFvBPjr/assets/images/optimized/rev-546509e/wp-content/uploads/2022/05/Albuca-spiralis.jpg" 
                        alt="pipi" 
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
                                 <InputField label={'Max humidity (%)'}type={'number'} onChange={(e) => handleIdealEnvironment(parseInt(e.target.value), 'maxhum')} placeholder={'40'}/>
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