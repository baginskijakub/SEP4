import React from "react";
import { Task } from "../components/task/task/Task";
import { ITask } from "@sep4/types";

export const Tasks:React.FC = () => {
  const task: ITask = {
    id: 1,
    type: "water",
    date: "2021-05-05",
    plantId: 12,
    status: "future",
  }
  return (
    <div>
      <Task task={task} />
    </div>
  );
};

export default Tasks;
