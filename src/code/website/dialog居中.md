---
date: 2023-01-04 17:31
title: dialog居中
updated: 2023-05-13 22:56
---
## 绝对布局

如果父组件使用相对布局 会出现问题
```css
.parent{
    position: relative;
}
```

```css
.dialog{
    width: 400px;
    height: 400px;
    background: #141414;
    display: flex;
    flex-direction: column;
    position: absolute; //改成 fixed
    left: 50%;
    top: 50%;
    margin-left: -200px; //宽度的一半
    margin-top: -200px;  //高度的一半
}
```


##  transform translate -50%
