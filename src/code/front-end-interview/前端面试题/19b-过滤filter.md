---
date: 2023-03-26 09:36
updated: 2023-05-13 22:56
---
[19-JS面试题](19-JS面试题.md)

返回新的数组，用 布尔值判断

```js
let =a [1, 2, 3, 14, 15]
// 1. current => 当前值 2. index => 当前值的下标 3. 这个数组对象
let b = a.filter((current, index, array) => {
    console.log(current, index, array)
    return current > 10
})
```