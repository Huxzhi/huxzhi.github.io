---
date: 2023-03-25 20:46
updated: 2023-05-13 22:56
---

vue 组件传参

1. 父传子传参: props [14-父子组件传参](../../vue/vue3/14-父子组件传参.md)
2. 子传父传参： emit 触发组建的自定义事件
3. 兄弟组件传参:事件总线 BUS vue3 使用 mitt 插件 [24-兄弟组件传参、Bus 和 Mitt](../../vue/vue3/24-兄弟组件传参、Bus和Mitt.md)

## 父传子传参

父组件通过标签属性进行数据传递
`<PageHeader msg="我是传递的数据" />`

子组件通过 `defineProps` 获取父组件传过来的数据
子组件不允许更改父组件的数据，如果要改变数据，用 emit 触发父组件，由父组件修改值

```vue
<script setup>
// defineProps的参数为 标签属性
const props = defineProps(["msg"])
</script>
<template>
    <div>
        <hr/>
        <h5>我是子组件</h5>
        <p> {{props.msg}}</p>
    </div>
</template>
```

## 子传父传参

emits 触发组建的自定义事件

## 兄弟组件传参

`mitt` 是个订阅发布机制。`on` 是订阅，`emit` 派发

事件总线：相当于全局的事件管理
使用：

mitt.emit("方法名"，参数）：触发某个方法
mitt.on("对应方法名",callback)：监听某个方法
mitt.off("移除对应方法")：移除某个方法 一般放在 onUnmounted 声明周期里面
###  举例
utils/bus.js
引用同一个示例对象

```js
export mitt from "mitt"
export default new mitt()
```

emit 派发事件

```js
const handleChange2=()=>{
    // 事件名 和 要传递的值
    bus.emit("broutherData", sonMsg.value)
}
```

on 订阅 如果存在 `broutherData` 触发回调函数。同一个地方订阅两遍会触发两次

```js
//bus = new mitt()
bus.on("broutherData", (value)=>{
    console.log("我是footer组件的监听回调",value)
})
```

off 要在组件销毁的时候取消订阅

```js
onUnmounted(()=>{
  bus.off("broutherData")
}
```
