#!/usr/bin/env node

import { mkdir, open, readdir, readFile, writeFile } from 'fs/promises'
import GithubSlugger from 'github-slugger'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { expandTags, extractTagsFromBody } from '../src/utils/tags-util.mjs'
import { composeFrontmatter, parseYMAL } from '../src/utils/yaml.mjs'
const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BLOG_DIR = join(__dirname, '../src/blog')

/**
 * 从文件名生成 slug (使用 GitHub 风格)
 */
function generateSlug(filename) {
  const slugger = new GithubSlugger()
  const name = filename.replace(/\.md$/, '')
  return slugger.slug(name)
}

/**
 * 格式化时间为 YYYY-MM-DDTHH:mm 格式
 */
function formatDateTime(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

/**
 * 处理单个文件
 */
async function processFileYaml(filePath) {
  try {
    // 先检查文件大小
    const fileHandle = await open(filePath)
    const fileStats = await fileHandle.stat()
    await fileHandle.close()

    // 跳过超过 20MB 的文件
    const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
    if (fileStats.size > MAX_FILE_SIZE) {
      console.log(`⊘ Skipped (too large): ${filePath}`)
      return {
        success: false,
        filePath,
        skipped: true,
        reason: 'File too large',
      }
    }

    const content = await readFile(filePath, 'utf-8')
    const match = content.match(frontmatterRegex)

    const [, yamlContent, body] = match

    const data = parseYMAL(yamlContent)
    // Remove leading whitespace/newlines from body
    const trimmedBody = body.trim()

    // 1. 提取标题（如果 yaml 中没有）
    const fileName = filePath.split(/[/\\]/).pop().replace(/\.md$/i, '')
    if (!data.title) {
      // 检查第一行是否是 h1
      const h1Match = trimmedBody.match(/^#\s+(.+)/)
      if (h1Match) {
        data.title = h1Match[1].trim()
      } else {
        // 从文件名提取
        data.title = fileName
      }
    }

    // 如果 title 和文件名不同，将文件名添加到别名
    if (data.title !== fileName) {
      if (!data.aliases) {
        data.aliases = []
      }
      if (!data.aliases.includes(fileName)) {
        data.aliases.push(fileName)
      }
    }

    if (!data.slug) {
      data.slug = generateSlug(data.title)
    }
    if (!data.created) {
      data.created = formatDateTime(fileStats.birthtime)
    }

    data.updated = formatDateTime(fileStats.mtime)

    // 2. 从 body 提取标签并展平
    const extractedTags = extractTagsFromBody(trimmedBody)

    // 3. 展平自带的标签并合并
    const existingTags = data.tags ? expandTags(data.tags) : []
    const allTags = [...new Set([...extractedTags, ...existingTags])]

    if (allTags.length > 0) {
      data.tags = allTags
    } else {
      delete data.tags
    }

    // 计算字数并添加到 frontmatter
    data.wordCount = (body || '').replace(/\s+/g, '').length

    // 提取所有出站链接 (仿照 Obsidian Dataview 格式)
    const outLinks = []

    // 1. 提取 Wiki 风格的 [[]] 链接
    const wikiLinks = trimmedBody.match(/\[\[([^\]]+)\]\]/g) || []
    wikiLinks.forEach((link) => {
      const match = link.match(/\[\[([^\]]+)\]\]/)
      if (match) {
        // 处理 [[page|alias]] 格式，只保留 page 部分
        const linkText = match[1].split('|')[0].trim()
        outLinks.push(linkText)
      }
    })

    // 2. 提取所有 Markdown 格式的链接 [text](url)
    const mdLinks = trimmedBody.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []
    mdLinks.forEach((link) => {
      const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (match) {
        outLinks.push(match[2]) // 保留完整的 URL 或路径
      }
    })

    // 过滤空链接并去重
    const validOutLinks = [...new Set(outLinks)].filter(
      (link) => link && link.trim(),
    )
    if (validOutLinks.length > 0) {
      data.outLinks = validOutLinks
    } else {
      delete data.outLinks
    }

    // 生成新的 frontmatter
    const newContent = composeFrontmatter(data, trimmedBody)

    // 写回文件
    await writeFile(filePath, newContent, 'utf-8')

    console.log(`✓ Processed: ${filePath}`)
    return { success: true, filePath, data }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message)
    return { success: false, filePath, error: error.message }
  }
}

