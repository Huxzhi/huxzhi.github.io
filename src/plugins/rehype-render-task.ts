import type { Element, ElementContent, Root } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Rehype plugin to render custom taskItem nodes with metadata support
 */
export default function rehypeRenderTask() {
  return function transformer(tree: Root) {
    visit(tree, 'element', (node: Element) => {
      // 查找带有 data-task-item 标记的 li 元素
      if (
        node.tagName === 'li' &&
        node.properties?.['data-task-item'] === 'true'
      ) {
        console.log('Found custom task item in rehype!')
        const status = node.properties['data-status'] as string
        const completed = node.properties['data-completed'] === 'true'
        const visual = node.properties['data-visual'] as string
        const metadataStr = node.properties['data-metadata'] as string
        const metadata = metadataStr ? JSON.parse(metadataStr) : []

        console.log('Task details:', { status, completed, visual, metadata })

        // 设置自定义类
        node.properties.className = ['task-item', `task-status-${status}`]
        if (completed) {
          node.properties.className.push('task-completed')
        }

        // 清理 data 属性（可选）
        delete node.properties['data-task-item']
        delete node.properties['data-status']
        delete node.properties['data-completed']
        delete node.properties['data-visual']
        delete node.properties['data-metadata']
        delete node.properties['data-line']
        delete node.properties['data-symbol']

        // 创建新的子元素结构
        const checkbox: Element = {
          type: 'element',
          tagName: 'input',
          properties: {
            type: 'checkbox',
            className: ['task-checkbox'],
            checked: status !== ' ',
            disabled: true,
            'data-status': status,
          },
          children: [],
        }

        const visualSpan: Element = {
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['task-visual'],
          },
          children: [{ type: 'text', value: visual }],
        }

        const newChildren: ElementContent[] = [
          checkbox,
          { type: 'text', value: ' ' },
          visualSpan,
        ]

        // 添加 metadata 显示
        if (metadata.length > 0) {
          const metadataSpan: Element = {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['task-metadata'],
            },
            children: metadata.map((m: any) => ({
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['task-meta-item'],
                'data-key': m.key,
              },
              children: [
                {
                  type: 'element',
                  tagName: 'strong',
                  properties: {},
                  children: [{ type: 'text', value: m.key }],
                },
                { type: 'text', value: ': ' },
                { type: 'text', value: m.value },
              ],
            })),
          }
          newChildren.push({ type: 'text', value: ' ' }, metadataSpan)
        }

        // 替换子元素
        node.children = newChildren
      }

      // 处理标准 GFM 任务列表（作为备用）
      if (
        node.tagName === 'li' &&
        node.properties?.className &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('task-list-item') &&
        !node.properties['data-task-item']
      ) {
        if (!node.properties.className.includes('task-item')) {
          node.properties.className.push('task-item')
        }

        visit(node, 'element', (child: Element) => {
          if (
            child.tagName === 'input' &&
            child.properties?.type === 'checkbox'
          ) {
            if (!child.properties.className) {
              child.properties.className = []
            }
            if (Array.isArray(child.properties.className)) {
              child.properties.className.push('task-checkbox')
            }

            if (child.properties.checked) {
              child.properties['data-checked'] = 'true'
              if (Array.isArray(node.properties.className)) {
                node.properties.className.push('task-completed')
              }
            }
          }
        })
      }
    })
  }
}
