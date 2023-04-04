import React from "react";
import {MdLogout} from "react-icons/md";
import styles from "./UserButton.module.css";

export const UserButton:React.FC = () => {
  return (
    <div className={styles.userButtonWrapper}>
      <h5>Username</h5><span className={styles.userButtonSeparator}/>
      <MdLogout size={20} color={'#B3B3B3'} />
    </div>
  );
};
