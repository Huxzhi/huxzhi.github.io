---
title: Web 性能优化核心指标与实践
tags: [performance, web-vitals, optimization, frontend]
createTime: 1733151600000
draft: false
---

# Web 性能优化核心指标与实践

## Core Web Vitals

Google 定义的三个核心性能指标：

### 1. LCP (Largest Contentful Paint)

**定义**：最大内容绘制时间

**测量**：页面主要内容（最大的图片或文本块）完成渲染的时间

**标准**：

- ✅ 优秀：< 2.5s
- ⚠️ 需要改进：2.5s - 4s
- ❌ 较差：> 4s

**优化方法**：

```html
<!-- 1. 预加载关键资源 -->
<link
  rel="preload"
  href="hero-image.jpg"
  as="image"
/>
<link
  rel="preload"
  href="critical.css"
  as="style"
/>

<!-- 2. 使用响应式图片 -->
<img
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  src="large.jpg"
  alt="Hero"
/>

<!-- 3. 使用现代图片格式 -->
<picture>
  <source
    srcset="image.avif"
    type="image/avif"
  />
  <source
    srcset="image.webp"
    type="image/webp"
  />
  <img
    src="image.jpg"
    alt="Fallback"
  />
</picture>
```

```css
/* 4. 优化字体加载 */
@font-face {
  font-family: 'Custom Font';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 立即显示后备字体 */
}
```

### 2. FID (First Input Delay)

**定义**：首次输入延迟

**测量**：用户首次交互（点击、轻触）到浏览器响应的时间

**标准**：

- ✅ 优秀：< 100ms
- ⚠️ 需要改进：100ms - 300ms
- ❌ 较差：> 300ms

**优化方法**：

```javascript
// 1. 代码分割
// ❌ 错误：一次性加载所有代码
import HeavyComponent from './HeavyComponent'

// ✅ 正确：按需加载
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// 2. 延迟执行非关键 JavaScript
function initNonCriticalFeatures() {
  // 非关键功能
}

// 等待浏览器空闲时执行
if ('requestIdleCallback' in window) {
  requestIdleCallback(initNonCriticalFeatures)
} else {
  setTimeout(initNonCriticalFeatures, 1)
}

// 3. Web Worker 处理耗时任务
// main.js
const worker = new Worker('worker.js')
worker.postMessage({ data: largeArray })
worker.onmessage = (e) => {
  console.log('处理结果:', e.data)
}

// worker.js
self.onmessage = (e) => {
  const result = expensiveCalculation(e.data)
  self.postMessage(result)
}
```

### 3. CLS (Cumulative Layout Shift)

**定义**：累积布局偏移

**测量**：页面加载过程中元素位置变化的累积分数

**标准**：

- ✅ 优秀：< 0.1
- ⚠️ 需要改进：0.1 - 0.25
- ❌ 较差：> 0.25

**优化方法**：

```html
<!-- 1. 为图片设置尺寸 -->
<!-- ❌ 错误：没有尺寸 -->
<img
  src="image.jpg"
  alt="Image"
/>

<!-- ✅ 正确：设置尺寸 -->
<img
  src="image.jpg"
  alt="Image"
  width="800"
  height="600"
/>

<!-- 2. 使用 aspect-ratio -->
<img
  src="image.jpg"
  alt="Image"
  style="aspect-ratio: 16/9; width: 100%;"
/>

<!-- 3. 为动态内容预留空间 -->
<div style="min-height: 200px;">
  <!-- 异步加载的内容 -->
</div>
```

```css
/* 4. 避免在现有内容上方插入内容 */
.banner {
  /* ❌ 错误：动态插入广告导致内容下移 */
}

.banner {
  /* ✅ 正确：预留固定高度 */
  min-height: 250px;
}

/* 5. 使用 CSS 变换代替位置变化 */
/* ❌ 错误：改变 top/left */
.element {
  position: absolute;
  top: 0;
  left: 0;
  transition: top 0.3s, left 0.3s;
}

/* ✅ 正确：使用 transform */
.element {
  transform: translate(0, 0);
  transition: transform 0.3s;
}
```

## 其他重要指标

### TTFB (Time to First Byte)

**定义**：首字节时间

**优化**：

```nginx
# 1. 启用 HTTP/2
listen 443 ssl http2;

# 2. 启用 Gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

# 3. 设置缓存
location ~* \.(js|css|png|jpg|jpeg|gif|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

```typescript
// 4. 使用 CDN
const imageUrl = process.env.CDN_URL + '/images/hero.jpg'

// 5. 数据库查询优化
// ❌ 错误：N+1 查询
const posts = await db.posts.findMany()
for (const post of posts) {
  post.author = await db.users.findUnique({ where: { id: post.authorId } })
}

// ✅ 正确：一次查询
const posts = await db.posts.findMany({
  include: { author: true },
})
```

### FCP (First Contentful Paint)

**定义**：首次内容绘制

**优化**：

```html
<!-- 1. 内联关键 CSS -->
<style>
  /* 首屏关键样式 */
  .header {
    ...;
  }
  .hero {
    ...;
  }
</style>

<!-- 2. 预连接到关键域名 -->
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="dns-prefetch"
  href="https://analytics.example.com"
/>

