---
alias: RTK
category: react18
date: 2023-03-19 10:25
title: 47-Redux-Toolkit使用
updated: 2023-05-13 22:56
---

# 47-Redux Toolkit（RTK）

除了 Redux 核心库外 Redux 还为我们提供了一种使用 Redux 的方式——Redux Toolkit。它的名字起的非常直白，Redux 工具包，简称 RTK。RTK 可以帮助我们处理使用 Redux 过程中的重复性工作，简化 Redux 中的各种操作。

### 在 React 中使用 RTK

安装，无论是 RTK 还是 Redux，在 React 中使用时 `react-redux` 都是必不可少，所以使用 RTK 依然需要安装两个包：`react-redux` 和`@reduxjs/toolkit` 。

npm

`npm install react-redux @reduxjs/toolkit -S`

## 使用 RTK 来构建 store

### createSlice 创建 reducer 的切片

它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置

切片对象会自动的帮助我们生成 action，保存在 actions 中

actions 中存储的是 slice 自动生成 action 创建器（函数），调用函数后会自动创建 action 对象。

action 对象的结构 `{type:name/函数名, payload:函数的参数} `

```js
//使用RTK来构建store
import { configureStore, createSlice } from "@reduxjs/toolkit";

const stuSlice = createSlice({
  name: "stu", // 用来自动生成action中的type
  initialState: {
    name: "孙悟空",
    age: 18,
    gender: "男",
    address: "花果山",
  }, // state的初始值
  reducers: {
    // 指定state的各种操作，直接在对象中添加方法
    setName(state, action) {
      // 可以通过不同的方法来指定对state的不同操作
      // 两个参数：state 这个state的是一个代理对象，可以直接修改，不需要浅复制
      state.name = "猪八戒";
    },
    setAge(state, action) {
      state.age = 28;
    },
  },
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const { setName, setAge } = stuSlice.actions;
```

### configureStore 创建 store

将多个 stuSlice 的 `reducer` ，保存到 store

用来创建 store 对象，需要一个配置对象作为参数

```js
// 创建store
const store = configureStore({
  reducer: {
    student: stuSlice.reducer,
  },
});

export default store;
```