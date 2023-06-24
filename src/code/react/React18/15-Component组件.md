---
category: react18
date: 2023-02-26 20:25
title: 15-Component组件
updated: 2023-05-13 22:56
---

# 15-Component组件

# React 组件

在 React 中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。React 中定义组件的方式有两种：**基于函数的组件** 和 **基于类的组件**。

## 基于函数的组件

基于函数的组件其实就是一个会返回 JSX（React 元素）的普通的 JS 函数，你可以这样定义：

```jsx
import ReactDOM from "react-dom/client";
​
// 这就是一个组件
function App(){
    return <h1>我是一个React的组件！</h1>
}
​
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

函数组件就是一个返回 JSX 的普通
组件的首字母必须是大写

`App.js`

```jsx
function App(){
    return <h1>我是一个React的组件！</h1>
}
​
export default App;
```

或者使用箭头函数

```js
const App = () => {
  return <div>我是App组件！</div>
};

// 导出App
export default App;
```

在其他文件中使用时，需要先通过 import 进行引入：

`index.js`

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";
​
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

引入后通过`<组件名/>`或`<组件名></组件名>`即可引入组件。

## 类组件

- 类组件必须要继承 React.Component
  - 相较于函数组件，类组件的编写要麻烦一下，
  - 但是他俩的功能是一样的

```js
import React from "react";

class App extends React.Component{
    // 类组件中，必须添加一个render()方法，且方法的返回值要是一个jsx
    render() {
        return <div>我是一个类组件</div>;
    }
}

// 导出App
export default App;

```

## 引入样式

那么如何为 React 组件引入样式呢？很简单直接在组件中 import 即可。例如：我们打算为 Button 组件编写一组样式，并将其存储到 Button.css 中。我们只需要直接在 Button.js 中引入 Button.css 就能轻易完成样式的设置。

Button.css：

```js
button{
    background-color: #bfa;
}
```

Button.js：

```js
import './Button.css';
const Button = () => {
    return <button>我是一个按钮</button>;
};
export default Button;
```

使用这种方式引入的样式，需要注意以下几点：

1.  CSS 就是标准的 CSS 语法，各种选择器、样式、媒体查询之类正常写即可。
2.  尽量将 js 文件和 css 文件的文件名设置为相同的文件名。
3.  引入样式时直接 import，无需指定名字，且引入样式必须以./或../开头。
4.  这种形式引入的样式是全局样式，有可能会被其他样式覆盖。