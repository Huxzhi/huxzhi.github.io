---
category: react18
date: 2023-02-27 21:08
title: 16-Event事件
updated: 2023-05-13 22:56
---

# 16-Event事件

## 原生 JS，绑定事件

```jsx
//方法一 通过属性绑定
<button onclick="alert(123)">点我一下</button>

//方法二 通过方法绑定
<button id="btn01">点我一下</button>

document.getElementById('btn01').onclick = function(){};
// 最后一个参数是禁止冒泡，子组件触发事件不调用父组件的事件
// 事件流的阶段是捕获--目标--冒泡
document.getElementById('btn01').addEventListener('click', function(){}, false);
```

## React 元素通过设置属性值 回调函数

在 React 中事件需要通过元素的属性来设置，
和原生 JS 不同，在 React 中事件的属性需要使用驼峰命名法：

```js
onclick -> onClick
onchange -> onChange
```

属性值不能直接执行代码，而是需要一个回调函数：

```js
onclick="alert(123)"
onClick={()=>{alert(123)}}
```

```jsx
<button onClick={() => {
alert(123);
}}>点我一下
</button>

// 不能加括号，加括号是 自执行，如果是高级函数（返回的是函数）可以加括号
<button onClick={clickHandler}>哈哈</button>
```

## 事件对象

在 React 中，无法通过 return false 取消默认行为

- React 事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象
- React 中的事件对象同样 **不是原生的事件对象** ，是经过 React 包装后的事件对象
- 由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题

```js
// 接收 event 事件
const clickHandler = (event) => {
    event.preventDefault(); // 取消默认行为
    event.stopPropagation(); // 取消事件的冒泡

    alert('我是App中的clickHandler！');

};
```