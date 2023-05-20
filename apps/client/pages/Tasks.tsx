import React, { useEffect, useState } from "react";
import styles from "./styles/Plants.module.css";
import { TaskOverview } from "../components/task/overview/TaskOverview";
import { ITask } from "@sep4/types";
import { useUserContext } from "../context/UserContext";
import { getAllTasksWithEpoch } from "../services/TaskService";

export const Tasks:React.FC = () => {
  const [tasks, setTasks] = React.useState<ITask[]>([])
  const {user} = useUserContext()

  // useEffect(() => {
  //   getAllTasksWithEpoch().then((res) => {
  //     setTasks(res)
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // }, [])

  // const fetchData = () => {
  //   getAllTasksWithEpoch().then((res) => {
  //     setTasks(res)
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // }

  return (
    <div className={styles.taskWrapper}>
      <h2>TaskList...</h2>
      {user && <TaskOverview />}
    </div>
  );
};

export default Tasks;

