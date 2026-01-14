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
 * 标准化时间字符串为目标格式: YYYY-MM-DDTHH:mm
 */
function normalizeDateTime(dateStr) {
  if (!dateStr) return null

  try {
    let date

    // 处理格式: 2025-11-23'T'21:00
    if (typeof dateStr === 'string' && dateStr.includes("'T'")) {
      const cleanStr = dateStr.replace(/'T'/g, 'T')
      date = new Date(cleanStr)
    }
    // 处理时间戳
    else if (typeof dateStr === 'number' || !isNaN(Number(dateStr))) {
      date = new Date(Number(dateStr))
    }
    // 处理标准 ISO 字符串
    else {
      date = new Date(dateStr)
    }

    if (!isNaN(date.getTime())) {
      // 格式化为 YYYY-MM-DDTHH:mm
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${year}-${month}-${day}T${hours}:${minutes}`
    }
  } catch (e) {
    console.warn(`Invalid date format: ${dateStr} ${e.message}`)
  }

  return null
}

/**
 * 处理单个文件
 */
async function processFileYaml(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8')
    const match = content.match(frontmatterRegex)

    if (!match) {
      return { data: {}, content }
    }

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

    // 2. 从 body 提取标签并展平
    const extractedTags = extractTagsFromBody(trimmedBody)

    // 3. 展平自带的标签
    const existingTags = expandTags(data.tags || [])

    // 4. 合并去重
    data.tags = [...new Set([...extractedTags, ...existingTags])]

    // 计算字数并添加到 frontmatter
    const wordCount = (body || '').replace(/\s+/g, '').length
    data.wordCount = wordCount

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

      const id = file.replace(/\.md$/, '')
      const tags = data.tags || []

      allPosts.push({
        id,
        title: data.title || id,
        slug: data.slug || generateSlug(id),
        tags,
        category: data.category || '未分类',
        wordCount: data.wordCount || 0,
        created: new Date(data.created).getTime() || Date.now(),
        updated: new Date(data.updated).getTime() || Date.now(),
        description: data.description || '',
        draft: !!data.draft,
      })
    }

    const totalPosts = allPosts.length

    // Tags
    const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].filter(
      Boolean,
    )
    const tagCounts = allTags
      .map((tag) => ({
        tag,
        count: allPosts.filter((p) => p.tags.includes(tag)).length,
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
