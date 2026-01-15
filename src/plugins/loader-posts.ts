import { parseYMAL } from '@/utils/yaml.mjs'
import type { Loader } from 'astro/loaders'
import { type CollectionKey, getCollection } from 'astro:content'
import { mkdir, readFile, readdir, stat, writeFile } from 'fs/promises'
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
  outlinks?: string[]
  inlinks?: string[]
  aliases?: string[]
  description?: string
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

          if (!data.description) {
            const firstParagraphMatch = trimmedBody.match(
              /^(?:#.*\n)?([\s\S]*?)(?:\n\n|$)/,
            )
            if (firstParagraphMatch) {
              data.description = firstParagraphMatch[1].trim()
            }
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
            const validatedPost = (await parseData({
              id: post.id,
              data: post.data,
            })) as PostYamlData

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

        // 5. 生成站点统计信息并保存到 public 目录
        try {
          await generateSiteStats(postsData)
        } catch (error) {
          logger.warn(`Failed to generate site stats: ${error.message}`)
        }
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
  return Array.from(new Set(links)).filter((link) => link && link.trim())
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
    if (!post.outlinks || post.outlinks.length === 0) return

    post.outlinks.forEach((link: string) => {
      const targetPost = titleMap.get(link)

      if (targetPost && targetPost !== post) {
        if (!targetPost.inlinks) {
          targetPost.inlinks = []
        }
        if (!targetPost.inlinks.includes(post.slug!)) {
          targetPost.inlinks.push(post.slug!)
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

/**
 * 生成站点统计信息并保存到 public 目录
 */
async function generateSiteStats(
  postsData: { id: string; data: PostYamlData }[],
): Promise<void> {
  const publicDir = join(process.cwd(), 'public')

  // 确保 public 目录存在

  await mkdir(publicDir, { recursive: true })

  // 只统计非草稿文章
  const publishedPosts = postsData.filter((p) => !p.data.draft)

  // 统计总字数
  const totalWords = publishedPosts.reduce(
    (sum, post) => sum + (post.data.wordCount || 0),
    0,
  )
  const totalWordsInWan = (totalWords / 10000).toFixed(2)

  // 统计分类
  const categoryCount = new Map<string, number>()
  publishedPosts.forEach((post) => {
    const category = post.data.category || '未分类'
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
  })
  const categories = Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // 统计标签
  const tagCount = new Map<string, number>()
  publishedPosts.forEach((post) => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach((tag) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
      })
    }
  })
  const tagCounts = Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)

  // 统计按年份分布
  const postsByYear: Record<number, number> = {}
  publishedPosts.forEach((post) => {
    if (post.data.created) {
      const year = new Date(post.data.created).getFullYear()
      postsByYear[year] = (postsByYear[year] || 0) + 1
    }
  })

  // 构建统计数据
  const stats = {
    totalPosts: publishedPosts.length,
    categories,
    tagCounts,
    totalWordsInWan,
    postsByYear,
    generatedAt: new Date().toISOString(),
  }

  // 保存统计数据到 site-stats.json
  const statsPath = join(publicDir, 'site-stats.json')
  await writeFile(statsPath, JSON.stringify(stats, null, 2), 'utf-8')
  console.info(
    `Generated site stats: ${publishedPosts.length} posts, ${totalWordsInWan}万字`,
  )

  // 保存文章列表到 posts.json（用于客户端访问）

  const postsListPath = join(publicDir, 'posts.json')
  const postsYamlList: PostYamlData[] = publishedPosts.map((p) => p.data)

  await writeFile(
    postsListPath,
    JSON.stringify({ posts: postsYamlList }, null, 2),
    'utf-8',
  )
  console.info(`Generated posts list: ${postsYamlList.length} posts`)
}

export async function queryCollection(collection: CollectionKey) {
  if (collection !== 'posts') {
    return getCollection(collection)
  }
  return getCollection('posts', ({ data }) => {
    return (data as PostYamlData).draft !== true
  })
}
