---
category: vue3
date: 2023-01-06 16:03
title: 26-深入v-model
updated: 2023-05-13 22:56
---

# v-model

## v-model Vue 内置指令

- Input
- Select
- 表单元素
- 自定义组件

> [!tip] TIps
> ==在 Vue3 v-model 是破坏性更新的==

`v-model` 在组件里面也是很重要的

`v-model` 其实是一个语法糖 通过 `props` 和 `emit` 组合而成的

默认值的改变
vue2 → vue3 改变

- prop：value -> modelValue；
- 事件：input -> update:modelValue；
- v-bind 的 .sync 修饰符和组件的 model 选项已移除
- 新增 支持多个 v-model
- 新增 支持自定义 修饰符 Modifiers

## 案例 v-model 绑定

子组件

```vue
<template>
     <div v-if='propData.modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>

     </div>
</template>

<script setup lang='ts'>

type Props = {
   modelValue:boolean
}

const propData = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
     emit('update:modelValue',false)
}

</script>

<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>

<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>

<style>
</style>
```

## 绑定多个案例

子组件

```vue
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>

     </div>
</template>

<script setup lang='ts'>

type Props = {
   modelValue:boolean,
   title:string
}

const propData = defineProps<Props>()

const emit = defineEmits(['update:modelValue','update:title'])

const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}

</script>

<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog v-model:title='title' v-model="show"></Dialog>
</template>

<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
const title = ref('我是标题')
</script>

<style>
</style>
```

## 自定义修饰符

添加到组件  `v-model`  的修饰符将通过  `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的  `modelModifiers` prop

```ts
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }

}

const propData = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'update:title'])

const close = () => {
    console.log(propData.modelModifiers);

    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```