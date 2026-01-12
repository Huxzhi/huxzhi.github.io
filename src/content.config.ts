import { glob } from 'astro/loaders'
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

export const collections = { posts }
