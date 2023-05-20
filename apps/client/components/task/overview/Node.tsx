import React from "react";
import styles from "./TaskOverview.module.css";

export interface Day{
  day: string;
  dayNumber: number;
  hasTask: boolean;
}
export const Node:React.FC<Day> = ({day, dayNumber, hasTask}) => {
  return (
    <div className={styles.node}>
        {hasTask && <span className={styles.taskIndicator}></span>}
        <p>{dayNumber}</p>
        <h4>{day}</h4>
    </div>
  );
};
