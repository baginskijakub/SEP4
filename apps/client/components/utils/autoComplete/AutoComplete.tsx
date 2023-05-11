import React, { useEffect, useState } from 'react';
import styles from './AutoComplete.module.css'

type SelectOptions = {
    label: string
    value: string
}

type SelectProps = {
    value?: SelectOptions
    onChange: (value: SelectOptions | undefined) => void
    options: SelectOptions[]
}


export function AutoComplete ({value, onChange, options} : SelectProps) 
{

  const [isOpen, setIsOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)

  function clearOptions() {
    onChange(undefined)
  }

  function selectOption(option: SelectOptions)
  {
    onChange(option)
  }

  function isOptionSelected(option: SelectOptions){
    return option == value
  }

  useEffect(()=> {
    if (isOpen) setHighlighted(0)
  }, [isOpen])

  return (
    <div 
        onBlur={() => setIsOpen(false)}
        onClick={()=> setIsOpen(prev => !prev)}
        tabIndex={0} 
        className={styles.container}
    >
      <span className={styles.value}>{value.label}</span>
      <button 
        className={styles.btn}
        onClick={e => {
            e.stopPropagation()
            clearOptions()
        }}
        ></button>
      <div className={styles.arrowDown}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
            <li 
                onClick={e => {
                    e.stopPropagation()
                    selectOption(option)
                    setIsOpen(false)
                }}
                onMouseEnter= {() => setHighlighted(index)}
                key={option.value} 
                className={`${styles.option} ${
                    isOptionSelected(option) ? styles.selected : ""
                } ${
                    index === highlighted ? styles.highlighted : " "
                }`}
            >
                {option.label}
            </li>
        ))}
      </ul>
    </div>
  );
}