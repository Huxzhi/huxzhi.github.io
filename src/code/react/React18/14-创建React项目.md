---
category: react18
date: 2023-02-26 20:23
title: 14-创建React项目
updated: 2023-05-13 22:56
---

# 创建React项目
- 创建项目，目录结构如下

```sh
根目录
    - public
        - index.html （添加标签 <div id="root"></div>）
    - src
        - App.js
        - index.js
```

- 进入项目所在目录，并执行命令：`npm init -y`  或  `yarn init -y`
- 安装项目依赖：`npm install react react-dom react-scripts -S`  或  `yarn add react react-dom react-scripts`
- 运行`npx react-scripts start`启动项目（初次启动需要输入 y 确认）
- 或者将`react-scripts start`设置到`package.json`的 scripts 选项中，然后通过`npm start`启动（初次启动需要输入 y 确认）”scripts”: { “start”: “react-scripts start” }

## react 一定需要两个文件

- `public/index.html'
- `src/index.js`

`public/index.html`
提供 root 根节点

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>学习日志</title>
</head>
<body>
<div id="root"></div>

</body>
</html>

```

`src/index.js`

挂载到 根节点

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// React组件可以直接通过JSX渲染
root.render(<App/>);
```