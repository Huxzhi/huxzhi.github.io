import { file, glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      created: z.coerce.date().optional(), // Astro 5: 使用 date 类型
      updated: z.coerce.date().optional(), // Astro 5: 使用 date 类型
      draft: z.boolean().default(false),
      cover: z
        .object({
          src: image().or(z.string()), // Astro 5: 支持图片优化
          alt: z.string().optional(),
        })
        .optional(),
      link: z.string().optional(), // 完整路由链接
      // 双向链接支持
      outlinks: z.array(z.string()).optional().default([]), // 出链：本文引用的其他文章
      inlinks: z.array(z.string()).optional().default([]), // 反向链接：引用本文的其他文章
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
    }),
})

/**
 * PostsYaml Collection
 * 从 preprocess-content.mjs 预处理生成的 posts-yaml.json 加载
 * 包含所有文章的元数据、双向链接和别名信息
 */
const postsYaml = defineCollection({
  loader: file('public/posts-yaml.json', {
    parser: (text) => JSON.parse(text).posts,
  }),
  schema: z.object({
    /** 文章标题 */
    title: z.string(),
    /** URL slug，用于生成文章链接 */
    slug: z.string(),
    /** 文章标签列表 */
    tags: z.array(z.string()).optional().default([]),
    /** 文章分类 */
    category: z.string().optional().default('未分类'),
    /** 创建时间（格式：YYYY-MM-DDTHH:mm） */
    created: z.string().optional(),
    /** 更新时间（格式：YYYY-MM-DDTHH:mm） */
    updated: z.string().optional(),
    /** 是否为草稿 */
    draft: z.boolean().default(false),
    /** 字数统计 */
    wordCount: z.number().optional().default(0),
    /** 出站链接：本文引用的其他文章或外部链接 */
    outLinks: z.array(z.string()).optional().default([]),
    /** 反向链接：引用本文的其他文章的 slug 列表 */
    inLinks: z.array(z.string()).optional().default([]),
    /** 别名列表：包含文件名等可用于链接匹配的别名 */
    aliases: z.array(z.string()).optional().default([]),
  }),
})

export const collections = { posts, postsYaml }
