import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

/**
 * 解析时间为时间戳
 * 支持新格式（created/updated 字符串）和旧格式（createTime/updateTime 数字）
 */
export function parseTime(
  timeStr?: string,
  fallbackTimestamp?: number,
): number {
  if (timeStr) {
    const parsed = new Date(timeStr).getTime()
    if (!isNaN(parsed)) return parsed
  }
  return fallbackTimestamp || Date.now()
}

/**
 * 从 post.data 中获取创建时间（兼容新旧格式）
 */
export function getCreateTime(data: {
  created?: string
  createTime?: number
}): number {
  return parseTime(data.created, data.createTime)
}

/**
 * 从 post.data 中获取更新时间（兼容新旧格式）
 */
export function getUpdateTime(data: {
  updated?: string
  updateTime?: number
  created?: string
  createTime?: number
}): number {
  return parseTime(
    data.updated,
    data.updateTime || parseTime(data.created, data.createTime),
  )
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
