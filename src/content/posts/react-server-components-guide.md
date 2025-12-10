---
title: React Server Components 完全指南
tags: [react, nextjs, rsc, server-components]
createTime: 1733324400000
draft: false
---

# React Server Components 完全指南

## 什么是 React Server Components (RSC)

React Server Components 是 React 18 引入的革命性特性，允许组件在服务器端渲染并直接发送到客户端，**无需 JavaScript**。

### 传统 SSR vs RSC

#### 传统 SSR（Next.js 12 及之前）

```jsx
// pages/posts.jsx
export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getServerSideProps() {
  const posts = await fetchPosts()
  return { props: { posts } }
}
```

**流程**：

1. 服务器获取数据
2. 服务器渲染 HTML
3. 发送 HTML + JavaScript 到客户端
4. 客户端 Hydration（重新执行组件代码）

**问题**：即使组件不需要交互，也要发送和执行 JavaScript。

#### RSC（Next.js 13+ App Router）

```jsx
// app/posts/page.tsx
async function Posts() {
  const posts = await fetchPosts() // 直接在组件中获取数据

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default Posts
```

**流程**：

1. 服务器渲染组件
2. 发送渲染结果（不包含组件代码）
3. 客户端直接显示，**无需 Hydration**

**优势**：

- ✅ 零 JavaScript（静态内容）
- ✅ 更小的 Bundle
- ✅ 更快的首次渲染
- ✅ 直接访问后端资源（数据库、文件系统）

## Server Components vs Client Components

### Server Components（默认）

```tsx
// app/components/Posts.tsx
// 默认是 Server Component（无需标记）

async function Posts() {
  // ✅ 可以直接访问数据库
  const posts = await db.posts.findMany()

  // ✅ 可以读取文件系统
  const config = await fs.readFile('config.json')

  // ✅ 可以使用后端专属的库
  const bcrypt = require('bcrypt')

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

**特点**：

- ✅ 可以是 async 函数
- ✅ 可以直接访问后端资源
- ✅ 不会发送到客户端（0 JS）
- ❌ 不能使用 useState、useEffect 等 Hooks
- ❌ 不能使用浏览器 API
- ❌ 不能添加事件处理器

### Client Components

```tsx
'use client' // ← 必须在文件顶部声明

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

**特点**：

- ✅ 可以使用所有 React Hooks
- ✅ 可以使用浏览器 API
- ✅ 可以添加交互
- ❌ 不能是 async 函数
- ❌ 会发送到客户端（增加 Bundle）

## 组合使用

### 在 Server Component 中使用 Client Component

```tsx
// app/page.tsx (Server Component)
import { ClientCounter } from './ClientCounter'

async function Page() {
  const initialCount = await getCountFromDB()

  return (
    <div>
      <h1>欢迎</h1>
      {/* Server Component 可以直接使用 Client Component */}
      <ClientCounter initialCount={initialCount} />
    </div>
  )
}
```

```tsx
// app/ClientCounter.tsx (Client Component)
'use client'

import { useState } from 'react'

export function ClientCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

### ❌ 不能在 Client Component 中直接使用 Server Component

```tsx
'use client'

import { ServerPosts } from './ServerPosts' // ❌ 错误！

export function ClientPage() {
  return (
    <div>
      <ServerPosts /> {/* ❌ 不允许 */}
    </div>
  )
}
```

### ✅ 正确做法：通过 children 传递

```tsx
// app/layout.tsx (Server Component)
import { ClientLayout } from './ClientLayout'
import { ServerSidebar } from './ServerSidebar'

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {/* Server Component 作为 children 传入 */}
      <ServerSidebar />
      {children}
    </ClientLayout>
  )
}
```

```tsx
// app/ClientLayout.tsx (Client Component)
'use client'

