import type { CollectionEntry } from 'astro:content'
import config from 'urodele.config'

/**
 * 获取文章的分类
 * 优先级：frontmatter category > 文件夹名 > 未分类
 */
export function getPostCategory(post: CollectionEntry<'posts'>): string {
  // 1. 优先使用 frontmatter 中的 category
  if (post.data.category) {
    return post.data.category
  }

  // 2. 如果启用了文件夹分类，从文件路径提取
  if (config.categories.useFolderName) {
    const pathParts = post.id.split('/')
    // 如果有二级文件夹，使用文件夹名作为分类
    if (pathParts.length > 1) {
      return pathParts[0]
    }
  }

  // 3. 默认为未分类
  return config.categories.uncategorized
}
