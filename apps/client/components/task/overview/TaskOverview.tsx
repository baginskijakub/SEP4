import React, { useEffect, useState } from 'react'
import { Day, Node } from './Node'
import styles from './TaskOverview.module.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import dayjs from 'dayjs'
import { ITask } from '@sep4/types'
import { getAllTasksWithEpoch } from '../../../services/TaskService'

export const TaskOverview: React.FC = () => {
  const [days, setDays] = useState<Day[]>()
  const [daysOffset, setDaysOffset] = useState(0)
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    getAllTasksWithEpoch()
      .then((tasks) => setTasks(tasks))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const days: Day[] = []
    for (let i = daysOffset; i < daysOffset + 7; i++) {
      const day = dayjs().add(i, 'day')
      days.push({
        day: day.format('ddd'),
        dayNumber: day.date(),
        hasTask: tasks.some((task) => {
          return dayjs.unix(parseInt(task.date)).isSame(day, 'day')
        }),
      })
    }
    setDays(days)
    console.log(days)
  }, [daysOffset])

  return (
    <div className={styles.wrapper}>
      <h3>Task Overview</h3>
      <div className={styles.nodeContainer}>
        <MdChevronLeft
          size={40}
          color={'#528E83'}
          className={styles.chevron}
          onClick={() => setDaysOffset(daysOffset - 1)}
        />
        {days?.map((day, index) => (
          <Node key={index} {...day} />
        ))}
        <MdChevronRight
          size={40}
          color={'#528E83'}
          className={styles.chevron}
          onClick={() => setDaysOffset(daysOffset + 1)}
        />
      </div>
    </div>
  )
}
