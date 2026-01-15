import { parseYMAL } from '@/utils/yaml.mjs'
import type { Loader } from 'astro/loaders'
import { type CollectionKey, getCollection } from 'astro:content'
import { readFile, readdir, stat } from 'fs/promises'
import GithubSlugger from 'github-slugger'
import { join } from 'path'

interface PostLoaderOptions {
  /** Glob pattern to match files, defaults to "**\/*.md" */
  pattern?: string
  /** Base directory to search from */
  base: string
}

/**
 * Post 数据类型（对应 Zod schema）
 */
export interface PostYamlData {
  title: string
  slug: string
  tags?: string[]
  category?: string
  created?: string
  updated?: string
  draft: boolean
  cover?: {
    src: string
    alt?: string
  }
  link?: string
  wordCount: number
  outLinks?: string[]
  inLinks?: string[]
  aliases?: string[]
  tasks?: Array<{
    status: string
    checked: boolean
    completed: boolean
    visual: string
    metadata: Array<{
      key: string
      value: string
      start: number
      end: number
    }>
    line: number
    symbol: string
  }>
}

/**
 * 自定义 Markdown 加载器，支持双向链接功能
 * 类似于 glob loader，但会自动计算 inLinks/outLinks
 */
export function postLoader(options: PostLoaderOptions): Loader {
  const { base } = options

  return {
    name: 'post-loader-with-backlinks',
    load: async ({
      store,
      logger,
      parseData,
      generateDigest,
      renderMarkdown,
    }) => {
      logger.info(`Loading posts from ${base}`)

      try {
        // 1. 读取所有文件
        const files = await readdir(base)
        const mdFiles = files.filter((f) => f.endsWith('.md'))

        logger.info(`Found ${mdFiles.length} markdown files`)

        // 2. 第一遍：加载所有文件并提取基本数据
        const postsData: Array<{
          id: string
          data: PostYamlData
          body: string
          filePath: string
        }> = []

        for (const file of mdFiles) {
          const filePath = join(base, file)
          const fileContent = await readFile(filePath, 'utf-8')
          const fileStat = await stat(filePath)

          // 提取 frontmatter 和 body
          const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
          const match = fileContent.match(frontmatterRegex)

          if (!match) {
            logger.warn(`No frontmatter found in ${file}`)
            continue
          }

          const [, yamlContent, body] = match

          // 解析 YAML frontmatter（简单实现）
          const data = parseYMAL(yamlContent) as PostYamlData

          const trimmedBody = body.trim()

          // 生成基本元数据
          const fileName = file.replace(/\.md$/i, '')
          const slugger = new GithubSlugger()

          if (!data.title) {
            const h1Match = trimmedBody.match(/^#\s+(.+)/)
            data.title = h1Match ? h1Match[1].trim() : fileName
          }

          // 确保 title 不为空
          if (!data.title || data.title.trim() === '') {
            data.title = fileName || 'untitled'
          }

          // 生成或验证 slug
          if (!data.slug || data.slug.trim() === '') {
            data.slug = slugger.slug(data.title)
          }

          // 提取别名
          if (!data.aliases) {
            data.aliases = []
          }
          if (data.title !== fileName && !data.aliases.includes(fileName)) {
            data.aliases.push(fileName)
          }

          // 提取出站链接
          const outLinks = extractLinks(trimmedBody)
          if (outLinks.length > 0) {
            data.outLinks = outLinks
          }

          // 添加时间戳
          if (!data.created) {
            data.created = formatDateTime(fileStat.birthtime)
          }
          data.updated = formatDateTime(fileStat.mtime)

          // 计算字数
          data.wordCount = trimmedBody.replace(/\s+/g, '').length

          postsData.push({
            id: data.slug,
            data,
            body: trimmedBody,
            filePath,
          })
        }

        // 3. 计算双向链接（在验证前，使用原始数据）
        const titleMap = buildTitleMap(postsData.map((p) => p.data))
        calculateBacklinks(
          postsData.map((p) => p.data),
          titleMap,
        )

        // 4. 验证、转换并存储到 store
        store.clear()

        for (const post of postsData) {
          try {
            const validatedPost = await parseData({
              id: post.id,
              data: post.data,
            })

            const digest = generateDigest(`${post.id}-${post.data.updated}`)

            store.set({
              id: validatedPost.slug,
              data: validatedPost,
              body: post.body,
              digest,
              rendered: await renderMarkdown(post.body),
            })
          } catch (error) {
            logger.error(`Failed to validate post ${post.id}: ${error.message}`)
          }
        }

        logger.info(
          `Successfully loaded ${postsData.length} posts with backlinks`,
        )
      } catch (error) {
        logger.error(`Failed to load posts: ${error.message}`)
        throw error
      }
    },
  }
}

/**
 * 提取文档中的所有链接（Wiki 风格 [[]] 和 Markdown [](url)）
 */
function extractLinks(content: string): string[] {
  const links: string[] = []

  // 1. Wiki 风格的 [[]] 链接
  const wikiLinks = content.match(/\[\[([^\]]+)\]\]/g) || []
  wikiLinks.forEach((link) => {
    const match = link.match(/\[\[([^\]]+)\]\]/)
    if (match) {
      const linkText = match[1].split('|')[0].trim()
      links.push(linkText)
    }
  })

  // 2. Markdown 格式的链接 [text](url)
  const mdLinks = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []
  mdLinks.forEach((link) => {
    const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (match) {
      links.push(match[2])
    }
  })

  // 去重并过滤空链接
  return [...new Set(links)].filter((link) => link && link.trim())
}

/**
 * 构建标题/别名到文章的映射表
 */
function buildTitleMap(posts: PostYamlData[]): Map<string, PostYamlData> {
  const titleMap = new Map<string, PostYamlData>()

  posts.forEach((post) => {
    if (post.title) {
      titleMap.set(post.title, post)
    }
    if (post.slug) {
      titleMap.set(post.slug, post)
    }
    if (post.aliases && Array.isArray(post.aliases)) {
      post.aliases.forEach((alias: string) => {
        titleMap.set(alias, post)
      })
    }
  })

  return titleMap
}

/**
 * 计算反向链接（inLinks）
 */
function calculateBacklinks(
  posts: PostYamlData[],
  titleMap: Map<string, PostYamlData>,
): void {
  posts.forEach((post) => {
    if (!post.outLinks || post.outLinks.length === 0) return

    post.outLinks.forEach((link: string) => {
      const targetPost = titleMap.get(link)
      if (targetPost && targetPost !== post) {
        if (!targetPost.inLinks) {
          targetPost.inLinks = []
        }
        if (!targetPost.inLinks.includes(post.slug!)) {
          targetPost.inLinks.push(post.slug!)
        }
      }
    })
  })
}

/**
 * 格式化时间为 YYYY-MM-DDTHH:mm
 */
function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export async function queryCollection(collection: CollectionKey) {
  return getCollection(collection, ({ data }) => {
    return data.draft !== true
  })
}
