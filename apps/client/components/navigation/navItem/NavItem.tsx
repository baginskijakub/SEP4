import React from "react";
import styles from "./NavItem.module.css";

interface Props{
  path: string;
  children: React.ReactNode;
}

export const NavItem:React.FC<Props> = ({path, children}) => {

  const redirect = () => {
    window.location.href = path;
  }

  return (
    <button onClick={redirect} className={styles.navItem + " body"}>
      {children}
    </button>
  );
};
