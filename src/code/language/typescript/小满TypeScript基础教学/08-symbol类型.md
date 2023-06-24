---
date: 2022-12-30 19:03
title: 08-symbol类型
updated: 2023-05-13 22:56
---

Symbols  · [TypeScript 中文网 · TypeScript——JavaScript 的超集 ts 官网](https://www.tslang.cn/docs/handbook/symbols.html)
# Symbol
自 ECMAScript 2015 起，symbol 成为了一种新的原生类型，就像 number 和 string 一样。

symbol 类型的值是通过 Symbol 构造函数创建的。

==Symbols 是不可改变且唯一的。用来表示独一无二的值，在设计上就不会被遍历出来==

可以传递参做为唯一标识 只支持 string  和 number 类型的参数

```ts
let sym2 = Symbol("key"); 
let sym3 = Symbol("key"); 

sym2 === sym3; // false, symbols是唯一的
```

像字符串一样， symbols 也可以被用做对象属性的键。

注意， Symbol 值作为对象属性名时，不能用点运算符。
还有一点需要注意， Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

```ts
let sym = Symbol(); 
let obj = {
    [sym]: "value" //作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
};

console.log(obj[sym]); // "value"
```

## 使用 symbol 定义的属性，是不能通过如下方式遍历拿到的

可以防止命名冲突

```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

如何拿到

```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

# Symbol .iterator 迭代器 和 生成器 for of

支持遍历大部分类型迭代器 arr nodeList argumetns set map 等

```ts
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

测试用例
```ts
interface Item {
    age: number,
    name: string
}
 
const array: Array<Item> = [{ age: 123, name: "1" }, { age: 123, name: "2" }, { age: 123, name: "3" }]
 
type mapTypes = string | number
const map:Map<mapTypes,mapTypes> = new Map()
 
map.set('1','王爷')
map.set('2','陆北')
 
const obj = {
    aaa:123,
    bbb:456
}
 
let set:Set<number> = new Set([1,2,3,4,5,6])
// let it:Iterator<Item> = array[Symbol.iterator]()

//小迭代器的实现，for of 实现
const gen = (erg:any): void => {
    let it: Iterator<any> = erg[Symbol.iterator]()//找到参数的迭代器属性
    let next:any= { done: false }
    while (!next.done) //判断next，由于next默认为fasle，while循环只有true会通过，所以需要取反
        next =  it.next()//刚开始是声明next给个默认值，等到开始循环的时候再把真正的值赋给他
        if (!next.done) {
            console.log(next.value)
        }
    }
}
gen(array)//
//对象是不支持迭代器的使用的，其实我们在控制台输出一个对象，查找他内置的属性，也是找不到 Symbol (象征) .interator的
```

## for of 和 for in 的区别

for of 取值 value
for in 取索引 index

## 以下为这些 symbols 的列表：

Symbol .hasInstance
方法，会被 instanceof 运算符调用。构造器对象用来识别一个对象是否是其实例。

Symbol .isConcatSpreadable
布尔值，表示当在一个对象上调用 Array.prototype.concat 时，这个对象的数组元素是否可展开。

Symbol .iterator
方法，被 for-of 语句调用。返回对象的默认迭代器。

Symbol .match
方法，被 String .prototype.match 调用。正则表达式用来匹配字符串。

Symbol .replace
方法，被 String .prototype.replace 调用。正则表达式用来替换字符串中匹配的子串。

Symbol .search
方法，被 String .prototype.search 调用。正则表达式返回被匹配部分在字符串中的索引。

Symbol .species
函数值，为一个构造函数。用来创建派生对象。

Symbol .split
方法，被 String .prototype.split 调用。正则表达式来用分割字符串。

Symbol .toPrimitive
方法，被 ToPrimitive 抽象操作调用。把对象转换为相应的原始值。

Symbol .toStringTag
方法，被内置方法 Object.prototype.toString 调用。返回创建对象时默认的字符串描述。

Symbol .unscopables
对象，它自己拥有的属性会被 with 作用域排除在外。