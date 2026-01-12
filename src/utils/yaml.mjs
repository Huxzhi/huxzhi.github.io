/**
 * 浏览器和 Node.js 兼容的 YAML frontmatter 解析器
 * 无需 Node.js Buffer 依赖，适用于浏览器和服务器环境
 */

export function parseYMAL(yamlContent) {
  const data = {}

  // Parse simple YAML (key: value pairs)
  yamlContent.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      // Parse arrays [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((v) => {
            v = v.trim()
            if (
              (v.startsWith('"') && v.endsWith('"')) ||
              (v.startsWith("'") && v.endsWith("'"))
            ) {
              return v.slice(1, -1)
            }
            return v
          })
      }
      // Parse boolean
      else if (value === 'true') value = true
      else if (value === 'false') value = false
      // Parse number
      else if (!isNaN(Number(value)) && value !== '') {
        value = Number(value)
      }
      data[key] = value
    }
  })

  return data
}

/**
 * 解析 Markdown 文件的 YAML frontmatter
 * @param {string} markdown 完整的 Markdown 内容
 * @returns {{ data: Record<string, any>, content: string }} 解析后的 frontmatter 数据和正文内容
 */

/**
 * 将对象转换为 YAML frontmatter 字符串
 * @param {Record<string, any>} data frontmatter 数据对象
 * @returns {string} YAML 格式的字符串
 */
export function stringifyFrontmatter(data) {
  const lines = ['---']

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      // Format arrays
      const items = value.map((v) => JSON.stringify(v)).join(', ')
      lines.push(`${key}: [${items}]`)
    } else if (typeof value === 'string') {
      // Quote strings
      lines.push(`${key}: ${JSON.stringify(value)}`)
    } else {
      // Numbers, booleans
      lines.push(`${key}: ${value}`)
    }
  })

  lines.push('---')
  return lines.join('\n')
}

/**
 * 将 frontmatter 数据和内容组合成完整的 Markdown
 * @param {Record<string, any>} data frontmatter 数据对象
 * @param {string} content Markdown 正文内容
 * @returns {string} 完整的 Markdown 字符串
 */
export function composeFrontmatter(data, content) {
  return `${stringifyFrontmatter(data)}\n\n${content}`
}
