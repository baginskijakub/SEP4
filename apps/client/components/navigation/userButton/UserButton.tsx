import React from 'react'
import { MdLogout, MdAccountCircle, MdLogin } from 'react-icons/md'
import styles from './UserButton.module.css'
import { useUserContext } from '../../../context/UserContext'

interface Props {
  onClick: () => void
}

export const UserButton: React.FC<Props> = ({ onClick }) => {
  const {user} = useUserContext()
  return (
      <div className={styles.userButtonWrapper} onClick={onClick}>
      <div className={styles.nameIconWrapper}><MdAccountCircle size={20} color={'#5BA937'} />
        {  (user === null)? <h5 className={styles.userName}>Login</h5> : <h5 className={styles.userName}>{user.name}</h5>}</div>
        <span className={styles.userButtonSeparator} />
        {  (user === null)? <MdLogin size={20} color={'#5BA937'} /> :  <MdLogout size={20} color={'#5BA937'} />}
      </div>
    )
  }

