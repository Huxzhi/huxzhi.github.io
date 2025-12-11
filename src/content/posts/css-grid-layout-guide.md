---
title: CSS Grid 布局完全指南
tags: [css, grid, layout, design]
category: 技术向
createTime: 1733238000000
draft: false
---

# CSS Grid 布局完全指南

## Grid 基础概念

### Grid Container vs Grid Item

```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
</div>
```

```css
.grid-container {
  display: grid; /* 启用 Grid 布局 */
}

.grid-item {
  /* Grid 项目 */
}
```

### 网格线（Grid Lines）

```
      列线 1    列线 2    列线 3    列线 4
        ↓        ↓        ↓        ↓
行线 1 → ┌────────┬────────┬────────┐
        │ 单元格1 │ 单元格2 │ 单元格3 │
行线 2 → ├────────┼────────┼────────┤
        │ 单元格4 │ 单元格5 │ 单元格6 │
行线 3 → └────────┴────────┴────────┘
```

## 定义网格

### 使用 grid-template-columns

```css
/* 固定宽度 */
.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  /* 3 列，每列 200px */
}

/* 使用 fr 单位（fraction） */
.grid {
  grid-template-columns: 1fr 2fr 1fr;
  /* 3 列，比例 1:2:1 */
}

/* 混合使用 */
.grid {
  grid-template-columns: 200px 1fr 200px;
  /* 左右固定 200px，中间自适应 */
}

/* repeat() 函数 */
.grid {
  grid-template-columns: repeat(3, 1fr);
  /* 等同于 1fr 1fr 1fr */
}

/* auto-fill：尽可能多的列 */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 每列最小 200px，尽可能多的列 */
}

/* auto-fit：拉伸已有列 */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* 拉伸列以填满容器 */
}
```

### 使用 grid-template-rows

```css
.grid {
  grid-template-rows: 100px auto 100px;
  /* 第一行 100px，第二行自适应，第三行 100px */
}
```

### 使用 gap（间距）

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* 行间距和列间距都是 20px */
}

.grid {
  row-gap: 20px; /* 行间距 */
  column-gap: 10px; /* 列间距 */
}
```

## 定位 Grid 项目

### 使用网格线

```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;
  /* 从列线 1 到列线 3（占 2 列） */

  grid-row-start: 1;
  grid-row-end: 2;
  /* 从行线 1 到行线 2（占 1 行） */
}

/* 简写 */
.item {
  grid-column: 1 / 3; /* 列线 1 到列线 3 */
  grid-row: 1 / 2; /* 行线 1 到行线 2 */
}

/* 使用 span */
.item {
  grid-column: 1 / span 2; /* 从列线 1 开始，跨越 2 列 */
  grid-row: 1 / span 3; /* 从行线 1 开始，跨越 3 行 */
}

/* 更简写 */
.item {
  grid-area: 1 / 1 / 2 / 3;
  /* row-start / column-start / row-end / column-end */
}
```

### 使用命名区域

```css
.grid {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar main main'
    'footer footer footer';
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 100px 1fr 100px;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

```html
<div class="grid">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="main">Main Content</div>
  <div class="footer">Footer</div>
</div>
```

## 对齐方式

### 容器内对齐（整体）

```css
.grid {
  /* 水平对齐（整个网格） */
  justify-content: start | end | center | stretch | space-between | space-around
    | space-evenly;

  /* 垂直对齐（整个网格） */
  align-content: start | end | center | stretch | space-between | space-around |
    space-evenly;

  /* 简写 */
  place-content: center center; /* 水平垂直居中 */
}
```

### 单元格内对齐（所有项目）

```css
.grid {
  /* 水平对齐（所有项目） */
  justify-items: start | end | center | stretch;

  /* 垂直对齐（所有项目） */
  align-items: start | end | center | stretch;

  /* 简写 */
  place-items: center center; /* 所有项目居中 */
}
```

### 单个项目对齐

```css
.item {
  /* 水平对齐（单个项目） */
  justify-self: start | end | center | stretch;

  /* 垂直对齐（单个项目） */
  align-self: start | end | center | stretch;

  /* 简写 */
  place-self: center center;
}
```

## 实战案例

### 案例 1：响应式卡片网格

```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 效果：
   - 每个卡片最小 300px
   - 自动换行
   - 自动填满容器
*/
```

### 案例 2：圣杯布局

```html
<div class="holy-grail">
  <header>Header</header>
  <aside class="left">Left Sidebar</aside>
  <main>Main Content</main>
  <aside class="right">Right Sidebar</aside>
  <footer>Footer</footer>
</div>
```

```css
.holy-grail {
  display: grid;
  grid-template-areas:
    'header header header'
    'left main right'
    'footer footer footer';
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 16px;
}

header {
  grid-area: header;
}
.left {
  grid-area: left;
}
main {
  grid-area: main;
}
.right {
  grid-area: right;
}
footer {
  grid-area: footer;
}

/* 响应式：移动端变为单列 */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      'header'
      'main'
      'left'
      'right'
      'footer';
    grid-template-columns: 1fr;
  }
}
```

### 案例 3：瀑布流布局

```html
<div class="masonry">
  <div class="item">Short</div>
  <div
    class="item"
    style="grid-row: span 2"
  >
    Tall
  </div>
  <div class="item">Short</div>
  <div
    class="item"
    style="grid-row: span 3"
  >
    Very Tall
  </div>
  <!-- ... -->
</div>
```

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 100px; /* 每行高度 100px */
  gap: 16px;
}

