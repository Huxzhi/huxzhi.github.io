---
date: 2023-01-13 16:30
title: 07-pinia插件
---

pinia 和 vuex 都有一个通病 页面刷新状态会丢失

我们可以写一个pinia 插件缓存他的值

**视频教程(强烈建议)** [Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1dS4y1y7vd?p=49 "Vue3 + vite + Ts + pinia + 实战 + 源码_哔哩哔哩_bilibili")

```ts
const __piniaKey = '__PINIAKEY__'
//定义兜底变量
 
 
type Options = {
   key?:string
}
//定义入参类型
 
 
 
//将数据存在本地
const setStorage = (key: string, value: any): void => {
 
localStorage.setItem(key, JSON.stringify(value))
 
}
 
 
//存缓存中读取
const getStorage = (key: string) => {
 
return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
 
}
 
 
//利用函数柯丽华接受用户入参
const piniaPlugin = (options: Options) => {
 
//将函数返回给pinia  让pinia  调用 注入 context
return (context: PiniaPluginContext) => {
 
const { store } = context;
 
const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
 
store.$subscribe(() => {
 
setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));
 
})
 
//返回值覆盖pinia 原始值
return {
 
...data
 
}
 
}
 
}
 
 
//初始化pinia
const pinia = createPinia()
 
 
//注册pinia 插件
pinia.use(piniaPlugin({
 
key: "pinia"
 
}))
```