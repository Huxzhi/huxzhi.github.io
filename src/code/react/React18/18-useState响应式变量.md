---
category: react18
date: 2023-03-01 21:59
title: 18-useState响应式变量
updated: 2023-05-08 09:06
---

> 代码也是有后台的 xswl🤣

state 和 props 类似，都是一种存储属性的方式，但是不同点在于 state 只属于当前组件，其他组件无法访问。并且 state 是可变的，当其发生变化后组件会自动重新渲染，以使变化在页面中呈现。

# state

在 React 中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染

要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染
这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染

state 相当于一个变量，

只是这个变量在 React 中进行了注册，
React 会监控这个变量的变化，当 state 发生变化时，会自动触发组件的重新渲染
使得我们的修改可以在页面中呈现出来
在函数组件中，我们需要通过 [钩子函数](18.a-hook钩子函数.md) ，获取 state

## 标准写法

使用钩子 useState() 来创建 state

```js
import {useState} from "react";
```

它需要一个值作为参数，这个值就是 state 的初始值

该函数会返回一个数组

- 数组中第一个元素，是==初始值== - 初始值只用来显示数据，直接修改不会触发组件的重新渲染
- 数组中的第二个元素，是一个函数，通常会命名为 setXxx - 这个函数用来修改 state，调用其修改 state 后会==触发组件的重新渲染==，并且使用函数中的值作为新的 state 值

```jsx
const [counter, setCounter] = useState(1);
const addHandler = () => {
  setCounter(counter + 1); // 将counter值修改为2
};

return <div className={'app'}>
    <h1>{counter}</h1>
    <button onClick={addHandler}>+</button>
  </div>;
```

等价于

```js
const result = useState(1);
// counter 是初值
let counter = result[0];
// setCounter 调用该函数，重新渲染视图
let setCounter = result[1];
```

`setCounter` 其实就是 重新调用 `render` 函数，又因为 `diff` 算法，如果元素不发生改变，不会调用 render

## 注意事项

- 当 state 的值是一个对象时，修改时是使用新的对象去替换已有对象。==修改对象的属性不会触发 diff 算法==，
  - 用浅拷贝，可以生成新对象，再修改新对象的属性值 `const newObj = Object.assign({}, Obj); newObj.age=18.setObj(newObj)`
  - `setuser({...user,age:19})` ，基础好的话就可以这样
- 当通过 setState 去修改一个 state 时，并不表示修改当前的 state
  它修改的是组件==下一次渲染时 state 值==
  - `const counter = 1;` counter 是常量，也不能修改的
- setState()会触发组件的重新渲染，它是异步的。
  - 在异步队列，等待主线程计算完成，再渲染。所以当调用 setState()需要用旧 state 的值时，一定要注意有可能出现计算错误的情况
  - 为了避免这种情况，可以通过为 setState()传递回调函数的形式来修改 state 值

```js
const addHandler = () => {
    setTimeout(() => {
        // setCounter(counter + 1); // 将counter值修改为2
        setCounter((prevCounter)=>{

            /*
            *   setState()中回调函数的返回值将会成为新的state值
            *       回调函数执行时，React会将最新的state值作为参数传递
            * */
            return prevCounter + 1;
        });

        // setCounter(prevState => prevState + 1);
    }, 1000);

```

- setState 中的回调函数是异步回调，将会把当前同步函数执行一遍，再执行回调，因此获得的是最新的值