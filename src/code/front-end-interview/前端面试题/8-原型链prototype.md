---
date: 2023-03-24 23:15
title: 8-原型链
updated: 2023-05-13 22:56
---

# 8-原型链

- `prototype` 这个属性只有函数对象才有！，（构造）函数的原型对象
- `__proto__` **所有对象都有此属性**，总是指向对应的（构造）函数的原型对象 prototype
- `constructor`: `__proto__` 下面的 `constructor` 指向构造函数自己

## 继承属性的方案

对象访问属性的时候,在自身属性查找,找不到再去 `__proto__` 原型链上查找,直到找不到为止返回 undefined。

```JS
function Vue() {
  this.name = "小红";
}

Vue.prototype.age = 10;
Object.prototype.hobby = "画画";
const app = new Vue();
const app2 = new Vue();
console.log("app.name", app);
console.log("app.age", app.age); //app.__proto__
console.log("app2.age", app2.age);
console.log("app2.hobby", app2.hobby); //app.__proto__.__proto__
```

## 原型链的终点 `Object.prototype`

==一切皆对象。原型链的终点 `Object.prototype`，通过`__proto__`找父对象的 `prototype`==

```js
obj = {
  a: 1,
};

console.log("obj", obj);
console.log("obj._proto_", obj.__proto__);
console.log("构造函数的原型对象", Object.prototype === obj.__proto__); //true
console.log("obj._proto_._proto_", obj.__proto__.__proto__); // null
console.log("终点", Object.prototype.__proto__); // null

console.log("------------------");

function Vue() {
  this.name = "小红";
}

const app = new Vue();
console.log("app", app.__proto__);

console.log("app-2-proto", app.__proto__.__proto__); // [Object: null prototype] {}
//找原型的原型
console.log("app-2-proto", app.__proto__.__proto__ === Object.prototype); //true
```

## constructor 主要判断对象的原型是否是某个对象

The **`constructor`** method is a special method of a [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) for creating and initializing an object instance of that class.

```js
console.log("constructor---", obj.__proto__.constructor); // [Function: Object]

console.log("app-1", app.__proto__.constructor === Vue); // true

console.log("app-1", app.__proto__.__proto__.constructor === Object); // true
```
