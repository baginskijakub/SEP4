import React from 'react'
import { MdLogout } from 'react-icons/md'
import styles from './UserButton.module.css'
import { useUser } from '../../../context/UserContext'

interface Props {
  onClick: () => void
}

export const UserButton: React.FC<Props> = ({ onClick }) => {
  const user = useUser()
  if (user === null) {
    return (
      <div className={styles.userButtonWrapper} onClick={onClick}>
        <h5>Login</h5>
        <span className={styles.userButtonSeparator} />
        <MdLogout size={20} color={'#B3B3B3'} />
      </div>
    )
  } else {
    return (
      <div className={styles.userButtonWrapper} onClick={onClick}>
        <h5>Username </h5>
        <span className={styles.userButtonSeparator} />
        <MdLogout size={20} color={'#B3B3B3'} />
      </div>
    )
  }
}
