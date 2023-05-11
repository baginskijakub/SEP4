import React, { useState } from "react";
import { Graph } from "../../graph/Graph";
import styles from "./PlantPastEnvironment.module.css";
import { AutoComplete } from "../../utils/autoComplete/AutoComplete";

interface Props {
  id: number;
}
export const PlantPastEnvironment:React.FC<Props> = ({id}) => {
  const [selectedType, setSelectedType] = useState<string>('temperature')

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h4>Past Environment</h4>
        <AutoComplete options={["humidity", "co2", "temperature"]} onChange={(value: string) => setSelectedType(value)}/>
      </div>
      <Graph id={id} type={selectedType}/>
    </div>
  );
};
