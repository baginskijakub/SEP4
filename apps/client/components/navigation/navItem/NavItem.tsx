import React from "react";
import styles from "./NavItem.module.css";
import Link from "next/link";

interface Props{
  path: string;
  children: React.ReactNode;
}

export const NavItem:React.FC<Props> = ({path, children}) => {

  return (
    <Link href={path} className={styles.link}>
      <div className={styles.navItem + " body"}>
        {children}
      </div>
    </Link>


  );
};
