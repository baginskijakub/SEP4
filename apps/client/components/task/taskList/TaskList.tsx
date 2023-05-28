import React, { useEffect, useState } from 'react'
import { Task } from '../task/Task'
import { TaskModal } from '../creation/TaskModal'
import styles from './TaskList.module.css'
import { ITask } from '@sep4/types'
import { PrimaryButtonBig } from '../../buttons/primaryButtonBig/PrimaryButtonBig'
import { getAllTasks } from '../../../services/TaskService'
import { Loader } from "../../utils/loader/Loader";

export const TaskList: React.FC = () => {
  const [displayTaskModal, setDisplayTaskModal] = useState(false)

  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
      fetchTasks()
  }, [])

  const fetchTasks = () => {
    getAllTasks()
      .then((res) => {
        setTasks(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.taskWrapper}>
      <h3>Tasks</h3>
      <div className={styles.taskContainer}>
        {tasks.length > 0 ? tasks?.map((task) => {
          return <Task task={task} key={task.id} controlls={false} />
        }) : <Loader/>}
        <PrimaryButtonBig onClick={() => setDisplayTaskModal(true)}>Add task</PrimaryButtonBig>
      </div>
      {displayTaskModal && <TaskModal onClose={() => setDisplayTaskModal(false)} fetchAgain={fetchTasks} />}
    </div>
  )
}
