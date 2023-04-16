import React from 'react'
import styles from './CancelButton.module.css'

interface Props {
    onClick: () => void
    children: React.ReactNode
  }
  export const CancelButton: React.FC<Props> = ({ onClick, children }) => {
    return (
      <button className={styles.cancelButtonContainer} onClick={onClick}>
        {children}
      </button>
    )
  }