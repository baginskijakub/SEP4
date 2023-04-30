import React from "react";
import styles from "./ActionButton.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}
export const ActionButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {children}
    </button>
  );
};
