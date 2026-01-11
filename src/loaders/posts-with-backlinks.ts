/**
 * 自定义 Astro Loader - 带双向链接的文章加载器
 *
 * 策略：使用 glob loader 作为基础，在加载后处理添加双向链接
 */

import type { Loader } from 'astro/loaders'
import { glob } from 'astro/loaders'

interface LoaderContext {
  store: Map<string, any>
  logger: any
  parseData: (data: any) => any
}

/**
 * 从 markdown 内容中提取链接
 */
function extractLinks(content: string): string[] {
  const links: string[] = []

  // Wiki-link: [[文章名]] 或 [[文章名|别名]]
  const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
  let match
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    links.push(match[1].trim())
  }

  // Markdown 链接: [text](/post/xxx)
  const mdLinkRegex = /\[([^\]]+)\]\(\/post\/([^)]+)\)/g
  while ((match = mdLinkRegex.exec(content)) !== null) {
    links.push(match[2])
  }

  return [...new Set(links)]
}

/**
 * 规范化文章 ID（处理不同的命名格式）
 */
function normalizeId(id: string): string {
  return id.replace(/\.md$/, '').replace(/\s+/g, '-').toLowerCase()
}

/**
 * 匹配链接目标到实际文章 ID
 */
function matchLinkToId(linkTarget: string, allIds: string[]): string | null {
  const normalized = normalizeId(linkTarget)

  // 精确匹配
  for (const id of allIds) {
    if (normalizeId(id) === normalized) {
      return id
    }
  }

  return null
}

/**
 * 创建带双向链接的文章加载器
 */
export function postsWithBacklinks(options: {
  pattern: string
  base: string
}): Loader {
  const baseLoader = glob(options)

  return {
    name: 'posts-with-backlinks',

    async load(context: LoaderContext) {
      const { store, logger } = context

      // 1. 先用基础 loader 加载所有文章
      await baseLoader.load(context)

      // 2. 获取所有已加载的文章
      const entries: Array<[string, any]> = []
      for (const [id, entry] of store.entries()) {
        entries.push([id, entry])
      }

      const allIds = entries.map(([id]) => id)
      logger.info(`为 ${entries.length} 篇文章计算双向链接...`)

      // 3. 第一遍：提取每篇文章的出链
      const outgoingLinks = new Map<string, string[]>()

      for (const [id, entry] of entries) {
        const body = entry.body || ''
        const links = extractLinks(body)

        // 从 frontmatter 也获取手动定义的链接
        const manualLinks = Array.isArray(entry.data?.links)
          ? entry.data.links
          : []

        const allLinks = [...new Set([...links, ...manualLinks])]
        outgoingLinks.set(id, allLinks)
      }

      // 4. 第二遍：计算反向链接
      const backlinksMap = new Map<string, string[]>()

      for (const id of allIds) {
        backlinksMap.set(id, [])
      }

      for (const [sourceId, links] of outgoingLinks.entries()) {
        for (const linkTarget of links) {
          const targetId = matchLinkToId(linkTarget, allIds)

          if (targetId && backlinksMap.has(targetId)) {
            backlinksMap.get(targetId)!.push(sourceId)
          } else if (linkTarget) {
            logger.warn(
              `文章 "${sourceId}" 引用了不存在的文章: "${linkTarget}"`,
            )
          }
        }
      }

      // 去重
      for (const [id, backlinks] of backlinksMap.entries()) {
        backlinksMap.set(id, [...new Set(backlinks)])
      }

      // 5. 更新每篇文章的 data，添加 links 和 backlinks
      for (const [id, entry] of entries) {
        const links = outgoingLinks.get(id) || []
        const backlinks = backlinksMap.get(id) || []

        // 直接修改 entry.data
        entry.data = {
          ...entry.data,
          links,
          backlinks,
        }
      }

      const totalBacklinks = Array.from(backlinksMap.values()).flat().length
      logger.info(
        `✅ 双向链接完成: ${entries.length} 篇文章, ${totalBacklinks} 个反向链接`,
      )
    },
  }
}
