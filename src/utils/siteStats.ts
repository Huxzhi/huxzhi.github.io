type SitePost = {
  id: string
  title: string
  tags: string[]
  category: string
  wordCount: number
  createTime: number
  description: string
  draft: boolean
}

type SiteStats = {
  totalPosts: number
  categories: { name: string; count: number }[]
  tagCounts: { tag: string; count: number }[]
  totalWordsInWan: string
  postsByYear: Record<number, number>
  posts?: SitePost[]
}

let cached: SiteStats | null = null
let cachedStatsOnly: Omit<SiteStats, 'posts'> | null = null

/**
 * 获取完整的站点统计信息（包含文章列表）
 * 读取 site-stats.json 和 posts.json
 */
export async function getSiteStats(): Promise<SiteStats> {
  if (cached) return cached

  try {
    let stats: SiteStats
    let postsData: SitePost[]

    // 检测是否在服务器端（Node.js）
    if (typeof window === 'undefined') {
      // 服务器端：使用文件系统读取
      const fs = await import('fs/promises')
      const path = await import('path')
      const publicDir = path.join(process.cwd(), 'public')

      const [statsContent, postsContent] = await Promise.all([
        fs.readFile(path.join(publicDir, 'site-stats.json'), 'utf-8'),
        fs.readFile(path.join(publicDir, 'posts.json'), 'utf-8'),
      ])

      stats = JSON.parse(statsContent)
      const postsJson = JSON.parse(postsContent)
      postsData = Array.isArray(postsJson) ? postsJson : postsJson.posts || []
    } else {
      // 客户端：使用 fetch
      const [statsRes, postsRes] = await Promise.all([
        fetch('/site-stats.json'),
        fetch('/posts.json'),
      ])

      if (!statsRes.ok || !postsRes.ok) {
        throw new Error('Failed to load site data')
      }

      stats = await statsRes.json()
      const postsJson = await postsRes.json()
      postsData = Array.isArray(postsJson) ? postsJson : postsJson.posts || []
    }

    cached = {
      totalPosts: stats.totalPosts,
      categories: stats.categories,
      tagCounts: stats.tagCounts,
      totalWordsInWan: stats.totalWordsInWan,
      postsByYear: stats.postsByYear,
      posts: postsData,
    }

    return cached
  } catch (error) {
    console.error('Error loading site stats:', error)
    // 返回默认值
    return {
      totalPosts: 0,
      categories: [],
      tagCounts: [],
      totalWordsInWan: '0',
      postsByYear: {},
      posts: [],
    }
  }
}

/**
 * 只获取统计信息（不含文章列表）
 * 读取 site-stats.json，体积更小，适合只需要统计的场景
 */
export async function getSiteStatsOnly(): Promise<Omit<SiteStats, 'posts'>> {
  if (cachedStatsOnly) return cachedStatsOnly

  try {
    let stats: SiteStats

    // 检测是否在服务器端（Node.js）
    if (typeof window === 'undefined') {
      // 服务器端：使用文件系统读取
      const fs = await import('fs/promises')
      const path = await import('path')
      const publicDir = path.join(process.cwd(), 'public')
      const content = await fs.readFile(
        path.join(publicDir, 'site-stats.json'),
        'utf-8',
      )
      stats = JSON.parse(content)
    } else {
      // 客户端：使用 fetch
      const response = await fetch('/site-stats.json')
      if (!response.ok) {
        throw new Error('Failed to load site stats')
      }
      stats = await response.json()
    }

    cachedStatsOnly = stats
    return cachedStatsOnly
  } catch (error) {
    console.error('Error loading site stats:', error)
    return {
      totalPosts: 0,
      categories: [],
      tagCounts: [],
      totalWordsInWan: '0',
      postsByYear: {},
    }
  }
}
