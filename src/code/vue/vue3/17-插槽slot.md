---
category: vue3
date: 2023-01-03 22:18
title: 17-插槽slot
updated: 2023-05-13 22:56
---

插槽就是子组件中的提供给父组件使用的一个 **占位符** ，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的 `<slot> </slot>`标签。

使用场景就是：组件复用但是内部有少量的改动，使用插槽根据需求修改就行了

## 匿名插槽

1.在子组件放置一个插槽

```vue
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```vue
    <Dialog>
       <template v-slot>
           <div>2132</div>
       </template>
    </Dialog>
```

## 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```vue
    <div>
        <slot name="header"></slot>
        <slot></slot>

        <slot name="footer"></slot>
    </div>
```

父组件使用需对应名称

```vue
    <Dialog>
        <template v-slot:header>
           <div>1</div>
       </template>
       <template v-slot>
           <div>2</div>
       </template>
       <template v-slot:footer>
           <div>3</div>
       </template>
    </Dialog>
```

### 插槽简写

用 `#` 代替

```vue
    <Dialog>
        <template #header>
           <div>1</div>
       </template>
       <template #default>
           <div>2</div>
       </template>
       <template #footer>
           <div>3</div>
       </template>
    </Dialog>
```

## 作用域插槽

可以将子组件的值传回父组件

在子组件 `动态绑定` 参数 派发给父组件的 `slot` 去使用

```vue
    <div>
        <slot name="header"></slot>
        <div>
            <div v-for="item in 100">
                <slot :data="item"></slot>
            </div>
        </div>

        <slot name="footer"></slot>
    </div>
```

通过结构方式取值

```vue
     <Dialog>
        <template #header>
            <div>1</div>
        </template>
        <template #default="{ data }">
            <div>{{ data }}</div>
        </template>
        <template #footer>
            <div>3</div>
        </template>
    </Dialog>
```

## 动态插槽

插槽可以是一个变量名

```vue
        <Dialog>
            <template #[name]>
                <div>
                    23
                </div>
            </template>
        </Dialog>
```

使用响应式变量

```ts
const name = ref('header')
```

注意：前提是你插槽要有名字，没有名字默认 `default`