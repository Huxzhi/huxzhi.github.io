---
date: 2023-03-25 20:15
updated: 2023-05-13 22:56
---
nextTick:在下一次 Dom 更新结束后的回调
```js
// vue3 使用
nextTick(()={
//代码
}
```

```js
import { reactive, ref, nextTick } from "vue";
const list = reactive(["小红", "小明"]);
const add = () => {
  const myUl = ref(null);
  list.push("nico");
  console.log("nextTick外部", myUl.value.clientHeight); //是数据改变前的长度
  nextTick(() => {
    console.log("nextTick内部", myUl.value.clientHeight); // 为准确数据，
  });
};
```