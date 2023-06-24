---
category: react18
date: 2023-02-18 20:28
title: 11-JSX
updated: 2023-05-13 22:56
---

# 11-JSX

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。JSX 便是 React 中声明式编程的体现方式。声明式编程，简单理解就是以结果为导向的编程。使用 JSX 将我们所期望的网页结构编写出来，然后 React 再根据 JSX 自动生成 JS 代码。所以我们所编写的 JSX 代码，最终都会转换为以调用 `React.createElement()` 创建元素的代码。

## 创建一个 React 元素

`<button>我是按钮</button>`

### 命令式编程

`const button = React.createElement('button', {}, '我是按钮');`

### 声明式编程，结果导向的编程

在 React 中可以通过 JSX（JS 扩展）来创建 React 元素，JSX 需要被翻译为 JS 代码，才能被 React 执行

要在 React 中使用 JSX，必须引入 babel 来完成“翻译”工作
`const button = <button>我是按钮</button>; // React.createElement('button', {}, '我是按钮');`

JSX 就是 `React.createElement()` 的语法糖
JSX 在执行之前都会被 `babel` 转换为 js 代码

```jsx
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>JSX</title>
    <script src="script/react.development.js"></script>
    <script src="script/react-dom.development.js"></script>
<!-- 引入babel -->
    <script src="script/babel.min.js"></script>
</head>
<body>
<div id="root"></div>

<!--设置js代码被babel处理-->
<script type="text/babel">

    // 创建一个React元素 <button>我是按钮</button>
    // 命令式编程
    // const button = React.createElement('button', {}, '我是按钮');

    // 声明式编程，结果导向的编程
    // 在React中可以通过JSX（JS扩展）来创建React元素，JSX需要被翻译为JS代码，才能被React执行
    // 要在React中使用JSX，必须引入babel来完成“翻译”工作
    // const button = <button>我是按钮</button>; // React.createElement('button', {}, '我是按钮');

    /*
    *   JSX就是React.createElement()的语法糖
    *       JSX在执行之前都会被babel转换为js代码
    * */
    const div = <div>
        我是一个div
        <button>我是按钮</button>
    </div>;

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(div);

</script>
</body>
</html>

```