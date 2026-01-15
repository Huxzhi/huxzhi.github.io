// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'
import wikiLinkPlugin from 'remark-wiki-link'
import { fileURLToPath } from 'url'
import rehypeRemoveDuplicateH1 from './src/plugins/rehype-remove-duplicate-h1.ts'
import rehypeRenderTask from './src/plugins/rehype-render-task.ts'
import { remarkExtractTags } from './src/plugins/remark-extract-tags.ts'
import remarkTaskParser from './src/plugins/remark-task-parser.ts'

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.DEV ? 'server' : 'static',
  integrations: [],
  markdown: {
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
      rehypeRemoveDuplicateH1,
    ],
  },
  server: {
    host: true,
  },
  prefetch: true,
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // CodeMirror 相关依赖单独分块
            if (id.includes('codemirror') || id.includes('@codemirror')) {
              return 'codemirror'
            }
            // Node 模块单独分块
            if (id.includes('node_modules')) {
              // 较大的库单独分块
              if (id.includes('katex')) {
                return 'katex'
              }
              if (id.includes('rehype') || id.includes('remark')) {
                return 'markdown-processors'
              }
              // 其他依赖
              return 'vendor'
            }
          },
        },
      },
      chunkSizeWarningLimit: 600, // 提高警告阈值到 600 kB
    },
  },
})
