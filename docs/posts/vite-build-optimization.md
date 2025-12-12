---
title: Vite 构建优化实战指南
tags: [vite, build, performance, frontend]
category: 技术向
createTime: 1733410800000
draft: false
---

# Vite 构建优化实战指南

## Vite 为什么快

### 传统打包工具（Webpack）

```
启动开发服务器：
1. 分析所有模块依赖
2. 打包所有代码
3. 生成 bundle
4. 启动服务器
⏱️ 需要 30-60 秒

修改代码：
1. 重新打包相关模块
2. 热更新
⏱️ 需要 5-10 秒
```

### Vite 的方式

```
启动开发服务器：
1. 启动服务器
2. 使用 ESM 直接加载模块
⏱️ 只需 < 1 秒

修改代码：
1. 使用 ESM HMR 直接替换模块
⏱️ 只需 < 100ms
```

**核心原理**：

- 开发环境使用浏览器原生 ESM
- 使用 esbuild 预构建依赖
- 按需编译，只编译当前访问的模块

## 开发环境优化

### 1. 依赖预构建优化

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // 强制预构建某些依赖
    include: ['react', 'react-dom', 'lodash-es'],

    // 排除不需要预构建的依赖
    exclude: ['your-local-package'],

    // 使用 esbuild 配置
    esbuildOptions: {
      // 针对 Node.js 模块
      mainFields: ['module', 'main'],
      // 支持 JSX
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
```

### 2. 减少文件监听

```typescript
export default defineConfig({
  server: {
    watch: {
      // 忽略不需要监听的文件
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.vscode/**',
      ],
    },
  },
})
```

### 3. 使用 @vitejs/plugin-react-swc

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // 使用 SWC 代替 Babel

export default defineConfig({
  plugins: [react()],
})
```

**性能提升**：

- Babel 编译：~500ms
- SWC 编译：~50ms
- 快 10 倍！

## 生产环境优化

### 1. 代码分割

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 手动分包
        manualChunks: {
          // 将 React 相关库打包到一起
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // 将图表库单独打包
          charts: ['echarts', 'chart.js'],

          // 将工具库单独打包
          utils: ['lodash-es', 'dayjs', 'axios'],
        },
      },
    },

    // 设置代码分割的最小尺寸
    chunkSizeWarningLimit: 1000,
  },
})
```

### 2. 自动分包策略

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // node_modules 中的模块自动分包
          if (id.includes('node_modules')) {
            // 提取包名
            const name = id.split('node_modules/')[1].split('/')[0]

            // 将大型库单独打包
            if (['lodash-es', 'echarts', 'antd'].includes(name)) {
              return name
            }

            // 其他第三方库打包到 vendor
            return 'vendor'
          }

          // 将组件目录的代码打包到一起
          if (id.includes('/src/components/')) {
            return 'components'
          }
        },
      },
    },
  },
})
```

### 3. 压缩优化

```typescript
export default defineConfig({
  build: {
    // 使用 esbuild 压缩（更快）
    minify: 'esbuild',

    // 或使用 terser（更小）
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,  // 删除 console
    //     drop_debugger: true, // 删除 debugger
    //   },
    // },

    // CSS 压缩
    cssMinify: true,

    // 生成 sourcemap（生产环境建议关闭）
    sourcemap: false,
  },
})
```

### 4. 图片优化

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      // 压缩 PNG
      optipng: {
        optimizationLevel: 7,
      },
      // 压缩 JPEG
      mozjpeg: {
        quality: 80,
      },
      // 压缩 SVG
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    }),
  ],
})
```

### 5. Gzip/Brotli 压缩

```typescript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteCompression({
      // 使用 gzip 压缩
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // 只压缩大于 10KB 的文件
      deleteOriginFile: false,
    }),

    viteCompression({
      // 使用 brotli 压缩（压缩率更高）
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
})
```

## CDN 优化

### 使用 CDN 加载大型库

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'echarts'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          echarts: 'echarts',
        },
      },
    },
  },
})
```

```html
<!-- index.html -->
<head>
  <!-- 从 CDN 加载 -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
</head>
```

## 动态导入优化

### 路由懒加载

```typescript
// ❌ 不好的做法：同步导入所有路由
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard },
]
```

```typescript
// ✅ 好的做法：懒加载路由
const routes = [
  {
    path: '/',
    component: () => import('./pages/Home'),
  },
  {
    path: '/about',
    component: () => import('./pages/About'),
  },
  {
    path: '/dashboard',
    component: () => import('./pages/Dashboard'),
  },
]
```

### 组件懒加载

```typescript
import { lazy, Suspense } from 'react'

// ❌ 不好的做法
import HeavyChart from './components/HeavyChart'

// ✅ 好的做法
const HeavyChart = lazy(() => import('./components/HeavyChart'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Prefetch 预加载

```typescript
// 在用户可能访问之前预加载
function Navigation() {
  return (
    <nav>
      <Link
        to="/dashboard"
        onMouseEnter={() => {
          // 鼠标悬停时预加载
          import('./pages/Dashboard')
        }}
      >
        Dashboard
      </Link>
    </nav>
  )
}
```

## 缓存优化

### 文件名 Hash

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // JS 文件名使用 hash
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
```

### 长期缓存策略

```nginx
# nginx 配置
location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$ {
  # 静态资源缓存 1 年
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location / {
  # HTML 不缓存（因为包含最新的资源引用）
  add_header Cache-Control "no-cache";
}
```

## 性能监控

### Bundle 分析

```typescript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 构建完成后自动打开
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
```

### 构建时间分析

```bash
# 使用 VITE_PROFILE 环境变量
VITE_PROFILE=true pnpm run build
```

## 实战：优化案例

### 优化前

```
dist/
  index.html
  assets/
    index.4f2b3c1e.js     (850 KB)  ← 所有代码都在一个文件
    index.d4a5e6c7.css    (120 KB)
```

**性能指标**：

- 首次加载：850 KB
- FCP：2.8s
- TTI：4.2s

### 优化后

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), viteCompression(), visualizer()],

  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['antd', '@ant-design/icons'],
          utils: ['lodash-es', 'dayjs', 'axios'],
        },
      },
    },
  },
})
```

```
dist/
  index.html
  assets/
    index.a1b2c3d4.js           (45 KB)   ← 入口文件
    react-vendor.e5f6g7h8.js    (180 KB)  ← React 相关
    ui-vendor.i9j0k1l2.js       (420 KB)  ← UI 库
    utils.m3n4o5p6.js           (85 KB)   ← 工具库
    components.q7r8s9t0.js      (120 KB)  ← 业务组件
    index.u1v2w3x4.css          (95 KB)   ← 样式

    # Gzip 压缩后
    react-vendor.e5f6g7h8.js.gz (65 KB)
    ui-vendor.i9j0k1l2.js.gz    (145 KB)
    ...
```

**性能指标**：

- 首次加载：245 KB（使用 Gzip）
- FCP：0.9s ⚡（快 3.1 倍）
- TTI：1.4s ⚡（快 3 倍）
- 缓存命中率：提升 80%

## 总结

Vite 构建优化核心要点：

### 开发环境

1. ✅ 使用 SWC 代替 Babel
2. ✅ 优化依赖预构建
3. ✅ 减少文件监听

### 生产环境

1. ✅ 智能代码分割
2. ✅ 使用 esbuild 压缩
3. ✅ 图片压缩
4. ✅ Gzip/Brotli 压缩
5. ✅ 路由懒加载
6. ✅ 组件懒加载
7. ✅ 使用 CDN
8. ✅ 长期缓存策略

通过这些优化，可以将构建产物体积减少 70%，首次加载速度提升 3-5 倍。
