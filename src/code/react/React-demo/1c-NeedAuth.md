---
category: react18
date: 2023-03-22 16:41
title: 1c-NeedAuth
updated: 2023-05-13 22:56
---

# 01c-NeedAuth

简易版的 路由守卫，没有权限就重定向

在需要权限的页面，用该组件 包裹起来

```jsx
import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const NeedAuth = props => {
    const auth = useSelector(state => state.auth);
    //保存当前路径
    const location = useLocation();

    
    return auth.isLogged ?
        props.children :
        //没有登录就返回到之前的页面 重定向标签
        <Navigate
            to={"/auth-form"}
            replace
            //设置跳转前的路径位置
            state={{preLocation: location}}
        />;
};

export default NeedAuth;

```

## 使用

```jsx
<Layout>
    <Routes>
        <Route path={"/"} element={<HomePage/>}/>
        <Route path={"profile"} element={<NeedAuth><ProfilePage/></NeedAuth>}/>
        <Route path={"auth-form"} element={<AuthPage/>}/>
    </Routes>
</Layout>
```