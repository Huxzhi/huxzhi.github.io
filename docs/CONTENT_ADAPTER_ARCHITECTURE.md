# 内容访问层架构说明

## 概述

项目采用**双层适配器模式**来支持开发和生产环境的不同数据源：

```
┌─────────────────────────────────────────────────────────┐
│                      应用层                              │
│  (页面组件、API 路由)                                    │
└─────────────────────────────────────────────────────────┘
                         ↓
         ┌───────────────┴───────────────┐
         ↓                               ↓
┌──────────────────┐           ┌──────────────────┐
│  服务端访问层     │           │  客户端访问层     │
│ (SSR/SSG)        │           │  (编辑器)        │
└──────────────────┘           └──────────────────┘
         ↓                               ↓
  src/adapter/content.ts        src/adapter/index.ts
         ↓                               ↓
  Astro Content API              ┌──────┴──────┐
         ↓                       ↓             ↓
  src/content/posts/      FSAdapter     GithubAdapter
                               ↓             ↓
                          本地 API      GitHub API
```

## 架构组成

### 1. 服务端内容访问层 (`src/adapter/content.ts`)

**用途**: SSR/SSG 页面渲染时访问内容

**特点**:

- 统一封装 Astro Content Collections API
- 提供类型安全的查询方法
- 便于未来切换数据源（如从 GitHub API 直接读取）

**核心方法**:

```typescript
getAllPosts() // 获取所有文章
getPostById(id) // 获取单篇文章
getPostsByTag(tag) // 按标签过滤
getPostsByCategory(cat) // 按分类过滤
getAllTags() // 获取所有标签
getAllCategories() // 获取所有分类
toPageData(entry) // 转换为统一格式
```

**使用场景**:

- Astro 页面组件 (`.astro` 文件)
- API 路由 (`/api/**/*.ts`)
- 静态生成 (SSG)

### 2. 客户端编辑器访问层 (`src/adapter/index.ts`)

**用途**: 浏览器端编辑器的 CRUD 操作

**环境切换**:

```typescript
const adapter = import.meta.env.DEV ? FSAdapter : GithubAdapter
```

**适配器对比**:

| 功能 | FSAdapter (开发)        | GithubAdapter (生产) |
| ---- | ----------------------- | -------------------- |
| 读取 | `GET /api/post/[id]`    | GitHub API           |
| 保存 | `POST /api/post/[id]`   | GitHub API           |
| 删除 | `DELETE /api/post/[id]` | GitHub API           |
| 认证 | 无需                    | GitHub Token         |

**核心方法**:

```typescript
readPageByPath(path) // 读取文章
writePage(path, data, assets) // 保存文章
deletePageByPath(path, assets) // 删除文章
```

## 数据流

### 开发环境

```
编辑器 → FSAdapter → 本地 API → 本地文件系统
          ↓
      读/写 .md 文件
          ↓
  Astro Content Collections
          ↓
      页面渲染
```

### 生产环境

```
页面渲染:
  Astro → content.ts → Content Collections → 本地 .md 文件

编辑器:
  编辑器 → GithubAdapter → GitHub API → GitHub 仓库
```

## 优势

### ✅ 统一接口

- 应用层代码不关心具体数据源
- 便于切换实现

### ✅ 类型安全

- 统一的 `PageData` 类型
- TypeScript 全链路支持

### ✅ 环境隔离

- 开发环境使用本地文件系统，快速迭代
- 生产环境直接操作 GitHub，无需部署

### ✅ 可扩展

- 未来可添加其他数据源（CMS、数据库等）
- 只需实现相同接口

## 使用示例

### 在 Astro 页面中使用

```astro
---
import { getAllPosts } from '@/adapter/content'

// 获取所有已发布的文章
const allPosts = await getAllPosts()
const publishedPosts = allPosts.filter(p => !p.data.draft)
---

<div>
  {publishedPosts.map(post => (
    <article>
      <h2>{post.data.title}</h2>
      <p>{post.body.slice(0, 100)}...</p>
    </article>
  ))}
</div>
```

### 在 API 路由中使用

```typescript
import { getPostById, toPageData } from '@/adapter/content'

export const GET: APIRoute = async ({ params }) => {
  const post = await getPostById(params.id!)
  if (!post) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }
  return new Response(JSON.stringify(toPageData(post)))
}
```

### 在编辑器中使用

```typescript
import adapter from '@/adapter'

// 读取文章
const post = await adapter.readPageByPath('my-post')

// 保存文章
await adapter.writePage(
  'my-post',
  {
    content: '# Hello',
    title: 'My Post',
    tags: ['tech'],
    createTime: Date.now(),
    draft: false,
  },
  [],
)
```

## 未来扩展方向

### 方案 1: 生产环境也使用 GitHub API 渲染

```typescript
// src/adapter/content.ts
export async function getAllPosts() {
  if (import.meta.env.PROD && USE_GITHUB_API) {
    // 从 GitHub API 读取
    return fetchPostsFromGitHub()
  }
  // 默认使用 Content Collections
  return await getCollection('posts')
}
```

### 方案 2: 支持多数据源

```typescript
// src/adapter/content.ts
const dataSource = import.meta.env.DATA_SOURCE // 'local' | 'github' | 'cms'

export async function getAllPosts() {
  switch (dataSource) {
    case 'github':
      return await fetchFromGitHub()
    case 'cms':
      return await fetchFromCMS()
    default:
      return await getCollection('posts')
  }
}
```

### 方案 3: 混合模式

```typescript
// 构建时从 GitHub 拉取，运行时使用本地缓存
export async function getAllPosts() {
  if (import.meta.env.BUILD_TIME) {
    await syncFromGitHub() // 构建时同步
  }
  return await getCollection('posts') // 运行时读取本地
}
```

## 注意事项

1. **生产环境限制**: 当前生产环境页面渲染仍依赖本地 `src/content/posts/` 文件
2. **编辑器独立**: 编辑器在生产环境直接操作 GitHub，不影响已部署的页面
3. **数据一致性**: 需要在部署时确保 GitHub 仓库和部署的文件同步
4. **认证管理**: GitHub 适配器需要用户提供有效的 Personal Access Token

## 相关文件

- `src/adapter/content.ts` - 服务端内容访问层
- `src/adapter/index.ts` - 客户端适配器选择器
- `src/adapter/fs/index.ts` - 本地文件系统适配器
- `src/adapter/github/index.ts` - GitHub API 适配器
- `src/adapter/helper.ts` - 类型定义
- `src/shared/type.ts` - 数据模型定义
