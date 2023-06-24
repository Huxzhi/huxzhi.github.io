---
category: vue3
date: 2023-01-13 12:52
title: 03-state
updated: 2023-05-13 22:56
---

有 5 种方式

1. Test.current++
2. Test.$patch({ current:888,name:"娃娃"})
3. Test.$patch((state)=>{ state.current = 999 state.name ='范冰冰'})
4. Test.$state = { current:2000, name:"小满娃娃"}
5. action: Test.setCurrent(567)

# 1.State 是允许直接修改值的 例如 current++

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
     </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.current++
}

</script>
```

# 2.批量修改 State 的值

在他的实例上有$patch 方法可以批量修改多个值

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch({
       current:200,
       age:300
    })
}

</script>
```

# 3.批量修改函数形式

推荐使用函数形式 可以自定义修改逻辑

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch((state)=>{
       state.current++;
       state.age = 40
    })
}

</script>
```

# 4.通过原始对象修改整个实例

`$state`您可以通过将 store 的属性设置为新对象来替换 store 的整个状态

缺点就是必须修改整个对象的所有属性

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$state = {
       current:10,
       age:30
    }
}

</script>
```

# 5.通过 actions 修改

定义 Actions

在 actions 中直接使用 this 就可以指到 state 里面的值

```ts
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
     state:()=>{
         return {
            current:1,
            age:30
         }
     },

     actions:{
         setCurrent () {
             this.current++
         }
     }
})
```

> 在 state 中返回的对象，会自动挂载到这个 store 实例身上，可以在 getters 和 actions 通过访问 this 来获取和改变状态

使用方法直接在实例调用

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.setCurrent()
}

</script>
```