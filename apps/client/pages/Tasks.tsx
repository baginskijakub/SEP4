import React from "react";

import { Task } from "../components/task/task/Task";
import { ITask } from "@sep4/types";
import { TaskList } from "../components/task/taskList/TaskList";
import styles from "./styles/Plants.module.css";

export const Tasks:React.FC = () => {
  const task: ITask[] = [{
    id: 1,
    type: "water",
    date: "2021-05-05",
    plantId: 12,
    status: "current",
  }]

  return (
    <div className={styles.pageWrapper}>
      <TaskList/>
      <div className={styles.pageInner}>
        <Task task={task[0]}/>
      </div>
    </div>
  );
};

export default Tasks;

