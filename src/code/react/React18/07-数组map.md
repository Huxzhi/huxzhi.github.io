---
category: react18
date: 2023-02-15 21:57
title: 07-数组map
updated: 2023-05-13 22:56
---

## 数组的方法

### map()

可以根据已有数组返回一个新的数组。
map 需要一个函数作为参数，并且会对数组中的每一个元素调用该函数，并将函数每次执行时所返回的结果作为新数组中的元素。

- 需要一个回调函数作为参数，回调函数的返回值会成为新数组中的元素
- 回调函数中有三个参数：
  - 第一个参数：当前元素
  - 第二个参数：当前元素的索引
  - 第三个参数：当前数组

```js
// Arrow function
map((element) => { /* ... */ })
map((element, index) => { /* ... */ })
map((element, index, array) => { /* ... */ })
​
const array1 = [1, 4, 9, 16];
// pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

### filter()

可以将数组中符合条件的元素返回。
filter 同样需要一个函数作为参数，它会对数组中的每一个元素调用函数，如果函数返回 true，则该元素会放入到新数组中。如果返回 false，则新数组中不会出现该元素。

```js
// Arrow function
filter((element) => { /* ... */ } )
filter((element, index) => { /* ... */ } )
filter((element, index, array) => { /* ... */ } )
​
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### find()

可以从一个数组中获得符和条件的第一个元素

### reduce()

用来整合数组。它可以对数组中的值进行计算，最终将数组中的所有元素合并为一个值。

- 可以用来合并数组中的元素
- 需要两个参数：
- 回调函数（指定运算规则）
- 四个参数：
  - prev 上一次运算结果
  - curr 当前值
  - index 当前索引
  - arr 当前数组
- 初始值 - 用来指定第一次运算时 prev，如果不指定则直接从第二个元素开始计算

```js
// Arrow function
reduce((previousValue, currentValue) => { /* ... */ } )
reduce((previousValue, currentValue, currentIndex) => { /* ... */ } )
reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ } )
reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)
​
const array1 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(sumWithInitial);
// expected output: 10`
```