---
category: react18
date: 2023-02-16 19:14
title: 09-HelloReact
updated: 2023-05-13 22:56
---

## React 就是用来代替 DOM 的

### 通过 DOM 向页面中添加一个 div

```js
// 创建一个div
const div = document.createElement('div'); // 创建一个dom元素
// 向div中设置内容
div.innerText = '我是一个div';
// 获取root
const root = document.getElementById('root');
// 将div添加到页面中
root.appendChild(div);
```

### 通过 React 向页面中添加一个 div

React.createElement()

-   用来创建一个 React 元素
-   参数：
    1. 元素名（组件名）
    2. 元素中的属性
    3. 元素的子元素（内容）

```html
<body>
    <div id="root"></div>
    
    <script>
    const div = React.createElement("div", {}, "我是React创建的div"); // 创建一个React元素
    
    // 获取根元素对应的React元素
    //  ReactDOM.createRoot() 用来创建React根元素，需要一个DOM元素作为参数
    const root = ReactDOM.createRoot(document.getElementById("root"));
    
    // 将div渲染到根元素中
    root.render(div);
    </script>
</body>
```