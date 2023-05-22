import React from "react";
import styles from "./PrimaryButtonBig.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}
export const PrimaryButtonBig:React.FC<Props> = ({children, onClick}) => {
  return (
    <button className={styles.container} onClick={onClick}>{children}</button>
  );
};
