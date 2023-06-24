---
date: 2022-12-31 20:56
title: 18-TS进阶 proxy & Reflect
updated: 2023-05-13 22:56
---

进阶确实有点难，没看懂

## 学习 proxy 对象代理

> vue3 的双向绑定 也是这个原理
> Proxy 和 Reflect 是 vue3 实现响应式的基础
> es6 的 proxy 代理，vue3 就是用的 ts+proxy 重写底层的

`Proxy` 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

`target`
要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

`handler`
一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

`handler.get()` 本次使用的 get
属性读取操作的捕捉器。

`handler.set()` 本次使用的 set
属性设置操作的捕捉器。

## Reflect

与大多数全局对象不同 `Reflect` 并非一个构造函数，所以不能通过 new 运算符对其进行调用，或者将 `Reflect` 对象作为一个函数来调用。`Reflect` 的所有属性和方法都是静态的（就像 Math 对象）

`Reflect.get(target, name, receiver)`
`Reflect.get` 方法查找并返回 target 对象的 name 属性，如果没有该属性返回 undefined

`Reflect.set(target, name,value, receiver)`
`Reflect.set` 方法设置 `target` 对象的 `name` 属性等于 `value`。

这直接上源码了 `vue.js` 相同原理
```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
man.age  = 30
 
console.log(man);
```

## 使用 泛型 + key of 优化

```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
 
const logAccess = <T>(object: T, key: keyof T): T => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
 
let man2 = logAccess({
    id:1,
    name:"小满2"
}, 'name')
 
man.age = 30
 
console.log(man);
```