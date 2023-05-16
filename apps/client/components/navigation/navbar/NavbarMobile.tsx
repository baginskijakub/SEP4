import React, { useState } from 'react';
import styles from './NavbarMobile.module.css'
import { MdDensityMedium, MdClear } from 'react-icons/md'
import { NavLinks } from '../navLinks/NavLinks';

export const NavbarMobile: React.FC = () => {
    const [showFullNav, setShowFullNav] = useState(false)

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.headerNav}>
                <h1 className={styles.title}>Plantify</h1>
                <button className={styles.navbar_close_btn}
                    onClick= {() => {setShowFullNav(!showFullNav)}}>
                    {showFullNav ? <MdClear /> : <MdDensityMedium />}
                </button>
            </div>
            {showFullNav && <NavLinks />}
        </div>
    )
}
