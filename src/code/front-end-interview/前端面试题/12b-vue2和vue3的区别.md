---
date: 2023-03-25 18:14
title: 12b-vue2和vue3的区别
updated: 2023-05-13 22:56
---

# 12b-vue2 和 vue3 的区别

1. `Composition API` 和 `Options API`
   - Options API 在比较繁重的项目内容易有命名冲突，冗余代码等
   - Composition API setup 方法 :beforeCreate=>setup=>created
2. 响应式数据的绑定
   - vue2 使用的是 `Object.defineProperty` 的 get set 进行监控属性。他无法监控对象的属性的 **增加删除**
   - vue Proxy 深度监控对象 对象的属性的增加删除都可以监控到
3. vue3 打包的时候无用代码丢弃
