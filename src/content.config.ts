import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { postLoader } from './plugins/loader-posts'

/**
 * Posts Collection
 * 使用自定义 postLoader 加载 Markdown 文件
 * 自动计算双向链接（inLinks/outLinks）
 */
const posts = defineCollection({
  loader: postLoader({ base: './src/content/post' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional().default('未分类'),
      created: z.string().optional(), // 使用字符串格式 YYYY-MM-DDTHH:mm
      updated: z.string().optional(),
      draft: z.boolean().default(false),
      cover: z
        .object({
          src: image().or(z.string()),
          alt: z.string().optional(),
        })
        .optional(),
      link: z.string().optional(),
      wordCount: z.number().optional().default(0),
      // 双向链接支持
      outLinks: z.array(z.string()).optional().default([]), // 出链：本文引用的其他文章
      inLinks: z.array(z.string()).optional().default([]), // 反向链接：引用本文的其他文章
      aliases: z.array(z.string()).optional().default([]), // 别名列表
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

export const collections = { posts }
