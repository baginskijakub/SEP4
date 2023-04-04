import React from "react";
import styles from "./Navbar.module.css";
import { NavItem } from "../navItem/NavItem";
import {MdDashboard, MdFormatListBulletedAdd, MdDeviceThermostat} from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
import { UserButton } from "../userButton/UserButton";
export const Navbar:React.FC = () => {
  return (
    <div className={styles.navbarWrapper}>
      <h1>Plantify</h1>
      <div className={styles.navbarInner}>
        <NavItem path={'/'}>
          <MdDashboard size={20} color={'#B3B3B3'} />
          <p>Dashboard</p>
        </NavItem>
        <NavItem path={'/'}>
          <RiPlantFill size={20} color={'#B3B3B3'} />
          <p>Plants</p>
        </NavItem>
        <NavItem path={'/'}>
          <MdFormatListBulletedAdd size={20} color={'#B3B3B3'} />
          <p>Tasks</p>
        </NavItem>
        <NavItem path={'/'}>
          <MdDeviceThermostat size={20} color={'#B3B3B3'} />
          <p>Tasks</p>
        </NavItem>
      </div>
      <UserButton />
    </div>
  );
};
