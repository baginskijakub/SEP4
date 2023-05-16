import React, { useEffect, useState } from "react";
import { Navbar } from "../navigation/navbar/Navbar";
import { Breadcrumbs } from "../navigation/breadcrumbs/Breadcrumbs";
import styles from "./layouts.module.css";
import { NavbarMobile } from "../navigation/navbar/NavbarMobile";
import { Dialog } from "../utils/dialog/Dialog";

interface Props{
  children: React.ReactNode;
}


export const DefaultLayout:React.FC<Props> = ({children}) => {

  const [isDesktop, setDesktop] = useState(true)

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

  return (
    <div className={styles.defaultWrapper}>
      {isDesktop ? <Navbar /> : <NavbarMobile />}
      <div className={styles.defaultInner}>
        {isDesktop && <Breadcrumbs />}
        {children}
      </div>
      <Dialog />
    </div>
  );
};
