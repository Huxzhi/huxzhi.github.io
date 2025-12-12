---
title: Untitled
tags: []
createTime: 1765517244554
updateTime: 1765517244554
draft: false
---
这是一个创新的架构：利用 Astro 生成纯静态网页，通过 CodeMirror 提供编辑器，结合 GitHub API 实现内容的动态修改和存储。

## 架构概览 gregr egr fgr  

```
┌─────────────────────────────────────────────────────────────┐
│                       用户浏览器                              │
├─────────────────────────────────────────────────────────────┤
│  静态页面 (Astro)  →  编辑器 (CodeMirror)  →  GitHub API    │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    GitHub Repository
                 (存储 Markdown 文件)
                            ↓
                    GitHub Actions
                  (自动触发 Astro 构建)
                            ↓
                      重新部署网站
```

## 核心技术栈
#个翁/反而问

#跟fgdf 


```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'static',@ #等我
  vite: {
    plugins: [tailwindcss()],
  },
})
```

**优势**：

- 生成纯 HTML，加载速度极快
- Content Collections 提供类型安全
- 支持混合使用任何前端框架

### 2. CodeMirror 6 - 现代代码编辑器

```typescript
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'

const editor = new EditorView({
  doc: '# Hello World',
  extensions: [
    basicSetup,
    markdown(),
    EditorView.theme({
      '&': { height: '100%' },
      '.cm-content': { fontFamily: 'monospace' },
    }),
  ],
  parent: document.getElementById('editor'),
})
```

**特点**：

- 轻量级、高性能
- 完整的 Markdown 语法高亮
- 实时预览支持
- 移动端友好

### 3. Tailwind CSS 4 - 样式方案

```css
/* src/styles.css */
@import 'tailwindcss';
@plugin "@tailwindcss/typography";

@theme {
  --color-primary: #409eff;
}
```

**Prose 类**用于 Markdown 渲染：

```html
<div class="prose dark:prose-invert max-w-none">
  <content />
</div>
```

### 4. GitHub API - 内容存储

```typescript
import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: 'your_personal_access_token',
})

// 保存文章到 GitHub
async function savePost(filename: string, content: string) {
  const response = await octokit.rest.repos.createOrUpdateFileContents({
    owner: 'your-username',
    repo: 'your-repo',
    path: `src/content/posts/${filename}`,
    message: `Update post: ${filename}`,
    content: btoa(unescape(encodeURIComponent(content))),
    sha: await getFileSha(filename), // 如果文件存在，需要 SHA
  })
  return response
}

// 读取文章
async function getPost(filename: string) {
  const response = await octokit.rest.repos.getContent({
    owner: 'your-username',
    repo: 'your-repo',
    path: `src/content/posts/${filename}`,
  })

  if ('content' in response.data) {
    return decodeURIComponent(escape(atob(response.data.content)))
  }
}
```

## 完整实现流程

### 步骤 1：创建 Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    createTime: z.number(),
    updateTime: z.number().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { posts }
```

### 步骤 2：构建文章列表页面

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content'

const posts = await getCollection('posts')
const sortedPosts = posts.sort((a, b) =>
  b.data.createTime - a.data.createTime
)
---

<div class="max-w-4xl mx-auto p-4">
  {sortedPosts.map(post => (
    <article class="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-2">
        <a href={`/post/${post.id}`} class="hover:text-blue-600">
          {post.data.title}
        </a>
      </h2>
      <div class="flex gap-2 mb-4">
        {post.data.tags.map(tag => (
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  ))}
</div>
```

### 步骤 3：构建编辑器页面

```astro
---
// src/pages/edit/[id].astro
import { getEntry } from 'astro:content'

const { id } = Astro.params
const post = id ? await getEntry('posts', id) : null
---

<div class="h-screen flex flex-col">
  <header class="bg-gray-800 text-white p-4 flex justify-between">
    <h1 class="text-xl font-bold">编辑文章</h1>
    <button id="save-btn" class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
      保存到 GitHub
    </button>
  </header>

  <div class="flex-1 grid grid-cols-2 gap-4 p-4">
    <div id="editor-container" class="border rounded"></div>
    <div id="preview" class="border rounded p-4 prose max-w-none overflow-auto"></div>
  </div>
</div>

<script>
  import { EditorView, basicSetup } from 'codemirror'
  import { markdown } from '@codemirror/lang-markdown'
  import { oneDark } from '@codemirror/theme-one-dark'

  const initialContent = document.getElementById('initial-content')?.textContent || ''

  let editorView = new EditorView({
    doc: initialContent,
    extensions: [
      basicSetup,
      markdown(),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          updatePreview(update.state.doc.toString())
        }
      })
    ],
    parent: document.getElementById('editor-container')
  })

  function updatePreview(content: string) {
    // 简单的 Markdown 预览（实际应使用 marked 或 remark）
    const preview = document.getElementById('preview')
    if (preview) {
      preview.innerHTML = content
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    }
  }

  // 保存到 GitHub
  document.getElementById('save-btn')?.addEventListener('click', async () => {
    const content = editorView.state.doc.toString()

    const response = await fetch('/api/save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: window.location.pathname.split('/').pop() + '.md',
        content: content
      })
    })

    if (response.ok) {
      alert('保存成功！GitHub Actions 将自动重新构建网站')
    }
  })
</script>
```

