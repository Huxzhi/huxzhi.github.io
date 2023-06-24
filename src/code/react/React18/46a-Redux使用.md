---
category: react18
date: 2023-03-18 16:22
title: 46a-Redux使用
updated: 2023-05-13 22:56
---

# 46a-Redux 使用

1.  引入 redux 核心包
2.  创建 reducer 整合函数
3.  通过 reducer 对象创建 store
4.  对 store 中的 state 进行订阅
5.  通过 dispatch 派发 state 的操作指令

采取 subscribe 订阅发布模式 和 dispatch 分派

## html 内使用

```jsx
function reducer(state, action) {
    /*
    *   state 表示当前state，可以根据这个state生成新的state
    *   action 是一个js对象，它里边会保存操作的信息
    *   type表示操作的类型
    *   其他需要传递的参数，也可以在action中设置
    * */
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
}

const store = Redux.createStore(reducer, 1);

store.subscribe(() => {
    // 打印state的值
    // console.log(store.getState());
    countSpan.innerText = store.getState();
});


subBtn.addEventListener('click', () => {
    store.dispatch({type: 'SUB'});
});

addBtn.addEventListener('click', () => {
    store.dispatch({type: 'ADD'});
});
```

## 多个 Reducer

上边的案例的写法存在一个非常严重的问题！将所有的代码都写到一个 reducer 中，会使得这个 reducer 变得无比庞大，现在只有学生和学校两个信息。如果数据在多一些，操作方法也会随之增多，reducer 会越来越庞大变得难以维护。

Redux 中是允许我们创建多个 reducer 的，所以上例中的 reducer 我们可以根据它的数据和功能进行拆分，拆分为两个 reducer，像是这样：

## `combineReducer` 将多个 reducer 进行合并

拆分后，还需要使用 Redux 为我们提供的函数 `combineReducer` 将多个 reducer 进行合并，合并后才能传递进 createStore 来创建 store。

```js
const reducer = combineReducers({
    stu:stuReducer,
    school:schoolReducer
});

const store = createStore(reducer);
```

`combineReducer` 需要一个对象作为参数，对象的属性名可以根据需要指定，比如我们有两种数据 stu 和 school，属性名就命名为 stu 和 school，stu 指向 stuReducer，school 指向 schoolReducer。读取数据时，直接通过 state.stu 读取学生数据，通过 state.school 读取学校数据。

## 缺点和问题

1. 如果 state 过于复杂，将会非常难以维护
   - 可以通过对 state 分组来解决这个问题，创建多个 reducer，然后将其合并为一个
2. state 每次操作时，都需要对 state 进行复制，然后再去修改
3. case 后边的常量维护起来会比较麻烦

## 解决办法

使用 [47-Redux-Toolkit使用](47-Redux-Toolkit使用.md)