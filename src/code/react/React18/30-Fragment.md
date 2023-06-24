---
category: react18
date: 2023-03-12 19:12
title: 30-Fragment
updated: 2023-05-13 22:56
---

## JSX 必须有且只有一个根元素

在 React 中，JSX 必须有且只有一个根元素。这就导致了在有些情况下我们不得不在子元素的外部添加一个额外的父元素，像是这样：

```jsx
import React from 'react';

const MyComponent = () => {
    return (
        <div>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </div>
    );
};

export default MyComponent;
```

上边这段代码中，组件内部需要引入三个组件（使用三个 div 表示）。由于是三个组件，根据 JSX 的语法必须在三个组件的外部在套一个 div，三个组件才能够正常使用，但是这个外层的 div 在最终的页面中没有任何的实质性作用。

遇到这种情况我们就非常希望能有一种方式可以引入多个组件，但又不会在最终的网页中添加多余的结构，那么我们可以定义这样一个组件：

```jsx
import React from 'react';

const MyFragment = (props) => {
    return props.children;
};

export default MyFragment;
```

## React.Fragment

 - 是一个专门用来作为父容器的组件
     它只会将它里边的子元素直接返回，不会创建任何多余的元素
 - 当我们希望有一个父容器
     但同时又不希望父容器在网页中产生多余的结构时
     就可以使用Fragment


修改引入 React 的方式，直接使用 `Fragment`：

```jsx
import React, {ragment} from 'react';

const MyComponent = () => {
    return (
        <Fragment>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </Fragment>
    );
};

export default MyComponent;
```

## `<>` 和 `</>`

不过最爽的是，在 React 中为我们提供了一种更加便捷的方式，直接使用`<></>`代替 `Fragment` 更加简单：