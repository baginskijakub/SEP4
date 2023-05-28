import React from "react";
import { TaskList } from "../components/task/taskList/TaskList";
import styles from "./styles/Tasks.module.css";
import { useUserContext } from "../context/UserContext";
import { TaskOverview } from "../components/task/overview/TaskOverview";
import { PlantsWatering } from "../components/task/plantsWatering/PlantsWatering";

export const Tasks:React.FC = () => {
  const {user} = useUserContext()

  return (
    <div className={styles.pageWrapper}>
      {user && <TaskList/>}
      <div className={styles.pageInner}>
        {user && <TaskOverview/>}
        {user && <PlantsWatering/>}
      </div>
    </div>
  );
};

export default Tasks;

