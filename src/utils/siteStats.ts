import { getCollection } from 'astro:content'

export interface SiteStats {
  totalPosts: number
  categories: Array<{ name: string; count: number }>
  tagCounts: Array<{ tag: string; count: number }>
  totalWordsInWan: string
  postsByYear: Record<number, number>
  generatedAt: string
}

/**
 * 获取站点统计信息
 * 从 siteStats collection 中读取由 postLoader 生成的统计数据
 */
export async function getSiteStats(): Promise<SiteStats> {
  const siteStatsCollection = await getCollection('siteStats')

  if (siteStatsCollection.length === 0) {
    // 返回默认值，避免构建失败
    return {
      totalPosts: 0,
      categories: [],
      tagCounts: [],
      totalWordsInWan: '0.0',
      postsByYear: {},
      generatedAt: new Date().toISOString(),
    }
  }

  // siteStats collection 只有一个条目（site-stats.json）
  const stats = siteStatsCollection[0].data as unknown as SiteStats
  return stats
}
