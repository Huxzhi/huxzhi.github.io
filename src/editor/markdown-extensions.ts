import type { Extension, Range } from '@codemirror/state'
import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@codemirror/view'

/**
 * 创建图片预览插件
 */
export const imagePreview = (): Extension => {
  class ImageWidget extends WidgetType {
    constructor(readonly src: string, readonly alt: string) {
      super()
    }

    toDOM() {
      const wrap = document.createElement('span')
      wrap.className = 'cm-image-preview'
      const img = document.createElement('img')
      img.src = this.src
      img.alt = this.alt
      img.title = this.alt
      wrap.appendChild(img)
      return wrap
    }
  }

  const imagePreviewPlugin = ViewPlugin.fromClass(
    class {
      decorations: DecorationSet

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view)
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view)
        }
      }

      buildDecorations(view: EditorView): DecorationSet {
        const widgets: Range<Decoration>[] = []
        const doc = view.state.doc

        for (let i = 1; i <= doc.lines; i++) {
          const line = doc.line(i)
          const text = line.text

          // 匹配 Markdown 图片语法 ![alt](src)
          const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
          let match

          while ((match = imageRegex.exec(text)) !== null) {
            const alt = match[1]
            const src = match[2]
            const from = line.from + match.index + match[0].length

            widgets.push(
              Decoration.widget({
                widget: new ImageWidget(src, alt),
                side: 1,
              }).range(from),
            )
          }
        }

        return Decoration.set(widgets, true)
      }
    },
    {
      decorations: (v) => v.decorations,
    },
  )

  return imagePreviewPlugin
}

/**
 * 创建图片上传处理插件
 */
export const imageUploadHandler = (
  uploadFn: (file: File) => Promise<string>,
): Extension => {
  return EditorView.domEventHandlers({
    paste(event, view) {
      const items = event.clipboardData?.items
      if (!items) return false

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.indexOf('image') !== -1) {
          event.preventDefault()
          const file = item.getAsFile()
          if (file) {
            handleImageUpload(file, view, uploadFn)
          }
          return true
        }
      }
      return false
    },
    drop(event, view) {
      const files = event.dataTransfer?.files
      if (!files || files.length === 0) return false

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/'),
      )

      if (imageFiles.length > 0) {
        event.preventDefault()
        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY })
        if (pos !== null) {
          imageFiles.forEach((file) => {
            handleImageUpload(file, view, uploadFn, pos)
          })
        }
        return true
      }
      return false
    },
  })
}

async function handleImageUpload(
  file: File,
  view: EditorView,
  uploadFn: (file: File) => Promise<string>,
  pos?: number,
) {
  try {
    // 插入占位符
    const placeholder = `![Uploading ${file.name}...](uploading)`
    const insertPos = pos ?? view.state.selection.main.head

    view.dispatch({
      changes: { from: insertPos, insert: placeholder },
    })

    // 上传图片
    const url = await uploadFn(file)

    // 替换占位符
    const currentDoc = view.state.doc.toString()
    const placeholderIndex = currentDoc.indexOf(placeholder)

    if (placeholderIndex !== -1) {
      const markdown = `![${file.name}](${url})`
      view.dispatch({
        changes: {
          from: placeholderIndex,
          to: placeholderIndex + placeholder.length,
          insert: markdown,
        },
      })
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    // 移除占位符
    const currentDoc = view.state.doc.toString()
    const placeholder = `![Uploading ${file.name}...](uploading)`
    const placeholderIndex = currentDoc.indexOf(placeholder)

    if (placeholderIndex !== -1) {
      view.dispatch({
        changes: {
          from: placeholderIndex,
          to: placeholderIndex + placeholder.length,
          insert: '',
        },
      })
    }
  }
}

/**
 * 创建链接点击处理插件
 */
export const linkClickHandler = (): Extension => {
  return EditorView.domEventHandlers({
    click(event, _view) {
      const target = event.target as HTMLElement

      // 检查是否点击了链接
      if (target.tagName === 'A' && event.ctrlKey) {
        event.preventDefault()
        const href = target.getAttribute('href')
        if (href) {
          window.open(href, '_blank')
        }
        return true
      }

      return false
    },
  })
}

/**
 * Markdown 快捷键扩展
 */
export const markdownKeymap = (): Extension => {
  return EditorView.domEventHandlers({
    keydown(event, view) {
      // Ctrl+B: 加粗
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault()
        toggleMarkdown(view, '**')
        return true
      }

      // Ctrl+I: 斜体
      if (event.ctrlKey && event.key === 'i') {
        event.preventDefault()
        toggleMarkdown(view, '*')
        return true
      }

      // Ctrl+K: 插入链接
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        insertLink(view)
        return true
      }

      // Ctrl+`: 代码
      if (event.ctrlKey && event.key === '`') {
        event.preventDefault()
        toggleMarkdown(view, '`')
        return true
      }

      return false
    },
  })
}

function toggleMarkdown(view: EditorView, marker: string) {
  const { from, to } = view.state.selection.main
  const selectedText = view.state.sliceDoc(from, to)

  if (selectedText) {
    const wrappedText = `${marker}${selectedText}${marker}`
    view.dispatch({
      changes: { from, to, insert: wrappedText },
      selection: { anchor: from + marker.length, head: to + marker.length },
    })
  }
}

function insertLink(view: EditorView) {
  const { from, to } = view.state.selection.main
  const selectedText = view.state.sliceDoc(from, to)

  const linkText = selectedText || 'link text'
  const markdown = `[${linkText}](url)`

  view.dispatch({
    changes: { from, to, insert: markdown },
    selection: {
      anchor: from + markdown.length - 4,
      head: from + markdown.length - 1,
    },
  })
}
