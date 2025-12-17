// manually pin posts
export const TAG_PIN = 'Pin'

// Tag path separator
export const TAG_SEPARATOR = '/'

/**
 * Parse hierarchical tag into parts
 * @example "前端/JavaScript" => ["前端", "JavaScript"]
 */
export const parseTagPath = (tag: string): string[] => {
  return tag.split(TAG_SEPARATOR).filter(Boolean)
}

/**
 * Get parent tag from a hierarchical tag
 * @example "前端/JavaScript/React" => "前端/JavaScript"
 */
export const getParentTag = (tag: string): string | null => {
  const parts = parseTagPath(tag)
  if (parts.length <= 1) return null
  return parts.slice(0, -1).join(TAG_SEPARATOR)
}

/**
 * Get tag name (last part of the path)
 * @example "前端/JavaScript" => "JavaScript"
 */
export const getTagName = (tag: string): string => {
  const parts = parseTagPath(tag)
  return parts[parts.length - 1] || tag
}

/**
 * Check if tag matches or is under a parent tag
 * @example matchesTag("前端/JavaScript", "前端") => true
 */
export const matchesTag = (tag: string, searchTag: string): boolean => {
  if (tag === searchTag) return true
  return tag.startsWith(searchTag + TAG_SEPARATOR)
}

/**
 * Get all parent tags including the tag itself (Obsidian-style)
 * @example "前端/JavaScript/React" => ["前端", "前端/JavaScript", "前端/JavaScript/React"]
 */
export const getAllTagPaths = (tag: string): string[] => {
  const parts = parseTagPath(tag)
  const result: string[] = []
  for (let i = 1; i <= parts.length; i++) {
    result.push(parts.slice(0, i).join(TAG_SEPARATOR))
  }
  return result
}

/**
 * Expand tags array to include all parent tags (Obsidian-style)
 * Converts ["前端/JavaScript/React", "设计/UI"] to
 * ["前端", "前端/JavaScript", "前端/JavaScript/React", "设计", "设计/UI"]
 */
export const expandTags = (tags: string[]): string[] => {
  const expanded = new Set<string>()
  tags.filter(Boolean).forEach((tag) => {
    getAllTagPaths(tag).forEach((path) => {
      if (path) expanded.add(path)
    })
  })
  return Array.from(expanded).sort()
}

/**
 * Get only the leaf tags (deepest level tags without children)
 * This is useful for getting the original tags before expansion
 */
export const getLeafTags = (tags: string[]): string[] => {
  const tagSet = new Set(tags)
  return tags.filter((tag) => {
    // Check if any other tag starts with this tag + separator
    return !tags.some(
      (other) => other !== tag && other.startsWith(tag + TAG_SEPARATOR),
    )
  })
}

export const sortByPin = <T extends { tags: string[]; updateTime: number }>(
  arr: T[],
) => {
  // 按照是否置顶排序，置顶的按照更新时间排序
  return arr.sort((a, b) => {
    const pinned = (v: typeof a) =>
      v.tags.includes(TAG_PIN) ? v.updateTime : -1
    const pinnedA = pinned(a)
    const pinnedB = pinned(b)
    return pinnedB - pinnedA
  })
}
