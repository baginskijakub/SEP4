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
    return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else {
    return dt.toLocaleDateString()
  }
}
