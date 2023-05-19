import React, { useState } from 'react';
import styles from './NavbarMobile.module.css'
import { MdDensityMedium, MdClear } from 'react-icons/md'
import { NavLinks } from '../navLinks/NavLinks';
import { UserButton } from '../userButton/UserButton';
import { LoginModal } from '../../login/LoginModal'

export const NavbarMobile: React.FC = () => {
    const [showFullNav, setShowFullNav] = useState(false)
    const [displayLoginModal, setDisplayLoginModal] = useState(false)

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.headerNav}>
                <h1 className={styles.title}>Plantify</h1>
                <button className={styles.navbar_close_btn}
                    onClick= {() => {setShowFullNav(!showFullNav)}}>
                    {showFullNav ? <MdClear /> : <MdDensityMedium />}
                </button>
            </div>
            {showFullNav && (
                <>
                    <NavLinks closeNav={() => setShowFullNav(false)} />
                    <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
                    {displayLoginModal && <LoginModal onClose={() => setDisplayLoginModal(false)} />}
                </>
            )}
        </div>
    )
}
