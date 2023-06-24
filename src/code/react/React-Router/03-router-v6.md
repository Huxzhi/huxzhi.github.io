---
category: 
  - react18
  - react-router-v6
date: 2023-03-22 10:30
title: 03-router-v6
updated: 2023-05-13 22:56
---

# 03-router-v6

## router 6

安装：npm

`npm install react-router-dom@6 -S`

根标签挂载还是一样的

```jsx
const root = ReactDOM.createRoot(document.getElementById(‘root’));

root.render(
  <Router>
    <App />
  </Router>
);
```

### Routes 组件

Routes v6 中新增加的组件，作用和 Switch 类似，都是用于 Route 的容器。Routes 中 Route 只有一个会被匹配

==和版本 5 不同，6 中的 Route 组件不能单独使用，而是必须要放到 Routes 组件中。简言之 Routes 就是一个存放 Route 的容器。==

### HelloWorld

```jsx
import React from ‘react’;
import ReactDOM from ‘react-dom/client’;
import { BrowserRouter as Router, Link, Route, Routes } from ‘react-router-dom’;

const Home = ()=>{
  return <div>首页</div>
};

const About = () => {
  return <div>关于</div>
};

const App = () => {
  return <div>App
    <ul>
      <li>
        <Link to=”/”>home</Link>
      </li>
      <li>
        <Link to=”/about”>about</Link>
      </li>
    </ul>

    <Routes>
      <Route path=”/” element={<Home/>}/>
      <Route path=”/about” element={<About/>}/>
    </Routes>
  </div>;
};
```