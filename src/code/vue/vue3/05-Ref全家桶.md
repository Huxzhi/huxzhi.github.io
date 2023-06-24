---
category: vue3
date: 2023-01-01 18:03
title: 05-Ref全家桶
updated: 2023-05-13 22:56
---

# ref

绑定简单数据类型
接受一个内部值并返回一个 响应式 且可变的 ref 对象。ref 对象仅有一个  `.value` property，指向该内部值。

绑定复杂的数据类型 [06-Reactive 全家桶](06-Reactive全家桶.md)

案例

我们这样操作是无法改变 message  的值 应为 message 不是响应式的无法被 vue 跟踪要改成 ref

改为 ref

Ref TS 对应的接口

```ts
interface Ref<T> {
  value: T
}
```

==注意被 ref 包装之后需要 `.value` 来进行赋值==

# `isRef`

`判断是不是一个ref对象`

```ts
import { ref, Ref,isRef } from 'vue'
let message: Ref<string | number> = ref("我是message")
let notRef:number = 123
const changeMsg = () => {
  message.value = "change msg"
  console.log(isRef(message)); //true
  console.log(isRef(notRef)); //false

}
```

## `shallowRef`

创建一个跟踪自身  `.value`  变化的 ref，但不会使其值也变成响应式的

### ref 和 shallowRef 的区别

ref 深层次
shallowRef 浅层次的响应，只到 `.value`

ref 和 shallowRef 是不能一块写的 不然 会影响 shallowRef 造成视图的更新

例子

修改其属性是非响应式的这样是不会改变的

```vue
<template>
  <div>
    <button @click="changeMsg">change</button>
    <div>{{ message }}</div>
  </div>
</template>



<script setup lang="ts">
import { Ref, shallowRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "小满"
})

const changeMsg = () => {
  message.value.name = '大满'
}
</script>


<style>
</style>
```

例子 2

这样是可以被监听到的修改 `value`

```ts
import { Ref, shallowRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "小满"
})

const changeMsg = () => {
  message.value = { name: "大满" }
}
```

## triggerRef 

强制更新页面 DOM

这样也是可以改变值的

```ts
const changeMsg = () => {
    message.value.name = '大满'
    triggerRef(message)
}
```

## customRef

自定义 ref

customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set  适合去做防抖之类

```vue
<template>

  <div ref="div">小满Ref</div>
  <hr>
  <div>
    {{ name }}
  </div>
  <hr>
  <button @click="change">修改 customRef</button>

</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, shallowRef, customRef } from 'vue'

function myRef<T = any>(value: T) {
  let timer:any;
  return customRef((track, trigger) => {
    return {
      get() {
        track() //收集依赖
        return value
      },
      set(newVal) {
        clearTimeout(timer) //可以设置防抖，500毫秒触发一次
        timer =  setTimeout(() => {
          console.log('触发了set')
          value = newVal
          trigger() //触发依赖
        },500)
      }
    }
  })
}


const name = myRef<string>('小满')


const change = () => {
  name.value = '大满'
}

</script>
<style scoped>
</style>
```