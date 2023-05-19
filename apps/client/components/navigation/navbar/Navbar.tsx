import React from 'react'
import styles from './Navbar.module.css'
import { UserButton } from '../userButton/UserButton'
import { useState } from 'react'
import { LoginModal } from '../../login/LoginModal'
import { NavLinks } from '../navLinks/NavLinks';

export const Navbar: React.FC = () => {
  const [displayLoginModal, setDisplayLoginModal] = useState(false)

  return (
    <div className={styles.navbarWrapper}>
      <h1 className={styles.title}>Plantify</h1>
      
      <NavLinks />
      <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
      {displayLoginModal && <LoginModal onClose={() => setDisplayLoginModal(false)} />}
    </div>
  )
}
