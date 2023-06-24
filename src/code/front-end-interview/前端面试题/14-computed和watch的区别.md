---
date: 2023-03-25 19:09
title: 14-computed和watch
updated: 2023-05-13 22:56
---

# 14-computed 和 watch

## computed

- 计算属性，计算出一个结果，函数值改变了就会重新计算
- 初始化的时候会自动计算一次
- computed 会读取缓存数据

vue3内的笔记 [09-computed计算属性](../../vue/vue3/09-computed计算属性.md) 与 react 类似的效果 [39-useEffect副作用-组件渲染后执行](../../react/React18/39-useEffect副作用-组件渲染后执行.md)

## watch
监控某个数据，被监控的数据更改，则watch执行。
初始化的时候不会自动执行一次

[10-watch侦听器](../../vue/vue3/10-watch侦听器.md)