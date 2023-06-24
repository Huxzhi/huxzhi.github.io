---
category: 
  - react18
  - react-router-v6
date: 2023-03-22 11:18
title: 03a1-路由嵌套和Outlet
updated: 2023-05-13 22:56
---

# 03a1-路由嵌套 和 Outlet

```jsx
<Routes>
   <Route path={"hello"} element={<Hello/>}/>
</Routes>
```

## Outlet 用来表示嵌套路由中的组件

Outlet 组件用来在父级路由中挂载子路由

当嵌套路由中的路径匹配成功了，可以匹配多个子路由。Outlet 则表示嵌套路由中的组件
当嵌套路由中的路径没有匹配成功，Outlet 就什么都不是

```jsx
<Route path='/students' element={<StudentList/>}>
    <Route path=':id' element={<Student/>}/>
    <Route path={"hello"} element={<Hello/>} />
</Route>
```

上例中，Route 嵌套后，如果访问`/students`则会挂载 StudentList 组件，如果访问`/students/:id`则会自动在 StudentList 组件中对 Student 组件进行挂载。在 StudentList 组件中就可以使用 Outlet 来引用这些被挂载的组件。

```jsx
const StudentList = () => {
    return <div>
        学生列表
        <Outlet/>
    </div>
};
```