import { parseFrontmatter } from '@/utils/frontmatter'
import { defineCollection, z } from 'astro:content'
import fs from 'fs/promises'
import GithubSlugger from 'github-slugger'
import path from 'path'

const slugger = new GithubSlugger()

const posts = defineCollection({
  loader: async () => {
    const blogDir = path.join(process.cwd(), 'src/blog')

    // 递归获取所有 .md 文件路径
    const getFiles = async (dir: string): Promise<string[]> => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      const files = await Promise.all(
        entries.map(async (entry) => {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            return getFiles(fullPath)
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            return [fullPath]
          }
          return []
        }),
      )
      return files.flat()
    }

    const filePaths = await getFiles(blogDir)

    // 处理每个文件
    const enrichedFiles = await Promise.all(
      filePaths.map(async (filePath) => {
        // 获取文件统计信息
        const stats = await fs.stat(filePath)
        // 读取文件内容
        const fileContent = await fs.readFile(filePath, 'utf-8')
        // 解析 frontmatter 和 body
        const { data: frontmatter, content: body } =
          parseFrontmatter(fileContent)

        // 生成相对 ID（相对于 blogDir）
        const relativePath = path.relative(blogDir, filePath)

        // 增加兼容性：检查 birthtime 是否可靠（在某些系统上可能等于 mtime 或不可用）
        const isBirthtimeReliable =
          stats.birthtime.getTime() !== stats.mtime.getTime() &&
          stats.birthtime.getTime() > 0
        const fileCreated = isBirthtimeReliable
          ? stats.birthtime.toISOString()
          : null // 如果不可靠，设为 null

        const slug = slugger.slug(relativePath)

        return {
          id: slug, // 唯一标识符
          data: {
            // 从文件路径计算的属性
            path: relativePath, // 相对路径
            slug, // 生成的 slug

            // 从文件内容计算的属性
            wordCount: body.split(/\s+/).length, // 词数
            body, // 正文

            // 从 YAML frontmatter 获取的属性
            ...frontmatter, // 包括 title, aliases, tags, category, created, updated, draft, cover, tasks 等

            // 从文件系统计算的属性
            fileSize: stats.size, // 文件大小 (bytes)
            fileCreated, // 创建时间（兼容性检查，可能为 null）
            fileUpdated: stats.mtime.toISOString(), // 修改时间
          },
        }
      }),
    )

    return enrichedFiles
  },

  schema: z.object({
    title: z.string(),
    path: z.string(),
    slug: z.string(),
    aliases: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(), // 新增分类字段
    created: z.string().optional(), // 新格式：YYYY-MM-DDTHH:mm
    updated: z.string().optional(), // 新格式：YYYY-MM-DDTHH:mm
    draft: z.boolean().default(false),
    cover: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
    tasks: z
      .array(
        z.object({
          status: z.string(),
          checked: z.boolean(),
          completed: z.boolean(),
          visual: z.string(),
          metadata: z.array(
            z.object({
              key: z.string(),
              value: z.string(),
              start: z.number(),
              end: z.number(),
            }),
          ),
          line: z.number(),
          symbol: z.string(),
        }),
      )
      .optional()
      .default([]),
    wordCount: z.number().optional(),
    body: z.string().optional(), // 添加 body
    fileSize: z.number().optional(), // 文件大小
    fileCreated: z.string().nullable().optional(), // 创建时间（可能为 null）
    fileUpdated: z.string().optional(), // 修改时间
  }),
})

export const collections = { posts }