/**
 * 生成站点统计信息并写入 public/
 */
async function generateSiteStats(postsData) {
  console.log('\nGenerating site statistics...')

  try {
    // 过滤掉草稿
    const allPosts = postsData.filter((data) => !data.draft)

    const totalPosts = allPosts.length

    // Tags
    const allTags = [...new Set(allPosts.flatMap((p) => p.tags || []))].filter(
      Boolean,
    )
    const tagCounts = allTags
      .map((tag) => ({
        tag,
        count: allPosts.filter((p) => p.tags?.includes(tag)).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Categories
    const categoryCounts = new Map()
    allPosts.forEach((post) => {
      const category = post.category
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
    })

    const categories = Array.from(categoryCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Words
    const totalWords = allPosts.reduce((sum, post) => sum + post.wordCount, 0)
    const totalWordsInWan = (totalWords / 10000).toFixed(1)

    // Archive statistics
    const postsByYear = allPosts.reduce((acc, post) => {
      const year = new Date(post.created).getFullYear()
      acc[year] = (acc[year] || 0) + 1
      return acc
    }, {})

    // 汇总信息
    const stats = {
      generatedAt: new Date().toISOString(),
      totalPosts,
      categories,
      tagCounts,
      totalWordsInWan,
      postsByYear,
    }

    // 文章列表信息
    const posts = {
      generatedAt: new Date().toISOString(),
      total: allPosts.length,
      posts: allPosts,
    }

    // 写入文件
    const publicDir = join(__dirname, '../public')
    await mkdir(publicDir, { recursive: true })

    // 1. 缓存所有文章的 yaml 信息
    await writeFile(
      join(publicDir, 'posts.json'),
      JSON.stringify(posts, null, 2),
      'utf8',
    )

    // 2. 缓存汇总信息
    await writeFile(
      join(publicDir, 'site-stats.json'),
      JSON.stringify(stats, null, 2),
      'utf8',
    )

    console.log(`✓ Generated site statistics (${totalPosts} posts)`)
    console.log(`  - posts.json: ${allPosts.length} posts`)
    console.log(`  - site-stats.json: aggregated stats`)
  } catch (error) {
    console.warn('Could not generate site stats:', error.message)
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('Starting content preprocessing...\n')

  try {
    const files = await readdir(BLOG_DIR)
    const mdFiles = files.filter((f) => f.endsWith('.md'))

    console.log(`Found ${mdFiles.length} markdown files\n`)

    const results = await Promise.all(
      mdFiles.map((file) => processFileYaml(join(BLOG_DIR, file))),
    )

    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    console.log(`\n✓ Successfully processed: ${successful} files`)
    if (failed > 0) {
      console.log(`✗ Failed: ${failed} files`)
    }

    // 提取成功处理的文章数据
    const postsData = results
      .filter((r) => r.success && r.data)
      .map((r) => r.data)

    // 计算双向链接
    const postsWithBacklinks = buildBacklinks(postsData)

    // 生成站点统计信息
    await generateSiteStats(postsWithBacklinks)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

/**
 * 构建双向链接（inLinks）
 */
function buildBacklinks(postsData) {
  // 创建标题和别名到文章的映射
  const titleMap = new Map()
  postsData.forEach((post) => {
    // 映射标题
    if (post.title) {
      titleMap.set(post.title, post)
    }
    // 映射 slug
    if (post.slug) {
      titleMap.set(post.slug, post)
    }
    // 映射别名（如果有 aliases 字段）
    if (post.aliases && Array.isArray(post.aliases)) {
      post.aliases.forEach((alias) => {
        titleMap.set(alias, post)
      })
    }
  })

  // 处理每篇文章的 outLinks
  postsData.forEach((post) => {
    if (!post.outLinks || post.outLinks.length === 0) return

    post.outLinks.forEach((link) => {
      // 尝试匹配标题或别名
      const targetPost = titleMap.get(link)
      if (targetPost && targetPost !== post) {
        // 避免自引用
        // 添加到目标文章的 inLinks（按需创建）
        if (!targetPost.inLinks) {
          targetPost.inLinks = []
        }
        if (!targetPost.inLinks.includes(post.slug)) {
          targetPost.inLinks.push(post.slug)
        }
      }
    })
  })

  return postsData
}

main()
