import React from 'react'
import styles from './AddButton.module.css'

interface Props {
    onClick: () => void
    children: React.ReactNode
  }
  export const AddButton: React.FC<Props> = ({ onClick, children }) => {
    return (
      <button className={styles.addButtonContainer} onClick={onClick}>
        {children}
      </button>
    )
  }