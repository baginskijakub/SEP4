export function formatDate(dateEpoch: number): string {
  const now = new Date()
  const dt = new Date(dateEpoch * 1000)
  if (isNaN(dt.getTime())) {
    return 'Invalid date'
  }
  if (dt.getTime() > now.getTime()) {
    return 'Invalid date'
  }
  const diff = now.getTime() - dt.getTime()

  if (diff < 86400000) {
    const hours = dt.getHours().toString().padStart(2, '0')
    const minutes = dt.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  } else {
    const day = dt.getDate().toString().padStart(2, '0')
    const month = (dt.getMonth() + 1).toString().padStart(2, '0') // getMonth() returns a zero-based index
    const year = dt.getFullYear()
    return `${day}/${month}/${year}`
  }
}