### 步骤 4：创建 GitHub API 端点

```typescript
// src/pages/api/save-post.ts
import type { APIRoute } from 'astro'
import { Octokit } from 'octokit'

export const POST: APIRoute = async ({ request }) => {
  const { filename, content } = await request.json()

  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN,
  })

  try {
    // 获取文件当前的 SHA（如果存在）
    let sha: string | undefined
    try {
      const existing = await octokit.rest.repos.getContent({
        owner: import.meta.env.GITHUB_OWNER,
        repo: import.meta.env.GITHUB_REPO,
        path: `src/content/posts/${filename}`,
      })
      if ('sha' in existing.data) {
        sha = existing.data.sha
      }
    } catch (e) {
      // 文件不存在，创建新文件
    }

    // 创建或更新文件
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: import.meta.env.GITHUB_OWNER,
      repo: import.meta.env.GITHUB_REPO,
      path: `src/content/posts/${filename}`,
      message: `Update: ${filename}`,
      content: btoa(unescape(encodeURIComponent(content))),
      sha,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
```

### 步骤 5：配置环境变量

```bash
# .env
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
```

### 步骤 6：设置 GitHub Actions 自动部署

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm run build
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v2
```

## 工作流程

1. **编辑内容**：用户在浏览器中通过 CodeMirror 编辑 Markdown
2. **保存到 GitHub**：点击保存按钮，内容通过 GitHub API 推送到仓库
3. **触发构建**：GitHub 检测到文件变化，自动触发 Actions
4. **Astro 构建**：Actions 运行 `pnpm run build`，生成静态网站
5. **自动部署**：构建完成后，自动部署到 GitHub Pages
6. **内容更新**：几分钟后，新内容在网站上可见

## 安全考虑

### 1. 认证机制

```typescript
// src/middleware.ts
import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = async (context, next) => {
  // 检查用户是否已登录
  const token = context.cookies.get('auth_token')

  if (context.url.pathname.startsWith('/edit') && !token) {
    return context.redirect('/login')
  }

  return next()
}
```

### 2. 使用 GitHub OAuth

```typescript
// 用户通过 GitHub OAuth 登录
const githubAuth = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`

// 回调处理
export const GET: APIRoute = async ({ url, cookies }) => {
  const code = url.searchParams.get('code')

  // 交换 access token
  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    },
  )

  const { access_token } = await tokenResponse.json()

  // 存储 token（加密）
  cookies.set('github_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })

  return Response.redirect('/edit')
}
```

## 性能优化

### 1. 增量构建

只重新构建修改的文章：

```yaml
- name: Get changed files
  id: changed-files
  uses: tj-actions/changed-files@v40

- name: Build only changed posts
  if: steps.changed-files.outputs.any_changed == 'true'
  run: |
    echo "Changed files: ${{ steps.changed-files.outputs.all_changed_files }}"
    pnpm run build:incremental
```

### 2. 缓存策略

```typescript
// 缓存 GitHub API 响应
const cache = new Map()

async function getCachedPost(id: string) {
  if (cache.has(id)) {
    return cache.get(id)
  }

  const post = await fetchFromGitHub(id)
  cache.set(id, post)

  return post
}
```

## 优势总结

✅ **纯静态网站**：SEO 友好，加载速度快  
✅ **动态编辑**：无需本地环境，任何设备可编辑  
✅ **版本控制**：Git 自动记录所有修改历史  
✅ **免费托管**：GitHub Pages 免费无限流量  
✅ **自动部署**：推送即发布，无需手动操作  
✅ **类型安全**：TypeScript + Content Collections  
✅ **现代编辑器**：CodeMirror 6 提供专业体验

## 扩展功能

- 📸 图片上传（使用 GitHub API 或 Cloudinary）
- 🏷️ 标签自动补全
- 📊 文章统计（字数、阅读时间）
- 🔍 全文搜索（使用 Pagefind）
- 💬 评论系统（giscus）
- 📱 PWA 支持
- 🌓 深色模式

这就是一个完整的"动态静态博客"架构！结合了静态网站的性能优势和动态网站的编辑便利性。
