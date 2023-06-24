---
category: vue3
date: 2023-01-01 12:22
title: 02-Vite目录和Vue单文件组件和npm run dev 详解
updated: 2023-05-13 22:56
---

# Vite 目录
`public` 下面的不会被编译 可以存放静态资源

`assets` 下面可以存放可编译的静态资源

`components` 下面用来存放我们的组件

`App.vue` 是全局组件

`main.ts` 全局的ts文件

`index.html` 非常重要的入口文件 （webpack，rollup 他们的入口文件都是enrty input 是一个js文件 而Vite 的入口文件是一个html文件，他刚开始不会编译这些js文件 只有当你用到的时候 如 `script src="xxxxx.js"` 会发起一个请求被vite拦截这时候才会解析js文件）

`vite config ts` 这是vite的配置文件具体配置项 后面会详解

`VsCode` Vue3 插件推荐 `Vue Language Features (Volar)`

# SFC 语法规范

`*.vue` 件都由三种类型的顶层语法块所组成：`<template>、<script>、<style>`

### `<template>`
- 每个 `*.vue` 文件最多可同时包含一个顶层 `<template>` 块。
- 其中的内容会被提取出来并传递给 @vue/compiler-dom，预编译为 JavaScript 的渲染函数，并附属到导出的组件上作为其 render 选项。
---
### `<script>`
- 每一个 `*.vue` 文件可以有多个 `<script>` 块 (不包括`<script setup>`)。
- 该脚本将作为 `ES Module` 来执行。
- 其默认导出的内容应该是 `Vue` 组件选项对象，它要么是一个普通的对象，要么是 `defineComponent` 的返回值。
---
### `<script setup>`

[Setup 语法糖](Setup语法糖.md)
- 每个 `*.vue` 文件最多只能有一个 `<script setup>` 块 (不包括常规的 `<script>`)
- 该脚本会被预处理并作为组件的 `setup()` 函数使用，也就是说它会在每个组件实例中执行。`<script setup>` 的顶层绑定会自动暴露给模板。更多详情请查看 `<script setup>` 文档。
---
### `<style>`
- 一个 `*.vue` 文件可以包含多个 `<style>` 标签。
- `<style>` 标签可以通过 `scoped` 或 `module attribute` (更多详情请查看 SFC 样式特性) 将样式封装在当前组件内。多个不同封装模式的 `<style>` 标签可以在同一个组件中混
---

# npm run dev 详解

`npm run xxx` 的时候，就会到 `node_modules/bin` 中找对应的映射文件，然后再找到相应的 js 文件来执行

1. 查找规则是先从当前项目的 `node_modlue /bin` 去找,
2. 找不到去全局的 `node_module/bin` 去
3. 再找不到去 环境变量 去找