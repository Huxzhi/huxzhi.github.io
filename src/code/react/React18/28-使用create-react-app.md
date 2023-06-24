---
category: react18
date: 2023-03-12 15:44
title: 28-使用create-react-app
updated: 2023-05-13 22:56
---

[https://www.lilichao.com/index.php/2022/03/22/# 创建React项目（自动）/](https://www.lilichao.com/index.php/2022/03/22/%e5%88%9b%e5%bb%bareact%e9%a1%b9%e7%9b%ae%ef%bc%88%e8%87%aa%e5%8a%a8%ef%bc%89/)

`npx create-react-app react-app`


App.js
```jsx
import React from 'react';

const App = () => {
    return (
        <div>
            我是App
        </div>
    );
};

export default App;

```

index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
```