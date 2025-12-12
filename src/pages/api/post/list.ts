import { getAllPosts } from '@/adapter/content'
import { expandTags } from '@/shared/tag'
import { getCreateTime, getUpdateTime } from '@/shared/time'
import type { ShortPageData } from '@/shared/type'
import { getEntry } from 'astro:content'

// Helper to extract intro from markdown content (first paragraph)
const extractIntro = (body: string | undefined): string => {
  if (!body) return ''
  const paragraphs = body
    .split('\n\n')
    .filter((p) => p.trim() && !p.startsWith('#'))
  return paragraphs[0]?.trim().slice(0, 200) ?? ''
}

const listCache = new Map<boolean, ShortPageData[]>()
const tagsCache = new Map<string, string[]>()
const postsByTagCache = new Map<string, ShortPageData[]>()

/**
 * Get all unique tags from all posts
 * Cached in production for better performance
 */
export const getAllTags = async (): Promise<string[]> => {
  const cacheKey = 'all-tags'
  if (tagsCache.has(cacheKey)) {
    return tagsCache.get(cacheKey)!
  }

  const posts = await getPageList()
  const allTags = [...new Set(posts.map((p) => p.tags).flat())].filter(Boolean)

  if (import.meta.env.PROD) {
    tagsCache.set(cacheKey, allTags)
  }

  return allTags
}

/**
 * Get posts filtered by tag
 * Cached in production for better performance
 */
export const getPostsByTag = async (tag: string): Promise<ShortPageData[]> => {
  if (postsByTagCache.has(tag)) {
    return postsByTagCache.get(tag)!
  }

  const all = await getPageList()
  const posts = all.filter((v) => v.tags.includes(tag))

  if (import.meta.env.PROD) {
    postsByTagCache.set(tag, posts)
  }

  return posts
}

export const getPageList = async (
  filterDraft = true,
): Promise<ShortPageData[]> => {
  if (listCache.has(filterDraft)) return listCache.get(filterDraft)!

  const allPosts = await getAllPosts()

  const pageData = await Promise.all(
    allPosts.map(async (post) => {
      const expandedTags = expandTags(post.data.tags)
      const intro = extractIntro(post.body)

      // Remove .md extension from id
      const postId = post.id.replace(/\.md$/, '')

      return {
        id: postId,
        path: postId,
        title: post.data.title,
        tags: expandedTags,
        createTime: getCreateTime(post.data),
        updateTime: getUpdateTime(post.data),
        draft: post.data.draft,
        cover: post.data.cover,
        intro,
      } satisfies ShortPageData
    }),
  )

  const sorted = pageData.sort((a, b) => b.createTime - a.createTime)
  const result = filterDraft ? sorted.filter((p) => !p.draft) : sorted

  if (import.meta.env.PROD) {
    listCache.set(filterDraft, result)
  }

  return result
}

export const getSinglePageData = async (id: string) => {
  const entry = await getEntry('posts', id)
  if (!entry) {
    throw new Error(`Post not found: ${id}`)
  }

  const expandedTags = expandTags(entry.data.tags)
  const intro = extractIntro(entry.body)

  return {
    id: entry.id.replace(/\.md$/, ''),
    path: `/posts/${id}.json`,
    title: entry.data.title,
    tags: expandedTags,
    createTime: getCreateTime(entry.data),
    updateTime: getUpdateTime(entry.data),
    draft: entry.data.draft,
    cover: entry.data.cover,
    intro,
    content: entry.body,
    html: '', // Will be rendered by Astro
  }
}

export async function GET() {
  const list = await getPageList(false)
  return new Response(JSON.stringify(list), { status: 200 })
}
