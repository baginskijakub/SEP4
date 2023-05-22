import React from 'react'

import { TaskList } from '../components/task/taskList/TaskList'
import { ITask } from '@sep4/types'

import { PlantsWatering } from "../components/task/plantsWatering/PlantsWatering";


export const Test:React.FC = () => {

  const tasks: ITask[] = [
    {
      id: 1,
      type: "water",
      date: "05/15/2023",
      plantId: 12,
      status: "past",
    },
    {
      id: 2,
      type: "repot",
      date: "05/15/2023",
      plantId: 12,
      status: "future",
    },
    {
      id: 3,
      type: "fertilize",
      date: "05/16/2023",
      plantId: 12,
      status: "current",
    },
  ]
    

  return (
    <div>
      <TaskList tasks={tasks}/>
      <PlantsWatering />
    </div>
  )
}

export default Test
