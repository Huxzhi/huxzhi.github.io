import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

export function formatSecond(timestamp: number): string {
  const date = dayjs(timestamp)
  const today = dayjs()

  // Early return for today
  if (date.isToday()) {
    return 'Today'
  }

  // Early return for yesterday
  if (date.isYesterday()) {
    return 'Yesterday'
  }

  const daysDiff = today.diff(date, 'day')

  // Within a week
  if (daysDiff < 7) {
    return daysDiff === 1 ? '1 Day ago' : `${daysDiff} Days ago`
  }

  // Same year - show month/day only
  if (today.year() === date.year()) {
    return date.format('MM/DD')
  }

  // Different year - show full date
  return date.format('YYYY/MM/DD')
}
