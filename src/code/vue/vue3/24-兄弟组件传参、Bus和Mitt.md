---
category: vue3
date: 2023-01-05 18:02
title: 24-兄弟组件传参、Bus和Mitt
updated: 2023-05-13 22:56
---

在 vue3 中`$on`，`$off`  和  `$once`  实例方法已被移除，组件实例不再实现事件触发接口，因此大家熟悉的 `EventBus` 便无法使用了。然而我们习惯了使用 `EventBus`，对于这种情况我们可以使用 `Mitt` 库（其实就是我们视频中讲的发布订阅模式的设计）

# 3.Mitt

## 1.安装

`npm install mitt -S`

## 2.main.ts 初始化

全局总线，vue 入口文件 main.js 中挂载全局属性

```ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const Mit = mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

const app = createApp(App)

//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

app.mount('#app') 作者：小满zs https://www.bilibili.com/read/cv16107098?spm_id_from=333.999.0.0 出处：bilibili
```

## 3 使用方法通过 emit 派发， on 方法添加事件，off 方法移除，clear 清空所有

### A 组件派发（`emit()`）

```ts
<template>
    <div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>

<style>
</style>
```

### B 组件监听（`on()`）

```vue
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>

<style>
</style>
```

### 监听所有事件（ `on("*") `）

```ts
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})

```

### 移除监听事件（off）

```ts
const Fn = (num: any) => {
console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

### 清空所有监听（clear）

```ts
instance?.proxy?.$Bus.all.clear()
```

以下两种方案是基础，但不常用了

# 1.借助父组件传参

例如父组件为 App 子组件为 A 和 B 他两个是同级的
App.vue

```vue
<template>
    <div>
        <A @on-click="getFalg"></A>
        <B :flag="Flag"></B>
    </div>
</template>

<script setup lang='ts'>
import A from './components/A.vue'
import B from './components/B.vue'
import { ref } from 'vue'
let Flag = ref<boolean>(false)
const getFalg = (flag: boolean) => {
   Flag.value = flag;
}
</script>

<style>
</style>
```

A.vue

```ts
const emit = defineEmits(['on-click'])
let flag = false
const emitB = () =>{
    flag =! flag
    emit('on-click',flag)
}
```

B.vue

```ts
type Props = {
    flag:boolean
}

defineProps<Props>()
```

A 组件派发事件通过 App.vue 接受 A 组件派发的事件然后在 `Props` 传给 B 组件 也是可以实现的

缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

# 2.Event Bus

我们在 Vue2 可以使用 `$emit` 传递 `$on` 监听 `emit` 传递过来的事件，

全局事件总线

这个原理其实是运用了 ==JS 设计模式之发布订阅模式==

我写了一个简易版

```ts
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
    // off: 先不写了
}
type BusParams = string | number | symbol //类型约束
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() { //调度中心
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || []; //如果有同名，添加到数组队列
        fn.push(callback)
        this.list[name] = fn
    }
}

export default new Bus<number>()
```