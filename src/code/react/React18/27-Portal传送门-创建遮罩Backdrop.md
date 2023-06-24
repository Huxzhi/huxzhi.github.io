---
category: react18
date: 2023-03-11 17:52
title: 27-Portal传送门-创建遮罩Backdrop
updated: 2023-05-13 22:56
---

# 27-Portal传送门

通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置。这个方法就和他的名字一样，给React元素开启了一个传送门，让它可以去到它应该去的地方。

## Portal的用法

1.  在index.html中添加一个新的元素
2.  在组件中中通过ReactDOM.createPortal()将元素渲染到新建的元素中

在index.html中添加新元素：

```html
<div id="backdrop"></div>
```

修改Backdrop组件：

```jsx
const backdropDOM = document.getElementById('backdrop');

const Backdrop = () => {
  return ReactDOM.createPortal(
  <div
           style={
      {
        position:'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:9999,
        background:'rgba(0,0,0,.3)'
      }
    }
           >
  </div>,
      backdropDOM
  );
};
```

如此一来，我们虽然是在Box中引入了Backdrop，但是由于在Backdrop中开启了“传送门”，Backdrop就会直接渲染到网页中id为backdrop的div中，这样一来上边的问题就解决了！嘿嘿，不错吧！