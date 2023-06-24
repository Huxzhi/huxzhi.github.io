---
category: react18
date: 2023-02-16 20:14
title: 10-三个API
updated: 2023-05-13 22:56
---

## 三个 API

### React.createElement()

-   `React.createElement(type, [props], [...children])`
-   用来创建 React 元素
    -   参数：（3 个）
    1.  元素的名称（html 标签必须小写）
    2.  标签中的属性
        -   class 属性需要使用 className 来设置
        -   在设置事件时，属性名需要修改为驼峰命名法,如 `onClick` ，同时不要写成调用的形式，改写为 箭头函数 的形式，见下方 三部曲
    3.  元素的内容（子元素）
-   React 元素最终会通过虚拟 DOM 转换为真实的 DOM 元素
    -   React 元素一旦创建就无法修改，只能通过新创建的元素进行替换

### ReactDOM.createRoot()

-   `createRoot(container[, options])`
-   用来创建 React 的根容器，容器用来放置 React 元素。


### root.render()

-   `root.render(element)` 重新渲染
-   当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。 一般不写内容，但可以写 该网页不支持react ，如果支持，就会被替换掉
-   不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

## 简单三部曲

```js
// 创建一个React元素
const button = React.createElement('button', {
    type: 'button',
    className: 'hello',
    onClick: () => {
        alert('你点我干嘛')
    }
}, '点我一下');

// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));

// 将元素在根元素中显示
root.render(button);
```