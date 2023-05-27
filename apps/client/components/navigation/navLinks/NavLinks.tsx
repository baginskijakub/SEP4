import React from 'react'
import styles from './NavLinks.module.css'
import { NavItem } from '../navItem/NavItem'
import { MdDashboard, MdFormatListBulletedAdd } from 'react-icons/md'
import { RiPlantFill } from 'react-icons/ri'

interface Props {
  closeNav?: () => void
}

export const NavLinks: React.FC<Props> = ({ closeNav }) => {

  return (
    <div className={styles.navbarInner}>
      <NavItem path={'/'} onClick={closeNav}>
        <MdDashboard size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Home</p>
      </NavItem>
      <NavItem path={'/Plants'} onClick={closeNav}>
        <RiPlantFill size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Plants</p>
      </NavItem>
      <NavItem path={'/Tasks'} onClick={closeNav}>
        <MdFormatListBulletedAdd size={20} color={'#5BA937'} />
        <p className={styles.navItem}>Tasks</p>
      </NavItem>
    </div>
  )
}
