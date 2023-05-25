import { validateTaskFinishDate } from '../../businessLogic/tasks/validateTaskFinishDate'
describe('Validate taskFinishDate', () => {
  test('validatePassword returns date object for valid dates', () => {
    expect(validateTaskFinishDate('21/05/2023')).toBeInstanceOf(Date)
    expect(validateTaskFinishDate('31/5/2023')).toBeInstanceOf(Date)
    expect(validateTaskFinishDate('1/01/2023')).toBeInstanceOf(Date)
    expect(validateTaskFinishDate('4/3/2022')).toBeInstanceOf(Date)
  })

  test('validatePassword returns null for invalid dates', () => {
    expect(validateTaskFinishDate('32/05/2023')).toBeNull()
    expect(validateTaskFinishDate('dadas')).toBeNull()
    expect(validateTaskFinishDate('21-04-2023')).toBeNull()
    expect(validateTaskFinishDate('3/-1/2023')).toBeNull()
  })
})
