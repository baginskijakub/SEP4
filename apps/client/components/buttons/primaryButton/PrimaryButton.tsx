import React from 'react'
import styles from './PrimaryButton.module.css'
interface Props {
  onClick: () => void
  children: React.ReactNode
}
export const PrimaryButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.primaryButtonContainer} onClick={onClick}>
      {children}
    </button>
  )
}
