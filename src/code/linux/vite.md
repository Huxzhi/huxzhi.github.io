---
title: 搭建个人网站
icon: page
date: 2023-02-20 08:00
category:
  - think
tag:
  - 编程
star: true
updated: 2023-07-31 21:41
---
## 创建一个 自己的 vite

我选择了 `vuepress` 框架作为我的个人博客，主要看中这几个优点

- 开箱即用
- 基于 `vite` 可以快速热更新

## 使用 VuePress 配置主题
https://theme-hope.vuejs.press/zh/cookbook/vuepress/config.html

好看，且可以做到 90% 的免配置


相关配置文档请见 [博客主页](https://theme-hope.vuejs.press/zh/guide/blog/home/)。

## 踩坑记录
虽然已经足够好用，但免不了会遇到 bug，有一些是自己不了解该主题导致的，作一下提醒
### 基于字符串替换而不是 `AST` 替换

`dev` 模式可以正常显示， `build` 模式不可以
```js
所以不要出现如下的代码。 ` `包裹是不起作用，需要 ``` 整个代码块包裹

import.meta.env
```


### 图片相对地址不能空格

哪怕是 用 %20 填充，也不行