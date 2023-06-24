---
category: vue3
date: 2023-01-02 19:16
title: 11-watchEffect
updated: 2023-05-13 22:56
---

# watchEffect

立即执行传入的一个函数，同时[响应式](https://so.csdn.net/so/search?q=%E5%93%8D%E5%BA%94%E5%BC%8F&spm=1001.2101.3001.7020)追踪其依赖，并在其依赖变更时重新运行该函数。

如果用到 message 就只会监听 message 就是用到几个监听几个 而且是非惰性 会默认调用一次

```ts
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect(() => {
    //console.log('message', message.value);
    console.log('message2', message2.value);
})
```

### 清除副作用

就是在触发监听之前会调用一个函数可以处理你的逻辑例如 防抖

```ts
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{

    })
    console.log('message2', message2.value);
})
```

## 停止跟踪 watchEffect

返回一个函数 调用之后将停止更新

官网就是这么写的，

```ts
const stop =  watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{

    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {

    }
})
stop()
```

## 更多的配置项

### 副作用刷新时机 flush 一般使用 post

|          | pre                | sync                 | post               |
| -------- | ------------------ | -------------------- | ------------------ |
| 更新时机 | 组件**更新前**执行 | 强制效果始终同步触发 | 组件**更新后**执行 |

**onTrigger  可以帮助我们调试  watchEffect**

```ts
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{

    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {

    }
})
```