---
category: react18
date: 2023-03-15 16:31
title: 38-setState的执行流程
updated: 2023-05-13 22:56
---

# 38-setState 的执行流程

`Too many re-renders.`

- 当我们直接在函数体中调用 setState 时，就会触发上述错误
- 问题：
  不是说过，当新的 state 值和旧值相同时，它是不会触发组件的重新渲染的

## setState()的执行流程（函数组件）

`setCount()` --> `dispatchSetDate()`
--> 会先判断，组件当前处于什么阶段

- ==如果是渲染阶段 --> 不会检查 state 值是否相同==
- 如果不是渲染阶段 --> 会检查 state 的值是否相同
  - 如果值不相同，则对组件进行重新渲染
  - 如果值相同，则不对组件进行重新渲染
    如果值相同，React 在一些情况下会继续执行当前组件的渲染
    但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果
    这种情况通常发生在值第一次相同时

> 渲染阶段为，函数返回 return `<div>...</div>` 之前

```
count 0
    第一次点击按钮 count 0 --> 1
        'App组件重新渲染了！' 执行了
    第二次点击按钮 count 1 --> 1
        'App组件重新渲染了！' 执行了
    第三次点击按钮 count 1 --> 1
        'App组件重新渲染了！' 没执行
```


## 解决办法

临时解决，用定时器，因为是异步函数，必须等主线程执行完后才进行
```jsx
const [count, setCount] = useState(0);

setTimeout(()=>{
    setCount(1);
},0)
```

更好的解决办法： [39-useEffect副作用-组件渲染后执行](39-useEffect副作用-组件渲染后执行.md)