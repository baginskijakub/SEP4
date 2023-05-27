import React, { useEffect, useState } from 'react'
import { Task } from '../task/Task'
import { TaskModal } from '../creation/TaskModal'
import styles from './TaskList.module.css'
import { ITask } from '@sep4/types'
import { PrimaryButtonBig } from '../../buttons/primaryButtonBig/PrimaryButtonBig'
import { getAllTasks } from '../../../services/TaskService'

export const TaskList: React.FC = () => {
  const [displayTaskModal, setDisplayTaskModal] = useState(false)

  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setTasks(res)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log('test')
  }, [])

  return (
    <div className={styles.taskWrapper}>
      <h3>Tasks</h3>
      <div className={styles.taskContainer}>
        {tasks?.map((task) => {
          return <Task task={task} key={task.id} controlls={false} />
        })}
        <PrimaryButtonBig onClick={() => setDisplayTaskModal(true)}>Add task</PrimaryButtonBig>
      </div>
      {displayTaskModal && <TaskModal onClose={() => setDisplayTaskModal(false)} />}
    </div>
  )
}
