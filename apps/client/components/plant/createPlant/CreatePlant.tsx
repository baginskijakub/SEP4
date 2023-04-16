import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import styles from './CreatePlant.module.css'
import {InputField} from '../../utils/inputField/InputField'
import { IPlantIdealEnvironment } from '@sep4/types'
import { CancelButton } from '../../buttons/plantButtons/cancelButton/CancelButton'
import { AddButton } from '../../buttons/plantButtons/AddOrEditButton/AddButton'

interface Props {
    onClose: () => void
}

export const CreatePlant: React.FC<Props> = ({onClose}) => {

    const plantNickname = useRef<HTMLInputElement>()
    const plantName = useRef<HTMLInputElement>()
    const plantLatinName = useRef<HTMLInputElement>()
    
    const [idealEnvironment, setIdealEnvironment ] = useState<IPlantIdealEnvironment>({
        maxtemp: 20,
        mintemp: 18,
        maxhum: 40,
        minhum: 30,
        maxco2: 60,
        minco2: 10
    })

    const handleIdealEnvironment =(value: number, type: string)=>{
        setIdealEnvironment({
            ...idealEnvironment, [type]: value
        })
    }

    useEffect(() => {
        console.log(idealEnvironment)
    }, [idealEnvironment]) 

    const onAdd = () => {
        console.log('Plant was added')
    }

    return (
        <div className={styles.plantWrapperOuter}>
            <div className={styles.plantWrapper}>
                <div className={styles.plantContainer}>
                    
                    <input className={styles.nicknameInput} ref={plantNickname} type="text" placeholder='Plant nickname' />
                    
                    <input className={styles.secondaryInput} ref={plantName} type="text" placeholder='Plant name' />
                    
                    <input className={styles.secondaryInput} ref={plantLatinName} type="text" placeholder='Latin name' />        
                    
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
                <div className={styles.actionBtnContainer}>
                    <CancelButton onClick={onClose}><p>Cancel</p></CancelButton>
                    <AddButton onClick={onAdd}><p>Add plant</p></AddButton>
                </div>
            </div>
        </div>
    )
}