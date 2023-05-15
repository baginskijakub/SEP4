import React from 'react'
import { TaskModal } from '../components/task/task/creation/TaskModal'


export const Test:React.FC = () => {


  return (
    <div>
      <TaskModal onClose={function (): void {
        throw new Error('Function not implemented.')
      } } plant={undefined}/>
    </div>
  )
}

export default Test
