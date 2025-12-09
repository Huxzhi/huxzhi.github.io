import { getSSRHTML } from '@/editor/extensions'
import { expandTags } from '@/shared/tag'
import { parseIntro, parseMeta, pathToId } from '@/shared/transform'
import type { PageDetail, ShortPageData } from '@/shared/type'
import type { JSONContent } from '@tiptap/core'
import { readFile, readdir } from 'fs/promises'

const detailCache = new Map<string, PageDetail>()
const getPageDetail = async (path: string) => {
  if (detailCache.has(path)) {
    return detailCache.get(path)!
  }
  const text = await readFile(path, { encoding: 'utf-8' })
  const content = JSON.parse(text) as JSONContent
  const meta = parseMeta(content)
  const imageNode = content.content?.find((v) => v.type === 'image')
  const cover = imageNode?.attrs
    ? {
        src: imageNode.attrs.src as string,
        alt: imageNode.attrs.alt as string | undefined,
      }
    : undefined

  // Expand tags Obsidian-style: "a/b/c" becomes ["a", "a/b", "a/b/c"]
  const expandedTags = expandTags(meta.tags)

  const detail = {
    content: text,
    ...meta,
    tags: expandedTags,
    intro: parseIntro(content) ?? '',
    html: getSSRHTML(content),
    cover,
  }
  if (import.meta.env.PROD) {
    detailCache.set(path, detail)
  }
  return detail
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

export const getPageList = async (filterDraft = true) => {
  if (listCache.has(filterDraft)) return listCache.get(filterDraft)!
  const dir = await readdir('./posts', { withFileTypes: true })
  const rawPageData = await Promise.all(
    dir
      .filter((v) => v.isFile() && v.name.endsWith('.json'))
      .map(async (v) => {
        const filePath = `./posts/${v.name}`
        const detail = await getPageDetail(filePath)
        const id = pathToId(v.name)
        return {
          ...detail,
          id,
          path: v.name.replace(/\.json$/, ''),
          html: undefined,
          content: undefined,
        }
      }),
  )

  const pageData = rawPageData
    // 按照创建时间先后排序
    .sort((a, b) => b.createTime - a.createTime)

  if (filterDraft) {
    const filtered = pageData.filter((p) => !p.draft)
    if (import.meta.env.PROD) {
      listCache.set(filterDraft, filtered)
    }
    return pageData.filter((p) => !p.draft)
  }
  if (import.meta.env.PROD) {
    listCache.set(filterDraft, pageData)
  }
  return pageData
}

export const getSinglePageData = async (id: string) => {
  const filePath = `./posts/${decodeURIComponent(id)}.json`
  const detail = await getPageDetail(filePath)
  return {
    ...detail,
    id,
    path: `/posts/${id}.json`,
  }
}

export async function GET() {
  const list = await getPageList(false)
  return new Response(JSON.stringify(list), { status: 200 })
}
