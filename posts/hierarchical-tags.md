---
title: 层级标签使用指南 (Obsidian 风格)
tags: [guide, features, tags]
createTime: 1733756400000
draft: false
---

# 层级标签使用指南 (Obsidian 风格)

## 功能说明

现在支持使用 `/` 分隔符创建层级标签，类似 Obsidian 的标签系统。

**核心特性**：当你添加一个层级标签时，系统会自动展开包含所有父级标签。

## Obsidian 风格的标签展开

### 自动展开示例

当你在编辑器中添加标签 `#前端/JavaScript/React` 时：

**存储的标签**（自动展开）：

```
["前端", "前端/JavaScript", "前端/JavaScript/React"]
```

**显示的标签**（只显示最深层）：

```
#前端 › JavaScript › React
```

### 标签匹配规则

由于标签会自动展开，点击任何层级的标签都能找到相关文章：

- 点击 `#前端` → 显示所有包含 `前端`、`前端/JavaScript`、`前端/JavaScript/React` 等标签的文章
- 点击 `#前端/JavaScript` → 显示所有包含 `前端/JavaScript` 和 `前端/JavaScript/React` 的文章
- 点击 `#前端/JavaScript/React` → 只显示包含完整路径的文章

## 使用示例

### 创建层级标签

在标签编辑器中输入：

```
前端/JavaScript/React
后端/Node.js
设计/UI/Figma
```

系统自动展开为：

```
前端
前端/JavaScript
前端/JavaScript/React
后端
后端/Node.js
设计
设计/UI
设计/UI/Figma
```

## 实现的功能

1. ✅ **层级显示**：使用 `›` 符号分隔层级
2. ✅ **标签排序**：自动按字母顺序排列
3. ✅ **标签搜索**：精确匹配标签路径
4. ✅ **编辑器支持**：可以直接输入 `前端/JavaScript` 格式

## 工具函数

项目提供了以下辅助函数（在 `src/shared/tag.ts` 中）：

### `parseTagPath(tag: string)`

解析标签路径

```typescript
parseTagPath('前端/JavaScript/React')
// => ["前端", "JavaScript", "React"]
```

### `getTagName(tag: string)`

获取标签名称（最后一级）

```typescript
getTagName('前端/JavaScript')
// => "JavaScript"
```

### `formatTagDisplay(tag: string)`

格式化标签显示

```typescript
formatTagDisplay('前端/JavaScript')
// => "前端 › JavaScript"
```

### `getAllTagPaths(tag: string)`

获取所有父级路径（Obsidian 风格展开）

```typescript
getAllTagPaths('前端/JavaScript/React')
// => ["前端", "前端/JavaScript", "前端/JavaScript/React"]
```

### `expandTags(tags: string[])`

展开标签数组，包含所有父级标签

```typescript
expandTags(['前端/JavaScript/React', '设计/UI'])
// => ["前端", "前端/JavaScript", "前端/JavaScript/React", "设计", "设计/UI"]
```

### `getLeafTags(tags: string[])`

获取叶子标签（最深层级的标签）

```typescript
getLeafTags(['前端', '前端/JavaScript', '前端/JavaScript/React', '设计'])
// => ["前端/JavaScript/React", "设计"]
```

## 优势

### 1. **灵活的浏览方式**

- 可以通过任何层级查看相关文章
- 点击父级标签可以看到所有子标签的文章

### 2. **自动分类**

- 添加 `前端/JavaScript/React` 时，文章自动归类到 `前端` 和 `前端/JavaScript`
- 不需要重复添加父级标签

### 3. **清晰的层级结构**

- 标签列表页面会显示所有层级
- 容易看出标签之间的关系

## 实现原理

1. **编辑时**：用户输入 `前端/JavaScript/React`
2. **存储时**：自动展开为 `["前端", "前端/JavaScript", "前端/JavaScript/React"]`
3. **显示时**：只显示叶子标签 `前端 › JavaScript › React`
4. **搜索时**：任何层级都能匹配到文章

## 注意事项

1. ✅ 使用 `/` 作为分隔符，不要在标签名中包含 `/`
2. ✅ 标签路径区分大小写
3. ✅ 每个层级建议使用简短的名称
4. ✅ 建议层级不超过 3 级，保持简洁
5. ✅ 只需添加最深层的标签，父级标签会自动创建

## 实际应用场景

### 技术博客示例

```
技术/前端/JavaScript/Vue
技术/前端/JavaScript/React
技术/前端/CSS/Tailwind
技术/后端/Node.js
技术/后端/Python/Django
```

自动生成的标签结构：

```
技术 (所有技术文章)
├── 技术/前端 (所有前端文章)
│   ├── 技术/前端/JavaScript (所有 JavaScript 文章)
│   │   ├── 技术/前端/JavaScript/Vue
│   │   └── 技术/前端/JavaScript/React
│   └── 技术/前端/CSS
│       └── 技术/前端/CSS/Tailwind
└── 技术/后端 (所有后端文章)
    ├── 技术/后端/Node.js
    └── 技术/后端/Python
        └── 技术/后端/Python/Django
```

## 迁移现有标签

如果你有现有的扁平标签想要转换为层级结构：

**之前**：

```
JavaScript
React
CSS
```

**之后**：

```
前端/JavaScript/React
前端/CSS
```

只需在编辑文章时重新设置标签即可。旧的扁平标签仍然完全兼容。
