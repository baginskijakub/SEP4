import React from 'react'
import { Test as TestButton } from '../components/Test'
import type { IPlant } from '@sep4/types';

export const Test:React.FC = () => {

  const plant:IPlant = {
    id: 1,
    name: 'Test',
    description: 'Test',
    image: 'Test',
    latinName: 'Test'
  }


  return (
    <div>
      <TestButton />
      {plant.name}
    </div>
  )
}

export default  Test;

