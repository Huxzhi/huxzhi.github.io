---
category: react18
date: 2023-03-13 11:32
title: 32-css3-相对长度rem
updated: 2023-05-13 22:56
---

# 32-css3-相对长度 rem

rem 是 CSS 3 中新增的一种相对长度单位。当使用 rem 单位时，根节点 `<html>` 的字体大小（font-size）决定了 rem 的尺寸。

rem 单位类似于 em 单位，em 单位表示父元素字体大小，不同之处在于，rem 的基准是相对于 `<html>` 元素的字体大小。下面通过代码对比 em 和 rem 的区别。
（1）使用 em 单位，示例代码如下。

```css
div {
 font-size: 12px;
}
div > p {
 width: 10em;    /* 结果为120px */
 height: 10em;   /* 结果为120px */
}
```

上述代码中，em 单位是相对于父元素计算的，子元素的 1em 等于 12px，因此 10em 就相当于 120px。

（2）使用 rem 单位，示例代码如下。

```css
html {
 font-size: 14px;
}
div {
 font-size: 12px;
}
div > p {
 width: 10rem;    /* 结果为140px */
 height: 10rem;   /* 结果为140px */
}
```

上述代码中，rem 单位是相对于 `<html>` 元素计算的，因此 10rem 的结果为 140px。

与 em 单位相比，rem 单位的优势在于，只通过修改 `<html>` 的文字大小，就可以改变整个页面中的元素大小，使用起来更加方便。

## 设置移动端的适配

```jsx
// 设置移动端的适配

// 除以几视口的宽度就是多少rem，现在我们设置视口的总宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw';
```