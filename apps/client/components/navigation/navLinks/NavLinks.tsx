import React, { useState } from 'react'
import styles from './NavLinks.module.css'
import { NavItem } from '../navItem/NavItem'
import { MdDashboard, MdFormatListBulletedAdd, MdDeviceThermostat } from 'react-icons/md'
import { RiPlantFill } from 'react-icons/ri'
import { UserButton } from '../userButton/UserButton'
import { LoginModal } from '../../login/LoginModal'

interface Props {
  closeNav?: () => void
}

export const NavLinks: React.FC<Props> = ({ closeNav }) => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false)

  return (
    <div className={styles.navbarInner}>
      <NavItem path={'/'} onClick={closeNav}>
        <MdDashboard size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Dashboard</p>
      </NavItem>
      <NavItem path={'/Plants'} onClick={closeNav}>
        <RiPlantFill size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Plants</p>
      </NavItem>
      <NavItem path={'/Tasks'} onClick={closeNav}>
        <MdFormatListBulletedAdd size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Tasks</p>
      </NavItem>
      <NavItem path={'/'} onClick={closeNav}>
        <MdDeviceThermostat size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Environment</p>
      </NavItem>

      <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
      {/*conditional rendering dependent on state*/}
      {displayLoginModal && <LoginModal onClose={() => setDisplayLoginModal(false)} />}
    </div>
  )
}
