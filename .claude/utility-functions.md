# 项目工具函数文档

本文档总结了项目中所有可复用的工具函数，按功能模块分类整理。

## 📝 YAML 解析 (`src/shared/yaml.ts`)

### 浏览器兼容的 Frontmatter 解析

轻量级 YAML frontmatter 解析器，无需 Node.js Buffer 依赖，适用于浏览器环境。

#### `parseFrontmatter(markdown: string): ParsedFrontmatter`

解析 Markdown 文件的 YAML frontmatter。

```typescript
import { parseFrontmatter } from '@/shared/yaml'

const markdown = `---
title: "Hello World"
tags: ["typescript", "astro"]
draft: false
---

# Content here
`

const { data, content } = parseFrontmatter(markdown)
console.log(data.title) // "Hello World"
console.log(data.tags) // ["typescript", "astro"]
console.log(content) // "# Content here\n"
```

**支持的数据类型：**

- 字符串（自动去除引号）
- 数字
- 布尔值（true/false）
- 数组 `[item1, item2]`

#### `stringifyFrontmatter(data: Record<string, any>): string`

将对象转换为 YAML frontmatter 字符串。

```typescript
import { stringifyFrontmatter } from '@/shared/yaml'

const yaml = stringifyFrontmatter({
  title: 'Hello World',
  tags: ['typescript', 'astro'],
  draft: false,
})
// 输出:
// ---
// title: "Hello World"
// tags: ["typescript", "astro"]
// draft: false
// ---
```

#### `composeFrontmatter(data: Record<string, any>, content: string): string`

将 frontmatter 数据和内容组合成完整的 Markdown。

```typescript
import { composeFrontmatter } from '@/shared/yaml'

const markdown = composeFrontmatter(
  { title: 'Hello', draft: false },
  '# Content here',
)
// 输出完整的 Markdown 文件，包含 frontmatter
```

## 📅 时间处理 (`src/shared/time.ts`)

### 时间格式兼容性

项目支持两种时间格式：

- **新格式**: `created` / `updated` (字符串，如 "2025-11-04T10:29")
- **旧格式**: `createTime` / `updateTime` (时间戳数字)

#### `parseTime(timeStr?, fallbackTimestamp?): number`

解析时间为时间戳，支持新旧格式自动转换。

```typescript
// 用法示例
const timestamp = parseTime('2025-11-04T10:29', 1699123456789)
```

#### `getCreateTime(data): number`

从 post.data 中获取创建时间，兼容新旧格式。

```typescript
// 用法示例
import { getCreateTime } from '@/shared/time'

const posts = allPosts.sort(
  (a, b) => getCreateTime(b.data) - getCreateTime(a.data),
)
```

#### `getUpdateTime(data): number`

从 post.data 中获取更新时间，兼容新旧格式，如果没有更新时间则返回创建时间。

```typescript
// 用法示例
import { getUpdateTime } from '@/shared/time'

const updateTime = getUpdateTime(post.data)
```

### 时间格式化

#### `formatSecond(timestamp: number): string`

将时间戳格式化为人性化的相对时间显示。

**返回值规则：**

- 今天 → "Today"
- 昨天 → "Yesterday"
- 7 天内 → "3 Days ago"
- 今年内 → "MM/DD"
- 往年 → "YYYY/MM/DD"

```typescript
// 用法示例
const display = formatSecond(Date.now() - 86400000) // "Yesterday"
```

## 🏷️ 标签处理 (`src/shared/tag.ts`)

### 标签常量

```typescript
export const TAG_PIN = 'Pin' // 置顶标签
export const TAG_SEPARATOR = '/' // 标签路径分隔符
```

### 标签解析

#### `parseTagPath(tag: string): string[]`

解析层级标签为数组。

```typescript
parseTagPath('前端/JavaScript') // ["前端", "JavaScript"]
```

#### `getParentTag(tag: string): string | null`

获取父标签。

```typescript
getParentTag('前端/JavaScript/React') // "前端/JavaScript"
getParentTag('前端') // null
```

#### `getTagName(tag: string): string`

获取标签名称（最后一部分）。

```typescript
getTagName('前端/JavaScript') // "JavaScript"
```

#### `matchesTag(tag: string, searchTag: string): boolean`

检查标签是否匹配或属于某个父标签。

