---
category: vue3
date: 2023-01-13 12:13
title: 02-初始化仓库Store
updated: 2023-05-13 22:56
---

**1.新建一个文件夹Store**

**2.新建文件[name].ts**

**3.定义仓库Store**

```typescript
import { defineStore } from 'pinia'
```

**4.我们需要知道存储是使用定义的`defineStore()`，并且它需要一个唯一的名称，作为第一个参数传递**

我这儿名称抽离出去了
新建文件store-namespace/index.ts

```typescript
export const enum Names {    Test = 'TEST'}
```

store 引入

```ts
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
 
})
```
这个名称，也称为id，是必要的，Pania 使用它来将商店连接到 devtools。将返回的函数命名为use...是可组合项之间的约定，以使其使用习惯。

**5.定义值**

**State 箭头函数 返回一个对象 在对象里面定义值**

```ts
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     }
})
```


```ts
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     },
     //类似于computed 可以帮我们去修饰我们的值
     getters:{
 
     },
     //可以操作异步 和 同步提交state
     actions:{
 
     }
})
```