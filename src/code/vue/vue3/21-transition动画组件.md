---
category: vue3
date: 2023-01-04 19:20
title: 21-transition动画组件
updated: 2023-05-13 22:56
---

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

-   条件渲染 (使用 v-if)
-   条件展示 (使用 v-show)
-   动态组件
-   组件根节点

自定义 transition 过度效果，你需要对 transition 组件的 name 属性自定义。并在 css 中写入对应的样式

## 过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。
4. v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

### 举例

```vue
<button @click='flag = !flag'>切换</button>
<transition name='fade'>
 <div v-if='flag' class="box"></div>
</transition>
```

```css
//开始过度
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
//开始过度了
.fade-enter-active{
  transition: all 2.5s linear;
}
//过度完成
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
//离开的过度
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
//离开中过度
.fade-leave-active{
  transition: all 1s linear;
}
//离开完成
.fade-leave-to{
  width:0px;
   height:0px;
}
```

## 自定义 transition 过度效果

### trasnsition props

-   `enter-from-class`
-   `enter-active-class`
-   `enter-to-class`
-   `leave-from-class`
-   `leave-active-class`
-   `leave-to-class`

将 `enter-from-class` 指定为 `e-form`，如下：

```vue
<transition :enter-from-class="e-form">...</transition>
```

### 自定义过度时间 单位毫秒

你也可以分别指定进入和离开的持续时间

```vue
<transition :duration="1000">...</transition>


<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### 通过自定义 class 结合 css 动画库 animate css

安装库 npm install animate.css

引入 import 'animate.css'

使用方法

官方文档  [Animate.css | A cross-browser library of CSS animations.](https://animate.style/ "Animate.css | A cross-browser library of CSS animations.")

```vue
<transition
    leave-active-class="animate__animated animate__bounceInLeft"
    enter-active-class="animate__animated animate__bounceInRight"
>
    <div v-if="flag" class="box"></div>
</transition>
```

## transition 生命周期 8 个

对应事件的钩子
```vue
<transition
  @before-enter="beforeEnter" //对应enter-from
  @enter="enter"//对应enter-active
  @after-enter="afterEnter"//对应enter-to
  @enter-cancelled="enterCancelled"//显示过度打断
  @before-leave="beforeLeave"//对应leave-from
  @leave="leave"//对应enter-active
  @after-leave="afterLeave"//对应leave-to
  @leave-cancelled="leaveCancelled"//离开过度打断
>
```

当只用 JavaScript 过渡的时候，在  **`enter`  和  `leave`  钩子中必须使用  `done`  进行回调**

结合 gsap 动画库使用  [GreenSock](https://greensock.com/ "GreenSock")

```ts
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

## appear

通过这个属性可以设置初始节点过度 就是 **页面加载完成就开始动画** 对应三个状态

```js
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```