.item {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
}

/* JavaScript 动态计算 span */
/* 或使用 CSS grid-auto-flow: dense */
```

### 案例 4：杂志式布局

```html
<div class="magazine">
  <div class="feature">Feature Article</div>
  <div class="article">Article 1</div>
  <div class="article">Article 2</div>
  <div class="article">Article 3</div>
  <div class="article">Article 4</div>
  <div class="ad">Ad</div>
</div>
```

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

.feature {
  grid-column: 1 / 3; /* 跨越 2 列 */
  grid-row: 1 / 3; /* 跨越 2 行 */
  background: #007bff;
  color: white;
}

.article {
  background: #f8f9fa;
}

.ad {
  grid-column: 3 / 5; /* 跨越 2 列 */
  background: #ffc107;
}

/* 布局效果：
   ┌─────────┬─────┬─────┐
   │         │  1  │  2  │
   │ Feature ├─────┼─────┤
   │         │  3  │  4  │
   ├─────────┴─────┴─────┤
   │        Ad            │
   └─────────────────────┘
*/
```

### 案例 5：Dashboard 布局

```css
.dashboard {
  display: grid;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'nav main aside';
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 60px 1fr auto;
  height: 100vh;
  gap: 16px;
  padding: 16px;
}

.header {
  grid-area: header;
  background: #2c3e50;
  color: white;
}

.nav {
  grid-area: nav;
  background: #34495e;
  overflow-y: auto;
}

.main {
  grid-area: main;
  background: white;
  overflow-y: auto;
}

.aside {
  grid-area: aside;
  background: #ecf0f1;
  overflow-y: auto;
}
```

## Grid vs Flexbox

### 何时使用 Grid

- ✅ 二维布局（行和列）
- ✅ 复杂的页面布局
- ✅ 需要精确控制位置
- ✅ 响应式网格系统

### 何时使用 Flexbox

- ✅ 一维布局（单行或单列）
- ✅ 内容优先（大小由内容决定）
- ✅ 简单的组件布局
- ✅ 导航栏、工具栏

### 组合使用

```css
/* 外层：Grid 控制整体布局 */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}

/* 内层：Flexbox 控制组件内部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

## 浏览器支持

CSS Grid 现代浏览器全支持：

- ✅ Chrome 57+
- ✅ Firefox 52+
- ✅ Safari 10.1+
- ✅ Edge 16+

IE 11 支持旧版 Grid 语法（需要 autoprefixer）。

## 调试技巧

### 1. 使用浏览器开发者工具

Chrome/Firefox DevTools 提供 Grid 检查器：

- 显示网格线
- 显示区域名称
- 显示间距
- 高亮显示项目

### 2. 使用 CSS Grid 生成器

在线工具：

- https://cssgrid-generator.netlify.app/
- https://grid.layoutit.com/

## 总结

CSS Grid 核心要点：

1. **定义网格**：

   - `grid-template-columns`：定义列
   - `grid-template-rows`：定义行
   - `gap`：间距

2. **定位项目**：

   - `grid-column` / `grid-row`：网格线定位
   - `grid-area`：命名区域定位
   - `span`：跨越多个单元格

3. **对齐方式**：

   - `justify-*`：水平对齐
   - `align-*`：垂直对齐
   - `place-*`：简写

4. **响应式**：
   - `repeat(auto-fit, minmax())`：自适应列数
   - `grid-template-areas`：重新排列布局
   - 媒体查询：切换布局

CSS Grid 是现代网页布局的基石，掌握它能大幅提升开发效率！