```typescript
matchesTag('前端/JavaScript', '前端') // true
matchesTag('后端/Node', '前端') // false
```

### 标签扩展（Obsidian 风格）

#### `getAllTagPaths(tag: string): string[]`

获取标签的所有层级路径。

```typescript
getAllTagPaths('前端/JavaScript/React')
// ["前端", "前端/JavaScript", "前端/JavaScript/React"]
```

#### `expandTags(tags: string[]): string[]`

展开标签数组，包含所有父标签。

```typescript
expandTags(['前端/JavaScript/React', '设计/UI'])
// ["前端", "前端/JavaScript", "前端/JavaScript/React", "设计", "设计/UI"]
```

**使用场景：** 在页面中显示时使用展开后的标签，使文章能被父标签检索到。

#### `getLeafTags(tags: string[]): string[]`

获取叶子标签（最深层级的标签）。

```typescript
getLeafTags(['前端', '前端/JavaScript', '前端/JavaScript/React'])
// ["前端/JavaScript/React"]
```

**使用场景：** 获取原始输入的标签，用于编辑或保存。

### 排序工具

#### `sortByPin<T>(arr: T[]): T[]`

按置顶状态和更新时间排序，置顶的文章优先显示。

```typescript
// T 必须包含 { tags: string[], updateTime: number }
const sorted = sortByPin(posts)
```

## 📁 分类处理 (`src/shared/category.ts`)

#### `getPostCategory(post: CollectionEntry<'posts'>): string`

获取文章的分类，按优先级处理。

**优先级顺序：**

1. frontmatter 中的 `category` 字段
2. 文件夹名称（如果配置启用 `config.categories.useFolderName`）
3. 默认分类 `config.categories.uncategorized`

```typescript
import { getPostCategory } from '@/shared/category'

const category = getPostCategory(post) // "技术"
```

## 🔄 通用工具 (`src/shared/utils.ts`)

#### `chunkArray<T>(array: T[], size: number): T[][]`

将数组分块为指定大小的子数组。

```typescript
chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

## ⏱️ 防抖节流 (`src/shared/debounce.ts`)

#### `debounce<T>(func: T, delay?: number): T`

防抖函数，延迟执行最后一次调用。

```typescript
const save = debounce(() => {
  console.log('保存')
}, 3000)

save() // 3秒后执行
save() // 重置计时器
```

#### `throttle<T>(func: T, limit: number, options?): T`

节流函数，限制执行频率。

**选项：**

- `leading`: 是否在开始时立即执行（默认 true）
- `trailing`: 是否在结束时追加执行（默认 true）

```typescript
const scroll = throttle(
  () => {
    console.log('滚动')
  },
  1000,
  { leading: true, trailing: false },
)
```

#### `sleep(ms: number): Promise<void>`

异步延迟函数。

```typescript
await sleep(1000) // 等待 1 秒
```

## 💾 存储 (`src/shared/storage.ts`)

### 用户信息存储

```typescript
export const USER_KEY = 'user_github'

export type UserInfo = {
  name: string
  avatar: string
  token: string
  login: string
  permissions?: { push?: boolean }
}
```

#### `getLocalUser(): UserInfo | undefined`

获取本地存储的用户信息。

#### `setLocalUser(user: UserInfo): UserInfo`

保存用户信息到本地存储。

## 🔤 文件名与 Slug (`src/shared/transform.ts`)

#### `pathToId(path: string): string`

将路径转换为 ID（slug 格式）。

```typescript
pathToId('posts/hello-world.json') // "hello-world"
```

#### `toFilename(str: string): string`

将字符串转换为有效的文件名。

```typescript
toFilename('Hello World!') // "hello-world"
```

#### `toUniqueFilename(str: string): string`

生成唯一的文件名（带时间戳）。

```typescript
toUniqueFilename('image') // "lz8k3m-image"
```

#### `splitFilename(filename: string): { name: string, extension: string }`

分离文件名和扩展名。

```typescript
splitFilename('document.pdf') // { name: "document", extension: "pdf" }
splitFilename('my.file.txt') // { name: "my.file", extension: "txt" }
```

## 📝 文档处理 (`src/shared/transform.ts`)

#### `parseTitle(json: JSONContent): string`

从 JSON 内容中解析标题（第一个标题节点）。

#### `parseIntro(json: JSONContent): string`

从 JSON 内容中解析摘要（第一个段落）。

### 元数据处理

#### `toMeta(params): Record<string, any>`

将页面数据转换为元数据对象。

#### `parseMeta(json): PageData`

从元数据对象解析页面数据。

## 🌐 DOM 工具 (`src/utils/dom.ts`)

#### `useAttrRef<Attr>(attr: Attr, batch?: boolean)`

创建可复用的属性引用和设置器。

```typescript
const [setRef, setAttr] = useAttrRef({ class: 'btn', disabled: false })

