import React, { ChangeEventHandler } from 'react'
import styles from './InputField.module.css'

interface Props {
    label: string
    type: string
    onChange: ChangeEventHandler<HTMLInputElement>
    placeholder: string
}

export const InputField: React.FC<Props> = ({onChange, label, type, placeholder})=> {
  return (
    <div className={styles.wrapper}>
      <label className='body-small'>{label}</label>
      <input className={styles.input} type={type} onChange={onChange} placeholder={placeholder} aria-label={label}/>

    </div>
  )
}
