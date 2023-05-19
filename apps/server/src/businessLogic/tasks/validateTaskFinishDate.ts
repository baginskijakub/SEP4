export function validateTaskFinishDate(dateString: string) {
  const matches = dateString.split('/')

  if (matches.length === 3) {
    const day = parseInt(matches[0], 10)
    if (day < 1 || day > 31) return null
    const month = parseInt(matches[1], 10) - 1 // Subtract 1 since months are zero-based
    if (month < 0 || month > 11) return null
    const year = parseInt(matches[2], 10)
    const date = new Date(year, month, day)

    if (isNaN(date.getTime())) return null

    return date
  } else {
    return null
  }
}
