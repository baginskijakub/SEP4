import { mapToDatabaseTaskFormat } from '../../businessLogic/tasks/mapToDatabaseTaskFormat'
describe('Map to database task format', () => {
  test('Returns null if task is missing a date', () => {
    const task = {
      id: 1,
      plantId: 2,
      type: 'water' as 'water' | 'fertilize' | 'repot',
      status: 'future' as 'future' | 'current' | 'past',
    }
    expect(mapToDatabaseTaskFormat(task)).toBeNull()
  })

  test('Returns null if task has an invalid date or date in invalid format', () => {
    const task = {
      id: 1,
      plantId: 2,
      type: 'water' as 'water' | 'fertilize' | 'repot',
      status: 'future' as 'future' | 'current' | 'past',
      date: 'invalid date',
    }
    expect(mapToDatabaseTaskFormat(task)).toBeNull()

    task.date = '01-01-2021'
    expect(mapToDatabaseTaskFormat(task)).toBeNull()
  })

  test('Returns null if task deadline is before current date', () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const task = {
      id: 1,
      plantId: 2,
      type: 'water' as 'water' | 'fertilize' | 'repot',
      status: 'future' as 'future' | 'current' | 'past',
      date: dateString,
    }
    expect(mapToDatabaseTaskFormat(task)).toBeNull()
  })

  test('Returns proper task formatted for database in sunny scenario', () => {
    const date = new Date()
    date.setDate(date.getDate() + 8)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const task = {
      id: 1,
      plantId: 2,
      type: 'water' as 'water' | 'fertilize' | 'repot',
      status: 'future' as 'future' | 'current' | 'past',
      date: dateString,
    }
    expect(mapToDatabaseTaskFormat(task)).toMatchObject({
      id: 1,
      plantId: 2,
      type: 'water',
      daysTillDeadline: 8,
      originalDeadline: 8,
    })
  })
})
