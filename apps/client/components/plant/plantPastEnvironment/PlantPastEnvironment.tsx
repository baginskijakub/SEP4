import React, { useState } from "react";
import { Graph } from "../../graph/Graph";
import styles from "./PlantPastEnvironment.module.css";

interface Props {
  id: number;
}
export const PlantPastEnvironment:React.FC<Props> = ({id}) => {
  const [selectedType, setSelectedType] = useState<string>('temperature')

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h4>Past Environment</h4>
        {/*steal from tactix*/}
        <select name="humidity" id="" onChange={(e) => setSelectedType(e.target.value)}>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="co2">CO2</option>
        </select>
      </div>
      <Graph id={id} type={selectedType}/>
    </div>
  );
};
