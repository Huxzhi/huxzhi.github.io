---
title: JavaScript 廖雪峰
date: 2022-01-13 10:28
updated: 2023-05-13 22:56
---

# JavaScript 廖雪峰

目录

JavaScript简介

快速入门

## 函数

函数定义和调用

利用 `arguments`，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：

```JavaScript
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
```

实际上 `arguments` 最常用于判断传入参数的个数。你可能会看到这样的写法：

```JavaScript
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
```

要把中间的参数 `b` 变为“可选”参数，就只能通过 `arguments` 判断，然后重新调整参数并赋值。

### 全局作用域

不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript 默认有一个全局对象 `window`，全局作用域的变量实际上被绑定到 `window` 的一个属性：

名字空间

全局变量会绑定到 `window` 上，不同的 JavaScript 文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

```JavaScript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

局部作用域

由于 JavaScript 的变量作用域实际上是函数内部，我们在 `for` 循环等语句块中是无法定义具有局部作用域的变量的：

```JavaScript
'use strict';

function foo() {
  for (var i=0; i<100; i++) {
    //
  }
  i += 100; // 仍然可以引用变量i
}
```

为了解决块级作用域，ES6 引入了新的关键字 `let`，用 `let` 替代 `var` 可以申明一个块级作用域的变量：

```JavaScript
'use strict';

function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
```

解构赋值

如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：

```JavaScript
'use strict';

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;

// name, age, passport分别被赋值为对应属性:
console.log('name = ' + name + ', age = ' + age + ', passport = ' + passport);

```

如果要使用的变量名和属性名不一致，可以用下面的语法获取：

```JavaScript
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};

// 把passport属性赋值给变量id:
let {name, passport:id} = person;
name; // '小明'
id; // 'G-12345678'
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined
```

有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：

```JavaScript
// 声明变量:
var x, y;
// 解构赋值:
{x, y} = { name: '小明', x: 100, y: 200};
// 语法错误: Uncaught SyntaxError: Unexpected token =

//这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。
//解决方法是用小括号括起来：

({x, y} = { name: '小明', x: 100, y: 200});

```

### apply

> 所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。

虽然在一个独立的函数调用中，根据是否是 strict 模式，`this` 指向 `undefined` 或 `window`，不过，我们还是可以控制 `this` 的指向的！

要指定函数的 `this` 指向哪个对象，可以用函数本身的 `apply` 方法，它接收两个参数，第一个参数就是需要绑定的 `this` 变量，第二个参数是 `Array`，表示函数本身的参数。

用 `apply` 修复 `getAge()` 调用：

```JavaScript
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
```

另一个与 `apply()` 类似的方法是 `call()`，唯一区别是：

- `apply()` 把参数打包成 `Array` 再传入；

- `call()` 把参数按顺序传入。

比如调用 `Math.max(3,5, 4)`，分别用 `apply()` 和 `call()` 实现如下：

```JavaScript
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```

对普通函数调用，我们通常把 `this` 绑定为 `null`。

装饰器

利用 `apply()`，我们还可以动态改变函数的行为。

JavaScript 的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。

现在假定我们想统计一下代码一共调用了多少次 `parseInt()`，可以把所有的调用都找出来，然后手动加上 `count += 1`，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的 `parseInt()`：

```JavaScript
'use strict';

var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
console.log('count = ' + count); // 3

```

### 高阶函数

高阶函数英文叫 Higher-order function。那么什么是高阶函数？

JavaScript 的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

一个最简单的高阶函数：

```JavaScript
function add(x, y, f) {
    return f(x) + f(y);
}
```

filter

filter 也是一个常用的操作，它用于把 `Array` 的某些元素过滤掉，然后返回剩下的元素。

和 `map()` 类似，`Array` 的 `filter()` 也接收一个函数。和 `map()` 不同的是，`filter()` 把传入的函数依次作用于每个元素，然后根据返回值是 `true` 还是 `false` 决定保留还是丢弃该元素。

回调函数

`filter()` 接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示 `Array` 的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

利用 `filter`，可以巧妙地去除 `Array` 的重复元素：

```JavaScript
'use strict';

var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});  
```

去除重复元素依靠的是 `indexOf` 总是返回第一个元素的位置，后续的重复元素位置与 `indexOf` 返回的位置不相等，因此被 `filter` 滤掉了。

过滤质数

```JavaScript
 return arr.filter((e,i,a)=>{
      return e!=1 && a.filter(x=>e%x ==0).length<=2
    })
```

### 闭包 Closure

```JavaScript
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}

//当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：

var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
调用函数f时，才真正计算求和的结果：

f(); // 15
```

我们在函数 `lazy_sum` 中又定义了函数 `sum`，并且，内部函数 `sum` 可以引用外部函数 `lazy_sum` 的参数和局部变量，当 `lazy_sum` 返回函数 `sum` 时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。

请再注意一点，当我们调用 `lazy_sum()` 时，每次调用都会返回一个新的函数，即使传入相同的参数：

返回闭包时牢记的一点就是：**返回函数不要引用任何循环变量，或者后续会发生变化的变量**。

如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：

我对闭包的理解 https://segmentfault.com/a/1190000018228534 ，适用于其他编程语言、

#### 3、闭包的概念


各种专业文献的闭包定义都非常抽象，我的理解是: `闭包就是能够读取其他函数内部变量的函数`。  
由于在javascript中，只有函数内部的子函数才能读取局部变量，所以说，`闭包可以简单理解成“定义在一个函数内部的函数“`。  
所以，`在本质上，闭包是将函数内部和函数外部连接起来的桥梁`。

#### 4、闭包的用途

闭包可以用在许多地方。它的最大用处有两个，`一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在f1调用后被自动清除`。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。


> 脑洞大开

- 只需要用函数，就可以用计算机实现运算
    很久很久以前，有个叫阿隆佐·邱奇的帅哥，发现只需要用函数，就可以用计算机实现运算，而不需要 `0`、`1`、`2`、`3` 这些数字和 `+`、`-`、`*`、`/` 这些符号。

    JavaScript 支持函数，所以可以用 JavaScript 用函数来写这些计算。来试试：
    ```JavaScript
    zero(f)(x) = x;
    one(f)(x) = f(x);
    two(f)(x) = one(f)(one(f)(x)) = one(f)(f(x)) = f(f(x));
    three(f)(x) = two(f)(one(f)(x)) = two(f)(f(x)) = f(f(f(x)));
    ...
    five(f)(x) = f(f(f(f(f(x)))));
    ```


### 箭头函数

箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连 `{ ... }` 和 `return` 都省略掉了。还有一种可以包含多条语句，这时候就不能省略 `{ ... }` 和 `return`：

this

箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的 `this` 是词法作用域，由上下文确定。

```JavaScript
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```
