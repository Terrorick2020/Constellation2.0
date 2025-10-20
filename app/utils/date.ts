export const getDayLabel = (timestamp: number): string => {
  const now = new Date()
  const msgDate = new Date(timestamp)

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  if (isSameDay(msgDate, now)) return 'Сегодня'

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (isSameDay(msgDate, yesterday)) return 'Вчера'

  return msgDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short'
  })
}

export const isSameDay = (ts1: number, ts2: number): boolean => {
  const d1 = new Date(ts1)
  const d2 = new Date(ts2)
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}