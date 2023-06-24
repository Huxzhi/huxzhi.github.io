---
date: 2023-03-24 17:00
title: 5-this的指向及改变this的方法
updated: 2023-05-13 22:56
---

# 5-this 的指向及改变 this 的方法

## function

浏览器中，默认有 `this` 指向 `window`

在方法/函数执行的内部 `this` 指相 就是 调用他的那个对象
`.` 之前的就是 `this`

## 箭头函数

es6 提出了一个箭头函数，箭头函数里面的 `this` 指向是声明的当前上下文环境，并且不可改变 `this` 指向

**重点：** 普通函数的 this 是 ==执行== 的时候绑定 箭头函数是 ==声明== 的时候进行绑定的 this

```js
console.log("------箭头函数-------");
var obj3 = {
  oson1: {
    oson2: {
      fun1: () => {
        console.log("箭头函数this", this); // window
      },
      fun2: function () {
        console.log("普通函数this", this); // oson2
      },
    },
  },
};

obj3.oson1.oson2.fun1(); // window
obj3.oson1.oson2.fun2(); // oson2
```

## 改变 this 指向的三个方法的区别:apply,call,bind

普通函数 改变 this 指向的三个方法的区别： `apply` , `call` , `bind`

1. `apply` 改变 this 指向并立即执行函数，**参数以数组形式写**
2. `call` 改变 this 指向并立即执行函数，**参数逗号分隔**
3. `bind` 语法和 call 一样，但是改变完不会立即执行，比如绑定点击事件

```js
obj3.oson1.oson2.fun2.apply({ a: 123 }, ["A", "B"]); // { a: 123 }
obj3.oson1.oson2.fun2.call({ a: 456 }, "C", "D"); // { a: 456 }
obj3.oson1.oson2.fun2.bind({ a: 789 }, "e", "f")(); // { a: 789 }
```
