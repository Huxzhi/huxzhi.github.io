import type { BlockContent, DefinitionContent, List, Parent, Text } from 'mdast'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'

// 仿 ListItem 的字段
export interface TaskItem extends Parent {
  type: 'taskItem'
  checked: boolean
  symbol: string
  status: string
  completed: boolean
  visual: string
  metadata: InlineField[] // 新增 metadata 字段
  line: number
  children: Array<BlockContent | DefinitionContent>
}

/** https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/data-import/inline-field.ts#L200
 *
 * Extracts inline fields of the form '[key:: value]' from a line of text. This is done in a relatively
 * "robust" way to avoid failing due to bad nesting or other interfering Markdown symbols:
 *
 * - Look for any wrappers ('[' and '(') in the line, trying to parse whatever comes after it as an inline key::.
 * - If successful, scan until you find a matching end bracket, and parse whatever remains as an inline value.
 */

type InlineField = {
  key: string
  value: string
  start: number
  end: number
}

const INLINE_FIELD_WRAPPERS: Record<string, string> = {
  '[': ']',
  '(': ')',
}

function findSpecificInlineField(
  line: string,
  startIndex: number,
): InlineField | null {
  const startChar = line[startIndex]
  const endChar = INLINE_FIELD_WRAPPERS[startChar]

  if (!endChar) return null

  let currentPos = startIndex + 1
  let keyEnd = -1
  let nestLevel = 1

  // 查找 key:: 分隔符
  while (currentPos < line.length) {
    if (
      line[currentPos] === ':' &&
      currentPos + 1 < line.length &&
      line[currentPos + 1] === ':'
    ) {
      keyEnd = currentPos
      currentPos += 2 // 跳过两个冒号
      break
    }
    currentPos++
  }

  if (keyEnd === -1) return null

  // 处理嵌套结构并查找结束符
  const valueStart = currentPos
  let valueEnd = -1

  while (currentPos < line.length) {
    if (line[currentPos] === startChar) {
      nestLevel++
    } else if (line[currentPos] === endChar) {
      nestLevel--
      if (nestLevel === 0) {
        valueEnd = currentPos - 1
        break
      }
    }
    currentPos++
  }

  if (valueEnd === -1) return null

  return {
    key: line.substring(startIndex + 1, keyEnd).trim(),
    value: line.substring(valueStart, valueEnd + 1).trim(),
    start: startIndex,
    end: currentPos + 1,
  }
}

function extractSpecialTaskFields(line: string): InlineField[] {
  // 示例实现：提取类似 [priority: high] 的特殊任务字段
  const taskFields: InlineField[] = []
  const regex = /\[(\w+):\s*([^\]]+)\]/g
  let match

  while ((match = regex.exec(line)) !== null) {
    taskFields.push({
      key: match[1],
      value: match[2],
      start: match.index,
      end: match.index + match[0].length,
    })
  }
  return taskFields
}

export function extractInlineFields(
  line: string,
  includeTaskFields: boolean = false,
): InlineField[] {
  let fields: InlineField[] = []

  // 遍历所有定义的包装符号
  for (const wrapper of Object.keys(INLINE_FIELD_WRAPPERS)) {
    let foundIndex = line.indexOf(wrapper)

    while (foundIndex >= 0) {
      const parsedField = findSpecificInlineField(line, foundIndex)

      if (!parsedField) {
        foundIndex = line.indexOf(wrapper, foundIndex + 1)
        continue
      }

      fields.push(parsedField)
      foundIndex = line.indexOf(wrapper, parsedField.end)
    }
  }

  // 合并特殊任务字段
  if (includeTaskFields) {
    fields = fields.concat(extractSpecialTaskFields(line))
  }

  // 按起始位置排序
  fields.sort((a, b) => a.start - b.start)

  // 过滤重叠字段
  const filteredFields: InlineField[] = []
  for (let i = 0; i < fields.length; i++) {
    if (
      i === 0 ||
      filteredFields[filteredFields.length - 1].end < fields[i].start
    ) {
      filteredFields.push(fields[i])
    }
  }

  return filteredFields
}

/**
 * 删除通过 extractSpecialTaskFields 提取的特殊任务字段
 * @param line 原始文本行
 * @param taskFields 已提取的任务字段数组
 * @returns 删除特殊任务字段后的新字符串
 */
