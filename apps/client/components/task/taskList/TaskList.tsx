import React, { useState } from 'react'
import { Task } from '../task/Task'
import { TaskModal } from '../creation/TaskModal'
import styles from './TaskList.module.css'
import { ITask } from '@sep4/types'

interface Props{
    tasks: ITask[]
}

export const TaskList: React.FC<Props> = ({tasks}) => {

    const [displayTaskModal, setDisplayTaskModal] = useState(false)

    return (
    <div className={styles.taskWrapper}>
        <h3>Tasks</h3>
        <div className={styles.taskContainer}>
            {tasks?.map((task) => {
                return(
                    <Task
                    task={task}
                    key={task.id} />
                )
            })}

            <div className={styles.addTaskButton} onClick={() => setDisplayTaskModal(true)}> Add task</div>
        </div>
        {displayTaskModal && <TaskModal onClose={() => setDisplayTaskModal(false)}/>}
    </div>
  )
}
