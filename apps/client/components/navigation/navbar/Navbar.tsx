import React from "react";
import styles from "./Navbar.module.css";
import { NavItem } from "../navItem/NavItem";
import {MdDashboard, MdFormatListBulletedAdd, MdDeviceThermostat} from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
import { UserButton } from "../userButton/UserButton";
import { useState } from "react";
import { ManageAccount } from "../../account/accountComponent";

export const Navbar:React.FC = () => {
//this state is managing the visibility of the user button and the login and createAccount component
//it can be notLogin, wantToLogIn, login , wantToRegister
  const [userStatus, setUserStatus] = useState("notLogin");

  function logout(){
    localStorage.clear();}

  function userBtnClicked()
  {
    const token = localStorage.getItem("auth");
    if (token) {
      setUserStatus("notLogin");
    } else {
      document.body.style.opacity = "0.3";
      setUserStatus("wantToLogin")};
  }
     
      const handleAcountClicks = (btnType: string) => {
        {
          if (btnType=="wantToSignUpBtn")
          {
          setUserStatus("wantToSignUp")
          console.log("want to su")
          document.body.style.opacity = "0.3";
          document.getElementById('accountWrapper').style.opacity= "1";
        }
          else if (btnType=="wantToLoginBtn")
        {
        setUserStatus("wantToLogin")
        console.log("want to login")
        document.body.style.opacity = "0.3";
        document.getElementById("accountWrapper").style.opacity= "1";
    
        }
        else if (btnType=="closeBtn")
        {setUserStatus("notLogin")
        document.body.style.opacity = "1";
        console.log("want to close")}
      };
     
    };
          
  
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
      <UserButton userStatus={userStatus} onClick={userBtnClicked} onLogoutClick={logout}/>    
      <ManageAccount userStatus={userStatus} onClick={handleAcountClicks}/>
    </div>
  );
;}