// 在 JSX 中使用
<button ref={setRef}>Click</button>

// 动态修改属性
setAttr({ disabled: true })
```

#### `useMemoFn<T>(fn: () => T): [() => T, () => void]`

创建记忆化函数，只执行一次直到清除。

```typescript
const [getValue, clear] = useMemoFn(() => expensiveComputation())

const result = getValue() // 计算一次
const result2 = getValue() // 返回缓存值
clear() // 清除缓存
```

#### `cn(...args): string`

组合类名，自动过滤 false 和 undefined。

```typescript
cn('btn', isActive && 'active', undefined) // "btn active"
```

## 🖼️ 编辑器工具 (`src/utils/doc.ts`)

#### `travelDoc(doc: JSONContent, walker: (node) => void)`

遍历文档节点树。

```typescript
travelDoc(doc, (node) => {
  if (node.type === 'image') {
    console.log(node.attrs?.src)
  }
})
```

#### `filterRepeat<T, K>(arr: T[], key: K): T[]`

根据指定键去重数组。

```typescript
filterRepeat(
  [
    { id: 1, name: 'a' },
    { id: 1, name: 'b' },
    { id: 2, name: 'c' },
  ],
  'id',
) // [{ id: 1, name: 'a' }, { id: 2, name: 'c' }]
```

#### `getLocalUploadImages(editor): Promise<{ assets, editorJSON }>`

获取编辑器中所有本地上传的图片（blob URL）。

#### `getDocAssets(editor): string[]`

获取文档中的所有资源路径（/post-assets）。

## 💿 IndexedDB 存储 (`src/utils/saver.ts`)

#### `createSaver()`

创建 IndexedDB 存储器，用于编辑器内容持久化。

```typescript
const saver = createSaver()

// 保存数据
await saver.save(data, 'draft-1')

// 读取数据
const data = await saver.read('draft-1')

// 清除数据
await saver.clean('draft-1')
```

## 🌐 数据获取 (`src/utils/data.ts`)

#### `getGlobalData(): Promise<ShortPageData[]>`

获取全局文章列表数据，带缓存。

```typescript
const posts = await getGlobalData()
```

---

## 💡 最佳实践

### 1. 时间处理统一规范

**✅ 正确：使用辅助函数**

```typescript
import { getCreateTime, getUpdateTime } from '@/shared/time'

posts.sort((a, b) => getCreateTime(b.data) - getCreateTime(a.data))
```

**❌ 错误：直接访问属性**

```typescript
// 不兼容新旧格式
posts.sort((a, b) => b.data.createTime - a.data.createTime)
```

### 2. 标签处理规范

**显示标签时：使用 `expandTags`**

```typescript
const displayTags = expandTags(post.data.tags)
// 允许通过父标签检索文章
```

**保存标签时：使用 `getLeafTags`**

```typescript
const saveTags = getLeafTags(allTags)
// 只保存最深层的原始标签
```

### 3. 性能优化

**使用防抖处理频繁操作：**

```typescript
const autoSave = debounce((content) => {
  saveToServer(content)
}, 3000)
```

**使用节流处理高频事件：**

```typescript
const onScroll = throttle(() => {
  updateScrollPosition()
}, 100)
```

### 4. 分类处理

始终使用 `getPostCategory` 获取文章分类，确保优先级逻辑一致：

```typescript
const category = getPostCategory(post)
```

---

## 📦 导入路径

所有工具函数使用别名导入：

```typescript
import { getCreateTime, getUpdateTime } from '@/shared/time'
import { expandTags, getLeafTags } from '@/shared/tag'
import { getPostCategory } from '@/shared/category'
import { debounce, throttle } from '@/shared/debounce'
import { toFilename, toUniqueFilename } from '@/shared/transform'
```

别名配置在 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
