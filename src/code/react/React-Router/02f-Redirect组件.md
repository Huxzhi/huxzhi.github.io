---
category: 
  - react18
  - react-router-v5
date: 2023-03-22 09:49
title: 02f-Redirect组件
updated: 2023-05-13 22:56
---

# 02f-Redirect 组件

## Redirect 组件

将请求重定向到一个新的位置，经常用来进行权限的处理。例如：当用户已经登录时则正常显示组件，用户没有登录时则跳转到登录页面。

```jsx
{isLogin && <SomeAuthComponent/>}
{!isLogin && <Redirect to={"/login"}></Redirect>}
```

上例中，如果 isLogin 的值为 true，表示用户已经登录，若用户登录，则挂载对应组件。若 isLogin 值为 false，则挂载 Redirect 组件触发重定向，重定向会使得路径跳转到登录页面。

属性：

1.  to —— 重定向的目标地址，可以是一个字符串也可以是一个对象
2.  from —— 需要重定向的地址
3.  push —— 布尔值，是否使用 push 方式对请求进行重定向，加了就不能回去了

## 在 switch 组件中使用

```jsx
<Switch>
    <Route exact path="/" component={Home}/>

    <Route path="/about">
        <About/>
    </Route>

    <Route path="/form">
        <MyForm/>
    </Route>

    <Redirect from={"/abc"} to={"/form"}/>

    <Route path="*">
        <div>路径错误</div>
    </Route>
</Switch>
```

[02d-Switch组件](02d-Switch组件.md)