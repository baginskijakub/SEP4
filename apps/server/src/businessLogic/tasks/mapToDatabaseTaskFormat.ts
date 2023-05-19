import { ITask } from '@sep4/types'
import { validateTaskFinishDate } from './validateTaskFinishDate'

export function mapToDatabaseTaskFormat(taskToConvert: ITask) {
  if (!taskToConvert.date) return null
  const deadline = validateTaskFinishDate(taskToConvert.date)
  console.log(deadline)
  if (deadline === null) return null
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)

  const timeDifference = deadline.getTime() - currentDate.getTime()
  if (timeDifference < 0) return null
  const daysTillDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24))

  return {
    id: taskToConvert.id,
    plantId: taskToConvert.plantId,
    type: taskToConvert.type,
    daysTillDeadline,
    originalDeadline: daysTillDeadline,
  }
}
