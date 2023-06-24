---
category: vue3
date: 2023-01-12 20:07
title: 01-介绍Pinia
updated: 2023-05-13 22:56
---

![](./_images/image-2023-01-12_20-08-17-554-01-介绍Pinia.png)

前言 全局状态管理工具

Pinia.js 有如下特点：

- 完整的 ts 的支持；
- 足够轻量，压缩后的体积只有1kb左右;
- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

官方文档[Pinia](https://pinia.vuejs.org/zh/) 直接看官方就好，[看一下注意事项](01a-注意事项.md)

git 地址 [https://github.com/vuejs/pinia](https://github.com/vuejs/pinia "https://github.com/vuejs/pinia")

## 1.起步 安装

```sh
yarn add pinia
 
npm install pinia
```

## 2.引入注册Vue3

```ts
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
 
const store = createPinia()
let app = createApp(App)
 
 
app.use(store)
 
app.mount('#app')
```

Vue2 使用

```js
import { createPinia, PiniaVuePlugin } from 'pinia'
 
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
 
new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```