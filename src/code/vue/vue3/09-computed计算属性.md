---
category: vue3
date: 2023-01-02 16:29
title: 09-computed计算属性
updated: 2023-05-13 22:56
---

# computed用法

计算属性 就是当依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值。

不需要在 改变值的方法里面调用 计算函数

##  函数形式
```ts
import { computed, reactive, ref } from 'vue'
let price = ref(0)//$0
 
let m = computed<string>(()=>{
   return `$` + price.value
})
 
price.value = 500
```

## 对象形式
```ts
<template>
   <div>{{ mul }}</div>
   <div @click="mul = 100">click</div>
</template>
 
<script setup lang="ts">
import { computed, ref } from 'vue'
let price = ref<number | string>(1)//$0
let mul = computed({
   get: () => {
      return price.value
   },
   set: (value) => {
      price.value = 'set' + value
   }
})
</script>
 
<style>
</style>
```

## computed购物车案例

```vue
<template>
   <div>
      <table style="width:800px" border>
         <thead>
            <tr>
               <th>名称</th>
               <th>数量</th>
               <th>价格</th>
               <th>操作</th>
            </tr>
         </thead>
         <tbody>
            <tr :key="index" v-for="(item, index) in data">
               <td align="center">{{ item.name }}</td>
               <td align="center">
                  <button @click="AddAnbSub(item, false)">-</button>
                  {{ item.num }}
                  <button @click="AddAnbSub(item, true)">+</button>
               </td>
               <td align="center">{{ item.num * item.price }}</td>
               <td align="center">
                  <button @click="del(index)">删除</button>
               </td>
            </tr>
         </tbody>
         <tfoot>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td align="center">总价:{{ $total }}</td>
            </tr>
         </tfoot>
      </table>
   </div>
</template>
 
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
type Shop = {
   name: string,
   num: number,
   price: number
}
let $total = ref<number>(0)
const data = reactive<Shop[]>([
   {
      name: "小满的袜子",
      num: 1,
      price: 100
   },
   {
      name: "小满的裤子",
      num: 1,
      price: 200
   },
   {
      name: "小满的衣服",
      num: 1,
      price: 300
   },
   {
      name: "小满的毛巾",
      num: 1,
      price: 400
   }
])
 
const AddAnbSub = (item: Shop, type: boolean = false): void => {
   if (item.num > 1 && !type) {
      item.num--
   }
   if (item.num <= 99 && type) {
      item.num++
   }
}
const del = (index: number) => {
   data.splice(index, 1)
}
 
 
 
$total = computed<number>(() => {
   return data.reduce((prev, next) => {
      return prev + (next.num * next.price)
   }, 0)
})
 
 
 
</script>
 
<style>
</style>
```