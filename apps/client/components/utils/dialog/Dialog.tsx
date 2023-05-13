import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { ITask } from "@sep4/types";
import { getCurrentTasks } from "../../../services/TaskService";
import { Task } from "../../task/task/Task";
import styles from './Dialog.module.css'
import { Transition } from "@headlessui/react";

export const Dialog:React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])

  const {user} = useUserContext()

  useEffect(() => {
    if(user !== null) {
      getCurrentTasks().then((res) => {
        console.log(user)
        setTasks(res)
        console.log(user)
      })

    }
  }, [user]);
  return (
    <div className={styles.wrapper}>
      <Transition
        show={tasks.length > 0}
      >
        <Transition.Child
          enter="transition-opacity ease-linear duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {tasks.map((task, index) => <Task task={task} controlls={true} key={index} />)}
        </Transition.Child>
      </Transition>

    </div>
  );
};
