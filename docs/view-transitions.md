# View Transitions 使用指南

本项目已启用 Astro View Transitions，提供平滑的页面切换体验。

## 🎯 已启用的功能

### 基础过渡
- ✅ 页面间平滑淡入淡出
- ✅ 自动保留页面滚动位置
- ✅ 浏览器前进/后退按钮支持
- ✅ 链接预加载优化

### 效果
- 主页 → 文章详情：平滑过渡
- 文章列表 → 文章详情：无感刷新
- 分类/标签页面切换：流畅动画

## 📝 自定义过渡动画

### 1. 全局过渡样式

在 `src/styles.css` 中添加：

```css
/* 自定义页面过渡动画 */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}

/* 淡入淡出 */
::view-transition-old(root) {
  animation-name: fade-out;
}

::view-transition-new(root) {
  animation-name: fade-in;
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}
```

### 2. 元素级过渡

为特定元素添加 `transition:name` 属性：

```astro
<!-- 文章标题共享过渡 -->
<h1 transition:name="post-title">
  {post.title}
</h1>

<!-- 文章封面图片共享过渡 -->
<img 
  transition:name={`post-cover-${post.id}`}
  src={post.cover}
  alt={post.title}
/>
```

### 3. 禁用特定链接的过渡

对于不需要过渡的链接（如外部链接、编辑器页面）：

```astro
<a href="/edit" data-astro-reload>编辑</a>
```

## 🎨 推荐的过渡方案

### 方案 1：简单淡入淡出（已启用）
```css
/* 默认 - 最流畅 */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.2s;
}
```

### 方案 2：滑动效果
```css
::view-transition-old(root) {
  animation: slide-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-out {
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
}
```

### 方案 3：缩放效果
```css
::view-transition-new(root) {
  animation: scale-in 0.3s ease-out;
}

@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
}
```

## 🔧 高级配置

### 禁用特定页面的过渡

在页面 frontmatter 中：

```astro
---
import Layout from '@/layouts/Layout.astro'

// 禁用此页面的过渡
export const transition = false
---
```

### 监听过渡事件

```astro
<script>
  document.addEventListener('astro:before-preparation', () => {
    console.log('准备切换页面')
  })

  document.addEventListener('astro:after-swap', () => {
    console.log('页面已切换，DOM 已更新')
  })

  document.addEventListener('astro:page-load', () => {
    console.log('新页面加载完成')
  })
</script>
```

## ⚡ 性能优化

### 预加载策略

默认情况下，链接会在 hover 时预加载。可以自定义：

```astro
<!-- 立即预加载 -->
<a href="/post/important" data-astro-prefetch="load">
  重要文章
</a>

<!-- 在视口中时预加载 -->
<a href="/post/popular" data-astro-prefetch="visible">
  热门文章
</a>

<!-- 禁用预加载 -->
<a href="/post/heavy" data-astro-prefetch="false">
  大文件文章
</a>
```

## 📱 移动端优化

View Transitions 在移动端同样生效，建议：

1. 保持动画时长 < 300ms
2. 使用简单的淡入淡出效果
3. 避免复杂的 3D 变换

## 🐛 已知限制

1. **编辑器页面**：由于 CodeMirror 的复杂性，建议编辑器链接使用 `data-astro-reload`
2. **外部链接**：自动跳过过渡
3. **表单提交**：表单提交会触发完整刷新
4. **JavaScript 状态**：页面切换时 JS 状态会重置（非 SPA）

## 📚 更多资源

- [Astro View Transitions 官方文档](https://docs.astro.build/en/guides/view-transitions/)
- [CSS View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

## 💡 最佳实践

1. **保持简单**：过度的动画会影响性能
2. **测试兼容性**：在不同浏览器中测试效果
3. **渐进增强**：不支持的浏览器会退回到传统导航
4. **关注性能**：使用 Chrome DevTools 检查动画性能
