import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

/**
 * 从 post.data 中获取创建时间
 */
export function getCreateTime(data: { created?: string | Date }): number {
  if (data.created) {
    if (data.created instanceof Date) {
      return data.created.getTime()
    }
    const parsed = new Date(data.created).getTime()
    if (!isNaN(parsed)) return parsed
  }
  return Date.now()
}

/**
 * 从 post.data 中获取更新时间
 */
export function getUpdateTime(data: {
  updated?: string | Date
  created?: string | Date
}): number {
  if (data.updated) {
    if (data.updated instanceof Date) {
      return data.updated.getTime()
    }
    const parsed = new Date(data.updated).getTime()
    if (!isNaN(parsed)) return parsed
  }
  return getCreateTime(data)
}

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
