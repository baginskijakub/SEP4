import { ITask } from '@sep4/types';

export interface Task {
  id: number;
  plantId: number;
  type: string;
  daysTillDeadline: number;
  originalDeadline: number;
}

export function taskConverter(taskToConvert: ITask): Task {
  const currentDate = new Date();
  const taskDate = taskToConvert.date ? new Date(taskToConvert.date) : currentDate;
  const timeDifference = taskDate.getTime() - currentDate.getTime();
  const daysTillDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
  return {
    id: taskToConvert.id,
    plantId: taskToConvert.plantId,
    type: taskToConvert.type,
    daysTillDeadline,
    originalDeadline: daysTillDeadline,
  };
}