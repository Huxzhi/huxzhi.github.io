---
category: vue3
date: 2023-01-02 17:48
title: 10-watch侦听器
updated: 2023-05-13 22:56
---

watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用

- watch第一个参数监听源
- watch第二个参数回调函数cb（newVal,oldVal）
- watch第三个参数一个options配置项是一个对象
    ```ts
    {
    immediate:true //是否立即调用一次
    deep:true //是否开启深度监听
    flush:"pre" //pre 组件更新之前调用 sync 同步执行 post 组件更新之后行

    }
    ```

如果是引用类型，旧值和新值是一样的

## 监听Ref 案例

```ts
import { ref, watch } from 'vue'
 
let message = ref({
    nav:{
        bar:{
            name:""
        }
    }
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
},{
    immediate:true,
    deep:true
})
```

## 监听Reactive

使用reactive监听深层对象开启和不开启deep 效果一样

案例2 监听reactive 单一值

变成 **回调函数** 才可以 

```ts
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    name:"",
    name2:""
})
 
 
watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```