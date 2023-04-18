import React from 'react'
import styles from './Navbar.module.css'
import { NavItem } from '../navItem/NavItem'
import { MdDashboard, MdFormatListBulletedAdd, MdDeviceThermostat } from 'react-icons/md'
import { RiPlantFill } from 'react-icons/ri'
import { UserButton } from '../userButton/UserButton'
import { useState } from 'react'
import { LoginModal } from '../../login/LoginModal'

export const Navbar: React.FC = () => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false)

  return (
    <div className={styles.navbarWrapper}>
      <h1 className={styles.title}>Plantify</h1>
      <div className={styles.navbarInner}>
        <NavItem path={'/'}>
          <MdDashboard size={20} color={'#5BA937'} />
          <p>Dashboard</p>
        </NavItem>
        <NavItem path={'/'}>
          <RiPlantFill size={20} color={'#5BA937'} />
          <p>Plants</p>
        </NavItem>
        <NavItem path={'/'}>
          <MdFormatListBulletedAdd size={20} color={'#5BA937'} />
          <p>Tasks</p>
        </NavItem>
        <NavItem path={'/'}>
          <MdDeviceThermostat size={20} color={'#5BA937'} />
          <p>Tasks</p>
        </NavItem>
      </div>
      <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
      {/*conditional rendering dependent on state*/}
      {displayLoginModal && <LoginModal onClose={() => setDisplayLoginModal(false)} />}
    </div>
  )
}
