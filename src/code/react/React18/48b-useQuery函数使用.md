---
category: react18
date: 2023-03-19 22:07
title: 48b-useQuery函数使用
updated: 2023-05-13 22:56
---

# 48b-useQuery 函数使用

useQuery 调用时 生效

## useQuery 返回结果

### 属性名介绍

```js
currentData: undefined // 当前参数的最新数据
data: undefined // 最新的数据
isError: false // 布尔值，是否有错误
    error: Error() // 对象，有错时才存在
isFetching: true // 布尔值，数据是否在加载
isLoading: true // 布尔值，数据是否第一次加载
isSuccess: false // 布尔值，请求是否成功
isUninitialized: false // 布尔值，请求是否还没有开始发送
refetch: ƒ () // 一个函数，用来重新加载数据
status: "pending" // 字符串，请求的状态
```

### 注意点

- 一般用 `isFetching` 判断是不是加载
- `currentData` 当参数发生变化时，变成 `undefined`，用于等待数据返回。一般用 `data` 就好了

## useQuery 参数介绍

useQuery 可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置

```js
const result = useGetStudentsQuery(null, {
    pollingInterval:0, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
    skip:false, // 设置是否跳过当前请求，默认false
    refetchOnMountOrArgChange:false, // 设置是否每次挂载或参数改变都重新加载数据。false正常使用缓存，true每次都重载数据；或者数字，数据缓存的时间（秒）
    refetchOnFocus:false, // 是否在重新获取焦点时重载数据
    refetchOnReconnect:true, // 是否在重新连接后重载数据
});
```

### 用来指定 useQuery 返回的结果

在 useQuery() 中进行过滤

```js
const result = useGetStudentsQuery(null, {
    selectFromResult: result => {
        if (result.data) {
            result.data = result.data.filter(item => item.attributes.age < 18);
        }

        return result;
    },
}
```

### skip 使用

可以根据组件的 props 决定需不需要去发送数据请求

```js
  // 调用钩子来加载数据
    const {data:stuData, isSuccess, isFetching} = useGetStudentByIdQuery(props.stuId, {
        skip:!props.stuId,
        refetchOnMountOrArgChange:false
    });
```

### 重新获取焦点时重载数据

refetchOnFocus

`setupListeners(store.dispatch); `
设置以后，将会支持 refetchOnFocus refetchOnReconnect

```js
import {configureStore} from "@reduxjs/toolkit";
import studentApi from "./studentApi";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer
    },

    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware)
});

setupListeners(store.dispatch); // 设置以后，将会支持 refetchOnFocus refetchOnReconnect

export default store;

```