---
category: vue3
date: 2023-01-13 16:30
title: 07-pinia插件
updated: 2023-05-13 22:56
---

pinia 和 vuex 都有一个通病 页面刷新状态会丢失


**视频教程(强烈建议)** [Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1dS4y1y7vd?p=49 "Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili")


`pinia-plugin-persistedstate` 旨在通过一致的 API 为每个人和每个项目中的 Pinia Store 提供持久化存储。如果你希望保存一个完整的 Store，或者需要细粒化配置 storage 和序列化的方式，该插件都为你提供了相应的功能，并且可以在你想要持久化的 Store 上使用相同的配置。

https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/why.html

## 自己手写一个 持久化插件

我们可以写一个pinia 插件缓存他的值


```ts
import { PiniaPluginContext } from "pinia";
import { toRaw } from "vue";

const __piniaKey = "__PINIAKEY__";
//定义兜底变量

type Options = {
  key?: string;
};
//定义入参类型

//将数据存在本地
const setStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

//存缓存中读取
const getStorage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {};
};

//利用函数柯丽华接受用户入参
export const piniaPlugin = (options: Options) => {
  // 将函数返回给pinia  让pinia  调用 注入 context
  // PiniaPluginContext 被 Pinia 定义好了，不能传入我们自定义的参数，用 curry 解决
  return (context: PiniaPluginContext) => {
    const { store } = context;

    const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`);

    store.$subscribe(() => {
      setStorage(
        `${options?.key ?? __piniaKey}-${store.$id}`,
        toRaw(store.$state)
      );
    });

    //返回值覆盖pinia 原始值
    return {
      ...data,
    };
  };
};

 
 
//main.ts 初始化pinia
const store = createPinia();

// 添加持久化
store.use(
  piniaPlugin({
    key: "pinia",
  })
);

app.use(store);
```
