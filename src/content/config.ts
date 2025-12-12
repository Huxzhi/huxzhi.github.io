import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './posts' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(), // 新增分类字段
    created: z.string().optional(), // 新格式：YYYY-MM-DDTHH:mm
    updated: z.string().optional(), // 新格式：YYYY-MM-DDTHH:mm
    createTime: z.number().optional(), // 旧格式：保持向后兼容
    updateTime: z.number().optional(), // 旧格式：保持向后兼容
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
  }),
})

export const collections = { posts }
