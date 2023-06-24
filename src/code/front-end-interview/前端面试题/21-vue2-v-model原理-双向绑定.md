---
date: 2023-03-26 16:02
title: 21-vue2-v-model原理-双向绑定
updated: 2023-05-13 22:56
---

[26-深入v-model](../../vue/vue3/26-深入v-model.md)

# 21-vue2-v-model原理-双向绑定


监听键盘输入事件，将值赋给对象，

对象被 Object.defineProperty 劫持，设置值时，进行额外操作，修改 html 元素的值

```html
<input placeholder="请输入名字" id="username" />
    显示值:
<p id="uName"></p>
<script>
  let obj = {};
  Object.defineProperty(obj, "username", {
    // 取值
    get: function () {
      console.log("取值");
    },
    set: function (val) {
      console.log("设置值");
      document.getElementById("uName").innerText = val;
    },
  });
  document
    .getElementById("username")
    .addEventListener("keyup", function () {
      // event
      obj.username = event.target.value;
    });
</script>
```


