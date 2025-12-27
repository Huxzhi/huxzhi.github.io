// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import wikiLinkPlugin from 'remark-wiki-link'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { fileURLToPath } from 'url'
import rehypeRenderTask from './src/plugins/rehype-render-task.ts'
import { remarkExtractTags } from './src/plugins/remark-extract-tags.ts'
import remarkTaskParser from './src/plugins/remark-task-parser.ts'

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.DEV ? 'server' : 'static',
  integrations: [],
  markdown: {
    // 保持 GFM 启用（默认行为），我们的插件会在其后运行
    remarkPlugins: [
      remarkMath,
      remarkExtractTags,
      remarkTaskParser, // 在 GFM 之后处理，增强任务列表
      [
        wikiLinkPlugin,
        {
          permalinks: [],
          pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
          hrefTemplate: (permalink) => `/post/${permalink}`,
          wikiLinkClassName: 'wiki-link',
          newClassName: 'wiki-link-new',
          aliasDivider: '|',
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
      rehypeKatex,
      rehypeRenderTask,
    ],
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'urodele.config': fileURLToPath(
          new URL('./urodele.config.ts', import.meta.url),
        ),
      },
    },
  },
})
