import React from 'react'
import styles from './Loader.module.css'
export const Loader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <span />
      </div>
    </div>
  )
}
