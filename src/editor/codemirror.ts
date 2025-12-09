import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import {
  bracketMatching,
  defaultHighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import {
  highlightSelectionMatches,
  search,
  searchKeymap,
} from '@codemirror/search'
import { EditorState, type Extension } from '@codemirror/state'
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view'
import './codemirror.scss'
import {
  imagePreview,
  imageUploadHandler,
  linkClickHandler,
  markdownKeymap,
} from './markdown-extensions'

interface JSONNode {
  type: string
  content?: JSONNode[]
  attrs?: Record<string, unknown>
  text?: string
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>
}

export interface CodeMirrorEditor {
  view: EditorView
  getValue: () => string
  setValue: (value: string) => void
  destroy: () => void
  on: (event: 'update', callback: () => void) => void
  getJSON: () => JSONNode
  state: {
    doc: {
      content: Array<{
        type: { name: string }
        attrs?: { src?: string; alt?: string }
      }>
    }
  }
}

// 创建基础扩展
const createBasicExtensions = (): Extension[] => {
  return [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    history(),
    drawSelection(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    search(),
    highlightSelectionMatches(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...completionKeymap,
      ...lintKeymap,
      indentWithTab,
    ]),
  ]
}

// 创建 Markdown 扩展
const createMarkdownExtensions = (): Extension[] => {
  return [
    markdown({
      base: markdownLanguage,
      codeLanguages: [],
    }),
  ]
}

// 更新事件监听器
interface UpdateListener {
  callback: () => void
}

const updateListeners: UpdateListener[] = []

const createUpdateExtension = (): Extension => {
  return EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      updateListeners.forEach((listener) => listener.callback())
    }
  })
}

/**
 * 创建 CodeMirror 编辑器
 * @param parent 父元素
 * @param initialContent Markdown 内容或 JSON 字符串
 * @param uploadFn 图片上传函数
 * @returns CodeMirrorEditor 实例
 */
export const createEditor = (
  parent: HTMLElement,
  initialContent: string,
  uploadFn?: (file: File) => Promise<string>,
): CodeMirrorEditor => {
  const root = document.createElement('div')
  root.className = 'cm-root editable'
  parent?.appendChild(root)

  // 尝试解析 JSON 内容（兼容旧格式）
  let content = initialContent
  if (initialContent && initialContent.trim().startsWith('{')) {
    try {
      const json = JSON.parse(initialContent)
      content = jsonToMarkdown(json)
    } catch (_e) {
      // 如果不是 JSON，直接使用原内容
      content = initialContent
    }
  }

  const extensions = [
    ...createBasicExtensions(),
    ...createMarkdownExtensions(),
    createUpdateExtension(),
    EditorView.lineWrapping,
    imagePreview(),
    linkClickHandler(),
    markdownKeymap(),
  ]

  // 如果提供了上传函数，添加图片上传处理
  if (uploadFn) {
    extensions.push(imageUploadHandler(uploadFn))
  }

  const state = EditorState.create({
    doc: content,
    extensions,
  })

  const view = new EditorView({
    state,
    parent: root,
  })

  // 构建兼容的 state 对象
  const buildCompatibleState = () => {
    const markdown = view.state.doc.toString()
    const nodes: Array<{
      type: { name: string }
      attrs?: { src?: string; alt?: string }
    }> = []

    // 提取所有图片节点
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    let match
    while ((match = imageRegex.exec(markdown)) !== null) {
      nodes.push({
        type: { name: 'image' },
        attrs: {
          alt: match[1],
          src: match[2],
        },
      })
    }

    return {
      doc: {
        content: nodes,
      },
    }
  }

  return {
    view,
    getValue: () => view.state.doc.toString(),
    setValue: (value: string) => {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      })
    },
    destroy: () => {
      view.destroy()
      root.remove()
    },
    on: (event: 'update', callback: () => void) => {
      if (event === 'update') {
        updateListeners.push({ callback })
      }
    },
    getJSON: () => {
      // 返回符合旧格式的 JSON 对象
      return markdownToJson(view.state.doc.toString())
    },
    get state() {
      return buildCompatibleState()
    },
  }
}

/**
 * 将 JSON 格式转换为 Markdown
 */
function jsonToMarkdown(json: JSONNode): string {
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
      const code = (node.content || []).map((n) => n.text || '').join('')
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
      return '\n'
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

/**
 * 将 Markdown 转换为 JSON 格式（用于保存兼容性）
 */
function markdownToJson(markdown: string): JSONNode {
  const lines = markdown.split('\n')
  const content: JSONNode[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // 标题
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      content.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: [{ type: 'text', text: headingMatch[2] }],
      })
      i++
      continue
    }

    // 代码块
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      content.push({
        type: 'codeBlock',
        attrs: { language: lang },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      })
      i++
      continue
    }

    // 列表
    if (line.match(/^[-*]\s+/)) {
      const items: JSONNode[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        const text = lines[i].replace(/^[-*]\s+/, '')
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
        })
        i++
      }
      content.push({ type: 'bulletList', content: items })
      continue
    }

    // 有序列表
    if (line.match(/^\d+\.\s+/)) {
      const items: JSONNode[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        const text = lines[i].replace(/^\d+\.\s+/, '')
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
        })
        i++
      }
      content.push({ type: 'orderedList', content: items })
      continue
    }

    // 引用
    if (line.startsWith('> ')) {
      const quoteLines: JSONNode[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push({
          type: 'paragraph',
          content: [{ type: 'text', text: lines[i].slice(2) }],
        })
        i++
      }
      content.push({ type: 'blockquote', content: quoteLines })
      continue
    }

    // 图片
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (imageMatch) {
      content.push({
        type: 'image',
        attrs: { src: imageMatch[2], alt: imageMatch[1] },
      })
      i++
      continue
    }

    // 普通段落
    if (line.trim()) {
      // 处理行内格式
      const textContent = line
      const inlineNodes: JSONNode[] = []

      // 简单处理：直接作为文本节点
      inlineNodes.push({ type: 'text', text: textContent })

      content.push({
        type: 'paragraph',
        content: inlineNodes,
      })
    }

    i++
  }

  return {
    type: 'doc',
    content: content.length > 0 ? content : [{ type: 'paragraph' }],
  }
}
