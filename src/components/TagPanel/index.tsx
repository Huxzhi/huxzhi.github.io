/**
 * 标签面板组件 - 实时显示文章中的标签
 */

import * as React from 'jsx-dom'

export interface TagPanelProps {
  onChange?: (tags: string[]) => void
}

export const createTagPanel = (container: HTMLElement): TagPanelInstance => {
  const root = (
    <div class="tag-panel sticky top-[88px] p-4 rounded-lg max-h-[calc(100vh-120px)] overflow-y-auto">
      <div class="mb-3">
        <h3
          class="text-sm font-semibold mb-2"
          style="color: var(--color-title);"
        >
          文章标签
        </h3>
        <div
          class="text-xs mb-2"
          style="color: var(--color-t-l);"
        >
          使用 #标签 格式自动提取
        </div>
      </div>
      <div class="tags-list flex flex-wrap gap-2"></div>
    </div>
  ) as HTMLDivElement

  const tagsList = root.querySelector('.tags-list') as HTMLDivElement
  let currentTags: string[] = []

  const extractHashtags = (markdown: string): string[] => {
    // 移除代码块（```...```）和行内代码（`...`）
    const cleanMarkdown = markdown
      // 移除代码块
      .replace(/```[\s\S]*?```/g, '')
      // 移除行内代码
      .replace(/`[^`]+`/g, '')

    const tagRegex = /#([^\s#]+)/g
    const matches = cleanMarkdown.matchAll(tagRegex)
    const tags = new Set<string>()

    for (const match of matches) {
      const tag = match[1]

      // 添加完整标签
      tags.add(tag)
      // 如果是嵌套标签，也添加父标签
      if (tag.includes('/')) {
        const parts = tag.split('/')
        for (let i = 0; i < parts.length - 1; i++) {
          tags.add(parts.slice(0, i + 1).join('/'))
        }
      }
    }

    return Array.from(tags).sort()
  }

  const renderTags = (tags: string[]) => {
    tagsList.innerHTML = ''

    if (tags.length === 0) {
      tagsList.appendChild(
        <div
          class="text-sm"
          style="color: var(--color-t-l);"
        >
          暂无标签
        </div>,
      )
      return
    }

    // 简单嵌套显示
    tags.forEach((tag) => {
      const tagEl = (
        <div
          class="tag-item flex text-sm"
          style="color: var(--color-t-l);"
        >
          <span
            class="before:content-['#'] "
            style="before:color: var(--color-primary);"
          >
            {tag}
          </span>
        </div>
      )
      tagsList.appendChild(tagEl)
    })
  }

  const updateTags = (markdown: string) => {
    console.log('TagPanel update called, markdown length:', markdown?.length)
    const tags = extractHashtags(markdown)
    console.log('Extracted tags:', tags)
    currentTags = tags
    renderTags(tags)
  }

  container.appendChild(root)
  renderTags([])

  return {
    update: updateTags,
    getTags: () => currentTags,
  }
}

export interface TagPanelInstance {
  update: (markdown: string) => void
  getTags: () => string[]
}
