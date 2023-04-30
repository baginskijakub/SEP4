export function formatDate(dateEpoch: number): string {
  // i want to return a string telling me how many hours have passed since the dateEpoch, or if it's more than 24 hours, how many days have passed
  const date = new Date(dateEpoch)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) {
    return `${days} days ago`
  }
  if (hours > 0) {
    return `${hours} hours ago`
  }
  return 'less than hour ago'
}
