/**
 * Markdown 和 JSON 格式互转工具
 */

interface JSONNode {
  type: string
  text?: string
  content?: JSONNode[]
  attrs?: Record<string, any>
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
}

/**
 * 将编辑器的 JSON 格式转换为 Markdown 文本
 */
export function jsonToMarkdown(json: JSONNode): string {
  if (!json || !json.content) return ''

  const lines: string[] = []

  const processNode = (node: JSONNode): string => {
    if (node.type === 'text') {
      let text = node.text || ''
      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`
              break
            case 'italic':
              text = `*${text}*`
              break
            case 'code':
              text = `\`${text}\``
              break
            case 'link':
              text = `[${text}](${mark.attrs?.href || ''})`
              break
            case 'strike':
              text = `~~${text}~~`
              break
          }
        })
      }
      return text
    }

    if (node.type === 'paragraph') {
      return (node.content || []).map(processNode).join('')
    }

    if (node.type === 'heading') {
      const level = (node.attrs?.level as number) || 1
      const text = (node.content || []).map(processNode).join('')
      return '#'.repeat(level) + ' ' + text
    }

    if (node.type === 'codeBlock') {
      const lang = (node.attrs?.language as string) || ''
      const code = (node.content || []).map((n) => n.text || '').join('\n')
      return '```' + lang + '\n' + code + '\n```'
    }

    if (node.type === 'bulletList') {
      return (node.content || [])
        .map((item) => {
          const text = (item.content || []).map(processNode).join('')
          return '- ' + text
        })
        .join('\n')
    }

    if (node.type === 'orderedList') {
      return (node.content || [])
        .map((item, index: number) => {
          const text = (item.content || []).map(processNode).join('')
          return `${index + 1}. ${text}`
        })
        .join('\n')
    }

    if (node.type === 'listItem') {
      return (node.content || []).map(processNode).join('')
    }

    if (node.type === 'blockquote') {
      return (node.content || [])
        .map((n) => {
          const text = processNode(n)
          return '> ' + text
        })
        .join('\n')
    }

    if (node.type === 'image') {
      const src = node.attrs?.src || ''
      const alt = node.attrs?.alt || ''
      return `![${alt}](${src})`
    }

    if (node.type === 'hardBreak') {
      return '  '
    }

    if (node.type === 'horizontalRule') {
      return '---'
    }

    // 处理任务列表
    if (node.type === 'taskList') {
      return (node.content || []).map((item) => processNode(item)).join('\n')
    }

    if (node.type === 'taskItem') {
      const checked = node.attrs?.checked
      const checkbox = checked ? '[x]' : '[ ]'
      const text = (node.content || []).map(processNode).join('')
      return `- ${checkbox} ${text}`
    }

    return ''
  }

  if (json.content) {
    json.content.forEach((node) => {
      const line = processNode(node)
      if (line) {
        lines.push(line)
      }
    })
  }

  return lines.join('\n\n')
}