<!-- 3. 使用服务端渲染 (SSR) -->
<!-- Astro / Next.js 等框架 -->
```

### TTI (Time to Interactive)

**定义**：可交互时间

**优化**：

```javascript
// 1. 减少主线程工作
// ❌ 错误：长任务阻塞主线程
function processData(data) {
  for (let i = 0; i < data.length; i++) {
    // 耗时操作
  }
}

// ✅ 正确：分批处理
async function processDataInChunks(data) {
  const chunkSize = 100
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)
    processChunk(chunk)

    // 让出主线程
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
}

// 2. Tree Shaking
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
}

// 3. 只加载需要的库
// ❌ 错误：导入整个库
import _ from 'lodash'

// ✅ 正确：只导入需要的函数
import debounce from 'lodash-es/debounce'
```

## 实战：性能优化清单

### 1. 图片优化

```html
<!-- 使用 loading="lazy" 懒加载 -->
<img
  src="image.jpg"
  loading="lazy"
  alt="Image"
/>

<!-- 响应式图片 -->
<img
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  src="image-800w.jpg"
  alt="Image"
  loading="lazy"
  decoding="async"
/>
```

```typescript
// 使用图片优化服务
// Cloudinary / Imgix / Next.js Image
import Image from 'next/image'

;<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority // 关键图片优先加载
  placeholder="blur" // 模糊占位符
/>
```

### 2. JavaScript 优化

```typescript
// 1. 代码分割
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash-es', 'dayjs'],
        },
      },
    },
  },
}

// 2. 动态导入
const Chart = lazy(() => import('./Chart'))

function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <Chart />
    </Suspense>
  )
}

// 3. 防抖节流
import { debounce } from 'lodash-es'

const handleSearch = debounce((query) => {
  fetchResults(query)
}, 300)
```

### 3. CSS 优化

```css
/* 1. 使用 CSS 变换代替位置变化 */
.element {
  transform: translateX(100px); /* GPU 加速 */
  will-change: transform; /* 提示浏览器优化 */
}

/* 2. 避免复杂选择器 */
/* ❌ 错误 */
div > ul > li > a > span {
  ...;
}

/* ✅ 正确 */
.nav-link-text {
  ...;
}

/* 3. 使用 contain 属性 */
.card {
  contain: layout style paint; /* 隔离渲染 */
}
```

### 4. 字体优化

```html
<!-- 1. 预加载字体 -->
<link
  rel="preload"
  href="/fonts/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- 2. font-display -->
<style>
  @font-face {
    font-family: 'Custom';
    src: url('/fonts/font.woff2') format('woff2');
    font-display: swap; /* 立即显示后备字体 */
  }
</style>

<!-- 3. 可变字体 -->
<style>
  @font-face {
    font-family: 'Variable';
    src: url('/fonts/variable.woff2') format('woff2-variations');
    font-weight: 100 900; /* 支持所有粗细 */
  }
</style>
```

### 5. 资源提示

```html
<!-- 预连接 -->
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://cdn.example.com"
/>

<!-- DNS 预解析 -->
<link
  rel="dns-prefetch"
  href="https://analytics.example.com"
/>

<!-- 预加载 -->
<link
  rel="preload"
  href="/critical.css"
  as="style"
/>
<link
  rel="preload"
  href="/hero.jpg"
  as="image"
/>

<!-- 预取 -->
<link
  rel="prefetch"
  href="/next-page.html"
/>
<link
  rel="prefetch"
  href="/next-page-image.jpg"
/>

<!-- 预渲染 -->
<link
  rel="prerender"
  href="/next-page.html"
/>
```

## 性能监控

### 使用 Web Vitals 库

```typescript
import { onCLS, onFID, onLCP } from 'web-vitals'

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric)

  // 使用 sendBeacon 发送数据
  navigator.sendBeacon('/analytics', body)
}

onCLS(sendToAnalytics)
onFID(sendToAnalytics)
onLCP(sendToAnalytics)
```

### Performance Observer API

```typescript
// 监控长任务
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long Task:', entry.duration)
  }
})

observer.observe({ entryTypes: ['longtask'] })

// 监控资源加载
const resourceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 1000) {
      console.log('Slow resource:', entry.name, entry.duration)
    }
  }
})

resourceObserver.observe({ entryTypes: ['resource'] })
```

## 工具推荐

1. **Lighthouse**：Chrome DevTools 内置
2. **WebPageTest**：详细的性能报告
3. **PageSpeed Insights**：Google 的在线工具
4. **Chrome DevTools Performance**：录制和分析性能
5. **webpack-bundle-analyzer**：分析打包体积

## 总结

Web 性能优化核心要点：

### Core Web Vitals

- **LCP < 2.5s**：优化图片、字体、关键资源
- **FID < 100ms**：减少 JavaScript、代码分割、Web Worker
- **CLS < 0.1**：设置尺寸、预留空间、避免插入内容

### 优化策略

1. ✅ 图片优化（响应式、懒加载、现代格式）
2. ✅ 代码分割（路由、组件、第三方库）
3. ✅ 资源压缩（Gzip、Brotli、Minify）
4. ✅ 缓存策略（HTTP 缓存、Service Worker）
5. ✅ CDN 加速（静态资源、图片、字体）
6. ✅ 性能监控（Web Vitals、Analytics）

性能优化是一个持续的过程，需要不断测量、分析、优化。
