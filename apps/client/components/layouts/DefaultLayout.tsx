import React from "react";
import { Navbar } from "../navigation/navbar/Navbar";
import { Breadcrumbs } from "../navigation/breadcrumbs/Breadcrumbs";
import styles from "./layouts.module.css";

interface Props{
  children: React.ReactNode;
}
export const DefaultLayout:React.FC<Props> = ({children}) => {
  return (
    <div className={styles.defaultWrapper}>
      <Navbar />
      <div className={styles.defaultInner}>
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
};
