// Tag path separator
export const TAG_SEPARATOR = '/'
/**
 * Get all parent tags including the tag itself (Obsidian-style)
 * @example "前端/JavaScript/React" => ["前端", "前端/JavaScript", "前端/JavaScript/React"]
 */
export const getAllTagPaths = (tag) => {
  const parts = tag.split(TAG_SEPARATOR).filter(Boolean)
  const result = []
  for (let i = 1; i <= parts.length; i++) {
    result.push(parts.slice(0, i).join(TAG_SEPARATOR))
  }
  return result
}

/**
 * 把嵌套标签展平 (Obsidian-style)
 * Converts ["前端/JavaScript/React", "设计/UI"] to
 * ["前端", "前端/JavaScript", "前端/JavaScript/React", "设计", "设计/UI"]
 */
export const expandTags = (tags) => {
  if (!tags) return []
  const tagsArray = Array.isArray(tags) ? tags : Array.from(tags)
  const expanded = new Set()
  tagsArray.filter(Boolean).forEach((tag) => {
    getAllTagPaths(tag).forEach((path) => {
      if (path) expanded.add(path)
    })
  })
  return Array.from(expanded).sort()
}

/**
 * 从 body 提取出标签
 * @example extractTagsFromBody("文章内容 #前端/JavaScript #React") => ["前端/JavaScript", "React"]
 */
export const extractTagsFromBody = (body) => {
  const hashtagRegex = /#([a-zA-Z0-9_\u4e00-\u9fa5/]+)/g
  const tags = new Set()
  let match

  while ((match = hashtagRegex.exec(body)) !== null) {
    tags.add(match[1])
  }

  return expandTags(tags)
}