export function removeSpecialTaskFields(
  line: string,
  taskFields: InlineField[] = [],
): string {
  // 若无字段，直接返回原文本
  if (taskFields.length === 0) {
    return line
  }

  // 按字段结束位置降序排序（从后往前删除，避免位置偏移）
  const sortedFields = [...taskFields].sort((a, b) => b.start - a.start)

  let result = line

  // 遍历字段并逐个删除
  for (const field of sortedFields) {
    const before = result.substring(0, field.start)
    const after = result.substring(field.end)
    result = before + after
  }

  return result
}

// 判断是否为任务节点
function isTaskNode(node: Parent) {
  // 1. 如果是 mdast 自动解析的任务项（带有 checked 属性）
  if ('checked' in node && typeof node.checked === 'boolean') {
    return true
  }
  // 判断是否为 listItem 且子节点是 paragraph 且以 [ ] 开头
  if (node.children?.[0]?.type === 'paragraph') {
    const paragraph = node.children[0]
    const textNode = paragraph.children?.[0]

    if (textNode?.type === 'text') {
      return /^\[.{1}\] /.test(textNode.value)
    }
  }
  return false
}

export default function remarkTaskParser() {
  return function transformer(tree: Node, file: any) {
    const tasks: any[] = []

    visit(tree, 'listItem', function (node: Parent, index, parent: List) {
      if (!isTaskNode(node)) return

      console.log(
        'Found task node:',
        node.type,
        'checked:',
        (node as any).checked,
      )

      // 不改变 type，而是添加 data 属性来标记
      const taskNode = node as any

      // 初始化 data 对象
      if (!taskNode.data) {
        taskNode.data = {}
      }
      if (!taskNode.data.hProperties) {
        taskNode.data.hProperties = {}
      }

      // 设定 taskNode.symbol
      if (parent.type === 'list') {
        if (parent.ordered) taskNode.symbol = parent.start! + '.'
        else taskNode.symbol = '-'
      }

      // 获取任务状态（GFM 已经解析了 checked 属性）
      const checked = 'checked' in taskNode ? taskNode.checked : null
      let status = ' '
      if (checked === true) {
        status = 'x'
      } else if (checked === false) {
        status = ' '
      }

      // 提取文本内容
      const paragraph = taskNode.children[0]
      const textParts: string[] = []

      visit(paragraph, 'text', (textNode: Text) => {
        textParts.push(textNode.value)
      })

      const fullText = textParts.join('').trim()

      // 解析 [key:: value] 格式的 metadata
      const inlineFields = extractInlineFields(fullText)
      const visual = removeSpecialTaskFields(fullText, inlineFields)

      taskNode.status = status
      taskNode.metadata = inlineFields
      taskNode.visual = visual
      taskNode.checked = checked === true
      taskNode.completed = status === 'x'
      taskNode.line = taskNode.position?.start.line ?? 0

      console.log('Processed task:', { status, visual, metadata: inlineFields })

      // 将任务信息存储到 data.hProperties，这样可以在 rehype 阶段访问
      taskNode.data.hProperties['data-task-item'] = 'true'
      taskNode.data.hProperties['data-status'] = taskNode.status
      taskNode.data.hProperties['data-completed'] = taskNode.completed
      taskNode.data.hProperties['data-visual'] = taskNode.visual
      taskNode.data.hProperties['data-metadata'] = JSON.stringify(
        taskNode.metadata,
      )
      taskNode.data.hProperties['data-line'] = taskNode.line
      taskNode.data.hProperties['data-symbol'] = taskNode.symbol

      // 收集任务信息到 frontmatter
      tasks.push({
        status: taskNode.status,
        checked: taskNode.checked,
        completed: taskNode.completed,
        visual: taskNode.visual,
        metadata: taskNode.metadata,
        line: taskNode.line,
        symbol: taskNode.symbol,
      })

      /* Whether or not this specific task has been completed; this does not consider 
         the completion or non-completion of any child tasks. A task is explicitly 
         considered "completed" if it has been marked with an "x". If you use a custom 
         status, e.g. [-], checked will be true, whereas completed will be false. */
    })

    // 将收集的任务保存到 frontmatter
    if (tasks.length > 0) {
      if (!file.data.astro) {
        file.data.astro = {}
      }
      if (!file.data.astro.frontmatter) {
        file.data.astro.frontmatter = {}
      }
      file.data.astro.frontmatter.tasks = tasks
    }
  }
}
