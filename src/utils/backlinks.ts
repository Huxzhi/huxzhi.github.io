/**
 * 双向链接工具函数
 */

import type { CollectionEntry } from 'astro:content'

interface BacklinksMap {
  [postId: string]: string[]
}

let backlinksCache: BacklinksMap | null = null

/**
 * 加载反向链接映射
 */
export async function loadBacklinks(): Promise<BacklinksMap> {
  if (backlinksCache) {
    return backlinksCache
  }

  try {
    // 在构建时从文件系统加载
    if (import.meta.env.DEV) {
      const fs = await import('node:fs/promises')
      const path = await import('node:path')
      const filePath = path.join(process.cwd(), 'public', 'backlinks.json')
      const content = await fs.readFile(filePath, 'utf-8')
      backlinksCache = JSON.parse(content)
    } else {
      // 在生产环境从 public 目录加载
      const response = await fetch('/backlinks.json')
      backlinksCache = await response.json()
    }

    return backlinksCache || {}
  } catch (error) {
    console.warn('⚠️  无法加载反向链接数据:', error)
    return {}
  }
}

/**
 * 获取指定文章的反向链接
 */
export async function getBacklinks(postId: string): Promise<string[]> {
  const backlinksMap = await loadBacklinks()
  return backlinksMap[postId] || []
}

/**
 * 获取指定文章的出链
 */
export function getOutgoingLinks(post: CollectionEntry<'posts'>): string[] {
  return post.data.outlinks || []
}

/**
 * 获取文章的所有链接关系（出链 + 反向链接）
 */
export async function getLinkRelations(post: CollectionEntry<'posts'>) {
  const outgoing = getOutgoingLinks(post)
  const incoming = await getBacklinks(post.id)

  return {
    outgoing, // 本文引用的文章
    incoming, // 引用本文的文章
    total: outgoing.length + incoming.length,
  }
}

/**
 * 检查两篇文章是否有链接关系
 */
export async function isLinked(
  postId1: string,
  postId2: string,
): Promise<boolean> {
  const backlinksMap = await loadBacklinks()

  // 检查双向链接
  const post1Backlinks = backlinksMap[postId1] || []
  const post2Backlinks = backlinksMap[postId2] || []

  return post1Backlinks.includes(postId2) || post2Backlinks.includes(postId1)
}
