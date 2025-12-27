import { getCollection } from 'astro:content'
import { expandTags } from './tag'
import { getCreateTime } from './time'

type SiteStats = {
  totalPosts: number
  categories: { name: string; count: number }[]
  tagCounts: { tag: string; count: number }[]
  totalWordsInWan: string
  postsByYear: Record<number, number>
}

let cached: SiteStats | null = null

export async function getSiteStats(): Promise<SiteStats> {
  if (cached) return cached

  const allPosts = await getCollection('posts')
  const publishedPosts = allPosts.filter((post) => !post.data.draft)

  const totalPosts = publishedPosts.length

  // Tags
  const allTags = [...new Set(publishedPosts.flatMap((p) => expandTags(p.data.tags)))]
  const tagCounts = allTags
    .map((tag) => ({
      tag,
      count: publishedPosts.filter((p) => expandTags(p.data.tags).includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Categories
  const categoryCounts = new Map<string, number>()
  publishedPosts.forEach((post) => {
    const category = post.data.category ?? '未分类'
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
  })

  const categories = Array.from(categoryCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Words
  const totalWords = publishedPosts.reduce((sum, post) => {
    const content = post.body || ''
    const wordCount = content.replace(/\s+/g, '').length
    return sum + wordCount
  }, 0)
  const totalWordsInWan = (totalWords / 10000).toFixed(1)

  // Archive statistics
  const postsByYear = publishedPosts.reduce((acc, post) => {
    const year = new Date(getCreateTime(post.data)).getFullYear()
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  cached = {
    totalPosts,
    categories,
    tagCounts,
    totalWordsInWan,
    postsByYear,
  }

  return cached
}
