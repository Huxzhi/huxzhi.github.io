import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(), // 新增分类字段
    createTime: z.number(),
    updateTime: z.number().optional(),
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
