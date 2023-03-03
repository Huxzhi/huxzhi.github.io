---
title: 声明式编程和命令式编程的比较
icon: page
date: 2023-01-16
category:
  - think
tag:
  - 编程
---

# 声明式编程和命令式编程的比较

命令式编程（Imperative） vs声明式编程（ Declarative）

imperative-vs-declarative
## 命令式编程

- **命令式编程**：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。
- **声明式编程**：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。

这么一想还真是，之前学习的都是命令式，需要考虑不同的初始条件和结束，兼容性很差，声明式 map，reduce，filter 把一些操作都抽象出来了，不再需要for循环了，没有初始条件，

所以声明式会写 很多 回调函数

也许你还不能明白，但有一个地方，你也许已经用到了声明式编程，那就是SQL。

你可以把SQL当做一个处理数据的声明式查询语言。完全用SQL写一个应用程序？这不可能。但如果是处理相互关联的数据集，它就显的无比强大了。

举个简单的例子，假设我们想让一个数组里的数值翻倍。

我们用命令式编程风格实现，像下面这样：

```js
var numbers = [1,2,3,4,5]

var doubled = []

for(var i = 0; i < numbers.length; i++) {

  var newNumber = numbers[i] * 2
  doubled.push(newNumber)

}
console.log(doubled) //=> [2,4,6,8,10]
```

我们直接遍历整个数组，取出每个元素，乘以二，然后把翻倍后的值放入新数组，每次都要操作这个 双倍数组，直到计算完所有元素。

而使用声明式编程方法，我们可以用  `Array.map`  函数，像下面这样：

```js
var numbers = [1,2,3,4,5]

var doubled = numbers.map(function(n) {

  return n * 2
})
console.log(doubled) //=> [2,4,6,8,10]

```

`map`  利用当前的数组创建了一个新数组，新数组里的每个元素都是经过了传入`map`的函数(这里是`function(n) { return n*2 }`)的处理。

`map`函数所作的事情是将直接遍历整个数组的过程归纳抽离出来，让我们专注于描述我们想要的是什么(what)。注意，我们传入 map 的是一个纯函数；它不具有任何副作用(不会改变外部状态)，它只是接收一个数字，返回乘以二后的值。