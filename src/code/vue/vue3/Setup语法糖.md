---
category: vue3
date: 2023-01-02 21:14
title: Setup 语法糖
updated: 2023-05-13 22:56
---

它是 Vue3 的一个新语法糖，在 `setup` 函数中。所有 ES 模块导出都被认为是暴露给上下文的值，并包含在 setup() 返回对象中。相对于之前的写法，使用后，语法也变得更简单。

使用方式极其简单，仅需要在 `script` 标签加上 `setup` 关键字即可。示例：

### 组件自动注册

在 script setup 中，引入的组件可以直接使用，无需再通过`components`进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，也就是不用再写`name`属性了。示例：

```js
<template>
    <Child />
</template>

<script setup>
import Child from './Child.vue'
</script>
```

如果需要定义类似 name 的属性，可以再加个平级的 script 标签，在里面实现即可。

### 组件核心 API 的使用

#### 使用 props

通过`defineProps`指定当前 props 类型，获得上下文的props对象。示例：

```js
<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    title: String,
  })
</script>
```

### 属性和方法无需返回，直接使用！

这可能是带来的较大便利之一，在以往的写法中，定义数据和方法，都需要在结尾 return 出去，才能在模板中使用。在 script setup 中，定义的属性和方法无需返回，可以直接使用！示例：

```js
<template>
  <div>
   	<p>My name is {{name}}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Sam')
</script>
```