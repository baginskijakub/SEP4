import React from "react";
import { PlantListed } from "../plantListed/PlantListed";
import styles from "./PlantList.module.css";

interface Props {
  onAddClick: () => void
}
export const PlantList:React.FC<Props> = ({onAddClick})=> {
  return (
    <div className={styles.wrapper}>
      <h3>Plants</h3>
      <div className={styles.container}>
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <PlantListed name={'plant'} latinName={'latin name'} id={1} url={'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='} />
        <div className={styles.addPlantButton} onClick={onAddClick}>Add plant</div>
      </div>

    </div>
  );
};
