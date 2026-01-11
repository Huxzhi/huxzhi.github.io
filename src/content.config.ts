import { defineCollection, reference, z } from 'astro:content'
import { postsWithBacklinks } from './loaders/posts-with-backlinks'

const posts = defineCollection({
  loader: postsWithBacklinks({ pattern: '**/*.md', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      created: z.coerce.date().optional(), // Astro 5: 使用 date 类型
      updated: z.coerce.date().optional(), // Astro 5: 使用 date 类型
      createTime: z.number().optional(), // 向后兼容
      updateTime: z.number().optional(), // 向后兼容
      draft: z.boolean().default(false),
      cover: z
        .object({
          src: image().or(z.string()), // Astro 5: 支持图片优化
          alt: z.string().optional(),
        })
        .optional(),
      // 双向链接支持
      links: z.array(z.string()).optional().default([]), // 出链：本文引用的其他文章
      backlinks: z.array(z.string()).optional().default([]), // 反向链接：引用本文的其他文章
      relatedPosts: z.array(reference('posts')).optional(), // Astro 5: 使用 reference
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
