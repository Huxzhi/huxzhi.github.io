---
date: 2023-03-26 09:33
title: 19a-undefined与null
updated: 2023-05-13 22:56
---
[19-JS面试题](19-JS面试题.md)
# 19a-undefined 与 null

## undefined 与 null

```js
console.log(typeof null) // 表示为“无”对象 0
console.log(typeof undefined) // 表示“无”的原始值 NaN
```

### 有 4 种情况会 undefined

```js
// 1. 已声明，未赋值
let o;
console.log(o)

// 2.对象某个属性不存在
let obj = {}
console.log(obj.a)

// 3. 函数调用少了参数
function fn(a, b){
    console.log(a, b)
}
fn(4)

//4.函数的默认返回值，构造函数除外
function abcd(){
    console.log("11")
}
console.log(abcd())
```

### null

1. 手动释放内存
2. 作为函数的参数(此参数不是对象)
3. 原型链的顶端 [8-原型链 prototype](8-原型链prototype.md)

```js
// null
let obj = {}
obj = null
```

告诉垃圾回收机制，变量不再使用了，也就是手动释放内存
