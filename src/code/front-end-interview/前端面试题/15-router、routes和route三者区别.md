---
date: 2023-03-25 19:21
title: 15-router、routes和route三者区别
updated: 2023-05-13 22:56
---

# 15-router、routes 和 route 三者区别

详细： [vue3-router4](../../vue/vue3-router4/README.md)

### router:路由对象

需要用 `use(router)` 挂载在 `app` 上

```js

const router = createRouter({
    history: createWebHistory(),
    routes
})
```

### routes:路由配置项

```js
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        meta: {
            type: "1"
        }
        components: {
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue'),
        }
    },
]

```

### route:当前路由信息

读取当前信息

```js
const $route = useRoute();
console.log("当前路由信息name",$route.name);
```

`route.meta` 专门用来携带信息的
