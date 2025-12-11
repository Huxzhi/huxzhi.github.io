---
title: Astro Islands 架构深度解析
tags: [astro, architecture, performance, frontend]
category: 技术向
createTime: 1733670000000
draft: false
---

# Astro Islands 架构深度解析

## 什么是 Islands 架构

Islands Architecture（群岛架构）是一种创新的前端架构模式，由 Astro 团队推广并实践。它的核心理念是：**页面大部分是静态 HTML，只有少量交互组件需要 JavaScript**。

```
┌─────────────────────────────────────────┐
│        静态 HTML（大陆）                  │
│  ┌──────┐       ┌────────┐              │
│  │组件1 │       │ 组件2  │  ← Islands   │
│  │(JS)  │       │ (JS)   │              │
│  └──────┘       └────────┘              │
│                                         │
│           ┌─────────┐                   │
│           │ 组件3   │                   │
│           │ (JS)    │                   │
│           └─────────┘                   │
└─────────────────────────────────────────┘
```

## 传统 SPA vs Islands

### 传统 SPA（如 React）

```javascript
// 整个页面都需要 JavaScript
import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </>
  )
}

// 所有组件都会被打包到 bundle.js
// 用户必须下载并执行所有 JavaScript 才能看到页面
```

**问题**：

- 📦 Bundle 体积大（通常 > 200KB）
- ⏱️ 首次渲染慢（需要下载并执行 JS）
- 🔍 SEO 不友好（客户端渲染）

### Astro Islands

```astro
---
// 只有需要交互的组件才加载 JS
import Header from '../components/Header.astro'  // 静态 HTML
import Sidebar from '../components/Sidebar.astro'  // 静态 HTML
import InteractiveSearch from '../components/Search.tsx'  // 需要 JS
import Content from '../components/Content.astro'  // 静态 HTML
import Footer from '../components/Footer.astro'  // 静态 HTML
---

<Header />
<Sidebar />

<!-- 只有这个组件会发送 JavaScript -->
<InteractiveSearch client:load />

<Content />
<Footer />
```

**优势**：

- ✅ 大部分页面是纯 HTML（0 JS）
- ✅ 只为需要交互的组件加载 JS
- ✅ 首次渲染极快
- ✅ SEO 完美

## 客户端指令

Astro 提供多种指令控制组件何时加载 JavaScript：

### `client:load`

```astro
<!-- 页面加载时立即加载 JS -->
<Counter client:load />
```

**使用场景**：关键交互（搜索框、登录表单）

### `client:idle`

```astro
<!-- 浏览器空闲时加载 JS -->
<Comments client:idle />
```

**使用场景**：非关键交互（评论区、推荐内容）

### `client:visible`

```astro
<!-- 组件进入视口时加载 JS -->
<HeavyChart client:visible />
```

**使用场景**：页面下方的组件（图表、视频播放器）

### `client:media`

```astro
<!-- 媒体查询匹配时加载 JS -->
<MobileMenu client:media="(max-width: 768px)" />
```

**使用场景**：响应式组件

### `client:only`

```astro
<!-- 仅在客户端渲染（跳过 SSR） -->
<BrowserOnlyWidget client:only="react" />
```

**使用场景**：依赖浏览器 API 的组件

## 实战案例：博客页面优化

### 优化前（传统 React SPA）

```jsx
// App.jsx - 整个页面都需要 JavaScript
import { useState, useEffect } from 'react'
import Header from './Header'
import PostList from './PostList'
import Sidebar from './Sidebar'
import SearchBox from './SearchBox'
import ThemeSwitcher from './ThemeSwitcher'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then(setPosts)
  }, [])

  return (
    <>
      <Header>
        <SearchBox />
        <ThemeSwitcher
          theme={theme}
          setTheme={setTheme}
        />
      </Header>
      <PostList posts={posts} />
      <Sidebar />
    </>
  )
}
```

