---
category: 
  - react18
  - react-router-v6
date: 2023-03-22 11:35
title: 03c-NavLink组件
updated: 2023-05-13 22:56
---

style 接受一个回调函数 ，会给一个对象 `{isActive: Boolean}`，

```jsx
<NavLink
  style={
      ({isActive})=>{
          return isActive?
              {backgroundColor:"yellow"}:
              null
      }
  }
  to="/student/2">学生</NavLink>
```

跟v5 有区别 [NavLink](02a-Link.md#NavLink)