import { ITask } from '@sep4/types'

export function isValidTask(obj): obj is ITask {
  return (
    typeof obj === 'object' &&
    obj.id !== undefined &&
    obj.plantId !== undefined &&
    obj.type !== undefined &&
    obj.status !== undefined &&
    ['water', 'fertilize', 'repot'].includes(obj.type) &&
    !isNaN(obj.plantId) &&
    !isNaN(obj.id)
  )
}
