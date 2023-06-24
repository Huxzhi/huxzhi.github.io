---
date: 2023-01-27 16:15
title: 04-前置知识装饰器-实现一个GET请求
updated: 2023-05-13 22:56
---

## 前提

简单介绍 [15-装饰器 Decorator](../language/typescript/小满TypeScript基础教学/15-装饰器Decorator.md)

## 装饰器工厂

可以传参数，用到装饰器工厂，也就是 [柯里化（Currying）](https://zh.javascript.info/currying-partials)

柯里化是一种函数的转换，它是指将一个函数从可调用的  `f(a, b, c)`  转换为可调用的  `f(a)(b)(c)`。

柯里化不会调用函数。它只是对函数进行转换。