import React from "react";
import styles from "./ActionButton.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  danger?: boolean;
}
export const ActionButton: React.FC<Props> = ({ onClick, children , danger}) => {
  return (
    <button className={danger ? styles.danger : styles.actionButton} onClick={onClick}>
      {children}
    </button>
  );
};