**性能指标**：

- Bundle 大小：320KB
- FCP (First Contentful Paint)：2.1s
- TTI (Time to Interactive)：3.8s

### 优化后（Astro Islands）

```astro
---
// index.astro - 大部分是静态 HTML
import { getCollection } from 'astro:content'
import Header from '../components/Header.astro'
import PostList from '../components/PostList.astro'
import Sidebar from '../components/Sidebar.astro'
import SearchBox from '../components/SearchBox.tsx'
import ThemeSwitcher from '../components/ThemeSwitcher.tsx'

const posts = await getCollection('posts')
---

<Header>
  <!-- 只有交互组件加载 JS -->
  <SearchBox client:load />
  <ThemeSwitcher client:idle />
</Header>

<!-- 静态 HTML，0 JavaScript -->
<PostList posts={posts} />
<Sidebar />
```

**性能指标**：

- Bundle 大小：15KB（仅搜索框 + 主题切换器）
- FCP：0.3s ⚡
- TTI：0.8s ⚡

**提升**：

- 📉 JS 体积减少 95%
- 🚀 FCP 快 7 倍
- ⚡ TTI 快 4.7 倍

## 框架无关

Astro Islands 支持混用多个框架：

```astro
---
import ReactCounter from './Counter.react.tsx'
import VueCalendar from './Calendar.vue'
import SvelteChart from './Chart.svelte'
import SolidForm from './Form.solid.tsx'
---

<!-- 同一个页面使用不同框架 -->
<ReactCounter client:load />
<VueCalendar client:visible />
<SvelteChart client:idle />
<SolidForm client:load />
```

每个组件只加载自己需要的框架代码，互不影响。

## 最佳实践

### 1. 默认静态，按需交互

```astro
<!-- ❌ 错误：不必要的 JavaScript -->
<BlogPost client:load />

<!-- ✅ 正确：静态 HTML -->
<BlogPost />

<!-- ✅ 正确：只有评论需要交互 -->
<BlogPost />
<Comments client:visible />
```

### 2. 延迟加载非关键组件

```astro
<!-- 关键组件：立即加载 -->
<SearchBox client:load />

<!-- 非关键组件：空闲时加载 -->
<RelatedPosts client:idle />
<Newsletter client:idle />

<!-- 页面底部组件：可见时加载 -->
<Footer />
<BackToTop client:visible />
```

### 3. 共享状态使用 Nano Stores

```typescript
// store.ts
import { atom } from 'nanostores'

export const theme = atom('light')
export const searchQuery = atom('')
```

```astro
---
import SearchBox from './SearchBox.tsx'
import SearchResults from './SearchResults.tsx'
---

<!-- 两个组件共享状态，但各自独立加载 -->
<SearchBox client:load />
<SearchResults client:visible />
```

## 性能对比

真实世界测试（博客首页）：

| 方案              | Bundle 大小 | FCP      | TTI      | Lighthouse |
| ----------------- | ----------- | -------- | -------- | ---------- |
| Next.js (SSR)     | 280KB       | 1.8s     | 3.2s     | 78         |
| Gatsby            | 320KB       | 1.5s     | 3.8s     | 72         |
| **Astro Islands** | **12KB**    | **0.2s** | **0.6s** | **98**     |

## 何时不适合 Islands

Islands 架构不适合：

- 🚫 高度交互的应用（如 Figma、Google Docs）
- 🚫 需要大量客户端状态管理的 Dashboard
- 🚫 实时协作应用

这些场景更适合传统 SPA 框架（React、Vue）。

## 总结

Astro Islands 架构的核心理念：

> **默认零 JavaScript，按需添加交互**

它完美平衡了：

- ⚡ 静态网站的性能
- 🎨 SPA 的交互能力
- 🔍 SSR 的 SEO 优势

如果你的项目是内容为主的网站（博客、文档、营销页面），Islands 架构是最佳选择。
