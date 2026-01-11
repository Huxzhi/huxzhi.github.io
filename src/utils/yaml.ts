/**
 * 浏览器兼容的 YAML frontmatter 解析器
 * 无需 Node.js Buffer 依赖，适用于浏览器环境
 */

export interface ParsedFrontmatter {
  data: Record<string, any>
  content: string
}

/**
 * 解析 Markdown 文件的 YAML frontmatter
 * @param markdown 完整的 Markdown 内容
 * @returns 解析后的 frontmatter 数据和正文内容
 *
 * @example
 * ```typescript
 * const markdown = `---
 * title: "Hello World"
 * tags: ["typescript", "astro"]
 * draft: false
 * ---
 *
 * # Content here
 * `
 *
 * const { data, content } = parseFrontmatter(markdown)
 * console.log(data.title) // "Hello World"
 * console.log(data.tags) // ["typescript", "astro"]
 * ```
 */
export type FrontmatterHook = (markdown: string) => string

let frontmatterHook: FrontmatterHook | undefined

export function setFrontmatterHook(fn: FrontmatterHook | undefined) {
  frontmatterHook = fn
}

function defaultTitleHook(markdown: string): string {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  // Try to extract a title from the first heading in the body
  const extractTitleFromBody = (body: string) => {
    const headingMatch = body.match(/^#\s+(.+)$/m)
    if (headingMatch) return headingMatch[1].trim()
    return 'Untitled'
  }

  if (!match) {
    // No frontmatter at all -> create one with title from first heading (or 'Untitled')
    const title = extractTitleFromBody(markdown)
    return `---\ntitle: ${JSON.stringify(title)}\n---\n\n${markdown}`
  }

  const [, yamlContent, body] = match

  // If title already exists, return original
  if (/^\s*title\s*:/m.test(yamlContent)) return markdown

  // Otherwise insert title into YAML
  const title = extractTitleFromBody(body)
  const newYaml = `title: ${JSON.stringify(title)}\n${yamlContent}`
  return markdown.replace(frontmatterRegex, `---\n${newYaml}\n---\n${body}`)
}

export function parseFrontmatter(markdown: string): ParsedFrontmatter {
  // Apply hook (default to auto-fill title) if provided
  if (frontmatterHook) {
    markdown = frontmatterHook(markdown)
  } else {
    // Use default behavior to auto-fill title
    markdown = defaultTitleHook(markdown)
  }

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: markdown }
  }

  const [, yamlContent, body] = match
  const data: Record<string, any> = {}

  // Parse simple YAML (key: value pairs)
  yamlContent.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value: any = line.slice(colonIndex + 1).trim()

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
          .map((v: string) => {
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

  return { data, content: body }
}

/**
 * 将对象转换为 YAML frontmatter 字符串
 * @param data frontmatter 数据对象
 * @returns YAML 格式的字符串
 *
 * @example
 * ```typescript
 * const yaml = stringifyFrontmatter({
 *   title: "Hello World",
 *   tags: ["typescript", "astro"],
 *   draft: false
 * })
 * console.log(yaml)
 * // ---
 * // title: "Hello World"
 * // tags: ["typescript", "astro"]
 * // draft: false
 * // ---
 * ```
 */
export function stringifyFrontmatter(data: Record<string, any>): string {
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
 * @param data frontmatter 数据对象
 * @param content Markdown 正文内容
 * @returns 完整的 Markdown 字符串
 *
 * @example
 * ```typescript
 * const markdown = composeFrontmatter(
 *   { title: "Hello", draft: false },
 *   "# Content here"
 * )
 * ```
 */
export function composeFrontmatter(
  data: Record<string, any>,
  content: string,
): string {
  return `${stringifyFrontmatter(data)}\n\n${content}`
}
