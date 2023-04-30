import React from 'react'
import styles from './primaryButtonSmall.module.css'

interface Props {
    onClick: () => void
    children: React.ReactNode
  }
  export const PrimaryButtonSmall: React.FC<Props> = ({ onClick, children }) => {
    return (
      <button className={styles.addButtonContainer} onClick={onClick}>
        {children}
      </button>
    )
  }