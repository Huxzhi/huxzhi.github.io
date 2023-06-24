---
category: react18
date: 2023-03-17 10:12
title: 40-useReducer整合器
updated: 2023-05-13 22:56
---

# 40-useReducer 整合器

接收一个 reducer 函数作为第一个参数，第二个参数是初始化的 state。useReducer 最终返回一个存储有当前状态值的数组和一个 dispatch 函数，该 dispatch 函数执行触发 action，带来状态的变化。

```js
const [state, dispatch()] = useReducer(reducer:[state, action:{}] => {...}, initialArg:state, init?)
```

- 参数
  - reducer : 整合函数
    - 对于我们当前 state 的所有操作都应该在该函数中定义
    - 该函数的返回值，会成为 state 的新值
    - reducer 在执行时，会收到两个参数：
      - state 当前最新的 state
      - action 它需要一个对象 - 在对象中会存储 dispatch 所发送的指令
  - initialArg : state 的初始值，作用和 useState()中的值是一样
- 返回值：
  - 数组：
    - 第一个参数，state 用来获取 state 的值
    - 第二个参数，state 修改的派发器 - 通过派发器可以发送操作 state 的命令 - 具体的修改行为将会由另外一个函数(reducer)执行

```jsx
// 为了避免reducer会重复创建，通常reducer会定义到组件的外部
const countReducer = (state, action) => {
    // 可以根据action中不同type来执行不同的操作
    switch (action.type) {
    case "ADD":
      return state + 1;
    case "SUB":
      return state - 1;
    default:
      return state;
    }
};
const App = () => {
    const [count, countDispatch] = useReducer(countReducer, 1);
}
```

## useReducer 可以让我们将 `what` 和 `how` 分开

useReducer 可以让我们将`what`和`how`分开。比如点击了登录按钮，我们要做的就是发起登陆操作`dispatch({ type: 'login' })`，点击退出按钮就发起退出操作`dispatch({ type: 'logout' })`，所有和`how`相关的代码都在 reducer 中维护，组件中只需要思考`What`，让我们的代码可以像用户的行为一样，更加清晰。