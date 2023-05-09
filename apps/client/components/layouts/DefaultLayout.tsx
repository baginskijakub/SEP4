import React, { useEffect, useState } from "react";
import { Navbar } from "../navigation/navbar/Navbar";
import { Breadcrumbs } from "../navigation/breadcrumbs/Breadcrumbs";
import styles from "./layouts.module.css";
import { NavbarMobile } from "../navigation/navbar/NavbarMobile";

interface Props{
  children: React.ReactNode;
}


export const DefaultLayout:React.FC<Props> = ({children}) => {

  const [isDesktop, setDesktop] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })
  
  const updateMedia = () => {
    if (window.innerWidth > 800) {
      setDesktop(true)
    } else {
      setDesktop(false)
    }
  }


  if (isDesktop) {
    return (
      <div className={styles.defaultWrapper}> 
          <Navbar /> 
        <div className={styles.defaultInner}>
          <Breadcrumbs />
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.mobileWrapper}> 
        <NavbarMobile /> 
        <div className={styles.mobileInner}>
          <Breadcrumbs />
          {children}
        </div>
      </div>
    );
  }
};
