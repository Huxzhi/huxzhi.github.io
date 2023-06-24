---
category: react18
date: 2023-02-15 21:28
title: 06-类和this
updated: 2023-05-13 22:56
---

# 类

- 类是对象的模板
- 类决定了一个对象中有哪些属性和方法
- 使用 class 关键字来定义一个类

```js
class Person{
    // 可以直接在类中定义属性
    name = '孙悟空';
    age = 18;

    // 构造函数
    // 当我们通过new创建对象时，实际上就是在调用类的构造函数
    constructor(name, age) {
        // 将参数赋值给对象中的属性
        // 在构造函数中，可以通过this来引用当前的对象
        // 在构造函数中定义属性
        this.name = name;
        this.age = age;
    }

    // 定义实例方法
    run(){
        console.log('我会跑！');
    }
}
```

# 类的 `this`

## 类中的所有代码都会在严格模式下执行

严格模式下其中一个特点就是，函数的 this 不在是 window，而是 undefined

注意：

## 在类中方法的 this 不是固定的

- 以方法( `obj.function()` )形式调用时，this 就是当前的实例
- 以函数形式调用，this 是 undefined

```html
<script>
class MyClass{
    fn(){
        console.log('-->',this);
    }
}
const mc = new MyClass();
const test = mc.fn;

mc.fn(); // mc
test(); // undefined
</script>
```

在开发时，在有些场景下，我们希望方法中的 this 是固定的，不会因调用方式不同而改变

- 如果遇到上述需求，可以使用箭头函数来定义类中的方法
- 如果类中的方法是以箭头函数定义的，则方法中的 this 恒为当前实例，不会改变

```html
<script>
class MyClass{
    constructor() {
    // 方法一，不优雅
    // this.fn = this.fn.bind(this); //将fn方法的this绑定为当前实例
    }
    // 方法二
    fn = () => {
          console.log("-->", this);
    };
}
const mc = new MyClass();
const test = mc.fn;

mc.fn(); // MyClass {fn: Function}
test(); // MyClass {fn: Function}
</script>
```

# 类的继承

跟 java 一模一样

```js
// 将多个类中的重复代码提取出来
class Animal{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello = () => {
        console.log('动物在叫');
    };
}

// 通过继承可以使得类中拥有其他类中的属性和方法
// 使用extends来继承一个类，继承后就相当于将该类的代码复制到了当前类中
// 当我们使用继承后，被继承的类就称为父类，继承父类的类 称为子类
class Dog extends Animal{
    /*
    *   子类继承父类后，将获得父类中所有的属性和方法，
    *       也可以创建同名的属性或方法来对父类进行重写
    * */
    sayHello = () => {
        console.log('汪汪汪！');
    };

}

class Snake extends Animal{

    // 当在子类中重写父类构造函数时，必须在子类构造函数中第一时间调用父类构造函数，否则会报错
    constructor(name, age, len) {
        super(name, age); // 调用父类构造函数
        this.len = len;
    }

    sayHello = () => {
        console.log('嘶嘶嘶~~');
    };
}

const dog = new Dog('旺财', 5);
const snake = new Snake('长虫', 4, 10);
// console.log(dog.name, dog.age);
console.log(snake.name, snake.age, snake.len);

// dog.sayHello();
// snake.sayHello();

```


# 静态属性
```js
/*
*   直接通过类调用的属性和方法被称为静态属性和静态方法
* */
class MyClass {
    // 使用static开头的属性是静态属性，方法是静态方法
    static name = '哈哈';

    static fn = () => {

        // 注意：静态方法this不是实例对象而是当前的类对象
        console.log(this);
    };
}

console.log(MyClass.name);
MyClass.fn();
```