---
category: vue3
date: 2023-01-04 18:45
title: 20-keep-alive缓存组件
updated: 2023-05-13 22:56
---

## 内置组件 keep-alive

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。==而是希望组件可以缓存下来,维持当前的状态。==这时候就需要用到 keep-alive 组件。

切换组件时还能保存数据，提升用户体验

### 开启 keep-alive 生命周期的变化

-   初次进入时： onMounted> onActivated
-   退出后触发 deactivated
-   再次进入：
-   只会触发 onActivated
-   事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中
```vue
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

 ### `include` 和 `exclude`

```vue
 <keep-alive :include="" :exclude="" :max="">
 </keep-alive>
```
include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

### `max`

最多缓存个数，采用 `LRU` 算法
```vue
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```


## keep-alive 源码讲解

源码目录runtime-core/src/components/KeepAlive.ts
更详细的在视频 [B站视频](https://www.bilibili.com/video/BV1dS4y1y7vd?p=22)  文章 [作者CSDN](https://xiaoman.blog.csdn.net/article/details/122953072)


增加两个新的生命周期 `onActivated` 和 `onDeactivated` 切换时，执行这两个函数

- 初始化
    - 读取插槽的子节点 只能有一个 如果多了会报错 他只渲染单个组件
    - 最后返回的其实还是我们的组件 keep-alive 只是一个抽象组件 本身并不会渲染
- 卸载
    - 在“卸载”组件时，并不是真正的卸载，而是调用 move 方法，将组件搬运到一个隐藏的容器中