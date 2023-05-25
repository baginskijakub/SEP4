import { formatDate } from '../../businessLogic/plants/formatDate'

describe('Format date from epoch', () => {
  test('if epoch is not older than a day, a string in format hh:mm is returned', () => {
    // create epohc in seconds 4 hours before current date
    const now = Math.floor(Date.now() / 1000)
    const epoch = now - 14400
    const dateObj = new Date(epoch * 1000)
    const formattedDate = formatDate(epoch)
    expect(formattedDate).toEqual(expect.stringMatching(/\d{2}:\d{2}/))
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    expect(formattedDate).toEqual(formattedTime)
  })

  test('if epoch is  older than a day, a string in format dd:mm:yyyy is returned', () => {
    const epoch = 1618185600
    const formattedDate = formatDate(epoch)
    expect(formattedDate).toEqual('12/04/2021')
  })

  test('if epoch is in the future, a string "Invalid date" is returned', () => {
    const now = Math.floor(Date.now() / 1000)
    const epoch = now + 14400
    const formattedDate = formatDate(epoch)
    expect(formattedDate).toEqual('Invalid date')
  })

  test('if epoch is invalid epoch, a string "Invalid date" is returned', () => {
    const epoch = NaN
    const formattedDate = formatDate(epoch)
    expect(formattedDate).toEqual('Invalid date')
  })
})
