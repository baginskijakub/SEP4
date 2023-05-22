import React from 'react'
import styles from './Navbar.module.css'
import { UserButton } from '../userButton/UserButton'
import { useState } from 'react'
import { LoginModal } from '../../login/LoginModal'
import { NavLinks } from '../navLinks/NavLinks';
import { useUserContext } from "../../../context/UserContext";

export const Navbar: React.FC = () => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false)
  const {user} = useUserContext()

  return (
    <div className={styles.navbarWrapper}>
      <h1 className={styles.title}>Plantify</h1>

      <NavLinks />
      <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
      {(displayLoginModal || user === null)&& <LoginModal onClose={() => setDisplayLoginModal(false)} />}
    </div>
  )
}
