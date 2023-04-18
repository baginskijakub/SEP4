import React from "react";
import styles from './RemovePlant.module.css'

export const RemovePlant: React.FC = () => {
    const deleteBtnClick = () => {console.log("delete")}
    const cancelBtnClick = () => {console.log("cancel")}

    return (
     <div className={styles.modalWrapperOuter}>
         <div className={styles.modalWrapper}>
             <p>Are you sure you want to delete <label className={styles.plantName}>PLANT</label> from your plants?</p>
             <div className={styles.plantWrapper}>
                 <img src='https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8=' alt=""/>
                 <div className={styles.plantInner}>
                    <h3>Daisy</h3>
                    <p>latin name</p>
                 </div>
             </div> 
          <div className={styles.btnWrapper}>
             <button className={styles.cancelBtn} onClick={cancelBtnClick}>
              Cancel
             </button>
             <button className={styles.deleteBtn} onClick={deleteBtnClick}>
              Delete
            </button>
          </div>
        </div>
    </div>
    );
  };