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
    const content = await readFile(filePath, 'utf-8')
    const fileHandle = await open(filePath)
    const fileStats = await fileHandle.stat()
    await fileHandle.close()

    const match = content.match(frontmatterRegex)

    const [, yamlContent, body] = match

    const data = parseYMAL(yamlContent)
    // Remove leading whitespace/newlines from body
    const trimmedBody = body.trim()

    // 1. 提取标题（如果 yaml 中没有）
    if (!data.title) {
      // 检查第一行是否是 h1
      const h1Match = trimmedBody.match(/^#\s+(.+)/)
      if (h1Match) {
        data.title = h1Match[1].trim()
      } else {
        // 从文件名提取
        data.title = filePath.split(/[/\\]/).pop().replace(/\.md$/i, '')
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
    return { success: true, filePath }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message)
    return { success: false, filePath, error: error.message }
  }
}

async function parseFrontmatterOnly(filePath) {
  // 只读取文件前面 8KB，通常 frontmatter 不会超过这个大小
  const fileHandle = await open(filePath, 'r')
  const buffer = Buffer.alloc(8192)

  try {
    const { bytesRead } = await fileHandle.read(buffer, 0, 8192, 0)
    const content = buffer.toString('utf-8', 0, bytesRead)

    // 快速检查是否有 frontmatter
    if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
      return {}
    }

    // 找到第二个 ---
    const startPos = content.indexOf('\n') + 1
    let endPos = content.indexOf('\n---\n', startPos)
    if (endPos === -1) {
      endPos = content.indexOf('\n---\r\n', startPos)
    }

    if (endPos === -1) {
      // frontmatter 可能被截断，读取更多内容
      await fileHandle.close()
      const fullContent = await readFile(filePath, 'utf-8')
      const match = fullContent.match(frontmatterRegex)
      if (!match) return {}
      return parseYMAL(match[1])
    }

    const yamlContent = content.slice(startPos, endPos)
    return parseYMAL(yamlContent)
  } finally {
    await fileHandle.close()
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

    // 生成站点统计信息
    await generateSiteStats(mdFiles)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

/**
 * 生成站点统计信息并写入 public/
 */
async function generateSiteStats(mdFiles) {
  console.log('\nGenerating site statistics...')

  try {
    const allPosts = []

    // 读取所有文章的 yaml frontmatter（优化：只读取 yaml 部分）
    for (const file of mdFiles) {
      const filePath = join(BLOG_DIR, file)
      // 只解析 frontmatter，不需要 body
      const data = await parseFrontmatterOnly(filePath)

      if (data.draft) continue // 跳过草稿

      allPosts.push(data)
    }

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

main()
