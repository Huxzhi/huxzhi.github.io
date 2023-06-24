---
category: vue3
date: 2023-01-04 14:33
title: 18-异步组件和代码分包和suspense
updated: 2023-05-13 22:56
---

# 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积

这时候就可以使用异步组件

<!-- [原生 Ajax 封装 axios](../code/原生Ajax封装axios.md) -->

## 引入方式不同

```ts
import { defineAsyncComponent } from 'vue'

//专门的函数引入
const SyncVue = defineAsyncComponent(() => import('@/components/sync.vue')
```

使用`<suspense>`插槽
见下面👇

# 顶层  `await`

`在setup语法糖里面 使用方法`

`<script setup>`  中可以使用顶层  `await`。结果代码会被编译成  `async setup()`

```vue
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

父组件引用子组件 通过 `defineAsyncComponent` 加载异步配合 import 函数模式便可以分包

```vue
<script setup lang="ts">
import { reactive, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'

const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))

//完整写法

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

# suspense

`<suspense>`  组件有两个插槽。它们都只接收一个直接子节点。
- `default`  插槽里的节点会尽可能展示出来。如果不能，则展示 
- `fallback`  插槽里的节点。

```vue
     <Suspense>
            <template #default>
                <Dialog>
                    <template #default>
                        <div>我在哪儿</div>
                    </template>
                </Dialog>
            </template>

            <template #fallback>
                <div>loading...</div>
            </template>
        </Suspense>
```