/**
 * 内容访问层 - 统一抽象开发和生产环境的内容读取
 *
 * 开发环境：使用 Astro Content Collections (本地文件系统)
 * 生产环境：可选择使用 Content Collections 或 GitHub API
 */

import type { PageData } from '@/shared/type'
import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

/**
 * 获取所有文章
 */
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  return await getCollection('posts')
}

/**
 * 根据 ID 获取单篇文章
 */
export async function getPostById(
  id: string,
): Promise<CollectionEntry<'posts'> | undefined> {
  return await getEntry('posts', id)
}

/**
 * 根据标签过滤文章
 */
export async function getPostsByTag(
  tag: string,
): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.data.tags?.includes(tag))
}

/**
 * 根据分类过滤文章
 */
export async function getPostsByCategory(
  category: string,
): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.data.category === category)
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tags = new Set<string>()
  allPosts.forEach((post) => {
    post.data.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = new Set<string>()
  allPosts.forEach((post) => {
    if (post.data.category) {
      categories.add(post.data.category)
    }
  })
  return Array.from(categories).sort()
}

/**
 * 转换为 PageData 格式（用于 API）
 */
export function toPageData(entry: CollectionEntry<'posts'>): PageData {
  // 解析时间：优先使用新格式 created/updated，否则使用旧格式 createTime/updateTime
  const parseTime = (timeStr?: string, fallbackTimestamp?: number): number => {
    if (timeStr) {
      const parsed = new Date(timeStr).getTime()
      if (!isNaN(parsed)) return parsed
    }
    return fallbackTimestamp || Date.now()
  }

  const createTime = parseTime(entry.data.created, entry.data.createTime)
  const updateTime = parseTime(
    entry.data.updated,
    entry.data.updateTime || entry.data.createTime,
  )

  // 重新构建完整的 Markdown（包含 frontmatter）
  const frontmatter = {
    title: entry.data.title || 'Untitled',
    tags: entry.data.tags || [],
    created: entry.data.created,
    updated: entry.data.updated,
    draft: entry.data.draft || false,
    ...(entry.data.category !== undefined && entry.data.category !== null
      ? { category: entry.data.category }
      : {}),
    ...(entry.data.cover ? { cover: entry.data.cover } : {}),
  }

  // 构建完整的 Markdown 内容（frontmatter + body）
  const frontmatterYaml = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map((v) => JSON.stringify(v)).join(', ')}]`
      }
      return `${key}: ${JSON.stringify(value)}`
    })
    .join('\n')

  const fullMarkdown = `---\n${frontmatterYaml}\n---\n\n${entry.body || ''}`

  return {
    content: fullMarkdown,
    tags: entry.data.tags || [],
    title: entry.data.title || 'Untitled',
    createTime: createTime,
    updateTime: updateTime,
    draft: entry.data.draft || false,
    category: entry.data.category,
    id: entry.id,
    path: entry.id,
    cover: entry.data.cover,
  }
}
