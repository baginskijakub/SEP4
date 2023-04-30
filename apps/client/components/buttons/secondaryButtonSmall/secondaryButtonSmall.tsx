import React from 'react'
import styles from './secondaryButtonSmall.module.css'

interface Props {
    onClick: () => void
    children: React.ReactNode
  }
  export const SecondaryButtonSmall: React.FC<Props> = ({ onClick, children }) => {
    return (
      <button className={styles.cancelButtonContainer} onClick={onClick}>
        {children}
      </button>
    )
  }