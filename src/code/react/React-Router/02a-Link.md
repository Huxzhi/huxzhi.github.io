---
category: 
  - react18
  - react-router-v5
date: 2023-03-20 19:05
title: 02a-Link
updated: 2023-05-13 22:56
---

# 02a-Link

在使用 react router 时，一定不要使用 a 标签来创建超链接。
因为 a 标签创建的超链接，会自动向服务器发送请求重新加载页面，而我们不希望这种情况发生

可以使用 Link 组件来创建超链接
NavLink 和 Link 作用相似，只是可以指定链接激活后的样式

## Link

```html
<Link to="/">主页</Link>
<Link to="/about">关于</Link>
```

## NavLink

NavLink 和 Link 作用相似，只是可以指定链接激活后的样式

```html
<NavLink
    exact
    // activeClassName={classes.active}
    activeStyle={{ textDecoration: "underline" }}
    to="/">
    主页
</NavLink>

<NavLink
    exact
    // activeClassName={classes.active}
    activeStyle={{ textDecoration: "underline" }}
    to="/about">
    关于
</NavLink>
```