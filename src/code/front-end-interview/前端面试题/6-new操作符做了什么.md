---
date: 2023-03-24 17:01
title: 6-new操作符做了什么
updated: 2023-05-13 22:56
---

# 6-new 操作符做了什么

## proto

1. 创建一个对象 指向构造函数的 this
2. this 的 `__proto__` 指向构造函数的 `prototype` (原型链) [8-原型链prototype](8-原型链prototype.md)
3. 执行构造函数
4. 返回：
   - 如果没有 return 或者 return 的是简单数据类型，忽略 直接 return this
   - 如果 return 的是复杂数据类型则返回的就是 当前 return 的值

## 构造函数

构造两个元素，他们之间不好冲突

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="a"></div>
    <div id="b"></div>
  </body>

  <script>
    function Build({ id = "#app", text = "hello" }) {
      var rootDom = document.querySelector(id);
      this.buildDom = function () {
        var el = document.createElement("p");
        var textNode = document.createTextNode(text);
        el.appendChild(textNode);
        rootDom.appendChild(el);
      };
    }
    var dom1 = new Build({
      id: "#a",
      text: "你好",
    });
    dom1.buildDom();
    var dom2 = new Build({
      id: "#b",
      text: "你好aaaa",
    });
    dom2.buildDom();
  </script>
</html>

```