---
date: 2022-12-31 16:44
title: 14-Mixins混入
updated: 2023-05-13 22:56
---

TypeScript 混入 `Mixins`

你可以把他看作为==合并==

其实 vue 也有 mixins 这个东西

## 1. 对象混入

可以使用 es6 的 `Object.assign` 合并多个对象

此时 people 会被推断成一个交差类型 `Name & Age & sex;`
```ts
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)
```

## 2. 类的混入

首先声明两个 `mixins` 类 （严格模式要关闭不然编译不过）

```ts
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}
 
 
class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
}
```

下面创建一个类，结合了这两个 mixins

首先应该注意到的是，没使用 extends 而是使用 implements。 把类当成了接口

我们可以这么做来达到目的，为将要 mixin 进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用 mixin 带来的便利，虽说需要提前定义一些占位属性

```ts
class C implements A,B{
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}
```

最后，创建这个帮助函数，帮我们做混入操作。 它会遍历 `mixins` 上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码

`Object.getOwnPropertyNames()` 可以获取对象自身的属性，除去他继承来的属性，
对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名

> 这里就是将 A/B 原型上的属性和方法,添加到了 C 原型上

### Mixins 实现方法

```ts
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}
```