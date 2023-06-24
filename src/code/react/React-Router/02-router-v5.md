---
category: 
  - react18
  - react-router-v5
date: 2023-03-20 16:39
title: 02-router-v5
updated: 2023-05-13 22:56
---

# 02-router-v5

## 版本 5

安装：npm

`npm install react-router-dom@5 -S`

## react router 使用步骤

react router 可以将 url 地址和组件进行映射。当用户访问某个地址时，与其对应的组件会自动的挂载

1. 引入 react-router-dom 包
2. 在 index.js 中引入 BrowserRouter 组件
3. 将 BrowserRouter 设置为 ==根组件==

### BrowserRouter

```jsx
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App />
    </Router>
);
```

还有一种路由 `HashRouter` 详细见 [02b-两种路由](02b-两种路由.md)

## 路由和组件进行映射

将路由和组件进行映射，使用 Route 来映射地址和组件

属性：

- path 映射的 url 地址
- component 要挂载的组件
- exact 路径是否完整匹配，默认值 false

当 Route 的路径被访问，其对应组件就会自动挂载，注意 默认情况下 Route 并不是严格匹配。只要 url 地址的头部和 path 一致，组件就会挂载，不会检查子路径

app.js

```js
import {Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      App组件
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
    </div>
  );
}

export default App;
```