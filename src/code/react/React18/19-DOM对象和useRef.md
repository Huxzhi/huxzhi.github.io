---
category: react18
date: 2023-03-04 19:56
title: 19-DOM对象和useRef
updated: 2023-05-13 22:56
---

## 获取原生的 DOM 对象

### 可以使用传统的 document 来对 DOM 进行操作

```js
// 通过id获取h1
const header = document.getElementById('header');
```

### 直接从 React 处获取 DOM 对象

步骤：

1. 创建一个存储 DOM 对象的容器
   - 使用 useRef() 钩子函数
   - 钩子函数的注意事项：
     1. React 中的钩子函数只能用于 **函数组件** 或自定义钩子
     2. 钩子函数只能直接在函数组件中调用
2. 将容器设置为想要获取 DOM 对象元素的 ref 属性
   - `<h1 ref={xxx}>....</h1>`
   - React 会自动将当前元素的 DOM 对象，设置为容器 current 属性

```jsx
const App = () => {
    const h1Ref = useRef(); // 创建一个容器

    //可以直接修改<h1>的innerText 内容
    h1Ref.current.innerText = '嘻嘻！';

    return <div className={'app'}>
        {/* 绑定 h1Ref */}
        <h1 id="header" ref={h1Ref}>我是标题{count}</h1>
    </div>;
};

// 导出App
export default App;
```

操作 要绑定的 DOM，调用 h1Ref.current.方法 即可

## useRef()

```jsx
const h1Ref = useRef(); // 创建一个容器

//也可以绑定上 DOM 
const h1Ref = {current:undefined};
```

- 返回的就是一个普通的 JS 对象

- 所以我们直接创建一个 js 对象  `{current:undefined}` ，也可以代替 useRef()
- 区别：
    - 我们创建的对象，组件每次重新渲染都会创建一个新对象。因为这个对象在函数作用域，组件函数每次重新执行，就会创建一个新对象
      useRef()创建的对象，可以确保每次渲染获取到的都是同一个对象
    - 当你需要一个对象不会因为组件的重新渲染而改变时，就可以使用 useRef()

验证
```jsx
let temp

```