export function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={sidebarOpen ? 'sidebar-open' : ''}>
      {children} {/* 渲染 Server Component */}
    </div>
  )
}
```

## 数据获取

### 在 Server Component 中直接获取数据

```tsx
// app/posts/[id]/page.tsx
async function PostPage({ params }: { params: { id: string } }) {
  // 直接在组件中 await
  const post = await db.posts.findUnique({
    where: { id: params.id },
  })

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### 并行数据获取

```tsx
async function PostPage({ params }: { params: { id: string } }) {
  // 并行获取多个数据
  const [post, comments, author] = await Promise.all([
    fetchPost(params.id),
    fetchComments(params.id),
    fetchAuthor(params.id),
  ])

  return (
    <article>
      <h1>{post.title}</h1>
      <Author data={author} />
      <Content data={post.content} />
      <Comments data={comments} />
    </article>
  )
}
```

### 流式渲染（Streaming）

```tsx
import { Suspense } from 'react'

async function PostPage({ params }) {
  // 快速获取的数据
  const post = await fetchPost(params.id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* 慢速数据用 Suspense 包裹 */}
      <Suspense fallback={<div>加载评论中...</div>}>
        <Comments postId={params.id} />
      </Suspense>

      <Suspense fallback={<div>加载推荐中...</div>}>
        <RecommendedPosts postId={params.id} />
      </Suspense>
    </article>
  )
}

async function Comments({ postId }) {
  // 慢速查询
  const comments = await fetchComments(postId)

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  )
}
```

**效果**：

1. 立即渲染文章内容
2. 评论和推荐异步加载
3. 用户可以立即开始阅读

## 实战案例

### 案例 1：博客首页

```tsx
// app/page.tsx
async function HomePage() {
  const posts = await fetchPosts()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">我的博客</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>

            {/* Client Component：点赞按钮 */}
            <LikeButton
              postId={post.id}
              initialLikes={post.likes}
            />
          </article>
        ))}
      </div>
    </div>
  )
}
```

```tsx
// app/LikeButton.tsx
'use client'

import { useState } from 'react'

export function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    if (liked) return

    await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
    setLikes(likes + 1)
    setLiked(true)
  }

  return (
    <button
      onClick={handleLike}
      className={liked ? 'text-red-500' : 'text-gray-500'}
    >
      ❤️ {likes}
    </button>
  )
}
```

**结果**：

- 文章列表：Server Component（0 JS）
- 点赞按钮：Client Component（少量 JS）

### 案例 2：用户 Dashboard

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'

async function Dashboard() {
  // 快速获取用户信息
  const user = await getCurrentUser()

  return (
    <div>
      <header>
        <h1>欢迎，{user.name}</h1>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {/* 立即显示 */}
        <UserProfile user={user} />

        {/* 异步加载 */}
        <Suspense fallback={<Skeleton />}>
          <RecentOrders userId={user.id} />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <Analytics userId={user.id} />
        </Suspense>
      </div>
    </div>
  )
}

async function RecentOrders({ userId }) {
  const orders = await fetchRecentOrders(userId)

  return (
    <div>
      <h2>最近订单</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 性能对比

### 传统 SSR

```
服务器渲染 → 发送 HTML (50 KB)
              + JavaScript (200 KB)

客户端：
1. 下载 HTML + JS
2. 解析 JavaScript
3. Hydration
4. 可交互

总时间：3.5s
```

### RSC

```
服务器渲染 → 发送结果 (30 KB)
              + 少量 JS (15 KB，仅交互组件)

客户端：
1. 下载并显示
2. 可交互（仅交互组件需要 JS）

总时间：0.8s ⚡（快 4.4 倍）
```

## 最佳实践

### 1. 默认使用 Server Component

```tsx
// ✅ 默认是 Server Component
async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ❌ 不要无脑添加 'use client'
// 'use client'
// function Page() { ... }
```

### 2. 将 'use client' 尽可能下推

```tsx
// ❌ 不好：整个页面都是 Client Component
'use client'

function Page() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Content />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}
```

```tsx
// ✅ 好：只有按钮是 Client Component
function Page() {
  return (
    <div>
      <Header /> {/* Server Component */}
      <Content /> {/* Server Component */}
      <Counter /> {/* Client Component */}
    </div>
  )
}

// Counter.tsx
;('use client')
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 3. 使用 Suspense 优化加载体验

```tsx
// ✅ 慢速数据用 Suspense 包裹
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

## 总结

React Server Components 核心要点：

1. **Server Component（默认）**：

   - 在服务器渲染，0 JavaScript
   - 可以直接访问后端资源
   - 不能使用 Hooks 和事件

2. **Client Component（`'use client'`）**：

   - 在客户端运行，包含 JavaScript
   - 可以使用 Hooks 和事件
   - 适用于交互组件

3. **组合规则**：

   - Server Component 可以使用 Client Component
   - Client Component 通过 `children` 接收 Server Component

4. **性能优势**：
   - Bundle 体积减少 70-90%
   - 首次渲染快 3-5 倍
   - 流式渲染提升用户体验

RSC 是 React 的未来，Next.js 13+ App Router 已全面拥抱这一特性。
