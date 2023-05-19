import React from "react";
import styles from "./NavItem.module.css";
import Link from "next/link";

interface Props{
  path: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavItem:React.FC<Props> = ({path, children, onClick}) => {

  return (
    <Link href={path} className={styles.link} onClick={onClick}>
      <div className={styles.navItem + " body"}>
        {children}
      </div>
    </Link>


  );
};
