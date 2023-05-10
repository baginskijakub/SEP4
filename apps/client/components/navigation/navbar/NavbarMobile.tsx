import React, { useState, useRef } from 'react';
import styles from './NavbarMobile.module.css'
import { NavItem } from '../navItem/NavItem'
import { MdDashboard, MdFormatListBulletedAdd, MdDeviceThermostat } from 'react-icons/md'
import { RiPlantFill } from 'react-icons/ri'
import { UserButton } from '../userButton/UserButton'
import { LoginModal } from '../../login/LoginModal'
import { FaBars, FaTimes } from "react-icons/fa";

export const NavbarMobile: React.FC = () => {
    const [displayLoginModal, setDisplayLoginModal] = useState(false)
    const [showFullNav, setShowFullNav] = useState(false)


    if (!showFullNav) {
        return (
            <div className={styles.navbarWrapper}>
                <div className={styles.headerNav}>
                    <h1 className={styles.title}>Plantify</h1>
                    <button className={styles.navbar_close_btn}
                        onClick= {() => {setShowFullNav(true)}}>
                        <FaBars />
                    </button> 
                </div> 
            </div>
        )
    }
    return (
        <div className={styles.fullNavbarWrapper}>
            <div className={styles.headerNav}>
                <h1 className={styles.title}>Plantify</h1>
                <button className={styles.navbar_close_btn}
                    onClick= {() => {setShowFullNav(false)}}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles.navbarInner}>
                <NavItem path={'/'}>
                    <MdDashboard size={30} color={'#5BA937'} />
                    <p className={styles.navItem} onClick={() => {setShowFullNav(false)}}>Dashboard</p>
                </NavItem>
                <NavItem path={'/Plants'}>
                    <RiPlantFill size={30} color={'#5BA937'} />
                    <p className={styles.navItem} onClick={() => {setShowFullNav(false)}}>Plants</p>
                </NavItem>
                <NavItem path={'/'}>
                    <MdFormatListBulletedAdd size={30} color={'#5BA937'} />
                    <p className={styles.navItem} onClick={() => {setShowFullNav(false)}}>Tasks</p>
                </NavItem>
                <NavItem path={'/'}>
                    <MdDeviceThermostat size={30} color={'#5BA937'} />
                    <p className={styles.navItem} onClick={() => {setShowFullNav(false)}}>Environment</p>
                </NavItem>
                <UserButton onClick={() => setDisplayLoginModal(!displayLoginModal)} />
                {/*conditional rendering dependent on state*/}
                {displayLoginModal && <LoginModal onClose={() => setDisplayLoginModal(false)} />}
            </div>
        </div>
    )
}