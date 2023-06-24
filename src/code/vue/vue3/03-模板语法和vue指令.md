---
category: vue3
date: 2023-01-01 12:36
title: 03-模板语法和vue指令
updated: 2023-05-13 22:56
---

# 模板语法

在 script 声明一个变量可以直接在 `template` 使用用法为`{{ 变量名称 }}`

```vue
<template>
  <div>{{ message1 }}</div>
  <div>{{ message2 == 0 ? '我是小满0' : '我不是小满other' }}</div> <!-- 条件运算 -->
  <div>{{ message2 + 1 }}</div><!-- 运算 -->
  <div>{{ message3.split('，') }}</div><!-- 操作 API -->
</template>

<script setup lang="ts">
const message1 = "我是小满"
const message2:number = 1
const message3:string = "我，是，小，满"
</script>
```

模板语法是可以编写条件运算的,运算也是支持的,操作 API 也是支持的

# vue 指令

-   v- 开头都是 vue 的指令
-   v-text 用来显示文本
-   v-html 用来展示富文本
    -   可以添加标签，如`<section style="color:red">我是段文字xxxx</section>`，但是不能添加 `组件`
-   v-if 用来控制元素的显示隐藏（切换真假 DOM）
    -   把整个节点变成注释节点
-   v-else-if 表示 v-if 的“else if 块”。可以链式调用
-   v-else v-if 条件收尾语句
-   ## v-show 用来控制元素的显示隐藏（`display: none` block Css 切换）
-   v-on 简写@ 用来给元素添加事件
    -   `v-on:click="xxx"`，点击事件
    -   `@click`
    -   还支持动态的事件切换
    ```html
    <template>
        <button @[event]="xxxx"> 尽情地点击我 </button>
    </template>
    <script setup lang="ts">
        const event = "click"
    </script>
    ```
    -   `@click.stop` 阻止父级的点击事件
-   v-bind 简写: 用来绑定元素的属性 Attr
    ```html
    <template>
        <div v-bind:id="id">
        <!-- 简写 <div :id="id"> -->
        演示v-bind
        </div>
    </template>
    <script setup lang="ts">
        const id:string = "123"
    </script>
    ```
-   v-model 双向绑定
    ```vue
    <template>
    <div>
        <input v-model="a" type="text">
        <div>{{ a }}</div>
    </div>
    </template>
    <script setup lang="ts">
    // ref reactive
    import { ref } from 'vue'
    const a = ref('小满')
    </script>
    ```
-   v-for 用来遍历元素
-   v-on 修饰符 冒泡案例
-   v-once 性能优化只渲染一次
-   v-memo 里面放数组，一般配合 `v-for` ，性能优化会有缓存 具体请看我的掘金

[Vue3.2 新增 v-memo - 掘金](https://juejin.cn/post/7180973915580137527)