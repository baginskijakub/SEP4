import React from 'react'
import { CreatePlant } from '../components/plant/createPlant/CreatePlant'

export const Test:React.FC = () => {


  return (
    <div>
      Test
      <CreatePlant onClose={function (): void {
        throw new Error('Function not implemented.')
      } } mode={'create'}/>
    </div>
  )
}

export default Test
