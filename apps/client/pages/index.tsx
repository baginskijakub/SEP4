import React from 'react'
import {PlantListed} from "../components/plant/plantListed/PlantListed";

export const Index: React.FC = () => {

  return (
    <div>
      <PlantListed name={"Test plant"} latinName={"latino americano"} id={12} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
    </div>
  )
}

export default Index
